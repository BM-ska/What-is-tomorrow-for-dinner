package com.dinner.Whatistomorrowfordinner.controller;

import com.dinner.Whatistomorrowfordinner.repository.RecipeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ReceipeController {

    private final RecipeRepository recipeRepository;

    @Autowired
    public ReceipeController(RecipeRepository recipeRepository) {
        this.recipeRepository = recipeRepository;
    }

//    @GetMapping("/receipe")
//    public String listAll(Model model){
//        Iterable<Recipe> recipes = recipeRepository.findAll();
//        model.addAttribute("list", recipes);
//
//        return "aa";
//    }
//
//    public Iterable<ServiceModelCategory> getAllCategories() {
//        LOGGER.info("Get all categories");
//        Iterable<CategoryEntity> repositoryModelCategoryEntityIterable = categoryRepository.findAll();
//
//        List<ServiceModelCategory> tmp = new ArrayList<>();
//        repositoryModelCategoryEntityIterable.forEach(x -> tmp.add(mapper.fromRepositoryToServiceModel(x)));
//
//        LOGGER.info("Categories: " + tmp);
//        LOGGER.info("Get all categories successfully");
//
//        return tmp;
//    }
}
