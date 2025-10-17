<template v-slot:body="props">
     
            <q-dialog v-model="visible">
      <q-card>
        <q-card-section>
          <div class="text-h6">New Order Form</div>
        </q-card-section>

        <q-separator />

        <q-card-section style="max-height: 50vh" class="scroll">
            <!-- <p>{{ modalData }}</p> -->
            <div class="q-pa-md" style="max-width: 340px">

    <q-form

      class="q-gutter-md"
    >
      <q-input
        filled
        v-model="name"
        label="Customer *"
        hint="Name and/or Surname"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Please type something']"
        style="width: 100%;"
      />

      <q-input
        filled
        type="tel"
        v-model="age"
        label="Phone number *"
        lazy-rules
        :rules="[
          val => val !== null && val !== '' || 'Please type your age',
          val => val > 0 && val < 100 || 'Please type a real age'
        ]"
        style="width: 100%;"
      />

      
      <q-input
        filled
        type="number"
        v-model="age"
        label="Comment"
        style="width: 100%;"
      />
      <div id="items-select-div">
        <!-- <q-btn label="Clothing Items" color="primary" @click="selectItems = true" /> -->
          <q-btn outline style="color: goldenrod;" label="Clothing Items" @click="selectItems = true" />
       
            <q-dialog v-model="selectItems">
      <q-card>
        <q-card-section>
          <div class="text-h6">Submitted item(s) & quantity</div>
        </q-card-section>

        <q-separator />

        <q-card-section style="max-height: 50vh" class="scroll">
            <q-list separator>
                <q-item v-for="item in options" :key="item.name">
                    <q-item-section style="font-size: small;">{{ item.name }}</q-item-section>
                    <q-item-section>
                                                    <q-knob
      :min="1"
      :max="10"
      v-model="item.qty"
      show-value
      size="40px"
      :thickness="0.22"
      color="deep-orange"
      track-color="orange-3"
      class="q-ma-md"
    />
                    </q-item-section>
                </q-item>
            </q-list>
          <!-- <p v-for="item in options" :key="item.name">{{ item.name }}
                            <q-knob
      :min="1"
      :max="10"
      v-model="item.qty"
      show-value
      size="40px"
      :thickness="0.22"
      color="deep-orange"
      track-color="orange-3"
      class="q-ma-md"
    />
    </p> -->
        </q-card-section>

        <q-separator />

        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="primary" v-close-popup />
          <q-btn flat label="Accept" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>


      </div>
            <!-- <q-select
        label="Items"
        transition-show="flip-up"
        transition-hide="flip-down"
        filled
        v-model="model"
        :options="options"
        style="width: 100%;"
      /> -->

      <!-- <q-tr :props="props">
                  <q-td key="desc" :props="props">
            {{ props.items?.name }}
            <q-popup-edit v-model="props.row.name" buttons v-slot="scope">
              <q-input v-model="scope.value" dense autofocus counter @keyup.enter="scope.set" />
            </q-popup-edit>
          </q-td>
               <q-td key="calories" :props="props">
            {{ props.row.calories }}
            <q-popup-edit v-model.number="props.row.calories" buttons v-slot="scope">
              <q-input type="number" v-model.number="scope.value" dense autofocus @keyup.enter="scope.set" />
            </q-popup-edit>
          </q-td>
      </q-tr> -->

      
      <q-input
        filled
        type="date"
        v-model="age"
        label="Due"
        style="width: 100%;"
      />
      <q-select 
      label="Pickup@"
            transition-show="scale"
        transition-hide="scale"
        v-model="name"
        filled
        :options="pickup"
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

const props = defineProps({
    modalValue: Boolean,
  //  data: String,
    items: [String, Number]
})
const name = ref()
//const accept = ref()
// const itemQty = ref(1)
// const right = ref()
const selectItems = ref(false)
const age = ref()
//const model = ref()
const pickup = ref(["Home delivery", "Store"])
const options = ref([
    {name: 'Shirt (long-sleeve)', qty: 1},
    {name:'Shirt (short-sleeve)', qty: 1},
    {name:'Polo', qty: 1},
    {name:'Jeans', qty: 1},
    {name:'Native (male)', qty: 1},
    {name:'Skirt (corporate)', qty: 1},
    {name:'Skirt (mini)', qty: 1},
    {name:'Native (female)', qty: 1},
    {name:'Curtain (6x6)', qty: 1},
    {name:'Bedsheet (large)', qty: 1},
    {name:'Chinos', qty: 1},
    {name:'Round-neck', qty: 1},
    {name:'Suit (male)', qty: 1},
    {name:'Suit (female)', qty: 1},
])
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
