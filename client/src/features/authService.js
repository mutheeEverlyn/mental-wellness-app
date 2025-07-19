import axios from 'axios'

const API_URL = "https://mental-wellness-app-3ry5.onrender.com";
const registerRoute = `${API_URL}/user/sign`;
const loginRoute = `${API_URL}/user/login`;

// Register user
const register = async (userData) => {
  const response = await axios.post(registerRoute, userData)

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }

  return response.data
}

// Login user
const login = async (userData) => {
  const response = await axios.post(loginRoute, userData)

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }

  return response.data
}

// Logout user
const logout = () => {
  localStorage.removeItem('user')
}

const authService = {
  register,
  login,
  logout,
}

export default authService;