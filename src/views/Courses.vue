<template>
  <section class="courses py-20" id="courses">
    <div class="container">
      <h1 class="text-center text-5xl uppercase">our courses</h1>
      <swiper
          :slides-per-view="setSliderPerView"
          :spaceBetween="30"
          :loop="true"
          class="mySwiper py-10"
      >
        <swiper-slide v-for="course in courses" :key="course.id" class="mt-16 flex flex-col items-center text-center p-2 border-blue border">
          <img class="w-24 aspect-square" :src="course.icon" alt="">
          <h1 class="text-2xl font-bold">{{course.name}}</h1>
          <p>{{course.text}}</p>
        </swiper-slide>
      </swiper>
    </div>
  </section>
</template>

<script>
// Import Swiper Vue.js components
import {Swiper, SwiperSlide} from "swiper/vue";

// Import Swiper styles
import "swiper/css";
import {mapGetters} from "vuex";


export default {
  data() {
    return {
      courses: [
        {
          id: 1,
          icon: require('@/assets/icons/calculator.svg'),
          name: 'Math',
          text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab accusantium aliquam consectetur culpa cum'
        },
        {
          id: 2,
          icon: require('@/assets/icons/laptop.svg'),
          name: 'Computer literacy',
          text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab accusantium aliquam consectetur culpa cum'
        },
        {
          id: 3,
          icon: require('@/assets/icons/person-circle.svg'),
          name: 'Russian',
          text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab accusantium aliquam consectetur culpa cum'
        },
        {
          id: 4,
          icon: require('@/assets/icons/airplane-engines.svg'),
          name: 'IELTS English',
          text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab accusantium aliquam consectetur culpa cum'
        },
        {
          id: 5,
          icon: require('@/assets/icons/bicycle.svg'),
          name: 'General English',
          text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab accusantium aliquam consectetur culpa cum'
        },
      ]
    }
  },
  computed: {
    ...mapGetters(['GET_WINDOW_WIDTH']),
    setSliderPerView() {
      if (this.GET_WINDOW_WIDTH < 639) {
        return 1
      } else if(this.GET_WINDOW_WIDTH < 768) {
        return 2
      } else if (this.GET_WINDOW_WIDTH < 1024) {
        return 3
      } else {
        return 4
      }
    }
  },
  components: {
    Swiper,
    SwiperSlide,
  },
};
</script>
