<template>
   <q-page>
    <div class="search-row">
          <q-input color="deep-orange" class="search-span" v-model="text" label="Search">
        <template v-slot:prepend>
          <q-icon name="search" />
        </template>
      </q-input>
       <q-btn square color="deep-orange" icon="add" id="new-order" />
      </div>
      <br>
      <div id="today-div">
          <p class="p-segment"><strong>Today</strong> Fri, Oct 17</p>
          <q-list id="today-list">
                  <q-item class="item-card">
        <q-item-section>
          <q-item-label><strong>8:50 AM</strong></q-item-label>
          <q-item-label>Mr. Iyke</q-item-label>
          <q-item-label caption>Secondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit elit.</q-item-label>
        </q-item-section>

        <q-item-section side top>
          <q-item-label caption>Store</q-item-label>
          <div class="text-orange">
            <q-icon name="star" />
            <q-icon name="star" />
            <q-icon name="star" />
          </div>
        </q-item-section>
      </q-item>
                        <q-item class="item-card">
        <q-item-section>
          <q-item-label><strong>12:30 PM</strong></q-item-label>
          <q-item-label>Delilah</q-item-label>
          <q-item-label caption>Secondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit elit.</q-item-label>
        </q-item-section>

        <q-item-section side top>
          <q-item-label caption>Delivery</q-item-label>
          <div class="text-orange">
            <q-icon name="star" />
            <q-icon name="star" />
            <q-icon name="star" />
          </div>
        </q-item-section>
      </q-item>
        </q-list>
    </div>
      <div>
        <p class="p-segment"><strong>This week</strong> Sat, Oct 18 - Sun, Oct 19</p>
                <q-list id="week-list">
                  <q-item class="item-card">
        <q-item-section>
          <q-item-label><strong>Sat 18</strong></q-item-label>
          <q-item-label caption>4:35 PM</q-item-label>
          <q-item-label>Madam Anna</q-item-label>
          <q-item-label caption>Secondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit elit.</q-item-label>
        </q-item-section>

        <q-item-section side top>
          <q-item-label caption>Store</q-item-label>
          <div class="text-orange">
            <q-icon name="star" />
            <q-icon name="star" />
            <q-icon name="star" />
          </div>
        </q-item-section>
      </q-item>
                        <q-item class="item-card">
        <q-item-section>
          <q-item-label><strong>Sat 18</strong></q-item-label>
          <q-item-label caption>11:45 AM</q-item-label>
          <q-item-label>Oga joe</q-item-label>
          <q-item-label caption>Secondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit elit.</q-item-label>
        </q-item-section>

        <q-item-section side top>
          <q-item-label caption>Delivery</q-item-label>
          <div class="text-orange">
            <q-icon name="star" />
            <q-icon name="star" />
            <q-icon name="star" />
          </div>
        </q-item-section>
      </q-item>
        </q-list>
      </div>
      <div>
        <p class="p-segment"><strong>Upcoming</strong> After this week</p>
                <q-list>
                  <q-item class="item-card">
        <q-item-section>
          <q-item-label><strong>Oct 20</strong></q-item-label>
          <q-item-label caption>2:00 PM</q-item-label>
          <q-item-label>Pastor Chris</q-item-label>
          <q-item-label caption>Secondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit elit.</q-item-label>
        </q-item-section>

        <q-item-section side top>
          <q-item-label caption>Delivery</q-item-label>
          <div class="text-orange">
            <q-icon name="star" />
            <q-icon name="star" />
            <q-icon name="star" />
          </div>
        </q-item-section>
      </q-item>
                        <q-item class="item-card">
        <q-item-section>
          <q-item-label><strong>Oct 24</strong></q-item-label>
          <q-item-label caption>8:00 AM</q-item-label>
          <q-item-label>Mrs. Ofili</q-item-label>
          <q-item-label caption>Secondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit elit.</q-item-label>
        </q-item-section>

        <q-item-section side top>
          <q-item-label caption>Store</q-item-label>
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

const text = ref()
console.log(text)
//const heavyList = ref([])
</script>

<style lang="css" scoped>
.item-card {
    margin: 8px;
    background-color: lightgrey;
}
#new-order {
    margin-left: 16px;
}
.p-segment {
    margin-left: 8px;
    margin-top: 2%;
}
#today-div .p-segment {
    margin-top: 6%;
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


/* #today-list {
    margin-top: 6%;
} */
</style>