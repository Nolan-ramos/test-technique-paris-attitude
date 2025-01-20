<template>
  <q-header>
    <q-toolbar class="flex justify-end">
      <q-btn
        color="black"
        label="Home"
        size="md"
        class="q-mr-md"
        @click="() => router.push({ name: 'home' })"
      />
      <q-btn
        v-if="isAuthenticated"
        color="black"
        label="Mes favoris"
        size="md"
        class="q-mr-md"
        @click="() => router.push({ name: 'favorites' })"
      />
      <q-btn
        v-if="!isAuthenticated"
        color="black"
        label="Connexion"
        outline
        size="md"
        class="q-mr-md"
        @click="authenticateStore.openAuthModal"
      />
      <q-btn
        v-else
        color="black"
        label="Déconnexion"
        outline
        size="md"
        class="q-mr-md"
        @click="logout"
      />
      <q-btn
        :label="i18nStore.locale"
        color="black"
        flat
        padding="none none"
        square
        :ripple="false"
      >
        <q-menu>
          <q-list style="min-width: 150px" v-for="(lang, i) in ['fr', 'en']" :key="i">
            <q-item clickable @click="changeLocale(lang)" v-ripple="true">
              <q-item-section>
                {{ lang.toUpperCase() }}
              </q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </q-btn>
    </q-toolbar>
  </q-header>
</template>

<script setup>
import { useAuthenticateStore } from 'stores/authenticate-store.js';
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useI18nStore } from '/src/stores/i18n-store.js';

const i18nStore = useI18nStore()
const authenticateStore = useAuthenticateStore()
const route = useRoute()
const router = useRouter()

const isAuthenticated = computed(() => authenticateStore.isAuthenticated)

function logout() {
  // Appeler logoutUser() qui est sur le store
  authenticateStore.logoutUser()
  // Si on se déconnecte en étant sur la page favorites, cela redirige vers la page home
  if (router.currentRoute.value.name === 'favorites') {
    router.push({ name: 'home' })
  }
}

const changeLocale = (lang) => {
  i18nStore.setLocale(lang)
  router.push({
    name: route.name,
    params: { ...route.params, lang: lang },
    query: route.query,
  })
}
</script>
