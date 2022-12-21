<script setup>
import { mdiStarCircle } from '@mdi/js'
import BaseLevel from '@/components/BaseLevel.vue'
import CardBox from '@/components/CardBox.vue'
import PillTag from '@/components/PillTag.vue'
import UserAvatarCurrentUser from '@/components/UserAvatarCurrentUser.vue'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()
</script>

<template>
  <CardBox>
    <BaseLevel type="justify-around lg:justify-center">
      <UserAvatarCurrentUser class="lg:mx-12 h-32 w-32" />
      <div class="space-y-3 text-center md:text-left lg:mx-12">
        <p class="text-2xl">
          <b>{{ userStore.user.name }}</b>
        </p>
        <p>{{ userStore.user.email }}</p>
        <div class="flex justify-center md:block" v-if="userStore.user.customer">
          <PillTag :label="`${userStore.user.customer?.points} points`" color="info" :icon="mdiStarCircle" />
        </div>
      </div>
    </BaseLevel>
  </CardBox>
</template>
