<template>
  <section class="group py-20" id="teachers">
    <div class="container">
      <h1 class="uppercase text-5xl text-center">expert teachers</h1>
      <swiper
          :slides-per-view="setSliderPerView"
          :space-between="35"
          :pagination="true"
          :autoplay="{
            delay: 2500,
            disableOnInteraction: false,
          }"
          :modules="modules"
          class="mySwiper py-10 text-dark text-center">
        <swiper-slide v-for="teacher in teachers" :key="teacher._id">
          <div class="relative slider">
            <div class="overflow-hidden">
              <img
                  v-if="teacher.image"
                  :src="CreateUrl(teacher.image)"
                  class="object-cover w-full ease-out duration-300 img"
                  alt=""
              >
            </div>
            <div class="social flex flex-col gap-3 absolute z-50 top-3 cursor-pointer ease-out duration-300">
              <a v-if="teacher.ins" :href="`https://instagram.com/${teacher.ins}`" class="p-2 bg-white reference"><img :src="instagram" class="w-8 h-8" alt=""></a>
              <a v-if="teacher.tg" :href="`https://t.me/${teacher.tg}`" class="p-2 bg-white reference"><img :src="telegram" class="w-8 h-8" alt=""></a>
            </div>
          </div>
          <h1>{{ teacher.full_name }}</h1>
        </swiper-slide>
      </swiper>
    </div>
  </section>
</template>

<script>
import {mapGetters, useStore} from "vuex";
import {computed, onMounted, onUnmounted, ref} from "vue";
import sanity from "@/client";
import {CreateUrl} from "@/utils";

// Import Swiper Vue.js components
import {Swiper, SwiperSlide} from "swiper/vue";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
// import required modules
import {Pagination, Autoplay} from "swiper";

export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  computed: {
    ...mapGetters(['GET_WINDOW_WIDTH']),
    setSliderPerView() {
      if (this.GET_WINDOW_WIDTH < 768) {
        return 1
      } else if (this.GET_WINDOW_WIDTH < 1024) {
        return 2
      } else {
        return 3
      }
    }
  },
  setup() {
    const subscription = ref(null)
    const store = useStore()
    const teachers = computed(() => store.getters.teachers)
    onMounted(() => {
      store.dispatch('FETCH_TEACHERS')
      const query = '*[' +
          '_type == "teacher"] { ..., author->,}'
      subscription.value = sanity
          .listen(query)
          .subscribe(update => {
            switch (update.transition) {
              case "update":
                sanity.getDocument(update.result._rev).then(author => {
                  store.dispatch('UPDATE_TEACHERS', {
                    ...update.result, author
                  })
                })
                break;
              case "appear":
                sanity.getDocument(update.result._rev).then(author => {
                  store.dispatch('ADD_NEW_TEACHERS', {
                    ...update.result, author
                  })
                })
                break;
              case "disappear":
                store.dispatch('REMOVE_TEACHERS', update.documentId)
                break
            }
          })
    })
    onUnmounted(() => {
      subscription.value.unsubscribe()
    })
    return {
      teachers,
      modules: [Autoplay, Pagination],
      CreateUrl,
      instagram: require('@/assets/icons/instagram.svg'),
      telegram: require('@/assets/icons/telegram.svg'),
    }
  },
};
</script>

<style scoped lang="scss">
.slider {
  .social {
    left: 100%;

    .reference {
      transition: 0.4s;
      &:hover {
        background: orange;
      }
    }
  }
}

.slider:hover {
  .img {
    transform: scale(1.1);
  }
  .social {
    left: 0.75rem;
  }
}
</style>
