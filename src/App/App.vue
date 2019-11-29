<style src="./App.scss" module lang="scss"></style>
<script src="./App.js"></script>

<template>
  <div :class="$style.app">
    <Grid v-if="env === 'development'"/>
    <router-view :class="$style.page" />
  </div>
</template>
