<template>
  <div class="d-flex" id="wrapper">
    <!-- Sidebar -->
    <div id="sidebar-wrapper">
      <div class="sidebar-heading text-center"><h2>Twisted Polygons</h2></div>
      <slider :left-icon="radius.leftIcon" :right-icon="radius.rightIcon" :step="0.1" :min="0" :max="100" label="Radius" v-model.number="radius.value"></slider>
      <slider :left-icon="sides.leftIcon" :right-icon="sides.rightIcon" :min="3" :max="12" label="Sides" v-model.number="sides.value"></slider>
      <slider :left-icon="quantity.leftIcon" :right-icon="quantity.rightIcon" :min="1" :max="100" label="Quantity" v-model.number="quantity.value"></slider>
      <slider :left-icon="roundness.leftIcon" :right-icon="roundness.rightIcon" :step="0.1" :min="-2" :max="2" label="Roundness" v-model.number="roundness.value"></slider>
      <slider :left-icon="startAngle.leftIcon" :right-icon="startAngle.rightIcon" :step="1" :min="0" :max="360" label="Starting Angle" v-model.number="startAngle.value"></slider>
      <input type="text" v-model.lazy="scaleFormula">
      <input type="text" v-model.lazy="rotationFormula">
      <div class="container mt-3">
        <div class="row">
          <div class="col-12">
            <button class="btn btn-primary btn-block" @click.prevent="download">
              Download
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- /#sidebar-wrapper -->

    <!-- Page Content -->
    <div id="page-content-wrapper">
      <div class="container-fluid">
        <div id="paper">
          <Polygons :scale-formula="scaleFormula" :rotationFormula="rotationFormula" :start-angle="startAngle.value" :radius="radius.value" :sides="sides.value" :roundness="roundness.value" :quantity="quantity.value"></Polygons>

        </div>
      </div>
    </div>
    <!-- /#page-content-wrapper -->

  </div>
</template>

<script>
import Polygons from './components/Polygons'
import Slider from './components/Slider'
import { eventBus } from '@/main'

export default {
  name: 'App',
  components: {
    Polygons,
    Slider
  },
  data () {
    return {
      scaleFormula: 'i+i*7',
      rotationFormula: '10*Math.sin(i/9)',
      startAngle: {
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
        value: 0
      },
      sides: {
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
        value: 5
      },
      quantity: {
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
        value: 10
      },
      frequency: {
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
      },
      roundness: {
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
        value: 0.8
      },
      radius: {
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
        value: 20
      }
    }
  },
  methods: {
    download () {
      eventBus.$emit('download', 'Mom said do your homework!')
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
