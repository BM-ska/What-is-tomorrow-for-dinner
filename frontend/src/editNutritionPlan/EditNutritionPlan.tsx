import * as React from "react";
import EditNutritionPlanHeader from "./EditNutritionPlanHeader";
import {Form} from "antd";
import Box from "@mui/material/Box";

function EditNutritionPlan() {

    const initialPlanTMP = {
        planName: "",
        kcal: 0,
        brakfast: false,
        lunch: false,
        dinner: false,
        snack: false,
        supper: false,
        meal1: 100,
        meal2: 0,
        meal3: 0,
        meal4: 0,
        meal5: 0
    };

    function setProportions(plan: {
        planName: string, kcal: number, brakfast: boolean, lunch: boolean, dinner: boolean,
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

        return {
            planName: plan.planName,
            kcal: plan.kcal,
            brakfast: plan.brakfast,
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
    }

    return (

        <div className="App">
            <EditNutritionPlanHeader/>

            <Box boxShadow={20}
                 px={{xs: 3, sm: 1}}
                 py={{xs: 3, sm: 1}}
                 bgcolor="#white">

                <Form
                    labelCol={{span: 4}}
                    wrapperCol={{span: 14}}
                    layout="horizontal"
                >

                </Form>


            </Box>

        </div>
    );
}

export default EditNutritionPlan;