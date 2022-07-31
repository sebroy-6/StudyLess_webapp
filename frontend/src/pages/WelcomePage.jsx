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
			    <h1 className="pageheader">POLYSTUDY</h1>
			    <button
				    onClick={goToLogIn}
				    type="button"
				    className="default welcomePage"
				    title="go to login page"
			    >
				login / signin
			    </button>
            </div>
        </div>
    );
};

export default WelcomePage;