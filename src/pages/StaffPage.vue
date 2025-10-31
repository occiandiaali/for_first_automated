<template>
    <q-page padding>
        <q-btn square color="deep-orange" icon="add" id="new-staff" @click="addToRow"/>
      
      <br/>
      <div id="table-div">
        <div v-if="loading" class="q-pa-md v-if-div">
          <h5><strong>Loading</strong>...</h5>
          <q-icon name="people" size="xl"/>
        </div>
        <div v-else-if="error" class="q-pa-md" style="color: red;">{{ error }}</div>
       <q-table
       v-else
       title="Staff access"
      :rows="staff"
      :columns="columns"
      
      row-key="id"
      flat
      bordered
    >
      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <q-btn
          size="sm"
            icon="edit"
            color="primary"
            dense
            flat
            @click="editRow(props.row, props.row._id)"
          />
          <q-btn
          size="sm"
            icon="delete"
            color="negative"
            dense
            flat
            @click="deleteRow(props.row, props.row._id)"
          />
        </q-td>
      </template>
    </q-table>
    </div>
    <div class="q-pa-md q-gutter-sm">
          <q-dialog v-model="prompt" persistent>
      <q-card style="min-width: 250px">
        <q-card-section>
          <div class="text-h6">{{ addAction ? 'Add' : 'Edit' }} user</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input dense v-model="name" hint="username" :placeholder="!addAction ? userInFocus : ''"  autofocus @keyup.enter="prompt = false" />
        </q-card-section>
                <q-card-section class="q-pt-none">
          <q-input dense v-model="email" hint="user email" :placeholder="!addAction ? emailInFocus : ''" @keyup.enter="prompt = false" />
        </q-card-section>
        <br/>
                <q-card-section class="q-pt-none">
          <q-item-label caption>user role</q-item-label>
          <q-radio v-model="role" val="admin" label="Admin" />
      <q-radio v-model="role" val="user" label="User" />
      <q-item-label v-if="addAction" caption>Default password: {{ role }}</q-item-label>
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancel" v-close-popup />
          <q-btn flat :label="addAction ? 'Add user' : 'Save'" v-close-popup @click="addAction ? addNewUser(name, email, role) : updateUser(name, email, role)" />
        </q-card-actions>
      </q-card>
    </q-dialog>
    </div>
    </q-page>
</template>

<script setup lang="ts">
import {  ref } from 'vue';
import axios from 'axios';
import { useUsers } from 'src/composables/useUsers';

const {users, loading, error} = useUsers(); // Staff data

// To please TS for the table
type RowType = [number, string, string, string]
type AlignType = "left" | "center" | "right";

 const staff = ref(users); // The rows data 

const columns = [
        { name: 'email', label: 'Email', field: 'email', align: 'left' as AlignType },
        { name: 'username', label: 'Name', field: 'username', align: 'left' as AlignType},
        { name: 'role', label: 'Role', field: 'role', align: 'left' as AlignType},
        { name: 'actions', label: '', field: 'actions', align: 'center' as AlignType}
      ]

const name = ref()
const email = ref()
const prompt = ref(false)
const role = ref()

const addAction = ref(true)
const docID = ref()
const  userInFocus = ref<string|undefined>(undefined)
const  emailInFocus = ref<string|undefined>(undefined)
const roleInFocus = ref<string|undefined>(undefined)

function addNewUser(uname:string,umail:string,urole:string ) {
  const defaultPassword = urole;
  try {
    const userData = {
      username:uname,
      email:umail,
      password:defaultPassword,
      role:urole,
    }
    //https://server-for-first-automated.onrender.com
    //axios.post('http://localhost:3000/api/auth/register', userData, {withCredentials:true})
    axios.post(`${process.env.VUE_APP_API_BASE_URL}/api/auth/register`, userData, {withCredentials:true})
    .then(response => {
      console.log('User saved: ', response.data);
      name.value = null;
      email.value = null;
      role.value = null;
      location.reload();
    })
    .catch(error => console.error('Error: ', error))
  } catch (error) {
    console.error('Err saving user: ', error)
  }
}

async function updateUser(uname:string,umail:string,urole:string ) {
  const updateUser = {
      username:uname,
      email:umail,
      role:urole,
  };
  try {
    //const response = await axios.put(`http://localhost:3000/api/admin/staff/${docID.value}`, updateUser, {withCredentials:true})
    const response = await axios.put(`${process.env.VUE_APP_API_BASE_URL}/api/admin/staff/${docID.value}`, updateUser, {withCredentials:true})
   
      console.log('User updated: ', response.data);
      name.value = null;
      email.value = null;
      role.value = null;
      location.reload();
 
  } catch (error) {
    console.error('Err updating user: ', error)
  }
}

function addToRow() {
    prompt.value = true;
  addAction.value = true;
  name.value = null;
  email.value = null;
  role.value = null;
}

function editRow(row: RowType, id:string) {
  prompt.value = true;
  addAction.value = false;
  docID.value = id;

  for (const [key, value] of Object.entries(row)) {
   
    if (addAction.value === false && key === "username") {
      userInFocus.value = value as unknown as string;
      name.value = userInFocus.value
      
    }
    if (addAction.value === false && key === "email") {
      emailInFocus.value = value as unknown as string;
      email.value = emailInFocus.value
      
    }
        if (addAction.value === false && key === "role") {
      roleInFocus.value = value as unknown as string;
      role.value = roleInFocus.value
      
    }

  }
    }

 function deleteRow(row: RowType, id:string) {
    for (const [key,value] of Object.entries(row)) {
        if (key === "username") {
          if (confirm(`Delete access for ${value}?`)) {
            //axios.delete(`http://localhost:3000/api/admin/staff/${id}`)
            axios.delete(`${process.env.VUE_APP_API_BASE_URL}/api/admin/staff/${id}`)
            .then((response) => {
              location.reload();
              console.log(response.data);
            }).catch(e => console.error(e))
          console.log(`${value} deleted!`)
          }
        }
      }
    }
</script>

<style lang="css" scoped>
#new-staff {
    margin: 6px;
}

#table-div {
  margin-top: 5%;
}

.v-if-div {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 25vh;
}

@media only screen and (max-width: 400px) {
  #table-div {
  margin-top: 15%;
}
}

</style>