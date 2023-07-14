<template>
  <div class="fix-top">
    <div class="logo">OPPO</div>
    <div class="nev">OPPO Find N2 Flip</div>
  </div>

  <div class="header boxes-container">
    <div class="header-titles Helement">
      <h1>OPPO Find N2 Flip</h1>
      <h1>See More in a Snap</h1>
    </div>
    <div class="header-imgs Helement">
      <img class="left1 Helement" src="/images/left1.png" />
      <img class="right1 Helement" src="/images/right1.png" />
    </div>

    <div class="header-text">
      OPPO Find N2 FlipOPPO Find N2 Flip Discover the tech-savvy, style
      statement phone that lets you see more in a snap. The larger cover screen
      expands your view with innovative features, whilst the foldable design
      reimagines photography possibilities, all in a gorgeous and flawless
      design that you can pop in your pocket.
    </div>
  </div>
  <div class="pics-box boxes-container">
    <h1 style="font-weight: 600">
      Industry-Leading Hinge for Ultimate Crease Control
    </h1>
    <img src="/images/1.1.png" alt="" class="pic1-1" />
  </div>
  <div class="pics-boxx boxes-container">
    <div class="pics-boxx-text">
      <h1 style="font-weight: 600">Functionality at Your Fingertips</h1>
      <p style="color: #999; text-align: center; position: absolute">
        Whether it’s your camera at your fingertips or access to the forecast so
        you’re dressed for the weather, customise your cover screen to supply
        the information and functionality you need.
      </p>
    </div>
    <div
      style="width: 100%; height: 500px; display: flex; justify-content: center"
    >
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

export default {
  name: "Companyweb1",
  setup() {
    gsap.registerPlugin(ScrollTrigger);
    const ht = gsap.timeline({
      scrollTrigger: {
        trigger: ".header",
        start: "100 top",
        scrub: true,
        markers: true,
      },
    });
    const t = gsap.timeline({
      scrollTrigger: {
        trigger: ".pics-box",
        start: "1800 top",
        end: "2500 top",
        scrub: true,
        markers: true,
      },
    });
    const tt = gsap.timeline({
      scrollTrigger: {
        trigger: ".pics-boxx",
        start: "4500",
        end: "5500",
        scrub: true,
        markers: true,
      },
    });
    onMounted(() => {
      gsap.to(".header", {
        scrollTrigger: { trigger: ".header", pin: true },
        animation: ht
          .to(".header>.header-imgs>.left1", {
            x: -150,
            scale: 0.8,
            opacity: 0,
            duration: 1,
          })
          .to(
            ".header>.header-imgs>.right1",
            {
              x: 150,
              scale: 0.8,
              opacity: 0,
              duration: 1,
            },
            "<"
          )
          .fromTo(
            ".header>.header-titles",
            {
              opacity: 1,
            },
            { opacity: 0, y: -100, duration: 1 },
            "<"
          )
          .fromTo(
            ".header>.header-text",
            { scale: 0.5, opacity: 0 },
            { scale: 1.2, opacity: 1, duration: 2 },
            "-=0.8"
          ),
      });
      gsap.to(".pics-box", {
        scrollTrigger: { trigger: ".pics-box", pin: true },
        animation: t.fromTo(
          ".pic1-1",
          {
            scale: 0.3,
            opacity: 0,
          },
          { scale: 1.5, duration: 3, y: 30, opacity: 1 },
          1
        ),
      });
      gsap.to(".pics-boxx", {
        scrollTrigger: { trigger: ".pics-boxx", pin: true },
        animation: tt
          .fromTo(
            ".pics-boxx-text",
            { opacity: 0, y: 40 },
            { opacity: 1, y: 0 }
          )
          .fromTo(
            ".pic1",
            { y: 10, opacity: 0 },
            {
              x: -180,
              y: 40,
              rotation: -25,
              duration: 1,
              opacity: 1,
            }
          )
          .fromTo(
            ".pic2",
            { y: 10, opacity: 0 },
            {
              x: -290,
              y: 120,
              rotation: -50,
              duration: 1.5,
              opacity: 1,
            },
            "<"
          )
          .fromTo(
            ".pic3",
            { y: 10, opacity: 0 },
            {
              x: 180,
              y: 40,
              rotation: 25,
              duration: 1,
              opacity: 1,
            },
            "<"
          )
          .fromTo(
            ".pic4",
            { y: 10, opacity: 0 },
            {
              x: 290,
              y: 120,
              rotation: 50,
              duration: 1.5,
              opacity: 1,
            },
            "<"
          )
          .fromTo(
            ".pic-min",
            {
              y: 10,
              opacity: 0,
            },
            {
              y: 0,
              duration: 0.3,
              opacity: 1,
            },
            "<"
          ),
      });
    });

    return {};
  },
};
</script>

<style lang="less" scoped>
.boxes-container {
  width: 100%;
  height: calc(100vh - 150px);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  // gap: 1rem;
}
.fix-top {
  position: sticky;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: #fff;
  border-bottom: 1px solid #00000010;
  z-index: 99;
  .logo {
    margin-left: 50px;
    font-size: 20px;
    text-align: left;
  }
  .nev {
    padding: 10px 50px 4px 50px;
    text-align: left;
  }
}

.header {
  .header-titles {
    > h1:first-child {
      margin: 0;
      font-size: 30px;
      line-height: 30px;
    }
    > h1:last-child {
      margin-top: 20px;
      font-size: 50px;
      font-weight: 600;
      line-height: 50px;
    }
  }
  .header-imgs {
    .left1,
    .right1 {
      width: 266px;
      height: 100%;
      background-size: contain;
      background-repeat: no-repeat;
    }
    .left1 {
      margin-right: 20px;
    }
    .left2 {
      margin-left: 20px;
    }
  }

  .header-text {
    position: absolute;
    width: 40%;
    margin-top: 50px;
  }
}
.pics-box {
  .pic1-1 {
    height: 200px;
    width: auto;
    margin: 80px 0 0 0;
  }
}
.pics-boxx {
  .box {
    position: absolute;
    margin-top: 120px;
    width: 120px;
    height: auto;
    background-size: contain;
    background-repeat: no-repeat;
    border-radius: 14px;
    box-shadow: 0 0 20px 5px #00000010;
  }
  .pic-min {
    position: absolute;
    margin-top: 120px;
    width: 200px;
    height: auto;
    z-index: 9;
  }
}
</style>
