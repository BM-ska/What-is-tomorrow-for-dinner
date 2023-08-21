package com.dinner.Whatistomorrowfordinner.service;

import com.dinner.Whatistomorrowfordinner.model.*;

import java.util.List;

public interface NutritionPlanService {
    DayPlans generateNutritionPlan(List<Recipe> recipeBook, NutritionPlanData nutritionPlanData);

    List<Item> createShoppingList(long idPlan, UserEntity userEntity);

    List<DescriptionDay> createDescriptionDayPlan(long idPlan, UserEntity userEntity);

    void addDayPlansToUser(UserEntity userEntity, DayPlans newDayPlans);

    void addDayPlansToUser(UserEntity userEntity, List<DayPlan> dayPlans, long idPlan);

    List<Item> addUpSameIngredients(List<Item> shoppingList);

}
