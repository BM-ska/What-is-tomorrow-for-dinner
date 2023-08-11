package com.dinner.Whatistomorrowfordinner.service;

import com.dinner.Whatistomorrowfordinner.model.*;
import com.dinner.Whatistomorrowfordinner.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.util.Pair;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

@Component
public class NutritionPlanServiceImpl implements NutritionPlanService {
    String userameTMP = "jan";
    private final UserRepository userRepository;

    @Autowired
    public NutritionPlanServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }


    private List<Recipe> selectRecipes(List<Recipe> recipeBook, List<Pair<String, Long>> categories) {
        return null;
    }

    private List<Pair<String, Long>> selectCategories(NutritionPlanData nutritionPlanData) {
        return null;
    }

    private List<Occupant> calculatePortions(NutritionPlanData nutritionPlanData, List<Recipe> selectedRecipes) {
        return null;
    }

    private DayPlan createDayPlan(List<Recipe> recipeBook, NutritionPlanData nutritionPlanData, List<Pair<String, Long>> categories) {

        List<Recipe> selectedRecipes = selectRecipes(recipeBook, categories);
        List<Occupant> occupants = calculatePortions(nutritionPlanData, selectedRecipes);

        return null;
    }

    @Override
    public List<DayPlan> generateNutritionPlan(NutritionPlanData nutritionPlanData) {

        User user = userRepository.findByUsername(userameTMP);
        List<Recipe> recipeBook = user.recipeBook();
        List<Pair<String, Long>> categories = selectCategories(nutritionPlanData);

        //todo w przyszłości mądrzejsze generowanie, uwzględniający "świażość"
        return IntStream.range(0, categories.size())
                .mapToObj(i -> createDayPlan(recipeBook, nutritionPlanData, categories))
                .collect(Collectors.toList());
    }


    private List<Item> addUpSameIngredients(List<Item> shoppingList){
        return null;
    }
    @Override
    public List<Item> createShoppingList(List<DayPlan> dayPlans) {
//todo zle, chcemy tylko aby z dayPlans brać jaki był przepis,i wypisać ingridients a nie ration

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
/* todo przerobić że w NutritionPlanData jest zamiast daily kcal, lista par, użytkownik i jego daily kcal*/


/*todo
 * mamy:
 * ilość kcal
 * kategorie
 * procenty z kategorii
 *
 * najpierw:
 * wybieramy dla każdej kategorii zaznaczonej na true
 * jeden przepis(mający przypisany daną kategorie
 *
 * potem
 * dla każdego użtkownika
 *
 * bierzemy jego ilość kcal
 * dla każdego posiłku przeliczamy ile powinien w całości mieć kcal
 * następnie proporcjonalnie trzeba przeliczyć każdy ingridient aby suma miała właściwą ilość kcal
 *
 * lista occupant -> 5 recipe
 * metoda która sumuje wszystko
 *
 */
