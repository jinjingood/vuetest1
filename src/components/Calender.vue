<template>
  <div class="cal-header-box">
    <div class="date-info">
      <a-button @click="getprevMonth(currentmonth)">上个月</a-button>
      <span> {{ currentyear }}年{{ currentmonth + 1 }}月 </span>
      <a-button @click="getNextMonth">下个月</a-button>
    </div>
    <div class="cal-header">
      <h4 v-for="item in weekname" :key="item">
        {{ item }}
      </h4>
    </div>
  </div>
  <div class="cal-container">
    <div class="one-week" v-for="i in 6" :key="i">
      <div
        v-for="j in 7"
        :key="j"
        :class="[
          { nowMonth: isNowMonth(daysArr[j - 1 + 7 * (i - 1)]) },
          { last: islasttime(daysArr[j - 1 + 7 * (i - 1)]) },
          { futuremonth: isfuturetime(daysArr[j - 1 + 7 * (i - 1)]) },
          { today: isToday(daysArr[j - 1 + 7 * (i - 1)]) },
          {
            'un-today': !isToday(daysArr[j - 1 + 7 * (i - 1)]),
          },
        ]"
      >
        <span class="day-number">{{
          daysArr[j - 1 + 7 * (i - 1)].getDate()
        }}</span>
        <!-- 这是把每个格子对应的daysArr索引号的值取出来 -->
        <div
          v-for="item in dones"
          :key="item.basic.id"
          style="
            font-size: 10px;
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
          "
        >
          <div v-if="hasDones(daysArr[j - 1 + 7 * (i - 1)], item)">
            <div
              class="done-colortag"
              :style="{
                background: item.basic.bgcolor[1],
              }"
            ></div>
            {{ item.basic.text }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, reactive, toRefs, toRaw, onMounted, watch } from "vue";
import { useStore } from "vuex";

export default {
  name: "Calender",
  components: [],
  setup() {
    const store = useStore();
    const state = reactive({
      dones: store.state.dones,
      weekname: ["一", "二", "三", "四", "五", "六", "日"],
      currentyear: undefined,
      currentmonth: undefined,
      currentday: undefined,
      selecteddate: {},
    });

    //getday是返回指定日期是当月星期几（0-6）
    const realdate = new Date(); //返回的是从1970-1-1开始到目标时间经过的毫秒数，不是这个目标时间的字符串
    const year = realdate.getFullYear(); //返回指定日期的4位数年份
    const month = realdate.getMonth(); //因为month是从0-11，所以显示到界面上时要加1
    const day = realdate.getDate(); //返回指定日期是当月第几天

    state.currentyear = year; //获取当天年月日，以供默认展示当月日历
    state.currentmonth = month;
    state.currentday = day;

    // const days = new Date(state.currentyear, state.currentmonth, 0).getDate(); //当月总共多少天
    const daysArr = computed(() => {
      const firstday = new Date(state.currentyear, state.currentmonth, 1); //获取当月1号的毫秒数
      const nowMonthMonday = firstday.getDay(); //获取当月1号是星期几
      const prevdays = firstday - (nowMonthMonday - 1) * 24 * 60 * 60 * 1000; //1.获取日历中上月剩余几天毫秒数,2.因为默认是从周日开始的，所以算当月之前上个月的天数，要减去周日这天，所以-1（如果日历是周日开始，就不用减了）
      let daysNO = [];
      for (let i = 0; i < 42; i++) {
        const date = new Date(prevdays + i * 24 * 60 * 60 * 1000);
        daysNO.push(date);
      }
      return daysNO;
    });

    const isToday = (date) => {
      const year = date.getFullYear(); //这三行用来获取每个格子自己的年月日（date应该是daysArr对象里的date，见81行）
      const month = date.getMonth();
      const day = date.getDate();
      const datenow = new Date(); //这四行用来获取今天的年月日，以供最后比较2个年月日是否相等
      const y = datenow.getFullYear();
      const m = datenow.getMonth();
      const d = datenow.getDate();
      return year === y && month === m && day === d;
      //  这段代码参考自：
      //  isToday(date) { // 判断传递的日期是否是今天
      //          // 获取传递时间对应的年月日
      //         const {year, month, day} = util.getYearMonthDay(date);
      //         // 获取今天时间对应的年月日
      //         const {year:y, month:m, day:d} = util.getYearMonthDay(new Date());
      //         return year === y && month === m && day === d;
      //     }
    };

    const isNowMonth = (date) => {
      const year = date.getFullYear();
      const month = date.getMonth();
      const datenow = new Date(); //这四行用来获取今天的年月日，以供最后比较2个年月日是否相等
      const y = datenow.getFullYear();
      const m = datenow.getMonth();
      return year === y && month === m;
    };

    const islasttime = (date) => {
      const year = date.getFullYear(); //日历格子的年月
      const month = date.getMonth();
      const day = date.getDate();
      const datenow = new Date(); //今天的年月
      const y = datenow.getFullYear();
      const m = datenow.getMonth();
      const d = datenow.getDate();
      if (year === y && month === m) {
        return day < d;
      } else {
        return year < y || (year <= y && month <= m);
      }
    };

    const isfuturetime = (date) => {
      const year = date.getFullYear(); //日历格子的年月
      const month = date.getMonth();
      const day = date.getDate();
      const datenow = new Date(); //今天的年月
      const y = datenow.getFullYear();
      const m = datenow.getMonth();
      const d = datenow.getDate();
      return year >= y && month > m;
    };

    const hasDones = (date, item) => {
      const year = JSON.parse(date.getFullYear()).toString(); //这三行用来获取每个格子自己的年月日（date应该是daysArr对象里的date，见81行）
      const month = JSON.parse(date.getMonth()).toString();
      const day = JSON.parse(date.getDate()).toString();
      const y = item.basic.donedata[0];
      const m = item.basic.donedata[1];
      const d = item.basic.donedata[2];
      return year === y && month === m && day === d;
    };

    const getprevMonth = () => {
      const yearnumber = state.currentyear;
      const monthnumber = state.currentmonth;
      if (state.currentmonth === 0) {
        state.currentyear = yearnumber - 1;
        state.currentmonth = 11;
      } else {
        state.currentmonth = monthnumber - 1;
      }
    };

    const getNextMonth = () => {
      const yearnumber = state.currentyear;
      const monthnumber = state.currentmonth;
      if (state.currentmonth === 11) {
        state.currentyear = yearnumber + 1;
        state.currentmonth = 0;
      } else {
        state.currentmonth = monthnumber + 1;
      }
    };

    onMounted(() => {
      daysArr;
      console.log("daysArr:" + daysArr);
    });

    return {
      ...toRefs(state),
      realdate,
      year,
      month,
      day,
      daysArr,
      isToday,
      isNowMonth,
      islasttime,
      isfuturetime,
      getprevMonth,
      getNextMonth,
      hasDones,
    };
  },
};
</script>

<style lang="less" scoped>
.cal-header-box {
  background-color: #fff;
  border: 1px solid #f3f3f3;
  border-bottom: none;
  margin: 30px 30px 0 30px;
}
.date-info {
  display: flex;
  justify-content: space-between;
  padding: 8px 16px;
  > button {
    padding: 0;
    width: 50px;
    height: 30px;
    border-radius: 4px;
  }
  > span {
    font-weight: 600;
    font-size: 15px;
    height: 30px;
    line-height: 30px;
  }
}
.cal-header {
  background-color: #fff;
  border-top: 1px solid #f3f3f3;
  display: flex;
  justify-content: space-between;
  line-height: 32px;
  height: 32px;
  > h4 {
    width: 100px;
    height: 100%;
    text-align: center;
    border-left: 1px solid #f3f3f3;
  }
  > h4:first-child {
    border-left: 1px solid #f3f3f300;
  }
}
.cal-container {
  margin: 0 30px;
  border: 1px solid #f3f3f3;
  border-bottom: none;

  .one-week {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #f3f3f3;
    .today,
    .un-today {
      padding: 4px;
      max-height: 100%;
      width: (100%/7);
      text-align: left;
    }
    .un-today {
      border-left: 1px solid #f3f3f3;
    }
    .today + .un-today {
      //删除当天后面那天的边线
      border: none;
    }

    .un-today:first-child {
      border: none;
    }

    .day-number {
      font-weight: 600;
    }
  }
  .done-colortag {
    height: 8px;
    width: 8px;
    border-radius: 8px;
    display: inline-block;
  }
  .today {
    border: 1px solid rgb(42, 208, 106);
    background: rgb(222, 247, 231);
  }
  // .un-nowMonth {
  //   background: #f9f9f9;
  //   .day-number {
  //     color: #cecece;
  //   }
  // }
  .nowMonth {
    .day-number {
      color: rgb(42, 208, 106);
    }
  }
  .last {
    background: #f9f9f9;
    .day-number {
      color: #cecece;
    }
  }
}
</style>
