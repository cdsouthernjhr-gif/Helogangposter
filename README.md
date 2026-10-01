# Poster Interaktif Helogang → Google Form

Web page poster 4:5 (1080×1350). Tekan **mana-mana bahagian** poster → terus buka Google Form (tab yang sama).
Tiada backend, tiada build step — fail statik sahaja.

```
index.html   struktur + meta Open Graph
style.css    reka bentuk, animasi, responsive
script.js    klik/tap mana-mana kawasan → GOOGLE_FORM_URL
assets/      helogang-logo.png, helodotcom-logo.png, og-image.jpg (preview WhatsApp)
```

## ⚠️ Limitasi WhatsApp (penting)
WhatsApp **tidak** membenarkan hyperlink pada imej biasa (JPG/PNG), dan **tidak** menjalankan JavaScript dalam preview.
Pengalaman paling hampir yang sebenar-benar boleh dibuat:

**WhatsApp → kad preview URL (og-image + tajuk) → pengguna tekan → poster web page dibuka → tekan mana-mana bahagian → Google Form**

Jadi pengguna menekan dua kali (kad preview, kemudian poster). Untuk hasil terbaik, hantar **URL sahaja** (tanpa teks lain) supaya kad preview besar dipaparkan.

## Pautan Google Form
```
https://docs.google.com/forms/d/e/1FAIpQLSdIWbQHpjLlvTuCH0X7gv6DH2ZARXH3KQwr7KA5pZM1qn3JqA/viewform
```
Ia ada di dua tempat: `href` pada `<a id="poster">` dalam `index.html` (fallback tanpa JavaScript) dan `GOOGLE_FORM_URL` dalam `script.js`.

## Langkah wajib selepas deploy: tetapkan URL sebenar untuk preview
WhatsApp memerlukan URL **penuh `https://`** untuk `og:image`. Dalam `index.html`, gantikan semua
`https://YOUR-DOMAIN.example` dengan URL hosting anda, contohnya:

| Hosting | Contoh URL asas |
|---|---|
| GitHub Pages | `https://USERNAME.github.io/helogang-poster` |
| Firebase | `https://NAMA-PROJEK.web.app` |
| Netlify | `https://nama-anda.netlify.app` |
| Vercel | `https://nama-anda.vercel.app` |

(`og:image` → `…/assets/og-image.jpg`, `og:url` → URL halaman.) Deploy semula, kemudian ujian kad preview di
[Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/) (klik *Scrape Again*) — WhatsApp menyimpan cache preview, jadi URL yang pernah dikongsi mungkin tidak berubah serta-merta; tambah `?v=2` pada URL untuk paksa preview baharu.

## Deploy — GitHub Pages
1. Cipta repo baharu di GitHub (cth. `helogang-poster`), muat naik semua fail dalam folder ini ke root repo.
   ```bash
   git init && git add . && git commit -m "Poster Helogang"
   git branch -M main
   git remote add origin https://github.com/USERNAME/helogang-poster.git
   git push -u origin main
   ```
2. **Settings → Pages → Build and deployment → Source: Deploy from a branch → Branch: `main` / `(root)` → Save.**
3. Tunggu ~1 minit. URL: `https://USERNAME.github.io/helogang-poster/`
4. Kemas kini URL `og:*` (lihat atas), commit & push.

## Deploy — Firebase Hosting
```bash
npm install -g firebase-tools
firebase login
firebase init hosting     # pilih/cipta projek; public directory: .  ; single-page app: No ; overwrite index.html: No
firebase deploy --only hosting
```
`firebase.json` sudah disediakan (public = folder ini). URL: `https://NAMA-PROJEK.web.app`

## Deploy — Netlify / Vercel
- **Netlify:** drag & drop folder ini di app.netlify.com/drop (atau sambung repo; build command kosong, publish directory `.`).
- **Vercel:** `npx vercel --prod` dalam folder ini (Framework: *Other*, tiada build command, output `.`).

## Ubah suai pantas
- Teks: `index.html` (tajuk `<h1>`, subtajuk `.sub`, CTA `.cta-text`).
- Warna: pembolehubah `--o1/--o2/--o3/--y` di atas `style.css`.
- Semua saiz guna unit `cqw` (peratus lebar poster), jadi poster mengekalkan nisbah 4:5 pada semua skrin.
- Animasi guna `transform`/`opacity` sahaja (ringan) dan dimatikan jika peranti set *reduce motion*.
