package com.dinner.Whatistomorrowfordinner.model;

import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "ingredient")
public record Ingredient(String id, String name, String amount, String unit, int kcal) {
}
