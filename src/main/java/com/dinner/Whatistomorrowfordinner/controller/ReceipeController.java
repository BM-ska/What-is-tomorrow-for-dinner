package com.dinner.Whatistomorrowfordinner.controller;

import com.dinner.Whatistomorrowfordinner.model.Ingredient;
import com.dinner.Whatistomorrowfordinner.model.Recipe;
import com.dinner.Whatistomorrowfordinner.model.RecipeData;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/")
public class ReceipeController {

    List<Recipe> recipesTMP = List.of(
            new Recipe("1", "Barszcz", 123, List.of(
                    new Ingredient("11", "burak", "1234", "g", 1),
                    new Ingredient("12", "woda", "1234", "g", 1),
                    new Ingredient("13", "uszko", "1234", "g", 1))),
            new Recipe("2", "Pierogi", 12322222, List.of(
                    new Ingredient("14", "burak", "1234", "g", 1))));

    RecipeData recipeDataTMP = new RecipeData(
            "12",
            "Barszcz",
            2,
            "lunch",
            List.of(new Ingredient("876", "mak", "200", "g", 2345),
                    new Ingredient("23", "sól", "4", "g", 4)));

    @GetMapping("recipe-book")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<List<Recipe>> getRecipeBook() {
        List<Recipe> recipes = recipesTMP;

        return new ResponseEntity<>(recipes, HttpStatus.OK);
    }

    @PutMapping("recipe-book")
    @CrossOrigin(origins = "http://localhost:3000")
    public void updateRecipeBook(@RequestBody List<Recipe> recipeBook) {

        System.out.printf(recipeBook.toString() + '\n');

    }

    @GetMapping("recipe-book/{id}")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<RecipeData> getRecipe(@PathVariable String id) {
        System.out.printf(id + '\n');

        RecipeData recipes = recipeDataTMP;

        return new ResponseEntity<>(recipes, HttpStatus.OK);
    }

    @PutMapping("recipe-book/{id}")
    @CrossOrigin(origins = "http://localhost:3000")
    public void updateRecipe(@PathVariable String id, @RequestBody RecipeData recipe) {
        System.out.printf(id + '\n');
        System.out.printf(recipe.toString() + '\n');

        //todo niedziala
        Recipe a = new Recipe(recipe.getId(), recipe.getName(),123, recipe.getIngredient());
        recipesTMP.add(a);
    }


}