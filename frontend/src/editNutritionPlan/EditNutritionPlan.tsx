import * as React from "react";
import {useState} from "react";
import EditNutritionPlanHeader from "./EditNutritionPlanHeader";
import {Checkbox, Col, Form, Input, InputNumber, Row} from "antd";
import Box from "@mui/material/Box";

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

function EditNutritionPlan() {
    const [planData, setPlanData] = React.useState<Plan>({
        planName: "",
        kcal: [["", 0], ["", 0], ["", 0], ["", 0], ["", 0]],
        numberOfDays: 0,
        breakfast: false,
        lunch: false,
        dinner: false,
        snack: false,
        supper: false,
        meal1: 25,
        meal2: 10,
        meal3: 30,
        meal4: 15,
        meal5: 20
    });

    const [meal1Disabled, setMeal1Disabled] = useState<boolean>(false);
    const [meal2Disabled, setMeal2Disabled] = useState<boolean>(false);
    const [meal3Disabled, setMeal3Disabled] = useState<boolean>(false);
    const [meal4Disabled, setMeal4Disabled] = useState<boolean>(false);
    const [meal5Disabled, setMeal5Disabled] = useState<boolean>(false);

    // @ts-ignore
    const Data = ({plan}) => (

        <Box boxShadow={20}
             px={{xs: 3, sm: 1}}
             py={{xs: 3, sm: 1}}
             bgcolor="#white">

            <Form
                labelCol={{span: 4}}
                wrapperCol={{span: 14}}
                layout="horizontal"
            >
                <Form.Item>
                    <span>Recipe plan name: </span>
                    <Input defaultValue={plan.planName === "" ? "" : plan.planName}
                           onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                               plan.planName = e.target.value
                           }}/>

                </Form.Item>

                <Form.Item>
                    <span>Daily calorific value, person 1: </span>
                    <Row gutter={8}>
                        <Col span={12}>
                            <Input defaultValue={plan.kcal[0][0] === "" ? "" : plan.kcal[0][0]}
                                   onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                       plan.kcal[0][0] = e.target.value
                                   }}/>
                        </Col>
                        <Col span={6}>
                            <InputNumber defaultValue={plan.kcal[0][1] === 0 ? 0 : plan.kcal[0][1]}
                                         onChange={(e: number | null) => {
                                             if (e == null)
                                                 plan.kcal[0][1] = 0
                                             else
                                                 plan.kcal[0][1] = e.valueOf()
                                         }}/>
                        </Col>
                    </Row>
                </Form.Item>

                <Form.Item>
                    <span>Daily calorific value, person 2: </span>
                    <Row gutter={8}>
                        <Col span={12}>
                            <Input defaultValue={plan.kcal[1][0] === "" ? "" : plan.kcal[1][0]}
                                   onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                       plan.kcal[1][0] = e.target.value
                                   }}/>
                        </Col>
                        <Col span={6}>
                            <InputNumber defaultValue={plan.kcal[1][1] === 0 ? 0 : plan.kcal[1][1]}
                                         onChange={(e: number | null) => {
                                             if (e == null)
                                                 plan.kcal[1][1] = 0
                                             else
                                                 plan.kcal[1][1] = e.valueOf()
                                         }}/>
                        </Col>
                    </Row>
                </Form.Item>

                <Form.Item>
                    <span>Daily calorific value, person 3: </span>
                    <Row gutter={8}>
                        <Col span={12}>
                            <Input defaultValue={plan.kcal[2][0] === "" ? "" : plan.kcal[2][0]}
                                   onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                       plan.kcal[2][0] = e.target.value
                                   }}/>
                        </Col>
                        <Col span={6}>
                            <InputNumber defaultValue={plan.kcal[2][1] === 0 ? 0 : plan.kcal[2][1]}
                                         onChange={(e: number | null) => {
                                             if (e == null)
                                                 plan.kcal[2][1] = 0
                                             else
                                                 plan.kcal[2][1] = e.valueOf()
                                         }}/>
                        </Col>
                    </Row>
                </Form.Item>

                <Form.Item>
                    <span>Daily calorific value, person 4: </span>
                    <Row gutter={8}>
                        <Col span={12}>
                            <Input defaultValue={plan.kcal[3][0] === "" ? "" : plan.kcal[3][0]}
                                   onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                       plan.kcal[3][0] = e.target.value
                                   }}/>
                        </Col>
                        <Col span={6}>
                            <InputNumber defaultValue={plan.kcal[3][1] === 0 ? 0 : plan.kcal[3][1]}
                                         onChange={(e: number | null) => {
                                             if (e == null)
                                                 plan.kcal[3][1] = 0
                                             else
                                                 plan.kcal[3][1] = e.valueOf()
                                         }}/>
                        </Col>
                    </Row>
                </Form.Item>

                <Form.Item>
                    <span>Daily calorific value, person 5: </span>
                    <Row gutter={8}>
                        <Col span={12}>
                            <Input defaultValue={plan.kcal[4][0] === "" ? "" : plan.kcal[4][0]}
                                   onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                       plan.kcal[4][0] = e.target.value
                                   }}/>
                        </Col>
                        <Col span={6}>
                            <InputNumber defaultValue={plan.kcal[4][1] === 0 ? 0 : plan.kcal[4][1]}
                                         onChange={(e: number | null) => {
                                             if (e == null)
                                                 plan.kcal[4][1] = 0
                                             else
                                                 plan.kcal[4][1] = e.valueOf()
                                         }}/>
                        </Col>
                    </Row>
                </Form.Item>

                <Form.Item >
                    <span>How many days plan: </span>
                    <InputNumber defaultValue={plan.numberOfDays === 0 ? 0 : plan.numberOfDays}
                                 onChange={(e: number | null) => {
                                     if (e == null)
                                         plan.numberOfDays = 0
                                     else
                                         plan.numberOfDays = e.valueOf()
                                 }}/>

                </Form.Item>

                <Checkbox
                    checked={meal1Disabled}
                    onChange={(e) => {
                        setMeal1Disabled(e.target.checked)
                        plan.breakfast = !meal1Disabled
                    }}
                >
                    Breakfast
                </Checkbox>
                <Checkbox
                    checked={meal2Disabled}
                    onChange={(e) => {
                        setMeal2Disabled(e.target.checked)
                        plan.lunch = !meal2Disabled
                    }}
                >
                    Lunch
                </Checkbox>
                <Checkbox
                    checked={meal3Disabled}
                    onChange={(e) => {
                        setMeal3Disabled(e.target.checked)
                        plan.dinner = !meal3Disabled
                    }}
                >
                    Dinner
                </Checkbox>
                <Checkbox
                    checked={meal4Disabled}
                    onChange={(e) => {
                        setMeal4Disabled(e.target.checked)
                        plan.snack = !meal4Disabled
                    }}
                >
                    Snack
                </Checkbox>
                <Checkbox
                    checked={meal5Disabled}
                    onChange={(e) => {
                        setMeal5Disabled(e.target.checked)
                        plan.supper = !meal5Disabled
                    }}
                >
                    Supper
                </Checkbox>

                <Form.Item label="meal 1">
                    <Input disabled={!meal1Disabled}
                           defaultValue={plan.meal1 === "" ? "" : plan.meal1}
                           onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                               plan.meal1 = e.target.value
                           }}/>
                </Form.Item>
                <Form.Item label="meal 2">
                    <Input disabled={!meal2Disabled}
                           defaultValue={plan.meal2 === "" ? "" : plan.meal2}
                           onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                               plan.meal2 = e.target.value
                           }}/>
                </Form.Item>
                <Form.Item label="meal 3">
                    <Input disabled={!meal3Disabled}
                           defaultValue={plan.meal3 === "" ? "" : plan.meal3}
                           onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                               plan.meal3 = e.target.value
                           }}/>
                </Form.Item>
                <Form.Item label="meal 4">
                    <Input disabled={!meal4Disabled}
                           defaultValue={plan.meal4 === "" ? "" : plan.meal4}
                           onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                               plan.meal4 = e.target.value
                           }}/>
                </Form.Item>
                <Form.Item label="meal 5">
                    <Input disabled={!meal5Disabled}
                           defaultValue={plan.meal5 === "" ? "" : plan.meal5}
                           onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                               plan.meal5 = e.target.value
                           }}/>
                </Form.Item>

            </Form>

        </Box>
    );

    return (

        <div className="App">
            <EditNutritionPlanHeader plan={planData}/>
            <Data plan={planData}/>
        </div>
    );
}

export default EditNutritionPlan;