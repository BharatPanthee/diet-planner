// Mock Diet Plans Data for AuraDiet Demo/Pro Mode
export const MOCK_DIET_PLANS = {
  strategies: [
    {
      id: "strategy_1",
      name: "Option 1: Mediterranean Balanced",
      description: "A heart-healthy diet rich in olive oil, whole grains, lean proteins (fish, chicken), vegetables, and fruits. It is scientifically proven to reduce cardiovascular risks and support sustained energy.",
      macros: {
        calories: "1850 kcal/day",
        protein: "105g",
        carbs: "180g",
        fat: "70g"
      },
      days: [
        {
          day: "Day 1",
          meals: {
            breakfast: "Greek yogurt with honey, walnuts, and fresh blueberries",
            lunch: "Quinoa salad with cherry tomatoes, cucumbers, feta cheese, and grilled chicken",
            dinner: "Pan-seared salmon with a side of roasted asparagus and sweet potato mash",
            snack: "A handful of mixed almonds and a medium apple"
          }
        },
        {
          day: "Day 2",
          meals: {
            breakfast: "Oatmeal cooked in almond milk, topped with chia seeds and sliced banana",
            lunch: "Mediterranean turkey wrap with hummus, spinach, and roasted red peppers",
            dinner: "Baked cod with lemon-herb butter, served with sautéed zucchini and brown rice",
            snack: "Baby carrots and cucumber slices with 2 tablespoons of hummus"
          }
        },
        {
          day: "Day 3",
          meals: {
            breakfast: "Two scrambled eggs with spinach and tomatoes, served on whole-grain toast",
            lunch: "Lentil soup with a side green salad drizzled with extra virgin olive oil",
            dinner: "Grilled chicken breast with roasted broccoli and quinoa pilaf",
            snack: "Greek yogurt with a sprinkle of ground flaxseeds"
          }
        },
        {
          day: "Day 4",
          meals: {
            breakfast: "Smoothie made with spinach, protein powder, banana, and almond butter",
            lunch: "Tuna salad sandwich on sourdough bread with lettuce and tomato",
            dinner: "Vegetarian chickpea curry with spinach and basmati rice",
            snack: "One orange and a few walnuts"
          }
        },
        {
          day: "Day 5",
          meals: {
            breakfast: "Chia seed pudding made with coconut milk, topped with fresh strawberries",
            lunch: "Grilled vegetable and goat cheese sandwich on sprouted grain bread",
            dinner: "Turkey meatballs with zucchini noodles and marinara sauce",
            snack: "Hard-boiled egg with a dash of black pepper"
          }
        },
        {
          day: "Day 6",
          meals: {
            breakfast: "Whole-wheat pancakes topped with fresh raspberries and a drizzle of maple syrup",
            lunch: "Salad bowl with mixed greens, avocado, black beans, corn, and grilled shrimp",
            dinner: "Baked chicken breast with roasted Brussels sprouts and mashed cauliflower",
            snack: "Celery sticks with peanut butter"
          }
        },
        {
          day: "Day 7",
          meals: {
            breakfast: "Omelette with mushrooms, feta cheese, and spinach, served with fresh berries",
            lunch: "Minestrone soup with a slice of whole-grain rustic bread",
            dinner: "Grilled steak slices over a large green salad with olives and feta",
            snack: "A cup of edamame with sea salt"
          }
        }
      ],
      groceryList: [
        {
          category: "Produce",
          items: ["Fresh blueberries", "Spinach", "Cherry tomatoes", "Cucumbers", "Asparagus", "Sweet potatoes", "Bananas", "Zucchini", "Broccoli", "Strawberries", "Brussels sprouts", "Cauliflower", "Avocado", "Mushrooms", "Raspberries"]
        },
        {
          category: "Proteins",
          items: ["Chicken breast", "Salmon fillets", "Turkey breast", "Cod fillets", "Eggs", "Tuna (canned)", "Turkey meatballs", "Shrimp", "Steak"]
        },
        {
          category: "Dairy & Alternatives",
          items: ["Greek yogurt", "Feta cheese", "Almond milk", "Goat cheese", "Feta cheese"]
        },
        {
          category: "Pantry",
          items: ["Quinoa", "Walnuts", "Honey", "Chia seeds", "Almond butter", "Lentils (canned)", "Olive oil", "Brown rice", "Flaxseeds", "Sourdough bread", "Chickpeas (canned)", "Basmati rice", "Marinara sauce", "Peanut butter", "Edamame"]
        }
      ]
    },
    {
      id: "strategy_2",
      name: "Option 2: Low-Glycemic Index (GI)",
      description: "Focuses on slow-digesting carbohydrates that prevent blood sugar spikes. Ideal for maintaining steady energy levels, improving insulin sensitivity, and managing cravings.",
      macros: {
        calories: "1780 kcal/day",
        protein: "115g",
        carbs: "140g",
        fat: "75g"
      },
      days: [
        {
          day: "Day 1",
          meals: {
            breakfast: "Steel-cut oats with cinnamon and raw pumpkin seeds",
            lunch: "Tuna salad with celery and olive oil dressing over baby spinach",
            dinner: "Grilled pork chops with steamed green beans and wild rice",
            snack: "A small pear and a slice of cheddar cheese"
          }
        },
        {
          day: "Day 2",
          meals: {
            breakfast: "Scrambled tofu with spinach, turmeric, and bell peppers",
            lunch: "Cobb salad with chicken, hard-boiled egg, avocado, and blue cheese",
            dinner: "Baked salmon with roasted asparagus and a small side of lentils",
            snack: "Walnuts and fresh raspberries"
          }
        },
        {
          day: "Day 3",
          meals: {
            breakfast: "Two poached eggs on a bed of sautéed kale and sliced avocado",
            lunch: "Turkey and cheese roll-ups with a side of mixed baby bell peppers",
            dinner: "Beef stir-fry with broccoli, snap peas, and cauliflower rice",
            snack: "Cottage cheese with sunflower seeds"
          }
        },
        {
          day: "Day 4",
          meals: {
            breakfast: "Chia pudding with protein powder and unsweetened coconut flakes",
            lunch: "Quinoa bowl with black beans, roasted vegetables, and pumpkin seeds",
            dinner: "Lemon-herb grilled chicken breast with a cucumber tomato salad",
            snack: "Celery sticks with almond butter"
          }
        },
        {
          day: "Day 5",
          meals: {
            breakfast: "Protein shake with spinach, chia seeds, and unsweetened soy milk",
            lunch: "Lentil salad with chopped cucumber, red onion, and parsley",
            dinner: "Baked trout with a side of garlic-sauteed spinach and quinoa",
            snack: "Hard-boiled egg and a few cherry tomatoes"
          }
        },
        {
          day: "Day 6",
          meals: {
            breakfast: "Oat bran hot cereal with sliced almonds and a dash of nutmeg",
            lunch: "Spinach salad with grilled chicken, walnuts, and strawberries",
            dinner: "Grilled turkey burger wrap (lettuce bun) with roasted zucchini",
            snack: "A handful of pumpkin seeds"
          }
        },
        {
          day: "Day 7",
          meals: {
            breakfast: "Scrambled eggs with smoked salmon and chives",
            lunch: "Chickpea salad with olive oil, lemon juice, and chopped herbs",
            dinner: "Roast beef with roasted Brussels sprouts and a side green salad",
            snack: "Plain Greek yogurt with cinnamon"
          }
        }
      ],
      groceryList: [
        {
          category: "Produce",
          items: ["Spinach", "Green beans", "Bell peppers", "Avocado", "Asparagus", "Kale", "Broccoli", "Snap peas", "Cucumbers", "Tomatoes", "Onions", "Parsley", "Zucchini", "Brussels sprouts", "Lettuce"]
        },
        {
          category: "Proteins",
          items: ["Tuna (canned)", "Pork chops", "Tofu", "Chicken breast", "Eggs", "Beef (sirloin)", "Trout", "Turkey burger patties", "Smoked salmon", "Roast beef"]
        },
        {
          category: "Dairy & Alternatives",
          items: ["Cheddar cheese", "Blue cheese", "Cottage cheese", "Soy milk", "Greek yogurt"]
        },
        {
          category: "Pantry",
          items: ["Steel-cut oats", "Pumpkin seeds", "Wild rice", "Lentils", "Walnuts", "Cauliflower rice", "Sunflower seeds", "Quinoa", "Almond butter", "Almonds", "Black beans", "Chives"]
        }
      ]
    },
    {
      id: "strategy_3",
      name: "Option 3: Higher Protein & Fitness Focus",
      description: "Optimized for muscle maintenance and recovery. Excellent for active individuals who want to support fat loss while maintaining lean body mass.",
      macros: {
        calories: "1950 kcal/day",
        protein: "145g",
        carbs: "130g",
        fat: "65g"
      },
      days: [
        {
          day: "Day 1",
          meals: {
            breakfast: "Egg white omelette with turkey bacon and baby spinach",
            lunch: "Double chicken breast salad bowl with avocado and light vinaigrette",
            dinner: "Grilled sirloin steak with sweet potato fries and asparagus",
            snack: "Whey protein shake with unsweetened almond milk"
          }
        },
        {
          day: "Day 2",
          meals: {
            breakfast: "High-protein Greek yogurt with hemp seeds and raspberries",
            lunch: "Tuna and egg salad wrap using a high-fiber low-carb tortilla",
            dinner: "Baked salmon with broccoli florets and wild rice",
            snack: "Beef jerky (low sugar) and a small handful of cashews"
          }
        },
        {
          day: "Day 3",
          meals: {
            breakfast: "Protein pancakes made with oat flour and egg whites, topped with blueberries",
            lunch: "Sautéed lean ground turkey with bell peppers and black beans",
            dinner: "Grilled chicken skewers with a side of quinoa and roasted peppers",
            snack: "Cottage cheese with sliced cucumber"
          }
        },
        {
          day: "Day 4",
          meals: {
            breakfast: "Scrambled eggs with cottage cheese folded in, served on protein toast",
            lunch: "Sliced roast beef salad bowl with hard-boiled egg and spinach",
            dinner: "Seared tuna steak with roasted green beans and sesame oil",
            snack: "Whey protein shake and a green apple"
          }
        },
        {
          day: "Day 5",
          meals: {
            breakfast: "Oatmeal with whey protein stirred in, topped with sliced almonds",
            lunch: "Grilled shrimp salad with avocado, cherry tomatoes, and lemon dressing",
            dinner: "Baked chicken breast with roasted cauliflower and sweet potato",
            snack: "Two hard-boiled eggs with sea salt"
          }
        },
        {
          day: "Day 6",
          meals: {
            breakfast: "Three scrambled egg whites and one whole egg with spinach",
            lunch: "Lean beef burger on a whole-wheat thin bun with lettuce and tomato",
            dinner: "Baked cod fillet with steamed asparagus and wild rice",
            snack: "High-protein yogurt bowl with pumpkin seeds"
          }
        },
        {
          day: "Day 7",
          meals: {
            breakfast: "Protein shake blended with banana, peanut butter, and protein powder",
            lunch: "Turkey breast slices with swiss cheese rolled in lettuce wraps",
            dinner: "Grilled pork tenderloin with roasted Brussels sprouts",
            snack: "A handful of almonds"
          }
        }
      ],
      groceryList: [
        {
          category: "Produce",
          items: ["Spinach", "Asparagus", "Broccoli", "Blueberries", "Bell peppers", "Cucumbers", "Green beans", "Apples", "Avocado", "Tomatoes", "Cauliflower", "Sweet potato", "Lettuce", "Brussels sprouts"]
        },
        {
          category: "Proteins",
          items: ["Eggs (egg whites)", "Turkey bacon", "Chicken breast", "Sirloin steak", "Tuna", "Salmon", "Beef jerky", "Ground turkey", "Lean beef burger", "Shrimp", "Tuna steak", "Cod", "Turkey breast", "Pork tenderloin"]
        },
        {
          category: "Dairy & Alternatives",
          items: ["Greek yogurt", "Almond milk", "Cottage cheese", "Swiss cheese"]
        },
        {
          category: "Pantry",
          items: ["Whey protein powder", "Hemp seeds", "Low-carb tortillas", "Cashews", "Oat flour", "Quinoa", "Almonds", "Whole-wheat thin buns", "Wild rice", "Peanut butter"]
        }
      ]
    },
    {
      id: "strategy_4",
      name: "Option 4: Anti-Inflammatory / Whole Foods",
      description: "Emphasizes antioxidant-rich berries, leafy greens, wild-caught fish, ginger, and turmeric. Specifically designed to combat systemic inflammation and support joint/tissue health.",
      macros: {
        calories: "1720 kcal/day",
        protein: "95g",
        carbs: "160g",
        fat: "80g"
      },
      days: [
        {
          day: "Day 1",
          meals: {
            breakfast: "Green smoothie with kale, ginger, pineapple, and chia seeds",
            lunch: "Sardine salad with lemon and olive oil over mixed rocket greens",
            dinner: "Baked salmon with turmeric roasted cauliflower and broccoli",
            snack: "Walnuts and dark chocolate (85%+ cocoa)"
          }
        },
        {
          day: "Day 2",
          meals: {
            breakfast: "Chia seed pudding with unsweetened almond milk and fresh blueberries",
            lunch: "Lentil and vegetable soup with a side of mixed greens",
            dinner: "Grilled chicken breast with sautéed spinach and garlic",
            snack: "Pumpkin seeds and a green apple"
          }
        },
        {
          day: "Day 3",
          meals: {
            breakfast: "Two poached eggs with roasted tomatoes and sautéed mushrooms",
            lunch: "Tuna salad made with avocado oil mayonnaise, served in avocado halves",
            dinner: "Baked cod with a crust of walnuts and herbs, with roasted asparagus",
            snack: "Fresh raspberries and almonds"
          }
        },
        {
          day: "Day 4",
          meals: {
            breakfast: "Oatmeal with grated ginger, cinnamon, and ground flaxseeds",
            lunch: "Salad with roasted beets, goat cheese, spinach, and walnuts",
            dinner: "Turkey breast with a side of roasted sweet potato and kale chips",
            snack: "Celery sticks with sunflower butter"
          }
        },
        {
          day: "Day 5",
          meals: {
            breakfast: "Smoothie with mixed berries, avocado, spinach, and plant protein",
            lunch: "Chickpea and cucumber salad with fresh mint and olive oil dressing",
            dinner: "Baked mackerel with roasted carrots and a side green salad",
            snack: "Greek yogurt with pumpkin seeds"
          }
        },
        {
          day: "Day 6",
          meals: {
            breakfast: "Scrambled eggs with chard, onions, and turmeric",
            lunch: "Quinoa salad bowl with roasted butternut squash and pumpkin seeds",
            dinner: "Grilled chicken breast with steam-baked broccoli and beets",
            snack: "A handful of walnuts"
          }
        },
        {
          day: "Day 7",
          meals: {
            breakfast: "Chia pudding topped with sliced kiwi and hemp seeds",
            lunch: "Split pea soup with a side of cucumber slices",
            dinner: "Baked salmon with garlic-sautéed spinach and roasted parsnips",
            snack: "A pear and some almonds"
          }
        }
      ],
      groceryList: [
        {
          category: "Produce",
          items: ["Kale", "Ginger", "Pineapple", "Cauliflower", "Broccoli", "Blueberries", "Garlic", "Spinach", "Apples", "Tomatoes", "Mushrooms", "Avocado", "Asparagus", "Raspberries", "Beets", "Sweet potato", "Mint", "Carrots", "Onions", "Butternut squash", "Kiwi", "Parsnips"]
        },
        {
          category: "Proteins",
          items: ["Sardines (canned)", "Salmon", "Chicken breast", "Eggs", "Tuna", "Cod", "Turkey breast", "Mackerel"]
        },
        {
          category: "Dairy & Alternatives",
          items: ["Almond milk", "Goat cheese", "Greek yogurt"]
        },
        {
          category: "Pantry",
          items: ["Chia seeds", "Walnuts", "Dark chocolate", "Pumpkin seeds", "Almonds", "Flaxseeds", "Sunflower butter", "Chickpeas", "Quinoa", "Hemp seeds", "Olive oil"]
        }
      ]
    },
    {
      id: "strategy_5",
      name: "Option 5: Heart-Healthy DASH",
      description: "Based on the Dietary Approaches to Stop Hypertension (DASH). Rich in potassium, calcium, and magnesium. It limits sodium and saturated fats to actively support normal blood pressure.",
      macros: {
        calories: "1790 kcal/day",
        protein: "90g",
        carbs: "210g",
        fat: "60g"
      },
      days: [
        {
          day: "Day 1",
          meals: {
            breakfast: "Banana oat bran flakes with fat-free milk and strawberries",
            lunch: "Chicken breast sandwich on whole-wheat bread with lettuce and tomato",
            dinner: "Baked trout with lemon juice, served with brown rice and green peas",
            snack: "Unsalted sunflower seeds and a small orange"
          }
        },
        {
          day: "Day 2",
          meals: {
            breakfast: "Oatmeal cooked with apples and raisins, topped with sliced almonds",
            lunch: "Salad with mixed greens, sliced turkey breast, grapes, and walnuts",
            dinner: "Grilled chicken breast with baked potato and roasted asparagus",
            snack: "Fat-free Greek yogurt with honey"
          }
        },
        {
          day: "Day 3",
          meals: {
            breakfast: "Whole-grain toast with low-fat ricotta cheese and peach slices",
            lunch: "Veggie burger on a whole-wheat bun with cucumber slices",
            dinner: "Baked salmon with quinoa and sautéed spinach (no salt added)",
            snack: "Mixed unsalted nuts and a pear"
          }
        },
        {
          day: "Day 4",
          meals: {
            breakfast: "Smoothie made with low-fat yogurt, banana, spinach, and orange juice",
            lunch: "Tuna salad sandwich on whole-wheat bread with light mayonnaise",
            dinner: "Baked cod with roasted broccoli and sweet potato slices",
            snack: "Baby carrots and hummus"
          }
        },
        {
          day: "Day 5",
          meals: {
            breakfast: "Two boiled eggs with whole-grain toast and a glass of skim milk",
            lunch: "Minestrone soup with a side of cucumber tomato salad",
            dinner: "Grilled pork tenderloin with roasted green beans and brown rice",
            snack: "Unsalted pumpkin seeds and a banana"
          }
        },
        {
          day: "Day 6",
          meals: {
            breakfast: "Steel-cut oats with cinnamon, chopped dates, and walnuts",
            lunch: "Grilled chicken wrap with mixed greens and low-fat dressing",
            dinner: "Baked cod with a side of baked potato and steamed spinach",
            snack: "Greek yogurt with peach slices"
          }
        },
        {
          day: "Day 7",
          meals: {
            breakfast: "Scrambled eggs with onions and bell peppers, on whole-grain toast",
            lunch: "Lentil soup with side salad and light vinaigrette",
            dinner: "Grilled turkey breast with sweet potato and roasted Brussels sprouts",
            snack: "An apple and almonds"
          }
        }
      ],
      groceryList: [
        {
          category: "Produce",
          items: ["Strawberries", "Bananas", "Lettuce", "Tomatoes", "Green peas", "Apples", "Grapes", "Asparagus", "Peaches", "Cucumbers", "Spinach", "Broccoli", "Sweet potato", "Carrots", "Green beans", "Onions", "Bell peppers", "Brussels sprouts"]
        },
        {
          category: "Proteins",
          items: ["Chicken breast", "Trout", "Turkey breast", "Salmon", "Tuna", "Cod", "Eggs", "Pork tenderloin"]
        },
        {
          category: "Dairy & Alternatives",
          items: ["Skim milk", "Fat-free Greek yogurt", "Low-fat ricotta", "Low-fat yogurt"]
        },
        {
          category: "Pantry",
          items: ["Whole-wheat bread", "Brown rice", "Sunflower seeds", "Almonds", "Raisins", "Walnuts", "Whole-grain buns", "Quinoa", "Dates", "Hummus", "Lentil soup", "Unsalted nuts"]
        }
      ]
    }
  ],
  usageMetadata: {
    promptTokenCount: 1420,
    candidatesTokenCount: 15380,
    totalTokenCount: 16800
  }
};
