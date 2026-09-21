# Kate's bachelorette site

A private, password-gated planning page for Kate's Napa / Sonoma weekend (March 25–28, 2027).

## Run it

```bash
npm install
npm run dev
```

Open the Local URL (usually http://127.0.0.1:5173). Password for the site: `farmtotable`. Planning tab: `olivebranch`.

## Guest survey

The welcome page form saves to `data/rsvps.json` on the computer that's running the site. Same email can update their reply. Open **Planning** to see everyone's answers and download a CSV.

Everyone has to hit the same running site — a static file upload (plain GitHub Pages) will not collect replies. `npm run dev` or `npm run preview` keeps the list. Don't commit `data/rsvps.json` (it's gitignored).

## Passwords

Edit `src/site.ts`. Courtesy locks only — not real security.

## Pages

- **Welcome** — invite + survey
- **Weekend agenda**
- **Travel & stay** — flights, house, rooms, packing
- **Cost breakdown**
- **Planning** — survey results, games, surprises

Copy lives in `src/site.ts`.
