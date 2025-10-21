<!-- <template>
  <q-dialog v-bind:model-value="modelValue">
    <q-card>
      <q-card-section>
        <q-list>
          <q-item v-for="item in options" :key="item._id">
            <q-item-section avatar>
              <q-checkbox
                v-model="selected[item._id]?.checked"
                @update:model-value="() => toggleCheck(item._id, item.itemName,item.itemPrice)"
              />
            </q-item-section>

            <q-item-section style="font-size: small;">
              <q-item-label>{{ item.itemName }}</q-item-label>
              <q-item-label caption >NGN{{ item.itemPrice*item.qty }}</q-item-label>
            </q-item-section>

            <q-item-section>
              <q-input
                type="number"
                v-model.number="selected[item._id]?.qty"
                :disable="!selected[item._id]?.checked"
                min="1"
                dense
                style="width: 60px"
              />
            </q-item-section>
                                   
          </q-item>
        </q-list>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Cancel" @click="cancel" />
        <q-btn flat label="Confirm" color="primary" @click="confirm" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, reactive, watch } from 'vue'

interface Option {
  _id: string
  itemName: string
  qty: number
  itemPrice: number
  checked: boolean
}

interface Selection {
    checked: boolean
    itemName: string
  itemPrice: number
  qty: number
}

const props = defineProps<{
  modelValue: boolean
  options: Option[]
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'confirm', selected: { _id: string; itemName: string; qty: number; itemPrice: number; checked: boolean }[]): void
}>()

const selected = reactive<Record<string, Selection>>({})

// Reset selection when options change
watch(
  () => props.options,
  (newOptions) => {
    for (const item of newOptions) {
      if (!selected[item._id]) {
        selected[item._id] = { checked: false, qty: item.qty, itemName: item.itemName, itemPrice: item.itemPrice }
      }
    }
  },
  { immediate: true }
)

function toggleCheck(id: string, name:string, price:number) {
  if (!selected[id]) {
    selected[id] = { checked: true, qty: 1, itemName: name, itemPrice: price }
  } else {
    selected[id].checked = !selected[id].checked
  }
}

function confirm() {
  const result = Object.entries(selected)
  //@ts-ignore
    .filter(([_, val]) => val.checked)
    .map(([id, val]) => {
      const item = props.options.find(opt => opt._id === id)
      return {
        id,
        label: item?.itemName ?? '',
        qty: val.qty
      }
    })
  //emit('confirm', result)
  emit('update:modelValue', false)
}

function cancel() {
  emit('update:modelValue', false)
}
</script> -->
