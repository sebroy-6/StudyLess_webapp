import { Routes, Route, BrowserRouter } from "react-router-dom";
import WelcomePage from "./pages/Welcome";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignUpPage";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <div className="App">
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<WelcomePage />}/>
                <Route path="/logIn" element={ <LoginPage /> }/>
                <Route path="/signUp" element={ <SignupPage /> }/>
                <Route path="/homePage" element={ <HomePage /> }/>
            </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
