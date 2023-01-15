import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import * as React from "react";
import Typography from "@mui/material/Typography";

function MainPage() {
    const avatarStyle = {
        backgroundColor: "rgb(185,227,186)",
        width: 300,
        height: 300,
        boxShadow: 20
    };


    return (
        <div className="App">
            <Box>
                <IconButton sx={{p: 1}} href="/edit-plan">
                    <Avatar sx={avatarStyle}>
                        <Typography
                            variant="h6"
                            noWrap
                            component="a"
                            href="/"
                            sx={{
                                mr: 2,
                                display: {xs: 'none', md: 'flex'},
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'white',
                                textDecoration: 'none',
                            }}
                        >
                            Create a nutrition <br/> plan
                        </Typography>

                    </Avatar>
                </IconButton>
                <IconButton sx={{p: 1}} href="/recipe-book">
                    <Avatar sx={avatarStyle}>
                        <Typography
                            variant="h6"
                            noWrap
                            component="a"
                            sx={{
                                mr: 2,
                                display: {xs: 'none', md: 'flex'},
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'white',
                                textDecoration: 'none',
                            }}
                        >
                            Receipe book
                        </Typography>

                    </Avatar>
                </IconButton>
                <IconButton sx={{p: 1}}>
                    <Avatar sx={avatarStyle}>
                        <Typography
                            variant="h6"
                            noWrap
                            component="a"
                            href="/"
                            sx={{
                                mr: 2,
                                display: {xs: 'none', md: 'flex'},
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'white',
                                textDecoration: 'none',
                            }}
                        >
                            Your plans
                        </Typography>
                    </Avatar>
                </IconButton>

            </Box>
        </div>
    );
}

export default MainPage;