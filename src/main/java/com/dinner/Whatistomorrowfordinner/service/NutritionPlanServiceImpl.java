package com.dinner.Whatistomorrowfordinner.service;

import com.dinner.Whatistomorrowfordinner.model.DayPlan;
import com.dinner.Whatistomorrowfordinner.model.NutritionPlanData;
import com.dinner.Whatistomorrowfordinner.model.Recipe;
import com.dinner.Whatistomorrowfordinner.model.User;
import com.dinner.Whatistomorrowfordinner.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class NutritionPlanServiceImpl implements NutritionPlanService {
    String userameTMP = "jan";
    private final UserRepository userRepository;

    @Autowired
    public NutritionPlanServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public DayPlan generateNutritionPlan(NutritionPlanData nutritionPlanData) {

        User user = userRepository.findByUsername(userameTMP);
        List<Recipe> recipes = user.recipeBook();


        return null;
    }
}
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
* bierzemy ilość kcal
* dla każdego posiłku przeliczamy ile powinien w całości mieć kcal
* następnie proporcjonalnie trzeba przeliczyć każdy ingridient aby suma miała właściwą ilość kcal
*
* następnie zwracamy listę 5(recipe/null)) przepisów już wyliczonych
*
*
* tylko to jest ok dla jednego człowieka
* co jak więcej*/
