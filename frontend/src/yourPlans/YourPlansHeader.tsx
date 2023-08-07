import * as React from "react";
import Box from "@mui/material/Box";
import {Col, Row} from "antd";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";


function YourPlansHeader() {
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
                                Your plans
                            </Typography></Box>
                        </Col>
                        <Col span={10} xs={{order: 2}} sm={{order: 2}} md={{order: 2}} lg={{order: 2}}>
                        </Col>
                        <Col span={3} xs={{order: 3}} sm={{order: 3}} md={{order: 3}} lg={{order: 3}}>
                        </Col>
                        <Col span={1} xs={{order: 4}} sm={{order: 4}} md={{order: 4}} lg={{order: 4}}>
                        </Col>
                    </Row>

                </Container>
            </Box>
        </div>
    );
}

export default YourPlansHeader;