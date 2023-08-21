package com.dinner.Whatistomorrowfordinner.service;

import com.dinner.Whatistomorrowfordinner.model.*;
import com.dinner.Whatistomorrowfordinner.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.util.Pair;
import org.springframework.stereotype.Component;

import java.util.*;
import java.util.stream.IntStream;

@Component
public class NutritionPlanServiceImpl implements NutritionPlanService {
    private final UserRepository userRepository;

    @Autowired
    public NutritionPlanServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }


    private Recipe selectRecipe(List<Recipe> oneCategoryRecipeBook, List<Recipe> selectedRecipes) {
        if (oneCategoryRecipeBook.isEmpty()) {
            return new Recipe(0, "", 0, "", 0, List.of());
        }
        if (oneCategoryRecipeBook.size() <= 2) {
            Random random = new Random();
            int randomIndex = random.nextInt(oneCategoryRecipeBook.size());
            return oneCategoryRecipeBook.get(randomIndex);
        }

        List<Recipe> availableRecipes = new ArrayList<>(oneCategoryRecipeBook);
        availableRecipes.removeAll(selectedRecipes);

        if (availableRecipes.isEmpty()) {
            return new Recipe(0, "", 0, "", 0, List.of());
        }

        Random random = new Random();
        int randomIndex = random.nextInt(availableRecipes.size());

        return availableRecipes.get(randomIndex);
    }

    private List<Recipe> selectAllRecipesOneCategory(List<Recipe> recipeBook,
                                                     String categoryName) {
        List<Recipe> recipes = new ArrayList<>();

        recipeBook.forEach(recipe -> {
            if ((categoryName.equals("breakfast") || categoryName.equals("supper"))
                    && recipe.category().equals("small meal")) {
                recipes.add(recipe);
            } else if (categoryName.equals("dinner")
                    && recipe.category().equals("main meal")) {
                recipes.add(recipe);
            } else if (categoryName.equals("snack")
                    && recipe.category().equals("snack")) {
                recipes.add(recipe);
            } else if (categoryName.equals("lunch")
                    && (recipe.category().equals("small meal") || recipe.category().equals("snack"))) {
                recipes.add(recipe);
            }
        });

        return recipes;
    }

    private List<Recipe> selectRecipes(List<Recipe> recipeBook, List<Pair<String, Long>> categories) {

        List<Recipe> selectedRecipes = new ArrayList<>();

        categories.forEach(category -> {
            selectedRecipes.add(
                    selectRecipe(selectAllRecipesOneCategory(recipeBook, category.getFirst()), selectedRecipes));
        });

        return selectedRecipes;
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

    private List<Ration> calculateRations(long userKcal, Pair<String, Long> category, Recipe recipe) {
        //todo tymczasowe id
        Random random = new Random();

        if (recipe.calories() == 0) {
            return List.of(new Ration(
                    random.nextInt(1000000),
                    "",
                    0,
                    "g"));
        }

        List<Ration> rations = new ArrayList<>();

        //todo zakładam że istnieje tylko amount === gram, todo zmień

        long rationKcal = userKcal * category.getSecond() / 100;
        long rationGram = rationKcal * 100 / recipe.calories();

        //todo narazie zakładam że jeden posiłek ma zawsze jeden typ racji
        rations.add(new Ration(
                random.nextInt(1000000),
                recipe.name(),
                rationGram,
                "g"));


        return rations;
    }

    private List<Occupant> calculatePortions(NutritionPlanData nutritionPlanData, Recipe recipe, Pair<String, Long> category) {
        //todo tymczasowe id
        Random random = new Random();

        return nutritionPlanData.kcal().stream()
                .map(pair -> new Occupant(
                        random.nextInt(1000000),
                        (String) pair.get(0),
                        calculateRations((Integer) pair.get(1), category, recipe))).toList();
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
                IntStream.range(0, selectedRecipes.size())
                        .mapToObj(i ->
                                new Meal(
                                        random.nextInt(1000000),
                                        categories.get(i).getFirst(),
                                        selectedRecipes.get(i).name(),
                                        selectedRecipes.get(i),
                                        calculatePortions(nutritionPlanData, selectedRecipes.get(i), categories.get(i)))
                        ).toList());
    }

    @Override
    public DayPlans generateNutritionPlan(List<Recipe> recipeBook, NutritionPlanData nutritionPlanData) {

        List<Pair<String, Long>> categories = selectCategories(nutritionPlanData);

        //todo w przyszłości mądrzejsze generowanie, uwzględniający "świażość"
        //todo zmien id
        Random random = new Random();
        DayPlans dayPlans = new DayPlans(random.nextInt(100000),
                nutritionPlanData.planName(),
                IntStream.range(0, (int) nutritionPlanData.numberOfDays())
                        .mapToObj(dayNumber -> createDayPlan(dayNumber + 1, recipeBook, nutritionPlanData, categories))
                        .toList());
        return dayPlans;
    }


    @Override
    public List<Item> addUpSameIngredients(List<Item> shoppingList) {
        Map<String, Item> ingredientMap = new HashMap<>();

        for (Item item : shoppingList) {
            String key = item.name() + "-" + item.unit();
            if (ingredientMap.containsKey(key)) {
                Item existingItem = ingredientMap.get(key);
                long newAmount = existingItem.amount() + item.amount();
                ingredientMap.put(key,
                        new Item(existingItem.idItem(), existingItem.name(), newAmount, existingItem.unit(), existingItem.checked()));
            } else {
                ingredientMap.put(key, item);
            }
        }

        return new ArrayList<>(ingredientMap.values());
    }

    long ingredientGram(Ingredient ingredient, double proportion) {
        return (long) (ingredient.amount() * proportion);
    }

    private List<Item> itemsOneMealOneOccupant(Ration ration, Recipe recipe) {

        double proportion = ((double) ration.amount()) /
                recipe.ingredient().stream().mapToLong(Ingredient::amount).sum();


        //todo zmien id
        return recipe.ingredient().stream()
                .map(ingredient ->
                        new Item(
                                0,
                                ingredient.name(),
                                ingredientGram(ingredient, proportion),
                                ingredient.unit(),
                                false
                        ))
                .toList();
    }

    @Override
    public List<Item> createShoppingList(long idPlan, UserEntity userEntity) {

        Optional<DayPlans> plans = userEntity.getUser().plansList()
                .stream()
                .filter(dayPlans -> dayPlans.idDayPlans() == idPlan)
                .findFirst();

        List<Item> shoppingList = new ArrayList<>();

        plans.get().dayPlanList()
                .forEach(dayPlan -> {
                    dayPlan.meal()
                            .forEach(meal -> {
                                meal.occupant()
                                        .forEach(occupant -> {
                                            shoppingList.addAll(
                                                    //todo narazie racje maja jednen składnik
                                                    itemsOneMealOneOccupant(occupant.ration().get(0),
                                                            meal.recipe()));
                                        });
                            });

                });

        return addUpSameIngredients(shoppingList);
    }

    @Override
    public List<DescriptionDay> createDescriptionDayPlan(long idPlan, UserEntity userEntity) {
        Optional<DayPlans> plans = userEntity.getUser().plansList()
                .stream()
                .filter(dayPlans -> dayPlans.idDayPlans() == idPlan)
                .findFirst();

        List<DescriptionDay> days = new ArrayList<>();

        plans.get().dayPlanList().stream().forEach(dayPlan -> {
            List<DescriptionMeal> meals = new ArrayList<>();

            //todo napisz

            days.add(new DescriptionDay(dayPlan.number(), meals));
        });


        return days;
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

    //todo w przyszłości kiedy będzie można edytować preliminary plan
    @Override
    public void addDayPlansToUser(UserEntity userEntity, List<DayPlan> dayPlans, long idPlan) {
//        userRepository.deleteByUsername(userEntity.getUsername());
//
//        Optional<DayPlans> plan =
//                userEntity
//                        .getUser()
//                        .plansList()
//                        .stream()
//                        .filter(p -> p.idDayPlans() == idPlan)
//                        .findFirst();
//
//        dayPlans.removeIf(p -> p.idDayPlan() == idPlan);
//
//        if (pl)
//
//        dayPlans.add(plan.get());
//
//        UserEntity newUserEntity = new UserEntity(
//                userEntity.getUsername(),
//                userEntity.getPassword(),
//                new UserInfo(
//                        userEntity.getUser().recipeBook(), dayPlans
//                ));
//
//        userRepository.save(newUserEntity);
//    }
    }
}



