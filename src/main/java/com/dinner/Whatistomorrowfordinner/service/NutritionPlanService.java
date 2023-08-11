package com.dinner.Whatistomorrowfordinner.service;

import com.dinner.Whatistomorrowfordinner.model.DayPlan;
import com.dinner.Whatistomorrowfordinner.model.Item;
import com.dinner.Whatistomorrowfordinner.model.NutritionPlanData;

import java.util.List;

public interface NutritionPlanService {
    List<DayPlan> generateNutritionPlan(NutritionPlanData nutritionPlanData);

    List<Item> createShoppingList(List<DayPlan> dayPlans);

}
