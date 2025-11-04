<template v-slot:body="props">
            <q-dialog v-model="visible">
      <q-card>
        <!-- <q-card-section>
          
        </q-card-section>
        <q-separator/> -->
        <q-card-section>
          <q-item-label caption>Order ID {{ orderNo }}</q-item-label>
          <div class="text-h4">{{ customer }}</div>
          <q-item-label caption>Phone: {{ phone }}</q-item-label>
        </q-card-section>

        <q-separator />
        <q-card-section>
            <div class="q-pa-sm" style="max-width: 450px;display: flex;flex-direction: row;justify-content: space-between;">
                <p>Check-in {{ dropOff }}</p>
                <p><strong>Due</strong> {{ dueDate }}</p>
            </div>
        </q-card-section>

        <q-separator/>

        <q-card-section style="max-height: 150px" class="scroll">
            <div class="q-pa-sm" style="width: 350px">
        
         <q-item v-for="garment in garments" :key="garment._id">
        <q-item-section>
          <q-item-label>{{ garment.name }}</q-item-label>
          <q-item-label caption>Qty {{ garment.amt }} @ ₦{{ garment.price }} each</q-item-label>
        </q-item-section>

        <q-item-section side top>
          <q-item-label caption>sub-total ₦{{ garment.subTotal }}</q-item-label>
          <div class="text-orange">
            <q-icon name="star" />
            <q-icon name="star" />
            <q-icon name="star" />
          </div>
        </q-item-section>
       
      </q-item>
            </div>
        </q-card-section>
        <q-card-section v-if="comment">{{ comment }}</q-card-section>

        <q-separator/>
                <q-card-section>
            <div class="q-pa-sm" style="max-width: 450px;display: flex;flex-direction: row;justify-content: space-between;">
              <p>Total ₦<strong>{{ totalPay }}</strong></p>
                <p>Pickup@ {{ pickup }}</p>
            </div>
        </q-card-section>

        <q-separator />
        <!--ConfirmComplete dialog-->
            <q-dialog v-model="confirmComplete" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="warning" color="deep-orange" text-color="white" />
          <span class="q-ml-sm">You are about to complete this order. Proceed?</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="primary" v-close-popup />
          <q-btn flat label="Complete order" color="primary" @click="handleComplete(documentID)" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
        <!---->

        <q-card-actions align="right">
          <q-btn style="background: goldenrod;" label="Complete" @click="confirmComplete = true" />
          <q-btn label="Close" color="brown-8" v-close-popup />
          <!-- <q-btn flat label="Book" color="success" v-close-popup /> -->
        </q-card-actions>
      </q-card>
    </q-dialog>
      
</template>

<script setup lang="ts">
import { type PropType, ref, watch } from 'vue';
import axios from 'axios';

export interface Garment {
  name: string;
  price: number;
  amt: number;
  subTotal: number;
  _id: string;
}

const confirmComplete = ref(false)

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
const props = defineProps({
    modalValue: Boolean,
    documentID: String,
    orderNo: String,
    comment: String,
    customer: String,
    phone: String,
    dropOff: String,
    dueDate: String,
    garments: {type: Array as PropType<Garment[]>},
    pickup: String,
    totalPay: Number
})


const visible = ref(props.modalValue)

const docID = ref(props.documentID)
const orderNo = ref(props.orderNo)
const comment = ref(props.comment)
const phone = ref(props.phone)
const customer = ref(props.customer)
const dropOff = ref(props.dropOff)
const dueDate = ref(props.dueDate)
const garments = ref(props.garments)
const pickup = ref(props.pickup)
const total = ref(props.totalPay)

watch(() => props.modalValue, val => visible.value = val)
watch(() => props.documentID, val => docID.value = val)
watch(() => props.orderNo, val => orderNo.value = val)
watch(() => props.comment, val => comment.value = val)
watch(() => props.phone, val => phone.value = val)
watch(() => props.customer, val => customer.value = val)
watch(() => props.dropOff, val => dropOff.value = val)
watch(() => props.dueDate, val => dueDate.value = val)
watch(() => props.garments, val => garments.value = val)
watch(() => props.pickup, val => pickup.value = val)
watch(() => props.totalPay, val => total.value = val)

// Refs to control if item deletion proceeds
const proceedToDel = ref(false)

async function postToArchive(id:string|undefined) {
 // alert("Sending document to Archive...")
 try {
  const response = await axios.post(`https://server-for-first-automated.onrender.com/api/user/archive`, { itemId: id }, {withCredentials:true})

    if (response.status === 200 || response.status === 201) {
      proceedToDel.value = true;
      console.log('Item archived:', response.data);
    }

 } catch (error) {
    console.error('TryCatch Error archiving item:', error);
 }
}
async function deleteFromOrders(str: string|undefined) {
 // alert(`Deleting order ${str}...`)
 try {
  const response = await axios.delete(`https://server-for-first-automated.onrender.com/api/user/storefront/${str}`, {withCredentials:true});
  alert(`${response.data}`)
 } catch (error) {
  console.error("Error deleting Order: ", error)
 }
}

function handleComplete(orderId: string|undefined) {
  postToArchive(orderId).then(() => {
    if(proceedToDel.value) {
      deleteFromOrders(orderId).then(() => {
        location.reload()
      }).catch(e => console.error(e))
    } else {
      alert("Couldn't complete. Please, try again.")
    }
  }).catch(e => console.error(e))
}



</script>
