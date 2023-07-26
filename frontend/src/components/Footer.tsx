import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { Grid } from "@mui/material";

import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import * as React from "react";
import Typography from "@mui/material/Typography";

const footerStyle: React.CSSProperties = {
    position: "relative",
    width: "100%",
    backgroundColor: "#7cc27d",
};

const footerIconStyle = {
    color: 'white',
    p: 1,
};

const Footer = () => {
    return (
        <footer style={footerStyle}>
            <Box
                boxShadow={20}
                px={{ xs: 3, sm: 4 }}
                py={{ xs: 3, sm: 4 }}
            >
                <Container maxWidth="xl">
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={2}>
                            <Box>
                                <Typography
                                    variant="h6"
                                    noWrap
                                    component="a"
                                    href="/"
                                    sx={{
                                        mr: 1,
                                        display: { xs: 'none', md: 'flex' },
                                        fontFamily: 'monospace',
                                        fontWeight: 700,
                                        letterSpacing: '.3rem',
                                        color: 'white',
                                        textDecoration: 'none',
                                        fontSize: 14
                                    }}
                                >
                                    About
                                </Typography>
                            </Box>
                            <Box>
                                <Typography
                                    variant="h6"
                                    noWrap
                                    component="a"
                                    href="/"
                                    sx={{
                                        mr: 2,
                                        display: { xs: 'none', md: 'flex' },
                                        fontFamily: 'monospace',
                                        fontWeight: 700,
                                        letterSpacing: '.3rem',
                                        color: 'white',
                                        textDecoration: 'none',
                                        fontSize: 14
                                    }}
                                >
                                    Contact
                                </Typography>
                            </Box>
                        </Grid>

                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }} />

                        <Box>
                            <IconButton sx={footerIconStyle}>
                                <Avatar>
                                    <FacebookIcon />
                                </Avatar>
                            </IconButton>
                            <IconButton sx={footerIconStyle}>
                                <Avatar>
                                    <InstagramIcon />
                                </Avatar>
                            </IconButton>
                            <IconButton sx={footerIconStyle}>
                                <Avatar>
                                    <YouTubeIcon />
                                </Avatar>
                            </IconButton>
                        </Box>
                    </Grid>
                </Container>
            </Box>
        </footer>
    );
};

export default Footer;
