package com.dinner.Whatistomorrowfordinner.controller;

import com.dinner.Whatistomorrowfordinner.model.DayPlan;
import com.dinner.Whatistomorrowfordinner.model.Meal;
import com.dinner.Whatistomorrowfordinner.model.Occupant;
import com.dinner.Whatistomorrowfordinner.model.Ration;
import com.dinner.Whatistomorrowfordinner.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/")
public class PlanController {
    private final UserRepository userRepository;

    private List<DayPlan> dayPlansTMP = List.of(new DayPlan(
                    1,
                    1,
                    List.of(
                            new Meal(
                                    3,
                                    "lunch",
                                    "kotlety mielone",
                                    List.of(new Occupant(
                                            5,
                                            "Monika",
                                            List.of(
                                                    new Ration(6, "kotlet", 300, "g"))
                                    ))

                            ),
                            new Meal(
                                    4,
                                    "dinner",
                                    "rosol",
                                    List.of(new Occupant(
                                            5,
                                            "Monika",
                                            List.of(
                                                    new Ration(6, "makaron", 300, "g"))
                                    ))

                            ))),
            new DayPlan(
                    1,
                    2,
                    List.of(
                            new Meal(
                                    3,
                                    "lunch",
                                    "kotlety mielone",
                                    List.of(new Occupant(
                                            5,
                                            "Monika",
                                            List.of(
                                                    new Ration(6, "kotlet", 300, "g"))
                                    ))

                            ),
                            new Meal(
                                    4,
                                    "dinner",
                                    "rosol",
                                    List.of(new Occupant(
                                            5,
                                            "Monika",
                                            List.of(
                                                    new Ration(6, "makaron", 300, "g"))
                                    ))

                            ))));

    @Autowired
    public PlanController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping("/preliminary-nutrition-plan")
    public ResponseEntity<List<DayPlan>> getTMP() {

        return new ResponseEntity<>(dayPlansTMP, HttpStatus.OK);
    }


}
