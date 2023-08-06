package com.dinner.Whatistomorrowfordinner.controller;

import com.dinner.Whatistomorrowfordinner.model.Recipe;
import com.dinner.Whatistomorrowfordinner.model.User;
import com.dinner.Whatistomorrowfordinner.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/")
@CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*")
public class ReceipeController {

    private final UserRepository userRepository;
    String userameTMP = "jan";

    @Autowired
    public ReceipeController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping("recipe-book")
    public ResponseEntity<List<Recipe>> getUserRecipesTMP() {
        User user = userRepository.findByUsername(userameTMP);

        List<Recipe> recipe = user.recipeBook();
        return new ResponseEntity<>(recipe, HttpStatus.OK);
    }

    @GetMapping("recipe-book/{id}")
    public ResponseEntity<Recipe> getRecipe(@PathVariable long id) {

        User user = userRepository.findByUsername(userameTMP);

        if (user != null) {
            List<Recipe> recipeBook = user.recipeBook();

            for (Recipe recipe : recipeBook) {
                if (recipe.idRecipe() == id) {
                    return new ResponseEntity<>(recipe, HttpStatus.OK);
                }
            }
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);

    }

    @DeleteMapping("recipe-book/delete/recipe/{id}")
    public void deleteRecipe(@PathVariable long id) {
        User user = userRepository.findByUsername(userameTMP);
        userRepository.deleteByUsername(userameTMP);
        List<Recipe> recipeBook = user.recipeBook();
        recipeBook.removeIf(recipe -> recipe.idRecipe() == id);
        userRepository.save(user);
    }

    @PutMapping("recipe-book/update/recipe/{id}")
    public ResponseEntity<Recipe> updateRecipe(@PathVariable long id, @RequestBody Recipe updatedRecipe) {
        User user = userRepository.findByUsername(userameTMP);
        userRepository.deleteByUsername(userameTMP);

        List<Recipe> recipeBook = user.recipeBook();
        recipeBook.removeIf(recipe -> recipe.idRecipe() == id);
        recipeBook.add(updatedRecipe);

        userRepository.save(user);
        return new ResponseEntity<>(updatedRecipe, HttpStatus.OK);
    }

}


