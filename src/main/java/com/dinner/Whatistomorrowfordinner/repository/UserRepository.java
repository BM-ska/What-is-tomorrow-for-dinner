package com.dinner.Whatistomorrowfordinner.repository;

import com.dinner.Whatistomorrowfordinner.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserRepository extends MongoRepository<User, Integer> {
}
