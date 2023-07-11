<template>
  <div class="pics-box1">
    <h1 style="font-weight: 600">
      Industry-Leading Hinge for Ultimate Crease Control
    </h1>
    <img src="/images/1.1.png" alt="" class="pic1-1" />
  </div>
  <div class="pics-box2">
    <h1 style="font-weight: 600">Functionality at Your Fingertips</h1>
    <p style="color: #999; width: 40%; text-align: center; margin-left: 30%">
      Whether it’s your camera at your fingertips or access to the forecast so
      you’re dressed for the weather, customise your cover screen to supply the
      information and functionality you need.
    </p>
    <img class="pic2" src="/images/2.png" />
    <img class="pic1" src="/images/1.png" />
    <img class="pic-min" src="/images/main.png" />
    <img class="pic4" src="/images/4.png" />
    <img class="pic3" src="/images/3.png" />
  </div>
  <!-- <main class="container">
    <section class="panel-1">
      <h1>Panel 1</h1>
    </section>
    <section class="panel-2">
      <h1>Panel 2</h1>
    </section>
  </main> -->
</template>
<script>
import {
  computed,
  onMounted,
  mounted,
  reactive,
  toRefs,
  watch,
  ref,
  onUnmounted,
} from "vue";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
// import { ScrollToPlugin } from "gsap/ScrollToPlugin";

export default {
  name: "Companyweb",
  setup() {
    gsap.registerPlugin(ScrollTrigger);
    const t = gsap.timeline();

    onMounted(
      (ScrollTrigger.create = () => {
        ".pics-box2",
          {
            trigger: ".pics-box",
            start: "top top",
            end: "+=1500",
            markers: true,
            scrub: true,
            animation: t
              .fromTo(
                ".pic1",
                {
                  x: 0,
                  opacity:0
                },
                {
                  x: -170,
                  y: 40,
                  rotation: -25,
                  duration: 1,
                  opacity:1
                },
                1
              )
              .fromTo(
                ".pic2",
                {
                  x: 0,
                  opacity:0
                },
                {
                  x: -270,
                  y: 120,
                  rotation: -50,
                  duration: 1.5,
                  opacity:1
                },
                "<"
              )
              .fromTo(
                ".pic3",
                {
                  x: 0,
                  opacity:0
                },
                {
                  x: 160,
                  y: 40,
                  rotation: 25,
                  duration: 1,
                  opacity:1
                },
                1
              )
              .fromTo(
                ".pic4",
                {
                  x: 0,
                  opacity:0
                },
                {
                  x: 260,
                  y: 120,
                  rotation: 50,
                  duration: 1.5,
                  opacity:1
                },
                "<"
              ),
          };
      })
    );

    return {  };
  },
};
</script>

<style lang="less" scoped>
.pics-box1 {
  margin-bottom: 40px;
  .pic1-1 {
    height: 200px;
    width: auto;
    margin: 40px 0 0 0;
  }
}

.pic1,
.pic2,
.pic3,
.pic4 {
  display: inline-block;
  width: 120px;
  height: 220px;
  box-shadow: 0 0 20px 10px #00000005;
  overflow: visible;
  margin-left: -60px;
}
.pic1,
.pic2,
.pic3,
.pic4,
.pic-min {
  margin-top: 30px;
  border-radius: 20px;
  background-size: contain;
  background-repeat: no-repeat;
}
.pic-min {
  display: inline-block;
  width: 200px;
  height: 220px;
  background-size: contain;
  background-repeat: no-repeat;
}

.pic-min {
  position: absolute;
  margin-left: -100px;
  z-index: 9;
  //   background-image: url("/Users/liujin/Desktop/自学成才/vue/test_20230606/public/images/main.png");
}
.pic1 {
  position: absolute;
  //   background-image: url("/Users/liujin/Desktop/自学成才/vue/test_20230606/public/images/1.jpg");
}
.pic2 {
  position: absolute;
  //   background-image: url("/Users/liujin/Desktop/自学成才/vue/test_20230606/public/images/2.jpg");
}
.pic3 {
  position: absolute;
  //   background-image: url("/Users/liujin/Desktop/自学成才/vue/test_20230606/public/images/3.jpg");
}
.pic4 {
  position: absolute;
  //   background-image: url("/Users/liujin/Desktop/自学成才/vue/test_20230606/public/images/4.jpg");
}

body,
html {
  overflow-x: hidden;
}
body {
  margin: 0;
  font-family: sans-serif;
  color: #fff;
}
// section {
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   height: 100vh;
// }
// .panel-1 {
//   background: #423e3b;
// }
// .panel-2 {
//   background: #88498f;
// }
// h1 {
//   font-size: 4rem;
// }
</style>
