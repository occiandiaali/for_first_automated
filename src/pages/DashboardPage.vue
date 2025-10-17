<template>
    <div id="summary-row">
        <q-item>
                    <q-item-section side top>
                        <q-item-label style="font-size: xx-large;">3</q-item-label>
                        <q-item-label><strong>Remaining Today</strong></q-item-label>
          <q-item-label caption>Next Delivery 10/21</q-item-label>
          <q-icon name="star" color="yellow" />
        </q-item-section>
        </q-item>
                <q-item>
                    <q-item-section side top>
                        <q-item-label style="font-size: xx-large;">26</q-item-label>
                        <q-item-label><strong>New</strong></q-item-label>
          <q-item-label caption>Last just added</q-item-label>
          <q-icon name="star" color="yellow" />
        </q-item-section>
        </q-item>
                <q-item>
                    <q-item-section side top>
                        <q-item-label style="font-size: xx-large;">6</q-item-label>
                        <q-item-label><strong>Tomorrow</strong></q-item-label>
          <q-item-label caption>First Delivery 09:45</q-item-label>
          <q-icon name="star" color="yellow" />
        </q-item-section>
        </q-item>
   
    </div>
    <div class="bar-div">
   
  <!---->
  <!-- <q-item-label>Males/Females</q-item-label>       -->
  <Chart
  :size="{ width: 500, height: 400 }"
  :data="data"
  :margin="margin"
  :direction="direction"
  :axis="axis">
  
    <template #layers>
      <Grid strokeDasharray="2,2" />
      <Bar :dataKeys="['name', 'pl']" :barStyle="{ fill: '#90e0ef' }" />
      <Bar :dataKeys="['name', 'avg']" :barStyle="{ fill: '#0096c7' }" />
      <Bar :dataKeys="['name', 'inc']" :barStyle="{ fill: '#48cae4' }" />
      <Marker :value="1000" label="Avg." color="#e76f51" :strokeWidth=2 strokeDasharray="6 6" />
    </template>

    <template #widgets>
      <Tooltip
        borderColor="#48CAE4"
        :config="{
          pl: { color: '#90e0ef' },
          avg: { color: '#0096c7' },
          inc: { color: '#48cae4' }
        }"
      />
    </template>

  </Chart>
  <!---->
       <Responsive class="responsive">
    <template #main="{ width }">
      <Chart
        direction="circular"
        :size="{ width: 500, height: 400 }"
        :data="data"
        :margin="{
          left: Math.round((width - 360)/2),
          top: 20,
          right: 0,
          bottom: 20
        }"
       
        :config="{ controlHover: false }"
        >
        <template #layers>
          <Pie
            :dataKeys="['name', 'pl']"
            :pie-style="{ innerRadius: 100, padAngle: 0.05 }" />
        </template>
        <template #widgets>
          <Tooltip
            :config="{
              name: { },
              avg: { hide: true},
              pl: { label: 'value' },
              inc: { hide: true }
            }"
            hideLine
          />
        </template>
      </Chart>
    </template>
  </Responsive>
    </div>
    
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Bar, Chart, Grid, Marker, Responsive, Pie, Tooltip } from 'vue3-charts'
import { type ChartAxis, type Direction } from 'vue3-charts/dist/types';

const plByMonth = [
  { name: 'Jan', pl: 100, avg: 50, inc: 30 },
  { name: 'Feb', pl: 200, avg: 90, inc: 40 },
  { name: 'Apr', pl: 100, avg: 40, inc: 50 },
  { name: 'Mar', pl: 100, avg: 30, inc: 70 },
  { name: 'May', pl: 100, avg: 50, inc: 20 },
  { name: 'Jun', pl: 60, avg: 40, inc: 30 },
  { name: 'Jul', pl: 50, avg: 70, inc: 100 }
]
const data = ref(plByMonth)
const direction = ref<Direction>('horizontal')
   
    const margin = ref({
      left: 0,
      top: 20,
      right: 20,
      bottom: 0
    })
        const axis = ref<ChartAxis>({
    
      primary: {
          type: 'band',
          domain: ["",""]
      },
      secondary: {
        domain: ['dataMin', 'dataMax + 100'],
        type: 'linear',
        ticks: 8
      }
    })


</script>

<style lang="css" scoped>
.bar-div {
    margin-top: 5%;
    margin-left: 5%;
    width: 50%;
    height: 45%;
    display: flex;
    flex-direction: row;
    
}
#summary-row {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    margin-top: 2%;
}
.responsive {
    width: 100%;
    height: 400px;
    padding: 6px;
    /* background-color: yellow; */
}
</style>

