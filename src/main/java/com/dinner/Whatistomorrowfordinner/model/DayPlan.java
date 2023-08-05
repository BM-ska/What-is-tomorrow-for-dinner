package com.dinner.Whatistomorrowfordinner.model;

import java.util.List;

public record DayPlan(long idDayPlan,
                      long number,
                      List<Meal> meal) {
}
