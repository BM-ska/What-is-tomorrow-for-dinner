package com.dinner.Whatistomorrowfordinner.model;

import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document
public record Recipe(long idRecipe, String name, long fresh, String category, long calories, List<Ingredient> ingredient){
}
