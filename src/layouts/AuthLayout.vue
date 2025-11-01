<template>
  <div class="q-pa-md" style="max-width: 460px;margin: 10% auto;background-color: orange;">
    <q-item>
      <q-item-section>
        <q-item-label>1st Automated</q-item-label>
        <q-item-label caption>Laundry & Dry-cleaners</q-item-label>
      </q-item-section>
    </q-item>
    <h5>Login</h5>
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
        <q-btn :label="`${submitting ? 'Please wait..' : 'Submit'}`" type="submit" color="teal"/>
        <q-btn label="Reset" type="reset" color="danger" flat class="q-ml-sm" />
        <q-item-label v-if="reachServer" style="color: white;margin-top: 4px;">Trying to reach the server..</q-item-label>
        <q-item-label v-if="netProb" style="color: red;">There may be a problem with the network.</q-item-label>
      </div>
    </q-form>

  </div>
</template>

<script setup lang="ts">
//import { useQuasar } from 'quasar'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import { storeUserId, storeUsername, storeUserRole } from 'src/helpers/auth'

const netProb = ref(false);
const netPro = ref()
const reachServer = ref(false)
const reachTO = ref()

//const $q = useQuasar()
const router = useRouter();

const submitting = ref(false)

const email = ref(null)
//const name = ref(null)
const password = ref(null)
//const role = ref(null)
//const accept = ref(false)

function networkSimul() {
  if (submitting.value) {
    reachTO.value = setTimeout(() => {
    reachServer.value = true;
  }, 3000);
    netPro.value = setTimeout(() => {
    netProb.value = true;
  }, 6000);
  } else {
    clearTimeout(reachTO.value)
    clearTimeout(netPro.value)
  }
}
async function onSubmit () {

  try {
    submitting.value = true;
    networkSimul()

    const theUser = {
      email: email.value,
      password: password.value
    };

    // const response = await axios.post('http://localhost:3000/api/auth/login', theUser, {
    //   withCredentials: true // ✅ Send cookies
    // });
       const response = await axios.post(`https://server-for-first-automated.onrender.com/api/auth/login`, theUser, {
      withCredentials: true // ✅ Send cookies
    });

    // ✅ Updated to match new backend response
    const { user, message } = response.data;

    storeUserRole(user.role);
    storeUsername(user.username);
    storeUserId(user.userId);

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