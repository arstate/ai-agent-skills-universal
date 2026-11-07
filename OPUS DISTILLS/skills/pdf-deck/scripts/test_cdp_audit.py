import asyncio
import json
import urllib.request
import websockets

CDP_PORT = 9223
TARGET_URL = "http://localhost:5200"

async def run_cdp_audit():
    # 1. Create a new tab via HTTP endpoint
    req = urllib.request.Request(f"http://127.0.0.1:{CDP_PORT}/json/new?{TARGET_URL}", data=b"", method="PUT")
    with urllib.request.urlopen(req) as resp:
        tab_info = json.loads(resp.read().decode())
    
    tab_id = tab_info["id"]
    ws_url = tab_info["webSocketDebuggerUrl"]
    print(f"[CDP] Created tab {tab_id}: {ws_url}")
    
    console_errors = []
    console_logs = []
    
    try:
        async with websockets.connect(ws_url) as ws:
            # Helper to send CDP command
            msg_id = 0
            async def send_cmd(method, params=None):
                nonlocal msg_id
                msg_id += 1
                payload = {"id": msg_id, "method": method, "params": params or {}}
                await ws.send(json.dumps(payload))
                while True:
                    res = json.loads(await ws.recv())
                    if "method" in res:
                        # event
                        if res["method"] == "Runtime.consoleAPICalled":
                            args = [arg.get("value", "") for arg in res["params"].get("args", [])]
                            log_type = res["params"].get("type", "log")
                            msg = f"[{log_type}] " + " ".join(str(a) for a in args)
                            console_logs.append(msg)
                            if log_type in ("error", "warning"):
                                console_errors.append(msg)
                        elif res["method"] == "Log.entryAdded":
                            entry = res["params"]["entry"]
                            if entry.get("level") in ("error", "warning"):
                                console_errors.append(f"[Log.{entry.get('level')}] {entry.get('text')}")
                    if res.get("id") == msg_id:
                        return res.get("result", {})
            
            # Enable domains
            await send_cmd("Runtime.enable")
            await send_cmd("Log.enable")
            await send_cmd("Page.enable")
            
            # Wait 3 seconds for hydration and initial render
            await asyncio.sleep(3)
            
            # Evaluate document.body.innerHTML and check for hydration mismatch warnings
            eval_res = await send_cmd("Runtime.evaluate", {
                "expression": "document.title + ' | ' + document.querySelector('header').innerText"
            })
            print("[CDP] Header text:", eval_res.get("result", {}).get("value"))
            
            # Check theme toggle button
            btn_eval = await send_cmd("Runtime.evaluate", {
                "expression": "document.querySelector('button[title=\"Toggle Light / Dark Mode Palette\"]').innerText"
            })
            print("[CDP] Theme button text:", btn_eval.get("result", {}).get("value"))
            
            # Click theme toggle button to switch to Light Mode
            click_res = await send_cmd("Runtime.evaluate", {
                "expression": "document.querySelector('button[title=\"Toggle Light / Dark Mode Palette\"]').click(); 'clicked'"
            })
            print("[CDP] Theme button clicked:", click_res)
            
            await asyncio.sleep(1)
            
            # Verify Light Mode text
            btn_eval2 = await send_cmd("Runtime.evaluate", {
                "expression": "document.querySelector('button[title=\"Toggle Light / Dark Mode Palette\"]').innerText"
            })
            print("[CDP] Theme button text after click:", btn_eval2.get("result", {}).get("value"))
            
            # Check active slide title
            slide_eval = await send_cmd("Runtime.evaluate", {
                "expression": "document.querySelector('#deck-stage-canvas h1, #deck-stage-canvas h2').innerText"
            })
            print("[CDP] Active slide title:", slide_eval.get("result", {}).get("value"))
            
            # Check 26 themes in right sidebar
            theme_names = await send_cmd("Runtime.evaluate", {
                "expression": "Array.from(document.querySelectorAll('aside button')).map(b => b.innerText.trim()).filter(Boolean)",
                "returnByValue": True
            })
            val = theme_names.get("result", {}).get("value") or []
            print("[CDP] Sidebar buttons count:", len(val), "sample:", val[:5])

            # Select 'consulting-cream' theme or click light category
            click_light_cat = await send_cmd("Runtime.evaluate", {
                "expression": "const btn = Array.from(document.querySelectorAll('button')).find(b => b.innerText.toLowerCase() === 'light'); if (btn) { btn.click(); 'clicked light'; } else 'not found';"
            })
            print("[CDP] Clicked light category:", click_light_cat.get("result", {}).get("value"))
            await asyncio.sleep(0.5)

            # Click a light theme (e.g. Cream Editorial)
            click_theme = await send_cmd("Runtime.evaluate", {
                "expression": "const btn = Array.from(document.querySelectorAll('button')).find(b => b.innerText.includes('Cream Editorial') || b.innerText.includes('Academic Slate')); if (btn) { btn.click(); btn.innerText; } else 'not found';"
            })
            print("[CDP] Clicked theme:", click_theme.get("result", {}).get("value"))
            await asyncio.sleep(1)

            # Check stage background color to confirm theme applied
            stage_bg = await send_cmd("Runtime.evaluate", {
                "expression": "window.getComputedStyle(document.querySelector('#deck-stage-canvas')).backgroundColor"
            })
            print("[CDP] Deck stage background color:", stage_bg.get("result", {}).get("value"))

            # Check theme toggle button in TopBar
            toggle_text = await send_cmd("Runtime.evaluate", {
                "expression": "document.querySelector('button[title=\"Toggle Light / Dark Mode Palette\"]').innerText"
            })
            print("[CDP] Theme toggle button in TopBar:", toggle_text.get("result", {}).get("value"))
            
            # Test Export Modal
            await send_cmd("Runtime.evaluate", {
                "expression": "const expBtn = Array.from(document.querySelectorAll('button')).find(b => b.innerText.includes('EXPORT') || b.title?.includes('Export')); if (expBtn) expBtn.click();"
            })
            await asyncio.sleep(1)
            
            modal_title = await send_cmd("Runtime.evaluate", {
                "expression": "document.querySelector('#export-modal-backdrop h3, div[role=\"dialog\"] h3')?.innerText || 'Not found'"
            })
            print("[CDP] Export modal open:", modal_title.get("result", {}).get("value"))
            
            # Close Export Modal
            await send_cmd("Runtime.evaluate", {
                "expression": "const closeBtn = Array.from(document.querySelectorAll('button')).find(b => b.innerText === 'CANCEL' || b.innerText === '✕'); if (closeBtn) closeBtn.click();"
            })
            await asyncio.sleep(0.5)
            
            # Check errors
            print(f"[CDP] Total console logs recorded: {len(console_logs)}")
            print(f"[CDP] Total console errors/warnings recorded: {len(console_errors)}")
            hydration_errors = [e for e in console_errors if "hydration" in e.lower() or "mismatch" in e.lower()]
            print(f"[CDP] Hydration errors: {len(hydration_errors)}")
            for e in console_errors:
                print(f"  -> {e}")
            
    finally:
        # Close tab
        close_req = urllib.request.Request(f"http://127.0.0.1:{CDP_PORT}/json/close/{tab_id}", data=b"", method="PUT")
        try:
            with urllib.request.urlopen(close_req) as resp:
                print(f"[CDP] Closed test tab {tab_id}")
        except Exception as ex:
            print(f"[CDP] Error closing tab: {ex}")

if __name__ == '__main__':
    asyncio.run(run_cdp_audit())
