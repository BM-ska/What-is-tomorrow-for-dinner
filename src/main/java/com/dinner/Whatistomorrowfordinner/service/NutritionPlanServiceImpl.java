package com.dinner.Whatistomorrowfordinner.service;

import com.dinner.Whatistomorrowfordinner.model.*;
import com.dinner.Whatistomorrowfordinner.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.util.Pair;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import java.util.stream.IntStream;

@Component
public class NutritionPlanServiceImpl implements NutritionPlanService {
    String userameTMP = "jan";
    private final UserRepository userRepository;

    @Autowired
    public NutritionPlanServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }


    private Recipe selectRecipe(List<Recipe> oneCategoryRecipeBook) {
        if (oneCategoryRecipeBook.isEmpty()) {
            return new Recipe(0, "", 0, "", 0, List.of());
        }

        Random random = new Random();
        int randomIndex = random.nextInt(oneCategoryRecipeBook.size());

        return oneCategoryRecipeBook.get(randomIndex);
    }

    private List<Recipe> selectAllRecipesOneCategory(List<Recipe> recipeBook, String categoryName) {
        List<Recipe> recipes = new ArrayList<>();

        recipeBook.forEach(recipe -> {
            if (recipe.category().equals(categoryName)) {
                recipes.add(recipe);
            }
        });

        return recipes;
    }

    private List<Recipe> selectRecipes(List<Recipe> recipeBook, List<Pair<String, Long>> categories) {
        return categories.stream().map(category ->
                        selectRecipe(
                                selectAllRecipesOneCategory(recipeBook, category.getFirst())))
                .toList();
    }

    private List<Pair<String, Long>> selectCategories(NutritionPlanData nutritionPlanData) {

        List<Pair<String, Long>> categories = new ArrayList<>();
        if (nutritionPlanData.breakfast())
            categories.add(Pair.of("breakfast", nutritionPlanData.meal1()));
        if (nutritionPlanData.lunch())
            categories.add(Pair.of("lunch", nutritionPlanData.meal2()));
        if (nutritionPlanData.dinner())
            categories.add(Pair.of("dinner", nutritionPlanData.meal3()));
        if (nutritionPlanData.snack())
            categories.add(Pair.of("snack", nutritionPlanData.meal4()));
        if (nutritionPlanData.supper())
            categories.add(Pair.of("supper", nutritionPlanData.meal5()));

        return categories;
    }

    private List<Ration> calculateRations(long userKcal, List<Pair<String, Long>> selectCategories, List<Recipe> selectedRecipes) {
        List<Ration> rations = new ArrayList<>();

        //todo zakładam że istnieje tylko amount === gram, todo zmień

        /*userKcal to są kcal na cały dzień
        * trza zrobić dla każdego posiłku proporcje ile ma kcal z selectCategories - ile cały posiłek powinien mieć kcal
        * trza przeliczyć ile dany recipe ma gram??? - ile posiłek ma gram i kcal
        * zsumować i mamy info dla posiłku kcal/ilość gram
        *
        *
        * */

        long recipeKcal;

        //todo tymczasowe id
        Random random = new Random();
        selectedRecipes.forEach(recipe -> {


            rations.add(new Ration(
                    random.nextInt(1000000),
                    recipe.name(),
                    0,
                    ""));
        });

        return rations;
    }

    private List<Occupant> calculatePortions(NutritionPlanData nutritionPlanData, List<Recipe> selectedRecipes) {
        //todo zmień aby w nutritionPlanData była lista Occupant zawierająca name i kcal

        //todo tymczasowe id
        Random random = new Random();

        return List.of(new Occupant(
                random.nextInt(1000000),
                "Jan",
                calculateRations(nutritionPlanData.kcal(), selectCategories(nutritionPlanData), selectedRecipes)
        ));
    }

    private DayPlan createDayPlan(long dayNumber, List<Recipe> recipeBook, NutritionPlanData nutritionPlanData, List<Pair<String, Long>> categories) {

        List<Recipe> selectedRecipes = selectRecipes(recipeBook, categories);
        List<Occupant> occupants = calculatePortions(nutritionPlanData, selectedRecipes);


        //todo tymczasowe id
        Random random = new Random();
        int randomIndex = random.nextInt(1000000);

        return new DayPlan(
                randomIndex,
                dayNumber,
                selectedRecipes.stream()
                        .map(recipe ->
                                new Meal(
                                        random.nextInt(1000000),
                                        recipe.category(),
                                        recipe.name(),
                                        occupants)
                        ).toList());
    }

    @Override
    public List<DayPlan> generateNutritionPlan(NutritionPlanData nutritionPlanData) {

        User user = userRepository.findByUsername(userameTMP);
        List<Recipe> recipeBook = user.recipeBook();
        List<Pair<String, Long>> categories = selectCategories(nutritionPlanData);

        //todo w przyszłości mądrzejsze generowanie, uwzględniający "świażość"
        return IntStream.range(0, (int)nutritionPlanData.numberOfDays())
                .mapToObj(dayNumber -> createDayPlan(dayNumber, recipeBook, nutritionPlanData, categories))
                .toList();
    }





    private List<Item> addUpSameIngredients(List<Item> shoppingList) {
        return null;
    }

    @Override
    public List<Item> createShoppingList(List<DayPlan> dayPlans) {
//todo zle, chcemy tylko aby z dayPlans brać jaki był przepis, i wypisać ingridients a nie ration
//todo racja to suma gram ingridients przepisu
        //wiec z dayPlan wciągam przepis i potrzeba jeszcze nutrionPlanData,
        // stąd wyciągamy ile kalori będzie miał dany recipe dla każdego z occupants
        //i z tych kalorii przeliczamy dla każdego z dayPlans->occupant ingridient i to wrzucamy do items
        //a tam kompresujemy te dane

        //to zle jest
        List<Item> shoppingList =
                dayPlans.stream()
                        .flatMap(dayPlan -> dayPlan.meal().stream()
                                .flatMap(meal -> meal.occupant().stream()
                                        .flatMap(occupant -> occupant.ration().stream()
                                                .map(ration -> new Item(
                                                        0,
                                                        ration.name(),
                                                        ration.amount(),
                                                        ration.unit(),
                                                        false
                                                ))
                                        )
                                )
                        ).toList();


        return addUpSameIngredients(shoppingList);
    }
}


