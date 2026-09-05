import React from "react";

export default function StrategySelector({ strategies, activeStrategyId, onSelect }) {
  return (
    <div className="strategies-options-grid" id="strategies-tabs">
      {strategies.map((strategy, index) => {
        const isActive = strategy.id === activeStrategyId;
        return (
          <button
            key={strategy.id}
            className={`strategy-option-tab ${isActive ? "active" : ""}`}
            onClick={() => onSelect(strategy.id)}
          >
            <span className="option-badge">Option {index + 1}</span>
            <span className="option-name">{strategy.name}</span>
          </button>
        );
      })}
    </div>
  );
}
