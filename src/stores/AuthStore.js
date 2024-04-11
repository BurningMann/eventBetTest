import axios from 'axios'
import { defineStore } from 'pinia'
import { router } from '@/router'

const baseUrl = import.meta.env.VITE_APP_API_URL
const baseAuthUrl = import.meta.env.VITE_APP_API_AUTH_URL

export const useAuthStore = defineStore({
  id: 'auth',
  state: () => ({
    user: JSON.parse(localStorage.getItem('user')),
    refreshTokenTimeout: null,
  }),
  actions: {
    async login({ username, password }) {
      const user = await axios.post(`${baseUrl}/login`, {
        clientId: 'default',
        login: username,
        password: password,
      })

      this.user = user.data.data[0]
      localStorage.setItem('user', JSON.stringify(this.user))
      this.startRefreshTokenTimer()
    },
    logout() {
      this.stopRefreshTokenTimer()
      this.user = null
      localStorage.removeItem('user')
      router.push('/login')
    },

    async refreshToken() {
      const refreshToken = this.user.attributes['refresh-token']
      await axios
        .post(`${baseAuthUrl}/token`, {
          clientId: 'default',
          refreshToken: refreshToken,
        })
        .then((response) => {
          this.user.attributes = response.data
          localStorage.setItem('user', JSON.stringify(this.user))
          this.startRefreshTokenTimer()
        })
        .catch((error) => {
          this.user = null
          localStorage.removeItem('user')
          router.push('/login')
        })
    },

    startRefreshTokenTimer() {
      const expires = (this.user.attributes['life-time'] - 100) * 1000
      this.refreshTokenTimeout = setTimeout(this.refreshToken, expires)
    },

    stopRefreshTokenTimer() {
      clearTimeout(this.refreshTokenTimeout)
    },
  },
})
