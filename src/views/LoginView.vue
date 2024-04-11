<script setup>
import { ref } from 'vue'
import { router } from '@/router'
import { useAuthStore } from '@/stores/AuthStore.js'
const authStore = useAuthStore()
import Button from '@/components/elements/Button.vue'

if (authStore.user) {
  router.push('/')
}

const form = ref({
  username: 'richard',
  password: 'poker',
})

function onSubmit() {
  return authStore
    .login(form.value)
    .then(() => {
      router.push('/')
    })
    .catch((error) => {
      console.log(error)
    })
}
</script>

<template>
  <div>
    <h1 class="login-title">Login</h1>
    <div class="login-container">
      <form action="#" method="POST" @submit.prevent="onSubmit">
        <div class="form-group">
          <label>
            <div class="form-placeholder">Username:</div>
            <input v-model="form.username" type="text" required />
          </label>
          <label>
            <div class="form-placeholder">Password:</div>
            <input v-model="form.password" type="password" required />
          </label>
          <Button :text="'Login'" :type="'submit'" />
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped lang="scss">
.login-title {
  margin: 0 auto 4rem;
  text-align: center;
  font-size: 4rem;
}

.form-placeholder {
  color: #000;
  margin-bottom: 5px;
}

.login-container {
  background-color: #fff;
  border-radius: 5px;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 50rem;
  margin: 0 auto;
  box-shadow: rgba(255, 255, 255, 0.4) 0px 4px 12px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 2rem;

  input[type='text'],
  input[type='password'] {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
}
</style>
