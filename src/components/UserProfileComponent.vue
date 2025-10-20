<template>
    <div class="q-pa-md q-gutter-sm" >
            <q-dialog v-bind:model-value="show" persistent>
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">Hi, {{ username }}</div>
        </q-card-section>

        <q-card-section>
                 <q-file color="grey-3" outlined v-model="avatar" hint="Change profile pic">
        <template v-slot:append>
          <q-icon name="attachment" color="orange" />
        </template>
      </q-file>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input hint="Change password" placeholder="Minimum 8 characters" dense v-model="password"  />
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancel" v-close-popup />
          <q-btn flat label="Done" v-close-popup @click="saveChanges"  />
        </q-card-actions>
      </q-card>
    </q-dialog>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { getUserName } from 'src/helpers/auth';

//const prompt = ref(false)
const avatar = ref(null)
const password = ref(null)
const username = ref(getUserName())

const {show = false} = defineProps<{show: boolean}>()

// const props = defineProps<{
//     prompt: boolean
// }>()
// const emit = defineEmits<{
//     (event: 'update:prompt', value: boolean): void;
// }>()


const saveChanges = () => {


    console.log("Password set: ", password.value)
    password.value = null
}
</script>
