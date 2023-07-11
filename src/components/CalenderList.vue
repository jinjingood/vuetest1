<template>
  <div class="calender-box">
    <div class="weekname-box">
      <div v-for="item in weekname" :key="item" class="weekname-item">
        <span>{{ item }}</span>
      </div>
    </div>
    <div class="sevenday-box">
      <div
        v-for="i in 7"
        :key="i"
        @click="change_selday(sevendayArr[i - 1])"
        :class="[
          { todayNO: istoday(sevendayArr[i - 1]) },
          {
            normaldayNO: !isseleted(sevendayArr[i - 1]),
          },
          {
            selecteddayNO: isseleted(sevendayArr[i - 1]),
          },
        ]"
      >
        <span>{{ sevendayArr[i - 1].getDate() }}</span>

        <!-- 因为i是从1开始的，而索引是从0开始的，所以要减1  -->
      </div>
    </div>
    <div class="duty-record-box">
      <div
        v-for="i in 7"
        :key="i"
        class="duty-record-item"
        :class="[
          { 'today-record-item': istoday(sevendayArr[i - 1]) },
          { 'selected-record-item': isseleted(sevendayArr[i - 1]) },
        ]"
      >
        <div v-for="item in dutys" :key="item.basic.id">
          <div v-if="hasdutys(sevendayArr[i - 1], item)">
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
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="dutylist-box">
      <Todaylist
        :seletcteddate="seletcteddate"
        :selectedYMD="selectedYMD"
      ></Todaylist>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, reactive, toRefs, watch, ref } from "vue";
import { useStore } from "vuex";
import { message } from "ant-design-vue";
import Todaylist from "./TodayList";

export default {
  name: "CalenderList",
  components: { Todaylist }, //如果组件引入报错，找不到问题的话，一定要检查组件名字是否统一了
  emit: [],
  setup(props, context) {
    const store = useStore();
    const state = reactive({
      dutys: store.state.third_dutys,
      weekname: ["一", "二", "三", "四", "五", "六", "日"],
      currentyear: undefined,
      currentmonth: undefined,
      currentday: undefined,
      seletcteddate: [],
      selectedYMD: {
        year: undefined,
        month: undefined,
        day: undefined,
      },
    });

    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();

    state.currentyear = year;
    state.currentmonth = month;
    state.currentday = day;

    const sevendayArr = computed(() => {
      const weeknumber = date.getDay(
        state.currentyear,
        state.currentmonth,
        state.currentday
      ); //当天是星期几
      const mondaydate = date - (weeknumber - 1) * 24 * 60 * 60 * 1000; //本周周1的毫秒数
      let sevenday = [];
      for (let i = 0; i < 7; i++) {
        const date = new Date(mondaydate + i * 24 * 60 * 60 * 1000);
        sevenday.push(date);
      }
      return sevenday;
    });

    const istoday = (date) => {
      const year = date.getFullYear(); //获取日历的日期
      const month = date.getMonth();
      const day = date.getDate();
      const todaydate = new Date();
      const todayY = todaydate.getFullYear();
      const todayM = todaydate.getMonth();
      const todayD = todaydate.getDate();
      return year === todayY && month === todayM && day === todayD;
    };


    const isseleted = (date) => {
      const year = date.getFullYear().toString(); //获取日历的日期
      const month = date.getMonth().toString();
      const day = date.getDate().toString();
      // watch(
      //   () => {
      //     state.selectedYMD;
      //   },
      //   () => {
      //     selectedY = state.selectedYMD.year;
      //     selectedM = state.selectedYMD.month;
      //     selectedD = state.selectedYMD.day;
      //   },
      //   {immediate:true,deep:true}
      // );
      const selectedY = state.selectedYMD.year;
      const selectedM = state.selectedYMD.month;
      const selectedD = state.selectedYMD.day;
      return year === selectedY && month === selectedM && day === selectedD;
    };

    const hasdutys = (date, item) => {
      const year = date.getFullYear().toString(); //获取日历的日期
      const month = date.getMonth().toString();
      const day = date.getDate().toString();
      const dutyY = item.createdtime.createdY; //获取任务的日期
      const dutyM = item.createdtime.createdM;
      const dutyD = item.createdtime.createdD;
      return year === dutyY && month === dutyM && day === dutyD;
    };

    // watch(
    //   () => {
    //     state.currentyear;
    //   },
    //   () => {
    //     state.currentmonth;
    //   },
    //   () => {
    //     state.currentday;
    //   },s
    //   () => {
    //     state.selectedYMD = {
    //       year: state.currentyear,
    //       month: state.currentmonth,
    //       day: state.currentday,
    //     };
    //   },
    //   () => {
    //     isseleted(state.selectedYMD);
    //   },
    //   { immediate: true, deep: true }
    // );

    const change_selday = (date) => {
      const year = date.getFullYear().toString(); //获取日历的日期
      const month = date.getMonth().toString();
      const day = date.getDate().toString();
      const objs = [];
      for (let i = 0; i < state.dutys.length; i++) {
        const y = state.dutys[i].createdtime.createdY; //获取任务的日期
        const m = state.dutys[i].createdtime.createdM;
        const d = state.dutys[i].createdtime.createdD;

        if (year === y && month === m && day === d) {
          //如果这天含有任务
          const obj = {
            basic: {
              id: state.dutys[i].basic.id,
              title: state.dutys[i].basic.title,
              type: state.dutys[i].basic.type,
              done: state.dutys[i].basic.done,
            },
            createdtime: {
              createdY: state.dutys[i].createdtime.createdY,
              createdM: state.dutys[i].createdtime.createdM,
              createdD: state.dutys[i].createdtime.createdD,
            },
          };
          objs.push(obj);
          // break;
        } else {
          //如果这天没含任务
        }
      } //已出for循环
      state.selectedYMD.year = year;
      state.selectedYMD.month = month;
      state.selectedYMD.day = day;
      state.seletcteddate = { ...objs }; //获取当前选中日期下的所有任务
      console.log("selectedYMD:" + state.selectedYMD);
    };

    onMounted(
      () => {
        change_selday();
      },
      () => {
        isseleted();
      }
    );

    return {
      ...toRefs(state),
      sevendayArr,
      istoday,
      hasdutys,
      change_selday,
      isseleted,
    };
  },
};
</script>

<style lang="less" scoped>
.calender-box {
  display: flex;
  // justify-content: space-between;
  width: 100%;
  .weekname-box {
    display: inline-block;
    width: 30px;
    .weekname-item {
      display: flex;
      justify-content: center;
      align-items: center;
      height: calc(100% / 7);
      padding: 8px 4px;
      border-bottom: 1px solid #f3f3f3;
      &:last-child {
        border: none;
      }
    }
  }
  .sevenday-box {
    display: inline-block;
    width: 30px;
    vertical-align: middle;
    .selecteddayNO,
    .todayNO,
    .normaldayNO {
      display: flex;
      justify-content: center;
      align-items: center;
      height: calc(100% / 7);
      vertical-align: middle;
      font-size: 16px;
      font-weight: 500;
    }
    .todayNO {
      background-color: #fbf6e9;
      color: #ffc524;
      font-weight: 600;
      border-bottom: 1px solid #f3f3f3;
    }
    .normaldayNO {
      border: 1px solid #f3f3f3;
      border-top: none;
    }
    .normaldayNO:last-child {
      border-bottom: none;
    }
    .selecteddayNO {
      border: 1px solid #ffc524;
    }
  }

  .duty-record-box {
    display: inline-block;
    width: 200px;
    vertical-align: middle;
    border-right: 1px solid #f3f3f3;
    .today-record-item,
    .duty-record-item {
      display: flex;
      align-items: center;
      height: calc(100% / 7);
      padding: 0 8px;
      line-height: 100%;
      text-align: left;
      border-bottom: 1px solid #f3f3f3;

      &:last-child {
        border: none;
      }

      .duty-tag {
        display: inline-block;
        width: 10px;
        height: 10px;
        margin: 0 4px;
        border-radius: 10px;
        background: rgb(33, 105, 249);
      }
    }
    .selected-record-item {
      border-right: 3px solid #ffc524;
    }
  }
  .dutylist-box {
    display: inline-block;
    width: 100%;
  }
}
</style>
