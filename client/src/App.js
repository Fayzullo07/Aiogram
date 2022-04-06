import Navbar from './components/Navbar';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Home from './components/screens/Home';
import SignIn from './components/screens/SignIn';
import SignUp from './components/screens/SignUp';
import Profile from './components/screens/Profile';
import "./App.css"

function App() {
  return (
    <BrowserRouter>
      <Routes>
            <Route path='/' element={<Navbar/>}>
              <Route index element={<Home/>}/>
              <Route path='/signIn' element={<SignIn/>}/>
              <Route path='/signUp' element={<SignUp/>}/>
              <Route path='/profile' element={<Profile/>}/>
            </Route>
        </Routes>
    
    </BrowserRouter>
  );
}

export default App;
