<template>
  <q-page padding>
              <div class="search-row">
          <q-input color="deep-orange" class="search-span" v-model="item" label="Search">
        <template v-slot:prepend>
          <q-icon name="search" />
        </template>
      </q-input>
       <q-btn square color="deep-orange" icon="add" id="new-item"/>
      </div>
      <br>
      <div id="table-div">
    <q-table
     title="Available garments"
      :rows="cleaningCost"
      :columns="columns"
      row-key="id"
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
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { cleaningCost } from 'src/dummy-data';

const item = ref() // For search box
type RowType = [number, string, string]
type AlignType = "left" | "center" | "right";
    const  columns = [
        { name: 'garment', label: 'Garment', field: 'garment', align: 'left' as AlignType },
        { name: 'cost', label: 'Cost', field: 'cost', align: 'right' as AlignType }
      ];
    // const  rows = [
    //     { id: 1, garment: 'T-Shirt', cost: '15' },
    //     { id: 2, garment: 'Jeans', cost: '40' },
    //     { id: 3, garment: 'Jacket', cost: '60' }
    //   ]

    function onSave(row: RowType[]) {
      console.log('Saved row:', row);
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
</style>
