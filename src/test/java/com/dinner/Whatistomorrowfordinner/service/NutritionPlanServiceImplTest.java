package com.dinner.Whatistomorrowfordinner.service;

import com.dinner.Whatistomorrowfordinner.model.DayPlans;
import com.dinner.Whatistomorrowfordinner.model.NutritionPlanData;
import com.dinner.Whatistomorrowfordinner.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;

class NutritionPlanServiceImplTest {

    private final NutritionPlanService nutritionPlanService;
    private final UserService userService;
    @Mock
    private UserRepository userRepository;

    public NutritionPlanServiceImplTest() {
        this.userService = new UserServiceImpl(userRepository);
        this.nutritionPlanService = new NutritionPlanServiceImpl(userRepository);
        MockitoAnnotations.initMocks(this);
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


        DayPlans dayPlanList = nutritionPlanService.generateNutritionPlan(List.of(), nutritionPlanData);

        assertEquals(5, dayPlanList.dayPlanList().size());
        assertEquals(4, dayPlanList.dayPlanList().get(0).meal().size());
        assertEquals(1, dayPlanList.dayPlanList().get(0).meal().get(0).occupant().get(0).ration().size());
    }

    @Test
    void testCreateShoppingList() {

    }
}