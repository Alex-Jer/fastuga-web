<script setup>
import { ref, watch, computed, onMounted, inject } from 'vue'
import { useRouter, onBeforeRouteLeave } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { useProductsStore } from '@/stores/products'

import ProjectDetail from './ProjectDetail.vue'

const router = useRouter()
const axios = inject('axios')
const toast = inject('toast')
const userStore = useUserStore()
const productsStore = useProductsStore()

const props = defineProps({
  id: {
    type: Number,
    default: null,
  },
})

const newProduct = () => {
  return {
    id: null,
    name: '',
    responsible_id: userStore.userId,
    status: 'P',
    preview_start_date: null,
    preview_end_date: null,
    real_start_date: null,
    real_end_date: null,
    total_hours: null,
    billed: false,
    total_price: null,
  }
}

const product = ref(newProduct())
const users = ref([])
const errors = ref(null)
const confirmationLeaveDialog = ref(null)

const dataAsString = () => {
  return JSON.stringify(product.value)
}

let originalValueStr = ''

const loadProduct = (id) => {
  originalValueStr = ''
  errors.value = null
  if (!id || id < 0) {
    product.value = newProduct()
    originalValueStr = dataAsString()
  } else {
    axios
      .get(`products/${id}`)
      .then((response) => {
        product.value = response.data.data
        originalValueStr = dataAsString()
      })
      .catch((error) => {
        console.log(error)
      })
  }
}

const operation = computed(() => {
  return !props.id || props.id < 0 ? 'insert' : 'update'
})

/* Change this function */
const save = () => {
  errors.value = null
  if (operation.value === 'insert') {
    productsStore
      .insertProduct(product.value)
      .then((insertedProduct) => {
        product.value = insertedProduct
        originalValueStr = dataAsString()
        toast.success(`Product #${product.value.id} was created successfully.`)
        router.back()
      })
      .catch((error) => {
        if (error.response.status === 422) {
          toast.error('Product was not created due to validation errors!')
          errors.value = error.response.data.errors
        } else {
          toast.error('Product was not created due to unknown server error!')
        }
      })
  } else {
    productsStore
      .updateProduct(product.value)
      .then((updatedProduct) => {
        product.value = updatedProduct
        originalValueStr = dataAsString()
        toast.success(`Product #${product.value.id} was updated successfully.`)
        router.back()
      })
      .catch((error) => {
        if (error.response.status === 422) {
          toast.error(
            `Product #${props.id} was not updated due to validation errors!`
          )
          errors.value = error.response.data.errors
        } else {
          toast.error(
            `Product #${props.id} was not updated due to unknown server error!`
          )
        }
      })
  }
}

const cancel = () => {
  originalValueStr = dataAsString()
  router.back()
}

let nextCallBack = null
const leaveConfirmed = () => {
  if (nextCallBack) {
    nextCallBack()
  }
}

onBeforeRouteLeave((to, from, next) => {
  nextCallBack = null
  const newValueStr = dataAsString()
  if (originalValueStr !== newValueStr) {
    nextCallBack = next
    confirmationLeaveDialog.value.show()
  } else {
    next()
  }
})

watch(
  () => props.id,
  (newValue) => {
    loadProduct(newValue)
  },
  {
    immediate: true,
  }
)

onMounted(() => {
  users.value = []
  axios
    .get('users')
    .then((response) => {
      users.value = response.data.data
    })
    .catch((error) => {
      console.log(error)
    })
})
</script>

<template>
  <confirmation-dialog
    ref="confirmationLeaveDialog"
    confirmationBtn="Discard changes and leave"
    msg="Do you really want to leave? You have unsaved changes!"
    @confirmed="leaveConfirmed"
  >
  </confirmation-dialog>

  <ProjectDetail
    :operationType="operation"
    :project="product"
    :users="users"
    :errors="errors"
    @save="save"
    @cancel="cancel"
  ></ProjectDetail>
</template>
