<template>
  <span @click="open" class="Createduty"><span class="add-icon"></span></span>
  <a-modal
    width="360px"
    v-model:visible="visible"
    title="写下1个新任务"
    okText="完成"
    @ok="add"
    destroyOnClose
  >
    <a-input
      v-model:value="inputValue"
      style="width: 300px; text-align: left; border-radius: 20px"
      allowClear
      placeholder="立下1个flag！"
      @pressEnter="add"
    ></a-input>
  </a-modal>
</template>

<script>
import { reactive, toRefs } from "vue";
import { message } from "ant-design-vue";
import { useStore } from "vuex";
export default {
  name: "Createduty",
  components: {},
  props: [],
  emits: [],
  setup() {
    const store = useStore();
    const state = reactive({
      inputValue: "",
      checked: false,
      currenttime: null,
      hellowword: "",
      visible: false,
    });

    const getDutyData = () => {
      const data = localStorage.getItem("dutys");
      if (data !== null) {
        return JSON.parse(data);
      } else {
        return [];
      }
    };
    const saveDutyData = () => {
      localStorage.setItem("dutys", JSON.stringify(store.state.dutys));
    };

    const randomRgb = () => {
      let R = Math.floor(Math.random() * 130 + 110);
      let G = Math.floor(Math.random() * 130 + 110);
      let B = Math.floor(Math.random() * 130 + 110);

      return [
        "rgb(" + R + "," + G + "," + B + ", .12)",
        "rgb(" + R + "," + G + "," + B + ")",
      ];
    };

    const open = () => {
      state.visible = true;
    };

    const add = () => {
      if (!state.inputValue) {
        message.info("请先输入1个任务");
        console.log("空");
      } else {
        for (let i = 0; i < store.state.dutys.length; i++) {
          if (store.state.dutys[i].basic.text === state.inputValue) {
            message.info("相同的flag已创建，且未完成哦！");
            return (state.inputValue = "");
          }
        }
        //不要把这一部分写到for里面，会导致无法正常循环
        const date = new Date();
        const time =
          date.getFullYear() +
          "-" +
          (date.getMonth() + 1) +
          "-" +
          date.getDate() +
          " " +
          date.getHours() +
          ":" +
          date.getMinutes() +
          ":" +
          date.getSeconds();
        

        const obj = {
          basic: {
            id: time.replace(/[^\d]/g, ""), //提取创建时间中的数字作为唯一id
            text: state.inputValue,
            done: state.checked,
            createTime: time,
            isEdit: state.isEdit,
            bgcolor: randomRgb(),
          },
        };

        store.commit("ADD", obj);
        const local = getDutyData();
        saveDutyData(local);
        state.inputValue = "";
        state.visible = false;
      }
    };

    return {
      ...toRefs(state),
      add,
      open,
    };
  },
};
</script>

<style lang="less" scoped>
.Createduty {
  text-align: center;
  border-radius: 20px;
  width: 32px;
  height: 24px;
  background-color: rgb(42, 208, 106);
  .add-icon {
    border-radius: 1px;
    display: inline-block;
    width: 10px;
    height: 2px;
    background: #fff;
    vertical-align: 2px;
  }
  .add-icon::after {
    content: "";
    display: block;
    border-radius: 1px;
    width: 10px;
    height: 2px;
    background: #fff;
    transform: rotate(90deg);
  }
}
</style>
