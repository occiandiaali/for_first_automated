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
            <q-select
        label="Items"
        transition-show="flip-up"
        transition-hide="flip-down"
        filled
        v-model="model"
        :options="options"
        style="width: 100%;"
      />
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
const age = ref()
const model = ref()
const pickup = ref(["Home delivery", "Store"])
const options = ref([
    'Shirt (long-sleeve)',
    'Shirt (short-sleeve)',
    'Polo',
    'Jeans',
    'Native (male)',
    'Skirt (corporate)',
    'Skirt (mini)',
    'Native (female)',
    'Curtain (6x6)',
    'Bedsheet (large)'
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
