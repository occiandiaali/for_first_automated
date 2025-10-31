<template v-slot:body="props">
     
            <q-dialog v-model="visible">
      <q-card>
        <q-card-section>
          <div class="text-h6">New Order Form</div>
        </q-card-section>

        <q-separator />

        <q-card-section style="max-height: 50vh" class="scroll">
      
            <div class="q-pa-md" style="max-width: 340px">

    <q-form

      class="q-gutter-md"
    >
      <q-input
        filled
        v-model="name"
        label="Customer *"
        hint="name and/or surname"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Please type something']"
        style="width: 100%;"
      />

      <q-input
        filled
        type="tel"
        v-model="phone"
        label="Phone number *"
        lazy-rules
        :rules="[
          val => val !== null && val !== '' || 'Please type customer phone no.',
         // val => val > 0 && val < 10 || 'Please type a real phone no.'
        ]"
        style="width: 100%;"
      />

      
      <q-input
        filled
        
        v-model="comment"
        label="Comment"
        style="width: 100%;"
      />
      <div id="items-select-div">

          <q-btn outline style="color: goldenrod;" :label="t ? '₦'+t : 'Clothing Items'" @click="selectItems = true" />

       
            <q-dialog v-model="selectItems">
      <q-card>
        <q-card-section>
          <div class="text-h6">Checked-in item(s)</div>
        </q-card-section>

        <q-separator />

        <q-card-section style="max-height: 50vh" class="scroll">
            <q-list separator>
              <q-item v-if="loading"><q-item-label caption>Loading..</q-item-label></q-item>
              <q-item v-if="error"><q-item-label caption>{{ error }}</q-item-label></q-item>
                <q-item v-for="item in options" :key="item._id">
                     <q-item-section >
                      <q-checkbox v-model="item.checked"
                      color="deep-orange"
                     @update:model-value="() => logCheckedItem(item._id, item.checked, item.itemName, item.itemPrice, item.qty)"
                      />
                      </q-item-section>
                      <q-item-section style="font-size: small;">

                      <q-item-label>{{ item.itemName }}</q-item-label>
                      <q-item-label caption >NGN{{ item.itemPrice*item.qty }}</q-item-label>

                      </q-item-section>
                       <q-item-section >
                      <q-knob
                         :min="1"
                         :max="10"
                         v-model="item.qty"
                         show-value
                         size="80px"
                         :thickness="0.3"
                         color="deep-orange"
                         track-color="orange-3"
                         class="q-ma-md"
                       />
                     </q-item-section>
                </q-item>
            </q-list>
                
        </q-card-section>

        <q-separator />

        <q-card-section>
          <q-item-label caption><strong>Amount</strong> ₦{{ t }}</q-item-label>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="primary" v-close-popup />
          <q-btn flat label="Accept" @click="processCheckedItems" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
      </div>     
      <q-input
        filled
        type="date"
        v-model="dueDate"
        label="Due date *"
        style="width: 100%;"
      />
      <q-select 
      label="Pickup@ *"
            transition-show="scale"
        transition-hide="scale"
        v-model="pickup"
        filled
        :options="pickupOptions"
        style="width: 100%;"
      />

      <!-- <q-toggle v-model="accept" label="I accept the license and terms" /> -->

      <div>
        <q-item-label class="q-ml-sm q-mb-md"><strong>Total</strong> ₦{{ t }}</q-item-label>
        <q-btn label="Submit" type="submit" @click="fakeSubmit" class="glossy" rounded color="deep-orange" v-close-popup/>
        <q-btn label="Reset" type="reset" @click="reset" color="teal" flat class="q-ml-sm" />
      </div>
    </q-form>

  </div>
        </q-card-section>

        <q-separator />

        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="danger" v-close-popup />
          <!-- <q-btn flat label="Book" color="success" v-close-popup /> -->
        </q-card-actions>
      </q-card>
    </q-dialog>
      
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import axios from 'axios';
import { useItems } from 'src/composables/useItems';


interface Item {
  _id: string
  checked: boolean
  itemName:string
  itemPrice: number
  qty: number
}



const {items, loading, error} = useItems()

const options = ref(items);//ref(fabricsArray)

//const thisBooking = ref()


const logCheckedArr = ref<Item[]>([]) // Track booked checked-in items

function logCheckedItem(id:string,isCheck:boolean,label:string, p:number, q:number) {
  const item = {
    _id:id,
    itemName:label,
    itemPrice:p,
    qty: q,
    checked:isCheck
  }
  if (isCheck) {
    logCheckedArr.value.push(item)
    console.log("Checked ", logCheckedArr.value)

  } else if (!isCheck){
    const idx = logCheckedArr.value.findIndex(o => o._id === id)
    if (idx !== -1) {
      logCheckedArr.value.splice(idx, 1)
    }
    console.log("Checked ", logCheckedArr.value)
  }
}


const props = defineProps({
    modalValue: Boolean,
  //  data: String,
  //  items: [String, Number]
})

const name = ref()
const phone = ref()
const comment = ref()
const dueDate = ref()

//const orderTotal = ref(0)

const selectItems = ref(false) // open select garments list modal


const pickup = ref()
const pickupOptions = ref(["Home", "Store"])

const visible = ref(props.modalValue)
//const modalData = ref(props.data)
//const optionsData = ref(props.items)
watch(() => props.modalValue, val => visible.value = val)
//watch(() => props.data, val => modalData.value = val)

// Lines 224 - 238 handle the nested modal for items checked-in
const t = computed(() => {
  return logCheckedArr.value.reduce((sum, item) => sum + item.itemPrice*item.qty, 0)
})
const checkedItems = ref()
const processCheckedItems = () => {
  checkedItems.value = logCheckedArr.value.map(order => {
  return {
  
    name: order.itemName,
  price: order.itemPrice,
  amt: order.qty,
  subTotal: (order.itemPrice * order.qty),
}
})
}

const fakeSubmit = async () => {
  const readyDate = new Date(dueDate.value);
  const dropDate = new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
 // let t = 0;

const formattedDate = readyDate.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });

  const order = {
    orderNo: Math.random().toString(36).slice(2), // {TODO: Test this!!}
    customer: name.value,
    phone: phone.value,
    comment: comment.value,
    garments: checkedItems.value,
    dropOff: dropDate,
    due: formattedDate,
    totalDue: t.value,
    pickupPoint: pickup.value
  }

   try {
    const response = await axios.post(`https://server-for-first-automated.onrender.com/api/user/storefront`, order, {withCredentials:true});
    console.log("New Order booked: ", response.data);
    reset();
    location.reload();
   } catch (error) {
    console.error("Error booking Order: ", error)
   }
  //reset()
}

const reset = () => {
    name.value = null;
  phone.value = null;
  comment.value = null;
  logCheckedArr.value = [];
  dueDate.value = null;
  pickup.value = null;
}

</script>

<style lang="css" scoped>
/* WebKit Browsers */
*::-webkit-scrollbar {
    width: 12px;
}

*::-webkit-scrollbar-track {
    /* background: #f1f1f1; */
    background: #f0b176;
}

*::-webkit-scrollbar-thumb {
    /* background: #888; */
    background: #e0630f;
    border-radius: 10px;
}

/* Firefox */
* {
    scrollbar-width: thin;
    /* scrollbar-color: #888 #f1f1f1; */
    scrollbar-color: #c7560b #f5ca7a;
}

</style>
