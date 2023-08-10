package com.dinner.Whatistomorrowfordinner.controller;

import com.dinner.Whatistomorrowfordinner.model.*;
import com.dinner.Whatistomorrowfordinner.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/")
@CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*")
public class NutritionPlanController {
    private final UserRepository userRepository;
    @Autowired
    public NutritionPlanController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @PutMapping("/nutrition-plan/create")
    public ResponseEntity<?> createNutritionPlan(@RequestBody NutritionPlanData nutritionPlanData){

        //todo save to db
        //todo create new plan and return this plan id

        return ResponseEntity.ok().build();
    }


    @GetMapping("/nutrition-plan/preliminary")
    public ResponseEntity<List<DayPlan>> getNutritionPlan() {
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


    @PutMapping("/nutrition-plan/preliminary/save")
    public ResponseEntity<?> saveFinishedNutritionPlan(@RequestBody List<DayPlan> dayPlans){

        //zmień request body i id w endpoincie
        //put finished nutrition plan to db
        //todo save to db using id

        return ResponseEntity.ok().build();
    }


}
