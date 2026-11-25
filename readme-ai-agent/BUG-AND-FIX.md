# `readme-ai-agent/BUG-AND-FIX.md` — Root-Cause & Fix Ledger

- **Issue:** `pdf-deck` TypeScript build ikut mengompilasi folder engine internal atau file luar scope.
  - **Fix (`6014772`):** Exclude folder engine di `pdf-deck` `tsconfig` dan rapikan symlink `slidedeck-gen` / `next-slidedeck-engine` -> `pdf-deck`.
- **Issue:** `M5` gaps (`contrast.py` missing reference, 5-stack sync, `android-cli` handoff).
  - **Fix (`dd027ed`):** Lengkapi `contrast.py`, samakan tabel 5-stack di `web-planning`, & tambah handoff ke `android-cli`.
- **Issue:** `git push` gagal dengan `SSL: certificate subject name 'Web secure CA' does not match target hostname 'github.com'`.
  - **Fix:** Disebabkan MITM/proxy jaringan lokal; push ulang setelah proxy/VPN SSL interception dimatikan.
