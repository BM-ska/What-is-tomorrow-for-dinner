package com.dinner.Whatistomorrowfordinner.repository;

import com.dinner.Whatistomorrowfordinner.model.DayPlans;
import com.dinner.Whatistomorrowfordinner.model.UserEntity;
import com.dinner.Whatistomorrowfordinner.model.UserInfo;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends MongoRepository<UserEntity, String> {
    UserEntity findByUsername(String username);
    void deleteByUsername(String userame);

    //@Query("{'username': ?0}")
    //void addDayPlansToUser(String username, DayPlans dayPlans);

    //todo
//    List<Recipe> breakfastRecipes(List<Recipe> recipeBook);
//    List<Recipe> lunchRecipes(List<Recipe> recipeBook);
//    List<Recipe> dinnerRecipes(List<Recipe> recipeBook);
//    List<Recipe> snackRecipes(List<Recipe> recipeBook);
//    List<Recipe> supperRecipes(List<Recipe> recipeBook);

}
