package com.dinner.Whatistomorrowfordinner.model;

import java.util.List;

public record NutritionPlanData(
        String planName,
        List<List<Object>> kcal,
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
