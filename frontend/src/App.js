import { Routes, Route, BrowserRouter } from "react-router-dom";
import WelcomePage from "./pages/Welcome";
import LoginPage from "./pages/LoginPage";

function App() {
  return (
    <div className="App">
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<WelcomePage />}/>
                <Route path="/logIn" element={ <LoginPage /> }/>
            </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
