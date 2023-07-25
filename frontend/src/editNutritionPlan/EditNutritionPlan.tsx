import * as React from "react";
import EditNutritionPlanHeader from "./EditNutritionPlanHeader";
import {Checkbox, Form, Input, InputNumber, Select} from "antd";
import Box from "@mui/material/Box";
import {useState} from "react";

function EditNutritionPlan() {

    interface Plan {
        planName: String,
        kcal: number,
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

    const [planData, setPlanData] = React.useState<Plan>({
        planName: "",
        kcal: 0,
        numberOfDays: 0,
        breakfast: false,
        lunch: false,
        dinner: false,
        snack: false,
        supper: false,
        meal1: 100,
        meal2: 0,
        meal3: 0,
        meal4: 0,
        meal5: 0
    });


    function setProportions(plan: {
        planName: string, kcal: number, numberOfDays: number, brakfast: boolean, lunch: boolean, dinner: boolean,
        snack: boolean, supper: boolean, meal1: number, meal2: number, meal3: number,
        meal4: number, meal5: number
    }) {

        let count = 0;
        if (plan.brakfast) {
            count += 1;
        }
        if (plan.lunch) {
            count += 1;
        }
        if (plan.dinner) {
            count += 1;
        }
        if (plan.snack) {
            count += 1;
        }
        if (plan.supper) {
            count += 1;
        }

        let m1 = 0;
        let m2 = 0;
        let m3 = 0;
        let m4 = 0;
        let m5 = 0;

        if (count === 5) {
            m1 = 25;
            m2 = 10;
            m3 = 30;
            m4 = 15;
            m5 = 20;
        } else if (count === 4) {
            m1 = 30;
            m2 = 10;
            m3 = 40;
            m4 = 20;
        } else if (count === 3) {
            m1 = 30;
            m2 = 40;
            m3 = 30;
        } else if (count === 2) {
            m1 = 50;
            m2 = 50;
        } else {
            m1 = 100;
        }
        const newPlan = {
            planName: plan.planName,
            kcal: plan.kcal,
            numberOfDays: plan.numberOfDays,
            breakfast: plan.brakfast,
            lunch: plan.lunch,
            dinner: plan.dinner,
            snack: plan.snack,
            supper: plan.supper,
            meal1: m1,
            meal2: m2,
            meal3: m3,
            meal4: m4,
            meal5: m5
        }

        setPlanData(newPlan)
    }

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
                <Form.Item label="Recipe plan name">
                    <Input onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        plan.planName = e.target.value
                    }}/>
                </Form.Item>

                <Form.Item label="Daily calorific value">
                    <Input onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        plan.kcal = e.target.value
                    }}/>
                </Form.Item>

                <Form.Item label="How many days plan">
                    <Input onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        plan.numberOfDays = e.target.value
                    }}/>
                </Form.Item>

                <Checkbox
                    checked={meal1Disabled}
                    onChange={(e) => {
                        plan.brakfast = !e.target.value
                        setProportions(plan)
                        plan = planData
                        setMeal1Disabled(e.target.checked)
                    }}
                >
                    Breakfast
                </Checkbox>
                <Checkbox
                    checked={meal2Disabled}
                    onChange={(e) => {
                        plan.lunch = !e.target.value
                        setProportions(plan)
                        plan = planData
                        setMeal2Disabled(e.target.checked)
                    }}
                >
                    Lunch
                </Checkbox>
                <Checkbox
                    checked={meal3Disabled}
                    onChange={(e) => {
                        plan.dinner = !e.target.value
                        setProportions(plan)
                        plan = planData
                        setMeal3Disabled(e.target.checked)
                    }}
                >
                    Dinner
                </Checkbox>
                <Checkbox
                    checked={meal5Disabled}
                    onChange={(e) => {
                        plan.snack = !e.target.value
                        setProportions(plan)
                        plan = planData
                        setMeal5Disabled(e.target.checked)
                    }}
                >
                    Snack
                </Checkbox>
                <Checkbox
                    checked={meal4Disabled}
                    onChange={(e) => {
                        plan.supper = !e.target.value
                        setProportions(plan)
                        plan = planData
                        setMeal4Disabled(e.target.checked)
                    }}
                >
                    Supper
                </Checkbox>


                <Form.Item label="meal 1">
                    <Input disabled={!meal1Disabled}
                           defaultValue={plan.breakfast === true ? planData.meal1
                                : ""}
                           onChange={(e: React.ChangeEvent<HTMLInputElement>) => {

                           }}/>
                </Form.Item>
                <Form.Item label="meal 2">
                    <Input disabled={!meal2Disabled}
                           defaultValue={plan.lunch === true ? planData.meal2
                               : ""}
                           onChange={(e: React.ChangeEvent<HTMLInputElement>) => {

                           }}/>
                </Form.Item>
                <Form.Item label="meal 3">
                    <Input disabled={!meal3Disabled}
                           defaultValue={plan.dinner === true ? planData.meal3
                               : ""}
                           onChange={(e: React.ChangeEvent<HTMLInputElement>) => {

                           }}/>
                </Form.Item>
                <Form.Item label="meal 4">
                    <Input disabled={!meal4Disabled}
                           defaultValue={plan.snack === true ? planData.meal4
                               : ""}
                           onChange={(e: React.ChangeEvent<HTMLInputElement>) => {

                           }}/>
                </Form.Item>
                <Form.Item label="meal 5">
                    <Input disabled={!meal5Disabled}
                           defaultValue={plan.supper === true ? planData.meal5
                               : ""}
                           onChange={(e: React.ChangeEvent<HTMLInputElement>) => {

                           }}/>
                </Form.Item>

            </Form>

        </Box>
    );

    return (

        <div className="App">
            <EditNutritionPlanHeader/>

            <Data plan={planData}/>



        </div>
    );
}

export default EditNutritionPlan;