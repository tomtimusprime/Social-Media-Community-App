import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "react-bootstrap";

const LoginButton = (props) => {
    const { loginWithRedirect } = useAuth0();

    return (
        <Button {...props} variant="outline-light" type="submit" onClick={() => loginWithRedirect()}>Log In</Button>
    );
};

export default LoginButton;