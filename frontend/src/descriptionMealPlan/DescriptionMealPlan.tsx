import * as React from "react";
import {useEffect, useState} from "react";
import {Collapse} from "antd";
import Box from "@mui/material/Box";

const {Panel} = Collapse;

interface Item {
    idItem: number;
    name: string;
    amount: number;
    unit: string;
    checked: boolean;
}

interface Recipe {
    idRecipe: number;
    name: string;
    fresh: number;
    category: string;
    ingredient: { idIngredient: number, name: string, amount: number, unit: string, kcal: number }[];
}

interface DescriptionMeal {
    idMeal: number
    recipe: Recipe;
    numberOfDays: number;
    items: Item[];
}

interface DescriptionDay {
    dayNumber: number;
    meals: DescriptionMeal[]
}

interface descriptionDayCollapseProps {
    day: DescriptionDay;
}

interface MealCollapseProps {
    meal: DescriptionMeal;
}

function DescriptionMealPlan() {

    const [descriptionDayList, setDescriptionDayList] = useState<DescriptionDay[]>([]);
    const idPlan = Number(window.location.pathname.split('/')[2]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            fetch(`http://localhost:8080/your-plans/${idPlan}/description-meal-plan`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then((res) => res.json())
                .then((data) => {
                    const allDescriptionDay: DescriptionDay[] = data;
                    setDescriptionDayList(allDescriptionDay);
                })
                .catch((err) => {
                    console.log(err.message);
                });
        } else {
            console.log('Token not found in localStorage');
            window.location.href = "http://localhost:3000/sign-in";
        }


    }, []);

    const DayCollapse: React.FC<descriptionDayCollapseProps> = ({day}) => {
        return (
            <Collapse defaultActiveKey={[`${day.dayNumber}`]} accordion>
                <Panel header={`Day ${day.dayNumber}`} key={`${day.dayNumber}`}>
                    {day.meals.map((meal) => (
                        <MealCollapse key={meal.idMeal} meal={meal}/>
                    ))}
                </Panel>
            </Collapse>
        );
    };

    const MealCollapse: React.FC<MealCollapseProps> = ({meal}) => {
        const [activeKey, setActiveKey] = useState<string | string[] | undefined>([]);

        const handlePanelChange = (key: string | string[]) => {
            setActiveKey(key);
        };

        return (
            <Collapse activeKey={activeKey} onChange={handlePanelChange} accordion>
                <Panel header={`Ingredients for ${meal.recipe.name} to prepare for ${meal.numberOfDays} days`}
                       key={`${meal.idMeal}`}>
                    <ul>
                        {meal.items.map((item) => (
                            <li key={item.idItem}>
                                <b>{item.name}: </b>
                                {item.amount} {item.unit}
                            </li>
                        ))
                        }
                    </ul>
                </Panel>
            </Collapse>
        );
    };


    const List = ({list}: { list: DescriptionDay[] }) => {
        return (
            <Box boxShadow={20}>
                {list.map((day) => (
                    <DayCollapse key={day.dayNumber} day={day}/>
                ))}
            </Box>
        );
    };


    return (
        <div className="App">
            <List list={descriptionDayList}/>
        </div>
    );
}

export default DescriptionMealPlan;