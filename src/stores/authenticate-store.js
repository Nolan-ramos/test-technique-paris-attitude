import { defineStore } from 'pinia'
import { Notify } from 'quasar'

Notify.setDefaults({
  position: 'top',
  timeout: 4000,
})

export const useAuthenticateStore = defineStore('authenticate', {
  state: () => ({
    // Récupère l'utilisateur depuis localStorage ou null si rien n'est trouvé
    user: JSON.parse(localStorage.getItem('user')) || null,  
    authModal: false,
    favorites: [],
  }),
  getters: {
    isAuthenticated() {
      return this.user !== null
    },
  },
  actions: {
    async authenticateUser(user) {
      // ici il faut mettre === au lieu de !== pour que la connexion se fasse bien si l'username et le password sont correct
      // et la ligne était : user.password !== process.env.PASSWORD donc c'est pour cela que ça ne fonctionnait pas
      if (user.username === process.env.USERNAME_APP && user.password === process.env.PASSWORD) {
        this.user = user
        // Sauvegarder l'utilisateur dans localStorage
        localStorage.setItem('user', JSON.stringify(user))
        Notify.create({
          color: 'positive',
          message: 'You are now logged in!',
        })
        return user
      } else {
        Notify.create({
          color: 'negative',
          message: 'Invalid username or password!',
        })
        return null
      }
    },
    async logoutUser() {
      this.user = null
      // Supprimer l'utilisateur du localStorage
      localStorage.removeItem('user')
      Notify.create({
        color: 'positive',
        message: 'You are now logged out!',
      })
    },
    openAuthModal() {
      this.authModal = !this.authModal
    },
    addToFavorites(favorite) {
      // Check if the favorite already exists
      const existingFavorite = this.favorites.find((f) => f.id === favorite.id)
      if (existingFavorite) {
        Notify.create({
          color: 'negative',
          message: 'This favorite already exists!',
        })
        return false
      } else {
        this.favorites.push(favorite)
        Notify.create({
          color: 'positive',
          message: 'Favorite added!',
        })
      }
    },
    removeFromFavorites(favoriteId) {
      // ici le problème était qu'au niveau des paramètres nous avions favorite qui renvoyait l'id du favori supprimé
      // mais dans le code nous avions : this.favorites = this.favorites.filter((f) => f.id !== favorite.id) 
      // donc favorite étant déjà l'id, favorite.id n'existe pas donc c'est la raison pour laquelle il fallait seulement mettre favorite
      // et j'ai remplacé favorite par favoriteId pour que ça soit plus compréhensible
      this.favorites = this.favorites.filter((f) => f.id !== favoriteId)
      Notify.create({
        color: 'positive',
        message: 'Favorite removed!',
      })
    },
  },
})