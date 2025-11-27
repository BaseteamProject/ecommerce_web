import { defineStore } from 'pinia'
import * as welcomeService from '../services/welcomeService'

export const useWelcomeStore = defineStore('welcome', {
  state: () => ({
    welcome: [],   // array of welcome data
    cards: [],
    loading: false,
    error: null
  }),

  actions: {
    async stAll() {
      try {
        this.loading = true
        this.welcome = await welcomeService.fetchWelcomeData()  // FIXED
        this.cards = await welcomeService.fetchCardsData()
      } catch (err) {
        this.error = err.message
      } finally {
        this.loading = false
      }
    }
  }
})
