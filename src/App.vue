<template>
  <!-- App -->
  <div class="flex bg-packed font-lexend dark:bg-gray-900">
    <div
      id="sidebar-scroll"
      class="fixed z-40 hidden h-screen overflow-auto bg-white border-r-2 flex-sidebar lg:flex-auto w-sidebar lg:block dark:bg-gray-800 dark:border-gray-700 lg:z-0 lg:relative"
    >
      <Sidebar />
    </div>
    <div class="flex-auto w-full h-screen overflow-auto" id="body-scroll">
      <Header />
      <router-view />
      <Footer />
    </div>
  </div>
  <!-- end app -->
</template>

<script>
// vue Components
import Sidebar from '@/components/Sidebar.vue';
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
// npm-js
import Scrollbar from 'smooth-scrollbar';

export default {
  name: 'App',

  components: {
    Header,
    Footer,
    Sidebar,
  },
  mounted() {
    Scrollbar.init(document.querySelector('#body-scroll'));

    setTimeout(() => {
      var alert_dis = document.querySelectorAll('.alert-dismiss');
      alert_dis.forEach((x) =>
        x.addEventListener('click', function () {
          x.parentElement.classList.add('hidden');
        })
      );
    }, 100);

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
};
</script>
