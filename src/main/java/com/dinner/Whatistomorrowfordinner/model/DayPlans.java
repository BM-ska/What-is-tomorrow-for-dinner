package com.dinner.Whatistomorrowfordinner.model;

import java.util.List;

public record DayPlans (long idDayPlans,
                        List<DayPlan> dayPlanList){
}
