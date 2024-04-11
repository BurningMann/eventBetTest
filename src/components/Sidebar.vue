<script setup>
import UserInfo from '@/components/UserInfo.vue'
import Balance from '@/components/Balance.vue'
</script>

<template>
  <div class="sidebar">
    <div class="sidebar__sticky">
      <div><UserInfo /></div>
      <div class="sidebar__balance"><Balance /></div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.sidebar {
  position: relative;
  height: 100%;
  box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px,
    rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
  padding: 2rem 1rem;

  &__sticky {
    position: sticky;
    top: var(--container-padding);
    display: flex;
    flex-direction: column;
    gap: 4rem;
  }
}
</style>

