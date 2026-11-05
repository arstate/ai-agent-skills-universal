# 🔌 FIGMA BRIDGE & RELAY API PROTOCOL

Spesifikasi arsitektur komunikasi dua arah (*bidirectional read/write*) antara AI Agent dan aplikasi Figma Desktop melalui daemon WebSocket **`figma-bridge`**.

---

## 🏗️ 1. TOPOLOGI & ALUR KOMUNIKASI

```text
[AI Agent CLI / Bun]  ──stdio / ts──>  [Relay Client]  ──WebSocket (4395)──>  [Relay Daemon (127.0.0.1:4395)]  <──WebSocket──  [Figma Desktop Plugin]
```

### Path Penting di Sistem:
- **Relay Server Daemon:** `/mnt/HDD-2/BACKUP LINUX/FILE DATA/SOFTWARE LINUX/figma-bridge/server/relay.ts`
- **Relay Client Module:** `/mnt/HDD-2/BACKUP LINUX/FILE DATA/SOFTWARE LINUX/figma-bridge/server/src/relay-client.ts`
- **CLI Runner:** `/mnt/HDD-2/BACKUP LINUX/FILE DATA/SOFTWARE LINUX/figma-bridge/call_figma.ts`
- **Figma Plugin Manifest:** `/mnt/HDD-2/BACKUP LINUX/FILE DATA/SOFTWARE LINUX/figma-bridge/plugin/manifest.json`

---

## ⚡ 2. DUA CARA EKSEKUSI UTAMA (REKOMENDASI PRODUKSI)

### Cara 1: Menulis Skrip Bun Sementara di `/tmp/*.ts` (Paling Cepat & Fleksibel)
Gunakan pendekatan ini untuk membangun, memodifikasi, atau mengekspor frame Figma yang kompleks:

```ts
import { callPlugin } from "/mnt/HDD-2/BACKUP LINUX/FILE DATA/SOFTWARE LINUX/figma-bridge/server/src/relay-client";

async function main() {
  const code = `
    // 1. Preload Fonts
    await figma.loadFontAsync({ family: "Plus Jakarta Sans", style: "ExtraBold" });
    await figma.loadFontAsync({ family: "Space Mono", style: "Bold" });

    // 2. Query or Create Frame
    const node = await figma.getNodeByIdAsync("865:24186");
    if (!node) return { error: "Node not found" };

    // 3. Viewport Focus & Toast
    figma.viewport.scrollAndZoomIntoView([node]);
    figma.notify("✅ Auto Layout Applied!");

    // 4. Return result
    return { id: node.id, name: node.name, x: node.x, y: node.y };
  `;

  const res = await callPlugin("execute", { code });
  console.log("Result:", res);
}

main().catch(console.error);
```
Jalankan di shell:
```bash
bun /tmp/my_figma_script.ts
```

---

### Cara 2: One-Liner CLI Query
Gunakan untuk mengecek halaman aktif, seleksi, atau node cepat:
```bash
bun "/mnt/HDD-2/BACKUP LINUX/FILE DATA/SOFTWARE LINUX/figma-bridge/call_figma.ts" execute 'return { page: figma.currentPage.name, count: figma.currentPage.children.length };'
```

---

## 🛡️ 3. SOLID HARD SHADOW LAW (ANTI-SCHEMA VALIDATION ERROR)

Dalam Figma Plugin API via relay WebSocket, objek `DROP_SHADOW` pada `node.effects` rentan gagal validasi schema jika properti seperti `spread`, `blendMode`, atau `showShadowBehindNode` tidak lengkap.

### Solusi Permanen (0% Blur Hard Extrusion):
Buat objek backing fisik (`createRectangle()`) di belakang frame target:
```ts
// Buat bayangan solid hard extrusion
const shadow = figma.createRectangle();
shadow.resize(targetFrame.width, targetFrame.height);
shadow.x = targetFrame.x + 8; // Offset X (+6px s/d +10px)
shadow.y = targetFrame.y + 8; // Offset Y (+6px s/d +10px)
shadow.cornerRadius = targetFrame.cornerRadius;
shadow.fills = [{ type: "SOLID", color: { r: 0.004, g: 0.161, b: 0.412 } }]; // Navy solid #012969
parentFrame.appendChild(shadow);

// Pasang targetFrame di atas bayangan
parentFrame.appendChild(targetFrame);
```
**Keunggulan:**
1. Zero error schema relay client 100%.
2. Menghasilkan estetika *Desain Modern Tegas* yang tajam, kontras tinggi, dan berkelas tanpa *shadow bleed* yang kabur.

---

## 📷 4. CLOSED-LOOP VISION QA PIPELINE (EXPORT & AUDIT)

Setiap modifikasi desain di Figma **WAJIB diverifikasi secara visual** menggunakan `read_file`:

```ts
const res = await callPlugin("execute", {
  code: `
    const node = await figma.getNodeByIdAsync("865:24186");
    if (!node) return { error: "Node not found" };
    const bytes = await node.exportAsync({
      format: "PNG",
      constraint: { type: "SCALE", value: 1 } // value: 2 untuk Retina
    });
    return { base64: figma.base64Encode(bytes) };
  `
});

if (res?.value?.base64) {
  const fs = require("fs");
  const outPath = "/home/arya/.gemini/antigravity-cli/brain/<conv-id>/poster_preview.png";
  fs.writeFileSync(outPath, Buffer.from(res.value.base64, "base64"));
}
```
Lalu panggil `read_file` pada file PNG tersebut untuk melakukan audit:
1. Apakah hirarki ukuran font sudah seimbang (judul 38px, subjudul 18px-20px, body 11.5px-13px)?
2. Apakah jarak padding dan margin konsisten?
3. Apakah elemen masuk dalam safe-zone 1080x1080?

---

## 🩺 5. TROUBLESHOOTING & RELAY HEALTH CHECK

| Gejala Error | Akar Masalah | Solusi Cepat |
| :--- | :--- | :--- |
| `Figma is not connected` | Plugin Figma di Desktop tertutup atau belum dijalankan. | Buka Figma Desktop -> Buka file proyek -> Klik kanan -> Plugins -> Development -> **figma-bridge**. Pastikan strip kecil muncul dengan lampu hijau. |
| `Cannot connect to ws://127.0.0.1:4395` | Daemon relay server belum aktif. | Jalankan `bun "/mnt/HDD-2/BACKUP LINUX/FILE DATA/SOFTWARE LINUX/figma-bridge/server/relay.ts" &` di background. |
| `Port 4395 already in use` | Sesi relay lama masih tersangkut. | `lsof -ti :4395 \| xargs kill -9` lalu restart relay. |
| `Font not loaded error` | Text node dimanipulasi sebelum font di-load. | Wajib panggil `await figma.loadFontAsync({ family, style })` di baris pertama eksekusi script. |
| `Cannot read properties of null` | ID Node salah atau berada di Page lain. | Panggil `await figma.loadAllPagesAsync()` sebelum mencari node jika melintasi beberapa halaman. |
