import Box from "@mui/material/Box";
import * as React from "react";
import {useEffect, useState} from "react";

import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import {Button, Col, Collapse, Row} from 'antd';
import {DeleteOutlined, EditOutlined} from '@ant-design/icons';
import {ListItem, ListItemText} from "@mui/material";
import RecipeBookHeader from "../components/RecipeBookHeader";


const {Panel} = Collapse;

const onChange = (key: string | string[]) => {
    //  console.log(key);
};

interface RecipeBook {
    id: string;
    name: string;
    calories: number;
    ingredient: { id: string, name: string, amount: string, unit: string }[];
}

function RecipeBookPage() {

    const [recipeBookList, setRecipeBookList] = useState<RecipeBook[]>([]);

    useEffect(() => {
        fetch(`http://localhost:8080/recipe-book`)
            .then((res) => res.json())
            .then((data) => {
                const allCourses: RecipeBook[] = data;
                setRecipeBookList(allCourses);

            })
            .catch((err) => {
                console.log(err.message);
            });
    }, []);

    function ConfirmDelete(item: {
        id: string, name: string, calories: number,
        ingredient: { id: string, name: string, amount: string, unit: string }[]
    }) {
        if (window.confirm("Are you sure you want to delete " + item.name + " from your recipe book?")) {
            deleteRecipe(item.id)
        }
    }

    function deleteRecipe(id: string) {
        const newList = recipeBookList.filter((item) => item.id !== id);
        setRecipeBookList(newList);


    }

    // @ts-ignore
    const List = ({list, onRemove}) => (

        <Box boxShadow={20}>
            <Collapse onChange={onChange}>
                {list.map((item: RecipeBook) => (
                    <Panel header={calories(item.name, item.calories)}
                           key={item.id}
                           extra={genExtra(item)}>

                        <Box>

                            {item.ingredient.map((i: { id: string, name: string, amount: string, unit: string }) => (

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
                        </Box>
                    </Panel>
                ))}
            </Collapse>
        </Box>
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

            <RecipeBookHeader recipes={recipeBookList}/>

            <List list={recipeBookList} onRemove={deleteRecipe}/>

        </div>
    );
}

export default RecipeBookPage;