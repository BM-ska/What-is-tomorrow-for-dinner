import * as React from "react";
import {CSSProperties, useEffect, useState} from "react";
import YourPlansHeader from "./YourPlansHeader";
import {Button} from "antd";
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

function YourPlans() {
    const [nutritionPlanList, setNutritionPlanList] = useState<NutritionPlan[]>([]);


    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            fetch(`http://localhost:8080/your-plans`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then((res) => res.json())
                .then((data) => {
                    const nutritrionPlan: NutritionPlan[] = data;
                    setNutritionPlanList(nutritrionPlan);
                })
                .catch((err) => {
                    console.log(err.message);
                });
        } else {
            console.log('Token not found in localStorage');
            window.location.href = "http://localhost:3000/sign-in";
        }

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

    const ButtonList: React.FC<ButtonListProps> = ({nutritionPlans}) => {
        return (
            <div style={buttonListStyle}>
                {nutritionPlans.map((plan) => (
                    <Button
                        key={plan.planId}
                        type="primary"
                        style={buttonStyle}
                        href={`/your-plans/${plan.planId}`}
                    >
                        <Box>
                            <Typography
                                variant="h6"
                                noWrap
                                sx={{
                                    fontFamily: 'monospace',
                                    fontWeight: 700,
                                    letterSpacing: '.3rem',
                                    color: 'white',
                                    textDecoration: 'none',
                                    fontSize: 14,
                                    textAlign: 'center',
                                }}
                            >
                                {plan.planName}
                            </Typography>
                        </Box>
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