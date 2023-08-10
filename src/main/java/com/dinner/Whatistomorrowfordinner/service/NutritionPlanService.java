package com.dinner.Whatistomorrowfordinner.service;

import com.dinner.Whatistomorrowfordinner.model.DayPlan;
import com.dinner.Whatistomorrowfordinner.model.NutritionPlanData;

public interface NutritionPlanService {

    DayPlan generateNutritionPlan(NutritionPlanData nutritionPlanData);
}
