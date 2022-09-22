<template>
  <main>
    <navbar/>
    <Home />
    <Courses/>
    <Teachers />
    <Reviews />
    <Contact/>
    <Footer/>
  </main>
</template>

<script>
import { mapActions } from "vuex"
import navbar from "@/components/navbar";
import Teachers from "@/views/Teachers";
import Reviews from "@/views/Reviews";
import Contact from "@/views/Contact";
import Footer from "@/views/Footer";
import Home from "@/views/Home";
import Courses from "@/views/Courses";

export default {
  name: 'App',
  components: {
    Courses,
    Home,
    Footer,
    Contact,
    Reviews,
    Teachers,
    navbar
  },
  methods: {
    ...mapActions(['CHANGE_WINDOW_WIDTH']),
    changeWindowWidth() {
      this.CHANGE_WINDOW_WIDTH(window.innerWidth)
    }
  },
  mounted() {
    this.changeWindowWidth()
    window.addEventListener('resize', this.changeWindowWidth)
  },
}
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
::selection {
  display: none;
}

html {
  scroll-behavior: smooth;
}

::-webkit-scrollbar {
  width: 5px;
}
::-webkit-scrollbar-track {
  background: transparent;
}
::-webkit-scrollbar-thumb {
  background: #C18E61;
  border-radius: 5px;
}

body {
  overflow-x: hidden;
}
.container {
  max-width: 1200px;
  margin: 0 auto;

  @media screen and (max-width: 768px) {
    max-width: 425px !important;
  }
  @media screen and (max-width: 425px) {
    max-width: 375px !important;
  }
  @media screen and (max-width: 375px) {
    max-width: 320px !important;
  }
  @media screen and (max-width: 320px) {
    width: 100% !important;
  }

}
</style>
