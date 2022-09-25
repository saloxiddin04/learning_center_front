<template>
  <section class="about py-10" id="about">
    <div class="container">
      <div class="box flex justify-between items-center md:flex-col-reverse">
        <div class="left w-1/2 aspect-square md:w-full">
          <img class="w-full h-full" :src="aboutImage" alt="">
        </div>
        <div class="right w-1/2 text-center md:w-full">
          <h1 class="text-3xl mb-1 md:text-xl">Why choose us?</h1>
          <p class="md:text-sm">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad fugiat iste ratione sequi vero. Aspernatur
            beatae corporis dicta iure quaerat quasi velit veniam! Ad aliquam distinctio est iusto magnam repellendus.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      aboutImage: require('@/assets/icons/about-img.svg')
    }
  }
}
</script>
