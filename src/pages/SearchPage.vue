<template>
  <q-page class="q-px-xl">
    <h1 class="q-my-none">SearchPage</h1>
    <FiltersSearch :form="form" @search="filterMethod" @reset="resetMethod" />
    <section class="row items-center">
      <div class="col-11 flex items-center">
        <h2 class="text-h6 q-ma-none">Mes recherches :</h2>
        <CardSavedSearch
          @search="
            (v) => {
              setFormWithSavedSearch(v)
            }
          "
        />
      </div>
      <div class="col-1 flex justify-end">
        <h2 class="text-h6 q-ma-none">{{ filteredAccommodations.length }} résultats</h2>
      </div>
    </section>
    <section class="flex q-mt-md" style="gap: 20px">
      <q-card
        v-for="(accommodation, key) in filteredAccommodations"
        :key="key"
        class="accommodation-card"
        @click="searchStore.setAccommodation(accommodation)"
      >
        <CardAccommodation :accommodation="accommodation" />
      </q-card>
    </section>
  </q-page>
</template>

<script setup>
import CardAccommodation from 'components/CardAccommodation.vue'
import CardSavedSearch from 'components/CardSavedSearch.vue'
import FiltersSearch from 'components/FiltersSearch.vue'
// ici pour que le titre de l’onglet soit bien Search, il fallait ajouter cette ligne : import { useMeta } from 'quasar'
// et aussi ce code : useMeta({ title: 'Search', }) qui est plus bas dans la page (ligne 90 à 92)
import { useMeta } from 'quasar'
import { useSearchStore } from 'stores/search-store.js'
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const searchStore = useSearchStore()

const accommodations = computed(() => searchStore.accommodations)

const filteredAccommodations = ref([])
const form = ref({
  borough: null,
  category: null,
  bedrooms: null,
  min: null,
  max: null,
})

const filterMethod = () => {
  form.value = {
    ...form.value,
    bedrooms: form.value.bedrooms ? parseInt(form.value.bedrooms) : null,
    min: form.value.min ? parseInt(form.value.min) : null,
    max: form.value.max ? parseInt(form.value.max) : null,
  }
  filteredAccommodations.value = searchStore.filteringAccommodation(form.value)
}

const setFormWithSavedSearch = ($event) => {
  form.value = {
    borough: $event.borough,
    category: $event.category,
    bedrooms: $event.bedrooms,
    min: $event.min,
    max: $event.max,
  }
  filterMethod()
}

const resetMethod = () => {
  filteredAccommodations.value = searchStore.filteringAccommodation(null, true)
}

onMounted(() => {
  // Si aucun borough, on affiche tous les logements
  if (!route.params.search) {
    filteredAccommodations.value = accommodations.value
  } 
  // Dans le cas contraire, on filtre en fonction du borough sélectionné
  else {
    filteredAccommodations.value = accommodations.value.filter((accommodation) => {
      return accommodation.borough === route.params.search
    })
  }
})

// Voici le code qu'il fallait aussi ajouter pour que le titre de l'onglet soit bien Search
useMeta({
  title: 'Search',
})
</script>

<style lang="scss" scoped>
.accommodation-card {
  width: 300px;
  border-radius: 10px;
  cursor: pointer;

  &:hover {
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 1);
    transition: box-shadow 0.3s;
  }
}
</style>