<template>
        <q-page>
            <div class="search-row">
          <q-input color="deep-orange" class="search-span" v-model="item" label="Search">
        <template v-slot:prepend>
          <q-icon name="search" />
        </template>
      </q-input>
       <q-btn square color="deep-orange" icon="add" id="new-order"/>
      </div>
    </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const item = ref()
</script>

<style lang="css" scoped>
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
</style>