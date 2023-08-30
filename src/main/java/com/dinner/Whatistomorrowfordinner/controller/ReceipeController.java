package com.dinner.Whatistomorrowfordinner.controller;

import com.dinner.Whatistomorrowfordinner.model.Recipe;
import com.dinner.Whatistomorrowfordinner.model.UserEntity;
import com.dinner.Whatistomorrowfordinner.repository.UserRepository;
import com.dinner.Whatistomorrowfordinner.service.RecipeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/")
@CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*")
public class ReceipeController {

    private final UserRepository userRepository;
    private final RecipeService recipeService;

    @Autowired
    public ReceipeController(UserRepository userRepository, RecipeService recipeService) {
        this.userRepository = userRepository;
        this.recipeService = recipeService;
    }

    @GetMapping("recipe-book")
    public ResponseEntity<List<Recipe>> getUserRecipes(@AuthenticationPrincipal UserEntity userEntity) {

        if (userEntity != null) {
            List<Recipe> recipe = userEntity.getUser().recipeBook();
            return new ResponseEntity<>(recipe, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @GetMapping("recipe-book/{id}")
    public ResponseEntity<Recipe> getRecipe(@PathVariable long id, @AuthenticationPrincipal UserEntity userEntity) {

        List<Recipe> recipeBook = userEntity.getUser().recipeBook();

        for (Recipe recipe : recipeBook) {
            if (recipe.idRecipe() == id) {
                return new ResponseEntity<>(recipe, HttpStatus.OK);
            }
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);

    }

    @DeleteMapping("recipe-book/delete/recipe/{id}")
    public void deleteRecipe(@PathVariable long id, @AuthenticationPrincipal UserEntity userEntity) {

        userRepository.deleteByUsername(userEntity.getUsername());
        List<Recipe> recipeBook = userEntity.getUser().recipeBook();
        recipeBook.removeIf(recipe -> recipe.idRecipe() == id);
        userRepository.save(userEntity);
    }

    @PutMapping("recipe-book/update/recipe/{id}")
    public ResponseEntity<Recipe> updateRecipe(@PathVariable long id, @RequestBody Recipe updatedRecipe,
                                               @AuthenticationPrincipal UserEntity userEntity) {

        Recipe newRecipe = new Recipe(
                updatedRecipe.idRecipe(),
                updatedRecipe.name(),
                updatedRecipe.fresh(),
                updatedRecipe.category(),
                recipeService.countCaloriesPer100g(updatedRecipe),
                recipeService.normalizeIngredientsNames(updatedRecipe.ingredient()));

        userRepository.deleteByUsername(userEntity.getUsername());

        List<Recipe> recipeBook = userEntity.getUser().recipeBook();
        recipeBook.removeIf(recipe -> recipe.idRecipe() == id);
        recipeBook.add(newRecipe);

        userRepository.save(userEntity);
        return new ResponseEntity<>(newRecipe, HttpStatus.OK);
    }

}


