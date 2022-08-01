import { Routes, Route, BrowserRouter } from "react-router-dom";
import WelcomePage from "./pages/WelcomePage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import SignupPage from "./pages/SignUpPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import TimerPage from "./pages/TimerPage.jsx";
import { ContactMePage } from "./pages/ContactMePage.jsx";

function App() {

    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={ <WelcomePage /> }/>
                    <Route path="/logIn" element={ <LoginPage /> }/>
                    <Route path="/signUp" element={ <SignupPage /> }/>
                    <Route path="/homePage" element={ <HomePage /> }/>
                    <Route path="/timer" element={ <TimerPage /> }/>
                    <Route path="/contactMe" element={ <ContactMePage /> }/>
                </Routes>
            </BrowserRouter>
        </div>
  );
}

export default App;
