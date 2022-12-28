import './App.css';
import MainPage from "./pages/MainPage";
import Header from "./components/Header";
import Footer from "./components/Footer";
import {Route, Routes} from 'react-router-dom';
import RecipeBookPage from "./pages/RecipeBookPage";
import EditRecipePage from "./pages/EditRecipePage";
import EditNutritionPlan from "./pages/EditNutritionPlan";

function App() {
    return (
        <div className="App">

            <Header/>
            <Routes>
                <Route path="/" element={<MainPage/>}/>
                <Route path="/edit-plan" element={<EditNutritionPlan/>}/>
                <Route path="/recipe-book" element={<RecipeBookPage/>}/>
                {/*todo zmien*/}
                <Route path="/recipe-book/:recipeId" element={<EditRecipePage/>}/>
            </Routes>
            <Footer/>
        </div>
    );
}

export default App;
