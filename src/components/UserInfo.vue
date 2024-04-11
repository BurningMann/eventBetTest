<script setup>
import { useAuthStore } from '@/stores/AuthStore.js'
const authStore = useAuthStore()

import UserIcon from '@/components/icons/UserIcon.vue'
import Button from '@/components/elements/Button.vue'
</script>

<template>
  <div class="user">
    <div class="user__avatar">
      <UserIcon />
    </div>
    <div class="user__name">
      {{ `user-${authStore?.user?.id}` }}
    </div>

    <Button :text="'Logout'" size="tiny" @click="authStore.logout" />
  </div>
</template>

<style scoped lang="scss">
.user {
  display: flex;
  flex-direction: column;
  gap: 1rem;

  &__avatar {
    width: 5rem;
    height: 5rem;
    border-radius: 50%;
    overflow: hidden;
    margin: 0 auto;
    border: 2px solid #642b72;
    padding: 5px;
  }

  &__name {
    text-align: center;
    font-size: 1.4rem;
    font-weight: 700;
  }
}
</style>
