<template>
  <component :is="'button'" :type="type" class="button" :class="viewButton" :disabled="disabled">
    <span class="button__label">{{ text }}</span>

    <slot name="custom-icon" />
  </component>
</template>

<script setup>
import { computed } from 'vue'
const props = defineProps({
  text: {
    type: String,
    default: '',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  type: {
    type: String,
    default: 'button',
  },
  loading: {
    type: Boolean,
    default: false,
  },
  customIcon: {
    type: Boolean,
    default: false,
  },
  size: {
    type: String,
    default: 'large',
  },
})

const viewButton = computed(() => {
  let str = ''
  if (props.disabled) str = str + ' is-disabled'
  if (props.loading) str = str + ` is-loading`
  if (props.size) str = str + ` is-${props.size}`
  return str
})
</script>

<style scoped lang="scss">
.button {
  text-align: center;
  color: #fff;
  background: linear-gradient(90deg, #642b72 0%, #c5426e 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
  width: 100%;
  border-radius: 0.83rem;
  border: none;
  transition: 0.3s;

  &:hover {
    opacity: 0.8;
  }

  &__icon {
    flex-shrink: 0;

    path {
      stroke: currentColor;
    }
  }

  &.is-large {
    height: 5.8rem;
    font-weight: 700;
    font-size: 1.8rem;
  }

  &.is-small {
    height: 5.2rem;
    font-size: 1.5rem;
  }

  &.is-tiny {
    height: 3.2rem;
    font-size: 1.3rem;
  }

  &.is-disabled {
    opacity: 0.5;
    pointer-events: none;
  }

  &.is-loading {
    pointer-events: none;
  }
}
</style>
