<template>
  <q-page padding>
      <q-btn square color="deep-orange" icon="add" id="new-item" @click="addToRow"/>
      <br>
      <div id="table-div" class="q-pa-md">
        <div v-if="loading" class="q-pa-md v-if-div">
          <h5><strong>Loading</strong>...</h5>
          <q-icon name="dry_cleaning" size="xl"/>
        </div>
        <div v-else-if="error" class="q-pa-md" style="color: red;">{{ error }}</div>
    <q-table
    v-else
     title="Price list"
      :rows="fabricItems"
      :columns="columns"
      row-key="id"
      flat
      bordered
    >
    <template v-slot:body-cell="props">
      <q-td :props="props">
         {{ props.row[props.col.name] }}
      </q-td>
    </template>
      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
                  {{ props.row[props.col.name] }}
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
    <!--Add New Item Dialog-->
       <div class="q-pa-md q-gutter-sm">
          <q-dialog v-model="showDialog" persistent>
      <q-card style="min-width: 250px">
        <q-card-section>
          <div class="text-h6">{{ addAction ? 'Add' : 'Edit' }} item</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input dense v-model="itemName" hint="item name" :placeholder="!addAction ? nameInFocus : ''"    />
        </q-card-section>
                <q-card-section class="q-pt-none">
          <q-input type="number" dense v-model="itemPrice" hint="price" :placeholder="!addAction ? priceInFocus : ''"  />
        </q-card-section>
        <br/>
     

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancel" v-close-popup />
          <q-btn flat label="Save" v-close-popup @click="addAction ? addNewItem(itemName, itemPrice) : updateItem(itemName, itemPrice, itemID)" />
        </q-card-actions>
      </q-card>
    </q-dialog>
    </div>
    <!---->
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
//import { fabricsArray } from 'src/dummy-data';
import { useItems } from 'src/composables/useItems';
import axios from 'axios';

const {items, loading, error} = useItems()


type RowType = [string, string, number, number, boolean]

type AlignType = "left" | "center" | "right";

    const fabricItems = ref(items)
        const  columns = [
        { name: 'itemName', label: 'Garment', field: 'name', align: 'left' as AlignType },
        { name: 'itemPrice', label: 'Price', field: 'price', align: 'right' as AlignType },
        { name: 'actions', label: 'Actions', field: 'actions', align: 'center' as AlignType }
      ];

const showDialog = ref(false)
const itemID = ref()
const itemName = ref()
const itemPrice = ref()
const addAction = ref(true)
const  nameInFocus = ref<string|undefined>(undefined)
const  priceInFocus = ref<number|undefined>(undefined)

function addToRow() {
  addAction.value = true;
  showDialog.value = true;
  itemName.value = null;
  itemPrice.value = null;
}
    
    function addNewItem(name:string, price:number) {
      try {
        const newItem = {
          itemName: name,
          qty: 1,
          itemPrice: price,
          checked: false
        }
        axios.post(`https://server-for-first-automated.onrender.com/api/admin/items`, newItem)
        .then(response => {
          console.log('New item saved: ', response.data);
          showDialog.value = false;
          itemName.value = null;
          itemPrice.value = null;
        }).catch(e => console.error(e))
      } catch (error) {
        console.error(error)
      }
    }

  async function updateItem(name:string, price:number, id:string) {
    try {
        await axios.put(`https://server-for-first-automated.onrender.com/api/admin/items/${id}`, 
    {
      itemName: name,
      itemPrice: price
    }, 
    {withCredentials:true});
 
    alert(`Updated: ${name}`)
    location.reload();
    } catch (error) {
      console.error(error)
      alert(`Error while trying to update ${name}..`)
    } 
  }  

  const editRow =  (row: RowType, id:string) => {
       addAction.value = false;
       showDialog.value = true;
       itemID.value = id

         for (const [key, value] of Object.entries(row)) {
   
    if (addAction.value === false && key === "itemName") {
      nameInFocus.value = value as string;
      itemName.value = nameInFocus.value
    }
        if (addAction.value === false && key === "itemPrice") {
      priceInFocus.value = value as number;
      itemPrice.value = priceInFocus.value
    }

  }
    }

    const deleteRow =  (row: RowType, id:string) => {
      for (const [key,value] of Object.entries(row)) {
        if (key === "itemName") {
          if (confirm(`Delete item ${value}, ID:${id}?`)) {
          console.log(`${value} deleted!`)
      }
        }
      }
    }

</script>

<style lang="css" scoped>
#edit-input {
    width: 50px;
}
#new-item {
    margin-left: 14px;
}

 .popup-width {
    width: 0.6rem;
}

.search-row {
    display: flex;
    flex-direction: row;
    padding: 4px;
   
    position: fixed;
    width: 100%;
    z-index: 50;
}
.search-span {
    width: 92%;
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
