import Navbar from './components/Navbar';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Home from './components/screens/Home';
import SignIn from './components/screens/SignIn';
import Profile from './components/screens/Profile';
import "./App.css"
import CreatePost from './components/screens/CreatePost';

function App() {
  return (
    <BrowserRouter>
      <Routes>
            <Route path='/' element={<Navbar/>}>
              <Route index element={<Home/>}/>
              <Route path='/signIn' element={<SignIn/>}/>
              <Route path='/profile' element={<Profile/>}/>
              <Route path='/createpost' element={<CreatePost/>}/>
            </Route>
        </Routes>
    
    </BrowserRouter>
  );
}

export default App;
