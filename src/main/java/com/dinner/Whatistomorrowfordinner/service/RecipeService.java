package com.dinner.Whatistomorrowfordinner.service;

import com.dinner.Whatistomorrowfordinner.model.Ingredient;
import com.dinner.Whatistomorrowfordinner.model.Recipe;

import java.util.List;

public interface RecipeService {
    long countCaloriesPer100g(Recipe updatedRecipe);

    List<Ingredient> normalizeIngredientsNames(List<Ingredient> ingredients);
}
