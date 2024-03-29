import * as React from "react";
import Box from "@mui/material/Box";
import {Button, Col, Row} from "antd";
import {PlusCircleOutlined} from "@ant-design/icons";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";


interface RecipeBook {
    idRecipe: number;
    name: string;
    calories: number;
    ingredient: { idIngredient: number, name: string, amount: number, unit: string, kcal: number }[];
}

interface props {
    recipes: RecipeBook[]
}

function RecipeBookHeader({recipes}: props) {

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
                                Recipes
                            </Typography></Box>
                        </Col>
                        <Col span={12} xs={{order: 2}} sm={{order: 2}} md={{order: 2}} lg={{order: 2}}>
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
                                Energy values
                            </Typography></Box>
                        </Col>
                        <Col span={1} xs={{order: 4}} sm={{order: 4}} md={{order: 4}} lg={{order: 4}}>
                            <Button shape="circle" icon={<PlusCircleOutlined/>} href={`/recipe-book/${0}`}/>
                        </Col>
                    </Row>

                </Container>
            </Box>
        </div>
    );
}

export default RecipeBookHeader;