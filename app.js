// AuraDiet Application Controller

import { generateWeeklyDietPlans } from "./gemini-service.js";

// State
let generatedPlanData = null; // Stores the 5 strategies returned from API
let activeStrategyId = null;  // Stores active selection: strategy_1, strategy_2, etc.
let activeWorkspaceTab = "schedule"; // "schedule" or "grocery"

// DOM Elements
const themeToggle = document.getElementById("theme-toggle");
const configureApiBtn = document.getElementById("configure-api-btn");
const apiKeyCard = document.getElementById("api-key-card");
const closeApiCardBtn = document.getElementById("close-api-card-btn");
const geminiApiKeyInput = document.getElementById("gemini-api-key");
const toggleKeyVisibility = document.getElementById("toggle-key-visibility");
const saveApiKeyBtn = document.getElementById("save-api-key-btn");
const clearApiKeyBtn = document.getElementById("clear-api-key-btn");
const apiKeyStatusText = document.getElementById("api-key-status");

const dietParameterForm = document.getElementById("diet-parameter-form");
const labelWeight = document.getElementById("label-weight");
const labelHeight = document.getElementById("label-height");
const unitMetric = document.getElementById("unit-metric");
const unitImperial = document.getElementById("unit-imperial");

const resultsPlaceholder = document.getElementById("results-placeholder");
const resultsLoading = document.getElementById("results-loading");
const resultsDisplay = document.getElementById("results-display");
const printPlanBtn = document.getElementById("print-plan-btn");
const strategiesTabsContainer = document.getElementById("strategies-tabs");

const activeStrategyName = document.getElementById("active-strategy-name");
const activeStrategyDesc = document.getElementById("active-strategy-desc");
const macroCalories = document.getElementById("macro-calories");
const macroProtein = document.getElementById("macro-protein");
const macroCarbs = document.getElementById("macro-carbs");
const macroFat = document.getElementById("macro-fat");

const weeklyDaysGrid = document.getElementById("weekly-days-grid");
const groceryDepartments = document.getElementById("grocery-departments");

// Initialize Setup
document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  loadStoredApiKey();
  setupEventListeners();
});

// Theme Toggle logic
function initTheme() {
  const storedTheme = localStorage.getItem("auradiet-theme") || "dark";
  document.documentElement.setAttribute("data-theme", storedTheme);
  updateThemeTogglerUI(storedTheme);
}

function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute("data-theme");
  const newTheme = currentTheme === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", newTheme);
  localStorage.setItem("auradiet-theme", newTheme);
  updateThemeTogglerUI(newTheme);
}

function updateThemeTogglerUI(theme) {
  const iconSpan = themeToggle.querySelector(".theme-icon");
  if (theme === "dark") {
    iconSpan.textContent = "☀️";
    themeToggle.setAttribute("aria-label", "Switch to light theme");
  } else {
    iconSpan.textContent = "🌙";
    themeToggle.setAttribute("aria-label", "Switch to dark theme");
  }
}

// Credentials local storage handlers
function loadStoredApiKey() {
  const savedKey = localStorage.getItem("auradiet_gemini_key");
  if (savedKey) {
    geminiApiKeyInput.value = savedKey;
    apiKeyStatusText.textContent = "Status: Key Loaded (Ready)";
    apiKeyStatusText.className = "key-status-text status-active";
  } else {
    geminiApiKeyInput.value = "";
    apiKeyStatusText.textContent = "Status: Key Not Configured";
    apiKeyStatusText.className = "key-status-text status-inactive";
  }
}

// Event Listeners setup
function setupEventListeners() {
  themeToggle.addEventListener("click", toggleTheme);
  
  // Toggle credential widget visibility
  configureApiBtn.addEventListener("click", () => {
    const isHidden = apiKeyCard.style.display === "none";
    apiKeyCard.style.display = isHidden ? "block" : "none";
  });
  
  closeApiCardBtn.addEventListener("click", () => {
    apiKeyCard.style.display = "none";
  });

  // Visibility toggle
  toggleKeyVisibility.addEventListener("click", () => {
    const isPassword = geminiApiKeyInput.type === "password";
    geminiApiKeyInput.type = isPassword ? "text" : "password";
    toggleKeyVisibility.textContent = isPassword ? "Hide" : "Show";
  });

  // Credentials actions
  saveApiKeyBtn.addEventListener("click", () => {
    const val = geminiApiKeyInput.value.trim();
    if (!val) {
      alert("Please enter a key before saving.");
      return;
    }
    localStorage.setItem("auradiet_gemini_key", val);
    loadStoredApiKey();
    alert("API Key saved securely to local browser storage.");
    apiKeyCard.style.display = "none";
  });

  clearApiKeyBtn.addEventListener("click", () => {
    localStorage.removeItem("auradiet_gemini_key");
    loadStoredApiKey();
    alert("API Key removed successfully.");
  });

  // Units change toggles
  unitMetric.addEventListener("change", updateUnitLabels);
  unitImperial.addEventListener("change", updateUnitLabels);

  // Parameter submission
  dietParameterForm.addEventListener("submit", handleFormSubmit);

  // Workspace subtabs (Schedule vs Grocery)
  document.querySelectorAll("[data-workspace-tab]").forEach(tab => {
    tab.addEventListener("click", (e) => {
      const selectedTab = e.target.getAttribute("data-workspace-tab");
      switchWorkspaceTab(selectedTab);
    });
  });

  // Print Action
  printPlanBtn.addEventListener("click", () => {
    window.print();
  });
}

// Update height/weight form labels
function updateUnitLabels() {
  if (unitImperial.checked) {
    labelWeight.textContent = "Weight (lbs) *";
    labelHeight.textContent = "Height (inches) *";
  } else {
    labelWeight.textContent = "Weight (kg) *";
    labelHeight.textContent = "Height (cm) *";
  }
}

// Workspace subtabs toggler
function switchWorkspaceTab(tabName) {
  activeWorkspaceTab = tabName;
  document.querySelectorAll("[data-workspace-tab]").forEach(tab => {
    if (tab.getAttribute("data-workspace-tab") === tabName) {
      tab.classList.add("active");
    } else {
      tab.classList.remove("active");
    }
  });

  document.getElementById("tab-content-schedule").classList.toggle("active", tabName === "schedule");
  document.getElementById("tab-content-grocery").classList.toggle("active", tabName === "grocery");
}

// Form Submission & API Query
async function handleFormSubmit(e) {
  e.preventDefault();

  const apiKey = localStorage.getItem("auradiet_gemini_key");
  if (!apiKey) {
    alert("API Key is missing! Please configure your credentials first using the 'API Credentials' button at the top right.");
    apiKeyCard.style.display = "block";
    geminiApiKeyInput.focus();
    return;
  }

  // Extract selected checkbox arrays
  const healthConditions = Array.from(document.querySelectorAll('input[name="health-condition"]:checked'))
    .map(cb => cb.value);
  const dietaryRestrictions = Array.from(document.querySelectorAll('input[name="diet-restriction"]:checked'))
    .map(cb => cb.value);

  const userInput = {
    age: document.getElementById("user-age").value,
    gender: document.getElementById("user-gender").value,
    weight: document.getElementById("user-weight").value,
    weightUnit: unitImperial.checked ? "lbs" : "kg",
    height: document.getElementById("user-height").value,
    heightUnit: unitImperial.checked ? "inches" : "cm",
    activityLevel: document.getElementById("user-activity").value,
    goal: document.getElementById("user-goal").value,
    healthConditions,
    dietaryRestrictions
  };

  // Toggle Loading State
  resultsPlaceholder.style.display = "none";
  resultsDisplay.style.display = "none";
  resultsLoading.style.display = "block";

  try {
    const data = await generateWeeklyDietPlans(apiKey, userInput);
    
    if (!data.strategies || data.strategies.length === 0) {
      throw new Error("No dietary strategies returned. Please refine your inputs and try again.");
    }
    
    generatedPlanData = data.strategies;
    resultsLoading.style.display = "none";
    resultsDisplay.style.display = "block";
    
    renderStrategyTabs();
    selectStrategy(generatedPlanData[0].id); // Auto-select first strategy
  } catch (err) {
    console.error("AI Generation Error:", err);
    resultsLoading.style.display = "none";
    resultsPlaceholder.style.display = "flex";
    alert(`Failed to generate diet plans: ${err.message || "Unknown error."}`);
  }
}

// Render the 5 strategy recommendation tabs
function renderStrategyTabs() {
  strategiesTabsContainer.innerHTML = "";
  
  generatedPlanData.forEach((strategy, index) => {
    const tabBtn = document.createElement("button");
    tabBtn.className = "strategy-option-tab";
    tabBtn.setAttribute("data-strategy-id", strategy.id);
    
    tabBtn.innerHTML = `
      <span class="option-badge">Option ${index + 1}</span>
      <span class="option-name">${strategy.name}</span>
    `;
    
    tabBtn.addEventListener("click", () => {
      selectStrategy(strategy.id);
    });
    
    strategiesTabsContainer.appendChild(tabBtn);
  });
}

// Strategy Selection & Render Detail panels
function selectStrategy(strategyId) {
  activeStrategyId = strategyId;
  
  // Highlight active tab
  document.querySelectorAll(".strategy-option-tab").forEach(tab => {
    const matches = tab.getAttribute("data-strategy-id") === strategyId;
    tab.classList.toggle("active", matches);
  });

  const selectedStrategy = generatedPlanData.find(s => s.id === strategyId);
  if (!selectedStrategy) return;

  // Render text details & daily targets
  activeStrategyName.textContent = selectedStrategy.name;
  activeStrategyDesc.textContent = selectedStrategy.description;
  macroCalories.textContent = selectedStrategy.macros.calories;
  macroProtein.textContent = selectedStrategy.macros.protein;
  macroCarbs.textContent = selectedStrategy.macros.carbs;
  macroFat.textContent = selectedStrategy.macros.fat;

  // Render 7-day schedule grid
  renderWeeklyDaysGrid(selectedStrategy.days);

  // Render grocery lists
  renderGroceryLists(selectedStrategy.groceryList);
}

// Populates the 7-day schedule list grid
function renderWeeklyDaysGrid(days) {
  weeklyDaysGrid.innerHTML = "";

  days.forEach(dayInfo => {
    const dayCard = document.createElement("div");
    dayCard.className = "day-plan-card";
    
    dayCard.innerHTML = `
      <div class="day-title-header">
        <h4>${dayInfo.day}</h4>
      </div>
      <div class="meal-item">
        <span class="meal-label">Breakfast</span>
        <p class="meal-desc">${dayInfo.meals.breakfast}</p>
      </div>
      <div class="meal-item">
        <span class="meal-label">Lunch</span>
        <p class="meal-desc">${dayInfo.meals.lunch}</p>
      </div>
      <div class="meal-item">
        <span class="meal-label">Dinner</span>
        <p class="meal-desc">${dayInfo.meals.dinner}</p>
      </div>
      <div class="meal-item">
        <span class="meal-label">Snack</span>
        <p class="meal-desc">${dayInfo.meals.snack}</p>
      </div>
    `;
    
    weeklyDaysGrid.appendChild(dayCard);
  });
}

// Populates grocery lists with checklists
function renderGroceryLists(groceryList) {
  groceryDepartments.innerHTML = "";

  if (!groceryList || groceryList.length === 0) {
    groceryDepartments.innerHTML = `<p class="helper-text">No grocery items available for this plan.</p>`;
    return;
  }

  groceryList.forEach(dept => {
    const deptSection = document.createElement("div");
    deptSection.className = "grocery-dept-section";
    
    const h4 = document.createElement("h4");
    h4.textContent = dept.category;
    deptSection.appendChild(h4);
    
    dept.items.forEach((item, index) => {
      const uniqueId = `gro-item-${dept.category.replace(/\s+/g, '-')}-${index}`;
      
      const label = document.createElement("label");
      label.className = "grocery-item-checkbox";
      label.setAttribute("for", uniqueId);
      
      label.innerHTML = `
        <input type="checkbox" id="${uniqueId}">
        <span class="checkbox-box"></span>
        <span class="item-text">${item}</span>
      `;
      
      deptSection.appendChild(label);
    });

    groceryDepartments.appendChild(deptSection);
  });
}
