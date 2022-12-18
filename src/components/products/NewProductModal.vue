<script setup>
import { mdiClose, mdiCurrencyEur, mdiFoodApple } from '@mdi/js'
import { computed, inject, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import BaseButton from '@/components/BaseButton.vue'
import BaseButtons from '@/components/BaseButtons.vue'
import CardBox from '@/components/CardBox.vue'
import CardBoxComponentTitle from '@/components/CardBoxComponentTitle.vue'
import OverlayLayer from '@/components/OverlayLayer.vue'
import { useProductsStore } from '@/stores/products'
import FormControl from '../FormControl.vue'
import FormField from '../FormField.vue'
import FormFilePicker from '../FormFilePicker.vue'

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  button: {
    type: String,
    default: 'info',
  },
  buttonLabel: {
    type: String,
    default: 'Done',
  },
  hasCancel: Boolean,
  modelValue: {
    type: [String, Number, Boolean],
    default: null,
  },
})

const router = useRouter()
const axios = inject('axios')
const productsStore = useProductsStore()
const errors = ref(null)
const operation = computed(() => {
  return !props.id || props.id < 0 ? 'insert' : 'update'
})

const emit = defineEmits(['update:modelValue', 'cancel', 'confirm'])

const value = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val),
})

const confirmCancel = (mode) => {
  value.value = false
  emit(mode)
}

const confirm = () => confirmCancel('confirm')

const cancel = () => confirmCancel('cancel')

window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && value.value) {
    cancel()
  }
})

/* Form */
const selectOptions = [
  { id: 1, label: 'Hot dish' },
  { id: 2, label: 'Cold dish' },
  { id: 3, label: 'Drink' },
  { id: 4, label: 'Dessert' },
]

const form = reactive({
  name: 'Carbonara',
  price: '8.75',
  type: selectOptions[0],
  description: 'Description blablabla',
  photo: null,
})

const newProduct = () => {
  return {
    id: null,
    name: form.name,
    description: form.description,
    type: form.type.label.toLowerCase(),
    price: form.price,
    photo: form.photo,
  }
}

const product = ref(newProduct())

const dataAsString = () => {
  return JSON.stringify(product.value)
}

let originalValueStr = ''
const loadProduct = (id) => {
  originalValueStr = ''
  // errors.value = null
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

const save = () => {
  errors.value = null
  product.value = newProduct()

  if (operation.value === 'insert') {
    productsStore
      .insertProduct(product.value)
      .then((insertedProduct) => {
        product.value = insertedProduct
        originalValueStr = dataAsString()
        // toast.success(
        //   'Product #' + product.value.id + ' was created successfully.'
        // )
        console.log('Product created')
        router.back()
      })
      .catch((error) => {
        if (error.response.status === 422) {
          // toast.error('Product was not created due to validation errors!')
          errors.value = error.response.data.errors
          console.log('Product was not created due to validation errors!')
        } else {
          // toast.error('Product was not created due to unknown server error!')
          console.log('Product was not created due to unknown server error!')
        }
      })
  } else {
    productsStore
      .updateProduct(product.value)
      .then((updatedProduct) => {
        product.value = updatedProduct
        originalValueStr = dataAsString()
        // toast.success(
        //   'Product #' + product.value.id + ' was updated successfully.'
        // )
        console.log('Product updated')
        router.back()
      })
      .catch((error) => {
        if (error.response.status === 422) {
          // toast.error(
          //   'Product #' +
          //     props.id +
          //     ' was not updated due to validation errors!'
          // )
          errors.value = error.response.data.errors
          console.log(
            `Product #${props.id} was not updated due to validation errors!`
          )
        } else {
          // toast.error(
          //   'Product #' +
          //     props.id +
          //     ' was not updated due to unknown server error!'
          // )
          console.log(
            `Product #${props.id} was not updated due to unknown server error!`
          )
        }
      })
  }
}

const reset = () => {
  form.name = ''
  form.price = ''
  ;[form.type] = selectOptions
  form.description = ''
  form.photo = null
}

const submit = () => {
  if (dataAsString() !== originalValueStr) {
    save()
  } else {
    cancel()
  }
}

// const formStatusCurrent = ref(0)

// const formStatusOptions = ['info', 'success', 'danger', 'warning']

// const formStatusSubmit = () => {
//   formStatusCurrent.value = formStatusOptions[formStatusCurrent.value + 1]
//     ? formStatusCurrent.value + 1
//     : 0
// }
</script>

<template>
  <OverlayLayer v-show="value" @overlay-click="cancel">
    <CardBox
      v-show="value"
      class="z-50 w-11/12 shadow-lg max-h-modal md:w-3/5 lg:w-2/5 xl:w-4/12"
      is-modal
    >
      <CardBoxComponentTitle :title="title">
        <BaseButton
          v-if="hasCancel"
          :icon="mdiClose"
          color="whiteDark"
          small
          rounded-full
          @click.prevent="cancel"
        />
      </CardBoxComponentTitle>

      <CardBox form @submit.prevent="submit">
        <FormField label="Name and Price">
          <FormControl v-model="form.name" :icon="mdiFoodApple" />
          <FormControl
            v-model="form.price"
            type="email"
            :icon="mdiCurrencyEur"
          />
        </FormField>

        <FormField label="Type">
          <FormControl v-model="form.type" :options="selectOptions" />
        </FormField>

        <FormField
          label="Description"
          help="A brief description of the product. Max 255 characters"
        >
          <FormControl
            v-model="form.description"
            type="textarea"
            placeholder="Product's description"
          />
        </FormField>

        <FormFilePicker v-model="form.photo" label="Upload an image" />

        <template #footer>
          <BaseButtons>
            <BaseButton
              type="submit"
              color="info"
              label="Submit"
              @click="submit"
            />
            <BaseButton
              type="reset"
              color="info"
              outline
              label="Reset"
              @click="reset"
            />
          </BaseButtons>
        </template>
      </CardBox>
    </CardBox>
  </OverlayLayer>
</template>
