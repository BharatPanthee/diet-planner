import React, { useState, useEffect } from "react";
import ApiKeyPanel from "./components/ApiKeyPanel";
import ParameterForm from "./components/ParameterForm";
import StrategySelector from "./components/StrategySelector";
import MealGrid from "./components/MealGrid";
import GroceryList from "./components/GroceryList";
import { generateWeeklyDietPlans } from "./services/geminiService";
import { MOCK_DIET_PLANS } from "./services/mockDietData";

export default function App() {
  const [theme, setTheme] = useState("dark");
  const [apiKey, setApiKey] = useState("");
  const [selectedModel, setSelectedModel] = useState("gemini-2.5-flash");
  const [showApiKeyPanel, setShowApiKeyPanel] = useState(false);
  const [loading, setLoading] = useState(false);
  const [strategies, setStrategies] = useState(null);
  const [activeStrategyId, setActiveStrategyId] = useState(null);
  const [activeTab, setActiveTab] = useState("schedule");
  const [usageStats, setUsageStats] = useState(null);

  // Authentication & Subscription states
  const [accessMode, setAccessMode] = useState("pro"); // "pro" or "byok"
  const [userAuth, setUserAuth] = useState(null);
  const [membership, setMembership] = useState({
    isPro: false,
    generationsUsedThisWeek: 0,
    generationsLimitPerWeek: 4,
    weekResetDate: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000).toLocaleDateString()
  });
  const [showPaywall, setShowPaywall] = useState(false);
  const [paywallReason, setPaywallReason] = useState("upgrade"); // "upgrade" or "limit"

  // Load configuration from local storage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("auradiet-theme") || "dark";
    setTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);

    const savedKey = localStorage.getItem("auradiet_gemini_key") || "";
    setApiKey(savedKey);

    const savedModel = localStorage.getItem("auradiet_gemini_model") || "gemini-2.5-flash";
    setSelectedModel(savedModel);

    const savedAccessMode = localStorage.getItem("auradiet_access_mode") || "pro";
    setAccessMode(savedAccessMode);

    const savedAuth = localStorage.getItem("auradiet_user_auth");
    if (savedAuth) {
      setUserAuth(JSON.parse(savedAuth));
    }

    const savedMembership = localStorage.getItem("auradiet_membership");
    if (savedMembership) {
      setMembership(JSON.parse(savedMembership));
    }
  }, []);

  const calculateCost = (model, usage) => {
    if (!usage) return null;
    const promptTokens = usage.promptTokenCount || 0;
    const candidatesTokens = usage.candidatesTokenCount || 0;
    
    let inputRate = 0;
    let outputRate = 0;
    
    switch (model) {
      case "gemini-2.5-flash":
        inputRate = 0.30 / 1000000;
        outputRate = 2.50 / 1000000;
        break;
      case "gemini-2.0-flash":
        inputRate = 0.10 / 1000000;
        outputRate = 0.40 / 1000000;
        break;
      case "gemini-1.5-flash":
        inputRate = 0.075 / 1000000;
        outputRate = 0.30 / 1000000;
        break;
      case "gemini-2.5-pro":
        inputRate = 1.25 / 1000000;
        outputRate = 10.00 / 1000000;
        break;
      case "gemini-1.5-pro":
        inputRate = 1.25 / 1000000;
        outputRate = 5.00 / 1000000;
        break;
      default:
        inputRate = 0.30 / 1000000;
        outputRate = 2.50 / 1000000;
    }
    
    const cost = (promptTokens * inputRate) + (candidatesTokens * outputRate);
    return cost.toFixed(5);
  };

  const handleToggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    document.documentElement.setAttribute("data-theme", nextTheme);
    localStorage.setItem("auradiet-theme", nextTheme);
  };

  const handleSaveApiKey = (key, model) => {
    localStorage.setItem("auradiet_gemini_key", key);
    localStorage.setItem("auradiet_gemini_model", model);
    setApiKey(key);
    setSelectedModel(model);
    setShowApiKeyPanel(false);
  };

  const handleClearApiKey = () => {
    localStorage.removeItem("auradiet_gemini_key");
    localStorage.removeItem("auradiet_gemini_model");
    setApiKey("");
    setSelectedModel("gemini-2.5-flash");
    setUsageStats(null);
  };

  // Auth Mocks
  const handleSignIn = () => {
    const mockAuth = {
      name: "Bharat Panthee",
      email: "bharat@example.com",
      avatar: "https://lh3.googleusercontent.com/a/default-user=s96-c"
    };
    setUserAuth(mockAuth);
    localStorage.setItem("auradiet_user_auth", JSON.stringify(mockAuth));
  };

  const handleSignOut = () => {
    setUserAuth(null);
    localStorage.removeItem("auradiet_user_auth");
    const resetMem = {
      isPro: false,
      generationsUsedThisWeek: 0,
      generationsLimitPerWeek: 4,
      weekResetDate: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000).toLocaleDateString()
    };
    setMembership(resetMem);
    localStorage.setItem("auradiet_membership", JSON.stringify(resetMem));
  };

  const handleUpgrade = () => {
    const upgradedMem = {
      ...membership,
      isPro: true,
      generationsUsedThisWeek: 0
    };
    setMembership(upgradedMem);
    localStorage.setItem("auradiet_membership", JSON.stringify(upgradedMem));
    setShowPaywall(false);
  };

  const handleToggleAccessMode = (mode) => {
    setAccessMode(mode);
    localStorage.setItem("auradiet_access_mode", mode);
  };

  const handleFormSubmit = async (params) => {
    // 1. Enforce validation based on Access Mode
    if (accessMode === "byok") {
      if (!apiKey) {
        alert("API Key is missing! Please configure your credentials first or switch to AuraDiet Pro.");
        setShowApiKeyPanel(true);
        return;
      }
    } else {
      // Pro Mode Enforcements
      if (!userAuth) {
        alert("Please sign in to your Google Account to use AuraDiet Pro.");
        setShowApiKeyPanel(true);
        return;
      }
      if (!membership.isPro) {
        setPaywallReason("upgrade");
        setShowPaywall(true);
        return;
      }
      if (membership.generationsUsedThisWeek >= membership.generationsLimitPerWeek) {
        setPaywallReason("limit");
        setShowPaywall(true);
        return;
      }
    }

    setLoading(true);
    setStrategies(null);
    setUsageStats(null);

    try {
      if (accessMode === "byok" || (accessMode === "pro" && apiKey)) {
        // Run live API call (Pro mode runs through the user key if saved locally in this prototype)
        const activeKey = accessMode === "byok" ? apiKey : apiKey;
        const activeModel = accessMode === "byok" ? selectedModel : "gemini-2.5-flash";

        const result = await generateWeeklyDietPlans(activeKey, params, activeModel);
        if (result && result.strategies && result.strategies.length > 0) {
          setStrategies(result.strategies);
          setActiveStrategyId(result.strategies[0].id);
          
          if (result.usageMetadata) {
            setUsageStats({
              model: activeModel,
              promptTokens: result.usageMetadata.promptTokenCount,
              candidatesTokens: result.usageMetadata.candidatesTokenCount,
              totalTokens: result.usageMetadata.totalTokenCount,
              cost: calculateCost(activeModel, result.usageMetadata),
              isProBadge: accessMode === "pro"
            });
          }

          // If in Pro mode, increment the generation count
          if (accessMode === "pro") {
            const nextUsed = membership.generationsUsedThisWeek + 1;
            const updatedMem = { ...membership, generationsUsedThisWeek: nextUsed };
            setMembership(updatedMem);
            localStorage.setItem("auradiet_membership", JSON.stringify(updatedMem));
          }

          setLoading(false);
        } else {
          throw new Error("Invalid output received from Gemini API.");
        }
      } else {
        // Pro Mode simulation with offline mock data (No API key required)
        setTimeout(() => {
          setStrategies(MOCK_DIET_PLANS.strategies);
          setActiveStrategyId(MOCK_DIET_PLANS.strategies[0].id);
          setUsageStats({
            model: "Gemini Server Key (AuraDiet Pro)",
            promptTokens: MOCK_DIET_PLANS.usageMetadata.promptTokenCount,
            candidatesTokens: MOCK_DIET_PLANS.usageMetadata.candidatesTokenCount,
            totalTokens: MOCK_DIET_PLANS.usageMetadata.totalTokenCount,
            cost: "0.00000", // Free for subscription users
            isProBadge: true
          });

          const nextUsed = membership.generationsUsedThisWeek + 1;
          const updatedMem = { ...membership, generationsUsedThisWeek: nextUsed };
          setMembership(updatedMem);
          localStorage.setItem("auradiet_membership", JSON.stringify(updatedMem));
          setLoading(false);
        }, 2500); // Realistic network delay
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
              style={{
                border: accessMode === "pro" && membership.isPro ? "1px solid #10b981" : "1px solid rgba(255,255,255,0.15)"
              }}
            >
              {accessMode === "pro" && membership.isPro ? "🌟 Pro Panel" : "🔑 Access Options"}
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
              currentModel={selectedModel}
              onSave={handleSaveApiKey}
              onClear={handleClearApiKey}
              onClose={() => setShowApiKeyPanel(false)}
              userAuth={userAuth}
              membership={membership}
              accessMode={accessMode}
              onSignIn={handleSignIn}
              onSignOut={handleSignOut}
              onUpgrade={handleUpgrade}
              onToggleAccessMode={handleToggleAccessMode}
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
              <h2>Your AI Nutrition Workspace</h2>
              <p>
                Fill in your parameters on the left and click <strong>Generate</strong>. AuraDiet will use Google Gemini to craft 5 distinct diet strategies tailored to your health profile.
              </p>
              {accessMode === "byok" && !apiKey && (
                <p className="welcome-warning-api">
                  ⚠️ Note: You will need to add a Google Gemini API key to proceed. Click <strong>Access Options</strong> at the top right to configure your key.
                </p>
              )}
              {accessMode === "pro" && !userAuth && (
                <p className="welcome-warning-api" style={{ borderColor: "var(--accent)", color: "var(--accent)" }}>
                  🌟 Pro Mode Selected: Sign in to your account under the <strong>Access Options</strong> panel to generate your plans using AuraDiet server keys!
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

              {/* Cost and Usage Badge */}
              {usageStats && (
                <div className="usage-cost-banner glass-card" style={{
                  marginBottom: "1.25rem",
                  padding: "0.75rem 1rem",
                  fontSize: "0.85rem",
                  borderLeft: usageStats.isProBadge ? "4px solid #10b981" : "4px solid var(--accent)",
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "0.5rem",
                  alignItems: "center"
                }}>
                  <span>🤖 <strong>Model:</strong> {usageStats.model}</span>
                  <span style={{ color: "rgba(255,255,255,0.15)", margin: "0 0.25rem" }}>|</span>
                  <span>📊 <strong>Tokens:</strong> {usageStats.totalTokens.toLocaleString()}</span>
                  <span style={{ color: "rgba(255,255,255,0.15)", margin: "0 0.25rem" }}>|</span>
                  {usageStats.isProBadge ? (
                    <span style={{ color: "#34d399", fontWeight: "bold" }}>🌟 AuraDiet Pro Subscription (Generations remaining: {membership.generationsLimitPerWeek - membership.generationsUsedThisWeek})</span>
                  ) : (
                    <span>💰 <strong>Estimated Cost:</strong> <span className="cost-value" style={{ color: "var(--accent)", fontWeight: "bold" }}>${usageStats.cost}</span></span>
                  )}
                </div>
              )}

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

      {/* Premium Paywall Modal */}
      {showPaywall && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "rgba(0,0,0,0.8)",
          backdropFilter: "blur(8px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1000,
          padding: "1rem"
        }}>
          <div className="glass-card" style={{
            maxWidth: "480px",
            width: "100%",
            padding: "2rem",
            borderRadius: "var(--radius-md)",
            border: "1px solid rgba(16, 185, 129, 0.2)",
            background: "linear-gradient(135deg, rgba(20, 20, 20, 0.95) 0%, rgba(30, 41, 37, 0.98) 100%)",
            boxShadow: "0 20px 40px rgba(0,0,0,0.5)",
            textAlign: "center",
            position: "relative"
          }}>
            <button
              onClick={() => setShowPaywall(false)}
              style={{
                position: "absolute",
                top: "1rem",
                right: "1rem",
                background: "transparent",
                border: "none",
                color: "rgba(255,255,255,0.4)",
                fontSize: "1.5rem",
                cursor: "pointer"
              }}
            >
              &times;
            </button>

            <div style={{ fontSize: "3rem", marginBottom: "0.5rem" }}>🌟</div>
            
            {paywallReason === "limit" ? (
              <>
                <h2 style={{ color: "#f87171", marginBottom: "0.5rem" }}>Weekly limit reached!</h2>
                <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.9rem", lineHeight: "1.4rem", marginBottom: "1.5rem" }}>
                  You have generated all 4 of your allowed Pro weekly plans for this week. Your limit resets on {membership.weekResetDate}.
                </p>
                <div style={{
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(255,255,255,0.05)",
                  padding: "1rem",
                  borderRadius: "var(--radius-sm)",
                  marginBottom: "1.5rem"
                }}>
                  <p style={{ margin: 0, fontSize: "0.85rem", color: "var(--accent)" }}>
                    💡 Want unlimited generations?
                  </p>
                  <p style={{ margin: "5px 0 0 0", fontSize: "0.8rem", color: "rgba(255,255,255,0.5)" }}>
                    Switch to <strong>Custom API Key</strong> mode to use your own Google AI Studio credentials for free.
                  </p>
                </div>
                <button
                  className="btn btn-secondary"
                  onClick={() => {
                    setAccessMode("byok");
                    setShowPaywall(false);
                    setShowApiKeyPanel(true);
                  }}
                  style={{ width: "100%", fontWeight: "bold" }}
                >
                  Configure Custom API Key
                </button>
              </>
            ) : (
              <>
                <h2 style={{ color: "var(--accent)", marginBottom: "0.5rem" }}>Upgrade to AuraDiet Pro</h2>
                <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.9rem", lineHeight: "1.4rem", marginBottom: "1.5rem" }}>
                  Get instant access to weekly customized diet plans using premium server keys. No configuration required!
                </p>
                
                <ul style={{
                  listStyle: "none",
                  padding: 0,
                  margin: "0 0 1.5rem 0",
                  textAlign: "left",
                  fontSize: "0.85rem",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.6rem"
                }}>
                  <li>⚡ <strong>Plug & Play:</strong> No API keys, no setups.</li>
                  <li>📅 <strong>4 detailed strategies per week:</strong> Fit for any profile.</li>
                  <li>🤖 <strong>Latest models:</strong> Powered by premium Gemini models.</li>
                </ul>

                <div style={{
                  background: "rgba(16, 185, 129, 0.1)",
                  border: "1px solid rgba(16, 185, 129, 0.2)",
                  padding: "0.8rem",
                  borderRadius: "var(--radius-sm)",
                  fontSize: "1.2rem",
                  fontWeight: "bold",
                  color: "#34d399",
                  marginBottom: "1.5rem"
                }}>
                  $4.99 / Month
                  <span style={{ fontSize: "0.75rem", display: "block", fontWeight: "normal", color: "rgba(255,255,255,0.5)", marginTop: "4px" }}>
                    7-day free trial included
                  </span>
                </div>

                <button
                  className="btn btn-primary"
                  onClick={handleUpgrade}
                  style={{ width: "100%", fontWeight: "bold" }}
                >
                  Subscribe & Start Free Trial
                </button>

                <p style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.4)", marginTop: "1rem" }}>
                  Or buy a custom subscription inside the Google Play Store. Cancel anytime.
                </p>
              </>
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="app-footer">
        <div className="container footer-content">
          <p>&copy; 2026 AuraDiet. Powered by Gemini API. Certified nutritional advice requires consulting a physician.</p>
        </div>
      </footer>
    </div>
  );
}
