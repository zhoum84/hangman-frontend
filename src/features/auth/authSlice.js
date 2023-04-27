import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit'
import authService from './authService'

// Get user from localstorage
const user = JSON.parse(localStorage.getItem('user'))

const initialState = {
  user: user ? user : null,
}

// Register new user
export const register = createAsyncThunk(
  'auth/register',
  async (user) => {
      return await authService.register(user)

  }
)

// Login user
export const login = createAsyncThunk('auth/login', async (user) => {
  return await authService.login(user)
})

// Logout user
export const logout = createAction('auth/logout', () => {
  authService.logout()
  localStorage.removeItem("user")
  // return an empty object as our payload as we don't need a payload but the
  // prepare function requires a payload return
  return {}
})

// NOTE: in cases of login or register pending or rejected then user will
// already be null so no need to set to null in these cases

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null
    },
  }
})

export default authSlice.reducer