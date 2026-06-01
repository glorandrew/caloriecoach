# FitPulse - Fitness & Diet Tracker Specification

## 1. Project Overview

- **Project Name**: FitPulse - Fitness & Diet Tracker
- **Project Type**: Single-page web application
- **Core Functionality**: Calculate BMR, TDEE, generate personalized diet charts, track water intake, log weight history, generate shopping lists
- **Target Users**: Fitness enthusiasts looking for dietary guidance
- **Tech Stack**: Vanilla JS (ES5), CSS3, HTML5, localStorage persistence, Open Food Facts API

## 2. UI/UX Specification

### Layout Structure

**Header**
- Logo/Brand name on left (gradient "FitPulse" with 💪 icon)
- Navigation links on right (Home, Calculator, About)
- Theme toggle button (🌙/☀️)
- Hamburger menu for mobile (animated X on open)
- Sticky with backdrop blur, border-bottom on scroll
- Mobile nav: slide-in panel from right with overlay

**Hero Section**
- Full-width gradient background with animated grid pattern
- Tagline with gradient accent text
- 4 stat cards (BMR, TDEE, Meals Daily, Personalized)
- Floating shape animations (circles with float keyframes)
- CTA button to scroll to calculator

**Calculator Section**
- Two-column layout on desktop (form left, results right)
- Form sections: Personal Info, Body Metrics
- Real-time validation clearing on input
- Custom macro split collapsible panel
- Meals per day selector (3-6)
- Diet preference radio buttons (Vegetarian/Non-Vegetarian)

**Results Section**
- 4 metric cards (BMR, TDEE, Target Calories, BMI) with animated counters
- 3 macro cards (Protein, Carbs, Fats) with gradient progress bars
- Water intake display card
- Water tracker (glass buttons, progress bar, daily reset)
- Export bar (Print, Copy Summary, Shopping List, PDF)
- Diet plan choice (FitPulse Default / Customize My Own)
- Food selection panel (meal tabs, search, category filters, food grid, selected foods)
- Diet chart table (meal rows with per-meal targets, daily total row)

**History Section**
- Weight logger input with chart
- History list with trend indicators

**Footer**
- Logo, navigation links, social media icons

### Responsive Breakpoints
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

### Visual Design

**Color Palette (Dark Theme)**
- Primary: #0D1B2A (Dark Navy)
- Secondary: #1B263B (Slate Blue)
- Accent: #00F5D4 (Electric Cyan)
- Accent Secondary: #00B4D8 (Sky Blue)
- Accent Secondary (alt): #FF6B6B (Coral Red)
- Background: #0D1B2A
- Card Background: #1B263B (via glass effect)
- Text Primary: #E0E1DD
- Text Secondary: #778DA9
- Success: #00F5D4
- Warning: #FFE66D
- Border: #415A77

**Color Palette (Light Theme)**
- Toggle via `data-theme="light"` attribute
- Primary/Background: #f8f9fa
- Secondary: #e9ecef
- Card Background: #ffffff
- Text Primary: #1a1a2e
- Text Secondary: #555770
- Border: #ced4da
- Accent: #00b894
- Accent Secondary: #0984e3

**Typography**
- Headings: 'Outfit', sans-serif (Google Fonts)
- Body: 'DM Sans', sans-serif (Google Fonts)
- Hero Title: 56px / 36px mobile
- Section Titles: 42px / 28px mobile
- Body Text: 16px
- Small Text: 14px/13px/12px

**Spacing System**
- Section Padding: 80-100px vertical, 24px horizontal
- Card Padding: 24-32px
- Element Gap: 16-20px
- Input Padding: 14px 16px

**Visual Effects**
- Cards: Glassmorphism with backdrop-filter blur (12-20px), subtle border
- Buttons: Gradient backgrounds with hover scale (1.05), active scale (0.98)
- Inputs: Focus ring with accent color glow, dark background (#1B263B)
- Page load: Staggered fade-in-up animations
- Results card: Delayed fade-in-up per card (0-300ms stagger)
- Hover: Cards translateY(-5px), items translateX(4px), various transitions

### Components

**Input Fields**
- Rounded corners (10px)
- Dark background (#1B263B)
- Border: 1px solid #415A77
- Focus state: Cyan border glow + box-shadow
- Error state: Coral red border + box-shadow

**Buttons**
- Primary: Gradient from #00F5D4 to #00B4D8, dark text
- Secondary (export-btn): Glass background, border, text color
- Unit toggle: Small accent button next to input
- Hover: Scale, shadow, border-color change
- Active: Scale 0.98

**Cards (Result/Macro/Diet)**
- Rounded corners (16-20px)
- Glass effect background (rgba backdrop-filter)
- Subtle border (1px rgba white 0.08)
- Top accent gradient line on result cards
- Hover: TranslateY(-5px), enhanced border

**Tables**
- Striped rows (alternating rgba black)
- Sticky header with uppercase accent text
- Scrollable on mobile (min-width 700px)
- Hover highlight row

**Modals**
- Quantity modal (slider 10-300g, nutrition preview, add to meal)
- Food preference modal (6 categories, select foods, generate)
- Shopping list modal (categorized, checkable items)
- Backdrop overlay with blur(4px)

## 3. Functionality Specification

### Core Features

**Input Collection**
1. Personal Info
   - Name (text)
   - Age (number, 15-100)
   - Gender (male/female/other)

2. Body Metrics
   - Weight (kg/lbs toggle, range: 30-300 kg / 66-660 lbs)
   - Height (cm/in toggle, range: 100-250 cm / 39-98 in)

3. Activity Level (select)
   - Sedentary (1.2)
   - Lightly Active (1.375)
   - Moderately Active (1.55)
   - Very Active (1.725)
   - Extra Active (1.9)

4. Fitness Goal (select)
   - Lose Weight (-500 cal deficit)
   - Maintain Weight (TDEE)
   - Gain Weight (+500 cal surplus)

5. Meals Per Day (3-6)
   - 3: Breakfast, Lunch, Dinner
   - 4: + Afternoon Snack
   - 5: + Morning & Afternoon Snack (default)
   - 6: + Evening Snack

6. Custom Macro Split (collapsible form)
   - Protein % / Carbs % / Fat % inputs (5-80 range)
   - Auto-normalizes to sum 100% on input
   - Stores in `fitpulse-macro-split` localStorage key

7. Diet Preference (radio)
   - Vegetarian
   - Non-Vegetarian

**Calculations**
1. BMR (Mifflin-St Jeor Equation)
   - Male: BMR = (10 x weight) + (6.25 x height) - (5 x age) + 5
   - Female: BMR = (10 x weight) + (6.25 x height) - (5 x age) - 161
   - Other: Average of male & female

2. TDEE = BMR x Activity Multiplier

3. Target Calories based on goal
   - Lose: TDEE - 500 (min 1200 cal floor)
   - Maintain: TDEE
   - Gain: TDEE + 500

4. Macro Grams
   - Protein g = (targetCal x proteinRatio) / 4
   - Carbs g = (targetCal x carbsRatio) / 4
   - Fat g = (targetCal x fatRatio) / 9

5. BMI = weight(kg) / (height(m))^2
   - <18.5: Underweight
   - 18.5-25: Normal
   - 25-30: Overweight
   - >30: Obese

6. Daily Water Intake
   - Base: 33ml per kg body weight
   - Activity multiplier: 1.0 (sedentary) to 1.5 (very/extra active)

**Diet Chart Generation**

**FitPulse Default Plan** (via food preferences)
- Food Preference Modal shows 6 categories from foodDatabaseDetailed:
  - Protein (12 items: Chicken Breast, Salmon, Eggs, Paneer, etc.)
  - Carbs (12 items: Brown Rice, Quinoa, Oats, etc.)
  - Vegetables (14 items: Broccoli, Spinach, Carrots, etc.)
  - Fruits (12 items: Apple, Banana, Orange, etc.)
  - Dairy (10 items: Milk, Greek Yogurt, Whey Protein, etc.)
  - Fats (12 items: Avocado, Almonds, Olive Oil, etc.)
- User selects preferred foods per category; selections saved to `fitpulse-food-prefs`
- At least one selection from Protein, Carbs, or Vegetables required
- "Skip & Use Default" falls back to pre-defined meal plans (foodDatabase)

**Rotating Queue Food Selection** (generateDietWithPreferences)
- Each category gets a shuffled queue of user-selected food names
- `pickOne(queue)`: shift front item off, push it to back of queue (fair rotation)
- Per meal, picks: 1 protein, 1 carb, 1 veg, 1 fat
- Dairy picked for breakfast + snack meals, fruit for snack meals
- Per-meal target calories derived from mealConfig distribution × daily target

**Macro-Gram-First Scaling**
- Fixed foods (veg, dairy, fruit) subtracted from macro targets first at standard portions
  - Veg: 80g main meals, 50g snacks
  - Dairy: 120g
  - Fruit: 100g
- Protein source scaled by `(remP / proteinPer100g) × 100`, clamped 20-300g
- Carb source scaled by `(remC / carbsPer100g) × 100`, clamped 20-350g
- Fat source scaled by `(remF / fatPer100g) × 100`, clamped 5-60g
- Fat remaining = targetF - actualF from protein + carb sources (not veg/dairy/fruit)

**Per-Meal Display**
- Each meal row shows: actual calories vs target with ✅ or ⚠️ status
- Gram targets for P/C/F shown below actuals
- Split % shown in parentheses (e.g. 30/40/30)

**Daily Total Row**
- Bottom row sums all meals and compares against daily target
- ✅ if within 10 cal, otherwise ⚠️ with over/under amount

**Custom Plan** (Customize My Own)
- Meal tabs (breakfast, lunch, etc.) for per-meal food assignment
- Food grid with category filters: All, Protein, Carbs, Fats, Vegetables, Fruits, Dairy, Custom, API
- Search input (filters local + triggers Open Food Facts API)
- Quantity slider modal on food click (10-300g range, live nutrition preview)
- Selected foods per meal with remove button, running total and remaining macros display
- Foods categorized with emoji badges (Custom, Open Food Facts)
- Custom food add form (name, calories, protein, carbs, fat per 100g)
- Delete custom foods
- Apply button generates diet chart from selections

**Default Fallback** (when preferences have no matching data)
- Falls back to foodDatabase: pre-defined meals per meal/goal/diet combination
- Random selection from available options, scaled to match meal target calories

### Additional Features

**History Tracking**
- Stores last 20 calculations in localStorage (`fitpulse-history`)
- Displays date, BMR, TDEE, target, BMI, goal
- Trend arrows (↑↓→) comparing consecutive entries
- Animates counters on display

**Water Intake Tracker**
- Progress bar with gradient fill
- Quick-add glass buttons: 100ml, 200ml, 330ml, 500ml
- Daily goal from weight/activity calculation
- Auto-resets per day (checks date on init)
- Capped at 2x daily goal
- Persisted in `fitpulse-water` localStorage

**Weight Tracking Chart**
- Canvas-based line chart (700x250px, auto-width via CSS)
- Y-axis: weight range (min/max with 1-unit padding)
- X-axis: dates labeled at first/middle/last point
- Gradient fill under line (cyan to transparent)
- Weight logger input in history section
- Daily log (updates existing entry for same day)
- Shows "Log your weight to see your progress chart" when < 2 entries
- Max 100 entries, sorted by date
- Persisted in `fitpulse-weight-logs` localStorage

**Shopping List Generator**
- Parses diet chart table rows (food-list li elements)
- Extracts name, calories, protein, carbs, fat via regex
- Consolidates duplicate items (counts occurrences)
- Categorizes into: Protein, Carbs, Vegetables, Fruits, Dairy, Other
- Checkable items with strikethrough on check
- "Clear Checks" button resets all checkboxes
- Persists checked state in `fitpulse-shopping-checks` localStorage
- Shows in modal with overlay

**Export to PDF**
- Opens new browser window
- Applies print-optimized white-styled CSS overrides
- Hides hero, header, footer, food selection, water tracker, history, etc.
- Shows results section with diet chart
- Format: white backgrounds, dark text, green accents
- Triggers browser print dialog after 500ms

**Copy Summary**
- Formats text summary: BMR, TDEE, target, BMI, water, diet chart
- Falls back to textarea method for non-HTTPS contexts
- Button shows "✅ Copied!" for 2 seconds

**Theme Toggle**
- Dark/light theme switch (🌙/☀️ button in header)
- Persisted in `fitpulse-theme` localStorage
- Updates `data-theme` attribute on `<html>`
- Full CSS variable swap

**Unit Toggle**
- Weight: kg ↔ lbs (button next to input)
- Height: cm ↔ in (button next to input)
- Converts existing value in input on toggle
- Conversion: kg × 2.20462 = lbs, cm ÷ 2.54 = in
- Tracks state in global variables

**API Integration**
- Open Food Facts search API
- Search triggered on input ≥ 2 characters
- Cached in localStorage (`fitpulse-api-cache`) for 24 hours
- Max 50 cache entries, keeps 40 newest
- Results shown as food grid items with "Open Food Facts" badge
- Can be selected and added to meals with quantity

**Custom Food Database**
- Add custom foods via form (name, calories per 100g, macros)
- Persisted in `fitpulse-custom-foods` localStorage
- Auto-generated unique IDs (`custom_` + timestamp + random)
- Displayed in "Custom" category filter
- Delete button with inline confirmation
- Removes deleted food from all meal assignments

### User Interactions
- Form validation on submit with per-field error messages
- Loading spinner during calculation (800ms delay)
- Smooth scroll to results on calculate
- Keyboard support for diet plan option selection (Enter/Space)
- Escape/clicks overlay to close modals
- Real-time validation clearing on input change
- Animated counter transitions (easeOutCubic, staggered timing)

### Edge Cases
- Invalid inputs: Show error messages, coral border glow
- Target calories below 1200: Set to minimum, show warning banner
- Extreme values: Capped at input range boundaries
- Empty fields: Prevent submission with validation
- No food preferences selected: Alert user to pick at least one from required categories
- Fallback to pre-defined meals if food data lookup fails
- Water intake capped at 2x daily goal
- Weight history max 100 entries

### Data Persistence (localStorage keys)
- `fitpulse-history` — calculation history (max 20 entries)
- `fitpulse-theme` — dark/light theme preference
- `fitpulse-food-prefs` — selected food names per category
- `fitpulse-macro-split` — custom protein/carbs/fat percentages
- `fitpulse-water` — daily water intake log (date, logged, goal)
- `fitpulse-weight-logs` — weight tracking entries (max 100)
- `fitpulse-shopping-checks` — checked state of shopping list items
- `fitpulse-custom-foods` — user-added custom foods
- `fitpulse-api-cache` — Open Food Facts API response cache (24hr TTL)

### File Structure
```
index.html          — Main SPA structure, all sections, modals
css/style.css       — All styles (2356 lines), full responsive + print
js/database.js      — foodDatabase (pre-defined meals), foodDatabaseDetailed (per-100g nutrition),
                      CustomFoodDB, ApiCache
js/app.js           — All logic (1868 lines): calculator, diet generation, food preferences,
                      water tracker, weight chart, shopping list, export, theme, etc.
SPEC.md             — This specification document
```

## 4. Acceptance Criteria

1. Page loads without errors
2. All input fields accept valid data with unit toggles
3. Validation errors display correctly with real-time clearing
4. BMR calculates correctly for all genders using Mifflin-St Jeor
5. TDEE reflects activity level selection
6. Diet chart adjusts based on goal, diet, meal count, and macro split
7. Food preference modal allows category-wise food selection
8. Default diet plan uses rotating queues and macro-gram-first scaling
9. Per-meal calorie target vs actual with ✅/⚠️ status displayed
10. Water tracker logs intake with progress bar and persists daily
11. Weight chart renders canvas line chart from logged entries
12. Shopping list consolidates duplicates with checkable items
13. PDF export opens print-optimized version in new window
14. Copy summary copies formatted text to clipboard
15. Dark/light theme toggle persists and applies correctly
16. History list shows past calculations with trend indicators
17. Custom food add/delete works with localStorage persistence
18. Open Food Facts API search returns results and allows selection
19. Quantity slider modal updates nutrition preview in real-time
20. Responsive on mobile, tablet, desktop (3 breakpoints)
21. All fonts, animations, glassmorphism effects render correctly
22. Color scheme matches specification for both themes
