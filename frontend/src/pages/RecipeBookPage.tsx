import Box from "@mui/material/Box";
import * as React from "react";

import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import {Button, Collapse} from 'antd';
import {EditOutlined, DeleteOutlined} from '@ant-design/icons';
import {ListItem, ListItemText} from "@mui/material";

const recipeTmp = ['Barszcz z uszkami', 'Bigos', 'Pierogi']
const ingredientTmp = ['burak', 'uszko', 'ziemniaki']

const { Panel } = Collapse;

const onChange = (key: string | string[]) => {
    console.log(key);
};

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

function RecipeBookPage() {

    const genExtra = () => (
        <Box>
            <Button shape="circle" icon={<EditOutlined />} href="/"/>
            <Button shape="circle" icon={<DeleteOutlined />} href="/"/>
        </Box>

    );

    return (
        <div className="App">
            <Box>
                <Collapse onChange={onChange}>
                    {recipeTmp.map((value) => (
                        <Panel header={`${value}`} key={value} extra={genExtra()}>
                            {ingredientTmp.map((value) => (
                                <ListItem
                                    key={value}
                                    disableGutters
                                >
                                    <ArrowRightIcon />
                                    <ListItemText primary={`${value}`} />
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