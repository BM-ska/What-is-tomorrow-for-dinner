package com.dinner.Whatistomorrowfordinner.repository.model;


import javax.persistence.*;

@Entity
@Table(name = "receipeBook")
public class Recipe {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String recipeName;
    private Integer recipeId;


    public Integer getId() {
        return id;
    }


    public String getRecipeName() {
        return recipeName;
    }

    public void setRecipeName(String recipeName) {
        this.recipeName = recipeName;
    }

    public Integer getRecipeId() {
        return recipeId;
    }

    public void setRecipeId(Integer recipeId) {
        this.recipeId = recipeId;
    }
}
