<script setup>
import { onMounted } from 'vue'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

onMounted(() => {
  const map = L.map('map').setView([51.505, -0.09], 13)

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map)
})
</script>

<template>
  <div>
    <h2>Hyeonjong Leaflet Practice</h2>
    <div id="map"></div>
  </div>
</template>

<style scoped>
#map {
  height: 400px;
  margin-top: 8px;
}
</style>