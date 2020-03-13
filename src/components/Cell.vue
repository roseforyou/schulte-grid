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
        this.cellClass = "";
      }
    }
  },
  methods: {
    onCellClick() {
      if (this.num === this.expected) {
        // correct
        this.cellClass = "succeed";
        this.$emit("correct");
      } else {
        // wrong
        if (this.cellClass === "succeed") return;
        if (!this.cellClass || this.cellClass === "warning2") {
          this.cellClass = "warning";
        } else {
          this.cellClass = "warning2";
        }
        this.$emit("wrong", { num: this.num, expected: this.expected });
      }
    }
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
  animation: colorChange .2s ease-out;
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
  animation: warning .2s ease-out;
  animation-fill-mode: forwards;
}
.warning2 {
  animation: warning2 .2s ease-out;
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
