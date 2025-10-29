<template>
  <q-layout view="hHh lpR fFf">

    <q-header class="bg-deep-orange text-white">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
          </q-avatar>
          First Automated
          <span style="color: blue;">{{ onlineStatus }}</span>
        </q-toolbar-title>

        <q-btn dense flat round icon="menu" @click="toggleRightDrawer" />
      </q-toolbar>
    </q-header>

    <q-drawer show-if-above v-model="rightDrawerOpen" side="right" bordered
    :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-3'"
    >
      <!-- drawer content -->
               <!-- <q-scroll-area style="height: calc(100% - 150px); margin-top: 150px; border-right: 1px solid #ddd"> -->
          <q-list style="margin-top: 50%;">

            <template v-for="(menuItem, index) in filteredMenuList" :key="index">
           
              <q-item :to="menuItem.route" style="color: black;opacity: 5;" exact clickable :class="{'active-item': activeIndex === index}" @click="setActiveItem(index)">
                <q-item-section avatar>
                  <q-icon :name="menuItem.icon" />
                </q-item-section>
                <q-item-section>
                  <q-item-label >{{ menuItem.label }}</q-item-label>
                </q-item-section>
              </q-item>
             
              <q-separator :key="'sep' + index"  v-if="menuItem.separator" />
            </template>

          </q-list>
        <!-- </q-scroll-area> -->
                <q-img class="absolute-top" src="https://cdn.quasar.dev/img/material.png" style="height: 150px">
          <div class="absolute-bottom bg-transparent">
            <q-avatar size="56px" class="q-mb-sm cursor-pointer">
              <!-- <img src="https://cdn.quasar.dev/img/boy-avatar.png"> -->
              <img :src="userAvatar ? userAvatar : 'https://ionicframework.com/docs/img/demos/avatar.svg'" @click="openProfile">
            </q-avatar>
            <div class="text-weight-bold">{{ uname }}</div>
            <div>@{{ role }}</div>
          </div>
        </q-img>
        <UserProfileComponent :show="showProfile"/>
    </q-drawer>

    <q-page-container class="qpContainer">
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script setup lang="ts">
import {computed, onMounted, onUnmounted, ref } from 'vue'
import { getUserRole, getUserName } from 'src/helpers/auth'

import UserProfileComponent from 'src/components/UserProfileComponent.vue';


const role = ref(getUserRole() || "user");
const uname = ref(getUserName())

const userAvatar = ref()

const showProfile = ref(false)
const openProfile = () => {
  showProfile.value = !showProfile.value;
 // console.log("Profile: ", showProfile.value)
}

const activeIndex = ref<number|null>(null)

const menuList = [
  // {
  //   icon: 'inbox',
  //   label: 'Inbox',
  //   route: '/',
  //   separator: true
  // },
    {
    icon: 'storefront',
    label: 'Storefront',
    route: '/storefront',
    roles: ['admin', 'sales', 'user'],
    separator: true,
    isActive: false
  },

  {
    icon: 'analytics',
    label: 'Dashboard',
    route: '/dashboard',
     roles: ['admin'],
    separator: false,
    isActive: false
  },
  {
    icon: 'people',
    label: 'Staff',
    route: '/staff',
     roles: ['admin'],
    separator: false,
    isActive: false
  },
    {
    icon: 'dry_cleaning',
    label: 'Items',
    route: '/items',
     roles: ['admin'],
    separator: false,
    isActive: false
  },
  {
    icon: 'support_agent',
    label: 'Customers',
    route: '/customers',
     roles: ['admin', 'sales'],
    separator: true,
    isActive: false
  },

  {
    icon: 'help',
    iconColor: 'primary',
    label: 'Help',
     roles: ['admin', 'user'],
    separator: false
  },
  {
    icon: 'logout',
    label: 'LogOut',
     roles: ['admin', 'sales', 'user'],
     route: '/logout',
    separator: false
  },
]

const filteredMenuList = computed(() => {
  return menuList.filter(item => item.roles?.includes(role.value))
})

//const toggleActiveItem = (item:boolean|undefined) => item = !item 
const setActiveItem = (index: number|null) => {
  activeIndex.value = index;
}

const rightDrawerOpen = ref(false)
const toggleRightDrawer = () => {
  rightDrawerOpen.value = !rightDrawerOpen.value
}

// // Retrieving the avatar
// function loadAvatar() {
//     const avatar = localStorage.getItem('avatar');
//     if (avatar) {
//         document.getElementById('avatarImage').src = avatar;
//     }
// }
    const isOnline = ref(navigator.onLine);
    const onlineStatus = computed(() => (isOnline.value ? '' : 'offline..'))

    const updateOnlineStatus = () => {
      isOnline.value = navigator.onLine;
      // if (isOnline.value === false) {
      //   alert("You may be offline. Check your connection..")
      // }
    };
    onMounted(() => {
      window.addEventListener('online', updateOnlineStatus);
      window.addEventListener('offline', updateOnlineStatus);
    });

    onUnmounted(() => {
      window.removeEventListener('online', updateOnlineStatus);
      window.removeEventListener('offline', updateOnlineStatus);
    });


</script>

<style lang="css">
.active-item {
  background-color: rgb(170, 163, 163);
}

.qpContainer {
width: 100%;
height: 100%;
/* background-color: red; */
}
/* For WebKit browsers */
::-webkit-scrollbar {
    width: 10px; /* Width of the scrollbar */
}

::-webkit-scrollbar-thumb {
    background-color: rgb(153, 65, 11); /* Color of the scrollbar thumb */
    border-radius: 10px; /* Rounded corners */
}

::-webkit-scrollbar-track {
    background: rgb(247, 188, 80); /* Color of the track */
}

/* For Firefox */
* {
    scrollbar-width: thin; /* Thin scrollbar */
    scrollbar-color: rgb(177, 71, 9) rgb(240, 184, 81); /* Thumb color and track color */
}

</style>
