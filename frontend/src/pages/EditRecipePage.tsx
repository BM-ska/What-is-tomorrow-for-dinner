import Box from "@mui/material/Box";
import * as React from "react";
import {useParams} from "react-router-dom";

import {DeleteOutlined, PlusCircleOutlined, SaveOutlined} from '@ant-design/icons';
import {Button, Col, Form, Input, InputNumber, Row, Select, Space,} from 'antd';
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

const EditRecipePage = () => {

    let defaultNameValue: String = "-1";
    const {recipeName} = useParams();

    const initialListTMP = [
        {
            id: 'a',
            name: 'Robin',
            amount: '200',
            unit: 'g'
        },
        {
            id: 'd',
            name: 'Robatsgdfin',
            amount: '200',
            unit: 'g'
        }
    ];

    const [list, setList] = React.useState(initialListTMP);


    function newRecipe() {
        defaultNameValue = "";
        const newList = list.concat({
            id: '',
            name: '',
            amount: '',
            unit: ''
        })

        setList(newList);
        console.log(list)
    }

    function deleteRecipe(item: {
        id: string,
        name: string,
        amount: string,
        unit: string
    }) {
        setList((list) =>
            list.filter((i) => i.name !== item.name)
        );
        console.log(list)
    }

    return (

        <div className="App">
            <Box boxShadow={20}
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
                                {recipeName}
                            </Typography></Box>
                        </Col>
                        <Col span={10} xs={{order: 2}} sm={{order: 2}} md={{order: 2}} lg={{order: 2}}>
                        </Col>
                        <Col span={3} xs={{order: 3}} sm={{order: 3}} md={{order: 3}} lg={{order: 3}}>

                        </Col>
                        <Col span={1} xs={{order: 4}} sm={{order: 4}} md={{order: 4}} lg={{order: 4}}>
                            <Button shape="circle" icon={<SaveOutlined/>} href="/new_recipe"/>
                        </Col>
                    </Row>

                </Container>
            </Box>

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
                        <Input/>
                    </Form.Item>

                    <Form.Item label="świeżość">
                        <InputNumber/>
                    </Form.Item>
                </Form>

            </Box>


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
                        <Col span={10} xs={{order: 2}} sm={{order: 2}} md={{order: 2}} lg={{order: 2}}>
                        </Col>
                        <Col span={3} xs={{order: 3}} sm={{order: 3}} md={{order: 3}} lg={{order: 3}}>

                        </Col>
                        <Col span={1} xs={{order: 4}} sm={{order: 4}} md={{order: 4}} lg={{order: 4}}>
                            <Button shape="circle" icon={<PlusCircleOutlined/>} onClick={newRecipe}/>
                        </Col>
                    </Row>

                </Container>
            </Box>
            <Box
                px={{xs: 3, sm: 1}}
                py={{xs: 3, sm: 1}}
                bgcolor="#white">

                <Form
                    layout="horizontal"
                >
                    {list.map((item) => (
                        <Space>
                            <Form.Item label="Name:">
                                <Input defaultValue={defaultNameValue === "-1" ? item.name : ""}
                                       onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                           item.name = e.target.value
                                       }}/>
                            </Form.Item>
                            <Form.Item label="Amount:">
                                <InputNumber defaultValue={defaultNameValue === "-1" ? item.amount : ""}/>
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
                            <Form.Item>
                                <Button shape="circle" icon={<DeleteOutlined/>} onClick={() => {
                                    deleteRecipe(item)
                                }}/>
                            </Form.Item>
                        </Space>
                    ))}

                </Form>

            </Box>
        </div>
    );
}
export default EditRecipePage;