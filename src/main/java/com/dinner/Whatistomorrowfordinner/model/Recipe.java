package com.dinner.Whatistomorrowfordinner.model;

import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;


@Document(collection = "recipe")
public record Recipe(String id, String name, int fresh, String category, int calories, List<Ingredient> ingredients) {

    @Override
    public String toString() {
        return "RecipeData{" +
                "id='" + id + '\'' +
                ", name='" + name + '\'' +
                ", fresh=" + fresh +
                ", category='" + category + '\'' +
                ", ingredient=" + ingredients +
                '}';
    }
}
