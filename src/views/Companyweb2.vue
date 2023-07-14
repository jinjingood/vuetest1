<template>
  <div class="section p">
    <div>
      <h1>This is a big title</h1>
      <p>
        OPPO Find N2 FlipOPPO Find N2 Flip Discover the tech-savvy, style
        statement phone that lets you see more in a snap. The larger cover
        screen expands your view with innovative features, whilst the foldable
        design reimagines photography possibilities, all in a gorgeous and
        flawless design that you can pop in your pocket.
      </p>
    </div>
    <div class="section">
      <div class="btn one">1</div>
      <div class="btn two">2</div>
      <div class="btn three">3</div>
    </div>
  </div>

  <section class="section box1"></section>
  <section class="section box2"></section>
</template>

<script>
import { onMounted } from "vue";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default {
  name: "Companyweb2",
  setup() {
    gsap.registerPlugin(ScrollTrigger);
    const t = gsap.timeline({
      scrollTrigger: {//scrollTrigger不可以写到timeline里面？？
        trigger: ".box1",
        start: "25% 20% ", //第1个值是start，第2个值是：scroller-start
        end: "35% 30%", //与start同理(不写end的话，end和scroller-end就默认都是视窗底部)
        scrub: true,
        pin: true,
        markers: true,
      },
    });
    onMounted(() => {
      gsap.to(".section", {
        animation: t
          .fromTo(
            ".box1",
            { width: "100vw", opacity: 1 },
            { width: 0, opacity: 0 }
          )
          .fromTo(".p", { y: -300 }),
      });
    });
    return {};
  },
};
</script>

<style lang="less" scoped>
.p {
  padding: 0 80px;
  height: calc(100vh - 83px);
  // position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  z-index: 3;
}
.section {
  position: absolute;
  width: 100%;
}
.box1 {
  background: yellowgreen;
  height: 50vh;
  margin-top: 22vh;
  z-index: 2;
}
.box2 {
  background: rgb(50, 179, 205);
  margin-top: 22vh;
  height: 50vh;
}
.btn {
  display: inline-block;
  width: 8vw;
  height: 4vh;
  border-radius: 8px;
}
.one {
  background-color: aquamarine;
}
.two {
  background-color: #fff;
  margin: 0 12px;
}
.three {
  background-color: antiquewhite;
}
</style>
