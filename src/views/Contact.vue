<template>
  <section class="contact py-10" id="contact">
    <div class="container">
      <div class="parent flex md:flex-col justify-between items-center lg:flex">
        <div class="left w-1/2 aspect-square md:w-full">
          <img :src="image" alt="" class="w-full h-full object-cover">
        </div>
        <div class="right w-1/2 md:w-full">
          <form @submit.prevent="sendMessage" class="w-full h-full flex flex-col gap-8">
            <div class="flex flex-col">
              <label for="name">First Name</label>
              <input
                  id="name"
                  type="text"
                  placeholder="First name"
                  v-model="inputData.firstName"
                  class="py-3 px-2 border-gray border rounded focus:outline-brand"
              >
            </div>
            <div class="flex flex-col">
              <label for="name">Last Name</label>
              <input
                  id="name"
                  type="text"
                  placeholder="Last name"
                  v-model="inputData.lastName"
                  class="py-3 px-2 border-gray border rounded focus:outline-brand"
              >
            </div>
            <div class="flex flex-col">
              <label for="number">Your Number</label>
              <input
                  id="number"
                  type="text"
                  placeholder="Your number"
                  v-model="inputData.number"
                  class="py-3 px-2 border-gray border rounded focus:outline-brand"
              >
            </div>
            <v-select
              :options="courses"
              v-model="select"
              :clearable="false"
            />
            <input type="submit" value="Send" class="send border border-gray w-32 cursor-pointer py-1 rounded">
          </form>
        </div>
      </div>
    </div>
  </section>
</template>


<script>
import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css';

export default {
  data() {
    return {
      image: require('@/assets/icons/contact-img.svg'),
      inputData: {
        firstName: '',
        lastName: '',
        number: '+998',
      },
      select: this.courses[0]
    }
  },
  components: {
    vSelect
  },
  methods: {
    async sendMessage() {
      let msg = ``
      msg += `First Name: ${this.inputData.firstName} %0A`
      msg += `Last Name: ${this.inputData.lastName} %0A`
      msg += `Phone: ${this.inputData.number} %0A`
      msg += `Course: ${this.select}`

      if (this.inputData.firstName.length < 5 ||
          this.inputData.lastName.length < 6 ||
          this.inputData.number.length < 9) {
        alert('Enter your data')
        return
      } else if (this.select === 'Select course') {
        alert('Select course')
        return
      }

      const url = 'https://api.telegram.org/bot' +
          this.bot_token + '/sendMessage?chat_id=' +
          this.chat_id + '&parse_mode=html&text=' + `${msg}`
      await fetch(url)
      alert("Thank for choosing and i'll call you soon")
      this.inputData.firstName = ''
      this.inputData.lastName = ''
      this.inputData.number = '+998'
      this.select = this.courses[0]
    }
  },
  setup() {
    return {
      bot_token: '5110756390:AAHiOofM6GqVOxG78ehk3nH3MKKgN_0nG2k',
      chat_id: 1393665338,
      courses: ['Select course', 'Math', 'Russian']
    }
  }
}
</script>

<style scoped lang="scss">
.send {
  background: linear-gradient(0deg, #AB8462, #AB8462) no-repeat right bottom / 0 white;
  transition: background-size 350ms;
  &:where(:hover, :focus-visible) {
    background-size: 100%;
    background-position-x: left;
    color: #FFFFFF;
  }
}
</style>
