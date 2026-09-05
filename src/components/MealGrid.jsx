import React from "react";

export default function MealGrid({ days }) {
  return (
    <div className="days-schedule-grid" id="weekly-days-grid">
      {days.map((dayInfo, idx) => (
        <div className="day-plan-card" key={dayInfo.day || idx}>
          <div className="day-title-header">
            <h4>{dayInfo.day}</h4>
          </div>
          <div className="meal-item">
            <span className="meal-label">Breakfast</span>
            <p className="meal-desc">{dayInfo.meals.breakfast}</p>
          </div>
          <div className="meal-item">
            <span className="meal-label">Lunch</span>
            <p className="meal-desc">{dayInfo.meals.lunch}</p>
          </div>
          <div className="meal-item">
            <span className="meal-label">Dinner</span>
            <p className="meal-desc">{dayInfo.meals.dinner}</p>
          </div>
          <div className="meal-item">
            <span className="meal-label">Snack</span>
            <p className="meal-desc">{dayInfo.meals.snack}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
