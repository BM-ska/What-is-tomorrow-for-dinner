package com.dinner.Whatistomorrowfordinner.controller;

import com.dinner.Whatistomorrowfordinner.model.*;
import com.dinner.Whatistomorrowfordinner.repository.UserRepository;
import com.dinner.Whatistomorrowfordinner.service.NutritionPlanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/")
@CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*")
public class NutritionPlanController {
    private final UserRepository userRepository;
    private final NutritionPlanService nutritionPlanService;

    @Autowired
    public NutritionPlanController(UserRepository userRepository, NutritionPlanService nutritionPlanService) {
        this.userRepository = userRepository;
        this.nutritionPlanService = nutritionPlanService;
    }

    @PutMapping("/nutrition-plan/create")
    public ResponseEntity<Long> createNutritionPlan(@RequestBody NutritionPlanData nutritionPlanData,
                                                    @AuthenticationPrincipal UserEntity userEntity) {

        List<DayPlan> dayPlans = nutritionPlanService.generateNutritionPlan(nutritionPlanData);

        //todo save to db
        //long planId = saveToDB(dayPlans);

        //todo return this plan id
        //return new ResponseEntity<>(planId, HttpStatus.OK);

        long planIdTMP = 1;
        return new ResponseEntity<>(planIdTMP, HttpStatus.OK);
    }


    @GetMapping("/nutrition-plan/preliminary/{idPlan}")
    public ResponseEntity<List<DayPlan>> getNutritionPlan(@PathVariable long idPlan,
                                                          @AuthenticationPrincipal UserEntity userEntity) {

        List<DayPlan> dayPlansTMP = List.of(new DayPlan(
                        1,
                        1,
                        List.of(
                                new Meal(
                                        3,
                                        "lunch",
                                        "kotlety mielone",
                                        List.of(new Occupant(
                                                5,
                                                "Monika",
                                                List.of(
                                                        new Ration(6, "kotlet", 300, "g"))
                                        ))

                                ),
                                new Meal(
                                        4,
                                        "dinner",
                                        "rosol",
                                        List.of(new Occupant(
                                                5,
                                                "Monika",
                                                List.of(
                                                        new Ration(6, "makaron", 300, "g"))
                                        ))

                                ))),
                new DayPlan(
                        2,
                        2,
                        List.of(
                                new Meal(
                                        3,
                                        "lunch",
                                        "kotlety mielone",
                                        List.of(new Occupant(
                                                5,
                                                "Monika",
                                                List.of(
                                                        new Ration(6, "kotlet", 300, "g"))
                                        ))

                                ),
                                new Meal(
                                        4,
                                        "dinner",
                                        "rosol",
                                        List.of(new Occupant(
                                                5,
                                                "Monika",
                                                List.of(
                                                        new Ration(6, "makaron", 300, "g"))
                                        ))

                                ))));
        //todo return from db plans using id from params (edit endpoint)

        return new ResponseEntity<>(dayPlansTMP, HttpStatus.OK);
    }


    @PutMapping("/nutrition-plan/preliminary/{idPlan}/save")
    public ResponseEntity<?> saveFinishedNutritionPlan(@PathVariable long idPlan, @RequestBody List<DayPlan> dayPlans,
                                                       @AuthenticationPrincipal UserEntity userEntity) {

        //put finished nutrition plan to db
        //todo save to db using id

        return ResponseEntity.ok().build();
    }


    @GetMapping("/your-plans")
    public ResponseEntity<List<NutritionPlan>> getAllYourPlans(@AuthenticationPrincipal UserEntity userEntity) {

        List<NutritionPlan> nutritionPlansTMP = List.of(
                new NutritionPlan(1,
                        "plan na ten tydzien",
                        1),
                new NutritionPlan(
                        2,
                        "plan dla Jacka",
                        2
                ));
        //todo get from db all user plans

        return new ResponseEntity<>(nutritionPlansTMP, HttpStatus.OK);
    }

    @GetMapping("/your-plans/{idPlan}/shopping-list")
    public ResponseEntity<List<Item>> getShoppingList(@PathVariable long idPlan,
                                                      @AuthenticationPrincipal UserEntity userEntity) {

        List<Item> itemLisTMP = List.of(new Item(1,
                        "jajo",
                        4,
                        "sztuki",
                        false),
                new Item(2,
                        "mąka",
                        300,
                        "g",
                        false)
        );

        //todo get from db plan using idPlan and use service to compress info
        // List<DayPlan> dayPlans = z bazy
        //List<Item> itemList = nutritionPlanService.createShoppingList(dayPlans);

        return new ResponseEntity<>(itemLisTMP, HttpStatus.OK);
    }
}