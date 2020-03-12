<template>
  <div id="schulte-grid">
    <van-circle
      :class="circleClass"
      v-model="currentRate"
      :color="circleColor"
      @click.native="toPlay"
      size="150px"
    >
      <img alt="Grid logo" src="../assets/grid.png" class="logo" />
    </van-circle>
    <van-grid
      :column-num="5"
      :gutter="5"
      :square="true"
      v-show="reset"
      class="grid-wrapper"
      :class="gridClass"
    >
      <template v-for="cell_data in grid_data">
        <van-grid-item :key="cell_data">
          <Cell
            :num="cell_data"
            :expected="expected"
            @wrong="stopAndShowErrorMsg"
            @correct="increaseExpected"
            :reset-flag="reset"
          />
        </van-grid-item>
      </template>
    </van-grid>
    <audio ref="uhoh" src="../assets/sounds/uhoh.mp3" preload></audio>
    <audio ref="jo" src="../assets/sounds/click.mp3" preload></audio>
    <audio ref="achievement" src="../assets/sounds/achievement.mp3" preload></audio>
    <audio ref="start" src="../assets/sounds/start.mp3" preload v-on:ended="toStart"></audio>
  </div>
</template>

<script>
import { Grid, GridItem, Dialog, Circle } from "vant";
import Cell from "./Cell";

export default {
  name: "schulte-grid",
  components: {
    [Grid.name]: Grid,
    [GridItem.name]: GridItem,
    Cell: Cell,
    [Circle.name]: Circle
  },
  data() {
    return {
      playing: false,
      time_in_ms: 0,
      last_number: 0,
      grid_data: [],
      expected: 1,
      startTime: null,
      endTime: null,
      reset: false,
      currentRate: 0,
      circleColor: "whilte",
      circleClass: "circleDown",
      gridClass: ""
    };
  },
  methods: {
    shuffle() {
      let hub = [
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12,
        13,
        14,
        15,
        16,
        17,
        18,
        19,
        20,
        21,
        22,
        23,
        24,
        25
      ];
      // eslint-disable-next-line
      hub.sort((a, b) => (Math.random() > 0.5 ? -1 : 1));
      this.grid_data = hub;
    },
    stopAndShowErrorMsg() {
      // eslint-disable-next-line no-console
      // console.log(payload);
      // this.circleColor = "#ec407a";
      // Dialog.alert({
      //   title: "Wrong",
      //   message: `expect ${payload.expected}, but got ${payload.num}.\n\nGo play again!`
      // }).then(() => {
      //   this.expected = 1;
      //   this.shuffle();
      //   this.reset = !this.reset;
      //   this.circleColor = "white";
      // });

      this.$refs.uhoh.currentTime = 0;
      this.$refs.uhoh.play();
    },
    increaseExpected() {
      this.circleColor = "#00897b";
      if (this.expected === 1) {
        // first time,start to timer
        this.startTime = Date.now();
      }
      this.expected += 1;
      this.currentRate = (this.expected - 1) * 4;
      this.$refs.jo.currentTime = 0;
      this.$refs.jo.play();
      if (this.expected === 26) {
        this.$refs.achievement.currentTime = 0;
        this.$refs.achievement.play();
        this.endTime = Date.now();
        let duration = (this.endTime - this.startTime) / 1000;
        // finished success
        Dialog.alert({
          title: "Congratulations!!!",
          message: `It takes you ${duration}s, you can do better!`
        }).then(() => {
          this.expected = 1;
          this.toEnd();
        });
      }
    },
    toPlay() {
      if (this.circleClass === "circleUp") return;
      this.$refs.start.currentTime = 0;
      this.$refs.start.play();
    },
    toStart() {
      this.shuffle();
      this.circleClass = "circleUp";
      this.gridClass = "grid-fadeIn";
      this.reset = !this.reset;
    },
    toEnd() {
      this.circleClass = "circleDown";
      this.gridClass = "";
      this.reset = !this.reset;
      this.circleColor = "white";
    }
  }
};
</script>

<style>
.van-circle {
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.circleDown {
  animation: slideDown 2s ease-out;
  animation-fill-mode: forwards;
}
.circleUp {
  margin-top: 0;
}
@keyframes slideDown {
  0% {
    margin-top: 0;
  }
  100% {
    margin-top: 50%;
  }
}
.van-grid-item__content {
  padding: 0;
}
.cell {
  background-color: #ffe0b2;
  max-height: 100px;
  border: 1px solid black;
  vertical-align: center;
  align-content: center;
}
.num {
  display: inline-block;
  margin: auto auto;
}
.logo {
  padding-top: 23px;
  width: 100px;
  height: 100px;
}
.grid-wrapper {
  padding-top: 10px;
  opacity: 0;
}
.grid-fadeIn {
  animation: fadeIn 0.5s ease-out;
  animation-fill-mode: forwards;
}

@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
