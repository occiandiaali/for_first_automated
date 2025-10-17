<template v-slot:body="props">
     
            <q-dialog v-model="visible">
      <q-card>
        <q-card-section>
          <div class="text-h6">{{ customer }}</div>
        </q-card-section>

        <q-separator />

        <q-card-section style="max-height: 50vh" class="scroll">
            <div class="q-pa-md" style="max-width: 450px">
                <p>Pick-up @ {{ pickup }}</p>
                <p>Time due: {{ due }}</p>
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
    customer: String,
    due: String,
    pickup: String
})


const visible = ref(props.modalValue)
const customer = ref(props.customer)
const due = ref(props.due)
const pup = ref(props.pickup)

watch(() => props.modalValue, val => visible.value = val)
watch(() => props.customer, val => customer.value = val)
watch(() => props.due, val => due.value = val)
watch(() => props.pickup, val => pup.value = val)
</script>
