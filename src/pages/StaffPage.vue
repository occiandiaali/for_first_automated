<template>
    <q-page padding>
            <!-- <div class="search-row">
          <q-input color="deep-orange" class="search-span" v-model="selectStaff" label="Search">
        <template v-slot:prepend>
          <q-icon name="search" />
        </template>
      </q-input>
       <q-btn square color="deep-orange" icon="add" id="new-staff" size="xs" @click="addToRow"/>
      </div> -->
      
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
            @click="editRow(props.row)"
          />
          <q-btn
          size="sm"
            icon="delete"
            color="negative"
            dense
            flat
            @click="deleteRow(props.row._id)"
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
      <q-item-label v-if="role" caption>Default password: {{ role }}</q-item-label>
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancel" v-close-popup />
          <q-btn flat label="Add user" v-close-popup @click="addNewUser(name, email, role)" />
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

const {users, loading, error} = useUsers()

type RowType = [number, string, string, string]
type AlignType = "left" | "center" | "right";

//const selectStaff = ref()
const name = ref()
const email = ref()
const prompt = ref(false)
const role = ref()

const addAction = ref(true)
const  userInFocus = ref<string|undefined>(undefined)
const  emailInFocus = ref<string|undefined>(undefined)

function addNewUser(uname:string,umail:string,urole:string ) {
  const defaultPassword = urole;
  //alert(`New User: ${uname}, ${umail}, ${urole} - password:${defaultPassword}`)

  try {
    const userData = {
      username:uname,
      email:umail,
      password:defaultPassword,
      role:urole,
  
    }
    axios.post('http://localhost:3000/api/auth/register', userData)
    .then(response => {
      console.log('User saved: ', response.data);
            name.value = null;
  email.value = null;
  role.value = null;
    })
    .catch(error => console.error('Error: ', error))
    // const response = await fetch('http://localhost:6666/api/auth/register', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(userData)
    // });
    // const data = await response.json();
    

  } catch (error) {
    console.error('Err saving user: ', error)
  }
}

// const columns = [
//         { name: 'email', label: 'Email', field: 'email', align: 'left' as AlignType },
//         { name: 'name', label: 'Name', field: 'name', align: 'left' as AlignType},
//         { name: 'role', label: 'Role', field: 'role', align: 'left' as AlignType},
//         { name: 'actions', label: '', field: 'actions', align: 'center' as AlignType}
//       ]

 const staff = ref(users);      
// let rows = [
//         { id: 1, email: 'admin@example.com', name: 'Admin', role: 'Admin' },
//         { id: 2, email: 'bob@example.com', name: 'Bob', role: 'Editor' },
//         { id: 3, email: 'carol@example.com', name: 'Carol', role: 'Viewer' }
//       ]
const columns = [
        { name: 'email', label: 'Email', field: 'email', align: 'left' as AlignType },
        { name: 'username', label: 'Name', field: 'username', align: 'left' as AlignType},
        { name: 'role', label: 'Role', field: 'role', align: 'left' as AlignType},
        { name: 'actions', label: '', field: 'actions', align: 'center' as AlignType}
      ]

//const staff = ref([]);      


function addToRow() {
    prompt.value = true;
  addAction.value = true;
}

function editRow(row: RowType[]) {
  prompt.value = true;
  addAction.value = false;

  //console.log('Edit:', row);
  for (const [key, value] of Object.entries(row)) {
   
    if (key === "username") {
      userInFocus.value = value as unknown as string;
      
      
    }
        if (key === "email") {
      emailInFocus.value = value as unknown as string;
      
      
    }

  }
    }
// function deleteRow(id:number) {
//       rows = rows.filter(row => row.id !== id);
//     }
function deleteRow(id:string) {
      staff.value = staff.value.filter(row => row._id !== id);
    }

 

// onMounted(() => {
//   console.log("fetchStaff ", users)
//   console.error("ifError ", error)

// })
</script>

<style lang="css" scoped>
#new-staff {
    margin: 6px;
}
/*
.search-row {
    display: flex;
    flex-direction: row;
    padding: 4px;
   
    position: fixed;
    width: 100%;
    z-index: 50;
}
.search-span {
    width: 96%;
}
    */
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