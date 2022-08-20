import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import AuthService from '@/processes/services/AuthService'
import { IUser } from '@/processes/models/IUser'
import axios from 'axios'
import { AuthResponse } from '@/processes/models/response/AuthResponse'

interface IAuthData {
  email: string
  password: string
}

export interface ISignUpData extends IAuthData {
  isArtist: boolean
}

export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }: IAuthData, { dispatch }) => {
    try {
      const response = await AuthService.login(email, password)
      localStorage.setItem('token', response.data.accessToken)
      dispatch(setAuth(true))
      dispatch(setUser(response.data.user))
    } catch (e: any) {}
  },
)
export const signup = createAsyncThunk(
  'auth/signup',
  async (newUser: ISignUpData, { dispatch }) => {
    try {
      const response = await AuthService.signup(newUser)
      localStorage.setItem('token', response.data.accessToken)
      dispatch(setAuth(true))
      dispatch(setUser(response.data.user))
    } catch (e: any) {}
  },
)
export const logout = createAsyncThunk('auth/logout', async (arg: void, { dispatch }) => {
  try {
    localStorage.removeItem('token')
    dispatch(setAuth(false))
    dispatch(setUser({} as IUser))
    await AuthService.logout()
  } catch (e: any) {}
})

export const checkAuth = createAsyncThunk('auth/checkAuth', async (arg: void, { dispatch }) => {
  dispatch(setLoading(true))
  try {
    const response = await axios.get<AuthResponse>(`${import.meta.env.VITE_API_URL}/refresh`, {
      withCredentials: true,
    })
    localStorage.setItem('token', response.data.accessToken)
    dispatch(setAuth(true))
    dispatch(setUser(response.data.user))
  } catch (e: any) {
  } finally {
    dispatch(setLoading(false))
  }
})

export interface IAuth {
  user: IUser
  isAuth: false
  isLoading: false
}

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: {
      email: null,
      id_user: null,
      role: null,
    } as IUser,
    isAuth: false,
    isLoading: false,
  },
  reducers: {
    setAuth(state, action) {
      state.isAuth = action.payload
      if (action.payload) {
        localStorage.setItem('isAuth', 'true')
      } else {
        state.user = {
          email: '',
          id_user: '',
          role: '',
        }

        localStorage.removeItem('isAuth')
        localStorage.removeItem('email')
        localStorage.removeItem('id_user')
        localStorage.removeItem('role')
      }
    },

    setUser(state, action) {
      state.user = {
        ...action.payload,
      }
      localStorage.setItem('email', action.payload.email)
      localStorage.setItem('id_user', action.payload.id_user)
      localStorage.setItem('role', action.payload.role)
    },

    setLoading(state, action) {
      state.isLoading = action.payload
    },
    extractAuthData(state) {
      const isAuth = localStorage.getItem('isAuth')
      if (isAuth) {
        state.isAuth = isAuth === 'true'
        state.user.email = localStorage.getItem('email')
        state.user.id_user = localStorage.getItem('id_user')
        state.user.role = localStorage.getItem('role')
      }
    },
  },
})

export default authSlice.reducer

export const { setAuth, setUser, setLoading, extractAuthData } = authSlice.actions
