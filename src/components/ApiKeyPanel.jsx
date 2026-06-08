import React, { useState, useEffect } from "react";

export default function ApiKeyPanel({ currentKey, onSave, onClear, onClose }) {
  const [keyInput, setKeyInput] = useState(currentKey || "");
  const [showKey, setShowKey] = useState(false);

  useEffect(() => {
    setKeyInput(currentKey || "");
  }, [currentKey]);

  const handleSave = () => {
    const trimmed = keyInput.trim();
    if (!trimmed) {
      alert("Please enter a key before saving.");
      return;
    }
    onSave(trimmed);
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
        <div class="form-row" style={{ marginTop: "0.75rem" }}>
          <button id="save-api-key-btn" class="btn btn-primary btn-sm" onClick={handleSave}>
            Save Key
          </button>
          <button id="clear-api-key-btn" class="btn btn-text btn-sm text-error" onClick={handleClear}>
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
