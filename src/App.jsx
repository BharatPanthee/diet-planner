import React, { useState, useEffect } from "react";
import ApiKeyPanel from "./components/ApiKeyPanel";
import ParameterForm from "./components/ParameterForm";
import StrategySelector from "./components/StrategySelector";
import MealGrid from "./components/MealGrid";
import GroceryList from "./components/GroceryList";
import { generateWeeklyDietPlans } from "./services/geminiService";

export default function App() {
  const [theme, setTheme] = useState("dark");
  const [apiKey, setApiKey] = useState("");
  const [showApiKeyPanel, setShowApiKeyPanel] = useState(false);
  const [loading, setLoading] = useState(false);
  const [strategies, setStrategies] = useState(null);
  const [activeStrategyId, setActiveStrategyId] = useState(null);
  const [activeTab, setActiveTab] = useState("schedule");

  // Load theme and API key from local storage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("auradiet-theme") || "dark";
    setTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);

    const savedKey = localStorage.getItem("auradiet_gemini_key") || "";
    setApiKey(savedKey);
  }, []);

  const handleToggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    document.documentElement.setAttribute("data-theme", nextTheme);
    localStorage.setItem("auradiet-theme", nextTheme);
  };

  const handleSaveApiKey = (key) => {
    localStorage.setItem("auradiet_gemini_key", key);
    setApiKey(key);
    setShowApiKeyPanel(false);
  };

  const handleClearApiKey = () => {
    localStorage.removeItem("auradiet_gemini_key");
    setApiKey("");
  };

  const handleFormSubmit = async (params) => {
    if (!apiKey) {
      alert("API Key is missing! Please configure your credentials first using the 'API Credentials' button at the top right.");
      setShowApiKeyPanel(true);
      return;
    }

    setLoading(true);
    setStrategies(null);

    try {
      const result = await generateWeeklyDietPlans(apiKey, params);
      if (result && result.strategies && result.strategies.length > 0) {
        setStrategies(result.strategies);
        setActiveStrategyId(result.strategies[0].id);
        setLoading(false);
      } else {
        throw new Error("Invalid output received from Gemini API.");
      }
    } catch (err) {
      console.error(err);
      alert(`AI Generation failed: ${err.message}`);
      setLoading(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  // Get active strategy object
  const activeStrategy = strategies
    ? strategies.find((s) => s.id === activeStrategyId)
    : null;

  return (
    <div className="app-wrapper">
      {/* Header */}
      <header className="app-header">
        <div className="header-container">
          <div className="brand">
            <span className="brand-logo">🌿</span>
            <h1>AuraDiet</h1>
            <span className="brand-badge">React AI</span>
          </div>

          <div className="header-actions">
            <button
              id="theme-toggle"
              className="btn btn-icon"
              onClick={handleToggleTheme}
              aria-label="Toggle theme"
            >
              <span className="theme-icon">{theme === "dark" ? "☀️" : "🌙"}</span>
            </button>
            <button
              id="configure-api-btn"
              className="btn btn-secondary"
              onClick={() => setShowApiKeyPanel(!showApiKeyPanel)}
            >
              🔑 API Credentials
            </button>
          </div>
        </div>
      </header>

      {/* Main Workspace Layout */}
      <main className="main-layout container">
        {/* Left column sidebar inputs */}
        <aside className="sidebar-panel">
          {showApiKeyPanel && (
            <ApiKeyPanel
              currentKey={apiKey}
              onSave={handleSaveApiKey}
              onClear={handleClearApiKey}
              onClose={() => setShowApiKeyPanel(false)}
            />
          )}

          <ParameterForm onSubmit={handleFormSubmit} />
        </aside>

        {/* Right column results panel */}
        <section className="results-workspace">
          {/* Welcome Screen */}
          {!loading && !strategies && (
            <div id="results-placeholder" className="glass-card welcome-card">
              <div className="welcome-art">🥗📅🥦</div>
              <h2>Your React AI Nutrition Workspace</h2>
              <p>
                Fill in your parameters on the left and click <strong>Generate</strong>. AuraDiet will use Google Gemini to craft 5 distinct diet strategies tailored to your health profile.
              </p>
              {!apiKey && (
                <p className="welcome-warning-api">
                  ⚠️ Note: You will need to add a Google Gemini API key to proceed. Click <strong>API Credentials</strong> at the top right to configure your key.
                </p>
              )}
            </div>
          )}

          {/* Skeleton Loader */}
          {loading && (
            <div id="results-loading" className="loading-state">
              <div className="skeleton-header skeleton-pulse"></div>
              <div className="skeleton-options-grid">
                <div className="skeleton-option-card skeleton-pulse"></div>
                <div className="skeleton-option-card skeleton-pulse"></div>
                <div className="skeleton-option-card skeleton-pulse"></div>
                <div className="skeleton-option-card skeleton-pulse"></div>
                <div className="skeleton-option-card skeleton-pulse"></div>
              </div>
              <div
                className="skeleton-body skeleton-pulse"
                style={{ height: "300px", marginTop: "1.5rem" }}
              ></div>
            </div>
          )}

          {/* Result view pane */}
          {!loading && strategies && activeStrategy && (
            <div id="results-display" className="results-container">
              {/* Header options controls */}
              <header className="results-header">
                <div>
                  <h2>Weekly Diet Plans Recommended</h2>
                  <p>Select one of the 5 custom AI strategies below to review its complete 7-day schedule.</p>
                </div>
                <button
                  id="print-plan-btn"
                  className="btn btn-secondary btn-icon-label"
                  onClick={handlePrint}
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    style={{ verticalAlign: "middle", marginRight: "4px" }}
                  >
                    <polyline points="6 9 6 2 18 2 18 9"></polyline>
                    <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
                    <rect x="6" y="14" width="12" height="8"></rect>
                  </svg>
                  Print / Export PDF
                </button>
              </header>

              {/* Strategies options row */}
              <StrategySelector
                strategies={strategies}
                activeStrategyId={activeStrategyId}
                onSelect={(id) => {
                  setActiveStrategyId(id);
                }}
              />

              {/* Details card block */}
              <div id="active-strategy-details" className="strategy-detail-pane">
                {/* Description and macros targets summary card */}
                <div className="glass-card strategy-summary-card">
                  <div className="strategy-summary-content">
                    <h3>{activeStrategy.name}</h3>
                    <p>{activeStrategy.description}</p>
                  </div>
                  <div className="macros-summary-badge">
                    <h4>Daily Targets</h4>
                    <div className="macro-chips-container">
                      <div className="macro-chip">
                        <span className="macro-num">{activeStrategy.macros.calories}</span>
                        <span className="macro-lbl">Calories</span>
                      </div>
                      <div className="macro-chip">
                        <span className="macro-num">{activeStrategy.macros.protein}</span>
                        <span className="macro-lbl">Protein</span>
                      </div>
                      <div className="macro-chip">
                        <span className="macro-num">{activeStrategy.macros.carbs}</span>
                        <span className="macro-lbl">Carbs</span>
                      </div>
                      <div className="macro-chip">
                        <span className="macro-num">{activeStrategy.macros.fat}</span>
                        <span className="macro-lbl">Fat</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Subsections switch tabs triggers */}
                <div className="workspace-tabs-container">
                  <div className="tab-triggers">
                    <button
                      className={`tab-trigger ${activeTab === "schedule" ? "active" : ""}`}
                      onClick={() => setActiveTab("schedule")}
                    >
                      📅 7-Day Meal Schedule
                    </button>
                    <button
                      className={`tab-trigger ${activeTab === "grocery" ? "active" : ""}`}
                      onClick={() => setActiveTab("grocery")}
                    >
                      🛒 Weekly Grocery List
                    </button>
                  </div>
                </div>

                {/* Tab 1: Schedule grid calendar */}
                {activeTab === "schedule" && <MealGrid days={activeStrategy.days} />}

                {/* Tab 2: Grocery lists checklist */}
                {activeTab === "grocery" && (
                  <GroceryList
                    groceryList={activeStrategy.groceryList}
                    strategyId={activeStrategyId}
                  />
                )}
              </div>
            </div>
          )}
        </section>
      </main>

      {/* Footer */}
      <footer className="app-footer">
        <div className="container footer-content">
          <p>&copy; 2026 AuraDiet. Powered by Gemini API. Certified nutritional advice requires consulting a physician.</p>
        </div>
      </footer>
    </div>
  );
}
