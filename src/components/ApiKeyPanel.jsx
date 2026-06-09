import React, { useState, useEffect } from "react";

export default function ApiKeyPanel({ currentKey, currentModel, onSave, onClear, onClose }) {
  const [keyInput, setKeyInput] = useState(currentKey || "");
  const [showKey, setShowKey] = useState(false);

  useEffect(() => {
    setKeyInput(currentKey || "");
  }, [currentKey]);

  const [modelInput, setModelInput] = useState(currentModel || "gemini-2.5-flash");

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
    <section id="api-key-card" class="glass-card api-config-card">
      <div class="card-header">
        <h3>Google Gemini API Credentials</h3>
        <button id="close-api-card-btn" class="btn-text" onClick={onClose}>&times;</button>
      </div>
      <div class="card-body">
        <p class="helper-text">
          Enter your Google AI Studio Gemini API Key. It is saved locally in your browser and never sent to any server.
        </p>
        <div class="form-group">
          <label htmlFor="gemini-api-key">Gemini API Key</label>
          <div class="input-with-action">
            <input
              type={showKey ? "text" : "password"}
              id="gemini-api-key"
              placeholder="Enter ghp_ or AIzaSy... key"
              value={keyInput}
              onChange={(e) => setKeyInput(e.target.value)}
            />
            <button
              id="toggle-key-visibility"
              class="btn btn-text"
              onClick={() => setShowKey(!showKey)}
            >
              {showKey ? "Hide" : "Show"}
            </button>
          </div>
        </div>
        
        <div className="form-group" style={{ marginTop: "1rem" }}>
          <label htmlFor="gemini-model-select">Gemini Model</label>
          <select
            id="gemini-model-select"
            value={modelInput}
            onChange={(e) => setModelInput(e.target.value)}
            style={{
              width: "100%",
              padding: "0.55rem",
              borderRadius: "var(--radius-sm)",
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "var(--foreground)",
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
          marginTop: "0.6rem",
          fontSize: "0.80rem",
          background: "rgba(255, 255, 255, 0.02)",
          padding: "0.6rem 0.8rem",
          borderRadius: "var(--radius-sm)",
          border: "1px dashed rgba(255,255,255,0.08)"
        }}>
          {modelInput.includes("pro") ? (
            <>
              <p style={{ margin: 0, fontWeight: "600", color: "#10b981" }}>Est. Cost: ~$0.0154 / run</p>
              <p style={{ margin: "2px 0 0 0", color: "rgba(255,255,255,0.5)", fontSize: "0.75rem" }}>~4,000 tokens (1.2k input, 2.8k output)</p>
              <p style={{ margin: "2px 0 0 0", color: "rgba(255,255,255,0.3)", fontSize: "0.70rem" }}>Rate: $1.25/M input, $5.00/M output</p>
            </>
          ) : (
            <>
              <p style={{ margin: 0, fontWeight: "600", color: "#10b981" }}>Est. Cost: ~$0.0009 / run</p>
              <p style={{ margin: "2px 0 0 0", color: "rgba(255,255,255,0.5)", fontSize: "0.75rem" }}>~4,000 tokens (1.2k input, 2.8k output)</p>
              <p style={{ margin: "2px 0 0 0", color: "rgba(255,255,255,0.3)", fontSize: "0.70rem" }}>Rate: $0.075/M input, $0.30/M output (Free tier available)</p>
            </>
          )}
        </div>

        <div className="form-row" style={{ marginTop: "1rem" }}>
          <button id="save-api-key-btn" className="btn btn-primary btn-sm" onClick={handleSave}>
            Save Credentials
          </button>
          <button id="clear-api-key-btn" className="btn btn-text btn-sm text-error" onClick={handleClear}>
            Delete Key
          </button>
        </div>
        <p
          id="api-key-status"
          className={`key-status-text ${currentKey ? "status-active" : "status-inactive"}`}
        >
          Status: {currentKey ? "Key Loaded (Ready)" : "Key Not Configured"}
        </p>
        <p class="helper-text-link">
          Don't have a key?{" "}
          <a href="https://aistudio.google.com/" target="_blank" rel="noopener noreferrer">
            Get a free key here
          </a>.
        </p>
      </div>
    </section>
  );
}
