package com.dinner.Whatistomorrowfordinner.service;

import com.dinner.Whatistomorrowfordinner.model.Ingredient;
import com.dinner.Whatistomorrowfordinner.model.Recipe;
import org.junit.jupiter.api.Test;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;

class RecipeServiceImplTest {

    private final RecipeService recipeService;

    public RecipeServiceImplTest() {
        this.recipeService = new RecipeServiceImpl();
    }

    @Test
    void countKcalPer100g() {

        Recipe recipe = new Recipe(1, "a", 100, "", 123, List.of(
                new Ingredient(1, "a", 1, "g", 1234),
                new Ingredient(2, "a", 54, "g", 4321),
                new Ingredient(3, "a", 223, "g", 3),
                new Ingredient(4, "a", 71, "g", 88)
        ));

        assertEquals(1617, recipeService.countCaloriesPer100g(recipe));
    }

}