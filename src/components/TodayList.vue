<template>
  <div style="width: 100%; height: 100%">
    <div class="list-box" >
      <div
        v-for="(item, index) in seletcteddate"
        :key="index"
        class="duty-item"
      >
        <div class="duty-container">
          <div>
            <div
              class="duty-tag"
              :style="{
                background:
                  item.basic.type === 'work'
                    ? 'rgb(33, 105, 249)'
                    : 'rgb(253, 139, 31)',
              }"
            ></div>
            <span
              class="duty-title"
              :style="{
                color: item.basic.done === true ? '#999' : '#252525',
                textDecoration:
                  item.basic.done === true ? 'line-through' : 'none',
              }"
              >{{ item.basic.title }}</span
            >
          </div>
          <span class="done-btn-bg" @click="setdone(index, item)"> ok</span>
        </div>

        <span class="delete-btn-bg" @click="deleteduty(index)">
          <span class="delete-icon"></span
        ></span>
      </div>
    </div>
    
    <div class="add-box">
      <span>添加今日计划</span>
      <div>
        <div
          class="add-input-box"
          v-if="workinput_Visible || actioninput_Visible"
        >
          <a-input
            v-if="workinput_Visible"
            v-model:value="inputwork"
            placeholder="我要做···"
            class="work-input"
            @pressEnter="add"
          ></a-input>
          <a-input
            v-if="actioninput_Visible"
            v-model:value="inputaction"
            placeholder="我要打卡···"
            class="action-input"
            @pressEnter="add"
          ></a-input>
        </div>
        <div
          class="add-btn-box"
          v-if="!workinput_Visible && !actioninput_Visible"
        >
          <div class="add-work-bg" @click="workinput_Visible = true">
            <span class="add-work-btn"></span>
          </div>

          <div class="add-action-bg" @click="actioninput_Visible = true">
            <span class="add-action-btn"></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, reactive, toRefs, watch } from "vue";
import { useStore } from "vuex";
import { message } from "ant-design-vue";
// import DutyModal from "./DutyModal.vue";

export default {
  name: "TodayList",
  // components: [DutyModal],
  props: ["seletcteddate", "selectedYMD"],
  setup(props) {
    const store = useStore();
    const state = reactive({
      dutys: store.state.third_dutys,
      inputwork: "",
      inputaction: "",
      done: false,
      workinput_Visible: false,
      actioninput_Visible: false,
      currentduty:undefined
    });

    watch(
      () => {
        props.seletcteddate;
      },
      () => {
        state.currentduty = {...props.seletcteddate};
        console.log("props.seletcteddate:" + props.seletcteddate);
        console.log("currentduty:" + state.currentduty);
      },
      { immediate: true }
    );

    const date = new Date();
    state.seletcted_date = date;

    const getDutyData = () => {
      const data = localStorage.getItem("third_dutys");
      if (data !== null) {
        return JSON.parse(data);
      } else {
        return [];
      }
    };
    const saveDutyData = () => {
      localStorage.setItem(
        "third_dutys",
        JSON.stringify(store.state.third_dutys)
      );
    };

    const getDoneData = () => {
      const data = localStorage.getItem("third_dones");
      if (data !== null) {
        return JSON.parse(data);
      } else {
        return [];
      }
    };
    const saveDoneData = () => {
      localStorage.setItem(
        "third_dones",
        JSON.stringify(store.state.third_dones)
      );
    };

    const add = () => {
      if (!state.inputwork && !state.inputaction) {
        message.info("请输入内容");
        return (state.inputwork = ""), (state.inputaction = " ");
      } else {
        for (let i = 0; i < store.state.third_dutys.length; i++) {
          if (state.inputwork === store.state.third_dutys[i].basic.title) {
            message.info("已有1条相同的任务哦！");
            return (state.inputwork = "");
          } else if (
            state.inputaction === store.state.third_dutys[i].basic.title
          ) {
            message.info("已有1条相同的任务哦！");
            return (state.inputaction = "");
          }
        }
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
        // const createdY = date.getFullYear().toString();
        // const createdM = date.getMonth().toString();
        // const createdD = date.getDate().toString();
        const createdY = props.selectedYMD.year;
        const createdM = props.selectedYMD.month;
        const createdD = props.selectedYMD.day;

        const obj = {
          basic: {
            id: time.replace(/[^\d]/g, ""),
            title: state.inputwork ? state.inputwork : state.inputaction,
            type: state.inputwork ? "work" : "action",
            done: state.done,
          },
          createdtime: { createdY, createdM, createdD },
        };
        
        store.commit("THIRD_ADD", obj);
        const local = getDutyData();
        saveDutyData(local);
        state.inputwork = "";
        state.inputaction = "";
        state.workinput_Visible = false;
        state.actioninput_Visible = false;
        console.log("dutys:" + state.dutys);
      }
    };
    const deleteduty = (index) => {
      const local = getDutyData();
      store.commit("THIRD_DELETE", index);
      saveDutyData(local);
    };

    const setdone = (index, item) => {
      const date = new Date();
      const createdY = date.getFullYear().toString();
      const createdM = date.getMonth().toString();
      const createdD = date.getDate().toString();
      state.dutys[index].basic.done = item.basic.done === true ? false : true;
      const obj = {
        ...item,
        donetime: { createdY, createdM, createdD },
      };

      // store.commit("FRESH_DUTYS", index);
      const local = getDutyData();
      saveDutyData(local);
      store.commit("THIRD_SETDONE", obj);
      const local2 = getDoneData();
      saveDoneData(local2);
      message.info("耶✌️");
    };

    // const hasdutys = () => {
    //   const date = state.seletcted_date;
    //   const y = date.getFullYear().toString();
    //   const m = date.getMonth().toString();
    //   const d = date.getDate().toString();
    //   for (let i = 0; i < store.state.third_dutys.length; i++) {
    //     dutyY = store.state.third_dutys[i].createdY;
    //     dutyM = store.state.third_dutys[i].createdM;
    //     dutyD = store.state.third_dutys[i].createdD;
    //     if (y === dutyY && m === dutyM && d === dutyD) {
    //       console.log("选中y：" + y, "选中day:" + d);
    //       return true;
    //     }
    //   }
    // };

    onMounted(() => {
      console.log("selecteddate" + props.selecteddate);
    });

    return {
      ...toRefs(state),
      add,
      deleteduty,
      setdone,
    };
  },
};
</script>

<style lang="less" scoped>
.list-box {
  display: block;
  padding: 8px;
  width: 100%;
  min-height: 200px;
  max-height: 350px;
  overflow: hidden;
  overflow-y: scroll;
  .duty-item {
    display: flex;
    justify-content: space-between;
    height: 40px;
    margin-bottom: 8px;
    line-height: 40px;
    &:hover {
      .duty-container {
        background: #f9f9f9;
        border: 1px solid #f0f0f0;
      }
      .done-btn-bg,
      .delete-btn-bg {
        display: block;
      }
    }
  }
  .duty-container {
    display: flex;
    justify-content: space-between;
    width: 90%;
    border-radius: 20px;
    border: 1px solid #97979700;
    text-align: left;
    font-size: 15px;
    font-weight: 600;
  }
  .duty-tag {
    display: inline-block;
    width: 10px;
    height: 10px;
    margin: 0 8px;
    border-radius: 10px;
    background: rgb(33, 105, 249);
  }
  .duty-title {
    padding: 0 4px;
  }
  .done-btn-bg {
    display: none;
    height: 30px;
    width: 30px;
    margin: 4px;
    line-height: 30px;
    text-align: center;
    color: #fff;
    border-radius: 20px;
    background: rgb(33, 105, 249);
  }
  .delete-btn-bg {
    display: none;
    height: 24px;
    width: 24px;
    margin: 8px 0;

    border-radius: 12px;
    text-align: center;
    .delete-icon {
      border-radius: 1px;
      display: inline-block;
      width: 14px;
      height: 2px;
      margin-bottom: 18px;
      background: #999;
      transform: rotate(45deg);
      vertical-align: middle;
    }
    .delete-icon::after {
      content: "";
      display: block;
      border-radius: 1px;
      width: 14px;
      height: 2px;
      background: #999;
      transform: rotate(-90deg);
    }
  }
  .delete-btn-bg:hover {
    background-color: #eb4015;
    .delete-icon {
      background: #fff;
    }
    .delete-icon::after {
      background: #fff;
    }
  }
}
.add-box {
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 50px;
  text-align: right;
  background: #f9f9f9;
  z-index: 999;
  padding: 8px 16px;
  > span {
    color: #999;
    line-height: 38px;
  }
  .add-btn-box {
    height: 30px;
    margin: 2px 0;
    .add-work-bg {
      display: inline-block;
      text-align: center;
      width: 30px;
      height: 30px;
      margin-right: 16px;
      border-radius: 20px;
      background-color: rgb(33, 105, 249);
      border: 1px solid rgb(32, 95, 223);
      .add-work-btn {
        border-radius: 1px;
        display: inline-block;
        width: 10px;
        height: 2px;

        background: #fff;
      }
      .add-work-btn::after {
        content: "";
        display: block;
        border-radius: 1px;
        width: 10px;
        height: 2px;
        background: #fff;
        transform: rotate(90deg);
      }
    }
    .add-action-bg {
      display: inline-block;
      text-align: center;
      border-radius: 20px;
      width: 30px;
      height: 30px;
      background-color: rgb(253, 139, 31);
      border: 1px solid rgb(233, 124, 23);
      .add-action-btn {
        border-radius: 1px;
        display: inline-block;
        width: 10px;
        height: 2px;
        background: #fff;
      }
      .add-action-btn::after {
        content: "";
        display: block;
        border-radius: 1px;
        width: 10px;
        height: 2px;
        background: #fff;
        transform: rotate(90deg);
      }
    }
    .add-input-box {
      padding: 4px 16px;
      .action-input,
      .work-input {
        width: 100%;
        height: 30px;
        border-radius: 20px;
        z-index: 2;
      }
      .work-input {
        color: rgb(33, 105, 249);
        background: rgba(33, 105, 249, 0.06);
        border: 1px solid rgb(32, 95, 223);
      }
      .action-input {
        color: rgb(253, 139, 31);
        background: rgba(253, 139, 31, 0.06);
        border: 1px solid rgb(233, 124, 23);
      }
    }
  }
}
</style>
