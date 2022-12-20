<template>
  <OverlayLayer v-show="value" @overlay-click="cancel">
    <CardBox v-show="value" class="z-50 w-11/12 shadow-lg max-h-modal md:w-3/5 lg:w-2/5 xl:w-4/12" is-modal>
      <CardBoxComponentTitle :title="title">
        <BaseButton :icon="mdiClose" color="whiteDark" small rounded-full @click.prevent="cancel" />
      </CardBoxComponentTitle>

      <CardBox form @submit.prevent="submit">
        <FormField label="Name and Price">
          <FormControl v-model="form.name" :icon="mdiFoodApple" :disabled="props.action === 'view'" />
          <FormControl v-model="form.price" :icon="mdiCurrencyEur" :disabled="props.action === 'view'" />
        </FormField>

        <FormField label="Type">
          <FormControl v-model="form.type" :options="props.types" :disabled="props.action === 'view'" />
        </FormField>

        <FormField label="Description" help="A brief description of the product. Max 255 characters">
          <FormControl
            v-model="form.description"
            type="textarea"
            placeholder="Product's description"
            :disabled="props.action === 'view'"
          />
        </FormField>

        <FormFilePicker
          v-if="props.action === 'insert' || props.action === 'update'"
          label="Upload an image"
          v-model="form.photo"
        />

        <template #footer>
          <BaseButtons v-if="props.action === 'insert' || props.action === 'update'">
            <BaseButton type="submit" color="info" label="Submit" @click="submit" />
            <BaseButton type="reset" color="info" outline label="Reset" @click="reset" />
          </BaseButtons>
        </template>
      </CardBox>
    </CardBox>
  </OverlayLayer>
</template>

<script setup>
import { mdiClose, mdiCurrencyEur, mdiFoodApple } from '@mdi/js'
import { computed, reactive, ref, watch } from 'vue'
import { useToast } from 'vue-toastification'
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
  modelValue: {
    type: [String, Number, Boolean],
    default: null,
  },
  product: {
    type: Object,
    default: null,
  },
  types: {
    type: Array,
    default: () => [],
  },
  action: {
    type: String,
    default: '',
  },
})

const toast = useToast()
const productsStore = useProductsStore()

const emit = defineEmits(['update:modelValue', 'cancel', 'confirm'])

const value = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val),
})

const confirmCancel = (mode) => {
  value.value = false
  emit(mode)
}

// const confirm = () => confirmCancel('confirm')

const cancel = () => confirmCancel('cancel')

window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && value.value) {
    cancel()
  }
})

const form = reactive({
  name: props.product?.name,
  price: props.product?.price || '',
  type: props.product?.type || props.types[0]?.value,
  description: props.product?.description || '',
  photo: null,
})

const reset = () => {
  form.name = ''
  form.price = ''
  ;[form.type] = props.types
  form.description = ''
  // form.photo = null
}

watch(
  () => [props.product, props.types],
  ([product, types]) => {
    form.name = product?.name
    form.price = product?.price || ''
    form.type = product?.type || types[0]?.value
    form.description = product?.description || ''
    form.photo = null
  },
  { immediate: true }
)

const newProduct = () => {
  return {
    product_id: props.product?.product_id || null,
    name: form.name,
    description: form.description,
    type: form.type,
    price: form.price,
    photo: form.photo,
    photo_url: props.product?.photo_url || null,
  }
}

const product = ref(newProduct())

// const dataAsString = () => {
//   return JSON.stringify(product.value)
// }

// let originalValueStr = ''

const save = () => {
  product.value = newProduct()

  if (props.action === 'insert') {
    productsStore
      .insertProduct(product.value)
      .then((insertedProduct) => {
        product.value = insertedProduct
        // originalValueStr = dataAsString()
        toast.success(`Product #${insertedProduct.product_id} was created successfully.`)
        reset()
        cancel()
      })
      .catch((error) => {
        if (error.response.status === 422) {
          const errorMsg = JSON.parse(JSON.stringify(error.response.data.message))
          toast.error(errorMsg)
        } else {
          toast.error('Product was not created due to unknown server error!')
        }
      })
    return
  }

  productsStore
    .updateProduct(product.value)
    .then((updatedProduct) => {
      product.value = updatedProduct
      // originalValueStr = dataAsString()
      toast.success(`Product #${props.product.product_id} was updated successfully.`)
      cancel()
    })
    .catch((error) => {
      console.log({ error })
      if (error.status === 422) {
        const errorMsg = JSON.parse(JSON.stringify(error.data.message))
        toast.error(errorMsg)
      } else {
        toast.error(`Product #${props.product.product_id} was not updated due to unknown server error!`)
      }
    })
}

const validateForm = () => {
  const msg = "Please insert the product's"

  const formErrors = [
    !form.name && 'name',
    !form.price && 'price',
    !form.type && 'type',
    !form.description && 'description',
    !form.photo && props.action === 'insert' && 'photo',
  ].filter((error) => error)

  if (formErrors.length === 2) {
    toast.error(`${msg} ${formErrors.join(' and ')}`)
    return false
  }

  if (formErrors.length > 0) {
    toast.error(`${msg} ${formErrors.join(', ')}`)
    return false
  }

  return true
}

const submit = () => {
  if (!validateForm()) return
  // console.log(originalValueStr)
  save()

  // if (dataAsString() !== originalValueStr) {
  //   save()
  // } else {
  //   cancel()
  // }
}

// const formStatusCurrent = ref(0)

// const formStatusOptions = ['info', 'success', 'danger', 'warning']

// const formStatusSubmit = () => {
//   formStatusCurrent.value = formStatusOptions[formStatusCurrent.value + 1]
//     ? formStatusCurrent.value + 1
//     : 0
// }
</script>
