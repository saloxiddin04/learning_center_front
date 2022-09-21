<template>
  <section class="home min-h-screen" id="home">
    <Swiper
        :slides-per-view="setSliderPerView"
        :space-between="0"
        :loop="true"
        :autoplay="{
            delay: 2500,
            disableOnInteraction: false,
          }"
        :modules="[Autoplay]"
        class="h-full"
    >
      <swiper-slide v-for="img in images" :key="img._id">
        <img class="w-full h-screen object-cover" :src="CreateUrl(img.image)" alt="hero-image">
      </swiper-slide>
    </Swiper>
  </section>
</template>

<script>
import {mapGetters, useStore} from "vuex"
import {Swiper, SwiperSlide} from "swiper/vue";
import {Autoplay} from "swiper";
import "swiper/css";
import {computed, onMounted, onUnmounted, ref} from "vue";
import sanity from "@/client";
import {CreateUrl} from "@/utils";


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
    const images = computed(() => store.getters.mainImage)
    onMounted(() => {
      store.dispatch('FETCH_IMAGE')
      const query = '*[_type == "mainImage"]'
      subscription.value = sanity
          .listen(query)
          .subscribe(update => {
            switch (update.transition) {
              case "update":
                sanity.getDocument(update.result._rev).then(author => {
                  store.dispatch('UPDATE_IMAGE', {
                    ...update.result, author
                  })
                })
                break;
              case "appear":
                sanity.getDocument(update.result._rev).then(author => {
                  store.dispatch('ADD_NEW_IMAGE', {
                    ...update.result, author
                  })
                })
                break;
              case "disappear":
                store.dispatch('REMOVE_IMAGE', update.documentId)
                break
            }
          })
    })
    onUnmounted(() => {
      subscription.value.unsubscribe()
    })
    return {
      images,
      CreateUrl,
      Autoplay
    }
  }
};
</script>
