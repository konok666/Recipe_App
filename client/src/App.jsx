import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './Components/Navbar'; // Navigation bar
import Home from "./Pages/Home";
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import MyCookbook from "./Pages/MyCookbook";
import AllRecipe from "./Pages/AllRecipe";
import Profile from "./Pages/Profile";
import RecipeDetails from "./Pages/RecipeDetails";
import MyFavorite from "./Pages/MyFavorite";
import ForgotPassword from "./Pages/ForgotPassword";
import MealPlanner from "./Pages/MealPlanner";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/mycookbook" element={<MyCookbook />} />
        <Route path="/allrecipe" element={<AllRecipe />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/recipe/:id" element={<RecipeDetails />} />
        <Route path="/favorites" element={<MyFavorite />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/mealplanner" element={<MealPlanner />} />
      </Routes>
    </Router>
  );
}

export default App;
