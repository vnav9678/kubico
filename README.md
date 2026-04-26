# Kubico – Modular Garden Planters

Kubico is an online shop for modular, sustainably sourced timber garden planters. Customers can browse a full product catalogue, use a step-by-step configurator to design a custom planter, generate a printable quote, and complete a checkout flow — all within a single-page React application.

---

## Prerequisites – Installing Node.js on Windows 11

Before running the project you need Node.js (version 18 or later) installed on your machine.

**Step-by-step instructions (PowerShell):**

1. Open PowerShell as Administrator (right-click the Start button → "Windows PowerShell (Admin)").
2. Check whether Node.js is already installed:
   ```
   node --version
   ```
   If you see a version number (e.g. `v22.0.0`) you can skip to the next section.
3. Download the Node.js installer from the official site:
   - Visit https://nodejs.org in your browser.
   - Click the **"LTS"** download button (recommended for most users).
   - Run the downloaded `.msi` file and follow the installation wizard (accept all defaults).
4. Close and reopen PowerShell, then verify the installation:
   ```
   node --version
   npm --version
   ```
   Both commands should print version numbers.

---

## Running the Project on Windows 11

1. Open PowerShell (no administrator rights needed this time).
2. Navigate to the Kubico project folder:
   ```
   cd C:\path\to\kubico
   ```
   Replace `C:\path\to\kubico` with the actual path where you saved the project, for example:
   ```
   cd C:\Users\YourName\Downloads\kubico
   ```
3. Install the project dependencies:
   ```
   npm install
   ```
   This may take a minute. You will see a progress bar and some messages — that is normal.
4. Start the development server:
   ```
   npm run dev
   ```
   You will see output similar to:
   ```
   VITE v8.x.x  ready in 300 ms
   ➜  Local:   http://localhost:5173/
   ```

---

## Opening the App in Your Browser

Once the server is running, open your web browser and go to:

```
http://localhost:5173
```

The Kubico app will load. You can browse products, use the configurator, add items to the cart, and go through the checkout flow.

---

## Stopping the Server

To stop the development server, return to the PowerShell window where it is running and press:

```
Ctrl + C
```

Type `Y` and press Enter if PowerShell asks you to confirm. The server will stop.

---

## Tech Stack (for developers)

- React 18 + TypeScript
- Vite 8 (build tool)
- Tailwind CSS v4 (styling)
- React Router v6 (navigation)
- localStorage (cart persistence, no backend required)
