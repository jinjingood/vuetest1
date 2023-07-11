<template>
  <div style="height: 5000px">
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
        you’re dressed for the weather, customise your cover screen to supply
        the information and functionality you need.
      </p>
      <img class="box pic2" src="/images/2.png" />
      <img class="box pic1" src="/images/1.png" />
      <img class="pic-min" src="/images/main.png" />
      <img class="box pic4" src="/images/4.png" />
      <img class="box pic3" src="/images/3.png" />
    </div>
  </div>
</template>

<script>
import { onMounted, ref, onUnmounted } from "vue";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

export default {
  name: "Companyweb2",
  setup() {
    gsap.registerPlugin(ScrollTrigger);
    const main = ref();
    let ctx;
    const t = gsap.timeline();
    (gsap.to = () => {
      ".pics-box1",
        {
          animation: gsap.fromTo(
            ".pic1-1",
            {
              scale: 0.5,
              opacity: 0,
            },
            { scale: 1.2, opacity: 1, duration: 1.5, y: 50 }
          ),
        };
    }),
      onMounted(() => {
        gsap.set(".pics-box1", {
          trigger: ".pics-box1",
          start: "top top",
          end: "+=1000",
          scrub: true,
          markers: true,
        });
        gsap.to(
          ".pics-box2>.box",
          {
            scrollTrigger: {
              trigger: ".pics-box2",
              start: "top top",
              end: "+=500",
              scrub: true,
              markers: true,
              pin: true,
            },
            animation: t
              .fromTo(
                ".pic1",
                {
                  x: 0,
                  opacity: 0,
                },
                {
                  x: -100,
                  y: 40,
                  rotation: -25,
                  duration: 1,
                  opacity: 1,
                },
                1
              )
              .fromTo(
                ".pic2",
                {
                  x: 0,
                  opacity: 0,
                },
                {
                  x: -200,
                  y: 120,
                  rotation: -50,
                  duration: 1.5,
                  opacity: 1,
                },
                "<"
              )
              .fromTo(
                ".pic3",
                {
                  x: 0,
                  opacity: 0,
                },
                {
                  x: 200,
                  y: 40,
                  rotation: 25,
                  duration: 1,
                  opacity: 1,
                },
                1
              )
              .fromTo(
                ".pic4",
                {
                  x: 0,
                  opacity: 0,
                },
                {
                  x: 300,
                  y: 120,
                  rotation: 50,
                  duration: 1.5,
                  opacity: 1,
                },
                "<"
              ),
            // });
            // });
          },
          main.value
        );
      });
    // onUnmounted(() => {
    //   ctx.revert(); // <- Easy Cleanup!
    // });
    return {};
  },
};
</script>

<style lang="less" scoped>
.pics-box1 {
  margin-bottom: 40px;
  height: 500px;
  .pic1-1 {
    height: 200px;
    width: auto;
    margin: 40px 0 0 0;
  }
}

.box {
  position: absolute;
  margin-top: 30px;
  border-radius: 20px;
  width: 120px;
  height: 220px;
  margin-left: -120px;
  background-size: contain;
  background-repeat: no-repeat;
}
.pic-min {
  position: absolute;
  margin-top: 30px;
  margin-left: -100px;
  width: 200px;
  height: 220px;
  z-index: 9;
}
</style>
