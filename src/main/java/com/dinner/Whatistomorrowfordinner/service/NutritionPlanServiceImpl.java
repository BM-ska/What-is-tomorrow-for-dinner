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


    private List<Recipe> selectRecipes(List<Recipe> recipeBook, List<Pair<String, Long>> categories){
        return List.of(

        );
    }
    private List<Pair<String, Long>> selectCategories(NutritionPlanData nutritionPlanData){
        return List.of();
    }

    private List<Occupant>calculatePortions(NutritionPlanData nutritionPlanData, List<Recipe>selectedRecipes){
        return null;
    }

    private DayPlan createDayPlan(List<Recipe> recipeBook, NutritionPlanData nutritionPlanData, List<Pair<String, Long>> categories){

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
