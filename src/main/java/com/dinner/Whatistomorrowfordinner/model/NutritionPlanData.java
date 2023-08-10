package com.dinner.Whatistomorrowfordinner.model;

public record NutritionPlanData(
        String planName,
        int kcal,
        int numberOfDays,
        boolean breakfast,
        boolean lunch,
        boolean dinner,
        boolean snack,
        boolean supper,
        int meal1,
        int meal2,
        int meal3,
        int meal4,
        int meal5) {
}
