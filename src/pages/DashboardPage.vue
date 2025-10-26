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
                      <q-item-label><strong>Home deliveries</strong></q-item-label>
                        <q-item-label style="font-size: large;">{{ home }}</q-item-label>
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
   <div class="q-pa-md" v-if="loading">Getting Archives..</div>
   <div class="q-pa-md" v-else-if="error">{{ error }}</div>
   <div v-else class="q-pa-md summary-row">
  
    <div v-for="a in items" :key="a.content.orderNo" style="text-align: center;">
            <q-item class="q-pa-md" v-if="a.content.garments.length >= 2" style="max-width: 250px;">
        <q-item-section>
          <q-item-label overline>Top customer</q-item-label>
        
          <q-item-label style="font-size: large;">{{ a.content.garments.length }}</q-item-label>
          <q-item-label style="font-size: medium;">{{  a.content.customer }}</q-item-label>
          <q-item-label caption>&#128222; {{ a.content.phone }}</q-item-label>
        </q-item-section>
      </q-item>
    </div>
   </div>
 

  <div class="q-pa-sm chart-row">
  <div class="q-pa-md chart-div">
    <Line v-if="!loading && thisMonthTotalSales" :data="data" :options="lineOptions">Chart could not load</Line>
    <div v-else>Navigate to another page, then back to see chart.</div>
  </div>
    <div class="q-pa-md chart-div">
    <Pie v-if="!loading" :data="pieData" :options="options">Chart could not load</Pie>

  </div>
</div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useArchives } from 'src/composables/useArchives';
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Line, Pie } from 'vue-chartjs'



ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)


const {items, monthName, sumTotal, home, store, loading, error} = useArchives();

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
      data: thisMonthTotalSales,//[400, 39, 100, 40, 39, 80, 240, 0, 0, total.value, 0, 0]
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.1
    }
  ],
}
const lineOptions = {
    responsive: true,
  maintainAspectRatio: false,
  plugins: {
    title: {
      display: true,
      text: 'Total payments per month'
    }
  }
}

// Pie chart config
const pieData = {
  labels: ['Home', 'Store'],
  datasets: [
    {
      backgroundColor: [ '#E46651', '#DD1B16'],
      data: [home.value, store.value]
    }
  ]
}

const options = {
  responsive: true,
  maintainAspectRatio: false,
    plugins: {
    title: {
      display: true,
      text: 'Monthly Home delivery vs. Store pick-up'
    }
  }
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
.chart-div {
  height: 260px;
  width: 400px;
  margin-top: 5%;
}
.chart-row {
  display: flex;
  flex-direction: row;
}
.summary-row {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    margin-top: 2%;
}
.responsive {
    width: 100%;
    height: 200px;
    padding: 6px;
    /* background-color: yellow; */
}

@media only screen and (max-width: 700px) {
  .chart-div {
    width: 300px;
  }
  .chart-row {
    flex-direction: column;
    min-width: 280px;
  }
}
@media only screen and (max-width: 350px) {
    .summary-row {
    max-width: 240px;
    margin-top: 4%;
  }
}

@media (min-width:320px)  { /* smartphones, iPhone, portrait 480x320 phones */ }
@media (min-width:481px)  { /* portrait e-readers (Nook/Kindle), smaller tablets @ 600 or @ 640 wide. */ }
@media (min-width:641px)  { /* portrait tablets, portrait iPad, landscape e-readers, landscape 800x480 or 854x480 phones */ }
@media (min-width:961px)  { /* tablet, landscape iPad, lo-res laptops ands desktops */ }
@media (min-width:1025px) { /* big landscape tablets, laptops, and desktops */ }
@media (min-width:1281px) { /* hi-res laptops and desktops */ }

</style>

