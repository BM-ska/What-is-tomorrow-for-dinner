package com.dinner.Whatistomorrowfordinner.service;

import com.dinner.Whatistomorrowfordinner.model.DayPlan;
import com.dinner.Whatistomorrowfordinner.model.Item;
import com.dinner.Whatistomorrowfordinner.model.NutritionPlanData;
import com.dinner.Whatistomorrowfordinner.model.UserEntity;

import java.util.List;

public interface NutritionPlanService {
    List<DayPlan> generateNutritionPlan(UserEntity userEntity, NutritionPlanData nutritionPlanData);

    List<Item> createShoppingList(List<DayPlan> dayPlans);

}
