import React, { useState, useEffect } from "react";

export default function GroceryList({ groceryList, strategyId }) {
  // Store checkmark states in a Set of unique keys: "Category-ItemIndex"
  const [checkedItems, setCheckedItems] = useState(new Set());

  // Reset checked items when strategy changes to prevent checks leaking
  useEffect(() => {
    setCheckedItems(new Set());
  }, [strategyId]);

  const handleCheckboxToggle = (itemKey) => {
    const updated = new Set(checkedItems);
    if (updated.has(itemKey)) {
      updated.delete(itemKey);
    } else {
      updated.add(itemKey);
    }
    setCheckedItems(updated);
  };

  if (!groceryList || groceryList.length === 0) {
    return (
      <div class="glass-card grocery-list-card">
        <p class="helper-text">No grocery items available for this plan.</p>
      </div>
    );
  }

  return (
    <div class="glass-card grocery-list-card">
      <div class="grocery-header">
        <h3>Shopping Checklist</h3>
        <p>Check off items as you shop. Department categories have been compiled automatically.</p>
      </div>
      
      <div class="grocery-departments-container" id="grocery-departments">
        {groceryList.map((dept, deptIdx) => (
          <div class="grocery-dept-section" key={dept.category || deptIdx}>
            <h4>{dept.category}</h4>
            {dept.items.map((item, itemIdx) => {
              const itemKey = `${dept.category}-${itemIdx}`;
              const isChecked = checkedItems.has(itemKey);
              const uniqueId = `gro-item-${dept.category.replace(/\s+/g, "-")}-${itemIdx}`;

              return (
                <label className="grocery-item-checkbox" htmlFor={uniqueId} key={itemKey}>
                  <input
                    type="checkbox"
                    id={uniqueId}
                    checked={isChecked}
                    onChange={() => handleCheckboxToggle(itemKey)}
                  />
                  <span class="checkbox-box"></span>
                  <span class="item-text">{item}</span>
                </label>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
