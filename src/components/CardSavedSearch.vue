<template>
  <q-chip
    v-for="(v, k) in savedSearch"
    :key="k"
    clickable
    @click="emit('search', v)"
  >
    <p v-if="!v.borough && !v.min && !v.max && !v.bedrooms" class="q-mb-none">Search 1</p>
    <p v-else class="q-mb-none">
      {{ v.borough || '' }} {{ v.min || '' }} {{ v.max || '' }} {{ v.bedrooms || '' }}
    </p>
    <!-- Pour pouvoir supprimer les recherches enregistrées, il fallait ajouter un bouton qui lance la fonction deleteSearch() -->
    <!-- Cette fonction est plus bas dans le code (lignes 43 à 49) -->
    <q-btn
      icon="delete"
      color="red"
      size="sm"
      class="q-ml-xs"
      @click.stop="deleteSearch(k)"
      flat
    />
  </q-chip>
</template>

<script setup>
import { useAuthenticateStore } from 'stores/authenticate-store.js';
import { useSearchStore } from 'stores/search-store.js';
import { computed } from 'vue';

const emit = defineEmits(['search'])

const searchStore = useSearchStore()

const savedSearch = computed(() => searchStore.savedSearch)

const authenticateStore = useAuthenticateStore()

const isAuthenticated = computed(() => authenticateStore.isAuthenticated)

// Cette fonction permet d'appeler clearSavedSearch(index) dans le store 
// pour pouvoir supprimer une recherche enregistrée mais en vérifiant d'abord si l'utilisateur est bien connecté
const deleteSearch = (index) => {
  if (isAuthenticated.value) {
    searchStore.clearSavedSearch(index)
  } else {
    authenticateStore.openAuthModal()
  }
}
</script>
