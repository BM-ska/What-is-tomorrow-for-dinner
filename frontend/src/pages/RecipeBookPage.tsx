import Box from "@mui/material/Box";
import * as React from "react";

import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import {Button, Col, Collapse, Grid, Row} from 'antd';
import {DeleteOutlined, EditOutlined, PlusCircleOutlined} from '@ant-design/icons';
import {ListItem, ListItemText} from "@mui/material";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

const recipeTmp = ['Barszcz z uszkami', 'Bigos', 'Pierogi']
const ingredientTmp = ['burak', 'uszko', 'ziemniaki']

const {Panel} = Collapse;

const onChange = (key: string | string[]) => {
    console.log(key);
};

function RecipeBookPage() {

    const genExtra = () => (
        <Box>
            <Button shape="circle" icon={<EditOutlined/>} href="/"/>
            <Button shape="circle" icon={<DeleteOutlined/>} href="/"/>
        </Box>

    );

    return (
        <div className="App">
            <Box boxShadow={20}
                 px={{xs: 3, sm: 1}}
                 py={{xs: 3, sm: 1}}
                 bgcolor="#b9e3ba">
                <Container maxWidth="xl">

                    <Row>
                        <Col span={4} xs={{ order: 1 }} sm={{ order: 1 }} md={{ order: 1 }} lg={{ order: 1 }}>
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
                        <Col span={9} xs={{ order: 2 }} sm={{ order: 2 }} md={{ order: 2 }} lg={{ order: 2 }}>

                        </Col>
                        <Col span={10} xs={{ order: 3 }} sm={{ order: 3 }} md={{ order: 3 }} lg={{ order: 3 }}>

                        </Col>
                        <Col span={1} xs={{ order: 4 }} sm={{ order: 4 }} md={{ order: 4 }} lg={{ order: 4 }}>
                            <Button shape="circle" icon={<PlusCircleOutlined/>} href="/"/>
                        </Col>
                    </Row>

                </Container>
            </Box>
            <Box>
                <Collapse onChange={onChange}>
                    {recipeTmp.map((value) => (
                        <Panel header={`${value}`} key={value} extra={genExtra()}>
                            {ingredientTmp.map((value) => (
                                <ListItem
                                    key={value}
                                    disableGutters>

                                    <ArrowRightIcon/>
                                    <ListItemText primary={`${value}`}/>
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