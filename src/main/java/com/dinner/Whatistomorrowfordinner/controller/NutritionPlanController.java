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
import java.util.Optional;

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

        DayPlans dayPlans = nutritionPlanService
                .generateNutritionPlan(userEntity.getUser().recipeBook(), nutritionPlanData);

        nutritionPlanService.addDayPlansToUser(userEntity, dayPlans);
        long planId = dayPlans.idDayPlans();

        return new ResponseEntity<>(planId, HttpStatus.OK);
    }


    @GetMapping("/nutrition-plan/preliminary/{idPlan}")
    public ResponseEntity<List<DayPlan>> getNutritionPlan(@PathVariable long idPlan,
                                                          @AuthenticationPrincipal UserEntity userEntity) {

        List<DayPlans> dayPlans = userRepository.findByUsername(userEntity.getUsername()).getUser().plansList();

        Optional<DayPlans> matchingDayPlan = dayPlans.stream()
                .filter(plans -> plans.idDayPlans() == idPlan)
                .findFirst();

        return matchingDayPlan
                .map(plans -> new ResponseEntity<>(plans.dayPlanList(), HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
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