<!-- eslint-disable max-len -->
<template>
  <!-- App -->
  <div class="flex bg-packed font-lexend dark:bg-gray-900">
    <div
      id="sidebar-scroll"
      class="fixed z-40 hidden h-screen overflow-auto bg-white border-r-2 flex-sidebar lg:flex-auto w-sidebar lg:block dark:bg-gray-800 dark:border-gray-700 lg:z-0 lg:relative"
    >
      <vSidebar />
    </div>
    <div class="flex-auto w-full h-screen overflow-auto" id="body-scroll">
      <vHeader />
      <router-view />
      <vFooter />
    </div>
  </div>
  <!-- end app -->
</template>
<!-- eslint enable -->

<script>
// vue Components
import Scrollbar from 'smooth-scrollbar'
import vFooter from '@/components/Footer.vue'
import vHeader from '@/components/Header.vue'
import vSidebar from '@/components/Sidebar.vue'
// npm-js

export default {
  name: 'App',

  components: {
    vHeader,
    vFooter,
    vSidebar,
  },
  mounted() {
    Scrollbar.init(document.querySelector('#body-scroll'))

    setTimeout(() => {
      const alertDis = document.querySelectorAll('.alert-dismiss')
      alertDis.forEach((x) => x.addEventListener('click', () => {
        x.parentElement.classList.add('hidden')
      }))
    }, 100)

    // var acc = document.getElementsByClassName("accordion");
    // var i;
    // for (i = 0; i < acc.length; i++) {
    //   acc[i].addEventListener("click", function () {
    //     this.classList.toggle("active");
    //     var panel = this.nextElementSibling;
    //     if (panel.style.display === "block") {
    //       panel.style.display = "none";
    //       this.classList.remove("bg-gray-100");
    //       this.classList.add("bg-transparent");
    //     } else {
    //       panel.style.display = "block";
    //       this.classList.add("bg-gray-100");
    //       this.classList.remove("bg-transparent");
    //     }
    //   });
    // }
  },
}
</script>
