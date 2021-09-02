import React, {useContext} from 'react';
import {AuthContext} from "../context";
import {Route, Switch} from "react-router-dom";
import {privateRoutes, publicRoutes} from "../router/routes";

const AppRouter = () => {
    const {isAuth} = useContext(AuthContext);

    return (
        isAuth
            ?
            <Switch>
                {privateRoutes.map(route =>
                    <Route
                        component={route.component}
                        path={route.path}
                        exact={route.exact}
                        key={route.path}
                    />
                )}
            </Switch>
            :
            <Switch>
                {publicRoutes.map(route =>
                    <Route
                        component={route.component}
                        path={route.path}
                        exact={route.exact}
                        key={route.path}
                    />
                )}
            </Switch>
    );

};

export default AppRouter;