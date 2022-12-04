import './App.css';
import MainPage from "./pages/MainPage";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Route, Routes } from 'react-router-dom';
import RecipeBookPage from "./pages/RecipeBookPage";

function App() {
    return (
        <div className="App">

                <Header />
                <Routes>
                    <Route path="/" element={<MainPage />} />
                    <Route path="/recipe-book" element={<RecipeBookPage />} />
                </Routes>
                <Footer />
        </div>
    );
}

export default App;
