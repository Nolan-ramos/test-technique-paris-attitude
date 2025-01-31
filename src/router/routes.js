import { useAuthenticateStore } from 'stores/authenticate-store.js'

const routes = [
  {
    path: '/:lang?',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/IndexPage.vue'),
        meta: { title: 'Home' },
        name: 'home',
      },
      {
        // en remplacant search/:search par search/:search? donc en ajoutant le "?" 
        // cela fait en sorte que le paramètre soit optionnel au lieu d'être obligatoire
        path: 'search/:search?',
        component: () => import('pages/SearchPage.vue'),
        meta: { title: 'Search' },
        name: 'search',
      },
      {
        path: 'favorites',
        component: () => import('pages/FavoritesPage.vue'),
        meta: { title: 'Favorites' },
        name: 'favorites',
        beforeEnter: (to, from, next) => {
          const { isAuthenticated, openAuthModal } = useAuthenticateStore()
          // Ici, le code qui faisait que la modaal s'affichait même si on était connecté est : !isAuthenticated
          // qu'il fallait remplacer par isAuthenticated donc sans le "!"
          if (isAuthenticated) {
            next()
          } else {
            next({ name: 'home', params: { lang: to.params.lang } })
            openAuthModal()
          }
        },
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
    meta: { title: '404' },
    name: 'notFound',
  },
]

export default routes
