<template>
  <div class="d-flex" id="wrapper">

    <!-- Sidebar -->
    <div id="sidebar-wrapper">
      <div class="sidebar-heading text-center"><h2>Twisted Polygons</h2></div>
      <slider :left-icon="frequency.leftIcon" :right-icon="frequency.rightIcon" :min="100" :max="255" label="MyLabel" v-model.number="frequency.value"></slider>
      <slider :left-icon="frequency.leftIcon" :right-icon="frequency.rightIcon" :min="100" :max="255" label="MyLabel" v-model.number="frequency.value"></slider>
      <slider :left-icon="frequency.leftIcon" :right-icon="frequency.rightIcon" :step="0.1" :min="0" :max="1000" label="MyLabel" v-model.number="frequency.value"></slider>
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
      frequency: {
        default: 150,
        leftIcon: {
          icon: 'triangle',
          width: '12',
          height: '12'
        },
        rightIcon: {
          icon: 'triangle',
          width: '22',
          height: '22'
        },
        value: 50
      }
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
