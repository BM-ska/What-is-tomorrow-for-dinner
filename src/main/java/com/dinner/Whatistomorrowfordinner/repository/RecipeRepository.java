package com.dinner.Whatistomorrowfordinner.repository;

import com.dinner.Whatistomorrowfordinner.repository.model.Recipe;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RecipeRepository extends JpaRepository<Recipe, Integer> {
}
