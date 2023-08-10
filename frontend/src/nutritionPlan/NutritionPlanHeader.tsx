import * as React from "react";
import Box from "@mui/material/Box";
import {Button, Col, Row} from "antd";
import {ReadOutlined, ShoppingCartOutlined} from "@ant-design/icons";
import Container from "@mui/material/Container";
import ShoppingList from "../shoppingList/ShoppingList";


function NutritionPlanHeader() {
    return (
        <div className="App">
            <Box px={{xs: 3, sm: 1}} py={{xs: 3, sm: 1}} bgcolor="#b9e3ba">
                <Container maxWidth="xl">
                    <Row justify="end">
                        <Col span={10} xs={{order: 1}} sm={{order: 1}} md={{order: 1}} lg={{order: 1}}>
                        </Col>
                        <Col span={10} xs={{order: 2}} sm={{order: 2}} md={{order: 2}} lg={{order: 2}}>
                        </Col>
                        <Col span={1} xs={{order: 3}} sm={{order: 3}} md={{order: 3}} lg={{order: 3}}>
                            <Button shape="circle" icon={<ReadOutlined/>} href={`/your-plans/1/description`}/>
                        </Col>
                        <Col span={1} xs={{order: 4}} sm={{order: 4}} md={{order: 4}} lg={{order: 4}}>
                            <Button shape="circle" icon={<ShoppingCartOutlined/>} href={`/your-plans/1/shopping-list`}/>
                        </Col>
                    </Row>
                </Container>
            </Box>
        </div>
    );
}

export default NutritionPlanHeader;