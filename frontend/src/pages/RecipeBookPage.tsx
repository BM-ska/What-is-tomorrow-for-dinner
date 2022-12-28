import Box from "@mui/material/Box";
import * as React from "react";

import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import {Button, Col, Collapse, Row} from 'antd';
import {DeleteOutlined, EditOutlined} from '@ant-design/icons';
import {ListItem, ListItemText} from "@mui/material";
import RecipeBookHeader from "../components/RecipeBookHeader";

const initialRecipeListTMP = [
    {
        id: 'a',
        name: 'Barszcz',
        calories: 1234,
        ingredient: [
            {
                id: "a",
                name: "burak",
                amount: '200',
                unit: 'g',
            },
            {
                id: "aa",
                name: "woda",
                amount: '200',
                unit: 'g',
            },
            {
                id: "aaa",
                name: "ziemniak",
                amount: '200',
                unit: 'g',
            }
        ]
    },
    {
        id: 'b',
        name: 'Bigos',
        calories: 1,
        ingredient: [
            {
                id: "a",
                name: "burak",
                amount: '200',
                unit: 'g'
            }
        ]
    },
    {
        id: 'c',
        name: 'Pierogi',
        calories: 12,
        ingredient: [
            {
                id: "a",
                name: "burak",
                amount: '200',
                unit: 'g'
            }
        ]
    }

];


const {Panel} = Collapse;

const onChange = (key: string | string[]) => {
    //  console.log(key);
};


function RecipeBookPage() {
    function ConfirmDelete(item: {
        id: string, name: string, calories: number,
        ingredient: { id: string, name: string, amount: string, unit: string }[]
    }) {
        if (window.confirm("Are you sure you want to delete " + item.name + " from your recipe book?")) {
            deleteRecipe(item.id)
        }
    }

    const [recipelist, setList] = React.useState(initialRecipeListTMP);

    function deleteRecipe(id: string) {
        const newList = recipelist.filter((item) => item.id !== id);
        setList(newList);
    }

    // @ts-ignore
    const List = ({list, onRemove}) => (

        <Box boxShadow={20}>
            <Collapse onChange={onChange}>
                {list.map((item: { id: string, name: string, calories: number, ingredient: { id: string, name: string, amount: string, unit: string }[] }) => (
                    <Panel header={calories(item.name, item.calories)}
                           key={item.id}
                           extra={genExtra(item)}>


                        {/*@ts-ignore*/}
                        <Item id={item.id} name={item.name} calories={item.calories}
                              ingredient={item.ingredient}> </Item>
                    </Panel>
                ))}
            </Collapse>
        </Box>
    );


    // @ts-ignore
    const Item = ((item: {
            id: string, name: string, calories: number,
            ingredient: { id: string, name: string, amount: string, unit: string }[]
        }) => (
            <Box>
                {item.ingredient.map((i) => (
                    <ListItem
                        key={i.id}
                        disableGutters>


                        <Col span={1} xs={{order: 1}} sm={{order: 1}} md={{order: 1}} lg={{order: 1}}>
                            <ArrowRightIcon/>
                        </Col>
                        <Col span={2} xs={{order: 2}} sm={{order: 2}} md={{order: 2}} lg={{order: 2}}>

                            <ListItemText primary={i.name}/>

                        </Col>
                        <Col span={2} xs={{order: 3}} sm={{order: 3}} md={{order: 3}} lg={{order: 3}}>
                            <ListItemText primary={i.amount}/>
                        </Col>
                        <Col span={18} xs={{order: 4}} sm={{order: 4}} md={{order: 4}} lg={{order: 4}}>
                            <ListItemText primary={i.unit}/>
                        </Col>


                    </ListItem>
                ))}
            </Box>)
    );

//todo inaczej przekazuj id
    const genExtra = (item: {
        id: string, name: string, calories: number,
        ingredient: { id: string, name: string, amount: string, unit: string }[]
    }) => (
        <Box>
            <Button shape="circle" icon={<EditOutlined/>} href={`/recipe-book/${item.id}`}/>
            <Button shape="circle" icon={<DeleteOutlined/>} onClick={() => {
                ConfirmDelete(item)
            }}/>
        </Box>

    );

    const calories = (name: string, kcal: number) => (
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

            <RecipeBookHeader recipes={recipelist}/>

            <List list={recipelist} onRemove={deleteRecipe}/>

        </div>
    );
}

export default RecipeBookPage;