<template>
  <q-page padding>
    <div class="summary-row">
                <q-item style="justify-self: center; align-self: center;text-align: center;">
                    <q-item-section>
                      <q-item-label><strong>{{ monthName }} Revenue</strong></q-item-label>
                        <q-item-label style="font-size: x-large;">{{ new Intl.NumberFormat('en-NG', {
                    style: 'currency',
                    currency: 'NGN'
                }).format(sumTotal) }}
                </q-item-label>
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
            <q-icon name="star" v-for="i in home" :key="i"/>
            

          </div>
        </q-item-section>
        </q-item>
   
    </div>
    <!---->
   

        <q-separator/>
        <div style="max-width: 250px;text-align: center;">
        <q-item-label v-if="items" class="q-pa-sm">Top customer(s) for {{ monthName }}</q-item-label>
        
        <div class="row q-pa-md">
          <div class="q-pa-md" v-if="loading">Getting data..</div>
          <div class="q-pa-md" v-else-if="error">{{ error }}</div>
          <div class="col-6" v-for="item in items" :key="item.content.orderNo">

      <q-btn v-if="(item.title === monthName) && item.content.garments.length >= 3" color="teal-5" :label="item.content.customer" size="sm" style="margin: 4px;">
        <q-menu>
          <div class="row no-wrap q-pa-md">

          <div class="column items-center">
          <q-avatar color="orange" text-color="white" size="md">
            {{ item.content.customer.substring(0,1) }}
          </q-avatar>

            <div class="text-subtitle3 q-mt-md q-mb-xs">{{ item.content.customer }}</div>
            <q-item-label style="font-size: x-large;">{{ item.content.garments.length }}</q-item-label>
            <q-item-label caption class="q-pa-sm"><q-icon name="phone" color="green" /> {{ item.content.phone }}</q-item-label>

            <q-btn
              color="secondary"
              icon="mail"
              label="Message"
              push
              size="sm"
              v-close-popup
            />
          </div>
          </div>
        </q-menu>
      </q-btn>
      
    </div>
   </div>
   </div> <!--wrapper-->
   <q-separator/>

  <div class="q-pa-sm chart-row">
  <div class="q-pa-md chart-div">
    <Line v-if="!loading" :data="data" :options="lineOptions">Chart could not load</Line>
    <div v-else class="q-pa-md">Trying to load payments data..</div>
  </div>
    <div class="q-pa-md chart-div">
    <Pie v-if="!loading && (home || store)" :data="pieData" :options="options">Chart could not load</Pie>
    <div v-else class="q-pa-md">Trying to load Pick-up data..</div>
  </div>
</div>
</q-page>
</template>

<script setup lang="ts">
import { onMounted, watch } from 'vue';
import axios from 'axios';
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


const {items, monthName, sumTotal, home, store, loading, error, monthlyTotals} = useArchives();

const monthLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

//let thisMonthTotalSales:number[] = new Array(monthLabels.length).fill(0);
const totalSalesByMonth: number[] = monthlyTotals;

watch(sumTotal, (newVal, oldVal) => {
  console.log(`Revenue from ${oldVal} to ${newVal}`);
 // postMonthlyRevenues();
})

//console.log(revenueByMonth.value)
//   monthLabels.forEach((i) => {
//   const idx = monthLabels.indexOf(i);
//   if (i === monthName) {
//     thisMonthTotalSales.splice(idx, 0, sumTotal.value)
//     localStorage.setItem('thisMonthTotalSales', JSON.stringify(thisMonthTotalSales))
//   }
// })
  // name: String,
  // price: Number,
  // amt: Number,
  // subTotal: Number,

// revenueByMonth.value.forEach(rev => {

//   totalSales.push(rev.revenue)
// })  

//const res = ref<{name:string,price:number,amt:number,subTotal:number}[]>([])



// Line chart config
const data = {
  labels: monthLabels,
  datasets: [
    {
      label: 'Monthly revenue',
      backgroundColor: '#00ff00',//'#f87979',
      data: totalSalesByMonth,//thisMonthTotalSales,//[400, 39, 100, 40, 39, 80, 240, 0, 0, total.value, 0, 0]
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
      text: 'Month Home delivery vs. Store pick-up'
    }
  }
}
// const customerItems = ref(items)
// const topCustomerColumns: unknown[] = []

// function postMonthlyRevenues() {
//     axios.post('https://server-for-first-automated.onrender.com/api/admin/year-revenue', monthlyTotals)
//   .then(response => {
//     console.log("Posted Month total array ", response.data)
//   }).catch(e => console.error(e))
// }

function getAnnualRevenuesArray() {
  axios.get('https://server-for-first-automated.onrender.com/api/admin/year-revenue')
  .then(response => {
    if (response) {
   

      console.log(response.data);

  } else {
    console.log("No response from '/year-revenue'...")
  }
  }).catch(e => console.error(e))
}


onMounted(() => {

 getAnnualRevenuesArray(); 
//   const allRev:number[] = JSON.parse(localStorage.getItem("annualRev") || "[]")
//   totalSales = allRev;
//   console.log("Total Sales+++");
// console.log(totalSales);
  // const data:number[] = JSON.parse(localStorage.getItem("thisMonthTotalSales") || "[]")
  // thisMonthTotalSales = data;
  // const strAnnuity = JSON.parse(localStorage.getItem("annualRev") || "[]")
  // Object.values(strAnnuity).forEach(value => {
  //   console.log(value)
  // })
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
  margin-top: 4%;
}
.chart-row {
  display: flex;
  flex-direction: row;
}
#customerName {
  font-size: medium;
  font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
}
#customerPhone {
  font-size: small;
  color: gray;
}
#garmentsLen {
  font-size: x-large;
}
#garmentsPhone {
  font-size: small;
  color: gray;
}
.summary-row {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    margin-top: 2%;
}

#garments-len {
  font-size: xx-large;
}
.responsive {
    width: 100%;
    height: 200px;
    padding: 6px;
    /* background-color: yellow; */
}

#topCustomerHeading {
  font-size: smaller;
  font-weight: 400;
}

.summary-row .top-customer-div {
   margin-top: 5%;
}

.top-customer-div {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 6px;
 
  height: 120px;
  /* background-color: brown; */
}

@media only screen and (max-width: 700px) {
  .chart-div {
    width: 300px;
  }
  .chart-row {
    flex-direction: column;
    min-width: 280px;
  }
  #garments-len {
  font-size: medium;
}
#customerName {
  font-size: small;
}
}
@media only screen and (max-width: 390px) {
    .summary-row {
    max-width: 340px;
    margin-top: 4%;
  }
    #garments-len {
  font-size: x-small;
}

#customerName {
  font-size: x-small;
}
#customerPhone {
  font-size: xx-small;
}

.top-customer-div {
  flex-direction: column;
}

}

@media (min-width:320px)  { /* smartphones, iPhone, portrait 480x320 phones */ }
@media (min-width:481px)  { /* portrait e-readers (Nook/Kindle), smaller tablets @ 600 or @ 640 wide. */ }
@media (min-width:641px)  { /* portrait tablets, portrait iPad, landscape e-readers, landscape 800x480 or 854x480 phones */ }
@media (min-width:961px)  { /* tablet, landscape iPad, lo-res laptops ands desktops */ }
@media (min-width:1025px) { /* big landscape tablets, laptops, and desktops */ }
@media (min-width:1281px) { /* hi-res laptops and desktops */ }

</style>

