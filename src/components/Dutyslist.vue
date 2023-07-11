<template>
  <div class="dutys-box">
    <span v-if="!dutys.length">我是任务列表</span>
    <div v-else>
      <div style="display: flex; justify-content: space-between">
        <span
          ><span>今日任务：{{ dutys.length }}</span>
          <span style="margin-left: 4px; color: #979797">{{
            "（ " + currenttime + " ）"
          }}</span></span
        >
        <Createduty></Createduty>
      </div>

      <div
        class="dutyitem-box"
        v-for="(item, index) in dutys"
        :key="item.basic.id"
        :style="{ background: item.basic.bgcolor[0] }"
      >
        <div class="dutyitem">
          <a-checkbox
            value(v-model)="checked"
            @change="setDone(item, index)"
          ></a-checkbox>
          <span class="duty-text">{{ item.basic.text }}</span>
        </div>
        <span class="delete-btn-bg" @click="deleteduty(index)">
          <span class="delete-icon"></span
        ></span>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs } from "vue";
import { useStore } from "vuex";
import { message } from "ant-design-vue";
import Createduty from "./Createduty.vue";

export default {
  name: "Dutyslist",
  components: { Createduty },
  props: [],
  emits: [],
  setup() {
    const store = useStore();
    const state = reactive({
      dutys: store.state.dutys,
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

    const getDoneData = () => {
      const data = localStorage.getItem("dones");
      if (data !== null) {
        return JSON.parse(data);
      } else {
        return [];
      }
    };
    const saveDoneData = () => {
      localStorage.setItem("dones", JSON.stringify(store.state.dones));
    };

    const deleteduty = (index) => {
      const local = getDutyData();
      store.commit("DELETE", index);
      saveDutyData(local);
    };
    const setDone = (item, index) => {
      console.log("进入setdone");
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
      const doneData = () => {
        let year = JSON.parse((date).getFullYear());
        let month = JSON.parse((date).getMonth());
        let day = JSON.parse((date).getDate());
        return [year.toString(), month.toString(), day.toString()];
      };

      const obj = {
        basic: {
          id: item.basic.id,
          text: item.basic.text,
          done: item.basic.done,
          createTime: item.basic.createTime,
          doneTime: time,
          donedata: doneData(),
          bgcolor: item.basic.bgcolor,
        },
      };
      store.commit("DELETE", index);
      store.commit("SETDONE", obj);
      const local = getDutyData();
      saveDutyData(local);
      const local2 = getDoneData();
      saveDoneData(local2);
      message.success(
        "恭喜，完成了人生第" + store.state.dones.length + "个小目标呀🎉",
        2
      );
      console.log("dutys："+state.dutys);
    };
    const date = new Date(); //返回的是从1970-1-1开始到目标时间经过的毫秒数，不是这个目标时间的字符串
    const year = date.getFullYear(); //返回指定日期的4位数年份
    const month = date.getMonth(); //因为month是从0-11，所以显示到界面上时要加1
    const day = date.getDate(); //返回指定日期是当月第几天
    const currenttime = year + "-" + (month + 1) + "-" + day;
    return { ...toRefs(state), deleteduty, setDone, currenttime };
  },
};
</script>

<style lang="less" scoped>
.dutys-box {
  margin-left: calc(50% - 250px);
  width: 500px;
  margin-top: 20px;
  text-align: left;
}
.dutyitem-box {
  display: flex;
  justify-content: space-between;
  padding: 8px 8px 8px 16px;
  margin: 10px auto;
  border-radius: 20px;
  .dutyitem {
    width: 80%;
    .ant-checkbox-inner {
      height: 18px;
      width: 18px;
      border-radius: 10px;
    }
  }
  .duty-text {
    margin-left: 8px;
    font-size: 15px;
    font-weight: 600;
  }
  .delete-btn-bg {
    height: 24px;
    width: 24px;
    background-color: #20ed9b00;
    border-radius: 12px;
    text-align: center;
    .delete-icon {
      border-radius: 1px;
      display: inline-block;
      width: 14px;
      height: 1px;
      background: #666;
      transform: rotate(45deg);
      vertical-align: 2px;
    }
    .delete-icon::after {
      content: "";
      display: block;
      border-radius: 1px;
      width: 14px;
      height: 1px;
      background: #666;
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
</style>
