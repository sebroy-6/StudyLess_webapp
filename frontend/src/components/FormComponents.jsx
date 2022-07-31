import React, { useState } from "react";
import "./css/FormComponent.modules.css";
import { useNavigate } from "react-router-dom";
import { AddButton } from "./ClickableComponents.jsx";

export const AuthNForm = ({ type }) => {
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



export const TaskForm = () => {
    const [title, setTitle] = useState("");
    const [difficulty, setDiff] = useState(0);
    const [subject, setSubject] = useState("");
    const [duration, setDuration] = useState("");
    const [error, setError] = useState("");

    const createTask = async (event) => {
        event.preventDefault();
        const token = localStorage.getItem("authentication");
        const data = { title, difficulty, subject, duration };
        console.log(data);

        const response  = await fetch("/api/task", {
            method : "POST",
            body: JSON.stringify({ "task": data }),
            headers: {
                "content-Type": "application/json",
                "authentication" : token
            }
        });

        const json = await response.json();
        if (!response.ok) {
            return setError(json);
        }
        
        setError("");
    };

    return (
        <div>
            <AddButton type="task" element={document.getElementById("TaskForm")}/>
            <form className="taskForm" id="TaskForm">
                <h2><b><u>New Task</u></b></h2>
                <h3>title :</h3>
                <input className="text" type="text" 
                    onChange={ (e) => { setTitle(e.target.value) } } value={ title }/>
                <div className="inputBox">
                    <h3>Difficulty (out of 5) :</h3>
                    <input className="number" type="number" min="1" max="5" 
                        onChange={ (e) => { setDiff(e.target.value) } } value={ difficulty }/>
                </div>
                <h3>duration :</h3>
                <input className="text" type="text" 
                    onChange={ (e) => { setDuration(e.target.value) } } value={ duration }/>
                <h3>subject :</h3>
                <input className="text" type="text" 
                    onChange={ (e) => { setSubject(e.target.value) } } value={ subject }/>
                <button onClick={createTask}>CREATE</button>
                { error !== "" && <div className="error">{ error }</div> }
            </form>
        </div>
    );
};