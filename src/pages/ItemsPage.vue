<template>
  <q-page padding>
              <!-- <div class="search-row">
          <q-input color="deep-orange" class="search-span" v-model="item" label="Search">
        <template v-slot:prepend>
          <q-icon name="search" />
        </template>
      </q-input>
       <q-btn square color="deep-orange" icon="add" id="new-item" @click="showDialog = true"/>
      </div> -->
      <q-btn square color="deep-orange" icon="add" id="new-item" @click="showDialog = true"/>
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
      row-key="_id"
      flat
      bordered
    
    >
    
      <template v-slot:body-cell="props">
        <q-td :props="props" >
      
            {{ props.row[props.col.name] }}
              
            <q-popup-edit
              v-model="props.row[props.col.name]"
              title="Edit"
              buttons
              @save="onSave(props.row)"
              
            >
              <q-input
                v-model="props.row[props.col.name]"
                dense
                autofocus
                
              />
            </q-popup-edit>
         
        </q-td>
      </template>
    </q-table>
    </div>
    <!--Add New Item Dialog-->
       <div class="q-pa-md q-gutter-sm">
          <q-dialog v-model="showDialog" persistent>
      <q-card style="min-width: 250px">
        <q-card-section>
          <div class="text-h6">Add item</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input dense v-model="itemName" hint="item name" placeholder="E.g. Shirt, Native, Curtain.."   />
        </q-card-section>
                <q-card-section class="q-pt-none">
          <q-input type="number" dense v-model="itemPrice" hint="price" placeholder="E.g. 600" />
        </q-card-section>
        <br/>
     

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancel" v-close-popup />
          <q-btn flat label="Save" v-close-popup @click="addNewItem(itemName, itemPrice)" />
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

//const item = ref() // For search box
type RowType = [number, string, string]
type AlignType = "left" | "center" | "right";
    // const  columns = [
    //     { name: 'garment', label: 'Garment', field: 'garment', align: 'left' as AlignType },
    //     { name: 'cost', label: 'Cost', field: 'cost', align: 'right' as AlignType }
    //   ];
    const fabricItems = ref(items)
        const  columns = [
        { name: 'itemName', label: 'Garment', field: 'name', align: 'left' as AlignType },
        { name: 'itemPrice', label: 'Price', field: 'price', align: 'right' as AlignType }
      ];
    // const  rows = [
    //     { id: 1, garment: 'T-Shirt', cost: '15' },
    //     { id: 2, garment: 'Jeans', cost: '40' },
    //     { id: 3, garment: 'Jacket', cost: '60' }
    //   ]

    function onSave(row: RowType[]) {
      console.log('Saved row:', row);
    }

    const showDialog = ref(false)
    const itemName = ref()
const itemPrice = ref()
    
    function addNewItem(name:string, price:number) {
      try {
        const newItem = {
          itemName: name,
          qty: 1,
          itemPrice: price,
          checked: false
        }
        axios.post('http://localhost:3000/api/admin/items', newItem)
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
