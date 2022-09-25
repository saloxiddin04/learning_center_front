<template>
  <header class="header" :class="{ active: is_scrolled }">
    <div class="container">
      <nav>
        <div class="logo">
          <img class="scale-125 object-cover" src="../assets/images/logo.png" alt="">
          <span class="uppercase text-orange-400">saxovat ta'lim</span>
        </div>

        <div class="burger" @click="is_open = !is_open" v-if="is_mobile">
          <span v-if="!is_open">&#9776;</span>
          <span class="rotate-45" v-else>&#10006;</span>
        </div>

        <ul class="menu" v-if="!is_mobile">
          <li v-for="item in menu_array" :key="item.text">
            <a :href="item.link">{{ item.text }}</a>
          </li>
        </ul>

        <ul class="mobile-menu" :class="{ active : is_open }" v-if="is_mobile">
          <li v-for="item in menu_array" :key="item.text">
            <a :href="item.link">{{ item.text }}</a>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script>
export default {
  name: 'Navbar',
  data() {
    return {
      is_open: false,
      is_mobile: false,
      is_scrolled: false,
      menu_array: [
        {
          text: 'Home',
          link: '#home'
        },
        {
          text: 'About',
          link: '#about'
        },
        {
          text: 'Courses',
          link: '#courses'
        },
        {
          text: 'Teachers',
          link: '#teachers'
        },
        {
          text: 'Reviews',
          link: '#reviews'
        },
        {
          text: 'Contact',
          link: '#contact'
        },
      ]
    }
  },
  methods: {
    checkScreenWidth() {
      const width = window.innerWidth
      if (width <= 770) {
        this.is_mobile = true
      } else {
        this.is_mobile = false
      }
    },
    checkScrolled() {
      const scroll = pageYOffset
      if (scroll > 0) {
        this.is_scrolled = true
      } else {
        this.is_scrolled = false
      }
    }
  },
  mounted() {
    this.checkScreenWidth()
    this.checkScrolled()
    window.addEventListener('resize', this.checkScreenWidth)
    window.addEventListener('scroll', this.checkScrolled)
  }
}
</script>

<style lang="scss" scoped>
a, ul {
  text-decoration: none;
  list-style: none;
}

.header {
  width: 100%;
  padding: 25px 0;
  background: rgba(0, 0, 0, 0.2);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  transition: 0.4s;

  &.active {
    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(7px);
  }

  nav {
    display: flex;
    justify-content: space-between;
    align-items: center;


    .burger {
      width: 30px;
      height: 30px;
      border-radius: 10px;
      display: flex;
      justify-content: center;
      align-items: center;
      border: 1px solid #FFFFFF;

      span {
        color: #FFFFFF;
      }
    }

    .mobile-menu {
      position: fixed;
      left: 0;
      top: 0;
      width: 250px;
      height: 100vh;
      background: rgba(0,0,0,0.9);
      backdrop-filter: blur(7px);
      padding: 25px;
      transform: translateX(-100%);
      transition: 0.5s;

      &.active {
        transform: translateX(0);
      }

      li {
        a {
          font-size: 25px;
          padding: 15px 0;
          display: inline-block;
          color: #ffffff;
        }
      }
    }

    .logo {
      display: flex;
      align-items: center;
      gap: 15px;
      font-size: 15px;
      color: #ffffff;
      font-weight: 700;
      cursor: pointer;

      img {
        height: 25px;
        object-fit: cover;
      }
    }

    .menu {
      display: flex;
      gap: 30px;

      li {
        a {
          font-size: 20px;
          color: #ffffff;
        }
      }
    }
  }

  @media screen and (max-width: 768px) {
    .container {
      max-width: 425px;
      margin: 0 auto;
    }
  }

  @media screen and (max-width: 425px) {
    .container {
      max-width: 375px;
    }
  }

  @media screen and (max-width: 375px) {
    .container {
      max-width: 320px;
    }
  }

  @media screen and (max-width: 320px) {
    .container {
      max-width: 100%;
    }
  }
}
</style>
