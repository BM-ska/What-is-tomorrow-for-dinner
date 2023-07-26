package com.dinner.Whatistomorrowfordinner.model;

public class Ingredient {
    private final String id;
    private final String name;
    private final String amount;
    private final String unit;
    private final int kcal;

    public Ingredient(String id, String name, String amount, String unit, int kcal) {
        this.id = id;
        this.name = name;
        this.amount = amount;
        this.unit = unit;
        this.kcal = kcal;
    }

    public int getKcal() {
        return kcal;
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

    @Override
    public String toString() {
        return "Ingredient{" +
                "id='" + id + '\'' +
                ", name='" + name + '\'' +
                ", amount='" + amount + '\'' +
                ", unit='" + unit + '\'' +
                '}';
    }
}