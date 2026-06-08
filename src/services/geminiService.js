// Gemini API Service Module for Diet Planner

/**
 * Call the Gemini 1.5 Flash API to generate 5 customized diet strategies.
 * @param {string} apiKey - Google AI Studio API Key.
 * @param {Object} userInput - User constraints.
 * @returns {Promise<Object>} The parsed JSON diet plan strategies.
 */
export async function generateWeeklyDietPlans(apiKey, userInput) {
  if (!apiKey) {
    throw new Error("Please configure a valid Gemini API Key.");
  }

  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

  const promptText = `
You are an expert clinical dietitian and nutritionist. 
Create exactly 5 distinct, healthy weekly diet plan options/strategies for a person with the following profile:
- Age: ${userInput.age} years old
- Gender: ${userInput.gender}
- Weight: ${userInput.weight} ${userInput.weightUnit}
- Height: ${userInput.height} ${userInput.heightUnit}
- Activity Level: ${userInput.activityLevel}
- Health Conditions: ${userInput.healthConditions.length > 0 ? userInput.healthConditions.join(", ") : "None"}
- Dietary Restrictions: ${userInput.dietaryRestrictions.length > 0 ? userInput.dietaryRestrictions.join(", ") : "None"}
- Weekly Goal: ${userInput.goal}

Provide 5 strategies representing different nutritional approaches (e.g. Option 1: Mediterranean Balanced, Option 2: Low-Glycemic Index, Option 3: Higher Protein, Option 4: Anti-inflammatory, Option 5: Dash/Heart-Healthy), but ALL of them MUST strictly satisfy the person's health conditions and dietary restrictions. 

For each of the 5 options:
1. Provide a clear strategy name and description.
2. Outline daily macro targets (calories, protein, carbs, fats).
3. Provide a complete 7-day schedule (Day 1 to Day 7) detailing Breakfast, Lunch, Dinner, and a Snack.
4. Provide a consolidated, department-wise grocery list with department categories (e.g., Produce, Proteins, Dairy/Alternatives, Pantry, Bakery, etc.) and item check-offs.
  `;

  const requestBody = {
    contents: [
      {
        parts: [
          { text: promptText }
        ]
      }
    ],
    generationConfig: {
      responseMimeType: "application/json",
      responseSchema: {
        type: "OBJECT",
        properties: {
          strategies: {
            type: "ARRAY",
            description: "Exactly 5 distinct weekly diet plan options satisfying the given constraints.",
            items: {
              type: "OBJECT",
              properties: {
                id: { type: "STRING", description: "Unique identifier, e.g., strategy_1, strategy_2, etc." },
                name: { type: "STRING", description: "Descriptive approach name, e.g. Option 1: Mediterranean Balanced" },
                description: { type: "STRING", description: "Detailed explanation of the approach and why it fits the profile." },
                macros: {
                  type: "OBJECT",
                  properties: {
                    calories: { type: "STRING", description: "Target energy, e.g. 1850 kcal/day" },
                    protein: { type: "STRING", description: "Target protein, e.g. 110g" },
                    carbs: { type: "STRING", description: "Target carbs, e.g. 170g" },
                    fat: { type: "STRING", description: "Target fat, e.g. 70g" }
                  },
                  required: ["calories", "protein", "carbs", "fat"]
                },
                days: {
                  type: "ARRAY",
                  description: "7-day breakdown of the weekly meal plan.",
                  items: {
                    type: "OBJECT",
                    properties: {
                      day: { type: "STRING", description: "Day 1 through Day 7" },
                      meals: {
                        type: "OBJECT",
                        properties: {
                          breakfast: { type: "STRING" },
                          lunch: { type: "STRING" },
                          dinner: { type: "STRING" },
                          snack: { type: "STRING" }
                        },
                        required: ["breakfast", "lunch", "dinner", "snack"]
                      }
                    },
                    required: ["day", "meals"]
                  }
                },
                groceryList: {
                  type: "ARRAY",
                  description: "Consolidated grocery list grouped by category departments.",
                  items: {
                    type: "OBJECT",
                    properties: {
                      category: { type: "STRING", description: "Produce, Proteins, Dairy/Alternatives, Pantry, etc." },
                      items: {
                        type: "ARRAY",
                        items: { type: "STRING" }
                      }
                    },
                    required: ["category", "items"]
                  }
                }
              },
              required: ["id", "name", "description", "macros", "days", "groceryList"]
            }
          }
        },
        required: ["strategies"]
      }
    }
  };

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(requestBody)
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const message = errorData.error?.message || `API HTTP error ${response.status}`;
    throw new Error(message);
  }

  const responseData = await response.json();
  const textResult = responseData.candidates?.[0]?.content?.parts?.[0]?.text;

  if (!textResult) {
    throw new Error("No response content received from Gemini. Please check your prompt parameters.");
  }

  try {
    return JSON.parse(textResult.trim());
  } catch (err) {
    console.error("Failed to parse Gemini response text as JSON:", textResult);
    throw new Error("Received an invalid JSON response structure from the AI model.");
  }
}
