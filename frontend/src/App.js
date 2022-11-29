import React from 'react';

// boostrap-libs
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.min.js';

// Route Components 
import ROUTE_SUPER from './component/routers/super_route'
import ROUTE_ADMIN from './component/routers/admin_route'
import ROUTE_VIEWER from './component/routers/viewer_route'
import USER_LOGIN from './component/user_login';
import USER_REG from './component/user_reg';

// Others
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NAVBAR from './component/navbar';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: null,
      user_access_level: '',
      test: "true"
    };
  };
  componentDidMount = async () => {
    let ua = localStorage.getItem('access_level')
    let il = localStorage.getItem('is_login')
    await this.setState({ user_access_level: ua, isLogin: il });
  }
  render() {
    if (this.state.isLogin === null || this.state.isLogin === "null" || this.state.isLogin === 'false') {
      return (
        <div>
          <BrowserRouter>
            <Routes>
              <Route path='/' element={<USER_LOGIN />}></Route>
              <Route path='/registration' element={<USER_REG />}></Route>
            </Routes>
          </BrowserRouter>
          <ToastContainer />
        </div>
      );
    }
    else if (this.state.isLogin === 'true') {
      return (
        <div>
          <BrowserRouter>
            <NAVBAR data={this.state.user_access_level} />
            {this.state.user_access_level === 'super_admin' && <ROUTE_SUPER />}
            {this.state.user_access_level === 'admin' && <ROUTE_ADMIN />}
            {this.state.user_access_level === 'viewer' && <ROUTE_VIEWER />}
          </BrowserRouter>
          <ToastContainer />
        </div>
      );
    }
  }
}
export default App;
