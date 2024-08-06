import { useContext, useEffect } from "react";
import { useHistory, Redirect } from 'react-router-dom/cjs/react-router-dom'
import { Route } from "react-router-dom";
import { UserContext } from "../context/userContext";

const PrivateRoutes = (props) => {
    const { user } = useContext(UserContext);
    if (user && user.isAuthenticated === true) {
        return (
            <>
                <Route path={props.path} component={props.component} />
            </>
        )
    }
    else {
        return <Redirect to='/login'></Redirect>
    }
}

export default PrivateRoutes;