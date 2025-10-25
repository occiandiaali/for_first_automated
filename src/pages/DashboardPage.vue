<template>
    <div class="summary-row">
        <!-- <q-item style="justify-self: center; align-self: center;text-align: center;">
                    <q-item-section side top>
                        <q-item-label style="font-size: x-large;">3</q-item-label>
                        <q-item-label><strong>Remaining Today</strong></q-item-label>
          <q-item-label caption>Next Delivery 10/21</q-item-label>
                            <div class="text-orange stars">
            <q-icon name="star" />
            <q-icon name="star" />
            <q-icon name="star" />
             <q-icon name="star" />
            <q-icon name="star" />
          </div>
        </q-item-section>
        </q-item> -->
                <q-item style="justify-self: center; align-self: center;text-align: center;">
                    <q-item-section>
                      <q-item-label><strong>Month Revenue</strong></q-item-label>
                        <q-item-label style="font-size: x-large;">{{ new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN'
}).format(sumTotal) }}</q-item-label>
          <q-item-label caption>Last just added</q-item-label>
          <!-- <q-icon name="star" color="yellow" />
          <q-icon name="star" color="yellow" />
          <q-icon name="star" color="yellow" /> -->
                  <div class="text-orange stars">
            <q-icon name="star" />
            <q-icon name="star" />
            <q-icon name="star" />
             <q-icon name="star" />
            <q-icon name="star" />
          </div>
        </q-item-section>
        </q-item>
                <q-item style="justify-self: center; align-self: center;text-align: center;">
                    <q-item-section>
                      <q-item-label><strong>Pending</strong></q-item-label>
                        <q-item-label style="font-size: x-large;">6</q-item-label>
          <q-item-label caption>First Delivery 09:45</q-item-label>
            <div class="text-orange stars">
            <q-icon name="star" />
            <q-icon name="star" />

          </div>
        </q-item-section>
        </q-item>
   
    </div>
    <!---->
   
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
  
    <div v-for="a in items" :key="a.content.orderNo" style="text-align: center;">
            <q-item >
        <q-item-section>
          <q-item-label overline>Top customer</q-item-label>
        
          <q-item-label style="font-size: large;">{{ a.content.garments.length }}</q-item-label>
          <q-item-label caption>{{ a.content.customer }}</q-item-label>
        </q-item-section>
      </q-item>
    </div>
   </div>
 


  <div class="q-pa-md" style="height: 260px;width: 400px;margin-top: 5%;">
    <Line :data="data" :options="options"/>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
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


const {items, monthName, sumTotal, loading, error} = useArchives();

 console.log("MonthTotal: ", monthName)
  console.log("SumTotal: ", sumTotal.value)

const monthLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

let thisMonthTotalSales:number[] = new Array(monthLabels.length).fill(0);
  monthLabels.forEach((i) => {
  const idx = monthLabels.indexOf(i);
  if (i === monthName) {
    thisMonthTotalSales.splice(idx, 0, sumTotal.value)
    localStorage.setItem('thisMonthTotalSales', JSON.stringify(thisMonthTotalSales))
  }
})


// Line chart config
const data = {
  labels: monthLabels,
  datasets: [
    {
      label: 'Monthly revenue',
      backgroundColor: '#00ff00',//'#f87979',
      data: thisMonthTotalSales//[400, 39, 100, 40, 39, 80, 240, 0, 0, total.value, 0, 0]
    }
  ]
}

const options = {
  responsive: true,
  maintainAspectRatio: false
}

onMounted(() => {
  const data:number[] = JSON.parse(localStorage.getItem("thisMonthTotalSales") || "[]")
  thisMonthTotalSales = data;

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
/* .stars {
  align-self: center;
} */
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

