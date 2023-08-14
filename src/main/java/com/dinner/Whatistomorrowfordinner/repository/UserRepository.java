package com.dinner.Whatistomorrowfordinner.repository;

import com.dinner.Whatistomorrowfordinner.model.UserEntity;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends MongoRepository<UserEntity, String> {
    UserEntity findByUsername(String username);

    void deleteByUsername(String userame);

}
