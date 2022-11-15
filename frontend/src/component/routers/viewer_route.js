import React from "react";
import { Routes, Route } from 'react-router-dom';

import USER_LOGIN from "../user_login";
import USER_REG from "../user_reg";
import FAQ from "../faq";

class ROUTE_VIEWER extends React.Component {
    render() {
        return (
            <div>
                <Routes>
                    <Route path='/' element={<USER_LOGIN />}></Route>
                    <Route path='/registration' element={<USER_REG />}></Route>
                    <Route path='/faq' element={<FAQ />}></Route>
                </Routes>
            </div>
        );
    }
}

export default ROUTE_VIEWER;