package com.dinner.Whatistomorrowfordinner.model;

public record NutritionPlanData(
        String planName,
        long kcal,
        long numberOfDays,
        boolean breakfast,
        boolean lunch,
        boolean dinner,
        boolean snack,
        boolean supper,
        long meal1,
        long meal2,
        long meal3,
        long meal4,
        long meal5) {
}
