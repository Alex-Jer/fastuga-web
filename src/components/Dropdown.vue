<template>
  <div class="relative">
    <button class="relative z-10 flex items-center select-none focus:outline-none" @click="open = !open">
      <slot name="button"></slot>
    </button>

    <!-- to close when clicked on space around it in desktop-->
    <button
      class="fixed inset-0 w-full h-full cursor-default focus:outline-none"
      v-if="open"
      @click="open = false"
      tabindex="-1"
    ></button>
    <!--dropdown content: desktop-->
    <transition
      enter-active-class="transition-all duration-200 ease-out"
      leave-active-class="transition-all ease-in duration-750"
      enter-class="scale-75 opacity-0"
      enter-to-class="scale-100 opacity-100"
      leave-class="scale-100 opacity-100"
      leave-to-class="scale-75 opacity-0"
    >
      <div
        class="absolute hidden w-48 px-2 py-1 mt-4 text-sm bg-white border rounded shadow-lg md:block"
        :class="placement === 'right' ? 'right-0' : 'left-0'"
        v-if="open"
      >
        <slot name="content"></slot>
      </div>
    </transition>

    <!--dropdown content: mobile-->
    <transition
      enter-active-class="transition-all duration-200 ease-out"
      leave-active-class="transition-all ease-in duration-750"
      enter-class="scale-75 opacity-0"
      enter-to-class="scale-100 opacity-100"
      leave-class="scale-100 opacity-100"
      leave-to-class="scale-75 opacity-0"
    >
      <div
        class="fixed inset-x-0 bottom-0 z-20 w-full px-2 py-2 leading-loose bg-white shadow-2xl md:hidden"
        v-if="open"
      >
        <slot name="content"></slot>
      </div>
    </transition>
    <!-- to close when clicked on space around it in mobile-->
    <div
      class="fixed inset-0 z-10 w-full h-full bg-gray-900 opacity-50 md:hidden"
      @click="open = false"
      v-if="open"
    ></div>
  </div>
</template>

<script>
import emitter from 'tiny-emitter/instance'

export default {
  data() {
    return {
      open: false,
    }
  },
  props: {
    placement: {
      type: String,
      default: 'right',
      validator: (value) => ['right', 'left'].indexOf(value) !== -1,
    },
  },
  mounted() {
    const onEscape = (e) => {
      if (e.key === 'Esc' || e.key === 'Escape') {
        this.open = false
      }
    }

    document.addEventListener('keydown', onEscape)

    emitter.once('hook:beforeDestroy', () => {
      document.removeEventListener('keydown', onEscape)
    })
  },
}
</script>
