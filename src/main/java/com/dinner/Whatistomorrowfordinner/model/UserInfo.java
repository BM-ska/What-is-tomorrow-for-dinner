package com.dinner.Whatistomorrowfordinner.model;

import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document
public record UserInfo(
        List<Recipe> recipeBook,
        List<DayPlans> plansList) {
}
