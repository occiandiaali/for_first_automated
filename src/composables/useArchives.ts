// composables/useUsers.ts
import { ref, onMounted } from 'vue';
import axios from 'axios';

// interface ArchivedItem {
//   _id: string;
//   customer: string;
//   totalDue: number;
//   due: string;
  
//   // Add other fields from your schema
// }
type GarmentType = [string, number, number, number];

// interface MonthlyRevenue {
//   month: string;
//   revenue: number;
// }

interface ArchiveContent {
  orderNo: string;
  customer: string;
  phone: number;
  comment:string;
  garments: GarmentType;
  dropOff: string;
  due:string;
  totalDue:number;
  pickupPoint:string;
}

interface ArchivedItem {
  title: string;
  content: ArchiveContent
}

//const currentYearString = new Date().getFullYear().toString();

  const currentMonth = new Date().getMonth();
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const monthName = monthNames[currentMonth];

  const sumTotal = ref(0)
  const home = ref(0)
  const store = ref(0)

  //const revenueByMonth = ref<MonthlyRevenue[]>([])
  //const allRevenue:number[] = [];
  //const ocTotal = ref(0)
 // const monthIndex = ref(0)

/**
 * _id:68fb71d580f5cd054c578e09
orderNo:"d3swmtqer1"
customer:"Tompolo"
phone:"666788800"
comment:"No comment"

garments:Array (4)
dropOff:"Thu, Oct 23"
due:"Fri, Oct 24"
totalDue:6640
pickupPoint:"Store"
 * 
 */


//const monthlyTotals: number[] = new Array(monthNames.length - 1).fill(0);
let ByMonth: number[] = [];
let topCustomerName:string[] = [];
let topCustomerSpend:number[] = [];

export function useArchives() {
  const items = ref<ArchivedItem[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

        //axios get '/yearly-revenue'
    axios.get('https://server-for-first-automated.onrender.com/api/admin/yearly-revenue', {withCredentials:true})
  .then(response => {
    // console.log('📊 All yearly revenue:', response.data.data);
    // console.log("xxxxxxxxxxxxxxxx: ", response.data.data[0].revenue);
    ByMonth = response.data.data[0].revenue
    // response.data.data[0].revenue.forEach((d: number) => {
    //   ByMonth.push(d)
    // })
  //  ByMonth = response.data.data[0].revenue;
   // console.log("Init ByMonth: ", ByMonth);
  })
  .catch(error => {
    console.error('❌ Failed to fetch revenue:', error.response?.data || error.message);
  });


  const fetchArchivedItems = async () => {
    loading.value = true;
    try {
      const response = await axios.get<ArchivedItem[]>(`https://server-for-first-automated.onrender.com/api/admin/archive`, {withCredentials:true});

  //============================
    const customerNames:string[] = [];
    const customerSpends:number[] = [];
      let total = 0;
      let h = 0;
      let s = 0;
      items.value = response.data;
      items.value.forEach(v => {
    if (v.title === monthName) {
      
      total += v.content.totalDue;
      
      if (v.content.pickupPoint === "Home") {
        h += 1
      } else {
        s += 1
      }
    } // v.title === monthName
    if (v.content.garments.length >= 3) {
      customerNames.push(v.content.customer);
      customerSpends.push(v.content.totalDue)
    }
    

    // else if (v.title === 'Oct') {
    //   ocTotal.value = v.content.totalDue
    // } 
  })
  sumTotal.value = total;
  topCustomerName = customerNames;
  topCustomerSpend = customerSpends;

  monthNames.forEach(m => {
  if (m === monthName) {
   // revenueByMonth.value.push({month: monthName, revenue: sumTotal.value});
  //  console.log("Month Index ", monthNames.indexOf(m));
    ByMonth.splice(monthNames.indexOf(m), 1, sumTotal.value)
   // console.log("Post ByMonth: ", ByMonth);
  } 
  })

  // monthNames.forEach(m => {
  //   if (m === 'Oct') {
  //     revenueByMonth.value.push({month: 'Oct', revenue: 6089})
  //   } else if (m === monthName) {
  //     revenueByMonth.value.push({month: monthName, revenue: sumTotal.value})
      
  //   } else {
  //     revenueByMonth.value.push({month: m, revenue: 0})
  //   }
  // })

  home.value = h;
  store.value = s;
//   revenueByMonth.value.forEach(v => {
//   console.log(v.revenue)
//   allRevenue.push(v.revenue);
// })

  
} catch (err) {
 // error.value = 'Failed to fetch archived items';
  console.error(err)
} finally {
  loading.value = false;
}
};

  //monthlyTotals.splice(monthIndex.value, 0, sumTotal.value) // axios post this array to '/monthly-revenue'
  // console.log("monthlyTotals Array=====");
  // console.log(monthlyTotals);

// console.log("RevByMonth====")
// console.log(revenueByMonth.value)



onMounted(fetchArchivedItems);

  return { items, monthName, sumTotal, home, store, loading, error, ByMonth, topCustomerName, topCustomerSpend };
}
