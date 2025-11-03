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
  const monthIndex = ref(0)

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

function postMonthlyRevenues(v:number[]) {
    axios.post('https://server-for-first-automated.onrender.com/api/admin/year-revenue', v, {withCredentials:true})
  .then(response => {
    console.log("Posted Month total array ", response.data)
  }).catch(e => console.error(e))
}

export function useArchives() {
  const items = ref<ArchivedItem[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);
  const monthlyTotals: number[] = new Array(monthNames.length - 1).fill(0);


  const fetchArchivedItems = async () => {
    loading.value = true;
    try {
      //https://server-for-first-automated.onrender.com
     // const response = await axios.get<ArchivedItem[]>('http://localhost:3000/api/admin/archive', {withCredentials:true});
      const response = await axios.get<ArchivedItem[]>(`https://server-for-first-automated.onrender.com/api/admin/archive`, {withCredentials:true});

      let total = 0;
      let h = 0;
      let s = 0;
      items.value = response.data;
      items.value.forEach(v => {
    if (v.title === monthName) {
      //  monthTotal.push(v.content.totalDue)
      total += v.content.totalDue;
      //revenueByMonth.value.push({month: monthName, revenue: v.content.totalDue})
       monthIndex.value = monthNames.indexOf(monthName);
      
      if (v.content.pickupPoint === "Home") {
        h += 1
      } else {
        s += 1
      }
    } 
    // else if (v.title === 'Oct') {
    //   ocTotal.value = v.content.totalDue
    // } 
  })
  sumTotal.value = total
  monthlyTotals.splice(monthIndex.value, 0, sumTotal.value) // axios post this array to '/monthly-revenue'
  console.log("monthlyTotals Array=====");
  console.log(monthlyTotals);

  postMonthlyRevenues(monthlyTotals);

  // monthNames.forEach(m => {
  //   if (m === 'Oct') {
  //     revenueByMonth.value.push({month: 'Oct', revenue: ocTotal.value})
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
 // localStorage.setItem('annualRev', JSON.stringify(allRevenue));
  //  console.log("useArchives arr ",allRevenue)
} catch (err) {
  error.value = 'Failed to fetch archived items';
  console.error(err)
} finally {
  loading.value = false;
}
};

// console.log("RevByMonth====")
// console.log(revenueByMonth.value)

onMounted(fetchArchivedItems);

  return { items, monthName, sumTotal, home, store, loading, error };
}
