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
@CrossOrigin(origins = "http://34.116.180.131:3000", allowedHeaders = "*")
public class NutritionPlanController {
    private final UserRepository userRepository;
    private final NutritionPlanService nutritionPlanService;

    @Autowired
    public NutritionPlanController(UserRepository userRepository, NutritionPlanService nutritionPlanService) {
        this.userRepository = userRepository;
        this.nutritionPlanService = nutritionPlanService;
    }

    @RequestMapping(value = "/nutrition-plan/create", method = RequestMethod.PUT, consumes = "application/json")
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
//todo w przyszłości kiedy będzie można edytować preliminary plan
        //nutritionPlanService.addDayPlansToUser(userEntity, dayPlans, idPlan);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/your-plans")
    public ResponseEntity<List<NutritionPlan>> getAllYourPlans(@AuthenticationPrincipal UserEntity userEntity) {

        List<DayPlans> plans = userRepository.findByUsername(userEntity.getUsername()).getUser().plansList();

        List<NutritionPlan> nutritionPlans =
                plans.stream()
                        .map(plan ->
                                new NutritionPlan(plan.idDayPlans(), plan.planName(), plan.dayPlanList().size()))
                        .toList();

        return new ResponseEntity<>(nutritionPlans, HttpStatus.OK);
    }

    @GetMapping("/your-plans/{idPlan}/shopping-list")
    public ResponseEntity<List<Item>> getShoppingList(@PathVariable long idPlan,
                                                      @AuthenticationPrincipal UserEntity userEntity) {

        List<Item> itemList = nutritionPlanService.createShoppingList(idPlan, userEntity);
        return new ResponseEntity<>(itemList, HttpStatus.OK);
    }

    @GetMapping("/your-plans/{idPlan}/description-meal-plan")
    public ResponseEntity<List<DescriptionDay>> getDescriptionMealPlan(@PathVariable long idPlan,
                                                                       @AuthenticationPrincipal UserEntity userEntity) {

        List<DescriptionDay> descriptionDays = nutritionPlanService.createDescriptionDayPlan(idPlan, userEntity);

        return new ResponseEntity<>(descriptionDays, HttpStatus.OK);
    }

}