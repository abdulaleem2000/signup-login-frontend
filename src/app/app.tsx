// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Route, Routes } from 'react-router-dom';
//import styles from './app.module.scss';

import NxWelcome from './nx-welcome';
import Login from './login/login';
import DashBoard from './dash-board/dash-board';
import Signup from './signup/signup';

export function App() {
  return (
    <div>
      {/* <NxWelcome title="org" /> */}
      <Routes>
        {/* <Route path="/" element={<NxWelcome title="org" />}></Route> */}
        <Route path="/" element={<Login />}></Route>
        <Route path="/dash-board" element={<DashBoard />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
      </Routes>
    </div>
  );
}

export default App;
