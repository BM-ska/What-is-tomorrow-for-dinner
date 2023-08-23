package com.dinner.Whatistomorrowfordinner.model;

import java.util.List;

public record Occupant(long idOccupant,
                       String username,
                       List<Ration> ration) {

}
