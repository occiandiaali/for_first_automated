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
          val => val > 0 && val < 11 || 'Please type a real phone no.'
        ]"
        style="width: 100%;"
      />

      
      <q-input
        filled
        type="number"
        v-model="comment"
        label="Comment"
        style="width: 100%;"
      />
      <div id="items-select-div">

          <q-btn outline style="color: goldenrod;" label="Clothing Items" @click="selectItems = true" />

       
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

        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="primary" v-close-popup />
          <q-btn flat label="Accept" color="primary" v-close-popup />
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
        <q-item-label class="q-ml-sm q-mb-md"><strong>Total</strong> $0</q-item-label>
        <q-btn label="Submit" type="submit" class="glossy" rounded color="deep-orange"/>
        <q-btn label="Reset" type="reset" color="teal" flat class="q-ml-sm" />
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
import { ref, watch } from 'vue';

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

const selectItems = ref(false) // open select garments list modal


const pickup = ref()
const pickupOptions = ref(["Home", "Store"])

const visible = ref(props.modalValue)
//const modalData = ref(props.data)
//const optionsData = ref(props.items)
watch(() => props.modalValue, val => visible.value = val)
//watch(() => props.data, val => modalData.value = val)

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
