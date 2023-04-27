import axios from 'axios'

const url = process.env.REACT_APP_API_URL;

// Login user and register if not found
const login = async (username) => {
  
  const response = await axios.get(url + 'users/' + username)

  if (response.data.length !== 0) {
    localStorage.setItem('user', JSON.stringify(response.data));
    return response.data;
  }
  else{
    const data = {
      "name": username
    };

    const reg = await axios.post(url + 'user_create/', data);
    localStorage.setItem('user', JSON.stringify(reg.data))
    return reg.data;
  }
}

// Logout user
const logout = () => localStorage.removeItem('user')

const authService = {
  logout,
  login,
}

export default authService