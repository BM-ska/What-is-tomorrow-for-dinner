package com.dinner.Whatistomorrowfordinner.service;

import com.dinner.Whatistomorrowfordinner.model.Recipe;
import org.springframework.stereotype.Component;

@Component
public class RecipeServiceImpl implements RecipeService {
    @Override
    public long countCaloriesPer100g(Recipe updatedRecipe) {

        long kcalTotal = updatedRecipe.ingredient().stream()
                .mapToLong(i -> i.kcal())
                .sum();
        long gramTotal = updatedRecipe.ingredient().stream()
                .mapToLong(i -> i.amount())
                .sum();
        long result = kcalTotal * 100 / gramTotal;

        return result;
    }
}
