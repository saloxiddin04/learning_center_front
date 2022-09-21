<template>
  <section class="reviews py-20" id="reviews">
    <div class="container">
      <h1 class="uppercase text-5xl text-center">student's reviews</h1>
      <swiper
          :slidesPerView="setSliderPerView"
          :spaceBetween="30"
          :freeMode="true"
          :pagination="{
            clickable: true,
          }"
          :modules="[Pagination, FreeMode]"
          class="mySwiper py-10"
      >
        <swiper-slide v-for="review in reviews" :key="review._id" class="border-2 p-3">
          <p>{{ review.text }}</p>
          <div class="flex gap-3 items-center mt-3">
            <img v-if="review.avatar" :src="CreateUrl(review.avatar, 60, 60)" alt="" class="object-cover rounded-full">
            <h1>{{ review.full_name }}</h1>
          </div>
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

import "swiper/css/free-mode";
import "swiper/css/pagination";

// import required modules
import {FreeMode, Pagination} from "swiper";

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
    const reviews = computed(() => store.getters.reviews)
    onMounted(() => {
      store.dispatch('FETCH_REVIEWS')
      const query = '*[' +
          '_type == "author"] { ..., author->,}'
      subscription.value = sanity
          .listen(query)
          .subscribe(update => {
            switch (update.transition) {
              case "update":
                sanity.getDocument(update.result._rev).then(author => {
                  store.dispatch('UPDATE_REVIEWS', {
                    ...update.result, author
                  })
                })
                break;
              case "appear":
                sanity.getDocument(update.result._rev).then(author => {
                  store.dispatch('ADD_NEW_REVIEWS', {
                    ...update.result, author
                  })
                })
                break;
              case "disappear":
                store.dispatch('REMOVE_REVIEWS', update.documentId)
                break
            }
          })
    })
    onUnmounted(() => {
      subscription.value.unsubscribe()
    })
    return {
      reviews,
      CreateUrl,
      FreeMode,
      Pagination,
    };
  },
};
</script>
