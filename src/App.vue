<template>
  <div class="d-flex" id="wrapper">

    <!-- Sidebar -->
    <div id="sidebar-wrapper">
      <div class="sidebar-heading text-center"><h2>Twisted Polygons</h2></div>
      <slider :min="100" :max="255" label="MyLabel" :default-value="150"></slider>
    </div>
    <!-- /#sidebar-wrapper -->

    <!-- Page Content -->
    <div id="page-content-wrapper">
      <div class="container-fluid">
        <div id="paper">
          <Polygons></Polygons>
        </div>
      </div>
    </div>
    <!-- /#page-content-wrapper -->

  </div>
</template>

<script>
import Polygons from './components/Polygons'
import Slider from './components/Slider'

export default {
  name: 'App',
  components: {
    Polygons,
    Slider
  },
  data () {
    return {
      settings: {}
    }
  }
}
</script>

<style>
  #wrapper {
    flex-direction: column;
  }

  #page-content-wrapper {
    width: 100%;
    background-color: #C5C5C5;
  }

  @media (min-width: 768px) {
    #wrapper {
      flex-direction: row;
    }

    #sidebar-wrapper {
      min-height: 100vh;
      width: 300px;
      min-width: 300px;
    }
  }
</style>
