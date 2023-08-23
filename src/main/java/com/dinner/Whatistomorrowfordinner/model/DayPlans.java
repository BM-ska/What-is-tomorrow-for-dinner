package com.dinner.Whatistomorrowfordinner.model;

import java.util.List;

public record DayPlans (long idDayPlans,
                        String planName,
                        List<DayPlan> dayPlanList){
}
