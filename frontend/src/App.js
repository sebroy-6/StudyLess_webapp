import { Routes, Route, BrowserRouter } from "react-router-dom";
import WelcomePage from "./pages/Welcome";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignUpPage";

function App() {
  return (
    <div className="App">
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<WelcomePage />}/>
                <Route path="/logIn" element={ <LoginPage /> }/>
                <Route path="/signUp" element={ <SignupPage /> }/>
            </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
