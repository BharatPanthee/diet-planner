import React from "react";

export default function MealGrid({ days }) {
  return (
    <div class="days-schedule-grid" id="weekly-days-grid">
      {days.map((dayInfo, idx) => (
        <div class="day-plan-card" key={dayInfo.day || idx}>
          <div class="day-title-header">
            <h4>{dayInfo.day}</h4>
          </div>
          <div class="meal-item">
            <span class="meal-label">Breakfast</span>
            <p class="meal-desc">{dayInfo.meals.breakfast}</p>
          </div>
          <div class="meal-item">
            <span class="meal-label">Lunch</span>
            <p class="meal-desc">{dayInfo.meals.lunch}</p>
          </div>
          <div class="meal-item">
            <span class="meal-label">Dinner</span>
            <p class="meal-desc">{dayInfo.meals.dinner}</p>
          </div>
          <div class="meal-item">
            <span class="meal-label">Snack</span>
            <p class="meal-desc">{dayInfo.meals.snack}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
