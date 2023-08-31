import * as React from "react";
import Box from "@mui/material/Box";
import {Button, Col, Row} from "antd";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import CreateIcon from '@mui/icons-material/Create';
import axios from "axios";

interface Plan {
    planName: String,
    kcal: Array<[string, number]>,
    numberOfDays: number,
    breakfast: boolean,
    lunch: boolean,
    dinner: boolean,
    snack: boolean,
    supper: boolean,
    meal1: number,
    meal2: number,
    meal3: number,
    meal4: number,
    meal5: number
}

interface props {
    plan: Plan
}

function EditNutritionPlanHeader({plan}: props) {

    const deleteUndeclaredUsers = (p: Plan): Plan => {
        const filteredKcal = p.kcal.filter(([stringValue, numberValue]) => stringValue !== "" && numberValue !== 0);
        return {...p, kcal: filteredKcal};
    }

    const saveSettings = (plan: Plan) => {
        const newPlan = deleteUndeclaredUsers(plan)
        const token = localStorage.getItem('token');
        if (token) {
            axios.put(`http://34.116.180.131:8080/nutrition-plan/create`, newPlan, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            })
                .then((response) => {
                    console.log('New nutrition-plan data updated successfully:', response.data);
                    window.location.href = `http://34.116.180.131:3000/edit-preliminary-plan/${response.data}`;
                })
                .catch((error) => {
                    console.error('Failed to update new nutrition-plan:', error);
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
                                Edit the nutrition plan
                            </Typography></Box>
                        </Col>
                        <Col span={12} xs={{order: 2}} sm={{order: 2}} md={{order: 2}} lg={{order: 2}}>
                        </Col>
                        <Col span={1} xs={{order: 3}} sm={{order: 3}} md={{order: 3}} lg={{order: 3}}>
                        </Col>
                        <Col span={1} xs={{order: 4}} sm={{order: 4}} md={{order: 4}} lg={{order: 4}}>
                            <Button shape="circle" icon={<CreateIcon/>} onClick={() => saveSettings(plan)}/>
                        </Col>
                    </Row>

                </Container>
            </Box>
        </div>
    );
}

export default EditNutritionPlanHeader;