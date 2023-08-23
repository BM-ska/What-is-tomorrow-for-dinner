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


    private Recipe randomlySelectRecipeThatIsNotOnListOfRecipesUsed(List<Recipe> oneCategoryRecipeBook,
                                                                    List<Recipe> recipesUsed) {
        if (oneCategoryRecipeBook.isEmpty()) {
            return new Recipe(0, "", 0, "", 0, List.of());
        }
        if (oneCategoryRecipeBook.size() <= 2) {
            Random random = new Random();
            int randomIndex = random.nextInt(oneCategoryRecipeBook.size());
            return oneCategoryRecipeBook.get(randomIndex);
        }

        List<Recipe> availableRecipes = new ArrayList<>(oneCategoryRecipeBook);
        availableRecipes.removeAll(recipesUsed);

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

    private List<Recipe> randomSelectRecipes(List<Recipe> recipeBook, List<Pair<String, Long>> categories) {

        List<Recipe> selectedRecipes = new ArrayList<>();

        categories.forEach(category -> {
            List<Recipe> oneCategoryRecipeBook = selectAllRecipesOneCategory(recipeBook, category.getFirst());

            Recipe recipe = randomlySelectRecipeThatIsNotOnListOfRecipesUsed(oneCategoryRecipeBook, selectedRecipes);

            selectedRecipes.add(recipe.idRecipe() == 0 && !oneCategoryRecipeBook.isEmpty() ?
                    oneCategoryRecipeBook.get(0) : recipe);
        });

        return selectedRecipes;
    }


    private Map<String, Recipe> putItemsInCorrectOrder(String category, Recipe recipe, Map<String, Recipe> selectedRecipes) {
        Map<String, Recipe> recipes = new LinkedHashMap<>();

        if (selectedRecipes.containsKey("breakfast")) {
            recipes.put("breakfast", selectedRecipes.get("breakfast"));
        } else if (category.equals("breakfast")) {
            recipes.put("breakfast", recipe);
        }

        if (selectedRecipes.containsKey("lunch")) {
            recipes.put("lunch", selectedRecipes.get("lunch"));
        } else if (category.equals("lunch")) {
            recipes.put("lunch", recipe);
        }

        if (selectedRecipes.containsKey("dinner")) {
            recipes.put("dinner", selectedRecipes.get("dinner"));
        } else if (category.equals("dinner")) {
            recipes.put("dinner", recipe);
        }

        if (selectedRecipes.containsKey("snack")) {
            recipes.put("snack", selectedRecipes.get("snack"));
        } else if (category.equals("snack")) {
            recipes.put("snack", recipe);
        }

        if (selectedRecipes.containsKey("supper")) {
            recipes.put("supper", selectedRecipes.get("supper"));
        } else if (category.equals("supper")) {
            recipes.put("supper", recipe);
        }

        return recipes;
    }

    Map<String, Recipe> mealPlanForDay(List<DayPlan> dayPlanList,
                                       int numberOfDaysBack,
                                       NutritionPlanData nutritionPlanData) {

        Map<String, Recipe> plan = new HashMap<>();
        int c = 0;

        if (nutritionPlanData.breakfast()) {
            plan.put("breakfast", dayPlanList.get(dayPlanList.size() - numberOfDaysBack).meal().get(c).recipe());
            c++;
        }
        if (nutritionPlanData.lunch()) {
            plan.put("lunch", dayPlanList.get(dayPlanList.size() - numberOfDaysBack).meal().get(c).recipe());
            c++;
        }
        if (nutritionPlanData.dinner()) {
            plan.put("dinner", dayPlanList.get(dayPlanList.size() - numberOfDaysBack).meal().get(c).recipe());
            c++;
        }
        if (nutritionPlanData.snack()) {
            plan.put("snack", dayPlanList.get(dayPlanList.size() - numberOfDaysBack).meal().get(c).recipe());
            c++;
        }
        if (nutritionPlanData.supper()) {
            plan.put("supper", dayPlanList.get(dayPlanList.size() - numberOfDaysBack).meal().get(c).recipe());
        }

        return plan;
    }

    private List<Recipe> mapToListRecipe(Map<String, Recipe> selectedRecipes) {
        List<Recipe> list = new ArrayList<>();
        selectedRecipes.forEach((category, recipe) -> list.add(recipe));
        return list;
    }

    private int remainingFreshDay(String category, List<DayPlan> dayPlanList, NutritionPlanData nutritionPlanData) {
        Map<String, Recipe> lastDay = mealPlanForDay(dayPlanList, 1, nutritionPlanData);

        int lastDayFresh = (int) lastDay.get(category).fresh();
        String lastDayName = lastDay.get(category).name();

        int freeFresh = Math.min(lastDayFresh, 3);

        for (int i = 1; i <= lastDayFresh && dayPlanList.size() - i >= 0; i++) {
            lastDay = mealPlanForDay(dayPlanList, i, nutritionPlanData);

            if (lastDay.get(category).name().equals(lastDayName)) {
                freeFresh--;
            }
            else
                break;
        }


        return freeFresh;
    }

    private int numberOfRepetitions(NutritionPlanData nutritionPlanData) {
        int numberOfMeals = 0;
        if (nutritionPlanData.breakfast())
            numberOfMeals++;
        if (nutritionPlanData.lunch())
            numberOfMeals++;
        if (nutritionPlanData.dinner())
            numberOfMeals++;
        if (nutritionPlanData.snack())
            numberOfMeals++;
        if (nutritionPlanData.supper())
            numberOfMeals++;

        if (numberOfMeals == 5)
            return 3;
        else if (numberOfMeals == 4)
            return 2;
        return 1;
    }

    private Recipe chooseRecipe(int freeFresh, String category, List<DayPlan> dayPlanList,
                                NutritionPlanData nutritionPlanData, List<Recipe> recipeBook,
                                List<Recipe> selectedRecipes, int repeat) {

        if (freeFresh > 0 && repeat > 0) {
            return mealPlanForDay(dayPlanList, 1, nutritionPlanData).get(category);
        }

        List<Recipe> categoryRecipeBook = selectAllRecipesOneCategory(recipeBook, category);
        List<Recipe> yesterdayRecipes = mapToListRecipe(mealPlanForDay(dayPlanList, 1, nutritionPlanData));

        selectedRecipes.addAll(yesterdayRecipes);

        Recipe recipe = randomlySelectRecipeThatIsNotOnListOfRecipesUsed(
                categoryRecipeBook,
                selectedRecipes.stream().distinct().toList());


        return recipe.idRecipe() == 0 && !categoryRecipeBook.isEmpty() ? categoryRecipeBook.get(0) : recipe;

    }

    private List<Recipe> selectRecipes(List<Recipe> recipeBook,
                                       List<Pair<String, Long>> categories,
                                       List<DayPlan> dayPlanList,
                                       NutritionPlanData nutritionPlanData) {

        if (dayPlanList.isEmpty()) {
            return randomSelectRecipes(recipeBook, categories);
        }

        Map<String, Recipe> selectedRecipes = new LinkedHashMap<>();
        int repeat = numberOfRepetitions(nutritionPlanData);

        if (nutritionPlanData.dinner()) {
            int freeFresh = remainingFreshDay("dinner", dayPlanList, nutritionPlanData);
            Recipe dinnerRecipe = chooseRecipe(freeFresh, "dinner", dayPlanList, nutritionPlanData,
                    recipeBook, mapToListRecipe(selectedRecipes), repeat);

            if (freeFresh > 0) {
                repeat--;
            }

            selectedRecipes = putItemsInCorrectOrder("dinner", dinnerRecipe, selectedRecipes);

        }
        if (nutritionPlanData.lunch()) {
            int freeFresh = remainingFreshDay("lunch", dayPlanList, nutritionPlanData);
            Recipe lunchRecipe = chooseRecipe(freeFresh, "lunch", dayPlanList, nutritionPlanData,
                    recipeBook, mapToListRecipe(selectedRecipes), repeat);

            if (freeFresh > 0) {
                repeat--;
            }

            selectedRecipes = putItemsInCorrectOrder("lunch", lunchRecipe, selectedRecipes);
        }
        if (nutritionPlanData.snack()) {
            int freeFresh = remainingFreshDay("snack", dayPlanList, nutritionPlanData);
            Recipe snackRecipe = chooseRecipe(freeFresh, "snack", dayPlanList, nutritionPlanData,
                    recipeBook, mapToListRecipe(selectedRecipes), repeat);

            if (freeFresh > 0) {
                repeat--;
            }

            selectedRecipes = putItemsInCorrectOrder("snack", snackRecipe, selectedRecipes);
        }
        if (nutritionPlanData.supper()) {
            int freeFresh = remainingFreshDay("supper", dayPlanList, nutritionPlanData);
            Recipe supperRecipe = chooseRecipe(freeFresh, "supper", dayPlanList, nutritionPlanData,
                    recipeBook, mapToListRecipe(selectedRecipes), repeat);

            if (freeFresh > 0) {
                repeat--;
            }

            selectedRecipes = putItemsInCorrectOrder("supper", supperRecipe, selectedRecipes);
        }
        if (nutritionPlanData.breakfast()) {
            int freeFresh = remainingFreshDay("breakfast", dayPlanList, nutritionPlanData);
            Recipe breakfastRecipe = chooseRecipe(freeFresh, "breakfast", dayPlanList, nutritionPlanData,
                    recipeBook, mapToListRecipe(selectedRecipes), repeat);

            selectedRecipes = putItemsInCorrectOrder("breakfast", breakfastRecipe, selectedRecipes);
        }

        return mapToListRecipe(selectedRecipes);
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

    private DayPlan createDayPlan(long dayNumber, NutritionPlanData nutritionPlanData,
                                  List<Pair<String, Long>> categories, List<Recipe> selectedRecipes) {

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

    DayPlans generateNutritionPlanThatMinimizesAmountOfCooking(List<Recipe> recipeBook,
                                                               NutritionPlanData nutritionPlanData,
                                                               List<Pair<String, Long>> categories) {

        List<DayPlan> dayPlanList = new ArrayList<>();


        //todo napraw
        for (int dayNumber = 0; dayNumber < (int) nutritionPlanData.numberOfDays(); dayNumber++) {
            dayPlanList.add(createDayPlan(
                    dayNumber + 1,
                    nutritionPlanData,
                    categories,
                    selectRecipes(recipeBook, categories, dayPlanList, nutritionPlanData)));
        }

        //todo zmien id
        Random random = new Random();

        return new DayPlans(random.nextInt(100000),
                nutritionPlanData.planName(),
                dayPlanList);

    }

    DayPlans generateRandomNutritionPlan(List<Recipe> recipeBook,
                                         NutritionPlanData nutritionPlanData,
                                         List<Pair<String, Long>> categories) {
        //todo zmien id
        Random random = new Random();
        return new DayPlans(random.nextInt(100000),
                nutritionPlanData.planName(),
                IntStream.range(0, (int) nutritionPlanData.numberOfDays())
                        .mapToObj(dayNumber -> createDayPlan(dayNumber + 1,
                                nutritionPlanData,
                                categories,
                                randomSelectRecipes(recipeBook, categories)))
                        .toList());

    }

    @Override
    public DayPlans generateNutritionPlan(List<Recipe> recipeBook, NutritionPlanData nutritionPlanData) {

        List<Pair<String, Long>> categories = selectCategories(nutritionPlanData);

        if (categories.size() > 2 && nutritionPlanData.numberOfDays() > 1) {
            return generateNutritionPlanThatMinimizesAmountOfCooking(
                    recipeBook,
                    nutritionPlanData,
                    categories);
        }

        return generateRandomNutritionPlan(
                recipeBook,
                nutritionPlanData,
                categories);

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


    List<Item> itemsSum(List<Item> i1, List<Item> i2) {

        List<Item> items = new ArrayList<>();

        for (int i = 0; i < i1.size(); i++) {
            items.add(new Item(
                    i1.get(i).idItem(),
                    i1.get(i).name(),
                    i1.get(i).amount() + i2.get(i).amount(),
                    i1.get(i).unit(),
                    i1.get(i).checked()));
        }

        return items;
    }

    List<DescriptionDay> minimizeNumberOfCookingDays(List<DescriptionDay> days) {

        for (int numberOfDay = 0; numberOfDay < days.size(); numberOfDay++) {

            for (int m = 0; m < days.get(numberOfDay).meals().size(); m++) {
                long fresh = days.get(numberOfDay).meals().get(m).recipe().fresh();

                for (int f = 1; f < fresh; f++) {
                    if (numberOfDay + f < days.size()) {
                        //todo narazie zakładam że nazwy dań są unikalne więc posiadają te same składniki tylko w różnych proporcjach

                        for (int numberOfMeal = 0; numberOfMeal < days.get(numberOfDay + f).meals().size(); numberOfMeal++) {

                            if (days.get(numberOfDay + f).meals().get(numberOfMeal).recipe().name()
                                    .equals(days.get(numberOfDay).meals().get(m).recipe().name())) {

                                List<Item> summedUpItems = itemsSum(days.get(numberOfDay).meals().get(m).items(),
                                        days.get(numberOfDay + f).meals().get(numberOfMeal).items());

                                for (int s = 0; s < summedUpItems.size(); s++) {
                                    days.get(numberOfDay).meals().get(m).items().set(s, summedUpItems.get(s));
                                }

                                days.get(numberOfDay + f).meals().remove(numberOfMeal);

                                days.get(numberOfDay).meals().set(m, new DescriptionMeal(
                                        days.get(numberOfDay).meals().get(m).idMeal(),
                                        days.get(numberOfDay).meals().get(m).recipe(),
                                        days.get(numberOfDay).meals().get(m).numberOfDays() + 1,
                                        days.get(numberOfDay).meals().get(m).items()
                                ));
                            }
                        }
                    }
                }
            }
        }

        return days;
    }

    List<DescriptionDay> recalculateIngredients(DayPlans plans) {
        Random random = new Random();
        List<DescriptionDay> days = new ArrayList<>();
        plans.dayPlanList()
                .forEach(dayPlan -> {

                    List<DescriptionMeal> meals = new ArrayList<>();

                    dayPlan.meal()
                            .forEach(meal -> {

                                List<Item> items = new ArrayList<>();

                                meal.occupant()
                                        .forEach(occupant -> {
                                            items.addAll(
                                                    //todo narazie racje maja jednen składnik
                                                    itemsOneMealOneOccupant(occupant.ration().get(0),
                                                            meal.recipe()));
                                        });

                                meals.add(new DescriptionMeal(
                                        random.nextInt(10000),
                                        meal.recipe(),
                                        1,
                                        addUpSameIngredients(items)
                                ));
                            });


                    days.add(new DescriptionDay(
                            dayPlan.number(),
                            meals
                    ));
                });

        return days;
    }

    @Override
    public List<DescriptionDay> createDescriptionDayPlan(long idPlan, UserEntity userEntity) {
        Optional<DayPlans> plans = userEntity.getUser().plansList()
                .stream()
                .filter(dayPlans -> dayPlans.idDayPlans() == idPlan)
                .findFirst();

        List<DescriptionDay> days = recalculateIngredients(plans.get());

        return minimizeNumberOfCookingDays(days);
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



