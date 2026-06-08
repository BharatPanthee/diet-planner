import React, { useState } from "react";

export default function ParameterForm({ onSubmit }) {
  const [age, setAge] = useState(30);
  const [gender, setGender] = useState("Male");
  const [weight, setWeight] = useState(70);
  const [height, setHeight] = useState(175);
  const [unitSystem, setUnitSystem] = useState("metric");
  const [activityLevel, setActivityLevel] = useState("Sedentary (Little to no exercise)");
  const [goal, setGoal] = useState("Healthy Weight Loss (Caloric Deficit)");
  const [selectedConditions, setSelectedConditions] = useState([]);
  const [selectedRestrictions, setSelectedRestrictions] = useState([]);

  const handleUnitSystemChange = (system) => {
    setUnitSystem(system);
    if (system === "imperial") {
      // Convert typical default 70kg -> 154lbs, 175cm -> 69in
      setWeight(Math.round(weight * 2.20462 * 10) / 10);
      setHeight(Math.round(height * 0.393701));
    } else {
      // Convert typical 154lbs -> 70kg, 69in -> 175cm
      setWeight(Math.round(weight / 2.20462 * 10) / 10);
      setHeight(Math.round(height / 0.393701));
    }
  };

  const handleConditionChange = (condition, checked) => {
    if (checked) {
      setSelectedConditions([...selectedConditions, condition]);
    } else {
      setSelectedConditions(selectedConditions.filter(c => c !== condition));
    }
  };

  const handleRestrictionChange = (restriction, checked) => {
    if (checked) {
      setSelectedRestrictions([...selectedRestrictions, restriction]);
    } else {
      setSelectedRestrictions(selectedRestrictions.filter(r => r !== restriction));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      age,
      gender,
      weight,
      weightUnit: unitSystem === "imperial" ? "lbs" : "kg",
      height,
      heightUnit: unitSystem === "imperial" ? "inches" : "cm",
      activityLevel,
      goal,
      healthConditions: selectedConditions,
      dietaryRestrictions: selectedRestrictions
    });
  };

  const healthConditionsList = [
    { value: "Diabetes", label: "Diabetes (Low GI)" },
    { value: "Hypertension", label: "Hypertension (Low Sodium)" },
    { value: "Kidney Disease", label: "Kidney Disease" },
    { value: "High Cholesterol", label: "High Cholesterol" },
    { value: "Gout", label: "Gout (Low Purine)" },
    { value: "Celiac Disease", label: "Celiac Disease (Gluten Free)" }
  ];

  const dietaryRestrictionsList = [
    { value: "Vegan", label: "Vegan" },
    { value: "Vegetarian", label: "Vegetarian" },
    { value: "Ketogenic", label: "Ketogenic" },
    { value: "Halal", label: "Halal" },
    { value: "Gluten-Free", label: "Gluten-Free" },
    { value: "Nut-Free", label: "Nut-Free" },
    { value: "Dairy-Free", label: "Dairy-Free" },
    { value: "Egg-Free", label: "Egg-Free" }
  ];

  return (
    <section class="glass-card main-form-card">
      <h2>Weekly Plan Parameters</h2>
      <p class="section-desc">Define your health profile and dietary goals below.</p>
      
      <form onSubmit={handleSubmit} class="custom-form">
        {/* Age & Gender Row */}
        <div class="form-row">
          <div class="form-group flex-1">
            <label htmlFor="user-age">Age (Years) *</label>
            <input
              type="number"
              id="user-age"
              required
              min="1"
              max="120"
              value={age}
              onChange={(e) => setAge(parseInt(e.target.value) || "")}
            />
          </div>
          <div class="form-group flex-1">
            <label htmlFor="user-gender">Gender *</label>
            <select
              id="user-gender"
              required
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Non-binary">Non-binary</option>
              <option value="Prefer not to say">Prefer not to say</option>
            </select>
          </div>
        </div>

        {/* Weight & Height Row */}
        <div class="form-row unit-toggle-container">
          <div class="form-group flex-1">
            <label htmlFor="user-weight">
              Weight ({unitSystem === "imperial" ? "lbs" : "kg"}) *
            </label>
            <input
              type="number"
              id="user-weight"
              required
              min="10"
              max="1000"
              step="0.1"
              value={weight}
              onChange={(e) => setWeight(parseFloat(e.target.value) || "")}
            />
          </div>
          <div class="form-group flex-1">
            <label htmlFor="user-height">
              Height ({unitSystem === "imperial" ? "inches" : "cm"}) *
            </label>
            <input
              type="number"
              id="user-height"
              required
              min="10"
              max="300"
              value={height}
              onChange={(e) => setHeight(parseInt(e.target.value) || "")}
            />
          </div>
        </div>

        {/* Unit Selector Switch */}
        <div class="form-group inline-toggle">
          <span class="toggle-label">System Units:</span>
          <div class="segmented-control">
            <input
              type="radio"
              id="unit-metric"
              name="unit-system"
              value="metric"
              checked={unitSystem === "metric"}
              onChange={() => handleUnitSystemChange("metric")}
            />
            <label htmlFor="unit-metric">Metric (kg/cm)</label>
            <input
              type="radio"
              id="unit-imperial"
              name="unit-system"
              value="imperial"
              checked={unitSystem === "imperial"}
              onChange={() => handleUnitSystemChange("imperial")}
            />
            <label htmlFor="unit-imperial">Imperial (lbs/in)</label>
          </div>
        </div>

        {/* Activity Level */}
        <div class="form-group">
          <label htmlFor="user-activity">Daily Activity Level *</label>
          <select
            id="user-activity"
            required
            value={activityLevel}
            onChange={(e) => setActivityLevel(e.target.value)}
          >
            <option value="Sedentary (Little to no exercise)">Sedentary (desk job, low movement)</option>
            <option value="Lightly Active (Light exercise 1-3 days/week)">Lightly Active (active standing, light walks)</option>
            <option value="Moderately Active (Moderate exercise 3-5 days/week)">Moderately Active (gym sessions, runs)</option>
            <option value="Very Active (Heavy exercise 6-7 days/week)">Very Active (athlete, manual labor)</option>
          </select>
        </div>

        {/* Weekly Diet Goal */}
        <div class="form-group">
          <label htmlFor="user-goal">Primary Goal *</label>
          <select
            id="user-goal"
            required
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
          >
            <option value="Healthy Weight Loss (Caloric Deficit)">Healthy Weight Loss</option>
            <option value="Lean Muscle Gain (Caloric Surplus)">Lean Muscle Gain</option>
            <option value="General Health Maintenance & Clean Eating">Weight Maintenance & Clean Eating</option>
            <option value="Blood Sugar Regulation (Low Glycemic Index)">Diabetic Blood Sugar Regulation</option>
            <option value="Cardiovascular Health (Heart-Healthy/DASH)">Cardiovascular Health Improvement</option>
          </select>
        </div>

        {/* Health Conditions Checkboxes */}
        <div class="form-group">
          <label>Health Conditions / Clinical Constraints</label>
          <div class="checkbox-grid">
            {healthConditionsList.map((cond) => (
              <label class="checkbox-container" key={cond.value}>
                <input
                  type="checkbox"
                  name="health-condition"
                  value={cond.value}
                  checked={selectedConditions.includes(cond.value)}
                  onChange={(e) => handleConditionChange(cond.value, e.target.checked)}
                />
                <span class="checkmark"></span> {cond.label}
              </label>
            ))}
          </div>
        </div>

        {/* Dietary Restrictions Checkboxes */}
        <div class="form-group">
          <label>Dietary Restrictions / Choices</label>
          <div class="checkbox-grid">
            {dietaryRestrictionsList.map((rest) => (
              <label class="checkbox-container" key={rest.value}>
                <input
                  type="checkbox"
                  name="diet-restriction"
                  value={rest.value}
                  checked={selectedRestrictions.includes(rest.value)}
                  onChange={(e) => handleRestrictionChange(rest.value, e.target.checked)}
                />
                <span class="checkmark"></span> {rest.label}
              </label>
            ))}
          </div>
        </div>

        <button type="submit" id="generate-btn" class="btn btn-primary w-full btn-lg">
          ✨ Generate 5 Weekly Strategies
        </button>
      </form>
    </section>
  );
}
