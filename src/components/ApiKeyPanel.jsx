import React, { useState, useEffect } from "react";

export default function ApiKeyPanel({
  currentKey,
  currentModel,
  onSave,
  onClear,
  onClose,
  // Membership & Auth props
  userAuth,
  membership,
  accessMode = "pro",
  onSignIn,
  onSignOut,
  onUpgrade,
  onToggleAccessMode
}) {
  const [keyInput, setKeyInput] = useState(currentKey || "");
  const [showKey, setShowKey] = useState(false);
  const [modelInput, setModelInput] = useState(currentModel || "gemini-2.5-flash");

  useEffect(() => {
    setKeyInput(currentKey || "");
  }, [currentKey]);

  useEffect(() => {
    setModelInput(currentModel || "gemini-2.5-flash");
  }, [currentModel]);

  const handleSave = () => {
    const trimmed = keyInput.trim();
    if (!trimmed) {
      alert("Please enter a key before saving.");
      return;
    }
    onSave(trimmed, modelInput);
  };

  const handleClear = () => {
    setKeyInput("");
    onClear();
  };

  return (
    <section id="api-key-card" className="glass-card api-config-card" style={{ padding: "1.2rem" }}>
      <div className="card-header" style={{ borderBottom: "1px solid rgba(255, 255, 255, 0.08)", paddingBottom: "0.8rem", marginBottom: "0.8rem" }}>
        <h3 style={{ margin: 0 }}>AuraDiet Access Options</h3>
        <button id="close-api-card-btn" className="btn-text" onClick={onClose} style={{ fontSize: "1.5rem" }}>&times;</button>
      </div>

      {/* Access Mode Toggle Tabs */}
      <div style={{
        display: "flex",
        background: "rgba(0, 0, 0, 0.2)",
        borderRadius: "8px",
        padding: "2px",
        marginBottom: "1rem"
      }}>
        <button
          className="access-tab-btn"
          onClick={() => onToggleAccessMode("pro")}
          style={{
            flex: 1,
            padding: "0.55rem 0.5rem",
            fontSize: "0.8rem",
            background: accessMode === "pro" ? "var(--accent-primary)" : "transparent",
            color: accessMode === "pro" ? "var(--bg-primary)" : "var(--text-muted)",
            fontWeight: "bold",
            borderRadius: "6px",
            border: "none",
            cursor: "pointer",
            transition: "all 0.2s ease"
          }}
        >
          🌟 AuraDiet Pro
        </button>
        <button
          className="access-tab-btn"
          onClick={() => onToggleAccessMode("byok")}
          style={{
            flex: 1,
            padding: "0.55rem 0.5rem",
            fontSize: "0.8rem",
            background: accessMode === "byok" ? "var(--accent-primary)" : "transparent",
            color: accessMode === "byok" ? "var(--bg-primary)" : "var(--text-muted)",
            fontWeight: "bold",
            borderRadius: "6px",
            border: "none",
            cursor: "pointer",
            transition: "all 0.2s ease"
          }}
        >
          🔑 Custom API Key
        </button>
      </div>

      <div className="card-body" style={{ padding: 0 }}>
        {accessMode === "pro" ? (
          /* ==================== PRO VERSION PANEL ==================== */
          <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}>
            <p className="helper-text" style={{ margin: 0, fontSize: "0.8rem" }}>
              Generate diet strategies instantly with premium server API keys. No setup required!
            </p>

            {!userAuth ? (
              /* State 1: Unauthenticated */
              <div style={{
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.05)",
                padding: "1rem",
                borderRadius: "8px",
                textAlign: "center"
              }}>
                <p style={{ margin: "0 0 0.8rem 0", fontSize: "0.8rem", color: "rgba(255,255,255,0.7)" }}>
                  Sign in with Google to access your subscription and track weekly generation counts.
                </p>
                <button
                  className="btn btn-secondary btn-sm"
                  onClick={onSignIn}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    fontWeight: "600"
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12.24 10.285V13.4h6.887C18.2 15.614 15.645 18 12.24 18c-3.86 0-7-3.14-7-7s3.14-7 7-7c1.73 0 3.3.66 4.49 1.745l2.42-2.42C17.65 1.83 15.11 1 12.24 1 6.58 1 2 5.58 2 11.24s4.58 10.24 10.24 10.24c5.9 0 10.24-4.15 10.24-10.24 0-.69-.08-1.35-.22-1.955H12.24z"/>
                  </svg>
                  Sign In with Google
                </button>
              </div>
            ) : !membership.isPro ? (
              /* State 2: Logged In, Free Tier */
              <div style={{
                background: "rgba(255,255,255,0.02)",
                border: "1px dashed rgba(255,255,255,0.1)",
                padding: "1rem",
                borderRadius: "8px",
                textAlign: "center"
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", justifyContent: "center", marginBottom: "0.5rem" }}>
                  <img
                    src={userAuth.avatar}
                    alt={userAuth.name}
                    style={{ width: "24px", height: "24px", borderRadius: "50%" }}
                  />
                  <span style={{ fontSize: "0.85rem", fontWeight: "bold" }}>{userAuth.name}</span>
                </div>
                <p style={{ margin: "0 0 0.8rem 0", fontSize: "0.75rem", color: "rgba(255,255,255,0.5)" }}>
                  You are currently using the Free tier. Unlock server keys and weekly generations.
                </p>
                <button
                  className="btn btn-primary btn-sm"
                  onClick={onUpgrade}
                  style={{ width: "100%", fontWeight: "bold" }}
                >
                  🌟 Upgrade to Pro ($4.99/mo)
                </button>
                <button
                  className="btn-text"
                  onClick={onSignOut}
                  style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.4)", marginTop: "0.6rem" }}
                >
                  Sign Out
                </button>
              </div>
            ) : (
              /* State 3: Active Pro Subscriber */
              <div style={{
                background: "linear-gradient(135deg, rgba(16, 185, 129, 0.08) 0%, rgba(5, 150, 105, 0.03) 100%)",
                border: "1px solid rgba(16, 185, 129, 0.2)",
                padding: "1rem",
                borderRadius: "8px"
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <img
                      src={userAuth.avatar}
                      alt={userAuth.name}
                      style={{ width: "24px", height: "24px", borderRadius: "50%" }}
                    />
                    <span style={{ fontSize: "0.85rem", fontWeight: "bold" }}>{userAuth.name}</span>
                  </div>
                  <span style={{
                    background: "rgba(16, 185, 129, 0.2)",
                    color: "#34d399",
                    padding: "2px 8px",
                    borderRadius: "20px",
                    fontSize: "0.7rem",
                    fontWeight: "bold"
                  }}>PRO ACTIVE</span>
                </div>

                <div style={{ marginBottom: "0.5rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.75rem", marginBottom: "4px" }}>
                    <span>Weekly Usage</span>
                    <span style={{ fontWeight: "bold" }}>
                      {membership.generationsUsedThisWeek} of {membership.generationsLimitPerWeek} runs
                    </span>
                  </div>
                  <div style={{ width: "100%", height: "6px", background: "rgba(255,255,255,0.08)", borderRadius: "3px", overflow: "hidden" }}>
                    <div style={{
                      width: `${(membership.generationsUsedThisWeek / membership.generationsLimitPerWeek) * 100}%`,
                      height: "100%",
                      background: membership.generationsUsedThisWeek >= membership.generationsLimitPerWeek ? "#f87171" : "#10b981",
                      borderRadius: "3px",
                      transition: "width 0.4s ease"
                    }} />
                  </div>
                </div>

                <p style={{ margin: 0, fontSize: "0.7rem", color: "rgba(255,255,255,0.4)" }}>
                  Limit resets on: {membership.weekResetDate}
                </p>

                <div style={{ display: "flex", justifyContent: "space-between", marginTop: "0.8rem", borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: "0.6rem" }}>
                  <span style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.4)", display: "flex", alignItems: "center" }}>
                    Server key: Active ⚡
                  </span>
                  <button
                    className="btn-text"
                    onClick={onSignOut}
                    style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.4)", padding: 0 }}
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          /* ==================== BYOK (API KEY) PANEL ==================== */
          <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}>
            <p className="helper-text" style={{ margin: 0, fontSize: "0.8rem" }}>
              Enter your Google AI Studio Gemini API Key. It is saved locally in your browser.
            </p>
            <div className="form-group">
              <label htmlFor="gemini-api-key">Gemini API Key</label>
              <div className="input-with-action">
                <input
                  type={showKey ? "text" : "password"}
                  id="gemini-api-key"
                  placeholder="Enter ghp_ or AIzaSy... key"
                  value={keyInput}
                  onChange={(e) => setKeyInput(e.target.value)}
                />
                <button
                  id="toggle-key-visibility"
                  className="btn btn-text"
                  onClick={() => setShowKey(!showKey)}
                >
                  {showKey ? "Hide" : "Show"}
                </button>
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="gemini-model-select">Gemini Model</label>
              <select
                id="gemini-model-select"
                value={modelInput}
                onChange={(e) => setModelInput(e.target.value)}
                style={{
                  width: "100%",
                  padding: "0.55rem",
                  borderRadius: "8px",
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: "var(--text-main)",
                  fontSize: "0.9rem",
                  marginTop: "0.35rem",
                  cursor: "pointer"
                }}
              >
                <option value="gemini-2.5-flash">Gemini 2.5 Flash (Recommended)</option>
                <option value="gemini-2.0-flash">Gemini 2.0 Flash</option>
                <option value="gemini-1.5-flash">Gemini 1.5 Flash (Legacy)</option>
                <option value="gemini-2.5-pro">Gemini 2.5 Pro (Rich Detail)</option>
                <option value="gemini-1.5-pro">Gemini 1.5 Pro (Legacy Detail)</option>
              </select>
            </div>

            {/* Dynamic Cost Estimation card */}
            <div style={{
              fontSize: "0.80rem",
              background: "rgba(255, 255, 255, 0.02)",
              padding: "0.6rem 0.8rem",
              borderRadius: "8px",
              border: "1px dashed rgba(255,255,255,0.08)"
            }}>
              {(() => {
                const MODEL_DETAILS = {
                  "gemini-2.5-flash": {
                    estCost: "0.0380",
                    tokens: "16,500 (1.5k input, 15.0k output)",
                    rateInfo: "$0.30/M input, $2.50/M output"
                  },
                  "gemini-2.0-flash": {
                    estCost: "0.0062",
                    tokens: "16,500 (1.5k input, 15.0k output)",
                    rateInfo: "$0.10/M input, $0.40/M output"
                  },
                  "gemini-1.5-flash": {
                    estCost: "0.0046",
                    tokens: "16,500 (1.5k input, 15.0k output)",
                    rateInfo: "$0.075/M input, $0.30/M output"
                  },
                  "gemini-2.5-pro": {
                    estCost: "0.1519",
                    tokens: "16,500 (1.5k input, 15.0k output)",
                    rateInfo: "$1.25/M input, $10.00/M output"
                  },
                  "gemini-1.5-pro": {
                    estCost: "0.0769",
                    tokens: "16,500 (1.5k input, 15.0k output)",
                    rateInfo: "$1.25/M input, $5.00/M output"
                  }
                };
                const details = MODEL_DETAILS[modelInput] || MODEL_DETAILS["gemini-2.5-flash"];
                return (
                  <>
                    <p style={{ margin: 0, fontWeight: "600", color: "#10b981" }}>Est. Cost: ~${details.estCost} / run</p>
                    <p style={{ margin: "2px 0 0 0", color: "rgba(255,255,255,0.5)", fontSize: "0.75rem" }}>~{details.tokens} tokens</p>
                    <p style={{ margin: "2px 0 0 0", color: "rgba(255,255,255,0.3)", fontSize: "0.70rem" }}>Rate: {details.rateInfo} (Free tier available)</p>
                  </>
                );
              })()}
            </div>

            <div className="form-row" style={{ display: "flex", gap: "0.5rem" }}>
              <button id="save-api-key-btn" className="btn btn-primary btn-sm" onClick={handleSave} style={{ flex: 1 }}>
                Save Credentials
              </button>
              <button id="clear-api-key-btn" className="btn btn-text btn-sm text-error" onClick={handleClear}>
                Delete Key
              </button>
            </div>
            
            <p
              id="api-key-status"
              className={`key-status-text ${currentKey ? "status-active" : "status-inactive"}`}
              style={{ margin: 0, fontSize: "0.75rem" }}
            >
              Status: {currentKey ? "Key Loaded (Ready)" : "Key Not Configured"}
            </p>
            <p className="helper-text-link" style={{ margin: 0, fontSize: "0.75rem" }}>
              Don't have a key?{" "}
              <a href="https://aistudio.google.com/" target="_blank" rel="noopener noreferrer">
                Get a free key here
              </a>.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
