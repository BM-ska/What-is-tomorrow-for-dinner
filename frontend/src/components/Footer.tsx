import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import {Grid} from "@mui/material";

import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import * as React from "react";
import Typography from "@mui/material/Typography";

export default function Footer(){
    return (
    <footer>
        <Box px={{ xs: 3, sm:4 }}
             py={{ xs: 3, sm:4 }}
             bgcolor="#7cc27d">
            <Container maxWidth="xl" >
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={2}>
                        <Box>
                            <Typography
                                variant="h6"
                                noWrap
                                component="a"
                                href="/"
                                sx={{
                                    mr: 1,
                                    display: {xs: 'none', md: 'flex'},
                                    fontFamily: 'monospace',
                                    fontWeight: 700,
                                    letterSpacing: '.3rem',
                                    color: 'white',
                                    textDecoration: 'none',
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
                                    display: {xs: 'none', md: 'flex'},
                                    fontFamily: 'monospace',
                                    fontWeight: 700,
                                    letterSpacing: '.3rem',
                                    color: 'white',
                                    textDecoration: 'none',
                                }}
                            >
                                Contact
                            </Typography>
                        </Box>

                    </Grid>
                    <Box>
                        <IconButton  sx={{p: 1}}>
                            <Avatar>
                                <FacebookIcon />
                            </Avatar>
                        </IconButton>
                        <IconButton  sx={{p: 1}}>
                            <Avatar>
                                <InstagramIcon />
                            </Avatar>
                        </IconButton>
                        <IconButton  sx={{p: 1}}>
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

}