import React, { useState, useContext } from "react";
import "./css/FormComponents.css";
import { useNavigate } from "react-router-dom";
import { SymboleButton } from "./ClickableComponents.jsx";
import { TasksContext } from "../contexts/TasksContext";

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

        const response = await fetch("/api/user/login", {
            method: "POST",
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

        const response = await fetch("/api/user/signup", {
            method: "POST",
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
            {type === "login" ? <h2><b>Login</b></h2> : <h2><b>SignUp</b></h2>}
            {error && <label className="errorMessage">{error}</label>}
            <input
                className="inputBox"
                type="text"
                placeholder="enter your username"
                onChange={(e) => { setUsername(e.target.value) }}
                value={username}
            />
            {type === "signup" &&
                <input
                    className="inputBox"
                    type="email"
                    placeholder="enter your email adress"
                    onChange={(e) => { setEmail(e.target.value) }}
                    value={email}
                />}

            <input
                className="inputBox"
                type="password"
                placeholder="enter your password"
                onChange={(e) => { setPassword(e.target.value) }}
                value={password}
            />
            <br />
            {type === "login" && <button className="default" value="logIn" title="Login" onClick={verifyLogin}>
                Login
            </button>}
            <button
                className="default"
                value="signUp"
                title="Create account"
                onClick={type === "login" ? goToSignUp : sendSignUpForm}
            >
                signUp
            </button>
        </form>
    );
}


export const TaskForm = () => {
    const [isShow, setIsShown] = useState(false);
    const [title, setTitle] = useState("");
    const [difficulty, setDiff] = useState(0);
    const [subject, setSubject] = useState("");
    const [duration, setDuration] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [error, setError] = useState("");
    const { dispatch } = useContext(TasksContext);

    const toggleIsShown = () => {
        setIsShown(!isShow);
        let formStyle = document.getElementById("form").style;
        formStyle.display = !isShow ? "inline-block" : "none";
        // the ! is because change in state is not immediate, 
        // the component has to rerender to update the state
    }

    const createTask = async (event) => {
        event.preventDefault();
        const token = localStorage.getItem("authentication");
        const data = { title, difficulty, subject, duration, dueDate };

        const response = await fetch("/api/task", {
            method: "POST",
            body: JSON.stringify({ "task": data }),
            headers: {
                "content-Type": "application/json",
                "authentication": token
            }
        });

        const json = await response.json();
        if (!response.ok) {
            return setError(json);
        }
        else {
            dispatch({ type: "ADD_TASK", payload: json });
            setTitle("");
            setDiff(0);
            setSubject("");
            setDuration("");
            setError("");
        }
        setError("");
    };

    return (
        <div>
            <SymboleButton text="task" onClick={toggleIsShown} logo1="+" logo2="-" />
            <form className="taskForm" id="form">
                <h2><b><u>New Task</u></b></h2>
                <h3>title :</h3>
                <input className="text" type="text"
                    onChange={(e) => { setTitle(e.target.value) }} value={title} />
                <div className="inputBox">
                    <h3>Difficulty (out of 5) :</h3>
                    <input className="number" type="number" min="1" max="5"
                        onChange={(e) => { setDiff(e.target.value) }} value={difficulty} />
                </div>
                <h3>duration :</h3>
                <input className="text" type="text"
                    onChange={(e) => { setDuration(e.target.value) }} value={duration} />
                <h3>subject :</h3>
                <input className="text" type="text"
                    onChange={(e) => { setSubject(e.target.value) }} value={subject} />
                <h3>due date :</h3>
                <input className="text" type="date"
                    onChange={(e) => { setDueDate(e.target.value) }} value={dueDate} />
                <button onClick={createTask}>CREATE</button>
                {error !== "" && <div className="error">{error}</div>}
            </form>
        </div>
    );
};