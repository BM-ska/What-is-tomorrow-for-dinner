package com.dinner.Whatistomorrowfordinner.model;

import java.util.List;

public record Meal(long idMeal,
                   String category,
                   String recipeName,
                   Recipe recipe,
                   List<Occupant> occupant) {
}
