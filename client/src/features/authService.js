import axios from 'axios'

const registerRoute = "https://mental-wellness-app-3ry5.onrender.com/user/sign"


const loginRoute =    "https://mental-wellness-app-3ry5.onrender.comuser/login"





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
  logout,
  login,
}

export default authService