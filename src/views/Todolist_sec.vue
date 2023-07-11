<template>
  <div style="height: 1200px">
    <div style="width: 500px; margin-left: calc(50% - 250px)">
      <h2>{{ hellowword }}</h2>
    </div>
    <Dutyslist />
    <Calender></Calender>
  </div>
</template>

<script>
import Createduty from "@/components/Createduty.vue";
import Dutyslist from "@/components/Dutyslist.vue";
import Calender from "@/components/Calender.vue";
import { reactive, computed, watch, toRefs } from "vue";

export default {
  name: "Todolist_sec",
  components: { Createduty, Dutyslist, Calender },
  setup() {
    const state = reactive({
      hellowword: "",
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
    };
  },
};
</script>

<style lang="less" scoped></style>
