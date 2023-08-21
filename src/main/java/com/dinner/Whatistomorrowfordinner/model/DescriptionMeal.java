package com.dinner.Whatistomorrowfordinner.model;

import java.util.List;

public record DescriptionMeal(long idMeal, Recipe recipe, long numberOfDays, List<Item> items) {
}