<template>
    <q-page>
      <div class="search-row">
          <q-input color="deep-orange" class="search-span" v-model="customer" label="Search">
        <template v-slot:prepend>
          <q-icon name="search" />
        </template>
      </q-input>
      </div>
        <br/>
        <br/>
        <h5>Customers</h5>
         <q-page-sticky position="top-right" :offset="[18, 68]" id="export-btn">
            <q-btn fab icon="folder" color="teal-9" @click="exportData" />
          </q-page-sticky>
        <div id="table-div">
        <q-list >
           <q-item v-for="x in archives" :key="x.content.orderNo" class="qItem">

        <q-item-section top avatar>
           <q-avatar id="avatar" color="teal-5" text-color="white">{{ x.content.customer.substring(0,1) }}</q-avatar>
        </q-item-section>

        <q-item-section id="row-2">
          <q-item-label>{{ x.content.customer }}</q-item-label>
          <q-item-label caption id="comment">{{ x.content.comment }}</q-item-label>
                    <div class="text-orange stars">
            <q-icon name="star" id="star" v-for="i in x.content.garments.length" :key="i"/>
          </div>          
        </q-item-section>


        <q-item-section side top>
          <q-item-label class="side-tops" caption>Month of <strong>{{ x.title }}</strong></q-item-label>

          <q-item-label class="side-tops" caption>&#128222; {{ x.content.phone }}</q-item-label>
          <br/>       
        <q-btn-dropdown
          split
          outline
          color="blue-10"
          label="Items"
          size="xs"
          id="dropdown"
          >
            <q-list >
              <q-item v-for="g in x.content.garments" :key="g.toString()">
                <q-item-section>{{ g }}</q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>
          <br/>    
          <q-badge :label="'₦'+x.content.totalDue" id="badge"></q-badge>
        </q-item-section>
      </q-item>
            </q-list>
        </div>
    </q-page>
</template>

<script setup lang="ts">
import {  ref } from 'vue';
import { useArchives } from 'src/composables/useArchives';

const {items} = useArchives()

const customer = ref() // model for search
  const archives = ref(items)

//   // For pagination
//   const itemsPerPage = 5;
//   const pageNum = 1;


// function getPageData() {
//   const start = (pageNum - 1) * itemsPerPage;
//   return archives.value.slice(start, start + itemsPerPage)
// }
// console.log("Page data ", JSON.stringify(items))

function exportData() {
  if (confirm("Are you ready to export this data?")) {
    alert("Exporting..")
  }
}

// onMounted(() => {
//   const res = getPageData();
//   res.forEach(i => {
//     console.log(`${i.content.customer}`)
//   })
// })
</script>

<style lang="css" scoped>
#export-btn {
  z-index: 50;
}
h5 {
    padding: 1%;
    margin-left: 5%;
}

.qItem {
     background-color: rgb(223, 218, 218);
     margin: 4px;
     padding: 12px;
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
    max-width: 68vw;
   
    margin: 0 auto;
    
  /* margin-top: 6%; */
}

@media only screen and (max-width: 450px) {
  #row-2 {
    font-size: smaller;
    margin-left: -25%;
  }
  #comment {
    font-size: xx-small;
  }
}

@media only screen and (max-width: 390px) {
  #avatar {
    font-size: x-large;
  }
  #badge {
    font-size: x-small;
    margin-right: 6px;
  }
  #dropdown {
    margin-left: 10%;
  }
  .qItem {
    width: 100%;
  }
  .side-tops {
    font-size: x-small;
    margin: 3%;
  }
  /* #star {
    display: none;
  } */
}
</style>