<script setup>
import { mdiAccountGroupOutline, mdiPlus } from '@mdi/js'
import { computed, onMounted, ref } from 'vue'
import BaseButton from '@/components/BaseButton.vue'
import IconRounded from '@/components/IconRounded.vue'
import UsersTable from '@/components/users/UsersTable.vue'
import SectionMain from '@/components/SectionMain.vue'
import LayoutAuthenticated from '@/layouts/LayoutAuthenticated.vue'
import { useUsersStore } from '@/stores/users'
import EmployeeModal from '@/components/users/EmployeeModal.vue'

const usersStore = useUsersStore()
const isModalActive = ref(false)
const filterByType = ref('')
const isFetching = ref(true)
const selectTypes = ref([])

const loadUsers = async () => {
  await usersStore.loadUsers().catch((error) => {
    console.log(error)
  })
}

const loadTypes = async () => {
  await usersStore.loadTypes().catch((error) => {
    console.log(error)
  })
}

const filteredUsers = computed(() => usersStore.getUsersByFilter(filterByType.value))

onMounted(async () => {
  // Calling loadProjects refreshes the list of projects from the API
  await loadUsers()
  await loadTypes()

  isFetching.value = false

  usersStore.types.forEach((type, index) => {
    selectTypes.value.push({
      id: index + 1,
      value: type.type,
      label: type.designation,
    })
  })
})
</script>

<template>
  <LayoutAuthenticated>
    <SectionMain>
      <EmployeeModal
        v-if="!isFetching"
        v-model="isModalActive"
        title="Add a new employee"
        :types="selectTypes"
        action="insert"
      />

      <!-- Start of header -->
      <section class="mb-6 flex items-center justify-between">
        <div class="flex items-center justify-start">
          <IconRounded :icon="mdiAccountGroupOutline" color="light" class="mr-3" bg />
          <h1 class="text-3xl leading-tight">Users</h1>
        </div>
        <BaseButton :icon="mdiPlus" color="whiteDark" @click="isModalActive = true" />
      </section>
      <!-- End of header -->

      <users-table :users="filteredUsers" :types="selectTypes" />

      <div class="mx-2 mt-2" v-if="!isFetching">
        <label class="mr-3">Filter by type:</label>
        <select
          class="pl-3 pr-12 py-2 focus:ring focus:outline-none border-gray-700 rounded bg-slate-800"
          v-model="filterByType"
        >
          <option :value="null" />
          <option v-for="item in selectTypes" :key="item.id" :value="item.value">
            {{ item.label }}
          </option>
        </select>
      </div>
    </SectionMain>
  </LayoutAuthenticated>
</template>
