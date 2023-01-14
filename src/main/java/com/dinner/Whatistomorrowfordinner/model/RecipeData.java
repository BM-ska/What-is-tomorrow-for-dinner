package com.dinner.Whatistomorrowfordinner.model;

import java.util.List;

public class RecipeData {

    private final String id;
    private final String name;
    private final int fresh;
    private final String category;
    private final List<Ingredient> ingredient;

    public RecipeData(String id, String name, int fresh, String category, List<Ingredient> ingredient) {
        this.id = id;
        this.name = name;
        this.fresh = fresh;
        this.category = category;
        this.ingredient = ingredient;
    }

    public String getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public int getFresh() {
        return fresh;
    }

    public String getCategory() {
        return category;
    }

    public List<Ingredient> getIngredient() {
        return ingredient;
    }

    @Override
    public String toString() {
        return "RecipeData{" +
                "id='" + id + '\'' +
                ", name='" + name + '\'' +
                ", fresh=" + fresh +
                ", category='" + category + '\'' +
                ", ingredient=" + ingredient +
                '}';
    }
}
