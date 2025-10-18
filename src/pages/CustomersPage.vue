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
        <h5>Customers</h5>
        <div id="table-div">
            <q-list id="list">
                      <q-item class="qItem">
        <q-item-section>
          <q-item-label>Single line item</q-item-label>
          <q-item-label caption>Secondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit elit.</q-item-label>
        </q-item-section>

        <q-item-section side top>
          <q-item-label caption>Last visit rating</q-item-label>
                  <div class="text-orange">
            <q-icon name="star" />
            <q-icon name="star" />
            <q-icon name="star" />
          </div>
        </q-item-section>
      </q-item>
            </q-list>
        </div>
    </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const customer = ref()
</script>

<style lang="css" scoped>
h5 {
    padding: 1%;
}

.qItem {
     background-color: gray;
     margin: 4px;
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
    max-width: 64vw;
   
    margin: 3% auto;
    
  /* margin-top: 6%; */
}
</style>