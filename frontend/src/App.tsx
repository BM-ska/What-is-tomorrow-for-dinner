import './App.css';
import MainPage from "./mainPage/MainPage";
import Header from "./components/Header";
import Footer from "./components/Footer";
import {Route, Routes} from 'react-router-dom';
import RecipeBookPage from "./recipeBook/RecipeBookPage";
import EditRecipePage from "./editRecipe/EditRecipePage";
import EditNutritionPlan from "./editNutritionPlan/EditNutritionPlan";
import SignIn from "./signIn/SignInPage";
import SignUp from "./signUp/SignUpPage";

function App() {
    return (
        <div className="App" style={{display: 'flex', flexDirection: 'column', minHeight: '100vh'}}>
            <div>
                <Header />
            </div>
            <div style={{ flex: 1}}>
                <Routes>
                    <Route path="/" element={<MainPage />} />
                    <Route path="/edit-plan" element={<EditNutritionPlan />} />
                    <Route path="/recipe-book" element={<RecipeBookPage />} />
                    {/*todo zmien*/}
                    <Route path="/recipe-book/:recipeId" element={<EditRecipePage />} />

                    <Route path="/sign-in" element={<SignIn />} />
                    <Route path="/sign-up" element={<SignUp />} />
                </Routes>
            </div>
            <div >
                <Footer />
            </div>

        </div>
    );
}

export default App;
