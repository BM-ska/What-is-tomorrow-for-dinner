import Box from "@mui/material/Box";
import * as React from "react";
import {useParams} from "react-router-dom";


function EditRecipePage() {
    const { recipeName } = useParams();
    return (
        <div className="App">
            <Box boxShadow={20}
                 px={{xs: 3, sm: 1}}
                 py={{xs: 3, sm: 1}}
                 bgcolor="#b9e3ba">
                {recipeName}
            </Box>
        </div>
    );
}

export default EditRecipePage;