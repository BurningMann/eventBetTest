<script setup>
import { ref } from 'vue'
const baseUrl = import.meta.env.VITE_APP_API_URL
import axios from 'axios'
import Button from '@/components/elements/Button.vue'

const props = defineProps({
  id: [String, Number],
  data: Object,
})

const loading = ref(false)

async function openDemo() {
  loading.value = true
  const data = await axios.post(`${baseUrl}/casino/games/${props.id}/session-demo?clientId=default`)
  const url = data.data.data[0].attributes['launch-options']['game-url']
  window.open(url, '_blank')
  loading.value = false
}
</script>

<template>
  <div class="card">
    <div class="card__image">
      <img :src="data.image" :alt="data.title" preload />
    </div>
    <div class="card__content">
      <div class="card__name">{{ data.title }}</div>
      <Button :text="'Play Demo'" :disabled="loading" @click="openDemo" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.card {
  width: 100%;
  border-radius: 1rem;
  overflow: hidden;
  background-color: #2a2f40;

  &__image {
    height: 20rem;
    background: #000;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__content {
    padding: 1rem;
  }

  &__name {
    margin-bottom: 1rem;
  }
}
</style>
