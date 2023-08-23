import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import * as React from "react";
import Typography from "@mui/material/Typography";

function MainPage() {
    const avatarStyle = {
        backgroundColor: "rgb(185, 227, 186)",
        width: 400,
        height: 400,
        boxShadow: 20,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
    };

    const buttonStyle = {
        margin: "5px",
    };

    return (
        <div className="App">
            <Box>
                <IconButton sx={{ p: 1 }} href="/edit-plan" style={buttonStyle}>
                    <Avatar sx={avatarStyle}>
                        <Typography
                            variant="h6"
                            noWrap
                            component="a"
                            href="/"
                            sx={{
                                fontFamily: "monospace",
                                fontWeight: 700,
                                letterSpacing: ".3rem",
                                color: "white",
                                textDecoration: "none",
                            }}
                        >
                            Create a nutrition <br /> plan
                        </Typography>
                    </Avatar>
                </IconButton>
                <IconButton sx={{ p: 1 }} href="/recipe-book" style={buttonStyle}>
                    <Avatar sx={avatarStyle}>
                        <Typography
                            variant="h6"
                            noWrap
                            component="a"
                            sx={{
                                fontFamily: "monospace",
                                fontWeight: 700,
                                letterSpacing: ".3rem",
                                color: "white",
                                textDecoration: "none",
                            }}
                        >
                            Recipe book
                        </Typography>
                    </Avatar>
                </IconButton>
                <IconButton sx={{ p: 1 }} href="/your-plans" style={buttonStyle}>
                    <Avatar sx={avatarStyle}>
                        <Typography
                            variant="h6"
                            noWrap
                            component="a"
                            href="/"
                            sx={{
                                fontFamily: "monospace",
                                fontWeight: 700,
                                letterSpacing: ".3rem",
                                color: "white",
                                textDecoration: "none",
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
