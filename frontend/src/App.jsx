import { Routes, Route, BrowserRouter } from "react-router-dom";
import WelcomePage from "./pages/WelcomePage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import SignupPage from "./pages/SignUpPage.jsx";
import { ProtectedRoutes } from "./protectedRoutes";
import HomePage from "./pages/HomePage.jsx";
import TimerPage from "./pages/TimerPage.jsx";
import ContactMePage from "./pages/ContactMePage.jsx";
import AccountPage from "./pages/accountPage.jsx";


function App() {

    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={ <WelcomePage /> }/>
                    <Route path="/logIn" element={ <LoginPage /> }/>
                    <Route path="/signUp" element={ <SignupPage /> }/>
                    <Route element={ <ProtectedRoutes/> }>
                        <Route path="/homePage" element={ <HomePage /> }/>
                        <Route path="/timer" element={ <TimerPage /> }/>
                        <Route path="/contactMe" element={ <ContactMePage /> }/>
                        <Route path="/account" element={ <AccountPage /> } />
                    </Route>
                </Routes>
            </BrowserRouter>
        </div>
  );
}

export default App;
