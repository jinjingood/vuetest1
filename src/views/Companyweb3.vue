<template>
  <div class="nav">
    <h2>Navigation</h2>
  </div>

  <div class="intro blue"></div>

  <!-- <div class="today-page">
    <div class="today-header green sticky-today">
      <h2>Today header</h2>
    </div>

    <div class="today-content green">
      <p v-for="i in 42" :key="i">Today content</p>
    </div>
  </div> -->

  <div class="tomorrow-page">
    <div class="tomorrow-header purple sticky-tomorrow">
      <h2>Tomorrow header</h2>
    </div>

    <div class="tomorrow-content purple">
      <p v-for="i in 42" :key="i">Tomorrow content</p>
    </div>
  </div>

  <div class="footer">
    <p>Footer</p>
  </div>
</template>

<script></script>

<script>
import { onMounted, onUnmounted, ref } from "vue";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default {
  setup() {
    gsap.registerPlugin(ScrollTrigger);
    onMounted(() => {
      gsap.to(".sticky-today", {
        scrollTrigger: {
          trigger: ".sticky-today",
          start: "top bottom-=150",
          endTrigger: ".today-content",
          end: "bottom bottom-=75",
          pin: true,
          pinSpacing: false,
          scrub: true,
          // markers: true,
        },
      });
      gsap.to(".sticky-today", {
        scrollTrigger: {
          trigger: ".intro",
          start: "top top+=75",
          endTrigger: "html",
          end: "bottom bottom",
          pin: true,
          pinSpacing: false,
          scrub: true,
          markers: true,
        },
      });
      gsap.to(".sticky-tomorrow", {
        scrollTrigger: {
          trigger: ".sticky-today",
          start: "top bottom-=75",
          endTrigger: ".tomorrow-content",
          end: "bottom bottom-=75",
          pin: true,
          pinSpacing: false,
          scrub: true,
          // markers: true,
        },
      });
      gsap.to(".sticky-tomorrow", {
        scrollTrigger: {
          trigger: ".sticky-today",
          start: "top top+=150",
          endTrigger: "html",
          end: "bottom bottom",
          pin: true,
          pinSpacing: false,
          scrub: true,
          // markers: true,
        },
      });
    });
  },
};
</script>

<style lang="less" scoped>
html,
body {
  margin: 0;
  -webkit-overflow-scrolling: touch;
  // overflow-scrolling: touch;
  font-family: "Avenir", sans-serif, Arial;
}

* {
  margin: 0;
  padding: 0;
}

.nav {
  position: sticky;
  top: 0;
  z-index: 9999;
  width: 100%;
  height: 75px;
  background-color: #021c537b;
  color: white;
  text-align: center;
}

.intro {
  color: white;
  height: 75vh;
  width: 100%;
  text-align: center;
}

.today-header {
  background: #f4f4f4;
  height: 75px;
  width: 100%;
  text-align: center;
  cursor: pointer;
}

.today-content {
  height: 800px;
  text-align: center;
  overflow: hidden;
}

.tomorrow-header {
  background: #cecece;
  height: 75px;
  width: 100%;
  text-align: center;
  cursor: pointer;
}

.tomorrow-content {
  height: 800px;
  text-align: center;
}

.sticky-today {
  position: absolute;
  bottom: 75px;
}
.sticky-tomorrow {
  position: absolute;
  bottom: 0px;
}

.footer {
  left: 0;
  height: 800px;
  width: 100%;
  background-color: black;
  color: white;
  text-align: center;
}

.gray {
  background-color: #777;
}
.blue {
  background-color: #2c7ad2;
}
.purple {
  background-color: #8d3dae7b;
}
.green {
  background-color: #28a92a7b;
}
</style>
