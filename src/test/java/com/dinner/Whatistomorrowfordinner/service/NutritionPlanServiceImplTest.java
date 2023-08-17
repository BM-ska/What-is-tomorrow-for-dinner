package com.dinner.Whatistomorrowfordinner.service;

import com.dinner.Whatistomorrowfordinner.model.*;
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
                List.of(List.of("jan", 1000l)),
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
    void addUpSameIngredients() {
        List<Item> items = List.of(
                new Item(1, "mleko", 100, "g", false),
                new Item(1, "majonez", 100, "g", false),
                new Item(1, "mleko", 212, "kg", false),
                new Item(1, "mleko", 111, "g", false),
                new Item(1, "majonez", 1, "g", false)
        );

        List<Item> expectedResult = List.of(
                new Item(1, "mleko", 211, "g", false),
                new Item(1, "majonez", 101, "g", false),
                new Item(1, "mleko", 212, "kg", false)

        );

        assertEquals(expectedResult, nutritionPlanService.addUpSameIngredients(items));
    }

//    @Test
//    void createShoppingListTest() {
//
//        UserEntity userEntity = new UserEntity("", "", new UserInfo(
//                List.of(),
//                List.of(new DayPlans(
//                        1,
//                        "",
//                        List.of(
//                                new DayPlan(
//                                        1,
//                                        1,
//                                        List.of(
//                                                new Meal(1, "", "nalesniki",
//                                                        new Recipe(1,
//                                                                "nalesniki",
//                                                                1,
//                                                                "",
//                                                                145,
//                                                                List.of(
//                                                                        new Ingredient(1,
//                                                                                "mąka",
//                                                                                123,
//                                                                                "g",
//                                                                                123),
//                                                                        new Ingredient(2,
//                                                                                "mleko",
//                                                                                123,
//                                                                                "g",
//                                                                                123),
//                                                                        new Ingredient(3,
//                                                                                "cukier",
//                                                                                123,
//                                                                                "g",
//                                                                                123),
//                                                                ))
//                                                        List.of())
//                                        )),
//                                new DayPlan(
//                                        2,
//                                        2,
//                                        List.of()
//                                ))))
//        ));
//        long idPlan = 1;
//
//
//        List<Item> result = List.of();
//
//        List<Item> items = nutritionPlanService.createShoppingList(idPlan, userEntity);
//
//        assertEquals(result, items);
//    }


}
