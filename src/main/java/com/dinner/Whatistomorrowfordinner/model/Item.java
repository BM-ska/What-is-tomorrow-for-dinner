package com.dinner.Whatistomorrowfordinner.model;

public record Item(long idItem,
                   String name,
                   long amount,
                   String unit,
                   boolean checked) {
}
