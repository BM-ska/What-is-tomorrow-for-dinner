import Box from "@mui/material/Box";
import * as React from "react";

import { Collapse } from 'antd';

const recipeTmp = ['Barszcz z uszkami', 'Bigos', 'Pierogi']

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

    return (
        <div className="App">
            <Box>
                <Collapse defaultActiveKey={['1']} onChange={onChange}>
                    {recipeTmp.map((value) => (
                        <Panel header={`${value}`} key={value}>
                            <p>{text}</p>
                        </Panel>
                    ))}
                </Collapse>
            </Box>
        </div>
    );
}

export default RecipeBookPage;