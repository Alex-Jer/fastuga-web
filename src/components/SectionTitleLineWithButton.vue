<script setup>
import { computed, useSlots, ref } from 'vue'
import BaseIcon from '@/components/BaseIcon.vue'
import IconRounded from '@/components/IconRounded.vue'
import ProductModal from '@/components/products/ProductModal.vue'

defineProps({
  icon: {
    type: String,
    default: null,
  },
  title: {
    type: String,
    required: true,
  },
  main: Boolean,
})

const hasSlot = computed(() => useSlots().default)
const isModalActive = ref(false)
</script>

<template>
  <ProductModal v-model="isModalActive" title="Add a new product" has-cancel />
  <section :class="{ 'pt-6': !main }" class="mb-6 flex items-center justify-between">
    <div class="flex items-center justify-start">
      <IconRounded v-if="icon && main" :icon="icon" color="light" class="mr-3" bg />
      <BaseIcon v-else-if="icon" :path="icon" class="mr-2" size="20" />
      <h1 :class="main ? 'text-3xl' : 'text-2xl'" class="leading-tight">
        {{ title }}
      </h1>
    </div>
    <slot v-if="hasSlot" />
    <!--<BaseButton v-else :icon="mdiPlus" color="whiteDark" @click="isModalActive = true" />-->
  </section>
</template>
