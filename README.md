# BG Labourworks — PWA

This is your prototype, packaged as a real installable app (Progressive Web App).
Once deployed, anyone can open the link on their phone and "Add to Home Screen" —
it'll behave like a native app: full-screen, its own icon, works offline.

## Get it running on your phone — fastest path (10 minutes, no coding)

**Step 1 — Push this folder to GitHub**
1. Go to https://github.com, create a free account if needed
2. Create a new repository (e.g. `bg-labourworks`)
3. Upload this entire folder to it (drag-and-drop on the GitHub website works fine —
   you don't need to use git commands)

**Step 2 — Deploy with Vercel (free)**
1. Go to https://vercel.com and sign up with your GitHub account
2. Click "Add New Project", select your `bg-labourworks` repo
3. Leave the default settings (Vercel auto-detects Vite) and click Deploy
4. In ~60 seconds you'll get a live URL like `bg-labourworks.vercel.app`

**Step 3 — Install it on your phone**
- **iPhone**: open the URL in Safari → tap the Share icon → "Add to Home Screen"
- **Android**: open the URL in Chrome → tap the ⋮ menu → "Install app" (or "Add to Home Screen")

You now have an app icon on your home screen that opens full-screen with no browser bar.

## Running it locally first (optional, if you want to test before deploying)

Requires Node.js installed (download from https://nodejs.org if you don't have it):

```
npm install
npm run dev
```

Then open the local URL it prints (usually `http://localhost:5173`) in your browser.

## What's real vs. mock right now

- ✅ Installable, works offline, looks/feels like a native app
- ✅ Full worker + employer UI flow
- ❌ No live database yet — connect it to `schema.sql` + Supabase (see earlier files)
- ❌ No live payments yet — connect it to `server.js` (Stripe Connect backend, see earlier files)

## Next step: wiring it to the real backend

Right now the buttons just move between screens with mock data. To make it fully live,
the form submissions need to call the `server.js` API endpoints instead — I can do that
wiring for you whenever you're ready.
