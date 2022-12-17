<script setup>
import { mdiFoodAppleOutline, mdiTableOff } from '@mdi/js'
import CardBox from '@/components/CardBox.vue'
import CardBoxComponentEmpty from '@/components/CardBoxComponentEmpty.vue'
import NotificationBar from '@/components/NotificationBar.vue'
import SectionMain from '@/components/SectionMain.vue'
import SectionTitleLineWithButton from '@/components/SectionTitleLineWithButton.vue'
import TableSampleClients from '@/components/TableSampleClients.vue'
import LayoutAuthenticated from '@/layouts/LayoutAuthenticated.vue'
</script>

<template>
  <LayoutAuthenticated>
    <SectionMain>
      <SectionTitleLineWithButton
        :icon="mdiFoodAppleOutline"
        title="Products"
        main
      >
      </SectionTitleLineWithButton>

      <CardBox class="mb-6" has-table>
        <TableSampleClients checkable />
      </CardBox>

      <SectionTitleLineWithButton :icon="mdiTableOff" title="Empty variation" />

      <NotificationBar color="danger" :icon="mdiTableOff">
        <b>Empty table.</b> When there's nothing to show
      </NotificationBar>

      <CardBox>
        <CardBoxComponentEmpty />
      </CardBox>
    </SectionMain>
  </LayoutAuthenticated>
</template>
