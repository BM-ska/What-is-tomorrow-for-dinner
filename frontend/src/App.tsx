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
import Profile from "./profile/ProfilePage";
import YourPlans from "./yourPlans/YourPlans";
import PreliminaryNutritionPlan from "./preliminaryNutritionPlan/PreliminaryNutritionPlan";
import NutritionPlan from "./nutritionPlan/NutritionPlan";
import DescriptionMealPlan from "./descriptionMealPlan/DescriptionMealPlan";
import ShoppingList from "./shoppingList/ShoppingList";
import Logout from "./logout/Logout";


function App() {
    return (
        <div className="App" style={{display: 'flex', flexDirection: 'column', minHeight: '100vh'}}>
            <div>
                <Header/>
            </div>
            <div style={{flex: 1}}>
                <Routes>
                    <Route path="/" element={<MainPage/>}/>
                    <Route path="/edit-plan" element={<EditNutritionPlan/>}/>
                    <Route path="/edit-preliminary-plan/:planId" element={<PreliminaryNutritionPlan/>}/> //todo

                    <Route path="/your-plans" element={<YourPlans/>}/>
                    <Route path="/your-plans/:planId" element={<NutritionPlan/>}/>
                    <Route path="/your-plans/:planId/description" element={<DescriptionMealPlan/>}/>
                    <Route path="/your-plans/:planId/shopping-list" element={<ShoppingList/>}/>

                    <Route path="/recipe-book" element={<RecipeBookPage/>}/>
                    {/*todo zmien*/}
                    <Route path="/recipe-book/:recipeId" element={<EditRecipePage/>}/>

                    <Route path="/sign-in" element={<SignIn/>}/>
                    <Route path="/sign-up" element={<SignUp/>}/>
                    <Route path="/logout" element={<Logout/>}/>

                    {/*todo zmien*/}
                    <Route path="/profile" element={<Profile/>}/>
                </Routes>
            </div>
            <div>
                <Footer/>
            </div>

        </div>
    );
}

export default App;
