import './App.scss';
import NavHeader from './components/Navigation/NavHeader';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  BrowserRouter as Router,
} from "react-router-dom";
import { useContext, useEffect, useState } from 'react';
import _ from 'lodash'
import AppRoutes from './routes/AppRoutes';
import { Rings } from 'react-loader-spinner'
import { UserContext } from './context/userContext';
import { Scrollbars } from 'react-custom-scrollbars'

function App() {

  const { user } = useContext(UserContext);
  const [scrollHeight, setScrollHeight] = useState(0);

  useEffect(() => {
    let windowHeight = window.innerHeight;
    setScrollHeight(windowHeight);

  }, [user])

  return (
    <Scrollbars autoHide style={{ height: scrollHeight }}>
      <Router>
        {
          user && user.isLoading
            ?
            <div className='loading-container'>
              <Rings
                height="100"
                width="100"
                color="#1877f2"
                ariaLabel="audio-loading"
                wrapperStyle={{}}
                wrapperClass="wrapper-class"
                visible={true}
              />
              <div>Loading data...</div>
            </div>
            :
            <>
              <div className='app-header'>
                <NavHeader />
              </div>

              <div className='app-container'>
                <AppRoutes />
              </div>
            </>
        }
        <ToastContainer
          position="bottom-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </Router>
    </Scrollbars>
  );
}

export default App;
