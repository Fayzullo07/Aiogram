import { createContext, useEffect, useReducer, useContext } from 'react';
import Navbar from './components/Navbar';
import {BrowserRouter, Routes, Route, useNavigate} from "react-router-dom";
import Home from './components/screens/Home';
import SignIn from './components/screens/SignIn';
import Profile from './components/screens/Profile';
import "./App.css"
import CreatePost from './components/screens/CreatePost';
import { reducer, initialState } from './reducers/useReducer';

export const UserContext = createContext()

const Routing = () => {
  const navigate = useNavigate();
  const {dispatch} = useContext(UserContext);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      dispatch({type: "USER", payload: user})
      navigate("/");
    } else {
      navigate("/signin");
    }
  }, [])
  return (
      <Routes>
        <Route path='/' element={<Navbar/>}>
            <Route index element={<Home/>}/>
            <Route path='/signIn' element={<SignIn/>}/>
            <Route path='/profile' element={<Profile/>}/>
            <Route path='/createpost' element={<CreatePost/>}/>
        </Route>
      </Routes>
  )
  
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <UserContext.Provider value={{state, dispatch}}>
      <BrowserRouter>
        <Routing/>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
