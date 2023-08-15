package com.dinner.Whatistomorrowfordinner.model;

import org.springframework.data.mongodb.core.mapping.Document;

@Document
public record Ingredient(long idIngredient, String name, long amount, String unit, long kcal) {
}
