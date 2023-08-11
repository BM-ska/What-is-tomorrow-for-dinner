package com.dinner.Whatistomorrowfordinner.repository;

import com.dinner.Whatistomorrowfordinner.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends MongoRepository<User, String> {
    User findByUsername(String username);

    void deleteByUsername(String userameTMP);

    //todo
//    List<Recipe> breakfastRecipes(List<Recipe> recipeBook);
//    List<Recipe> lunchRecipes(List<Recipe> recipeBook);
//    List<Recipe> dinnerRecipes(List<Recipe> recipeBook);
//    List<Recipe> snackRecipes(List<Recipe> recipeBook);
//    List<Recipe> supperRecipes(List<Recipe> recipeBook);

}
