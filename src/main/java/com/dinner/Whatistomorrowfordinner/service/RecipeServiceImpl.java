package com.dinner.Whatistomorrowfordinner.service;

import com.dinner.Whatistomorrowfordinner.model.Ingredient;
import com.dinner.Whatistomorrowfordinner.model.Recipe;
import org.springframework.stereotype.Component;

import java.util.List;

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
        if (gramTotal == 0)
            return 0;

        return kcalTotal * 100 / gramTotal;
    }

    private String normalizeName(String name) {
        return name.toLowerCase().trim();
    }

    @Override
    public List<Ingredient> normalizeIngredientsNames(List<Ingredient> ingredients) {
        return ingredients.stream().map(ingredient -> new Ingredient(
                ingredient.idIngredient(),
                normalizeName(ingredient.name()),
                ingredient.amount(),
                ingredient.unit(),
                ingredient.kcal()
        )).toList();
    }
}
