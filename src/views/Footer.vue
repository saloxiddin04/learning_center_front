<template>
  <footer class="footer py-2">
    <div class="container">
      <div class="box flex items-center flex-col gap-1">
        <h1 class="text-xl uppercase">your logo</h1>
        <div class="flex gap-6">
          <img class="w-8 aspect-square object-cover" :src="instagram" alt="">
          <img class="w-8 aspect-square object-cover" :src="telegram" alt="">
        </div>
        <hr class="w-full mt-1 text-gray">
        <p>Copyright all reserved
          <a class="text-brand" href="https://t.me/SaloxWeb">SaloxWeb</a>
        </p>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  data() {
    return {
      instagram: require('@/assets/icons/instagram.svg'),
      telegram: require('@/assets/icons/telegram.svg'),
    }
  }
}
</script>
