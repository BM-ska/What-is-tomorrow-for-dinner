package com.dinner.Whatistomorrowfordinner.service;

import com.dinner.Whatistomorrowfordinner.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

class NutritionPlanServiceImplTest {

    private final NutritionPlanService nutritionPlanService;
    @Mock
    private UserRepository userRepository;

    public NutritionPlanServiceImplTest() {
        MockitoAnnotations.initMocks(this);
        this.nutritionPlanService = new NutritionPlanServiceImpl(userRepository);
    }

    @Test
    void testCreateShoppingList() {

    }
}