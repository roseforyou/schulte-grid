<template>
  <div id="app">
    <schulte-grid></schulte-grid>
  </div>
</template>

<script>
import SchulteGrid from "./components/SchulteGrid";

export default {
  name: "app",
  components: {
    SchulteGrid
  }
};
</script>

<style>
:root {
  font-size: 1em;
}

@media (min-width: 300px) {
  :root {
    font-size: 2em;
  }
}

@media (min-width: 700px) {
  :root {
    font-size: 3em;
  }
}

@media (min-width: 1100px) {
  :root {
    font-size: 5em;
  }
}

@media (min-width: 1500px) {
  :root {
    font-size: 7em;
  }
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0;
  padding: 0;
}
</style>
