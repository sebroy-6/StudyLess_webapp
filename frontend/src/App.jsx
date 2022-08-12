import { Routes, Route, BrowserRouter } from "react-router-dom";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import WelcomePage from "./pages/WelcomePage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import SignupPage from "./pages/SignUpPage.jsx";
import { ProtectedRoutes } from "./protectedRoutes";
import HomePage from "./pages/HomePage.jsx";
import TimerPage from "./pages/TimerPage.jsx";
import ContactMePage from "./pages/ContactMePage.jsx";
import AccountPage from "./pages/AccountPage.jsx";
import SchedulePage from "./pages/SchedulePage.jsx";


function App() {

    return (
        <div className="App">
            <DndProvider backend={HTML5Backend}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<WelcomePage />} />
                        <Route path="/logIn" element={<LoginPage />} />
                        <Route path="/signUp" element={<SignupPage />} />
                        <Route element={<ProtectedRoutes />}>
                            <Route path="/homePage" element={<HomePage />} />
                            <Route path="/timer" element={<TimerPage />} />
                            <Route path="/contactMe" element={<ContactMePage />} />
                            <Route path="/account" element={<AccountPage />} />
                            <Route path="/schedule" element={<SchedulePage />} />
                        </Route>
                    </Routes>
                </BrowserRouter>
            </DndProvider>
        </div >
    );
}



export default App;
