# CalorieCoach 💪

**Fitness & Diet Tracker** — A single-page web app that calculates BMR/TDEE, generates personalized diet charts, tracks water intake, logs weight history, and creates shopping lists.

**Live demo:** [https://caloriecoach-tracker.web.app](https://caloriecoach-tracker.web.app)

## Features

- **BMR & TDEE Calculator** — Mifflin-St Jeor equation with activity multipliers
- **Personalized Diet Charts** — Default plan (pre-defined meals) or custom (pick your own foods by category)
- **Custom Macro Split** — Adjust protein/carbs/fat percentages
- **3 Diet Goals** — Lose, Maintain, Gain weight with automatic calorie adjustment
- **3–6 Meals Per Day** — Configurable meal schedule
- **Food Database** — 100+ foods across protein, carbs, fats, vegetables, fruits, and dairy categories, dynamically fetched from a remote JSON file
- **Open Food Facts Integration** — Search the public Open Food Facts database for barcode-scanned products
- **Custom Foods** — Add your own foods with custom nutrition data
- **Water Intake Tracker** — Daily goal with quick-add buttons, progress bar, and auto-reset
- **Weight History Chart** — Canvas-based line chart with persistent logs
- **Shopping List Generator** — Auto-generates categorized shopping lists from your diet chart
- **Export & Copy** — Print-friendly PDF, copy formatted summary, export/import backup
- **Dark & Light Theme** — Persisted toggle
- **Fully Responsive** — Desktop, tablet, and mobile
- **localStorage Persistence** — All data stays in your browser

## Tech Stack

- Vanilla JS (ES5 compatible)
- CSS3 with CSS custom properties, glassmorphism, animations
- HTML5 semantic markup
- Firebase Hosting
- Open Food Facts API
- localStorage for persistence

## Getting Started

```bash
git clone https://github.com/glorandrew/caloriecoach.git
cd caloriecoach
# Serve with any static file server, e.g.:
npx serve .
```

No build step required — open `index.html` in a browser.

### Deploy to Firebase

```bash
npm install -g firebase-tools
firebase login
firebase init hosting
firebase deploy --only hosting
```

## Project Structure

```
index.html              — Main SPA structure and all modals
css/style.css           — All styles (responsive, dark/light themes, animations)
js/
  app.js                — Event binding, DOM init, theme toggle, scroll spy
  calculator.js         — BMR/TDEE/BMI calculations, macro ratios
  charts.js             — Canvas-based weight chart and macro balancer
  database.js           — Food data, CustomFoodDB, ApiCache, FoodDBLoader
  ui.js                 — Diet generation, water tracker, shopping list, export, modals
  api.js                — Open Food Facts API client
  firebase.js           — Firebase initialization
food-database.json      — External food data (fetched dynamically at runtime)
firebase.json           — Firebase Hosting configuration
```

## Data Flow

1. User fills in personal metrics, activity level, and goal
2. BMR/TDEE/target calories calculated
3. Diet chart generated from food database (built-in or user preferences)
4. Meals are scaled to meet daily calorie and macro targets
5. All data persisted in localStorage for history, water, weight tracking

Food database is served as a static JSON from Firebase Hosting, cached in localStorage for 24 hours, falling back to built-in data when offline.

## License

MIT
