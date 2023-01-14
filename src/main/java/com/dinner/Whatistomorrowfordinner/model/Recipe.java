package com.dinner.Whatistomorrowfordinner.model;

import java.util.List;

public class Recipe {
    private final String id;
    private final String name;
    private final int calories;
    private final List<Ingredient> ingredient;

    public Recipe(String id, String name, int calories, List<Ingredient> ingredient) {
        this.id = id;
        this.name = name;
        this.calories = calories;
        this.ingredient = ingredient;
    }

    public String getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public Integer getCalories() {
        return calories;
    }

    public List<Ingredient> getIngredient() {
        return ingredient;
    }

    @Override
    public String toString() {
        return "Recipe{" +
                "id='" + id + '\'' +
                ", name='" + name + '\'' +
                ", calories=" + calories +
                ", ingredient=" + ingredient +
                '}';
    }
}
