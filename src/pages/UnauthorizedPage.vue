<template>
  <div class="fullscreen bg-blue text-white text-center q-pa-md flex flex-center">
    <div>
      <div style="font-size: 5vh">
        You're not allowed to go there!
      </div>

      <div class="text-h2" style="opacity:.4">
        Not for you. Nothing here...
      </div>

      <q-btn
        class="q-mt-xl"
        color="white"
        text-color="blue"
        unelevated
        to="/storefront"
        label="Go Back"
        no-caps
      />
    </div>
  </div>
</template>

<script setup lang="ts">
//
</script>
