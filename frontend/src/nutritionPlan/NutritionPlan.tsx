import * as React from "react";
import {useEffect, useState} from "react";
import Box from "@mui/material/Box";
import {Collapse} from "antd";
import NutritionPlanHeader from "./NutritionPlanHeader";
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
    occupant: Occupant[];
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

function NutritionPlan() {

    const [dayPlanList, setDayPlanList] = useState<DayPlan[]>([]);

    const allDaysTMP: DayPlan[] = [
        {
            idDayPlan: 1,
            number: 1,
            meal: [
                {
                    idMeal: 1,
                    category: "Breakfast",
                    recipeName: "Scrambled Eggs",
                    occupant: [
                        {
                            idOccupant: 1,
                            username: "JohnDoe",
                            ration: [
                                {
                                    idRation: 1,
                                    name: "Scrambled Eggs",
                                    amount: 200,
                                    unit: "g",
                                },
                                {
                                    idRation: 2,
                                    name: "chleb",
                                    amount: 100,
                                    unit: "g",
                                }
                            ],
                        },
                        {
                            idOccupant: 2,
                            username: "JaneSmith",
                            ration: [
                                {
                                    idRation: 3,
                                    name: "Scrambled Eggs",
                                    amount: 300,
                                    unit: "g",
                                },
                                {
                                    idRation: 4,
                                    name: "chleb",
                                    amount: 150,
                                    unit: "g",
                                }
                            ],
                        },
                    ],
                },
                {
                    idMeal: 2,
                    category: "Lunch",
                    recipeName: "Chicken Stir-Fry",
                    occupant: [
                        {
                            idOccupant: 1,
                            username: "JohnDoe",
                            ration: [
                                {
                                    idRation: 5,
                                    name: "Chicken",
                                    amount: 150,
                                    unit: "g",
                                },
                                {
                                    idRation: 8,
                                    name: "Rice",
                                    amount: 100,
                                    unit: "g",
                                },
                            ],
                        },
                        {
                            idOccupant: 3,
                            username: "BobJohnson",
                            ration: [
                                {
                                    idRation: 5,
                                    name: "Chicken",
                                    amount: 150,
                                    unit: "g",
                                },
                                {
                                    idRation: 8,
                                    name: "Rice",
                                    amount: 100,
                                    unit: "g",
                                },
                            ],
                        },
                    ],
                },
            ],
        },

        {
            idDayPlan: 2,
            number: 2,
            meal: [
                {
                    idMeal: 4,
                    category: "Breakfast",
                    recipeName: "Omlet",
                    occupant: [
                        {
                            idOccupant: 1,
                            username: "JohnDoe",
                            ration: [
                                {
                                    idRation: 1,
                                    name: "omlet",
                                    amount: 400,
                                    unit: "g",
                                }
                            ],
                        }
                    ],
                }
            ],
        }
    ];

    const idPlan: number = Number(useLocation().pathname.slice(12));

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
        return (
            <Collapse defaultActiveKey={[`${meal.idMeal}`]} accordion>
                <Panel header={`${meal.category}:  ${meal.recipeName}`} key={`${meal.idMeal}`}>
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
            <NutritionPlanHeader/>
            <List list={dayPlanList}/>
        </div>
    );
}

export default NutritionPlan;