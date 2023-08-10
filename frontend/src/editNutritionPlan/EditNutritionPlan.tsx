import * as React from "react";
import {useState} from "react";
import EditNutritionPlanHeader from "./EditNutritionPlanHeader";
import {Checkbox, Form, Input} from "antd";
import Box from "@mui/material/Box";

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
        meal1: 0,
        meal2: 0,
        meal3: 0,
        meal4: 0,
        meal5: 0
    });


    function setProportions(plan: {
        planName: string, kcal: number, numberOfDays: number, breakfast: boolean, lunch: boolean, dinner: boolean,
        snack: boolean, supper: boolean, meal1: number, meal2: number, meal3: number,
        meal4: number, meal5: number
    }) {

        const newPlan = {
            planName: plan.planName,
            kcal: plan.kcal,
            numberOfDays: plan.numberOfDays,
            breakfast: plan.breakfast,
            lunch: plan.lunch,
            dinner: plan.dinner,
            snack: plan.snack,
            supper: plan.supper,
            meal1: plan.meal1,
            meal2: plan.meal2,
            meal3: plan.meal3,
            meal4: plan.meal4,
            meal5: plan.meal5
        }

        if (plan.breakfast) {
            newPlan.meal1 = 25;
        }
        if (plan.lunch) {
            newPlan.meal2 = 10;
        }
        if (plan.dinner) {
            newPlan.meal3 = 30;
        }
        if (plan.snack) {
            newPlan.meal4 = 15;
        }
        if (plan.supper) {
            newPlan.meal5 = 20;
        }

        setPlanData(newPlan);
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
                    onChange={(e1) => {
                        plan.breakfast = !e1.target.value
                        setProportions(plan)
                        plan = planData
                        setMeal1Disabled(e1.target.checked)
                    }}
                >
                    Breakfast
                </Checkbox>
                <Checkbox
                    checked={meal2Disabled}
                    onChange={(e2) => {
                        plan.lunch = !e2.target.value
                        setProportions(plan)
                        plan = planData
                        setMeal2Disabled(e2.target.checked)
                    }}
                >
                    Lunch
                </Checkbox>
                <Checkbox
                    checked={meal3Disabled}
                    onChange={(e3) => {
                        plan.dinner = !e3.target.value
                        setProportions(plan)
                        plan = planData
                        setMeal3Disabled(e3.target.checked)
                    }}
                >
                    Dinner
                </Checkbox>
                <Checkbox
                    checked={meal4Disabled}
                    onChange={(e4) => {
                        plan.snack = !e4.target.value
                        setProportions(plan)
                        plan = planData
                        setMeal4Disabled(e4.target.checked)
                    }}
                >
                    Snack
                </Checkbox>
                <Checkbox
                    checked={meal5Disabled}
                    onChange={(e5) => {
                        plan.supper = !e5.target.value
                        setProportions(plan)
                        plan = planData
                        setMeal5Disabled(e5.target.checked)
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