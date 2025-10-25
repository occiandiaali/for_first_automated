<template>
    <div class="summary-row">
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
    <!---->
        <div class="summary-row">
        <!-- <q-item>
                    <q-item-section side top>
                        <q-item-label style="font-size: large;">0</q-item-label>
                        <q-item-label><strong>Remaining Today</strong></q-item-label>
          <q-item-label caption>Next Delivery 10/21</q-item-label>
          
        </q-item-section>
        </q-item>
                <q-item>
                    <q-item-section side top>
                        <q-item-label style="font-size: large;">112</q-item-label>
                        <q-item-label><strong>New</strong></q-item-label>
          <q-item-label caption>Last just added</q-item-label>
         
        </q-item-section>
        </q-item>
                <q-item>
                    <q-item-section side top>
                        <q-item-label style="font-size: large;">2</q-item-label>
                        <q-item-label><strong>Tomorrow</strong></q-item-label>
          <q-item-label caption>First Delivery 09:45</q-item-label>
      
        </q-item-section>
        </q-item> -->
   <div v-if="loading">Getting Archives..</div>
   <div v-else-if="error">{{ error }}</div>
   <div v-else class="q-pa-sm summary-row">
  
    <div v-for="a in items" :key="a.content.orderNo">
            <q-item >
        <q-item-section side top>
          <q-item-label overline>Total items cleaned</q-item-label>
        
          <q-item-label style="font-size: large;">{{ a.content.garments.length }}</q-item-label>
          <q-item-label caption>{{ a.content.customer }}</q-item-label>
        </q-item-section>
      </q-item>
    </div>
   </div>
    </div>


  <div class="q-pa-md" style="height: 260px;width: 500px;">
    <Line :data="data" :options="options"/>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useArchives } from 'src/composables/useArchives';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import { Line } from 'vue-chartjs'


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)


const {items, loading, error} = useArchives();


//console.log(items)

//console.log(typeof items)

const monthTotal = ref(0)

const monthLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];


// Line chart config
const data = {
  labels: monthLabels,
  datasets: [
    {
      label: 'Monthly revenue',
      backgroundColor: '#f87979',
      data: [400, 39, 100, 40, 39, 80, 240, 0, 0, monthTotal.value, 0, 0]
    }
  ]
}

const options = {
  responsive: true,
  maintainAspectRatio: false
}



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
.summary-row {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    margin-top: 2%;
}
.responsive {
    width: 100%;
    height: 200px;
    padding: 6px;
    /* background-color: yellow; */
}
</style>

