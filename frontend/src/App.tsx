import './App.css';
import Appbar from "./components/Appbar";
import Footer from "./components/Footer";
import Box from "@mui/material/Box";

function App() {
    return (
        <div className="App">

            <Appbar />
            <Box px={{ xs: 3, sm:10 }}
                   py={{ xs: 3, sm:10 }}>

            </Box>
            <Footer />

        </div>
    );
}

export default App;
