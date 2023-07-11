<template>
  <h2>{{ hellowword }}</h2>
  <div class="about">
    <div class="dutybg">
      <a-input
        v-model:value="inputValue"
        style="width: 300px; text-align: left"
        allowClear
        placeholder="立下1个flag！"
        @pressEnter="add"
      ></a-input>

      <div class="dutylist">
        <span>未完成任务数：{{ dutys.length }}</span>
        <div
          v-if="dutys.length === 0 && dones.length !== 0"
          style="line-height: 60px; text-align: center"
        >
          我立的flag都完成了，太秀了！
        </div>
        <div
          class="dutyitem-bg"
          v-for="(item, index) in dutys"
          :key="item.basic.id"
          :style="{
            background: item.basic.bgcolor[0],
            color: item.basic.bgcolor[1],
          }"
        >
          <div style="display: flex; justify-content: space-between">
            <span class="dutyitem">
              <a-checkbox
                v-model:checked="item.basic.done"
                :value="item.basic.text"
                :key="item.basic.text"
                @change="setdone(item, index)"
              ></a-checkbox>
              <div
                class="dutytext"
                v-if="!dutys[index].basic.isEdit"
                @dblclick="dbclick(item, index)"
              >
                {{ item.basic.text }}
              </div>
              <a-input
                v-else
                v-model:value="item.basic.text"
                allowClear
                @pressEnter="editname(item, index)"
                class="rename-input"
              ></a-input>
            </span>
            <span class="delete-btn-bg" @click="deleteduty(item)">
              <span class="delete-icon"></span
            ></span>
          </div>
          <div
            style="
              font-size: 12px;
              color: #999;
              text-align: left;
              margin-top: 8px;
            "
          >
            创建时间：{{ item.basic.createTime }}
          </div>
        </div>
      </div>
      <div class="donelist" v-if="dones.length">
        <span>已完成任务数：{{ dones.length }}</span>
        <div class="donebg" v-for="item in dones" :key="item.basic.id">
          <div class="doneitem">
            <div id="done-box" style="display: inline-block">
              <span id="done-text">{{ item.basic.text }}</span>
            </div>
            <div class="done-btns">
              <span @click="retodo(item, index)">恢复</span>
              <span @click="copy(item, index)">再做一次</span>
            </div>
          </div>
          <div
            style="
              display: block;
              font-size: 12px;
              color: #999;
              text-align: right;
              padding-top: 8px;
              margin-top: 4px;
              border-top: 1px solid #0000000a;
            "
          >
            完成时间：{{ item.basic.doneTime }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, reactive, toRefs, watch } from "vue";
import { message } from "ant-design-vue";
import { useStore } from "vuex";

export default {
  name: "About",
  props: [],
  emits: [],
  components: [],
  setup() {
    const store = useStore();
    const state = reactive({
      inputValue: "",
      dutys: store.state.dutys,
      dones: store.state.dones,
      checked: false,
      isEdit: false,
      currenttime: null,
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
        console.log(sayhi.value);
      },
      { immediate: true, deep: true } //如果我们需要在最初绑定值的时候也执行函数，就需要用到immediate属性
    );

    // const fsizeAuto = computed(() => {
    //   let fontbox = document.getElementById("done-box");
    //   let fonttext = document.getElementById("done-text");
    //   let size = 14;
    //   fonttext.style.fontSize = size;
    //   let scrollWidth = fonttext.scrollWidth;
    //   if (
    //     fonttext.scrollWidth > document.getElementById("done-box").offsetWidth
    //   ) {
    //     scrollWidth = fonttext.scrollWidth;
    //     size = size - 1;
    //     fonttext.style.fontSize = size + "vw";
    //     if (scrollWidth <= fonttext.scrollWidth) {
    //       $("fonttext").addclass("lineclamp1");
    //       $("fonttext").removeClass("toh");
    //       return;
    //     }
    //   }
    //   console.log("fsizeAuto:" + fsizeAuto);
    // });

    const getDutyData = () => {
      //未完成任务列表变动比较频繁，所以写在外面
      const data = localStorage.getItem("dutys");
      if (data !== null) {
        return JSON.parse(data);
      } else {
        return [];
      }
    };
    const saveDutyData = () => {
      localStorage.setItem("dutys", JSON.stringify(state.dutys));
    };

    const getDoneData = () => {
      //本地存储dones也比较频繁，所以写在外面
      const data = localStorage.getItem("dones");
      if (data !== null) {
        return JSON.parse(data);
      } else {
        return [];
      }
    };
    const saveDoneData = () => {
      localStorage.setItem("dones", JSON.stringify(state.dones));
    };

    const randomRgb = () => {
      let R = Math.floor(Math.random() * 130 + 110);
      let G = Math.floor(Math.random() * 130 + 110);
      let B = Math.floor(Math.random() * 130 + 110);
      // return {//这个方法直接把样式属性写完整了，所以：style里直接写randomRgb()就可以了
      //   background: "rgb(" + R + "," + G + "," + B + ", .5)",
      // };
      return [
        "rgb(" + R + "," + G + "," + B + ", .12)",
        "rgb(" + R + "," + G + "," + B + ")",
      ]; //写成数组，方便给不用属性添加同类但深浅不同的颜色
    };

    const add = () => {
      if (!state.inputValue) {
        message.info("请先输入1个任务");
        console.log("空");
      } else {
        for (let i = 0; i < state.dutys.length; i++) {
          if (state.dutys[i].basic.text === state.inputValue) {
            message.info("相同的flag已创建，且未完成哦！", 2);
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
      }
    };

    const setdone = (item) => {
      if (item.basic.done === true) {
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
          let year = JSON.parse(date.getFullYear());
          let month = JSON.parse(date.getMonth());
          let day = JSON.parse(date.getDate());
          return [year.toString(), month.toString(), day.toString()];
        };
        const obj = {
          basic: {
            id: item.basic.id,
            text: item.basic.text,
            done: item.basic.done,
            createTime: item.basic.createTime,
            donedata: doneData(),
            doneTime: time,
            bgcolor: item.basic.bgcolor,
          },
        };
        const tragetid = item.basic.id; //必须先把当前这个任务的唯一值取出来，然后用findIndex去对照查找dutys里相等的那个对象的索引号
        const targetindex = state.dutys.findIndex(
          (item) => item.basic.id === tragetid //别省略上面targetid那个一步，写成 (item) => item.basic.id === item.basic.id就不对了
        );
        //下面是删除未完成任务列表对应的任务
        store.commit("DELETE", targetindex);
        const local = getDutyData();
        saveDutyData(local);
        //设为已完成的交互
        console.log("setdone的targetindex:" + targetindex);
        store.commit("SETDONE", obj);
        const local2 = getDoneData();
        saveDoneData(local2);
        message.success(
          "恭喜，完成了人生第" + state.dones.length + "个小目标呀🎉",
          2
        );
      }
    };

    const deleteduty = (item) => {
      const local = getDutyData();
      const tragetid = item.basic.id;
      const targetindex = state.dutys.findIndex(
        (item) => item.basic.id === tragetid
      );
      store.commit("DELETE", targetindex);
      saveDutyData(local);
      console.log("targetindex:" + targetindex);
    };

    const dbclick = (item, index) => {
      item.basic.isEdit = true;
      item.basic.text = state.dutys[index].basic.text; //让输入框默认显示当前flag名
      console.log("双击啦！");
    };

    const editname = (item, index) => {
      if (!item.basic.text) {
        message.info("输入为空，flag名字不变哦");
        item.basic.text = state.dutys[index].basic.text;
        item.basic.isEdit = false;
        console.log("空输入时rename值" + item.basic.text);
      } else {
        for (let i = 0; i < state.dutys.length; i++) {
          if (item.basic.text === state.dutys[i].basic.text && i !== index) {
            message.info("同1个flag正在进行中哦，请换个名字吧～");
            console.log("同名时rename值" + item.basic.text);
            console.log(i, index);
            return state.dutys[index].basic.text;
          }
        }
        state.dutys[index].basic.text = item.basic.text;
        item.basic.isEdit = false;
        state.dutys[index].basic.isEdit = item.basic.isEdit;
        const local = getDutyData();
        saveDutyData(local);
        console.log("正常时rename值" + item.basic.text);
      }
    };

    const retodo = (item) => {
      for (let i = 0; i < state.dutys.length; i++) {
        if (item.basic.text === state.dutys[i].basic.text) {
          message.info("同1个flag正在进行中哦，别恢复啦～");
          return;
        }
      }
      const obj = {
        basic: {
          id: item.basic.id, //提取创建时间中的数字作为唯一id
          text: item.basic.text,
          done: state.checked,
          createTime: item.basic.createTime,
          isEdit: state.isEdit,
          bgcolor: randomRgb(),
        },
      };
      const tragetid = item.basic.id;
      const targetindex = state.dones.findIndex(
        (item) => item.basic.id === tragetid
      );
      store.commit("DELETEDONE", targetindex);
      store.commit("ADD", obj);
      const local2 = getDoneData();
      saveDoneData(local2);
      const local = getDutyData();
      saveDutyData(local);
      message.info("flag恢复了，继续打卡吧～");
      console.log("retodo的targetindex:" + targetindex);
    };

    const copy = (item) => {
      for (let i = 0; i < state.dutys.length; i++) {
        if (item.basic.text === state.dutys[i].basic.text) {
          message.info("正在做相同的flag哦，别重复做啦～");
          return;
        }
      }
      const obj = {
        basic: {
          id: item.basic.id, //提取创建时间中的数字作为唯一id
          text: item.basic.text,
          done: state.checked,
          createTime: item.basic.createTime,
          isEdit: state.isEdit,
          bgcolor: randomRgb(),
        },
      };
      store.commit("ADD", obj);
      const local = getDutyData();
      saveDutyData(local);
      message.info("再做一遍这个flag吧～");
    };

    return {
      ...toRefs(state),
      add,
      setdone,
      deleteduty,
      dbclick,
      editname,
      retodo,
      copy,
      // fsizeAuto,
    };
  },
};
</script>
<style lang="less">
.dutybg {
  position: absolute;
  left: calc(50% - 150px);
  width: 300px;
  .dutylist {
    margin: 16px 0;
    padding: 8px 0;
    text-align: left;
  }

  .dutyitem-bg {
    margin: 8px 0;
    padding: 8px;
    border-radius: 4px;
    border: 1px solid #00000009;
    box-shadow: 0 2px 2px 1px #03030308;

    .dutyitem {
      width: 90%;

      .ant-checkbox-inner {
        height: 18px;
        width: 18px;
        border-radius: 10px !important;
      }
    }

    .rename-input {
      width: 89%;
      margin-left: 8px;
      border-radius: 4px;
      border: 1px solid #0000001b;
    }
    .dutytext {
      display: inline-block;
      margin-left: 8px;
      font-size: 16px;
      font-weight: 600;
      width: 88%;
      &:hover {
        color: #333;
      }
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
  .donelist {
    text-align: left;
  }
  .donebg {
    margin: 8px 0;
    padding: 8px;
    border-radius: 4px;
    background-color: #f9f9f9;
    border: 1px solid #00000009;
  }
  .doneitem {
    display: flex;
    justify-content: space-between;
    line-height: 32px;
    font-size: 16px;
    font-weight: 500;
    .done-btns > span {
      padding: 4px 8px;
      margin-left: 8px;
      border: 1px solid #00000000;
      border-radius: 4px;
      font-size: 13px;
      font-weight: normal;
      color: #666;
      text-align: right;
      line-height: 32px;
    }
    .done-btns > span:hover {
      background-color: #fff;
      border: 1px solid #0000001a;
      color: #333;
    }
  }
}
</style>
