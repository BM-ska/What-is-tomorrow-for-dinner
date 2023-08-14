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

    private List<Ration> calculateRations(long userKcal, List<Pair<String, Long>> selectCategories,
                                          Recipe recipe) {
        List<Ration> rations = new ArrayList<>();

        //todo zakładam że istnieje tylko amount === gram, todo zmień

        /*userKcal to są kcal na cały dzień
         * trza zrobić dla każdego posiłku proporcje ile ma kcal z selectCategories - ile cały posiłek powinien mieć kcal
         * trza przeliczyć ile dany recipe ma gram??? - ile posiłek ma gram i kcal
         * zsumować i mamy info dla posiłku kcal/ilość gram
         *
         *
         * */


        //todo tymczasowe id
        Random random = new Random();

        //todo narazie zakładam że jeden posiłek ma zawsze jeden typ racji
        rations.add(new Ration(
                random.nextInt(1000000),
                recipe.name(),
                100000,
                "g"));


        return rations;
    }

    private List<Occupant> calculatePortions(NutritionPlanData nutritionPlanData, Recipe recipe) {
        //todo zmień aby w nutritionPlanData była lista Occupant zawierająca name i kcal

        //todo tymczasowe id
        Random random = new Random();

        return List.of(new Occupant(
                random.nextInt(1000000),
                "Jan",
                calculateRations(nutritionPlanData.kcal(), selectCategories(nutritionPlanData), recipe)
        ));
    }

    private DayPlan createDayPlan(long dayNumber, List<Recipe> recipeBook, NutritionPlanData nutritionPlanData,
                                  List<Pair<String, Long>> categories) {

        List<Recipe> selectedRecipes = selectRecipes(recipeBook, categories);

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
                                        calculatePortions(nutritionPlanData, recipe))
                        ).toList());
    }

    @Override
    public DayPlans generateNutritionPlan(List<Recipe> recipeBook, NutritionPlanData nutritionPlanData) {

        List<Pair<String, Long>> categories = selectCategories(nutritionPlanData);

        //todo w przyszłości mądrzejsze generowanie, uwzględniający "świażość"
        //todo zmien id
        Random random = new Random();
        DayPlans dayPlans = new DayPlans(random.nextInt(100000),
                IntStream.range(0, (int) nutritionPlanData.numberOfDays())
                        .mapToObj(dayNumber -> createDayPlan(dayNumber + 1, recipeBook, nutritionPlanData, categories))
                        .toList());
        return dayPlans;
    }


    private List<Item> addUpSameIngredients(List<Item> shoppingList) {
        return null;
    }

    @Override
    public List<Item> createShoppingList(DayPlans dayPlans) {
//todo zle, chcemy tylko aby z dayPlans brać jaki był przepis, i wypisać ingridients a nie ration
//todo racja to suma gram ingridients przepisu
        //wiec z dayPlan wciągam przepis i potrzeba jeszcze nutrionPlanData,
        // stąd wyciągamy ile kalori będzie miał dany recipe dla każdego z occupants
        //i z tych kalorii przeliczamy dla każdego z dayPlans->occupant ingridient i to wrzucamy do items
        //a tam kompresujemy te dane

        //to zle jest


        return addUpSameIngredients(null);
    }

    @Override
    public void addDayPlansToUser(UserEntity userEntity, DayPlans newDayPlans) {
        userRepository.deleteByUsername(userEntity.getUsername());

        List<DayPlans> dayPlans = userEntity.getUser().plansList();
        dayPlans.add(newDayPlans);

        UserEntity newUserEntity = new UserEntity(
                userEntity.getUsername(),
                userEntity.getPassword(),
                new UserInfo(
                        userEntity.getUser().recipeBook(), dayPlans
                ));

        userRepository.save(newUserEntity);
    }

}



