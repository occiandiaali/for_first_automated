<template>
   <q-page>
    <div class="search-row">
          <q-input color="deep-orange" class="search-span" v-model="text" label="Search">
        <template v-slot:prepend>
          <q-icon name="search" />
        </template>
      </q-input>
       <q-btn square color="deep-orange" icon="add" id="new-order" @click="showNewOrderForm('It works!')" />
      </div>
      <NewOrderModalComponent v-model="newOrderModalOpen" :data="modalContent"/>
      <br>
      <div id="today-div">
          <p class="p-segment"><strong>Today</strong> {{ todayDate }}</p>
          <q-list id="today-list">
                              <q-item class="item-card" v-for="t in todays" :key="t.name">
        <q-item-section class="item-section" @click="showItemDetails(t.name, t.due, t.pickup)">
          <q-item-label><strong>{{ t.due }}</strong></q-item-label>
          <q-item-label>{{ t.name }}</q-item-label>
          <q-item-label caption>Secondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit elit.</q-item-label>
        </q-item-section>

        <q-item-section side top>
          <q-item-label caption>{{ t.pickup }}</q-item-label>
          <div class="text-orange">
            <q-icon name="star" />
            <q-icon name="star" />
            <q-icon name="star" />
          </div>
        </q-item-section>
      </q-item>
    
        </q-list>
    </div>
      <div>
        <p class="p-segment"><strong>This week</strong> {{ todayDate }} - {{ endWeek }}</p>
                <q-list id="week-list">
                  <q-item class="item-card" v-for="v in thisWeek" :key="v.name">
        <q-item-section class="item-section" @click="showThisWeekDetails(v.name, v.day, v.due, v.pickup)">
          <q-item-label><strong>{{ v.day }}</strong></q-item-label>
          <q-item-label caption>{{ v.due }}</q-item-label>
          <q-item-label>{{ v.name }}</q-item-label>
          <q-item-label caption>Secondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit elit.</q-item-label>
        </q-item-section>

        <q-item-section side top>
          <q-item-label caption>{{ v.pickup }}</q-item-label>
          <div class="text-orange">
            <q-icon name="star" />
            <q-icon name="star" />
            <q-icon name="star" />
          </div>
        </q-item-section>
      </q-item>

        </q-list>
      </div>
      <div>
        <p class="p-segment"><strong>Upcoming</strong> After this week</p>
                <q-list>
                  <q-item class="item-card">
        <q-item-section>
          <q-item-label><strong>Oct 25</strong></q-item-label>
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
          <q-item-label><strong>Oct 26</strong></q-item-label>
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
        <StoreItemSectionComponent v-model="itemDetailsModalOpen" :pickup="pickupPoint" :customer="customerName" :due="bookingDue"  />
      </div>
   </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import NewOrderModalComponent from 'src/components/NewOrderModalComponent.vue';
import StoreItemSectionComponent from 'src/components/StoreItemSectionComponent.vue';

const todays = [
  {name: "Mr. Iyke", due: '8:05 AM', pickup: "Store"},
  {name: "Delilah", due: '1:00 PM', pickup: "Home delivery"},
  {name: "Alhaji", due: '11:50 AM', pickup: "Store"},
]
// Heading for the Today section
  const todayDate = ref(new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }));
const thisWeek = [
    {name: "Madame Anna", day: 'Sat 18', due: '4:35 PM', pickup: "Store"},
  {name: "Oga Joe", day: 'Sat 18', due: '11:00 AM', pickup: "Home delivery"},
  {name: "Tompolo", day: 'Mon 20', due: '2:50 PM', pickup: "Store"},
]
// Heading for the Week ahead section
const date = new Date();
date.setDate(date.getDate() + 6)
const endWeek = ref(date.toDateString().slice(0,10))

const text = ref()
//console.log(text)
//const heavyList = ref([])
const newOrderModalOpen = ref(false)
const itemDetailsModalOpen = ref(false)
const modalContent = ref("")
const customerName = ref()
const bookingDue = ref()
const dueDay = ref()
const pickupPoint = ref()
const showNewOrderForm = (content:string) => {
  newOrderModalOpen.value = true
  modalContent.value = content
}
const showItemDetails = (customer:string, due:string, pup:string) => {
  itemDetailsModalOpen.value = true
  customerName.value = customer
  bookingDue.value = due
  pickupPoint.value = pup
}
const showThisWeekDetails = (customer:string, day:string, due:string, pup:string) => {
  itemDetailsModalOpen.value = true
  customerName.value = customer
  bookingDue.value = due
  dueDay.value = day
  pickupPoint.value = pup
}
</script>

<style lang="css" scoped>
.item-card {
    margin: 8px;
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