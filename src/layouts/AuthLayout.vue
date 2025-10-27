<template>
  <div class="q-pa-md" style="max-width: 500px;margin: 6% auto;background-color: orange;">
    <h5>First Automated Login</h5>
    <q-form
      @submit="onSubmit"
      @reset="onReset"
      class="q-gutter-md"
    >

          <q-input
          type="email"
        filled
        v-model="email"
        label="Your email"
        hint="you@example.com"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Please type something']"
      />
      <!-- <q-input
        filled
        v-model="name"
        label="Your name *"
        hint="What do we call you?"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Please type something']"
      /> -->
            <q-input
            type="password"
        filled
        v-model="password"
        label="Your password"
        
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Please type something']"
      />
     
      <!-- <div class="q-gutter-sm">
        <q-item-label>Your role</q-item-label>
              <q-radio v-model="role" val="admin" label="Admin" />
      <q-radio v-model="role" val="user" label="User" />
          <div class="q-px-sm">
      Your role is: <strong>{{ role ?? '❌' }}</strong>
    </div>
      </div> -->

      <!-- <q-input
        filled
        type="number"
        v-model="age"
        label="Your age *"
        lazy-rules
        :rules="[
          val => val !== null && val !== '' || 'Please type your age',
          val => val > 0 && val < 100 || 'Please type a real age'
        ]"
      /> -->

      <!-- <q-toggle v-model="accept" label="I accept the license and terms" /> -->

      <div>
        <q-btn :label="`${submitting ? 'Wait..' : 'Submit'}`" type="submit" color="secondary"/>
        <q-btn label="Reset" type="reset" color="danger" flat class="q-ml-sm" />
      </div>
    </q-form>

  </div>
</template>

<script setup lang="ts">
//import { useQuasar } from 'quasar'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import { storeUsername, storeUserRole } from 'src/helpers/auth'

//const $q = useQuasar()
const router = useRouter();

const submitting = ref(false)

const email = ref(null)
//const name = ref(null)
const password = ref(null)
//const role = ref(null)
//const accept = ref(false)
async function onSubmit () {
  try {
    submitting.value = true;

    const theUser = {
      email: email.value,
      password: password.value
    };

    const response = await axios.post('http://localhost:3000/api/auth/login', theUser, {
      withCredentials: true // ✅ Send cookies
    });

    // ✅ Updated to match new backend response
    const { user, message } = response.data;

    storeUserRole(user.role);
    storeUsername(user.username);

    console.log(message);
    onReset();

    router.push("/").then(() => console.log("navigating to /...")).catch(e => console.log("push err ", e));
  } catch (error) {
    console.error("axios err", error);
    alert(`Something went wrong. Please, try again.`);
  } finally {
    submitting.value = false;
  }
}


function onReset () {
    email.value = null
 // name.value = null
  password.value = null
  submitting.value = false;
 // role.value = null
 // accept.value = false
}

</script>

<style lang="css" scoped></style>