import './App.scss';
import Nav from './components/Navigation/Nav';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  BrowserRouter as Router,
} from "react-router-dom";
import { useEffect, useState } from 'react';
import _ from 'lodash'
import AppRoutes from './routes/AppRoutes';

function App() {
  const [account, setAccount] = useState({})

  useEffect(() => {
    let session = sessionStorage.getItem("account");
    if (session) {
      setAccount(JSON.parse(session))
    }
  }, []);

  return (
    <>
      <Router>
        <div className='app-header'>
          <Nav />
        </div>

        <div className='app-container'>
          <AppRoutes />
        </div>

        <ToastContainer
          position="bottom-right"
          autoClose={5000}
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
    </>
  );
}

export default App;
