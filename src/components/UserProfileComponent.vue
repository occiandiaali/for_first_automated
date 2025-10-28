<template>
    <div class="q-pa-md q-gutter-sm" >
            <q-dialog v-bind:model-value="show" persistent>
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">Hi, {{ username }}</div>
        </q-card-section>

        <q-card-section>
                 <q-file color="grey-3" max-files="1" max-file-size="15360" accept="image/*" outlined v-model="avatar" hint="Change profile pic">
        <template v-slot:append>
          <q-icon name="attachment" color="orange" />
        </template>
      </q-file>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input 
          type="password" 
          hint="Change password" 
          placeholder="Minimum 8 characters" 
          dense 
          v-model="password"  
          :error="!isPasswordValid"
          error-message="Letters & numbers at least 8 characters long."
          @blur="validatePasswordLength"
          />
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancel" v-close-popup />
          <q-btn flat label="Update" @click="updatePassword"  />
        </q-card-actions>
      </q-card>
    </q-dialog>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { getUserName, getUserId } from 'src/helpers/auth';
import { isAlphanumericLength8 } from 'src/helpers/checkAlphaNumericLen';

import axios from 'axios'

//const prompt = ref(false)
const avatar = ref(null)
const password = ref<string|null>(null)
const username = ref(getUserName());
const userid = ref(getUserId());

const isPasswordValid = ref(true)

const {show = false} = defineProps<{show: boolean}>()

// const props = defineProps<{
//     prompt: boolean
// }>()
// const emit = defineEmits<{
//     (event: 'update:prompt', value: boolean): void;
// }>()

// function storeAvatarLocally(file: Blob) {
//   const reader = new FileReader();
//   reader.onloadend = function() {
//     localStorage.setItem('userPic', JSON.stringify(reader.result));
//   };
//   reader.readAsDataURL(file)
// }

const updatePassword = async () => {
  if (!isPasswordValid.value) return;
  try {
    const response = await axios.patch('http://localhost:3000/api/user/change-default-password', {
      userId: userid.value,
      newPassword: password.value
    });
    password.value = null;
    alert(response.data)
  } catch (error) {
    console.error('Error updating password:', error);
    alert("Oops! Couldn't update! Try again.")
  }
}

function validatePasswordLength() {
 // isPasswordValid.value = (password.value !== null && password.value.length >= 8);
 isPasswordValid.value = isAlphanumericLength8(password.value)
}


// const saveChanges = () => {


//     console.log("Password set: ", password.value)
//     password.value = null
// }
</script>
