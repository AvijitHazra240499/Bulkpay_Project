import { useState } from 'react';
import './App.css';
import SignupLoginPage from './pages/signupLogin';
import axios from 'axios';
import Home from './pages/Home';
import TaskStatus  from './pages/TaskStatus';
import CreateandEditeTemplate from './pages/createandEditeTemplate'
import CreateandEditProjects from './pages/createandEditProjects'
import WriteContent from './pages/writeContent'
import GetImages from './pages/getImages'
import { BrowserRouter,Route,Routes} from 'react-router-dom';


function App() {

  
  const handleSignup = async (userData) => {
    try {
      const response = await axios.post('https://contentcrafter.bulkpe.in/api/signup', {
        phone: userData.phone,
        password: userData.password,
        name: userData.name
      });
      console.log('Signup successful:', response.data);
      // Optionally, you can perform additional actions after successful signup, such as redirecting the user to the login page or displaying a success message.
    } catch (error) {
      console.error('Signup error:', error.response.data.message);
      // Optionally, you can display an error message to the user.
    }
  }
  
  const [token, setToken] = useState(localStorage.getItem("userToken") );
  // const [token, setToken] = useState("");

  const handleLogin = async (userData) => {

    try {
      const response = await axios.post('https://contentcrafter.bulkpe.in/api/signin', {
        phone: userData.phone,
        password: userData.password
      });
      console.log('Login successful:', response.data);
      if(!response.data.apiStatus) return response.data
      const tokenFromServer = response.data.token; // Replace 'your_received_token' with the actual token received from the server
      localStorage.setItem("userToken", tokenFromServer)//key and val
      setToken(tokenFromServer);
      // Optionally, you can perform additional actions after successful login, such as storing the user's authentication token in local storage or redirecting the user to the dashboard page.
    } catch (error) {
      console.error('Login error:', error.response.data.message);
      // Optionally, you can display an error message to the user.
    }
    
  };

  console.log(token)
  if(!token) {return <SignupLoginPage handleSignup={handleSignup} handleLogin={handleLogin}/>}
 const logouthandler=()=>{
   localStorage.removeItem("userToken")
   setToken(null)
 }
  return (
    // <div className="App">
    <>
    <div>
      <ul>
        
          <button onClick={logouthandler}>Logout</button>
        
      </ul>
    </div>
    <BrowserRouter>
   <Routes>
  <Route path='/' element={<Home/>}/>
  <Route path='/taskStatus/project/:projectRef' element={<TaskStatus/>}   />
  <Route path='/CreateandEditTemplate' element={<CreateandEditeTemplate/>}/>
  <Route path='/CreateandEditProjects' element={<CreateandEditProjects/>}/>
  <Route path='/writeContent/:templateRef' element={<WriteContent/>}   />
  <Route path='/getimages' element={<GetImages/>}   />
  </Routes>
    </BrowserRouter>
        
        </>
    
     
    // </div>
  );
}

export default App;
