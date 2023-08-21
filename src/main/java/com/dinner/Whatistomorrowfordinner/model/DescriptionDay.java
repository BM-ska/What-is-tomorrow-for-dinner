package com.dinner.Whatistomorrowfordinner.model;

import java.util.List;

public record DescriptionDay(long dayNumber, List<DescriptionMeal> meals) {
}
