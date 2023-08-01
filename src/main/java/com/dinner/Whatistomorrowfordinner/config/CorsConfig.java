package com.dinner.Whatistomorrowfordinner.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/delete/{id}")
                .allowedOrigins("http://localhost:3000")
                .allowedMethods("DELETE");
    }
}
