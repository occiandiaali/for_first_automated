<template>
<div class="q-pa-md q-gutter-sm" >
  <q-dialog v-bind:model-value="show" persistent>
      <q-card style="min-width: 300px">
        <q-card-section>
          <div class="text-h6">Hi, {{ username }}</div>
        
        </q-card-section>

        <q-card-section>
            <q-file :model-value="null" :hint="previewUrl ? 'Click Save to use the photo' : 'Choose your Profile photo (20KB max)'" outlined @update:model-value="onFileSelected" color="grey-3" label="Upload photo" accept="image/*">
        <template v-slot:append>
          <q-icon name="attachment" color="orange" />
        </template>
      </q-file>
          <div v-if="fileSizeErr" class="text-negative q-mt-sm">
      {{ fileSizeErr }}
    </div>
          <div v-if="previewUrl">
      <img :src="previewUrl.toString()" alt="Profile Preview" style="max-width: 40px; margin-top: 10px;" />
      <br/>
      <q-btn color="orange-14" size="sm" outline label="Save" @click="storeUserpic(previewUrl)" v-close-popup/>
    </div>

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

        <q-card-actions align="right" class="text-secondary">
          <q-btn flat label="Cancel" v-close-popup />
          <q-btn :disable="!isPasswordValid" outline label="Update password" @click="updatePassword"  />
        </q-card-actions>
      </q-card>
    </q-dialog>
    </div>
</template>

<script setup lang="ts">
import { useQuasar } from 'quasar';
import { ref } from 'vue';
import { getUserName, getUserId, storeUserpic } from 'src/helpers/auth';
import { isAlphanumericLength8 } from 'src/helpers/checkAlphaNumericLen';

import axios from 'axios'

const $q = useQuasar()

const previewUrl = ref<string|ArrayBuffer|null>(null)
const fileSizeErr = ref<string|null>(null)

function onFileSelected(file: Blob) {
    fileSizeErr.value = null
  previewUrl.value = null

  if (!file) return

  const maxSize = 20 * 1024 // 20KB in bytes

  if (file.size > maxSize) {
    fileSizeErr.value = 'File size must be less than 20KB.'
    return
  }
  //>>>>>>>>>>>>>>>>>>>>>>>>>>>
  if (file && file.type.startsWith('image/')) {
    const reader = new FileReader()
    reader.onload = () => {
      previewUrl.value = reader.result
      // You can now send reader.result to your backend or save it locally
      console.log("reader.result ", previewUrl.value)
      
    }
    reader.readAsDataURL(file)
  } else {
  //  previewUrl.value = null
  fileSizeErr.value = 'Please, select a valid image file.'
        $q.notify({
      color: 'red-5',
      textColor: 'white',
      icon: 'warning',
      message: `File size exceeds the limit of KB`,
    });
  }
}

const password = ref<string|null>(null)
const username = ref(getUserName());
const userid = ref(getUserId());

const isPasswordValid = ref(false)

const {show = false} = defineProps<{show: boolean}>()

// const props = defineProps<{
//     prompt: boolean
// }>()
// const emit = defineEmits<{
//     (event: 'update:prompt', value: boolean): void;
// }>()

  

// function storeAvatarLocally() {
//   localStorage.setItem('userPic', JSON.stringify(previewUrl.value));
//   location.reload();
// }

const updatePassword = async () => {
  if (!isPasswordValid.value) {
    alert("A valid password must be typed!");
    return;
  }

  if (confirm("Are you sure you want to change your password?")) {
    try {
      const response = await axios.patch(`https://server-for-first-automated.onrender.com/api/user/change-default-password`, {
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
}

function validatePasswordLength() {
 // isPasswordValid.value = (password.value !== null && password.value.length >= 8);
 isPasswordValid.value = isAlphanumericLength8(password.value)
}
</script>

<style lang="css" scoped>
@media only screen and (max-width: 390px) {
  .cunt {
    width: 280px;
  }
}
</style>
