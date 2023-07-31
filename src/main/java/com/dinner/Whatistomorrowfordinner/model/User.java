package com.dinner.Whatistomorrowfordinner.model;

import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "users")
public record User(String username, String password, List<Recipe> recipeBook){
}
