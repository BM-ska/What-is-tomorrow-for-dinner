import Box from "@mui/material/Box";
import * as React from "react";
import {useEffect, useState} from "react";

import {DeleteOutlined, PlusCircleOutlined} from '@ant-design/icons';
import {Button, Checkbox, Col, Form, Input, InputNumber, Row, Select, Space,} from 'antd';
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import EditRecipeHeader from "./EditRecipeHeader"
import {useLocation} from "react-router-dom"
import axios from "axios";


interface Recipe {
    idRecipe: number;
    name: string;
    fresh: number;
    category: string;
    ingredient: { idIngredient: number, name: string, amount: string, unit: string, kcal: number }[];
}

interface Ingredient {
    idIngredient: number;
    name: string;
    amount: string;
    unit: string;
    kcal: number;
}

function EditRecipePage() {

    const [recipeData, setRecipeData] = React.useState<Recipe>({
        idRecipe: 0,
        name: "",
        fresh: 1,
        category: "",
        ingredient: []
    });
    const [ingredientList, setIngredientList] = React.useState<Ingredient[]>([]);

    const idRecipe: number = Number(useLocation().pathname.slice(13));
    let defaultNameValue: String = "-1";

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        setLoading(true);
        if (idRecipe !== 0) {
            //todo popraw kiedys wysylanie nie w adresie
            fetch(`http://localhost:8080/recipe-book/${idRecipe}`)
                .then((res) => res.json())
                .then((data) => {
                    setRecipeData(data)
                    setIngredientList(data.ingredient)
                    setLoading(false);
                })
                .catch((error) => {
                    console.log(error);
                    setLoading(false);
                });
        }
    };

    const [componentDisabled, setComponentDisabled] = useState<boolean>(true);

    function newIngredient() {
        defaultNameValue = "";
        //todo zmien id
        const newList = ingredientList.concat({
            idIngredient: Math.floor(Math.random() * Number.MAX_SAFE_INTEGER),
            name: '',
            amount: '',
            unit: '',
            kcal: 0
        })

        setIngredientList(newList);
    }

    const deleteIngredient = (id: number) => {
        const newList = ingredientList.filter((item) => item.idIngredient !== id);
        setIngredientList(newList);

        const updatedRecipeData = {...recipeData, ingredient: newList};
        updateRecipeData(updatedRecipeData);
    };

    const updateRecipeData = (updatedRecipeData: Recipe) => {
        axios.put(`http://localhost:8080/recipe-book/update/recipe/${idRecipe}`, updatedRecipeData)
            .then((response) => {
                console.log('Recipe data updated successfully:', response.data);
            })
            .catch((error) => {
                console.error('Failed to update recipe data:', error);
            });
    };

//todo
// @ts-ignore
    const Data = ({recipe}) => (

        <Box boxShadow={20}
             px={{xs: 3, sm: 1}}
             py={{xs: 3, sm: 1}}
             bgcolor="#white">

            <Form
                labelCol={{span: 4}}
                wrapperCol={{span: 14}}
                layout="horizontal"
            >
                <Form.Item label="Recipe name">
                    <Input defaultValue={recipe.name === "" ? "" : recipe.name}
                           onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                               recipe.name = e.target.value
                           }}/>
                </Form.Item>


                <Form.Item label="świeżość">
                    <InputNumber defaultValue={recipe.fresh === 0 ? 0 : recipe.fresh}
                                 onChange={(e: number | null) => {
                                     if (e == null)
                                         recipe.fresh = 0
                                     else
                                         recipe.fresh = e.valueOf()
                                 }}/>

                </Form.Item>

                <Form.Item label="Category">
                    <Select
                        defaultValue={recipe.category === "" ? "" : recipe.category}
                        onChange={(e: string) => {
                            recipe.category = e.valueOf()
                        }}>
                        <Select.Option value="snack">snack</Select.Option>
                        <Select.Option value="main meal">main meal</Select.Option>
                        <Select.Option value="small meal">small meal</Select.Option>
                    </Select>
                </Form.Item>

                <Checkbox
                    checked={componentDisabled}
                    onChange={(e) => setComponentDisabled(e.target.checked)}
                >
                    Autocomplete kcal
                </Checkbox>
            </Form>


        </Box>
    );

//todo
// @ts-ignore
    const List = ({list, onRemove}) => (

        <Box
            boxShadow={20}
            px={{xs: 3, sm: 1}}
            py={{xs: 3, sm: 1}}
            bgcolor="#white">
            <Form
                layout="horizontal"
            >
                {list.map((item: { idIngredient: React.Key | null | undefined; }) => (
                    <Item key={item.idIngredient} item={item} onRemove={onRemove || newIngredient}/>
                ))}
            </Form>
        </Box>
    );

    //todo
    // @ts-ignore
    const Item = ({item, onRemove}) => (
        <Space>

            <Form.Item label="Name:">
                <Input defaultValue={defaultNameValue === "-1" ? item.name : ""}
                       onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                           item.name = e.target.value
                       }}/>
            </Form.Item>
            <Form.Item label="Amount:">
                <InputNumber defaultValue={defaultNameValue === "-1" ? item.amount : ""}
                             onChange={(e: number | null) => {
                                 if (e == null)
                                     item.amount = 0
                                 else
                                     item.amount = e.valueOf()
                             }}/>

            </Form.Item>
            <Form.Item label="Unit:">
                <Select defaultValue={defaultNameValue === "-1" ? item.unit : "g"}
                        onChange={(e: string) => {
                            item.unit = e.valueOf()
                        }}>
                    <Select.Option value="g">g</Select.Option>
                    <Select.Option value="ml">ml</Select.Option>
                    <Select.Option value="teaspoon">teaspoon</Select.Option>
                </Select>
            </Form.Item>
            <Form.Item label="Kcal:">
                <Input disabled={componentDisabled}
                    // todo autouzupełnianie kalorii z bazy
                       defaultValue={defaultNameValue === "-1" ? item.kcal : ""}
                       onChange={(e: React.ChangeEvent<HTMLInputElement>) => {

                           item.kcal = e.target.value
                       }}/>
            </Form.Item>
            <Form.Item>
                <Button shape="circle" icon={<DeleteOutlined/>} onClick={() => {
                    onRemove(item.idIngredient)
                }}/>
            </Form.Item>

        </Space>
    );

    return (

        <div className="App">
            <EditRecipeHeader recipe={recipeData} ingredient={ingredientList} idRecipe={idRecipe}/>

            <Data recipe={recipeData}/>

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
                                Ingredients
                            </Typography></Box>
                        </Col>
                        <Col span={10} xs={{order: 2}} sm={{order: 2}} md={{order: 2}} lg={{order: 2}}>
                        </Col>
                        <Col span={3} xs={{order: 3}} sm={{order: 3}} md={{order: 3}} lg={{order: 3}}>

                        </Col>
                        <Col span={1} xs={{order: 4}} sm={{order: 4}} md={{order: 4}} lg={{order: 4}}>
                            <Button shape="circle" icon={<PlusCircleOutlined/>} onClick={newIngredient}/>
                        </Col>
                    </Row>

                </Container>
            </Box>

            <List list={ingredientList} onRemove={deleteIngredient}/>
        </div>
    );
}

export default EditRecipePage;