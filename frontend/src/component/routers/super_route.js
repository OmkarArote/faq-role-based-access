import React from "react";
import { Routes, Route } from 'react-router-dom';

import USER_LOGIN from "../user_login";
import USER_REG from "../user_reg";
import FAQ_TABLE from "../faq_table";
import FAQ from "../faq";
import ADMIN_TABLE from "../admin_table";

class ROUTE_SUPER extends React.Component {
    render() {
        return (
            <div>
                <Routes>
                    <Route path='/' element={<USER_LOGIN />}></Route>
                    <Route path='/registration' element={<USER_REG />}></Route>
                    <Route path='/admin_table' element={<ADMIN_TABLE />}></Route>
                    <Route path='/faq_table' element={<FAQ_TABLE />}></Route>
                    <Route path='/faq' element={<FAQ />}></Route>
                </Routes>
            </div>
        );
    }
}

export default ROUTE_SUPER;