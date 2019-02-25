<template>
  <div id="app">
    <div class="col-md-3">
      <label for="customRange1">Example range</label>
      <input type="range" class="custom-range" id="customRange1">
    </div>
    <h1>Some tool</h1>
    <Polygons/>
  </div>
</template>

<script>
import Polygons from './components/Polygons'

export default {
  name: 'App',
  components: {
    Polygons
  }
}
</script>

<style>

</style>
