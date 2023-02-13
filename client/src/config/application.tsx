import React  from "react";
import {  Route , Routes , useParams } from "react-router-dom";
import routes from "./routes";

export interface IApplicationProps {}

const Application : React.FunctionComponent<IApplicationProps> = props => {
    const params = useParams();
    return (
        <Routes>
           {routes.map((route,index) => {
                return (
                    <Route 
                        key = {index}
                        //exact = {route.exact}
                        path={route.path}
                        //={(routeProps: RouteComponentProps<any>) => <route.component {...routeProps} /> }
                    />
                )

           })} 
        </Routes>
    )
}

export default Application;