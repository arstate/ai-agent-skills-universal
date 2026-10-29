import asyncio
import json
import urllib.request
import websockets

CDP_PORT = 9223
TARGET_URL = "http://localhost:5200"

async def test_hydration_with_saved_light_deck():
    req = urllib.request.Request(f"http://127.0.0.1:{CDP_PORT}/json/new?{TARGET_URL}", data=b"", method="PUT")
    with urllib.request.urlopen(req) as resp:
        tab_info = json.loads(resp.read().decode())
    
    tab_id = tab_info["id"]
    ws_url = tab_info["webSocketDebuggerUrl"]
    print(f"[CDP] Opened tab {tab_id}")
    
    console_errors = []
    
    try:
        async with websockets.connect(ws_url) as ws:
            msg_id = 0
            async def send_cmd(method, params=None):
                nonlocal msg_id
                msg_id += 1
                payload = {"id": msg_id, "method": method, "params": params or {}}
                await ws.send(json.dumps(payload))
                while True:
                    res = json.loads(await ws.recv())
                    if "method" in res:
                        if res["method"] == "Runtime.consoleAPICalled":
                            args = [arg.get("value", "") for arg in res["params"].get("args", [])]
                            log_type = res["params"].get("type", "log")
                            msg = f"[{log_type}] " + " ".join(str(a) for a in args)
                            if log_type in ("error", "warning"):
                                console_errors.append(msg)
                        elif res["method"] == "Log.entryAdded":
                            entry = res["params"]["entry"]
                            if entry.get("level") in ("error", "warning"):
                                console_errors.append(f"[Log.{entry.get('level')}] {entry.get('text')}")
                    if res.get("id") == msg_id:
                        return res.get("result", {})
            
            await send_cmd("Runtime.enable")
            await send_cmd("Log.enable")
            await send_cmd("Page.enable")
            
            # Set localStorage to a LIGHT theme deck (consulting-cream)
            light_deck_js = """
            localStorage.setItem('next_slidedeck_data', JSON.stringify({
                id: 'test-light-deck',
                title: 'Light Mode Testing Deck',
                themeId: 'consulting-cream',
                transition: { type: 'morph', duration: 0.5, springBounce: 0.15 },
                updatedAt: new Date().toISOString(),
                slides: [{
                    id: 's1',
                    kicker: 'LIGHT TEST',
                    title: 'Testing Light Deck In Storage',
                    subtitle: 'Sub',
                    layout: 'cover',
                    elements: {}
                }]
            }));
            """
            await send_cmd("Runtime.evaluate", {"expression": light_deck_js})
            print("[CDP] Set localStorage to consulting-cream light theme")
            
            # Clear error list before reloading
            console_errors.clear()
            
            # Now reload the page so server renders HTML (with INITIAL_DECK dark mode) and client rehydrates with localStorage light mode!
            print("[CDP] Reloading page to test hydration...")
            await send_cmd("Page.reload")
            
            # Wait for reload and hydration
            await asyncio.sleep(4)
            
            # Check for hydration errors
            hydration_mismatches = [e for e in console_errors if "hydration" in e.lower() or "mismatch" in e.lower()]
            print(f"[CDP] Total errors/warnings on reload: {len(console_errors)}")
            print(f"[CDP] Hydration mismatches on reload: {len(hydration_mismatches)}")
            for err in console_errors:
                print(f"  -> {err}")
            
            # Verify the deck successfully transitioned to light theme after mount
            final_title = await send_cmd("Runtime.evaluate", {
                "expression": "document.querySelector('#deck-stage-canvas h1, #deck-stage-canvas h2')?.innerText"
            })
            print("[CDP] Slide title after hydration:", final_title.get("result", {}).get("value"))
            
            final_toggle = await send_cmd("Runtime.evaluate", {
                "expression": "document.querySelector('button[title=\"Toggle Light / Dark Mode Palette\"]').innerText"
            })
            print("[CDP] Theme button after hydration:", final_toggle.get("result", {}).get("value"))
            
            assert len(hydration_mismatches) == 0, f"FAILED: Hydration mismatch detected: {hydration_mismatches}"
            print("[PASS] ZERO HYDRATION MISMATCH WITH PRE-EXISTING LIGHT THEME IN LOCALSTORAGE!")
            
    finally:
        close_req = urllib.request.Request(f"http://127.0.0.1:{CDP_PORT}/json/close/{tab_id}", data=b"", method="PUT")
        try:
            with urllib.request.urlopen(close_req) as resp:
                print(f"[CDP] Closed test tab {tab_id}")
        except Exception:
            pass

if __name__ == '__main__':
    asyncio.run(test_hydration_with_saved_light_deck())
