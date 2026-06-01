const foodDatabase = {
    breakfast: {
        veg: {
            lose: [
                { name: "Oatmeal with mixed berries", servingG: 250, per100g: { calories: 112, protein: 4, carbs: 19, fat: 2.4 } },
                { name: "Greek yogurt with honey", servingG: 200, per100g: { calories: 97, protein: 9, carbs: 12, fat: 1.5 } },
                { name: "Paneer scramble with vegetables", servingG: 200, per100g: { calories: 130, protein: 10, carbs: 5, fat: 8 } },
                { name: "Whole grain toast with avocado", servingG: 180, per100g: { calories: 178, protein: 5, carbs: 18, fat: 9 } }
            ],
            maintain: [
                { name: "Scrambled paneer with whole wheat toast", servingG: 300, per100g: { calories: 140, protein: 11, carbs: 12, fat: 5.5 } },
                { name: "Protein smoothie with banana", servingG: 350, per100g: { calories: 109, protein: 10, carbs: 14, fat: 1.5 } },
                { name: "Oatmeal with nuts and fruits", servingG: 300, per100g: { calories: 150, protein: 5, carbs: 22, fat: 5 } },
                { name: "Greek yogurt parfait with granola", servingG: 280, per100g: { calories: 143, protein: 8, carbs: 18, fat: 4.5 } }
            ],
            gain: [
                { name: "Protein pancakes with peanut butter", servingG: 350, per100g: { calories: 186, protein: 12, carbs: 18, fat: 8 } },
                { name: "Cheese omelette with avocado", servingG: 300, per100g: { calories: 193, protein: 14, carbs: 5, fat: 14 } },
                { name: "Oatmeal with whey protein", servingG: 350, per100g: { calories: 149, protein: 15, carbs: 17, fat: 3 } },
                { name: "French toast with cheese", servingG: 320, per100g: { calories: 219, protein: 11, carbs: 22, fat: 10 } }
            ]
        },
        nonveg: {
            lose: [
                { name: "Oatmeal with mixed berries", servingG: 250, per100g: { calories: 112, protein: 4, carbs: 19, fat: 2.4 } },
                { name: "Greek yogurt with honey", servingG: 200, per100g: { calories: 97, protein: 9, carbs: 12, fat: 1.5 } },
                { name: "Egg whites with spinach", servingG: 200, per100g: { calories: 67, protein: 11, carbs: 1.5, fat: 0.5 } },
                { name: "Whole grain toast with avocado", servingG: 180, per100g: { calories: 178, protein: 5, carbs: 18, fat: 9 } }
            ],
            maintain: [
                { name: "Scrambled eggs with whole wheat toast", servingG: 280, per100g: { calories: 150, protein: 11, carbs: 12, fat: 6 } },
                { name: "Protein smoothie with banana", servingG: 350, per100g: { calories: 109, protein: 10, carbs: 14, fat: 1.5 } },
                { name: "Oatmeal with nuts and fruits", servingG: 300, per100g: { calories: 150, protein: 5, carbs: 22, fat: 5 } },
                { name: "Greek yogurt parfait with granola", servingG: 280, per100g: { calories: 143, protein: 8, carbs: 18, fat: 4.5 } }
            ],
            gain: [
                { name: "Protein pancakes with peanut butter", servingG: 350, per100g: { calories: 186, protein: 12, carbs: 18, fat: 8 } },
                { name: "Eggs Benedict with avocado", servingG: 300, per100g: { calories: 193, protein: 12, carbs: 10, fat: 12 } },
                { name: "Oatmeal with whey protein", servingG: 350, per100g: { calories: 149, protein: 15, carbs: 17, fat: 3 } },
                { name: "French toast with bacon", servingG: 320, per100g: { calories: 219, protein: 13, carbs: 20, fat: 10 } }
            ]
        }
    },
    morningSnack: {
        veg: {
            lose: [
                { name: "Apple with almond butter", servingG: 180, per100g: { calories: 153, protein: 3, carbs: 18, fat: 8 } },
                { name: "Carrots with hummus", servingG: 170, per100g: { calories: 88, protein: 3, carbs: 10, fat: 4.5 } },
                { name: "Handful of almonds", servingG: 30, per100g: { calories: 575, protein: 21, carbs: 10, fat: 49 } },
                { name: "Protein shake", servingG: 300, per100g: { calories: 40, protein: 8, carbs: 2, fat: 0.5 } }
            ],
            maintain: [
                { name: "Mixed nuts and dried fruits", servingG: 60, per100g: { calories: 450, protein: 12, carbs: 35, fat: 30 } },
                { name: "Protein bar", servingG: 60, per100g: { calories: 350, protein: 30, carbs: 35, fat: 10 } },
                { name: "Cottage cheese with berries", servingG: 200, per100g: { calories: 98, protein: 11, carbs: 6, fat: 3 } },
                { name: "Whole grain crackers with cheese", servingG: 70, per100g: { calories: 328, protein: 14, carbs: 30, fat: 17 } }
            ],
            gain: [
                { name: "Mass gainer shake", servingG: 400, per100g: { calories: 150, protein: 12, carbs: 20, fat: 3.5 } },
                { name: "Peanut butter sandwich", servingG: 160, per100g: { calories: 340, protein: 14, carbs: 28, fat: 20 } },
                { name: "Protein bar with banana", servingG: 180, per100g: { calories: 228, protein: 18, carbs: 28, fat: 7 } },
                { name: "Trail mix with extra nuts", servingG: 80, per100g: { calories: 460, protein: 15, carbs: 35, fat: 32 } }
            ]
        },
        nonveg: {
            lose: [
                { name: "Apple with almond butter", servingG: 180, per100g: { calories: 153, protein: 3, carbs: 18, fat: 8 } },
                { name: "Carrots with hummus", servingG: 170, per100g: { calories: 88, protein: 3, carbs: 10, fat: 4.5 } },
                { name: "Handful of almonds", servingG: 30, per100g: { calories: 575, protein: 21, carbs: 10, fat: 49 } },
                { name: "Protein shake", servingG: 300, per100g: { calories: 40, protein: 8, carbs: 2, fat: 0.5 } }
            ],
            maintain: [
                { name: "Mixed nuts and dried fruits", servingG: 60, per100g: { calories: 450, protein: 12, carbs: 35, fat: 30 } },
                { name: "Protein bar", servingG: 60, per100g: { calories: 350, protein: 30, carbs: 35, fat: 10 } },
                { name: "Cottage cheese with berries", servingG: 200, per100g: { calories: 98, protein: 11, carbs: 6, fat: 3 } },
                { name: "Whole grain crackers with cheese", servingG: 70, per100g: { calories: 328, protein: 14, carbs: 30, fat: 17 } }
            ],
            gain: [
                { name: "Mass gainer shake", servingG: 400, per100g: { calories: 150, protein: 12, carbs: 20, fat: 3.5 } },
                { name: "Peanut butter sandwich", servingG: 160, per100g: { calories: 340, protein: 14, carbs: 28, fat: 20 } },
                { name: "Protein bar with banana", servingG: 180, per100g: { calories: 228, protein: 18, carbs: 28, fat: 7 } },
                { name: "Trail mix with extra nuts", servingG: 80, per100g: { calories: 460, protein: 15, carbs: 35, fat: 32 } }
            ]
        }
    },
    lunch: {
        veg: {
            lose: [
                { name: "Paneer salad", servingG: 250, per100g: { calories: 116, protein: 10, carbs: 5, fat: 6.5 } },
                { name: "Vegetable wrap", servingG: 250, per100g: { calories: 124, protein: 5, carbs: 16, fat: 4.5 } },
                { name: "Quinoa bowl with tofu", servingG: 300, per100g: { calories: 107, protein: 7, carbs: 13, fat: 3.5 } },
                { name: "Grilled paneer with steamed vegetables", servingG: 280, per100g: { calories: 114, protein: 10, carbs: 5, fat: 6 } }
            ],
            maintain: [
                { name: "Paneer with brown rice", servingG: 350, per100g: { calories: 149, protein: 12, carbs: 16, fat: 4.5 } },
                { name: "Vegetable pasta", servingG: 350, per100g: { calories: 157, protein: 10, carbs: 18, fat: 5.5 } },
                { name: "Vegetable stir-fry with paneer", servingG: 350, per100g: { calories: 154, protein: 10, carbs: 17, fat: 5 } },
                { name: "Paneer sandwich with avocado", servingG: 280, per100g: { calories: 179, protein: 12, carbs: 14, fat: 8.5 } }
            ],
            gain: [
                { name: "Paneer with pasta", servingG: 400, per100g: { calories: 188, protein: 14, carbs: 18, fat: 7 } },
                { name: "Cheese sandwich with paneer", servingG: 380, per100g: { calories: 211, protein: 16, carbs: 16, fat: 10 } },
                { name: "Paneer biryani", servingG: 400, per100g: { calories: 180, protein: 13, carbs: 20, fat: 6 } },
                { name: "Large veg wrap with paneer", servingG: 400, per100g: { calories: 213, protein: 15, carbs: 18, fat: 9 } }
            ]
        },
        nonveg: {
            lose: [
                { name: "Grilled chicken salad", servingG: 300, per100g: { calories: 100, protein: 14, carbs: 4, fat: 3 } },
                { name: "Turkey wrap with vegetables", servingG: 280, per100g: { calories: 121, protein: 12, carbs: 12, fat: 3.5 } },
                { name: "Quinoa bowl with tofu", servingG: 300, per100g: { calories: 107, protein: 7, carbs: 13, fat: 3.5 } },
                { name: "Grilled fish with steamed vegetables", servingG: 280, per100g: { calories: 107, protein: 13, carbs: 5, fat: 3.5 } }
            ],
            maintain: [
                { name: "Grilled chicken with brown rice", servingG: 350, per100g: { calories: 149, protein: 14, carbs: 16, fat: 3.5 } },
                { name: "Salmon with quinoa and vegetables", servingG: 350, per100g: { calories: 157, protein: 15, carbs: 14, fat: 5 } },
                { name: "Lean beef stir-fry", servingG: 350, per100g: { calories: 166, protein: 15, carbs: 15, fat: 5.5 } },
                { name: "Turkey and avocado sandwich", servingG: 280, per100g: { calories: 179, protein: 14, carbs: 14, fat: 7 } }
            ],
            gain: [
                { name: "Chicken breast with pasta", servingG: 400, per100g: { calories: 188, protein: 18, carbs: 18, fat: 5.5 } },
                { name: "Beef steak with rice", servingG: 400, per100g: { calories: 200, protein: 20, carbs: 18, fat: 6 } },
                { name: "Salmon with sweet potato", servingG: 380, per100g: { calories: 189, protein: 16, carbs: 16, fat: 7 } },
                { name: "Large burrito with chicken", servingG: 420, per100g: { calories: 202, protein: 18, carbs: 18, fat: 7.5 } }
            ]
        }
    },
    afternoonSnack: {
        veg: {
            lose: [
                { name: "Greek yogurt", servingG: 200, per100g: { calories: 59, protein: 10, carbs: 3.5, fat: 0.5 } },
                { name: "Cucumber slices", servingG: 200, per100g: { calories: 16, protein: 0.7, carbs: 3, fat: 0.1 } },
                { name: "Roasted chickpeas", servingG: 40, per100g: { calories: 360, protein: 18, carbs: 40, fat: 12 } },
                { name: "Protein shake", servingG: 300, per100g: { calories: 40, protein: 8, carbs: 2, fat: 0.5 } }
            ],
            maintain: [
                { name: "Protein shake with banana", servingG: 350, per100g: { calories: 78, protein: 8, carbs: 9, fat: 1 } },
                { name: "Cheese and whole grain crackers", servingG: 100, per100g: { calories: 350, protein: 15, carbs: 30, fat: 18 } },
                { name: "Nut butter with apple", servingG: 200, per100g: { calories: 150, protein: 4, carbs: 18, fat: 7.5 } },
                { name: "Hummus with vegetables", servingG: 180, per100g: { calories: 122, protein: 4, carbs: 12, fat: 6.5 } }
            ],
            gain: [
                { name: "Mass gainer shake with banana", servingG: 500, per100g: { calories: 120, protein: 8, carbs: 16, fat: 3 } },
                { name: "Peanut butter banana shake", servingG: 450, per100g: { calories: 133, protein: 7, carbs: 15, fat: 6 } },
                { name: "Protein bar and nuts", servingG: 100, per100g: { calories: 410, protein: 28, carbs: 32, fat: 18 } },
                { name: "Greek yogurt with honey and nuts", servingG: 280, per100g: { calories: 136, protein: 10, carbs: 14, fat: 4.5 } }
            ]
        },
        nonveg: {
            lose: [
                { name: "Greek yogurt", servingG: 200, per100g: { calories: 59, protein: 10, carbs: 3.5, fat: 0.5 } },
                { name: "Cucumber slices", servingG: 200, per100g: { calories: 16, protein: 0.7, carbs: 3, fat: 0.1 } },
                { name: "Hard boiled eggs", servingG: 100, per100g: { calories: 155, protein: 13, carbs: 1.1, fat: 11 } },
                { name: "Protein shake", servingG: 300, per100g: { calories: 40, protein: 8, carbs: 2, fat: 0.5 } }
            ],
            maintain: [
                { name: "Protein shake with banana", servingG: 350, per100g: { calories: 78, protein: 8, carbs: 9, fat: 1 } },
                { name: "Cheese and whole grain crackers", servingG: 100, per100g: { calories: 350, protein: 15, carbs: 30, fat: 18 } },
                { name: "Nut butter with apple", servingG: 200, per100g: { calories: 150, protein: 4, carbs: 18, fat: 7.5 } },
                { name: "Hummus with vegetables", servingG: 180, per100g: { calories: 122, protein: 4, carbs: 12, fat: 6.5 } }
            ],
            gain: [
                { name: "Mass gainer shake with banana", servingG: 500, per100g: { calories: 120, protein: 8, carbs: 16, fat: 3 } },
                { name: "Peanut butter banana shake", servingG: 450, per100g: { calories: 133, protein: 7, carbs: 15, fat: 6 } },
                { name: "Protein bar and nuts", servingG: 100, per100g: { calories: 410, protein: 28, carbs: 32, fat: 18 } },
                { name: "Greek yogurt with honey and nuts", servingG: 280, per100g: { calories: 136, protein: 10, carbs: 14, fat: 4.5 } }
            ]
        }
    },
    dinner: {
        veg: {
            lose: [
                { name: "Grilled paneer with vegetables", servingG: 280, per100g: { calories: 125, protein: 11, carbs: 5, fat: 7 } },
                { name: "Tofu with steamed broccoli", servingG: 300, per100g: { calories: 107, protein: 9, carbs: 6, fat: 5.5 } },
                { name: "Vegetable dal with quinoa", servingG: 300, per100g: { calories: 113, protein: 7, carbs: 15, fat: 2.5 } },
                { name: "Tofu stir-fry with mixed vegetables", servingG: 320, per100g: { calories: 94, protein: 8, carbs: 7, fat: 4 } }
            ],
            maintain: [
                { name: "Paneer with quinoa", servingG: 350, per100g: { calories: 149, protein: 13, carbs: 14, fat: 5 } },
                { name: "Vegetable curry with rice", servingG: 380, per100g: { calories: 145, protein: 10, carbs: 17, fat: 4.5 } },
                { name: "Paneer with sweet potato", servingG: 350, per100g: { calories: 151, protein: 12, carbs: 16, fat: 5 } },
                { name: "Vegetable stir-fry with tofu", servingG: 380, per100g: { calories: 126, protein: 9, carbs: 14, fat: 4.5 } }
            ],
            gain: [
                { name: "Paneer butter masala with naan", servingG: 400, per100g: { calories: 213, protein: 14, carbs: 18, fat: 10 } },
                { name: "Vegetable pasta with cheese", servingG: 400, per100g: { calories: 195, protein: 14, carbs: 20, fat: 7 } },
                { name: "Paneer biryani", servingG: 420, per100g: { calories: 190, protein: 13, carbs: 22, fat: 6 } },
                { name: "Large paneer tikka with rice", servingG: 400, per100g: { calories: 188, protein: 15, carbs: 18, fat: 6.5 } }
            ]
        },
        nonveg: {
            lose: [
                { name: "Grilled fish with vegetables", servingG: 280, per100g: { calories: 114, protein: 14, carbs: 5, fat: 4 } },
                { name: "Chicken breast with steamed broccoli", servingG: 300, per100g: { calories: 117, protein: 15, carbs: 4, fat: 4 } },
                { name: "Turkey meatballs with zucchini noodles", servingG: 320, per100g: { calories: 106, protein: 12, carbs: 5, fat: 4 } },
                { name: "Tofu stir-fry with mixed vegetables", servingG: 320, per100g: { calories: 94, protein: 8, carbs: 7, fat: 4 } }
            ],
            maintain: [
                { name: "Grilled salmon with quinoa", servingG: 350, per100g: { calories: 149, protein: 16, carbs: 12, fat: 4.5 } },
                { name: "Chicken breast with sweet potato", servingG: 350, per100g: { calories: 157, protein: 17, carbs: 14, fat: 3.5 } },
                { name: "Lean beef with brown rice", servingG: 350, per100g: { calories: 166, protein: 17, carbs: 15, fat: 4.5 } },
                { name: "Shrimp stir-fry with vegetables", servingG: 380, per100g: { calories: 126, protein: 14, carbs: 12, fat: 3 } }
            ],
            gain: [
                { name: "Beef steak with mashed potatoes", servingG: 420, per100g: { calories: 202, protein: 20, carbs: 14, fat: 8 } },
                { name: "Chicken and rice bowl with avocado", servingG: 420, per100g: { calories: 186, protein: 18, carbs: 18, fat: 6 } },
                { name: "Salmon with pasta", servingG: 400, per100g: { calories: 200, protein: 18, carbs: 18, fat: 7 } },
                { name: "Large chicken breast with rice", servingG: 450, per100g: { calories: 167, protein: 18, carbs: 16, fat: 4 } }
            ]
        }
    },
    eveningSnack: {
        veg: {
            lose: [
                { name: "Herbal tea with honey", servingG: 250, per100g: { calories: 8, protein: 0, carbs: 2, fat: 0 } },
                { name: "Cottage cheese (paneer) cubes", servingG: 80, per100g: { calories: 98, protein: 11, carbs: 3, fat: 4.5 } },
                { name: "Warm milk with turmeric", servingG: 200, per100g: { calories: 42, protein: 3.4, carbs: 5, fat: 1 } },
                { name: "Roasted pumpkin seeds", servingG: 30, per100g: { calories: 446, protein: 19, carbs: 15, fat: 19 } }
            ],
            maintain: [
                { name: "Warm milk with honey", servingG: 200, per100g: { calories: 56, protein: 3.4, carbs: 7, fat: 1.5 } },
                { name: "Mixed nuts", servingG: 30, per100g: { calories: 553, protein: 16, carbs: 16, fat: 49 } },
                { name: "Banana with almond butter", servingG: 150, per100g: { calories: 118, protein: 3, carbs: 16, fat: 5 } },
                { name: "Greek yogurt with berries", servingG: 150, per100g: { calories: 74, protein: 8, carbs: 6, fat: 1.5 } }
            ],
            gain: [
                { name: "Peanut butter sandwich", servingG: 120, per100g: { calories: 435, protein: 18, carbs: 38, fat: 25 } },
                { name: "Full cream milk with honey", servingG: 250, per100g: { calories: 71, protein: 3.3, carbs: 6, fat: 3.5 } },
                { name: "Protein shake with milk", servingG: 300, per100g: { calories: 70, protein: 10, carbs: 5, fat: 1.5 } },
                { name: "Nutella toast", servingG: 100, per100g: { calories: 380, protein: 9, carbs: 45, fat: 18 } }
            ]
        },
        nonveg: {
            lose: [
                { name: "Herbal tea with honey", servingG: 250, per100g: { calories: 8, protein: 0, carbs: 2, fat: 0 } },
                { name: "Chicken broth", servingG: 200, per100g: { calories: 15, protein: 2, carbs: 0.5, fat: 0.5 } },
                { name: "Warm milk with turmeric", servingG: 200, per100g: { calories: 42, protein: 3.4, carbs: 5, fat: 1 } },
                { name: "Boiled egg white", servingG: 60, per100g: { calories: 52, protein: 11, carbs: 0.7, fat: 0.2 } }
            ],
            maintain: [
                { name: "Warm milk with honey", servingG: 200, per100g: { calories: 56, protein: 3.4, carbs: 7, fat: 1.5 } },
                { name: "Turkey slices with cheese", servingG: 80, per100g: { calories: 195, protein: 22, carbs: 1, fat: 11 } },
                { name: "Tuna salad", servingG: 150, per100g: { calories: 132, protein: 18, carbs: 3, fat: 5.5 } },
                { name: "Scrambled egg whites", servingG: 120, per100g: { calories: 68, protein: 12, carbs: 1, fat: 1.5 } }
            ],
            gain: [
                { name: "Chicken salad sandwich", servingG: 150, per100g: { calories: 200, protein: 14, carbs: 18, fat: 8 } },
                { name: "Full cream milk with honey", servingG: 250, per100g: { calories: 71, protein: 3.3, carbs: 6, fat: 3.5 } },
                { name: "Protein shake with milk", servingG: 300, per100g: { calories: 70, protein: 10, carbs: 5, fat: 1.5 } },
                { name: "Egg salad", servingG: 150, per100g: { calories: 167, protein: 12, carbs: 2, fat: 12 } }
            ]
        }
    }
};

var foodDatabaseDetailed = {
    protein: [
        { name: "Chicken Breast", calories: 165, protein: 31, carbs: 0, fat: 3.6, serving: "100g", type: "nonveg" },
        { name: "Salmon", calories: 208, protein: 20, carbs: 0, fat: 13, serving: "100g", type: "nonveg" },
        { name: "Eggs", calories: 155, protein: 13, carbs: 1.1, fat: 11, serving: "100g (2 eggs)", type: "veg" },
        { name: "Paneer", calories: 265, protein: 14, carbs: 3.6, fat: 22, serving: "100g", type: "veg" },
        { name: "Tofu", calories: 76, protein: 8, carbs: 1.9, fat: 4.8, serving: "100g", type: "veg" },
        { name: "Turkey Breast", calories: 135, protein: 30, carbs: 0, fat: 1, serving: "100g", type: "nonveg" },
        { name: "Tuna", calories: 132, protein: 29, carbs: 0, fat: 1, serving: "100g", type: "nonveg" },
        { name: "Shrimp", calories: 99, protein: 24, carbs: 0.2, fat: 0.3, serving: "100g", type: "nonveg" },
        { name: "Lean Beef", calories: 250, protein: 26, carbs: 0, fat: 15, serving: "100g", type: "nonveg" },
        { name: "Lamb", calories: 294, protein: 25, carbs: 0, fat: 21, serving: "100g", type: "nonveg" },
        { name: "Duck", calories: 337, protein: 19, carbs: 0, fat: 28, serving: "100g", type: "nonveg" },
        { name: "Tempeh", calories: 192, protein: 20, carbs: 8, fat: 11, serving: "100g", type: "veg" },
        { name: "Edamame", calories: 121, protein: 12, carbs: 8.9, fat: 5.2, serving: "100g shelled", type: "veg" },
        { name: "Chickpeas", calories: 139, protein: 7.6, carbs: 22, fat: 2.6, serving: "100g cooked", type: "veg" },
        { name: "Sardines", calories: 208, protein: 25, carbs: 0, fat: 11, serving: "100g canned", type: "nonveg" },
        { name: "Cod", calories: 82, protein: 18, carbs: 0, fat: 0.7, serving: "100g", type: "nonveg" },
        { name: "Pork Chop", calories: 231, protein: 25, carbs: 0, fat: 14, serving: "100g lean", type: "nonveg" },
        { name: "Venison", calories: 158, protein: 30, carbs: 0, fat: 3.4, serving: "100g", type: "nonveg" }
    ],
    carbs: [
        { name: "Brown Rice", calories: 111, protein: 2.6, carbs: 23, fat: 0.9, serving: "100g cooked" },
        { name: "White Rice", calories: 130, protein: 2.7, carbs: 28, fat: 0.3, serving: "100g cooked" },
        { name: "Quinoa", calories: 120, protein: 4.4, carbs: 21, fat: 1.9, serving: "100g cooked" },
        { name: "Oats", calories: 389, protein: 16.9, carbs: 66, fat: 6.9, serving: "100g raw" },
        { name: "Whole Wheat Bread", calories: 247, protein: 13, carbs: 41, fat: 3.4, serving: "100g" },
        { name: "Sweet Potato", calories: 86, protein: 1.6, carbs: 20, fat: 0.1, serving: "100g" },
        { name: "Potato", calories: 77, protein: 2, carbs: 17, fat: 0.1, serving: "100g" },
        { name: "Pasta", calories: 131, protein: 5, carbs: 25, fat: 1.1, serving: "100g cooked" },
        { name: "Roti", calories: 297, protein: 8, carbs: 52, fat: 5, serving: "100g" },
        { name: "Basmati Rice", calories: 121, protein: 3.5, carbs: 25, fat: 0.4, serving: "100g cooked" },
        { name: "Cornflakes", calories: 357, protein: 7, carbs: 84, fat: 0.4, serving: "100g" },
        { name: "Muesli", calories: 340, protein: 10, carbs: 66, fat: 5, serving: "100g" },
        { name: "Barley", calories: 123, protein: 2.3, carbs: 28, fat: 0.4, serving: "100g cooked" },
        { name: "Couscous", calories: 112, protein: 3.8, carbs: 23, fat: 0.2, serving: "100g cooked" },
        { name: "Millet", calories: 119, protein: 3.5, carbs: 24, fat: 1, serving: "100g cooked" },
        { name: "Buckwheat", calories: 110, protein: 4.1, carbs: 23, fat: 0.8, serving: "100g cooked" },
        { name: "Yam", calories: 118, protein: 1.5, carbs: 28, fat: 0.1, serving: "100g" },
        { name: "Corn Tortilla", calories: 218, protein: 5.7, carbs: 44, fat: 2.9, serving: "100g (2 tortillas)" }
    ],
    fats: [
        { name: "Avocado", calories: 160, protein: 2, carbs: 8.5, fat: 14.7, serving: "100g" },
        { name: "Almonds", calories: 579, protein: 21, carbs: 22, fat: 50, serving: "100g" },
        { name: "Peanuts", calories: 567, protein: 26, carbs: 16, fat: 49, serving: "100g" },
        { name: "Walnuts", calories: 654, protein: 15, carbs: 14, fat: 65, serving: "100g" },
        { name: "Peanut Butter", calories: 588, protein: 25, carbs: 20, fat: 50, serving: "100g" },
        { name: "Olive Oil", calories: 884, protein: 0, carbs: 0, fat: 100, serving: "100ml" },
        { name: "Coconut Oil", calories: 862, protein: 0, carbs: 0, fat: 100, serving: "100ml" },
        { name: "Ghee", calories: 900, protein: 0, carbs: 0, fat: 100, serving: "100g" },
        { name: "Cashews", calories: 553, protein: 18, carbs: 30, fat: 44, serving: "100g" },
        { name: "Chia Seeds", calories: 486, protein: 17, carbs: 42, fat: 31, serving: "100g" },
        { name: "Flax Seeds", calories: 534, protein: 18, carbs: 29, fat: 42, serving: "100g" },
        { name: "Sunflower Seeds", calories: 584, protein: 21, carbs: 20, fat: 51, serving: "100g" },
        { name: "Macadamia Nuts", calories: 718, protein: 7.9, carbs: 14, fat: 76, serving: "100g" },
        { name: "Pecans", calories: 691, protein: 9.2, carbs: 14, fat: 72, serving: "100g" },
        { name: "Pistachios", calories: 560, protein: 20, carbs: 27, fat: 45, serving: "100g shelled" },
        { name: "Hemp Seeds", calories: 553, protein: 32, carbs: 8.7, fat: 49, serving: "100g" },
        { name: "Pumpkin Seeds", calories: 559, protein: 30, carbs: 11, fat: 49, serving: "100g" },
        { name: "Tahini", calories: 595, protein: 17, carbs: 21, fat: 53, serving: "100g" }
    ],
    vegetables: [
        { name: "Broccoli", calories: 34, protein: 2.8, carbs: 7, fat: 0.4, serving: "100g" },
        { name: "Spinach", calories: 23, protein: 2.9, carbs: 3.6, fat: 0.4, serving: "100g" },
        { name: "Carrots", calories: 41, protein: 0.9, carbs: 10, fat: 0.2, serving: "100g" },
        { name: "Tomatoes", calories: 18, protein: 0.9, carbs: 3.9, fat: 0.2, serving: "100g" },
        { name: "Cucumber", calories: 15, protein: 0.7, carbs: 3.6, fat: 0.1, serving: "100g" },
        { name: "Bell Pepper", calories: 31, protein: 1, carbs: 6, fat: 0.3, serving: "100g" },
        { name: "Onion", calories: 40, protein: 1.1, carbs: 9, fat: 0.1, serving: "100g" },
        { name: "Potato", calories: 77, protein: 2, carbs: 17, fat: 0.1, serving: "100g" },
        { name: "Cauliflower", calories: 25, protein: 1.9, carbs: 5, fat: 0.3, serving: "100g" },
        { name: "Green Beans", calories: 31, protein: 1.8, carbs: 7, fat: 0.1, serving: "100g" },
        { name: "Mushrooms", calories: 22, protein: 3.1, carbs: 3.3, fat: 0.3, serving: "100g" },
        { name: "Zucchini", calories: 17, protein: 1.2, carbs: 3.1, fat: 0.3, serving: "100g" },
        { name: "Cabbage", calories: 25, protein: 1.3, carbs: 6, fat: 0.1, serving: "100g" },
        { name: "Lettuce", calories: 15, protein: 1.4, carbs: 2.9, fat: 0.2, serving: "100g" }
    ],
    fruits: [
        { name: "Apple", calories: 52, protein: 0.3, carbs: 14, fat: 0.2, serving: "1 medium (182g)" },
        { name: "Banana", calories: 89, protein: 1.1, carbs: 23, fat: 0.3, serving: "1 medium (118g)" },
        { name: "Orange", calories: 47, protein: 0.9, carbs: 12, fat: 0.1, serving: "1 medium (131g)" },
        { name: "Mango", calories: 60, protein: 0.8, carbs: 15, fat: 0.4, serving: "100g" },
        { name: "Grapes", calories: 69, protein: 0.7, carbs: 18, fat: 0.2, serving: "100g" },
        { name: "Watermelon", calories: 30, protein: 0.6, carbs: 7.6, fat: 0.2, serving: "100g" },
        { name: "Strawberries", calories: 32, protein: 0.7, carbs: 7.7, fat: 0.3, serving: "100g" },
        { name: "Blueberries", calories: 57, protein: 0.7, carbs: 14, fat: 0.3, serving: "100g" },
        { name: "Papaya", calories: 43, protein: 0.5, carbs: 11, fat: 0.3, serving: "100g" },
        { name: "Pineapple", calories: 50, protein: 0.5, carbs: 13, fat: 0.1, serving: "100g" },
        { name: "Pomegranate", calories: 83, protein: 1.7, carbs: 19, fat: 1.2, serving: "100g" },
        { name: "Guava", calories: 68, protein: 2.6, carbs: 14, fat: 1, serving: "100g" }
    ],
    dairy: [
        { name: "Milk (Whole)", calories: 61, protein: 3.2, carbs: 4.8, fat: 3.3, serving: "100ml" },
        { name: "Milk (Skim)", calories: 34, protein: 3.4, carbs: 5, fat: 0.1, serving: "100ml" },
        { name: "Greek Yogurt", calories: 97, protein: 9, carbs: 3.6, fat: 5, serving: "100g" },
        { name: "Cottage Cheese", calories: 98, protein: 11, carbs: 3.4, fat: 4.3, serving: "100g" },
        { name: "Cheddar Cheese", calories: 402, protein: 25, carbs: 1.3, fat: 33, serving: "100g" },
        { name: "Mozzarella", calories: 280, protein: 28, carbs: 3.1, fat: 17, serving: "100g" },
        { name: "Butter", calories: 717, protein: 0.9, carbs: 0.1, fat: 81, serving: "100g" },
        { name: "Cream", calories: 340, protein: 2.1, carbs: 2.8, fat: 36, serving: "100ml" },
        { name: "Ice Cream", calories: 207, protein: 3.5, carbs: 24, fat: 11, serving: "100g" },
        { name: "Whey Protein", calories: 373, protein: 80, carbs: 7, fat: 4, serving: "100g" }
    ]
};

var foodRecipes = {
    "Chicken Breast": {
        ingredients: ["Chicken breast 200g", "Olive oil 1 tbsp", "Salt to taste", "Black pepper to taste", "Garlic powder 1 tsp"],
        instructions: "Season chicken breast with salt, pepper, and garlic powder. Heat olive oil in a pan over medium-high heat. Cook for 6-7 minutes per side until golden brown and internal temp reaches 74°C. Let rest 5 minutes before serving.",
        prepTime: "5 min", cookTime: "15 min", difficulty: "Easy", servings: 1
    },
    "Salmon": {
        ingredients: ["Salmon fillet 200g", "Lemon juice 1 tbsp", "Olive oil 1 tbsp", "Dill 1 tsp", "Salt and pepper to taste"],
        instructions: "Preheat oven to 190°C. Place salmon on lined baking sheet. Drizzle with olive oil and lemon juice. Season with dill, salt, and pepper. Bake for 12-15 minutes until flaky.",
        prepTime: "5 min", cookTime: "15 min", difficulty: "Easy", servings: 1
    },
    "Eggs": {
        ingredients: ["Eggs 2-3", "Butter 1 tsp", "Salt to taste", "Pepper to taste"],
        instructions: "Crack eggs into a bowl and whisk. Heat butter in a non-stick pan over medium heat. Pour eggs and stir gently with a spatula. Cook to desired consistency. Season with salt and pepper.",
        prepTime: "2 min", cookTime: "5 min", difficulty: "Easy", servings: 1
    },
    "Paneer": {
        ingredients: ["Paneer 200g", "Ghee 1 tbsp", "Turmeric 1/4 tsp", "Red chili powder 1/2 tsp", "Salt to taste"],
        instructions: "Cut paneer into cubes. Heat ghee in a pan. Add paneer cubes and sauté until golden on all sides. Sprinkle turmeric, chili powder, and salt. Toss gently and serve hot.",
        prepTime: "5 min", cookTime: "8 min", difficulty: "Easy", servings: 2
    },
    "Tofu": {
        ingredients: ["Firm tofu 200g", "Soy sauce 1 tbsp", "Sesame oil 1 tsp", "Garlic minced 2 cloves", "Cornstarch 1 tbsp"],
        instructions: "Press tofu to remove excess water. Cut into cubes and toss with cornstarch. Heat sesame oil in a pan. Add garlic and tofu. Cook until golden on all sides. Drizzle with soy sauce and toss.",
        prepTime: "10 min", cookTime: "10 min", difficulty: "Easy", servings: 2
    },
    "Turkey Breast": {
        ingredients: ["Turkey breast 200g", "Olive oil 1 tbsp", "Rosemary 1 tsp", "Salt and pepper to taste"],
        instructions: "Preheat oven to 180°C. Rub turkey breast with olive oil, rosemary, salt, and pepper. Roast for 25-30 minutes until internal temp reaches 74°C. Let rest 10 minutes before slicing.",
        prepTime: "5 min", cookTime: "30 min", difficulty: "Medium", servings: 2
    },
    "Tuna": {
        ingredients: ["Canned tuna 1 can", "Lemon juice 1 tbsp", "Olive oil 1 tsp", "Black pepper to taste", "Fresh parsley"],
        instructions: "Drain tuna and flake into a bowl. Add lemon juice, olive oil, and black pepper. Mix well. Garnish with fresh parsley. Serve with salad or whole grain bread.",
        prepTime: "5 min", cookTime: "0 min", difficulty: "Easy", servings: 1
    },
    "Shrimp": {
        ingredients: ["Shrimp 200g", "Garlic 3 cloves minced", "Olive oil 1 tbsp", "Lemon juice 1 tbsp", "Red pepper flakes"],
        instructions: "Peel and devein shrimp. Heat olive oil in a pan. Add garlic and red pepper flakes. Add shrimp and cook 2-3 minutes per side until pink. Squeeze lemon juice over and serve.",
        prepTime: "10 min", cookTime: "6 min", difficulty: "Easy", servings: 2
    },
    "Lean Beef": {
        ingredients: ["Lean beef steak 200g", "Olive oil 1 tbsp", "Garlic 2 cloves", "Thyme 1 tsp", "Salt and pepper"],
        instructions: "Season steak with salt, pepper, and thyme. Heat oil in a cast iron pan over high heat. Sear steak 4-5 minutes per side for medium-rare. Let rest 5 minutes before serving.",
        prepTime: "5 min", cookTime: "10 min", difficulty: "Medium", servings: 1
    },
    "Lamb": {
        ingredients: ["Lamb chops 200g", "Olive oil 1 tbsp", "Garlic 3 cloves", "Rosemary 1 sprig", "Salt and pepper"],
        instructions: "Marinate lamb chops with olive oil, crushed garlic, rosemary, salt, and pepper for 30 min. Grill or pan-sear over high heat for 4-5 minutes per side. Rest 5 minutes before serving.",
        prepTime: "30 min", cookTime: "10 min", difficulty: "Medium", servings: 2
    },
    "Duck": {
        ingredients: ["Duck breast 200g", "Orange juice 2 tbsp", "Honey 1 tbsp", "Thyme 1 tsp", "Salt and pepper"],
        instructions: "Score duck skin in a crosshatch pattern. Season with salt and pepper. Place skin-side down in a cold pan, heat to medium, and cook 8-10 minutes until skin is crispy. Flip and cook 4 more minutes. Glaze with orange-honey mixture.",
        prepTime: "10 min", cookTime: "15 min", difficulty: "Medium", servings: 2
    },
    "Tempeh": {
        ingredients: ["Tempeh 200g", "Soy sauce 2 tbsp", "Maple syrup 1 tbsp", "Rice vinegar 1 tbsp", "Sesame oil 1 tsp"],
        instructions: "Slice tempeh into 1cm thick pieces. Steam for 10 minutes. Mix soy sauce, maple syrup, and rice vinegar. Pan-fry tempeh in sesame oil until golden, then add sauce and glaze for 2 minutes.",
        prepTime: "5 min", cookTime: "15 min", difficulty: "Easy", servings: 2
    },
    "Brown Rice": {
        ingredients: ["Brown rice 1 cup", "Water 2.5 cups", "Salt 1/2 tsp"],
        instructions: "Rinse rice thoroughly. Bring water to a boil, add salt and rice. Reduce heat to low, cover, and simmer for 40-45 minutes until water is absorbed. Let rest 5 minutes, then fluff with fork.",
        prepTime: "5 min", cookTime: "45 min", difficulty: "Easy", servings: 3
    },
    "Quinoa": {
        ingredients: ["Quinoa 1 cup", "Water 2 cups", "Salt 1/2 tsp"],
        instructions: "Rinse quinoa in a fine mesh strainer. Bring water to a boil, add salt and quinoa. Reduce heat, cover, and simmer for 15 minutes. Remove from heat and let stand 5 minutes. Fluff with fork.",
        prepTime: "5 min", cookTime: "15 min", difficulty: "Easy", servings: 3
    },
    "Oats": {
        ingredients: ["Rolled oats 1 cup", "Milk or water 2 cups", "Pinch of salt", "Honey or maple syrup 1 tbsp"],
        instructions: "Bring milk or water to a boil. Add oats and salt. Reduce heat to medium-low and cook 5 minutes, stirring occasionally. Remove from heat, sweeten with honey, and serve warm.",
        prepTime: "2 min", cookTime: "5 min", difficulty: "Easy", servings: 2
    },
    "Sweet Potato": {
        ingredients: ["Sweet potato 1 large", "Olive oil 1 tbsp", "Salt and pepper", "Paprika 1/2 tsp"],
        instructions: "Preheat oven to 200°C. Wash and cube sweet potato. Toss with olive oil, salt, pepper, and paprika. Spread on baking sheet and roast 25-30 minutes until golden and tender.",
        prepTime: "10 min", cookTime: "30 min", difficulty: "Easy", servings: 2
    },
    "Pasta": {
        ingredients: ["Pasta 200g", "Salt 1 tbsp", "Olive oil 1 tsp"],
        instructions: "Bring a large pot of salted water to a boil. Add pasta and cook according to package directions (usually 8-12 minutes). Drain, reserving 1/4 cup pasta water. Toss with olive oil.",
        prepTime: "2 min", cookTime: "10 min", difficulty: "Easy", servings: 2
    },
    "Roti": {
        ingredients: ["Whole wheat flour 2 cups", "Water 3/4 cup", "Salt 1/2 tsp", "Ghee 1 tsp"],
        instructions: "Mix flour, salt, and water to form a soft dough. Knead for 5 minutes. Rest 15 minutes. Divide into balls and roll into circles. Cook on a hot tawa or pan until puffed and golden spots appear.",
        prepTime: "20 min", cookTime: "15 min", difficulty: "Medium", servings: 4
    },
    "White Rice": {
        ingredients: ["White rice 1 cup", "Water 2 cups", "Salt 1/2 tsp"],
        instructions: "Rinse rice until water runs clear. Bring water and salt to a boil. Add rice, reduce heat to low, cover and simmer 15-18 minutes. Remove from heat and let stand 5 minutes. Fluff with fork.",
        prepTime: "5 min", cookTime: "18 min", difficulty: "Easy", servings: 3
    },
    "Whole Wheat Bread": {
        ingredients: ["Whole wheat flour 2 cups", "Active dry yeast 1 packet", "Warm water 1 cup", "Honey 2 tbsp", "Salt 1 tsp", "Olive oil 1 tbsp"],
        instructions: "Dissolve yeast in warm water with honey; let sit 5 min. Mix flour and salt, add yeast mixture and oil. Knead 8 min. Let rise 1 hour. Shape into loaf, let rise 30 min. Bake at 190°C for 30 min.",
        prepTime: "15 min", cookTime: "30 min", difficulty: "Medium", servings: 8
    },
    "Potato": {
        ingredients: ["Potatoes 3 medium", "Olive oil 1 tbsp", "Salt to taste", "Rosemary 1 tsp"],
        instructions: "Preheat oven to 200°C. Wash and cut potatoes into wedges. Toss with olive oil, salt, and rosemary. Spread on baking sheet and roast 30-35 minutes until golden and crispy.",
        prepTime: "10 min", cookTime: "35 min", difficulty: "Easy", servings: 3
    },
    "Basmati Rice": {
        ingredients: ["Basmati rice 1 cup", "Water 1.5 cups", "Salt 1/2 tsp", "Ghee 1 tsp"],
        instructions: "Rinse rice until water runs clear. Soak 20 minutes. Bring water to a boil, add salt and drained rice. Reduce heat to low, cover, and cook 12-15 minutes. Add ghee and fluff with fork.",
        prepTime: "25 min", cookTime: "15 min", difficulty: "Easy", servings: 3
    },
    "Cornflakes": {
        ingredients: ["Cornflakes 1 cup", "Milk 1 cup", "Banana 1 sliced", "Honey 1 tsp"],
        instructions: "Pour cornflakes into a bowl. Add milk and top with sliced banana. Drizzle with honey. Serve immediately for best crunch.",
        prepTime: "2 min", cookTime: "0 min", difficulty: "Easy", servings: 1
    },
    "Muesli": {
        ingredients: ["Muesli 1 cup", "Milk or yogurt 1 cup", "Fresh berries 1/2 cup", "Honey 1 tbsp"],
        instructions: "Combine muesli and milk or yogurt in a bowl. Top with fresh berries and drizzle with honey. Let sit 2-3 minutes before serving.",
        prepTime: "3 min", cookTime: "0 min", difficulty: "Easy", servings: 1
    },
    "Almonds": {
        ingredients: ["Raw almonds 1 cup"],
        instructions: "Enjoy almonds raw as a snack. For roasted almonds: spread on baking sheet and roast at 180°C for 8-10 minutes, stirring once. Season with salt if desired.",
        prepTime: "1 min", cookTime: "0 min", difficulty: "Easy", servings: 4
    },
    "Peanuts": {
        ingredients: ["Raw peanuts 1 cup", "Salt to taste"],
        instructions: "Enjoy peanuts raw or roasted. To roast: spread on baking sheet and roast at 180°C for 10-12 minutes, stirring halfway. Let cool and season with salt.",
        prepTime: "1 min", cookTime: "10 min", difficulty: "Easy", servings: 4
    },
    "Walnuts": {
        ingredients: ["Walnuts 1 cup"],
        instructions: "Enjoy walnuts raw as a snack. Chop and add to oatmeal, yogurt, or salads for extra crunch and healthy fats.",
        prepTime: "1 min", cookTime: "0 min", difficulty: "Easy", servings: 4
    },
    "Peanut Butter": {
        ingredients: ["Roasted peanuts 2 cups", "Salt 1/4 tsp", "Honey 1 tbsp", "Peanut oil 1-2 tbsp"],
        instructions: "Blend peanuts in a food processor for 1 minute until crumbly. Scrape sides, add salt and honey. Continue blending 2-3 minutes, drizzling oil until smooth and creamy.",
        prepTime: "5 min", cookTime: "0 min", difficulty: "Easy", servings: 8
    },
    "Olive Oil": {
        ingredients: ["Extra virgin olive oil"],
        instructions: "Use as a finishing oil for salads, roasted vegetables, or bread dipping. Store in a cool, dark place. Not recommended for high-heat cooking.",
        prepTime: "0 min", cookTime: "0 min", difficulty: "Easy", servings: 1
    },
    "Coconut Oil": {
        ingredients: ["Virgin coconut oil"],
        instructions: "Use for cooking at medium-high heat, baking, or as a butter substitute. Solid at room temperature; gently warm to liquefy before measuring.",
        prepTime: "0 min", cookTime: "0 min", difficulty: "Easy", servings: 1
    },
    "Ghee": {
        ingredients: ["Unsalted butter 250g"],
        instructions: "Heat butter in a saucepan over medium-low heat. Once melted, reduce heat and simmer 20-25 minutes until milk solids turn golden. Strain through cheesecloth into a clean jar. Store at room temperature.",
        prepTime: "2 min", cookTime: "25 min", difficulty: "Medium", servings: 1
    },
    "Cashews": {
        ingredients: ["Raw cashews 1 cup"],
        instructions: "Enjoy cashews raw as a snack. For roasted: toss with salt and roast at 180°C for 8-10 minutes. Watch carefully as they burn quickly.",
        prepTime: "1 min", cookTime: "0 min", difficulty: "Easy", servings: 4
    },
    "Chia Seeds": {
        ingredients: ["Chia seeds 3 tbsp", "Milk or almond milk 1 cup", "Honey 1 tbsp", "Vanilla extract 1/2 tsp"],
        instructions: "Mix chia seeds, milk, honey, and vanilla in a jar. Stir well, cover, and refrigerate at least 4 hours or overnight. Stir again before serving. Top with fruit.",
        prepTime: "5 min", cookTime: "0 min", difficulty: "Easy", servings: 2
    },
    "Flax Seeds": {
        ingredients: ["Flax seeds 2 tbsp"],
        instructions: "Grind flax seeds in a coffee grinder for best nutrient absorption. Add to oatmeal, smoothies, yogurt, or baked goods. Store ground flax in the refrigerator.",
        prepTime: "2 min", cookTime: "0 min", difficulty: "Easy", servings: 1
    },
    "Sunflower Seeds": {
        ingredients: ["Sunflower seeds 1 cup", "Salt to taste"],
        instructions: "Enjoy sunflower seeds raw or roasted. To roast: spread on baking sheet, sprinkle with salt, and roast at 160°C for 10-12 minutes. Let cool before eating.",
        prepTime: "1 min", cookTime: "10 min", difficulty: "Easy", servings: 4
    },
    "Carrots": {
        ingredients: ["Carrots 4 medium", "Olive oil 1 tbsp", "Honey 1 tbsp", "Salt and pepper", "Fresh dill"],
        instructions: "Preheat oven to 200°C. Peel and cut carrots into sticks. Toss with olive oil, honey, salt, and pepper. Roast 25-30 minutes until tender and caramelized. Garnish with dill.",
        prepTime: "5 min", cookTime: "30 min", difficulty: "Easy", servings: 3
    },
    "Tomatoes": {
        ingredients: ["Tomatoes 2 large", "Olive oil 1 tbsp", "Basil leaves", "Salt to taste", "Balsamic vinegar 1 tsp"],
        instructions: "Slice tomatoes and arrange on a plate. Drizzle with olive oil and balsamic vinegar. Season with salt and garnish with fresh basil leaves.",
        prepTime: "5 min", cookTime: "0 min", difficulty: "Easy", servings: 2
    },
    "Cucumber": {
        ingredients: ["Cucumber 1", "Lemon juice 1 tbsp", "Salt to taste", "Chaat masala 1/2 tsp"],
        instructions: "Slice cucumber into rounds or sticks. Sprinkle with lemon juice, salt, and chaat masala. Toss gently and serve as a refreshing side.",
        prepTime: "5 min", cookTime: "0 min", difficulty: "Easy", servings: 2
    },
    "Bell Pepper": {
        ingredients: ["Bell peppers 2", "Olive oil 1 tbsp", "Garlic 2 cloves", "Salt and pepper"],
        instructions: "Slice bell peppers into strips. Heat olive oil in a pan, add minced garlic and peppers. Sauté 5-7 minutes until tender-crisp. Season with salt and pepper.",
        prepTime: "5 min", cookTime: "7 min", difficulty: "Easy", servings: 2
    },
    "Onion": {
        ingredients: ["Onion 1 large", "Oil 1 tbsp", "Salt to taste"],
        instructions: "Slice onion thinly. Heat oil in a pan over medium heat. Add onions and cook 8-10 minutes, stirring occasionally, until golden and caramelized. Season with salt.",
        prepTime: "3 min", cookTime: "10 min", difficulty: "Easy", servings: 2
    },
    "Cauliflower": {
        ingredients: ["Cauliflower 1 head", "Olive oil 2 tbsp", "Turmeric 1/2 tsp", "Cumin 1 tsp", "Salt to taste"],
        instructions: "Cut cauliflower into florets. Toss with olive oil, turmeric, cumin, and salt. Spread on baking sheet and roast at 220°C for 25-30 minutes until golden and tender.",
        prepTime: "10 min", cookTime: "30 min", difficulty: "Easy", servings: 4
    },
    "Green Beans": {
        ingredients: ["Green beans 300g", "Garlic 2 cloves", "Olive oil 1 tbsp", "Lemon zest", "Salt and pepper"],
        instructions: "Trim green bean ends. Blanch in boiling salted water for 3 minutes, then transfer to ice water. Heat olive oil, add garlic and beans. Sauté 2 minutes. Season with salt, pepper, and lemon zest.",
        prepTime: "5 min", cookTime: "8 min", difficulty: "Easy", servings: 3
    },
    "Mushrooms": {
        ingredients: ["Mushrooms 250g", "Butter 1 tbsp", "Garlic 2 cloves", "Thyme 1 tsp", "Salt and pepper"],
        instructions: "Slice mushrooms. Heat butter in a pan over medium-high heat. Add mushrooms and cook 5-7 minutes until golden. Add garlic and thyme, cook 1 more minute. Season with salt and pepper.",
        prepTime: "5 min", cookTime: "8 min", difficulty: "Easy", servings: 2
    },
    "Zucchini": {
        ingredients: ["Zucchini 2 medium", "Olive oil 1 tbsp", "Garlic 2 cloves", "Lemon juice", "Salt and pepper"],
        instructions: "Slice zucchini into half-moons. Heat olive oil in a pan. Add garlic and zucchini. Cook 4-5 minutes until tender and lightly browned. Finish with lemon juice, salt, and pepper.",
        prepTime: "3 min", cookTime: "5 min", difficulty: "Easy", servings: 2
    },
    "Cabbage": {
        ingredients: ["Cabbage 1/2 head", "Olive oil 1 tbsp", "Carrots 1 grated", "Lemon juice 1 tbsp", "Salt and pepper"],
        instructions: "Shred cabbage finely. Toss with grated carrots, lemon juice, olive oil, salt, and pepper. Massage with hands for 2 minutes. Let sit 10 minutes before serving as slaw.",
        prepTime: "10 min", cookTime: "0 min", difficulty: "Easy", servings: 4
    },
    "Lettuce": {
        ingredients: ["Lettuce 1 head", "Olive oil 1 tbsp", "Lemon juice 1 tbsp", "Salt and pepper"],
        instructions: "Wash and dry lettuce leaves. Tear into bite-sized pieces. Drizzle with olive oil and lemon juice. Season with salt and pepper. Toss gently and serve immediately.",
        prepTime: "5 min", cookTime: "0 min", difficulty: "Easy", servings: 2
    },
    "Apple": {
        ingredients: ["Apple 1", "Peanut butter 1 tbsp", "Cinnamon 1/4 tsp"],
        instructions: "Wash and slice apple. Spread peanut butter on slices or serve as dip. Sprinkle with cinnamon for extra flavor.",
        prepTime: "3 min", cookTime: "0 min", difficulty: "Easy", servings: 1
    },
    "Banana": {
        ingredients: ["Banana 1", "Almond butter 1 tbsp", "Granola 2 tbsp"],
        instructions: "Slice banana into rounds. Top with almond butter drizzle and granola. Serve as a quick breakfast or snack.",
        prepTime: "2 min", cookTime: "0 min", difficulty: "Easy", servings: 1
    },
    "Orange": {
        ingredients: ["Orange 1"],
        instructions: "Peel orange and separate into segments. Serve as a refreshing snack. Can also be juiced or added to salads.",
        prepTime: "2 min", cookTime: "0 min", difficulty: "Easy", servings: 1
    },
    "Mango": {
        ingredients: ["Mango 1", "Lime juice 1 tbsp", "Chili powder 1/4 tsp", "Salt"],
        instructions: "Peel mango and slice into cubes. Toss with lime juice, chili powder, and a pinch of salt. Serve chilled.",
        prepTime: "5 min", cookTime: "0 min", difficulty: "Easy", servings: 2
    },
    "Grapes": {
        ingredients: ["Grapes 1 cup"],
        instructions: "Wash grapes thoroughly. Enjoy fresh as a snack. For a treat, freeze grapes for 2 hours and eat as frozen bites.",
        prepTime: "1 min", cookTime: "0 min", difficulty: "Easy", servings: 1
    },
    "Watermelon": {
        ingredients: ["Watermelon 1/4", "Mint leaves", "Lime juice 1 tbsp"],
        instructions: "Cut watermelon into cubes or wedges. Sprinkle with lime juice and garnish with fresh mint leaves. Serve chilled.",
        prepTime: "5 min", cookTime: "0 min", difficulty: "Easy", servings: 4
    },
    "Strawberries": {
        ingredients: ["Strawberries 1 cup", "Greek yogurt 1/2 cup", "Honey 1 tsp"],
        instructions: "Wash and hull strawberries. Slice and serve with Greek yogurt. Drizzle with honey.",
        prepTime: "3 min", cookTime: "0 min", difficulty: "Easy", servings: 1
    },
    "Blueberries": {
        ingredients: ["Blueberries 1 cup", "Greek yogurt 1/2 cup", "Granola 2 tbsp"],
        instructions: "Rinse blueberries. Layer with Greek yogurt and granola in a bowl for a quick parfait.",
        prepTime: "2 min", cookTime: "0 min", difficulty: "Easy", servings: 1
    },
    "Papaya": {
        ingredients: ["Papaya 1/2", "Lime juice 1 tbsp", "Salt to taste"],
        instructions: "Cut papaya lengthwise and remove seeds. Scoop flesh and slice. Sprinkle with lime juice and a pinch of salt.",
        prepTime: "3 min", cookTime: "0 min", difficulty: "Easy", servings: 2
    },
    "Pineapple": {
        ingredients: ["Pineapple 1/2", "Honey 1 tbsp", "Cinnamon 1/2 tsp"],
        instructions: "Cut pineapple into chunks. Grill or pan-fry for 2-3 minutes per side until caramelized. Drizzle with honey and sprinkle cinnamon.",
        prepTime: "5 min", cookTime: "6 min", difficulty: "Easy", servings: 3
    },
    "Pomegranate": {
        ingredients: ["Pomegranate 1"],
        instructions: "Cut pomegranate in half. Hold cut side down over a bowl and tap firmly with a spoon to release seeds. Remove any white pith. Enjoy seeds fresh.",
        prepTime: "5 min", cookTime: "0 min", difficulty: "Easy", servings: 2
    },
    "Guava": {
        ingredients: ["Guava 2", "Chaat masala 1/2 tsp", "Lime juice"],
        instructions: "Wash guavas and slice into wedges. Sprinkle with chaat masala and lime juice. Serve as a refreshing snack.",
        prepTime: "3 min", cookTime: "0 min", difficulty: "Easy", servings: 2
    },
    "Milk (Whole)": {
        ingredients: ["Whole milk 1 cup"],
        instructions: "Pour milk into a saucepan and heat over medium heat until warm. Do not boil. Serve warm or cold. Can be used in coffee, tea, cereal, or smoothies.",
        prepTime: "1 min", cookTime: "3 min", difficulty: "Easy", servings: 1
    },
    "Milk (Skim)": {
        ingredients: ["Skim milk 1 cup"],
        instructions: "Serve cold or warm. Use in cereal, coffee, tea, or smoothies. Skim milk has the same nutrients as whole milk with less fat.",
        prepTime: "1 min", cookTime: "0 min", difficulty: "Easy", servings: 1
    },
    "Greek Yogurt": {
        ingredients: ["Greek yogurt 1 cup", "Honey 1 tbsp", "Mixed berries 1/2 cup"],
        instructions: "Spoon Greek yogurt into a bowl. Top with fresh berries and drizzle with honey. Stir and enjoy.",
        prepTime: "2 min", cookTime: "0 min", difficulty: "Easy", servings: 1
    },
    "Cottage Cheese": {
        ingredients: ["Cottage cheese 1 cup", "Black pepper", "Chives chopped"],
        instructions: "Spoon cottage cheese into a bowl. Season with black pepper and top with fresh chives. Serve with whole grain crackers or fresh fruit.",
        prepTime: "2 min", cookTime: "0 min", difficulty: "Easy", servings: 1
    },
    "Cheddar Cheese": {
        ingredients: ["Cheddar cheese 100g", "Whole grain crackers"],
        instructions: "Slice cheddar cheese into thin pieces. Serve at room temperature with whole grain crackers. Pair with apple slices for extra flavor.",
        prepTime: "2 min", cookTime: "0 min", difficulty: "Easy", servings: 2
    },
    "Mozzarella": {
        ingredients: ["Fresh mozzarella 200g", "Tomatoes 2", "Basil leaves", "Olive oil", "Balsamic vinegar"],
        instructions: "Slice mozzarella and tomatoes into even rounds. Arrange on a plate, alternating cheese and tomato. Tuck basil leaves between slices. Drizzle with olive oil and balsamic vinegar.",
        prepTime: "10 min", cookTime: "0 min", difficulty: "Easy", servings: 2
    },
    "Butter": {
        ingredients: ["Heavy cream 2 cups"],
        instructions: "Pour cold heavy cream into a jar with a tight lid. Shake vigorously for 10-15 minutes until cream separates into butter and buttermilk. Rinse butter under cold water and knead to remove excess liquid. Add salt if desired.",
        prepTime: "5 min", cookTime: "0 min", difficulty: "Medium", servings: 1
    },
    "Cream": {
        ingredients: ["Heavy cream 1 cup", "Sugar 1 tbsp", "Vanilla extract 1/2 tsp"],
        instructions: "Chill cream, bowl, and beaters for 15 minutes. Pour cream into bowl and beat on medium-high until soft peaks form. Add sugar and vanilla, continue beating until desired consistency.",
        prepTime: "5 min", cookTime: "0 min", difficulty: "Easy", servings: 4
    },
    "Ice Cream": {
        ingredients: ["Heavy cream 2 cups", "Sweetened condensed milk 1 can", "Vanilla extract 1 tsp"],
        instructions: "Whip heavy cream to stiff peaks. Fold in condensed milk and vanilla. Pour into a loaf pan and freeze 6 hours or overnight. Let sit 5 minutes before scooping.",
        prepTime: "15 min", cookTime: "0 min", difficulty: "Medium", servings: 8
    },
    "Whey Protein": {
        ingredients: ["Whey protein powder 1 scoop", "Milk or water 300ml", "Banana 1", "Ice cubes"],
        instructions: "Add milk or water to a blender. Add protein powder, banana, and ice cubes. Blend 30 seconds until smooth. Pour and drink immediately.",
        prepTime: "2 min", cookTime: "0 min", difficulty: "Easy", servings: 1
    },
    "Avocado": {
        ingredients: ["Ripe avocado 1", "Lime juice 1 tbsp", "Salt to taste", "Pepper to taste"],
        instructions: "Cut avocado in half, remove pit. Scoop flesh into a bowl. Mash with a fork to desired consistency. Add lime juice, salt, and pepper. Mix well. Serve as spread or side.",
        prepTime: "3 min", cookTime: "0 min", difficulty: "Easy", servings: 1
    },
    "Broccoli": {
        ingredients: ["Broccoli florets 2 cups", "Olive oil 1 tbsp", "Garlic 2 cloves minced", "Salt and pepper", "Lemon juice"],
        instructions: "Steam broccoli for 4-5 minutes until bright green and tender. Alternatively, toss with olive oil, garlic, salt, and pepper and roast at 220°C for 15 minutes. Finish with lemon juice.",
        prepTime: "5 min", cookTime: "5 min", difficulty: "Easy", servings: 2
    },
    "Spinach": {
        ingredients: ["Fresh spinach 200g", "Garlic 2 cloves", "Olive oil 1 tbsp", "Salt to taste", "Lemon juice"],
        instructions: "Heat olive oil in a pan. Add minced garlic and sauté 30 seconds. Add spinach and cook 2-3 minutes until wilted. Season with salt and squeeze lemon juice on top.",
        prepTime: "3 min", cookTime: "5 min", difficulty: "Easy", servings: 2
    }
};

var CustomFoodDB = {
    STORAGE_KEY: 'caloriecoach-custom-foods',

    getAll: function() {
        return JSON.parse(localStorage.getItem(this.STORAGE_KEY) || '[]');
    },

    add: function(food) {
        var foods = this.getAll();
        food.id = 'custom_' + Date.now() + '_' + Math.random().toString(36).slice(2, 7);
        food.category = 'custom';
        food.source = 'custom';
        foods.push(food);
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(foods));
        return food;
    },

    remove: function(id) {
        var foods = this.getAll();
        foods = foods.filter(function(f) { return f.id !== id; });
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(foods));
    },

    update: function(id, updates) {
        var foods = this.getAll();
        var idx = foods.findIndex(function(f) { return f.id === id; });
        if (idx > -1) {
            for (var key in updates) {
                if (updates.hasOwnProperty(key)) {
                    foods[idx][key] = updates[key];
                }
            }
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(foods));
            return foods[idx];
        }
        return null;
    }
};

var foodMicronutrients = {
    "Chicken Breast": { fiber: 0, iron: 0.9, calcium: 11, vitC: 0, vitA: 6 },
    "Salmon": { fiber: 0, iron: 0.8, calcium: 12, vitC: 0, vitA: 38 },
    "Eggs": { fiber: 0, iron: 1.8, calcium: 50, vitC: 0, vitA: 160 },
    "Paneer": { fiber: 0, iron: 0, calcium: 208, vitC: 0, vitA: 106 },
    "Tofu": { fiber: 0.3, iron: 4.5, calcium: 350, vitC: 0.1, vitA: 1 },
    "Turkey Breast": { fiber: 0, iron: 1.2, calcium: 11, vitC: 0, vitA: 0 },
    "Tuna": { fiber: 0, iron: 1.3, calcium: 12, vitC: 0, vitA: 43 },
    "Shrimp": { fiber: 0, iron: 0.5, calcium: 70, vitC: 0, vitA: 54 },
    "Lean Beef": { fiber: 0, iron: 2.6, calcium: 11, vitC: 0, vitA: 0 },
    "Lamb": { fiber: 0, iron: 1.9, calcium: 17, vitC: 0, vitA: 0 },
    "Duck": { fiber: 0, iron: 2.7, calcium: 11, vitC: 0, vitA: 84 },
    "Tempeh": { fiber: 0, iron: 2.7, calcium: 111, vitC: 0, vitA: 0 },
    "Brown Rice": { fiber: 1.8, iron: 0.4, calcium: 3, vitC: 0, vitA: 0 },
    "White Rice": { fiber: 0.4, iron: 0.2, calcium: 10, vitC: 0, vitA: 0 },
    "Quinoa": { fiber: 2.8, iron: 1.5, calcium: 17, vitC: 0, vitA: 1 },
    "Oats": { fiber: 10.6, iron: 4.7, calcium: 54, vitC: 0, vitA: 0 },
    "Whole Wheat Bread": { fiber: 5.8, iron: 3.1, calcium: 80, vitC: 0, vitA: 0 },
    "Sweet Potato": { fiber: 3, iron: 0.6, calcium: 30, vitC: 2.4, vitA: 709 },
    "Potato": { fiber: 2.2, iron: 0.8, calcium: 12, vitC: 19.7, vitA: 0 },
    "Pasta": { fiber: 1.8, iron: 1.3, calcium: 7, vitC: 0, vitA: 0 },
    "Roti": { fiber: 4.8, iron: 2.5, calcium: 18, vitC: 0, vitA: 0 },
    "Avocado": { fiber: 6.7, iron: 0.5, calcium: 12, vitC: 10, vitA: 7 },
    "Almonds": { fiber: 12.5, iron: 3.7, calcium: 269, vitC: 0, vitA: 1 },
    "Peanuts": { fiber: 8.5, iron: 4.6, calcium: 92, vitC: 0, vitA: 0 },
    "Walnuts": { fiber: 6.7, iron: 2.9, calcium: 98, vitC: 0, vitA: 1 },
    "Peanut Butter": { fiber: 6, iron: 1.7, calcium: 43, vitC: 0, vitA: 0 },
    "Olive Oil": { fiber: 0, iron: 0.6, calcium: 1, vitC: 0, vitA: 0 },
    "Broccoli": { fiber: 2.6, iron: 0.7, calcium: 47, vitC: 89.2, vitA: 31 },
    "Spinach": { fiber: 2.2, iron: 2.7, calcium: 99, vitC: 28.1, vitA: 469 },
    "Carrots": { fiber: 2.8, iron: 0.3, calcium: 33, vitC: 5.9, vitA: 835 },
    "Tomatoes": { fiber: 1.2, iron: 0.3, calcium: 10, vitC: 14, vitA: 42 },
    "Cucumber": { fiber: 0.5, iron: 0.3, calcium: 16, vitC: 2.8, vitA: 5 },
    "Bell Pepper": { fiber: 2.1, iron: 0.4, calcium: 10, vitC: 80.4, vitA: 157 },
    "Onion": { fiber: 1.7, iron: 0.2, calcium: 23, vitC: 7.4, vitA: 0 },
    "Cauliflower": { fiber: 2, iron: 0.4, calcium: 22, vitC: 48.2, vitA: 0 },
    "Mushrooms": { fiber: 1, iron: 0.5, calcium: 3, vitC: 0, vitA: 0 },
    "Apple": { fiber: 2.4, iron: 0.1, calcium: 6, vitC: 4.6, vitA: 3 },
    "Banana": { fiber: 2.6, iron: 0.3, calcium: 5, vitC: 8.7, vitA: 3 },
    "Orange": { fiber: 2.4, iron: 0.1, calcium: 40, vitC: 53.2, vitA: 11 },
    "Mango": { fiber: 1.6, iron: 0.2, calcium: 11, vitC: 36.4, vitA: 54 },
    "Strawberries": { fiber: 2, iron: 0.4, calcium: 16, vitC: 58.8, vitA: 1 },
    "Blueberries": { fiber: 2.4, iron: 0.3, calcium: 6, vitC: 9.7, vitA: 3 },
    "Milk (Whole)": { fiber: 0, iron: 0, calcium: 125, vitC: 0, vitA: 46 },
    "Milk (Skim)": { fiber: 0, iron: 0, calcium: 122, vitC: 0, vitA: 61 },
    "Greek Yogurt": { fiber: 0, iron: 0.1, calcium: 110, vitC: 0, vitA: 4 },
    "Cottage Cheese": { fiber: 0, iron: 0.1, calcium: 83, vitC: 0, vitA: 70 },
    "Cheddar Cheese": { fiber: 0, iron: 0.2, calcium: 721, vitC: 0, vitA: 316 },
    "Mozzarella": { fiber: 0, iron: 0.4, calcium: 505, vitC: 0, vitA: 134 },
    "Whey Protein": { fiber: 0, iron: 1.5, calcium: 500, vitC: 0, vitA: 0 },
    "Chia Seeds": { fiber: 34.4, iron: 7.7, calcium: 631, vitC: 0, vitA: 0 },
    "Flax Seeds": { fiber: 27.3, iron: 5.7, calcium: 255, vitC: 0, vitA: 0 },
    "Sunflower Seeds": { fiber: 8.6, iron: 5.3, calcium: 78, vitC: 1.4, vitA: 0 },
    "Green Beans": { fiber: 3.2, iron: 1.1, calcium: 37, vitC: 12.2, vitA: 35 },
    "Cabbage": { fiber: 2.5, iron: 0.5, calcium: 40, vitC: 36.6, vitA: 5 },
    "Lettuce": { fiber: 1.3, iron: 0.9, calcium: 36, vitC: 9.2, vitA: 370 },
    "Zucchini": { fiber: 1, iron: 0.4, calcium: 16, vitC: 17.9, vitA: 10 },
    "Grapes": { fiber: 0.9, iron: 0.4, calcium: 10, vitC: 3.2, vitA: 3 },
    "Watermelon": { fiber: 0.4, iron: 0.2, calcium: 7, vitC: 8.1, vitA: 28 },
    "Papaya": { fiber: 1.7, iron: 0.1, calcium: 20, vitC: 60.9, vitA: 47 },
    "Pineapple": { fiber: 1.4, iron: 0.3, calcium: 13, vitC: 47.8, vitA: 3 },
    "Pomegranate": { fiber: 4, iron: 0.3, calcium: 10, vitC: 10.2, vitA: 0 },
    "Guava": { fiber: 5.4, iron: 0.3, calcium: 18, vitC: 228.3, vitA: 31 },
    "Cashews": { fiber: 3.3, iron: 6.7, calcium: 37, vitC: 0, vitA: 0 },
    "Ghee": { fiber: 0, iron: 0, calcium: 0, vitC: 0, vitA: 306 },
    "Coconut Oil": { fiber: 0, iron: 0, calcium: 1, vitC: 0, vitA: 0 },
    "Basmati Rice": { fiber: 0.4, iron: 0.2, calcium: 10, vitC: 0, vitA: 0 },
    "Cornflakes": { fiber: 2.5, iron: 8, calcium: 2, vitC: 0, vitA: 352 },
    "Muesli": { fiber: 7.5, iron: 3.5, calcium: 90, vitC: 0, vitA: 0 },
    "Butter": { fiber: 0, iron: 0, calcium: 24, vitC: 0, vitA: 684 },
    "Cream": { fiber: 0, iron: 0.1, calcium: 80, vitC: 0, vitA: 260 },
    "Ice Cream": { fiber: 0, iron: 0.1, calcium: 128, vitC: 0, vitA: 118 }
};

var FoodDBLoader = {
    DATA_URL: 'https://caloriecoach-tracker.web.app/food-database.json',
    CACHE_KEY: 'caloriecoach-food-db-cache',
    CACHE_TS_KEY: 'caloriecoach-food-db-ts',
    MAX_AGE: 24 * 60 * 60 * 1000,

    init: function(callback) {
        var cached = this.loadCached();
        if (cached) {
            this.applyData(cached);
            if (callback) callback(null);
            return;
        }
        this.fetchRemote(callback);
    },

    loadCached: function() {
        var raw = localStorage.getItem(this.CACHE_KEY);
        var ts = parseInt(localStorage.getItem(this.CACHE_TS_KEY)) || 0;
        if (raw && (Date.now() - ts) < this.MAX_AGE) {
            try { return JSON.parse(raw); } catch(e) {}
        }
        return null;
    },

    fetchRemote: function(callback) {
        var self = this;
        var xhr = new XMLHttpRequest();
        xhr.open('GET', this.DATA_URL + '?t=' + Date.now(), true);
        xhr.onload = function() {
            if (xhr.status >= 200 && xhr.status < 300) {
                try {
                    var data = JSON.parse(xhr.responseText);
                    self.saveCache(data);
                    self.applyData(data);
                    if (callback) callback(null);
                } catch(e) {
                    if (callback) callback(e);
                }
            } else {
                if (callback) callback(new Error('HTTP ' + xhr.status));
            }
        };
        xhr.onerror = function() {
            if (callback) callback(new Error('Network error'));
        };
        xhr.send();
    },

    saveCache: function(data) {
        try {
            localStorage.setItem(this.CACHE_KEY, JSON.stringify(data));
            localStorage.setItem(this.CACHE_TS_KEY, String(Date.now()));
        } catch(e) {}
    },

    applyData: function(data) {
        if (data.foodDatabaseDetailed) {
            var keys = Object.keys(data.foodDatabaseDetailed);
            for (var i = 0; i < keys.length; i++) {
                foodDatabaseDetailed[keys[i]] = data.foodDatabaseDetailed[keys[i]];
            }
        }
        if (data.foodRecipes) {
            var keys = Object.keys(data.foodRecipes);
            for (var i = 0; i < keys.length; i++) {
                foodRecipes[keys[i]] = data.foodRecipes[keys[i]];
            }
        }
        if (data.foodMicronutrients) {
            var keys = Object.keys(data.foodMicronutrients);
            for (var i = 0; i < keys.length; i++) {
                foodMicronutrients[keys[i]] = data.foodMicronutrients[keys[i]];
            }
        }
        if (data.foodDatabase) {
            var keys = Object.keys(foodDatabase);
            for (var i = 0; i < keys.length; i++) {
                delete foodDatabase[keys[i]];
            }
            var nkeys = Object.keys(data.foodDatabase);
            for (var i = 0; i < nkeys.length; i++) {
                foodDatabase[nkeys[i]] = data.foodDatabase[nkeys[i]];
            }
        }
    }
};

var ApiCache = {
    STORAGE_KEY: 'caloriecoach-api-cache',
    MAX_AGE: 24 * 60 * 60 * 1000,

    get: function(query) {
        var cache = JSON.parse(localStorage.getItem(this.STORAGE_KEY) || '{}');
        var entry = cache[query.toLowerCase()];
        if (entry && (Date.now() - entry.timestamp) < this.MAX_AGE) {
            return entry.data;
        }
        return null;
    },

    set: function(query, data) {
        var cache = JSON.parse(localStorage.getItem(this.STORAGE_KEY) || '{}');
        cache[query.toLowerCase()] = { data: data, timestamp: Date.now() };
        // Keep cache under ~500KB
        var keys = Object.keys(cache);
        if (keys.length > 50) {
            var sorted = keys.sort(function(a, b) {
                return cache[a].timestamp - cache[b].timestamp;
            });
            while (sorted.length > 40) {
                delete cache[sorted.shift()];
            }
        }
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(cache));
    }
};
