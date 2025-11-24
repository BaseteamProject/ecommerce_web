import { defineStore } from 'pinia'
import * as welcomeService from '../services/welcomeService'

export const useWelcomeStore = defineStore('welcome', {
  state: () => ({
    welcome: [],
    loading: false,
    error: null
  }),
  actions: {
    async stAll() {
      try {
        this.loading = true
        this.items = await welcomeService.getWelcomeData()
      } catch (err) {
        this.error = err.message
      } finally {
        this.loading = false
      }
    }
  }
})