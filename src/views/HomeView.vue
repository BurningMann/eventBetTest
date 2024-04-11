<script setup>
const baseUrl = import.meta.env.VITE_APP_API_URL
import { ref, computed } from 'vue'
import axios from 'axios'
import Button from '@/components/elements/Button.vue'

import Sidebar from '@/components/Sidebar.vue'
import Card from '@/components/Card.vue'

const games = ref([])
const page = ref(1)
const perPage = 20

async function getGames() {
  const data = await axios.get(`${baseUrl}/casino/games?clientId=default`)
  games.value = data.data.data
}
getGames()
const gamesList = computed(() => {
  return games.value.slice(0, perPage * page.value)
})
</script>

<template>
  <div class="page-wrapper">
    <div>
      <Sidebar />
    </div>
    <div>
      <div class="catalog-wrapper">
        <div v-for="item in gamesList" :key="item.id">
          <Card :data="item.attributes" :id="item.id" />
        </div>
      </div>
      <div v-show="gamesList?.length" class="button-wrapepr">
        <Button :text="'Load more'" @click="page++" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.page-wrapper {
  display: grid;
  grid-template-columns: 20rem 1fr;
  gap: 2rem;
  min-height: 100lvh;
}

.catalog-wrapper {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(30rem, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;
}

.button-wrapepr {
  max-width: 30rem;
  margin: 0 auto;
}
</style>
