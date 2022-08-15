import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import WelcomePage from "./pages/WelcomePage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import SignupPage from "./pages/SignUpPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import TimerPage from "./pages/TimerPage.jsx";
import ContactMePage from "./pages/ContactMePage.jsx";
import AccountPage from "./pages/AccountPage.jsx";
import SchedulePage from "./pages/SchedulePage.jsx";


function App() {
    const token = localStorage.getItem("authentication");

    return (
        <div className="App">
            <DndProvider backend={HTML5Backend}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={!token ? <WelcomePage /> : <Navigate to="/homePage" />} />
                        <Route path="/logIn" element={!token ? <LoginPage /> : <Navigate to="/homePage" />} />
                        <Route path="/signUp" element={!token ? <SignupPage /> : <Navigate to="/homePage" />} />
                        <Route path="/homePage" element={token ? <HomePage /> : <Navigate to="/login" />} />
                        <Route path="/timer" element={token ? <TimerPage /> : <Navigate to="/login" />} />
                        <Route path="/contactMe" element={token ? <ContactMePage /> : <Navigate to="/login" />} />
                        <Route path="/account" element={token ? <AccountPage /> : <Navigate to="/login" />} />
                        <Route path="/schedule" element={token ? <SchedulePage /> : <Navigate to="/login" />} />
                    </Routes>
                </BrowserRouter>
            </DndProvider>
        </div >
    );
}



export default App;
