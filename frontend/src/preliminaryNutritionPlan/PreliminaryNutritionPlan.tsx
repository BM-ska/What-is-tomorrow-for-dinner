import * as React from "react";
import {useEffect, useState} from "react";
import PreliminaryNutritionPlanHeader from "./PreliminaryNutritionPlanHeader";
import Box from "@mui/material/Box";
import {Collapse} from "antd";

function PreliminaryNutritionPlan() {

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

    const [dayPlanList, setDayPlanList] = useState<DayPlan[]>([]);

    useEffect(() => {
        fetch(`http://localhost:8080/preliminary-nutrition-plan`)
            .then((res) => res.json())
            .then((data) => {
                const allDays: DayPlan[] = data;
                setDayPlanList(allDays);

            })
            .catch((err) => {
                console.log(err.message);
            });
    }, []);

    const onChange = (key: string | string[]) => {
        //  console.log(key);
    };

    const List = ({list}: { list: DayPlan[] }) => {

        return (
            <Box boxShadow={20}>
                <Collapse onChange={onChange}>
                    {/*{list.map((item: DayPlan) => (*/}
                    {/*    // <Panel header={calories(item.name, item.calories)}*/}
                    {/*    //        key={item.idRecipe}*/}
                    {/*    //        extra={genExtra(item)}>*/}

                    {/*        // <Box>*/}
                    {/*        //*/}
                    {/*        //     {item.meal.map((meal: Meal[]) => (*/}
                    {/*        //*/}
                    {/*        //*/}
                    {/*        //*/}
                    {/*        //*/}
                    {/*        //     ))}*/}
                    {/*        // </Box>*/}
                    {/*   // </Panel>*/}
                    {/*))}*/}
                </Collapse>
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