<script setup>
const baseUrl = import.meta.env.VITE_APP_API_URL
import { ref } from 'vue'
import axios from 'axios'
import { useAuthStore } from '@/stores/AuthStore.js'
const authStore = useAuthStore()

const balance = ref([])

async function getBalance() {
  const data = await axios.get(`${baseUrl}/users/me/balance?auth=${authStore.user.attributes.token}`)
  balance.value = data.data.data
}
getBalance()

setInterval(() => {
  getBalance()
}, 30000)
</script>

<template>
  <div class="balance">
    <div v-for="(item, index) in balance" :key="item.id" class="balance__box">
      <div class="balance__box-label">{{ item.attributes.currency }} blanace</div>
      <div class="balance__box-value">{{ item.attributes.available }}</div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.balance {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  border-radius: 0.4rem;
  padding: 2rem 1rem;
  box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px,
    rgba(0, 0, 0, 0.2) 0px -3px 0px inset;

  &__box-label {
    font-size: 1.4rem;
  }

  &__box-value {
    font-size: 1.4rem;
    font-weight: 700;
  }
}
</style>
