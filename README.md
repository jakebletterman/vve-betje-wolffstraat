# VvE Betje Wolffstraat 12 t/m 70 — Website

Statische informatiewebsite voor de bewoners van VvE Betje Wolffstraat 12 t/m 70 in Groningen.  
Drie pagina's: publicatiebord, enquête-router en contactpagina.

---

## Bestanden

| Bestand         | Omschrijving                                      |
|-----------------|---------------------------------------------------|
| `index.html`    | Publicatiebord (homepage met hero en aankondigingen) |
| `enquete.html`  | Questionnaire die naar de juiste Google Form routeert |
| `contact.html`  | Contactgegevens en klachtenprocedure              |
| `styles.css`    | Alle gedeelde stijlen en CSS custom properties    |
| `script.js`     | Aankondigingen-array en enquête-logica            |
| `hero.jpg`      | Foto van het gebouw (hero achtergrond)            |
| `vercel.json`   | Minimale configuratie voor Vercel deployment      |

---

## Een nieuwe aankondiging toevoegen

Open `script.js` en voeg een nieuw object toe aan het **begin** van de `ANNOUNCEMENTS`-array.  
Het eerste object in de array verschijnt bovenaan de pagina.

```js
const ANNOUNCEMENTS = [
  // ← Voeg hier een nieuwe aankondiging toe
  {
    title: "Titel van de aankondiging",
    date: "maand jaar",           // bijv. "september 2026"
    body: `Volledige tekst van de aankondiging.

Gebruik een lege regel voor een nieuwe alinea.
Witregels worden behouden.`,
    signatory: "Groningen, september 2026\nVoornaam Achternaam\nvoorzitter"
  },
  // ... bestaande aankondigingen hieronder
];
```

Sla `script.js` op en ververs de pagina — de aankondiging verschijnt direct.

---

## Google Form links instellen

Open `script.js`. Bovenaan het bestand staan drie constanten:

```js
const FORM_EB = "https://docs.google.com/forms/PLACEHOLDER_EB"; // Eigenaar + zelf bewoner
const FORM_EV = "https://docs.google.com/forms/PLACEHOLDER_EV"; // Eigenaar + verhuurder
const FORM_HB = "https://docs.google.com/forms/PLACEHOLDER_HB"; // Huurder + bewoner
```

Vervang elke `PLACEHOLDER_*`-URL met de echte deelbare link van het betreffende Google-formulier.  
De link staat in Google Forms onder **Verzenden → Link**.

---

## Lokaal bekijken

Open `index.html` direct in een browser, of gebruik een live-server extensie (bijv. VS Code Live Server).  
Er is geen build-stap nodig.

---

## Deployen via Vercel

### Eenmalige setup

1. Ga naar [vercel.com](https://vercel.com) en log in (of maak een account aan).
2. Klik op **Add New → Project**.
3. Selecteer de GitHub repository `vve-betje-wolffstraat`.
4. Framework Preset: **Other** (geen framework, pure HTML).
5. Build Command: leeg laten.
6. Output Directory: leeg laten (of `.`).
7. Klik **Deploy**.

Vercel geeft direct een tijdelijke URL zoals `vve-betje-wolffstraat.vercel.app`.

### Daarna

Elke `git push` naar de `main`-branch triggert automatisch een nieuwe deploy.
