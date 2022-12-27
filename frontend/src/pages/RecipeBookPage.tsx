import Box from "@mui/material/Box";
import * as React from "react";

import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import {Button, Col, Collapse, Row} from 'antd';
import {DeleteOutlined, EditOutlined} from '@ant-design/icons';
import {ListItem, ListItemText} from "@mui/material";
import RecipeBookHeader from "../components/RecipeBookHeader";

const recipeTmp = ['Barszcz', 'Bigos', 'Pierogi']
const ingredientTmp = ['burak', 'woda', 'ziemniak']

const initialRecipeListTMP = [
    {
        id: 'a',
        name: 'Barszcz',
        calories : 1234
    },
    {
        id: 'b',
        name: 'Bigos',
        calories : 1
    },
    {
        id: 'c',
        name: 'Pierogi',
        calories : 12
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




const {Panel} = Collapse;

const onChange = (key: string | string[]) => {
    console.log(key);
};

function RecipeBookPage() {
    function ConfirmDelete(item : {id : string, name : string, calories : number}) {
        if (window.confirm("Are you sure you want to delete " + item.name + " from your recipe book?")) {
            deleteRecipe(item.id)
        }
    }

    const [list, setList] = React.useState(initialRecipeListTMP);

    function saveRecipe() {


    }

    function deleteRecipe(id: string) {
        console.log("aaaaaaaaaaaaaaaaaaaaaa")
    }
    // @ts-ignore
    const List = ({list, onRemove}) => (

        <Box boxShadow={20}>
            <Collapse onChange={onChange}>
                {list.map((item:{id : string, name : string, calories : number}) => (
                    <Item key={item.id} item={item} onRemove={onRemove}/>
                ))}
            </Collapse>
        </Box>
    );


    // @ts-ignore
    const Item = ({item, onRemove}) => (
        // @ts-ignore
        <Panel header={calories(item.name, item.calories)}
               key={item.id}
               extra={genExtra(item.name)}>
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
    );


    const genExtra = (item :{id : string, name : string, calories : number}) => (
        <Box>
            <Button shape="circle" icon={<EditOutlined/>} href={`/${item.name}`}/>
            <Button shape="circle" icon={<DeleteOutlined/>} onClick={() => {
                ConfirmDelete(item)
            }}/>
        </Box>

    );

    const calories = (name : string, kcal : number) => (
        <Row>
            <Col span={11} xs={{order: 1}} sm={{order: 1}} md={{order: 1}} lg={{order: 1}}>
                {name}
            </Col>
            <Col span={13} xs={{order: 2}} sm={{order: 2}} md={{order: 2}} lg={{order: 2}}>
                {kcal} kcal/100g
            </Col>
        </Row>


    );

    return (
        <div className="App">

            <RecipeBookHeader/>

            <List list={list} onRemove={deleteRecipe}/>

        </div>
    );
}

export default RecipeBookPage;