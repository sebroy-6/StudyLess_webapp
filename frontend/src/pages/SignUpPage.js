import React from "react";
import AuthNForm from "../components/AuthNFormComponent";

class SignupPage extends React.Component {

    render () {
        return (
            <div className="library">
		        <AuthNForm type="signup"/>
            </div>
        );
    }

}

export default SignupPage;