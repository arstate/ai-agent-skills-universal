# 7-Layer Anti-Hack Security Policy & Audit (`readme-ai-agent/SECURITY.md`)

1. **Secrets & Bundle Isolation:** `import "server-only"`, 0 private keys in `NEXT_PUBLIC_*`.
2. **Server Actions & Route Authz:** Re-verify session + ownership inside every handler.
3. **Input Validation:** Strict Zod schemas + honeypot field.
4. **Database Rules:** Locked `firestore.rules` / RLS.
5. **XSS & URI Safety:** 0 `dangerouslySetInnerHTML`, `encodeURIComponent()` on all WhatsApp URLs.
6. **Media Upload Guard:** Restricted format (`webp,jpg,png`) & size limits.
7. **Security Headers & Anti-Cheat (`CONSTRAINTS`):** CSP, HSTS, `X-Frame-Options: DENY`, 0 `@ts-ignore` / `eslint-disable`.
