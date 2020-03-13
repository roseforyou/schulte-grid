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

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0 auto;
  padding: 0;
  max-width: 800px;
}

</style>
