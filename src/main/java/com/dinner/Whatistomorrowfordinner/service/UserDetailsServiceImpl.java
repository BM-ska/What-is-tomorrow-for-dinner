package com.dinner.Whatistomorrowfordinner.service;

import com.dinner.Whatistomorrowfordinner.model.UserEntity;
import com.dinner.Whatistomorrowfordinner.repository.UserEntityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class UserDetailsServiceImpl implements UserDetailsService {

    List<UserDetails> userDetailsList = List.of(
            new UserEntity("user", new BCryptPasswordEncoder().encode("user"), "USER"),
            new UserEntity("admin", new BCryptPasswordEncoder().encode("admin"), "ADMIN"));

    @Autowired
    private UserEntityRepository userEntityRepository;

    //todo zmien
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
//        UserEntity user = userEntityRepository.findByUsername(username);
        UserDetails user;
        if (username.equals("user"))
            user = userDetailsList.get(0);
        else{
            user = userDetailsList.get(1);
        }
        if (user == null)
            throw new UsernameNotFoundException(username);
        return user;
    }
}
