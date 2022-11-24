import { createSlice } from '@reduxjs/toolkit'
const jwtToken = localStorage.getItem('jwt-token') || undefined

const initialState = {
  isLoggedIn: false,
  isGuestUser: false,
  user: {},
  jwt: null,
  socketId: null,
}

const sessionState = {
  ...initialState,
  isLoggedIn: Boolean(jwtToken),
  jwt: jwtToken,
}

const guestUserData = {
  name: 'Guest',
  email: 'guest@example.com',
}

const getFullJwt = (token) => {
  return `Bearer ${token}`
}

const userSlice = createSlice({
  name: 'user',
  initialState: sessionState,
  reducers: {
    jwt(state, { payload }) {
      state.isLoggedIn = true
      state.isGuestUser = false
      state.jwt = payload
    },

    loginAsGuest(state) {
      state.isLoggedIn = true
      state.isGuestUser = true
      state.user = guestUserData
    },

    logout(state) {
      Object.assign(state, initialState)
    },

    updateSocketId(state, { payload }) {
      state.socketId = payload
    },

    updateUser(state, { payload }) {
      Object.assign(state.user, payload)
    },
  },
})

export const userReducers = userSlice.reducer
export default userSlice.actions
