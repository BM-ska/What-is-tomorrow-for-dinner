package com.dinner.Whatistomorrowfordinner.service;

import com.dinner.Whatistomorrowfordinner.model.Recipe;

public interface RecipeService {
    long countCaloriesPer100g(Recipe updatedRecipe);
}
