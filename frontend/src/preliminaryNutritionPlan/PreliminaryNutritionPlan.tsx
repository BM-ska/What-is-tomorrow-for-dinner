import * as React from "react";
import {useEffect, useState} from "react";
import PreliminaryNutritionPlanHeader from "./PreliminaryNutritionPlanHeader";
import Box from "@mui/material/Box";
import {Button, Collapse} from "antd";
import {EditOutlined} from "@ant-design/icons";

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

function PreliminaryNutritionPlan() {

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
                                    name: "Eggs",
                                    amount: 2,
                                    unit: "pcs",
                                },
                                {
                                    idRation: 2,
                                    name: "Milk",
                                    amount: 100,
                                    unit: "ml",
                                },
                                {
                                    idRation: 3,
                                    name: "Salt",
                                    amount: 2,
                                    unit: "g",
                                },
                            ],
                        },
                        {
                            idOccupant: 2,
                            username: "JaneSmith",
                            ration: [
                                {
                                    idRation: 1,
                                    name: "Eggs",
                                    amount: 2,
                                    unit: "pcs",
                                },
                                {
                                    idRation: 2,
                                    name: "Milk",
                                    amount: 100,
                                    unit: "ml",
                                },
                                {
                                    idRation: 4,
                                    name: "Pepper",
                                    amount: 1,
                                    unit: "g",
                                },
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
                                    idRation: 6,
                                    name: "Vegetables",
                                    amount: 200,
                                    unit: "g",
                                },
                                {
                                    idRation: 7,
                                    name: "Soy Sauce",
                                    amount: 30,
                                    unit: "ml",
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
                                    idRation: 9,
                                    name: "Garlic",
                                    amount: 5,
                                    unit: "g",
                                },
                                {
                                    idRation: 7,
                                    name: "Soy Sauce",
                                    amount: 30,
                                    unit: "ml",
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
                    recipeName: "Scrambled Eggs",
                    occupant: [
                        {
                            idOccupant: 1,
                            username: "JohnDoe",
                            ration: [
                                {
                                    idRation: 1,
                                    name: "Eggs",
                                    amount: 2,
                                    unit: "pcs",
                                }
                            ],
                        }
                    ],
                }
            ],
        }
    ];

    useEffect(() => {
        // Example code for fetching data (commented out for simplicity)
        // fetch(`http://localhost:8080/preliminary-nutrition-plan`)
        //     .then((res) => res.json())
        //     .then((data) => {
        //         const allDays: DayPlan[] = data;
        //         setDayPlanList(allDays);
        //     })
        //     .catch((err) => {
        //         console.log(err.message);
        //     });

        // For now, using the sample data directly
        setDayPlanList(allDaysTMP);
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
                <Panel header={`Day ${day.number}`} key={`${day.idDayPlan}`} >
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
            <PreliminaryNutritionPlanHeader/>
            <List list={dayPlanList}/>
        </div>
    );
}

export default PreliminaryNutritionPlan;