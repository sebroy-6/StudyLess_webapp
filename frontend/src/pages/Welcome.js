import React from "react";
import { useNavigate } from "react-router-dom";

const WelcomePage = () => {
    
    const navigate = useNavigate();
    const goToLogIn = () => {
        navigate("/logIn");
    };

    return (
        <div className="welcomePage">
            <div className="library">
		        <div className="center">
			        <h1 className="pageheader">POLYSTUDY</h1>
			        <button
				        onClick={goToLogIn}
				        type="button"
				        className="default"
				        title="go to login page"
				        id="logSignIn"
			        >
				    login / signin
			        </button>
		        </div>
            </div>
        </div>
    );
};

export default WelcomePage;