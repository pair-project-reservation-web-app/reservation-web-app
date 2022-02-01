import { useState } from 'react';
import Axios from 'axios';
import "./App.css";

function App() {

  const [userId, setUserId] = useState('');
  const [userPassword, setUserPassword] = useState('');


  const userIdHandler = (e) => {
    setUserId(e.target.value);
  }

  const userPasswordHandler = (e) => {
    setUserPassword(e.target.value);
  }

  const userSubmitHandler = (e) => {
    e.preventDefault();
    Axios.post('http://localhost:3001/create', {
      email: userId,
      password: userPassword
    }).then((response) => {
      console.log('submited');
    })

  }

  // const displayUserInfo = () => {

  // }

  return <div className="App">

    <form onSubmit={userSubmitHandler}>
      <label htmlFor="userId">ID</label>
      <input id="userId" type="text" onChange={userIdHandler} />
      <label htmlFor="userPassword">Password</label>
      <input id="userPassword" type="text" onChange={userPasswordHandler} />
      <button>submit</button>
    </form>
  </div>;
}

export default App;
