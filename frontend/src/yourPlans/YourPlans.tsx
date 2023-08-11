import * as React from "react";
import {CSSProperties, useEffect, useState} from "react";
import YourPlansHeader from "./YourPlansHeader";
import {Button, Collapse} from "antd";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";


interface NutritionPlan {
    planId: number,
    planName: String,
    numberOfDays: number,
}

interface ButtonListProps {
    nutritionPlans: NutritionPlan[];
}

const nutritrionPlanTMP: NutritionPlan[] = [
    {
        planId: 1,
        planName: "plan na ten tydzien",
        numberOfDays: 1
    },
    {
        planId: 2,
        planName: "plan dla Jacka",
        numberOfDays: 2
    },
    {
        planId: 3,
        planName: "plan",
        numberOfDays: 1
    },
    {
        planId: 4,
        planName: "plan dla Ani",
        numberOfDays: 2
    }
];

function YourPlans() {
    const [nutritionPlanList, setNutritionPlanList] = useState<NutritionPlan[]>([]);


    useEffect(() => {
        fetch(`http://localhost:8080/your-plans`)
            .then((res) => res.json())
            .then((data) => {
                const nutritrionPlan: NutritionPlan[] = data;
                setNutritionPlanList(nutritrionPlan);
            })
            .catch((err) => {
                console.log(err.message);
            });
    }, []);

    const buttonStyle = {
        width: "90%",
        marginBottom: "10px",
        backgroundColor: "#b9e3ba",
    };
    const buttonListStyle: CSSProperties = {
        marginTop: "20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    };

    const ButtonList: React.FC<ButtonListProps> = ({ nutritionPlans }) => {
        return (
            <div style={buttonListStyle}>
                {nutritionPlans.map((plan) => (
                    <Button
                        key={plan.planId}
                        type="primary"
                        style={buttonStyle}
                        href={`/your-plans/${plan.planId}`}
                    >
                        <Box><Typography
                            variant="h6"
                            noWrap
                            sx={{
                                mr: 2,
                                display: {xs: 'none', md: 'flex'},
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'white',
                                textDecoration: 'none',
                                fontSize: 14
                            }}
                        >
                            {plan.planName}
                        </Typography></Box>

                    </Button>
                ))}
            </div>
        );
    };

    return (
        <div className="App">
            {<YourPlansHeader/>}
            <ButtonList nutritionPlans={nutritionPlanList}/>
        </div>
    );
}

export default YourPlans;