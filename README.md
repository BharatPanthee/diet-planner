# AuraDiet - Weekly AI Diet & Meal Planner

A modern, client-side web application designed to generate **5 distinct weekly diet plan options** tailored to your age, weight, activity levels, clinical health conditions, and dietary choices. Powered directly by Google Gemini.

## 🚀 Key Features

*   **Custom Parameter Inputs:** Set age, height, weight, activity metrics, and goals. Supports metric and imperial unit conversions dynamically.
*   **Safety & Clinical Constraints:** Filter meals by clinical conditions (Diabetes, Hypertension, High Cholesterol, Gout, Celiac, etc.) and dietary choices (Vegan, Vegetarian, Keto, Halal, Gluten-Free, Nut-Free, Dairy-Free).
*   **5 Nutrition Strategies:** Gemini recommends 5 distinct approaches (e.g. Balanced Mediterranean, Low-GI Diabetic, DASH, High-Protein, etc.) all conforming to your constraints.
*   **7-Day Daily Breakdowns:** Browse a full breakfast, lunch, dinner, and snack meal plan for the entire week.
*   **Consolidated Grocery Checklist:** Generates department-wise shopping lists with interactive checkboxes.
*   **Private & Secure API Integration:** Your Gemini API Key is stored directly on your browser via `localStorage`—no backend data collection.
*   **Print-Ready Reports:** Stylesheet is print-optimized, enabling clean weekly schedule export to PDF or paper.

---

## 🛠️ Getting Started

### Prerequisites

You need a Google Gemini API Key. If you do not have one, you can acquire it for free from:
*   [Google AI Studio](https://aistudio.google.com/)

### Running Locally

Since the application uses standard JavaScript ES Modules (`import/export`), it must be served through a local HTTP web server to prevent browser CORS blockages.

#### Option 1: Python HTTP Server (Easiest)
Run the following command in the `diet-planner` folder:
```bash
python3 -m http.server 8089
```
Then open your browser to:
*   [http://localhost:8089](http://localhost:8089)

#### Option 2: Live Server VS Code Extension
Right-click on `index.html` and choose **Open with Live Server**.

---

## 📂 Project Structure

```
diet-planner/
├── index.html        # App layout, forms, tab navigation, and results workspace
├── style.css         # Custom wellness HSL styles, dark mode grids, and print directives
├── app.js            # Main controller, event bindings, and UI renders
├── gemini-service.js # Direct REST calls fetching structured JSON schemas from Gemini API
└── README.md         # Documentation and guide
```
