<template>
    <q-page>
            <div class="search-row">
          <q-input color="deep-orange" class="search-span" v-model="staff" label="Search">
        <template v-slot:prepend>
          <q-icon name="search" />
        </template>
      </q-input>
       <q-btn square color="deep-orange" icon="add" id="new-staff" size="xs"/>
      </div>
      <br/>
      <div id="table-div">
       <q-table
       title="Staff access"
      :rows="rows"
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
            @click="deleteRow(props.row.id)"
          />
        </q-td>
      </template>
    </q-table>
    </div>
    </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';

type RowType = [number, string, string, string]
type AlignType = "left" | "center" | "right";

const staff = ref()

const columns = [
        { name: 'email', label: 'Email', field: 'email', align: 'left' as AlignType },
        { name: 'name', label: 'Name', field: 'name', align: 'left' as AlignType},
        { name: 'role', label: 'Role', field: 'role', align: 'left' as AlignType},
        { name: 'actions', label: '', field: 'actions', align: 'center' as AlignType}
      ]
let rows = [
        { id: 1, email: 'admin@example.com', name: 'Admin', role: 'Admin' },
        { id: 2, email: 'bob@example.com', name: 'Bob', role: 'Editor' },
        { id: 3, email: 'carol@example.com', name: 'Carol', role: 'Viewer' }
      ]

function editRow(row: RowType[]) {
      console.log('Edit:', row);
    }
function deleteRow(id:number) {
      rows = rows.filter(row => row.id !== id);
    }
</script>

<style lang="css" scoped>
#new-staff {
    margin-left: 14px;
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
    width: 96%;
}
#table-div {
  margin-top: 5%;
}
</style>