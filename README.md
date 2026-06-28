# Church of the Sacred Tuber 🥔
> **religion.potatoroad.lt** | *From the darkness of the earth, we rise into the light.*

[![GitHub Pages Deployment](https://img.shields.io/badge/Deploy-GitHub_Pages-orange?style=flat-square&logo=github)](https://pages.github.com/)
[![Bilingual Support](https://img.shields.io/badge/Language-EN%20%7C%20LT-gold?style=flat-square)](#bilingual-support)
[![Legal Status](https://img.shields.io/badge/Status-Draft_Statutes-red?style=flat-square)](#legal-compliance)

Official web portal and legal repository for the **Church of the Sacred Tuber** (Lithuanian: *Šventojo Šakniagumbio Bažnyčia*), a non-traditional religious community founded in 2026. This portal serves to coordinate our founding council and host the official bilingual statutes (*Įstatai*) required for legal registration under the Ministry of Justice of the Republic of Lithuania.

---

## 🏛️ Spiritual Foundation

The Church of the Sacred Tuber is built on the philosophical appreciation of the agricultural cycle, ecological humility, and the natural miracle of resurrection. Our moral compass is defined by **The Starch Doctrine**:

1. **The Mashed (Humility & Unity)**: In fragmentation and breaking, we find connection. We blend as a collective, leaving no individual behind.
2. **The Fried (Purity Through Trial)**: It is through the heat of the fire and the oil that we refine our character to crispy perfection.
3. **The Baked (Patience & Comfort)**: A slow, quiet transformation in the hearth. Softening under pressure to provide warmth and sustenance to a cold world.

---

## ⚖️ Legal Compliance & Road to Recognition

To avoid the classification of "parody" by state authorities (e.g., the Lithuanian Ministry of Justice / *Teisingumo Ministerija*), this repository and its connected portal maintain **unwavering, deadpan sincerity**. 

Establishing a non-traditional religious community requires satisfying strict legal parameters:
1. **The Founding 15**: Assembly of at least 15 adult citizens signing the minutes of the inaugural meeting (*steigiamojo susirinkimo protokolas*).
2. **The Holy Statutes**: Formal articles governing operations, leadership, assets, and dissolution, provided side-by-side in Lithuanian and English.
3. **The 25-Year Cycle**: Legal registration grants immediate legal entity privileges, leading to full state recognition by the Seimas after 25 years of active presence.

---

## 📂 Repository Structure

```
├── assets/
│   └── images/
│       ├── church_seal.jpg          # Gold circular emblem
│       └── sacred_tuber_hero.jpg    # Hero image of the Sacred Tuber
├── CNAME                            # Custom domain routing (religion.potatoroad.lt)
├── index.html                       # Core bilingual index page (EN / LT toggling)
├── style.css                        # Modern glassmorphic styling sheet
├── script.js                        # Particle background, FAQ accordion, & signature pad logic
└── .gitignore                       # System and configuration ignore rules
```

---

## 🚀 Development & Preview

The website is written in vanilla HTML5, CSS3, and JavaScript, requiring no compiler or preprocessor.

### Running Locally
To run and test the portal:
1. Clone this repository.
2. Open `index.html` directly in any web browser, or serve it using a lightweight local server:
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js
   npx http-server -p 8000
   ```
3. Open `http://localhost:8000` to preview.

### Features Included
* **CSS Language Class Toggling**: Toggles body class between `lang-en` and `lang-lt`, hiding/showing localized tags instantly while retaining custom layout structures. Caches selection in `localStorage`.
* **HTML5 Canvas Signature Pad**: Captures cursor/stylus strokes to allow co-founders to sign the inaugural deed digitially. Saves signing status to prevent double-submits.
* **Canvas Spark Animation**: Lightweight particle loops simulating floating golden starch embers.
* **Print Stylesheet integration**: Tapping "Download PDF" leverages standard print triggers, formatted to cleanly capture only the Statutes section as a document sheet.

---

## 🌐 Deployment to GitHub Pages

This repository is optimized for zero-configuration deployment to GitHub Pages:

1. Push this codebase to a public GitHub repository.
2. Go to **Settings > Pages**.
3. Under **Build and deployment**, set the source to **Deploy from a branch** and select `main` (or `master`) root `/`.
4. Under **Custom domain**, enter `religion.potatoroad.lt` and save. The `CNAME` file in the root will automatically link it.
5. Configure your DNS provider (for `potatoroad.lt`) to point `religion` to GitHub's server IPs or `yourusername.github.io` via a CNAME record.

---

## 📜 License

This project is licensed under the MIT License - see the LICENSE file for details. Let it be known that the starch of the earth belongs to all mankind.
