<script setup>
import {computed, ref} from 'vue'

const props = defineProps({
  name: {
    type: String,
    default: "名称"
  }
  ,
  link: {
    type: String,
    default: ""
  }
  ,
  icon: {
    type: String,
    default: ""

  }
})

let iconSize = 70
const icon = ref({
  width: `${iconSize}px`
  ,
  height: `${iconSize}px`

  ,
  'background-image': 'URL(' + props.link + 'favicon.ico)'
})
const open = () => {
  window.open(props.link)
}

</script>


<template>
  <div style="width: 100px;height: 100px;display: flex;justify-content: center;align-items: center;">
    <div style="">

      <div @click="open">
        <div class="aa" :style="icon" ></div>
      </div>
      <div :title="props.name" :style="{ 'max-width': icon.width + 'px' }"
           style="cursor: default;overflow: hidden;max-width: 60px; text-overflow: ellipsis; text-align: center;  white-space:nowrap;font-size: 5px;font-weight: 300;margin:5px  auto auto auto;">
        {{ props.name}}
      </div>

    </div>

  </div>
</template>


<style scoped>
.aa {
  border-radius: 15px;
  background-color: white;
  background-repeat: no-repeat;
  background-size: 105%;
  background-position: center;
  transition:  transform 0.20s;
  transform: scale(1);
}


.aa:hover {
  /*transform: scale(0.99);*/



}


</style>