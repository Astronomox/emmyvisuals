# Emmy Visuals

A luxury photography portfolio for Lagos-based photographer Emmy.

## Quick Start

```bash
npm install
npm run dev
```

Visit http://localhost:5173

## Routes

| URL | Page |
|-----|------|
| `/` | Splash |
| `/catalog` | Photo catalogue |
| `/services` | Pricing |
| `/contact` | Booking form |
| `/#/admin` | Hidden admin panel |

> The admin route is invisible on the public site. Share only `/` with clients.

## Adding Real Photos

Drop `.jpg` files into `public/photos/` following this naming:
```
weddings-1.jpg  ...  weddings-6.jpg
portraits-1.jpg ...  portraits-6.jpg
birthdays-1.jpg ...  birthdays-6.jpg
fashion-1.jpg   ...  fashion-6.jpg
corporate-1.jpg ...  corporate-6.jpg
passports-1.jpg ...  passports-6.jpg
```

The catalog auto-loads them. No code changes needed.

## Deploy to Vercel

1. Push this folder to GitHub
2. Import the repo on vercel.com
3. Framework preset: **Vite**
4. Deploy

The `vercel.json` handles client-side routing automatically.

## Customising

- **Prices** → `src/components/Services.jsx` → `PRICING` object
- **Contact info** → `src/components/Contact.jsx`
- **Categories** → `src/components/Catalog.jsx` → `CATS` array
- **Colors** → `src/styles/index.css` → `:root` variables
