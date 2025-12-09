<template>
  <nav>
    <router-link to="/">Home</router-link>
    <span> | </span>
  </nav>

  <router-view />
</template>

<style scoped>
nav {
  margin-bottom: 16px;
}
</style>
