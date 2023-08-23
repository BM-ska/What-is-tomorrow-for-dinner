import * as React from "react";
import {useEffect, useState} from "react";
import PreliminaryNutritionPlanHeader from "./PreliminaryNutritionPlanHeader";
import Box from "@mui/material/Box";
import {Button, Collapse} from "antd";
import {EditOutlined} from "@ant-design/icons";
import {useLocation} from "react-router-dom";

const {Panel} = Collapse;

interface Ration {
    idRation: number;
    name: string;
    amount: number;
    unit: string;
}

interface Occupant {
    idOccupant: number;
    username: string;
    ration: Ration[];
}

interface Meal {
    idMeal: number;
    category: string;
    recipeName: string;
    recipe: Recipe;
    occupant: Occupant[];
}


interface Recipe {
    idRecipe: number;
    name: string;
    fresh: number;
    category: string;
    ingredient: { idIngredient: number, name: string, amount: number, unit: string, kcal: number }[];
}

interface Ingredient {
    idIngredient: number;
    name: string;
    amount: number;
    unit: string;
    kcal: number;
}

interface DayPlan {
    idDayPlan: number;
    number: number;
    meal: Meal[];
}

interface DayCollapseProps {
    day: DayPlan;
}

interface MealCollapseProps {
    meal: Meal;
}

function PreliminaryNutritionPlan() {

    const idPlan: number = Number(useLocation().pathname.slice(23));

    const [dayPlanList, setDayPlanList] = useState<DayPlan[]>([]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            fetch(`http://localhost:8080/nutrition-plan/preliminary/${idPlan}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then((res) => res.json())
                .then((data) => {
                    const allDays: DayPlan[] = data;
                    setDayPlanList(allDays);
                })
                .catch((err) => {
                    console.log(err.message);
                });
        } else {
            console.log('Token not found in localStorage');
            window.location.href = "http://localhost:3000/sign-in";
        }

    }, []);

    const onChange = (key: string | string[]) => {
        //  console.log(key);
    };

    const genExtra = (meal: Meal) => (
        <Box>
            <Button shape="circle" icon={<EditOutlined/>} href={``}/>

        </Box>

    );

    const DayCollapse: React.FC<DayCollapseProps> = ({day}) => {
        return (
            <Collapse defaultActiveKey={[`${day.idDayPlan}`]} accordion>
                <Panel header={`Day ${day.number}`} key={`${day.idDayPlan}`}>
                    {day.meal.map((meal) => (
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
                <Panel header={`${meal.category}:  ${meal.recipeName}`} key={`${meal.idMeal}`} extra={genExtra(meal)}>
                    <ul>
                        {meal.occupant.map((occupant) => (
                            <li key={occupant.idOccupant}>
                                {occupant.username}
                                <ul>
                                    {occupant.ration.map((ration) => (
                                        <li key={ration.idRation}>
                                            <b>{ration.name}: </b>
                                            {ration.amount} {ration.unit}
                                        </li>
                                    ))}
                                </ul>
                            </li>
                        ))}
                    </ul>
                </Panel>
            </Collapse>
        );
    };

    const List = ({list}: { list: DayPlan[] }) => {
        return (
            <Box boxShadow={20}>
                {list.map((day) => (
                    <DayCollapse key={day.idDayPlan} day={day}/>
                ))}
            </Box>
        );
    };

    return (
        <div className="App">
            <PreliminaryNutritionPlanHeader dayPlanList={dayPlanList}/>
            <List list={dayPlanList}/>
        </div>
    );
}

export default PreliminaryNutritionPlan;