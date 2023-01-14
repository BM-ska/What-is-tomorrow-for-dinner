package com.dinner.Whatistomorrowfordinner.model;

public class Ingredient {

    private final String id;
    private final String name;
    private final String amount;
    private final String unit;

    public Ingredient(String id, String name, String amount, String unit) {
        this.id = id;
        this.name = name;
        this.amount = amount;
        this.unit = unit;
    }

    public String getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getAmount() {
        return amount;
    }

    public String getUnit() {
        return unit;
    }
}
