<template>
  <a-input
    v-model:value="inputvalue"
    placeholder="新任务..."
    class="input"
  ></a-input>
</template>

<script>
import { computed, reactive, toRefs } from "vue";
import { useStore } from "vuex";

export default {
  name: "DutyModal",
  components: [],
  setup() {
    const store = useStore();
    const state = reactive({
      dutys: store.state.dutys,
    });

    return {
      ...toRefs(state),
    };
  },
};
</script>

<style lang="less" scoped>
.input {
  height: 32px;
  width: 100%;
}
</style>
