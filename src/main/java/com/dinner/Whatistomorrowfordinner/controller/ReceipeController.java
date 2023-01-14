package com.dinner.Whatistomorrowfordinner.controller;

import com.dinner.Whatistomorrowfordinner.model.Ingredient;
import com.dinner.Whatistomorrowfordinner.model.Recipe;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/")
public class ReceipeController {

    List<Recipe> recipesTMP = List.of(
            new Recipe("1", "Barszcz", 123, List.of(
                    new Ingredient("11", "burak", "1234", "g"),
                    new Ingredient("12", "woda", "1234", "g"),
                    new Ingredient("13", "uszko", "1234", "g"))),
            new Recipe("2", "Pierogi", 12322222, List.of(
                    new Ingredient("14", "burak", "1234", "g"))));

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




}