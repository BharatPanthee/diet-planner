import React from "react";

export default function StrategySelector({ strategies, activeStrategyId, onSelect }) {
  return (
    <div class="strategies-options-grid" id="strategies-tabs">
      {strategies.map((strategy, index) => {
        const isActive = strategy.id === activeStrategyId;
        return (
          <button
            key={strategy.id}
            className={`strategy-option-tab ${isActive ? "active" : ""}`}
            onClick={() => onSelect(strategy.id)}
          >
            <span class="option-badge">Option {index + 1}</span>
            <span class="option-name">{strategy.name}</span>
          </button>
        );
      })}
    </div>
  );
}
