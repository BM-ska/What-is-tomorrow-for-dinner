package com.dinner.Whatistomorrowfordinner.config;

import com.dinner.Whatistomorrowfordinner.repository.UserRepository;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

@EnableMongoRepositories(basePackageClasses = UserRepository.class)
@Configuration
public class MongoConfig {

}

