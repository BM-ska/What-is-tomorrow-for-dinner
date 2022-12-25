import Box from "@mui/material/Box";
import * as React from "react";

import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import {Button, Col, Collapse, Form, Input, InputNumber, Row, Select, Space} from 'antd';
import {DeleteOutlined, EditOutlined, PlusCircleOutlined} from '@ant-design/icons';
import {ListItem, ListItemText} from "@mui/material";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import RecipeBookHeader from "../components/RecipeBookHeader";

const recipeTmp = ['Barszcz', 'Bigos', 'Pierogi']
const ingredientTmp = ['burak', 'woda', 'ziemniak']

const initialRecipeListTMP = [
    {
        id: 'a',
        name: 'Barszcz',
    },
    {
        id: 'b',
        name: 'Bigos',
    },
    {
        id: 'c',
        name: 'Pierogi',
    }

];

// const amountRecipesInBarszczTmp = new Map<string, Object>([
//     ["burak", [500,"g"]],
//     ["woda", [500,"ml"]],
//     ["ziemniak", [200,"g"]]
// ]);

const amountRecipesInBarszczTmp = new Map<string, number>([
    ["burak", 500],
    ["woda", 24],
    ["ziemniak", 2354]
]);

function ConfirmDelete(s: string) {
    if (window.confirm("Are you sure you want to delete " + s + " from your recipe book?")) {

    }
}


const {Panel} = Collapse;

const onChange = (key: string | string[]) => {
    console.log(key);
};

function RecipeBookPage() {

    const [list, setList] = React.useState(initialRecipeListTMP);

    function saveRecipe() {


    }

    function deleteRecipe(id: string) {

    }

    // const List = ({list, onRemove}) => (
    //
    //     <Box>
    //     </Box>
    // );
    //
    // const Item = ({item, onRemove}) => (
    //     <Box>
    //     </Box>
    // );


    const genExtra = (mealName: string) => (
        <Box>
            <Button shape="circle" icon={<EditOutlined/>} href={`/${mealName}`}/>
            <Button shape="circle" icon={<DeleteOutlined/>} onClick={() => {
                ConfirmDelete(mealName)
            }}/>
        </Box>

    );

    const calories = (mealName: string, kcal: number) => (
        <Row>
            <Col span={11} xs={{order: 1}} sm={{order: 1}} md={{order: 1}} lg={{order: 1}}>
                {mealName}
            </Col>
            <Col span={13} xs={{order: 2}} sm={{order: 2}} md={{order: 2}} lg={{order: 2}}>
                {kcal} kcal/100g
            </Col>
        </Row>


    );

    return (
        <div className="App">

            <RecipeBookHeader/>

            <Box boxShadow={20}>
                <Collapse onChange={onChange}>
                    {recipeTmp.map((value) => (
                        <Panel header={calories(`${value}`, 1234)}
                               key={value}
                               extra={genExtra(`${value}`)}>
                            {ingredientTmp.map((value) => (
                                <ListItem
                                    key={value}
                                    disableGutters>


                                    <Col span={1} xs={{order: 1}} sm={{order: 1}} md={{order: 1}} lg={{order: 1}}>
                                        <ArrowRightIcon/>
                                    </Col>
                                    <Col span={1} xs={{order: 2}} sm={{order: 2}} md={{order: 2}} lg={{order: 2}}>
                                        {amountRecipesInBarszczTmp.get(`${value}`)}

                                    </Col>
                                    <Col span={1} xs={{order: 3}} sm={{order: 3}} md={{order: 3}} lg={{order: 3}}>
                                        g
                                    </Col>
                                    <Col span={21} xs={{order: 4}} sm={{order: 4}} md={{order: 4}} lg={{order: 4}}>
                                        <ListItemText primary={`${value}`}/>
                                    </Col>


                                </ListItem>
                            ))}
                        </Panel>
                    ))}
                </Collapse>
            </Box>
        </div>
    );
}

export default RecipeBookPage;