import * as React from "react";
import Box from "@mui/material/Box";
import {Button, Col, Row} from "antd";
import {SaveOutlined} from "@ant-design/icons";
import Container from "@mui/material/Container";
import axios from "axios";
import {useLocation} from "react-router-dom";

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
    ingredient: Ingredient[];
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

interface props {
    dayPlanList: DayPlan[]
}

function PreliminaryNutritionPlanHeader({dayPlanList}: props) {

    const idPlan: number = Number(useLocation().pathname.slice(23));

    const savePlan = (dayPlanList: DayPlan[]) => {
        const token = localStorage.getItem('token');
        if (token) {
            axios.put(`http://34.116.180.131:8080/nutrition-plan/preliminary/${idPlan}/save`, dayPlanList, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then((response) => {
                    console.log('New finished nutrition-plan data updated successfully:', response.data);
                })
                .catch((error) => {
                    console.error('Failed to update new finished nutrition-plan:', error);
                });
        } else {
            console.log('Token not found in localStorage');
            window.location.href = "http://34.116.180.131:3000/sign-in";
        }


    };

    return (
        <div className="App">
            <Box
                px={{xs: 3, sm: 1}}
                py={{xs: 3, sm: 1}}
                bgcolor="#b9e3ba">
                <Container maxWidth="xl">

                    <Row>
                        <Col span={10} xs={{order: 1}} sm={{order: 1}} md={{order: 1}} lg={{order: 1}}>
                        </Col>
                        <Col span={10} xs={{order: 2}} sm={{order: 2}} md={{order: 2}} lg={{order: 2}}>
                        </Col>
                        <Col span={3} xs={{order: 3}} sm={{order: 3}} md={{order: 3}} lg={{order: 3}}>

                        </Col>
                        <Col span={1} xs={{order: 4}} sm={{order: 4}} md={{order: 4}} lg={{order: 4}}>
                            <Button shape="circle" icon={<SaveOutlined/>} onClick={() => savePlan(dayPlanList)}/>
                        </Col>
                    </Row>

                </Container>
            </Box>
        </div>
    );
}

export default PreliminaryNutritionPlanHeader;