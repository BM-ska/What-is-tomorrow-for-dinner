package com.dinner.Whatistomorrowfordinner.service;

import com.dinner.Whatistomorrowfordinner.model.DayPlan;
import com.dinner.Whatistomorrowfordinner.model.NutritionPlanData;
import com.dinner.Whatistomorrowfordinner.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;

class NutritionPlanServiceImplTest {

    private final NutritionPlanService nutritionPlanService;
    @Mock
    private UserRepository userRepository;

    public NutritionPlanServiceImplTest() {
        MockitoAnnotations.initMocks(this);
        this.nutritionPlanService = new NutritionPlanServiceImpl(userRepository);
    }

    @Test
    void generatePlan() {
        NutritionPlanData nutritionPlanData = new NutritionPlanData(
                "plan1",
                1000,
                5,
                false,
                true,
                true,
                true,
                true,
                25,
                10,
                30,
                15,
                20);

        List<DayPlan> dayPlanList = nutritionPlanService.generateNutritionPlan(nutritionPlanData);

        assertEquals(5, dayPlanList.size());
        assertEquals(4, dayPlanList.get(0).meal().size());
        assertEquals(1, dayPlanList.get(0).meal().get(0).occupant().get(0).ration().size());
    }

    @Test
    void testCreateShoppingList() {

    }
}