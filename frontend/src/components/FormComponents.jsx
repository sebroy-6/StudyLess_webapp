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
        return window.location = "/homePage";
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
        return window.location = "/homePage";
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
    const [description, setDescription] = useState("");
    const [difficulty, setDiff] = useState("easy");
    const [subject, setSubject] = useState("");
    const [duration, setDuration] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [error, setError] = useState("");
    const { tasks, dispatch } = useContext(TasksContext);

    const toggleIsShown = () => {
        setIsShown(!isShow);
        let formStyle = document.getElementById("taskForm").style;
        formStyle.display = !isShow ? "inline-block" : "";
        // the ! is because change in state is not immediate, 
        // the component has to rerender to update the state
    }

    const createTask = async (event) => {
        event.preventDefault();
        const token = localStorage.getItem("authentication");
        const data = { title, description, difficulty, subject, duration, dueDate };

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
            if (response.status === 403) {
                localStorage.removeItem("authentication");
                return window.location = "/login";
            }
            return setError(json);
        }
        else {
            dispatch({ type: "ADD_TASK", payload: json });
            resetStates();
        }
    };

    const resetStates = () => {
        setTitle("");
        setDescription("");
        setDiff("easy");
        setSubject("");
        setDuration("");
        setError("");
    }

    const getExistingSubjects = () => {
        const subjects = [];
        if (tasks?.length) {
            tasks.forEach((task) => {
                if (!subjects.includes(task.subject)) {
                    subjects.push(task.subject);
                }
            });
        }
        return subjects;
    }

    return (
        <div>
            <SymboleButton text="task" onClick={toggleIsShown} logo1="+" logo2="-" />
            <form id="taskForm">
                <h2><b><u>New Task</u></b></h2>
                <div>
                    <label for="title">Title</label>
                    <input id="title" type="text"
                        onChange={(e) => { setTitle(e.target.value) }} value={title} />
                </div>
                <div>
                    <label for="easyDiff">Difficulty</label>
                    <input id="easyDiff" type="radio" name="difficulty"
                        onChange={(e) => { setDiff("easy") }} />
                    <label for="easyDiff" className="radio">easy</label>
                    <input id="mediumDiff" type="radio" name="difficulty"
                        onChange={(e) => { setDiff("medium") }} />
                    <label for="mediumDiff" className="radio">medium</label>
                    <input id="hardDiff" type="radio" name="difficulty"
                        onChange={(e) => { setDiff("hard") }} />
                    <label for="hardDiff" className="radio">hard</label>
                </div>
                <div>
                    <label for="hoursDuration">Duration</label>
                    <input type="text"
                        onChange={(e) => { setDuration(e.target.value) }} value={duration} />
                </div>
                <div>
                    <label for="subject">Subject</label>
                    <input id="subject" name="taskSubject" list="existingSubjects"
                        onChange={(e) => { setSubject(e.target.value) }} value={subject} />
                    <datalist id="existingSubjects" name="existingSubjects" >
                        {
                            getExistingSubjects().map((subject) => {
                                return <option key={subject} value={subject} />
                            })
                        }
                    </datalist>
                </div>
                <div>
                    <label>Due date</label>
                    <input type="date"
                        onChange={(e) => { setDueDate(e.target.value) }} value={dueDate} />
                </div>
                <div className="flex">
                    <button onClick={createTask}>CREATE</button>
                    <button type="button" onClick={resetStates}>CLEAR</button>
                </div>
                {error !== "" && <div className="error">{error}</div>}
            </form >
        </div >
    );
};