# Diet Planner Application Implementation Plan

We will create a new, modern web application named **Diet Planner** inside the directory `/Users/bharatpanthee/.gemini/antigravity-ide/scratch/diet-planner`. The application allows users to input their demographics, goals, and health constraints, and generates **5 customized weekly diet strategies** using the Gemini API, breaking down each strategy into a detailed 7-day schedule, macronutrient calculations, and an automated grocery list.

## User Review Required

> [!IMPORTANT]
> The application requires a **Gemini API Key** to generate diet plans. We will include a secure, client-side input field in the UI that stores the key locally in the user's browser `localStorage`. No server-side storage is used, preserving absolute key privacy.

## Proposed Changes

We will create a new directory and build the application files from scratch.

### Project Layout

```
diet-planner/
├── index.html          # Shell layout, input forms, results cards, and 7-day schedules
├── style.css           # Modern, dark/light adaptive, green/teal themed nutrition styling
├── app.js              # State management, DOM controllers, and print/export operations
├── gemini-service.js   # Gemini API fetch wrapper with structured JSON schema parameters
└── README.md           # Instructions on how to run and obtain API keys
```

---

### File Architectures

#### [NEW] [index.html](file:///Users/bharatpanthee/.gemini/antigravity-ide/scratch/diet-planner/index.html)
* **API Key Panel:** Collapsible credentials card explaining how to obtain a free API key from Google AI Studio.
* **Input Form:** Input fields for:
  * Age (number) & Gender (select)
  * Weight (number) & Height (number) with metric/imperial toggle
  * Activity Level (Sedentary, Moderate, Active)
  * Health Conditions (Diabetes, Hypertension, Kidney Disease, Celiac, High Cholesterol, None)
  * Dietary Restrictions (Vegan, Vegetarian, Keto, Halal, Gluten-Free, Nut-Free)
  * Weekly Goal (Weight Loss, Muscle Gain, Maintenance)
* **Results Workspace:**
  * **Option Selection:** Renders 5 option cards showing the generated strategies.
  * **Interactive Schedule Grid:** Displays columns for Days 1–7. Each day contains breakfast, lunch, dinner, snack details, and macros.
  * **Grocery List Checklist:** Grouped by department with checkboxes.
  * **Export Panel:** Buttons for printing/saving as PDF.

#### [NEW] [style.css](file:///Users/bharatpanthee/.gemini/antigravity-ide/scratch/diet-planner/style.css)
* Curated wellness-themed HSL variables (emerald green, soft mints, steel grays).
* Dark mode default with light mode toggle support.
* Glassmorphism effects for panels.
* CSS grid rules for the 7-day grid and results sections.
* Skeleton pulse animation for loading states.
* Clean, print-friendly media queries (hides inputs and buttons during print/PDF export).

#### [NEW] [gemini-service.js](file:///Users/bharatpanthee/.gemini/antigravity-ide/scratch/diet-planner/gemini-service.js)
* Direct REST fetch wrapper querying:
  `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`
* Prompt engineering requesting the model to act as a certified clinical nutritionist and return JSON output containing 5 distinct strategies meeting the exact user profile constraints.
* Enforces `responseSchema` or structured schema properties in `generationConfig` to guarantee valid JSON returns.

#### [NEW] [app.js](file:///Users/bharatpanthee/.gemini/antigravity-ide/scratch/diet-planner/app.js)
* Form listeners extracting metrics.
* Handles API key loading/saving to `localStorage`.
* Renders active state skeleton cards during fetch operations.
* Manages option selection: clicking one of the 5 cards renders its specific 7-day calendar and grocery department lists.
* Implements the native print operation (`window.print()`).

---

## Verification Plan

### Manual Verification
1. **API Key Operations:** Verify entering, hiding/showing, and saving the key to `localStorage` preserves the state on refresh.
2. **Form Validation:** Verify bounds (e.g. negative values blocked, invalid height/weight formats caught).
3. **Plan Generation:** Generate a diet plan using a valid key. Verify that 5 distinct option cards are rendered.
4. **Option Navigation:** Click different strategy options and verify the 7-day grid and grocery lists render corresponding data.
5. **Print Layout:** Press Print and verify that form inputs and control buttons are hidden, showing only the clean weekly plan and grocery list.
