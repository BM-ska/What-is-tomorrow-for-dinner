import * as React from "react";
import Box from "@mui/material/Box";
import {Button, Col, Row} from "antd";
import {SaveOutlined} from "@ant-design/icons";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
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

interface props {
    recipe: Recipe
    ingredient: Ingredient[]
    idRecipe: number
}

function EditRecipeHeader({recipe, ingredient, idRecipe}: props) {

    function saveRecipe(recipe: Recipe, ingredient: Ingredient[]) {

        //todo id
        const updatedRecipeData: Recipe = {
            idRecipe: (recipe.idRecipe === 0 ? Math.random() * Number.MAX_SAFE_INTEGER : recipe.idRecipe),
            name: recipe.name,
            fresh: recipe.fresh,
            category: recipe.category,
            ingredient: ingredient
        }

        updateRecipeData(updatedRecipeData);
    }

    const updateRecipeData = (updatedRecipeData: Recipe) => {
        const token = localStorage.getItem('token');
        if (token) {
            axios.put(`http://localhost:8080/recipe-book/update/recipe/${idRecipe}`, updatedRecipeData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then((response) => {
                    console.log('Recipe data updated successfully:', response.data);
                })
                .catch((error) => {
                    console.error('Failed to update recipe data:', error);
                });
        } else {
            console.log('Token not found in localStorage');
            window.location.href = "http://localhost:3000/sign-in";
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
                                Edit the recipe
                            </Typography></Box>
                        </Col>
                        <Col span={10} xs={{order: 2}} sm={{order: 2}} md={{order: 2}} lg={{order: 2}}>
                        </Col>
                        <Col span={3} xs={{order: 3}} sm={{order: 3}} md={{order: 3}} lg={{order: 3}}>

                        </Col>
                        <Col span={1} xs={{order: 4}} sm={{order: 4}} md={{order: 4}} lg={{order: 4}}>
                            <Button shape="circle" icon={<SaveOutlined/>}
                                    onClick={() => saveRecipe(recipe, ingredient)}/>
                        </Col>
                    </Row>

                </Container>
            </Box>
        </div>
    );
}

export default EditRecipeHeader;