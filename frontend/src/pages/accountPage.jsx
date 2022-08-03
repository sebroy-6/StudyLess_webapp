import React from "react";

const AccountPage = () => {
    
    const logout = () => {
        localStorage.removeItem("authentication");
        window.location = "/login";
    };
    
    return (
        <div className="library">
            <div className="bubble">
                <button className="default" style={{"marginTop" : "40%"}} onClick={logout}>logout</button>
            </div>
        </div>
    );
};

export default AccountPage;