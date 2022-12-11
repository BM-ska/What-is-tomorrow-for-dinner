import './App.css';
import MainPage from "./pages/MainPage";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Route, Routes } from 'react-router-dom';
import RecipeBookPage from "./pages/RecipeBookPage";
import EditRecipePage from "./pages/EditRecipePage";

function App() {
    return (
        <div className="App">

                <Header />
                <Routes>
                    <Route path="/" element={<MainPage />} />
                    <Route path="/recipe-book" element={<RecipeBookPage />} />
                    <Route path="/:recipeName" element={<EditRecipePage />} />
                    <Route path="/new_recipe" element={<EditRecipePage />} />
                </Routes>
                <Footer />
        </div>
    );
}

export default App;
