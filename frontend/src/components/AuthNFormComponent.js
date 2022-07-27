import React from "react";
import "./css/AuthNFormComponent.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthNForm = ({ type }) => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");


    const navigate = useNavigate();
    const goToSignUp = () => {
        navigate("/signup");
    }
    
    const verifyLogin = async (event) => {
        event.preventDefault();
        const data = { username, password };

        const response  = await fetch("/api/user/login", {
            method : "POST",
            body: JSON.stringify(data),
            headers: {
                "content-Type": "application/json"
            }
        });

        const json = await response.json();
        if (!response.ok) {
            return setError(json);
        }
        if (json.authentication) {
            localStorage.setItem("authentication", json.authentication);
        }
        return navigate("/homePage");
    };

    const sendSignUpForm = async (event) => {
        event.preventDefault();
        const data = { username, email, password };

        const response  = await fetch("/api/user/signup", {
            method : "POST",
            body: JSON.stringify(data),
            headers: {
                "content-Type": "application/json"
            }
        });

        const json = await response.json();
        if (!response.ok) {
            return setError(json);
        }
        if (json.authentication) {
            localStorage.setItem("authentication", json.authentication);
        }
        return navigate("/homePage");
    };


    return (
		<form className="bubble" method="post">
            { type==="login"? <h2><b>Login</b></h2> : <h2><b>SignUp</b></h2> }
            { error && <label className="errorMessage">{ error }</label> }
			<input
			    className="inputBox"
			    type="text"
			    placeholder="enter your username"
                onChange={ (e) => { setUsername( e.target.value ) } }
                value={ username }
			/>
            {type==="signup" && 
            <input
			    className="inputBox"
			    type="email"
			    placeholder="enter your email adress"
                onChange={ (e) => { setEmail( e.target.value ) } }
                value={ email }
			/> }

			<input
			    className="inputBox"
			    type="password"
			    placeholder="enter your password"
                onChange={ (e) => { setPassword( e.target.value ) } }
                value={ password }
			/>
			<br />
			{ type === "login" && <button className="default" value="logIn" title="Login" onClick={ verifyLogin }>
			Login
			</button> }
			<button
                className="default"
			    value="signUp"
			    title="Create account"
                onClick={ type === "login"? goToSignUp : sendSignUpForm }
			>
			signUp
			</button>

        </form>
    );
}

export default AuthNForm;