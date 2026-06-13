import { useState } from 'react';
import axios from 'axios'
import { useNavigate } from "react-router-dom";



const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = { email, password };
    try {
      const response = await axios.post("/api/users/login",user);
    
      console.log(response.data);
       localStorage.setItem("user",JSON.stringify(response.data));

       //local storage used for persistance of jwt
       

       //redirect after successful login response
        navigate("/");
      
      } catch (error) {
        console.log(error)
    }
  };

  return (
    <form className="login" onSubmit={handleSubmit}>
      <h3>Login</h3>

      <label>Email:</label>
      <input
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />

      <label>Password:</label>
      <input
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />

      <button>Login</button>
    </form>
  );
};

export default Login;