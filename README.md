# Sruthy & Adarsh — Wedding Invitation Website

A premium, cinematic digital wedding invitation designed with a traditional vintage Kerala theme. The website features interactive elements, elegant Malayalam/Sanskrit cultural accents, and fluid viewport entry animations optimized for both desktop and mobile screens.

---

## 🌟 Cinematic Entrance Flow & Timing
The landing experience utilizes a choreographed reveal sequence to build excitement:
1. **Closed Curtains (0.0s):** The page loads showing red velvet drapes meeting at the center.
2. **Wax Seal Drops (0.8s):** An antique gold wax seal (`seal.png`) stamps down at the junction of the drapes with a physical bounce transition.
3. **Leaves Start Falling (0.8s):** A gentle trickle of organic green and golden-brown leaves starts falling immediately across the screen.
4. **Drapes Slide Open (User Tap):** Clicking or tapping the wax seal triggers the curtains to fold and slide outward.
5. **White Screen & Background Fade (1.2s):** As the curtains part, a solid white background is revealed, which then fades out smoothly over `1.2s` to transition to the warm photo background.
6. **Staggered Text Reveals (2.0s onwards):** The central invitation card and its text elements (swaying bell, couple names, gold ornamental lines) cascade into view one-by-one.

---

## 💡 Key Features
- **Autoplay Classical Flute Music:** A background flute melody plays automatically once the user taps to open the curtains (bypassing browser autoplay security restrictions by leveraging a direct user interaction stack).
- **Two-Tone Ambient Falling Leaves:** Custom CSS-animated falling leaves loop infinitely with randomized delay offsets, using a 50/50 organic color mix (forest-green and vintage teak-brown).
- **Scratch-Card Date Reveal:** Guests scratch a row of 3 golden hearts to reveal the numeric ceremony date (`30` / `08` / `2026`).
- **Tactile Paper Texture:** A fixed overlay replicates the tactile feel of traditional handmade wedding cards.
- **Responsive Layout:** Responsive mobile image swap swaps out high-res desktop graphics for mobile-optimized equivalents to ensure pixel-perfect rendering on narrow screens.

---

## 🎨 Visual Identity & Typography
The design implements the following curated styling tokens:
- **Colors:** Warm Ivory (`#FDFBF7`), Teak Brown (`#2E1E17`), and Antique Gold (`#C5A880`).
- **Typography Pairing:**
  - **Couple Names & Section Titles:** *Cormorant Garamond* (Elegant editorial serif)
  - **Body text, Buttons & Navigation:** *Manrope* (Geometric sans-serif)
  - **Accents & Accompanying Accents:** *Petit Formal Script* (Delicate script cursive)

---

## 🚀 Getting Started

### 1. Installation
Install the project dependencies:
```bash
npm install
```

### 2. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the project.

### 3. Build for Production
To compile and test the optimized production build:
```bash
npm run build
```

---

## 📱 Mobile Testing
The project is configured to allow network connections over local area networks for physical mobile device testing:
1. Find your machine's local IP address (e.g. `192.168.0.104`).
2. Run the development server.
3. Open `http://<your-local-ip>:3000` on your mobile phone's browser.
4. Hot-reloading and hydration permissions are white-listed in `next.config.ts` under `allowedDevOrigins` to ensure event handlers execute correctly on the local network.
