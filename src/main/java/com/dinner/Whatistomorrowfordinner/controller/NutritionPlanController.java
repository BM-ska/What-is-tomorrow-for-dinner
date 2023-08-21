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

        //List<DescriptionDay> descriptionDays = nutritionPlanService.createDescriptionDayPlan(idPlan, userEntity);

        Recipe recipe = new Recipe(1, "naleśniki", 100, "", 123, List.of(
                new Ingredient(1, "a", 1, "g", 1234),
                new Ingredient(2, "a", 54, "g", 4321),
                new Ingredient(3, "a", 223, "g", 3),
                new Ingredient(4, "a", 71, "g", 88)
        ));
        Recipe recipe2 = new Recipe(2, "jajecznica", 100, "", 123, List.of(
                new Ingredient(1, "a", 1, "g", 1234),
                new Ingredient(2, "a", 54, "g", 4321),
                new Ingredient(3, "a", 223, "g", 3),
                new Ingredient(4, "a", 71, "g", 88)
        ));

        List<Item> items = List.of(
                new Item(1, "mleko", 100, "g", false),
                new Item(2, "majonez", 100, "g", false),
                new Item(3, "mleko", 212, "kg", false),
                new Item(4, "mleko", 111, "g", false),
                new Item(5, "majonez", 1, "g", false));


        List<DescriptionDay> descriptionDaysTMP = List.of(
                new DescriptionDay(
                        1,
                        List.of(
                                new DescriptionMeal(
                                        1,
                                        recipe,
                                        2,
                                        items),
                                new DescriptionMeal(
                                        2,
                                        recipe2,
                                        1,
                                        items
                                ))));
        return new ResponseEntity<>(descriptionDaysTMP, HttpStatus.OK);
    }

}







/* todo
17.sierpnia zzzacznij głownie pisemna

dodaj wiecej uzytkowników do nutriplan / tmp zmien formulaż kcal
plansze (ten drugi przycisk) algorytm sumujący zeby było naj mniej gotowania
algorytm uwgledniający świeżość (do generowania planu)
https://fdc.nal.usda.gov/api-guide.html autouzupkcal
responsywność
możliwość zmian pojedyńczych elementów wygenerowanego już planu
procentowy podział posiłku nie tylko w g

rejestracja
dodaj przepisy do ksiażki kucharskiej
zrób testy
srodek -> dodaj liste zakupów pokazową
zmiana headera w zależności od zalogowania
profil też pobierający dan z bazy
prezentacja
gcp??


upełnienie danymi
 */