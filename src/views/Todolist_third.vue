<template>
  <div class="header-month">{{ currentY }}年{{ currentM }}月</div>
  <div class="webbox">
    <CalenderList class="calender-box"></CalenderList>
    <!-- <TodayList class="todaydutysbox" ></TodayList> -->
  </div>
</template>

<script>
import CalenderList from "@/components/CalenderList.vue";
// import TodayList from "@/components/TodayList";
import { reactive, computed, watch, toRefs, } from "vue";

export default {
  name: "Todolist_third",
  components: {CalenderList},
  // components: { CalenderList,TodayList },
  props: [],
  setup(props, context) {
    const state = reactive({
      hellowword: "",
      selecteddate: [],
    });

    // const todaydate = computed(() => {
    //   const date = new Date();
    //   state.selecteddate = [
    //     JSON.parse(date.getFullYear()).toString(),
    //     JSON.parse(date.getMonth()).toString(),
    //     JSON.parse(date.getdate()).toString(),
    //   ];
    // });

    const date = new Date();
    const currentY = computed(() => {
      return date.getFullYear();
    });

    const currentM = computed(() => {
      return date.getMonth() + 1;
    });

    const sayhi = computed(() => {
      let date = new Date();
      let hours = date.getHours();
      if (hours >= 5 && hours <= 10) {
        return "🌞早上好～冲鸭!";
      } else if (hours > 10 && hours <= 13) {
        return "🍣中午好～冲鸭!";
      } else if (hours > 13 && hours <= 18) {
        return "🌞下午好～冲鸭!";
      } else if (hours > 18 && hours <= 24) {
        return "🌛晚上好～冲鸭!";
      } else if (hours > 24 && hours <= 5) {
        return "✨夜深了～快睡鸭!";
      }
    });

    watch(
      () => {
        sayhi.value;
      },
      () => {
        state.hellowword = sayhi.value;
      },
      { immediate: true, deep: true } //如果我们需要在最初绑定值的时候也执行函数，就需要用到immediate属性
    );
    return {
      ...toRefs(state),
      currentY,
      currentM,
    };
  },
};
</script>

<style lang="less" scoped>
.webbox {
  display: flex;
  justify-content: space-between;
  margin: 0 40px 20px 40px;
  // border: 1px solid #f3f3f3;s
  .calender-box {
    // display: inline-block;
    // width: 100%;
    // height: 100%;
    border-right: 1px solid #f3f3f3;
  }
  // .todaydutysbox {
  //   // display: inline-block;
  //   // width: 100%;
  //   height: 100%;
  // }
}
.header-month {
  height: 40px;
  line-height: 40px;
  margin: 20px 40px 0 40px;
  background-color: #f3f3f3;
}
</style>
