<template>
   <q-page padding>
    <div class="search-row">

            <q-fab color="secondary" push icon="keyboard_arrow_right" direction="right">
        <q-fab-action color="orange" @click="showNewOrderForm()" icon="add" />
        <q-fab-action color="accent" @click="showNewOrderForm()" icon="alarm" />
      </q-fab>

      </div>
      <NewOrderModalComponent v-model="newOrderModalOpen" />
      <br>
      <div id="today-div">
          <p class="p-segment"><strong>Today</strong> {{ todayDate }}</p>
          <q-list id="today-list" v-if="row1.length > 0">
            <q-item class="item-card" v-for="r1 in row1" :key="r1._id">
              <q-item-section class="item-section" @click="showOrderDetails(r1._id, r1.orderNo, r1.comment, r1.phone, r1.customer,r1.dropOff,r1.due,r1.garments,r1.pickupPoint,r1.totalDue)">
                <q-item-label><strong>{{ r1.customer }}</strong></q-item-label>
                <q-item-label caption>{{ r1.comment }}</q-item-label>
                <q-item-label>{{ r1.garments.length }} {{ r1.garments.length > 1 ? 'items' : 'item' }}</q-item-label>
                <q-item-label caption>{{ r1.due }}</q-item-label>
              </q-item-section>
              
              <q-item-section side top>
                <q-item-label caption>Pick-up @ {{ r1.pickupPoint }}</q-item-label>
                <div class="text-orange">
                  <q-icon name="star" />
                  <q-icon name="star" />
                  <q-icon name="star" />
                </div>
              </q-item-section>
            </q-item>
            
          </q-list>
          <q-item-section class="q-pa-md" v-else-if="rowLoading">Loading..</q-item-section>
        <div class="q-pa-md" v-else>
          <q-item-section>
            <q-item-label>Couldn't find orders for today...❌</q-item-label>
          </q-item-section>
        </div>
    </div>
      <div>
        <p class="p-segment"><strong>The week of </strong> {{ weekStart ?? '🚨' }} - {{ weekEnd ?? '🚨' }}</p>
                <q-list id="week-list" v-if="row2.length > 0">
                  <q-item class="item-card" v-for="r2 in row2" :key="r2._id">
                    <q-item-section class="item-section" @click="showOrderDetails(r2._id, r2.orderNo, r2.comment, r2.phone, r2.customer,r2.dropOff,r2.due,r2.garments,r2.pickupPoint,r2.totalDue)">
                      <q-item-label><strong>{{ r2.customer }}</strong></q-item-label>
                      <!-- <q-item-label>To pay: ₦{{ r2.totalDue }}</q-item-label> -->
                      <q-item-label caption>Submitted: {{ r2.dropOff }}</q-item-label>
                      <q-item-label caption>Due: {{ r2.due }}</q-item-label>
                      
                    </q-item-section>
                    
                    <q-item-section side top>
                      <q-item-label caption>{{ r2.pickupPoint }}</q-item-label>
                      <div class="text-orange">
                        <q-icon name="star" />
                        <q-icon name="star" />
                        <q-icon name="star" />
                      </div>
                    </q-item-section>
                  </q-item>
                  
                </q-list>
                <q-item-section class="q-pa-md" v-else-if="rowLoading">Loading..</q-item-section>
               <div class="q-pa-md" v-else>
          <q-item-section>
            <q-item-label>Couldn't find orders due for the week! ❌</q-item-label>
          </q-item-section>
        </div>
      </div>
      <div>
        <p class="p-segment"><strong>Upcoming</strong></p>
                <q-list>
                  <q-item class="item-card">
        <q-item-section>
          <q-item-label><strong>Dec 25</strong></q-item-label>
          <q-item-label caption>2:00 PM</q-item-label>
          <q-item-label>Pastor Chris</q-item-label>
          <q-item-label caption>Secondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit elit.</q-item-label>
        </q-item-section>

        <q-item-section side top>
          <q-item-label caption>Delivery</q-item-label>
          <div class="text-orange">
            <q-icon name="star" />
            <q-icon name="star" />
            <q-icon name="star" />
          </div>
        </q-item-section>
      </q-item>
                        <q-item class="item-card">
        <q-item-section>
          <q-item-label><strong>Dec 26</strong></q-item-label>
          <q-item-label caption>8:00 AM</q-item-label>
          <q-item-label>Mrs. Ofili</q-item-label>
          <q-item-label caption>Secondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit elit.</q-item-label>
        </q-item-section>

        <q-item-section side top>
          <q-item-label caption>Store</q-item-label>
          <div class="text-orange">
            <q-icon name="star" />
            <q-icon name="star" />
            <q-icon name="star" />
          </div>
        </q-item-section>
      </q-item>
        </q-list>

         <StoreItemSectionComponent 
         v-model="itemDetailsModalOpen"
         :documentID="documentId"
        :customer="customerName"
        :phone="customerPhone"
        :comment="orderComment"
        :orderNo="orderNumber"
        :dropOff="droppedDate"
        :dueDate="dueByDate"
        :garments="orderBasket"
        :pickup="pickupLocation"
        :totalPay="totalPayment"
         />
      </div>
   </q-page>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import axios from 'axios';
import NewOrderModalComponent from 'src/components/NewOrderModalComponent.vue';
import StoreItemSectionComponent from 'src/components/StoreItemSectionComponent.vue';
import checkDateStatus  from 'src/helpers/checkDateStatus';
import { type Garment } from 'src/components/StoreItemSectionComponent.vue'; // Interface for order items

interface OrderItem {
  _id: string;
  orderNo: string;
  comment: string;
  phone: string;
customer: string;
dropOff: string;
due: string;
garments: Garment[],
pickupPoint: string;
totalDue: number
}

const api = `https://server-for-first-automated.onrender.com/api/user/storefront`;

const row1 = ref<OrderItem[]>([]);

const row2 = ref<OrderItem[]>([]);

const weekStart = ref();
const weekEnd = ref()

// Heading for the Today section
  const todayDate = ref(new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }));

/**
 * 
comment: "Good customer"
customer: "Alhaja"
dropOff: "Wed, Oct 22"
due: "Sat, Oct 25"
garments: (3) [{…}, {…}, {…}]
orderNo: "gy32ymh0gso"
phone: "0000000"
pickupPoint: "Home"
totalDue: 11140
 */
const newOrderModalOpen = ref(false)
const itemDetailsModalOpen = ref(false)
//const modalContent = ref("")
const documentId = ref()
const orderNumber = ref()
const orderComment = ref()
const customerName = ref()
const customerPhone = ref()
const droppedDate = ref()
const dueByDate = ref()
const orderBasket = ref()
const pickupLocation = ref()
const totalPayment = ref()

const showNewOrderForm = () => {
  newOrderModalOpen.value = true
 // modalContent.value = content
}

const showOrderDetails = (docId: string, orderNo: string, comment: string, phone:string, customer:string,  submitDate:string, collectDate:string, clothesArr: Garment[], pup:string, orderTotal: number) => {
  itemDetailsModalOpen.value = true
  documentId.value = docId;
  orderNumber.value = orderNo;
  orderComment.value = comment;
  customerName.value = customer;
  customerPhone.value = phone;
  droppedDate.value = submitDate;
  dueByDate.value = collectDate;
  orderBasket.value = clothesArr;
  pickupLocation.value = pup;
  totalPayment.value = orderTotal;
}
const rowLoading = ref(false)

const fetchTodayOrders = async () => {
  try {
    rowLoading.value = true;
    const response = await axios.get(api, {withCredentials:true});
    //console.log("Orders: ", response.data)
        const resArr = Object.keys(response.data).map(key => {
      return response.data[key]
    });
    resArr.forEach(x => {
     // console.log(x.due);
            const outcome = checkDateStatus(x.due);
          //  console.log(outcome);
            /**
             * {
                isToday: false,
                isInCurrentWeek: true,
                weekRange: {
                  start: "Sun, Oct 19",
                  end: "Sat, Oct 25"
                }
              }
             */
      if (outcome.isToday) {
        row1.value.push(x)
        rowLoading.value = false
      } else if (outcome.isInCurrentWeek) {
        row2.value.push(x)

        weekStart.value = outcome.weekRange.start
        weekEnd.value = outcome.weekRange.end
        rowLoading.value = false;
      }
      
      // console.log("Todays: ", row1.value)
      // console.log("Weeks: ", row2.value)
      // console.log(`Range: ${weekStart.value} - ${weekEnd.value}`)
    }); // resArr forEach

  } catch (error) {
    console.error("Error fetching orders:", error);
  } finally {
    rowLoading.value = false
  }
}

onMounted(() => {
  //fetchTodayOrders().then(() => console.log("Mounted fetchTodayOrders..")).catch(e => console.error(e))
  fetchTodayOrders().catch(e => console.error(e))
})
</script>

<style lang="css" scoped>
.item-card {
    margin: 4px;
    background-color: lightgrey;
}
#new-order {
    margin-left: 16px;
}
.p-segment {
    margin-left: 8px;
    margin-top: 2%;
}
#today-div .p-segment {
    margin-top: 6%;
}
.search-row {
    display: flex;
    flex-direction: row;
    padding: 4px;
   
    position: fixed;
    width: 100%;
    z-index: 50;
}
.search-span {
    width: 96%;
}
.item-section:hover {
  cursor: pointer;
}
@media only screen and (max-width: 500px) {
  #today-div .p-segment {
  margin-top: 16%;
}
}

/* #today-list {
    margin-top: 6%;
} */
</style>