<template>
  <div class="cell-num-wrapper init" :class="cellClass" @click="onCellClick">
    <span class="num-p">{{ num }}</span>
  </div>
</template>

<script>
export default {
  name: "cell",
  data() {
    return {
      selfStyle: {
        color: "black",
        "background-color": "#ffe0b2"
      },
      cellClass: ""
      // clicked: false
    };
  },
  props: {
    num: {
      required: true
    },
    expected: {
      required: true
    },
    resetFlag: {
      required: true
    }
  },
  watch: {
    resetFlag: {
      // eslint-disable-next-line
      handler: function(val, oldVal) {
        // reset style
        this.selfStyle["color"] = "black";
        this.selfStyle["background-color"] = "#ffe0b2";
        // enable click
        // this.clicked = false;
      }
    }
  },
  methods: {
    onCellClick() {
      // if (this.clicked) {
      //   // make sure the cell only click for 1 times in one game
      //   // do nothing if click again on same cell
      //   return;
      // }
      //   this.clicked = true;
      if (this.num === this.expected) {
        // correct
        // this.selfStyle["color"] = "white";
        // this.selfStyle["background-color"] = "#00897b";
        this.cellClass = "succeed";
        this.$emit("correct");
      } else {
        if (!this.cellClass || this.cellClass === "warning2") {
          this.cellClass = "warning";
        } else {
          this.cellClass = "warning2";
        }
        // wrong
        // this.selfStyle["color"] = "white";
        // this.selfStyle["background-color"] = "#ec407a";
        this.$emit("wrong", { num: this.num, expected: this.expected });
      }
    }
  },
  mounted() {
    // reset style
    this.selfStyle["color"] = "black";
    this.selfStyle["background-color"] = "#ffe0b2";
  }
};
</script>

<style>
.cell-num-wrapper {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.init {
  color: black;
  background-color: #ffe0b2;
}

.succeed {
  animation: colorChange 0.2s ease-out;
  animation-fill-mode: forwards;
}

@keyframes colorChange {
  0% {
    color: black;
    background-color: #ffe0b2;
  }

  100% {
    color: white;
    background-color: #00897b;
  }
}

.warning {
  animation: warning 0.2s ease-out;
  animation-fill-mode: forwards;
}
.warning2 {
  animation: warning2 0.2s ease-out;
  animation-fill-mode: forwards;
}

@keyframes warning {
  0% {
    color: black;
    background-color: #ffe0b2;
  }

  50% {
    color: black;
    background-color: tomato;
  }

  0% {
    color: black;
    background-color: #ffe0b2;
  }
}

@keyframes warning2 {
  0% {
    color: black;
    background-color: #ffe0b2;
  }

  50% {
    color: black;
    background-color: tomato;
  }

  0% {
    color: black;
    background-color: #ffe0b2;
  }
}
.num-p {
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
</style>
