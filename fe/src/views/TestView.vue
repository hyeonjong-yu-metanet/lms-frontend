<template>
  <div id="map"></div>
</template>

<script setup>
import { onMounted } from 'vue'
import L from 'leaflet'
import axios from 'axios'

/* =========================
   WKT 파서 (아주 중요)
   ========================= */
function parsePolygon(wkt) {
  // POLYGON((x y,x y,...))
  const coordText = wkt
    .replace('POLYGON((', '')
    .replace('))', '')

  return coordText.split(',').map(p => {
    const [x, y] = p.trim().split(' ').map(Number)
    return [y, x] // Leaflet은 [lat(y), lng(x)]
  })
}

function parsePoint(wkt) {
  // POINT(x y)
  const coordText = wkt
    .replace('POINT(', '')
    .replace(')', '')

  const [x, y] = coordText.split(' ').map(Number)
  return [y, x]
}

onMounted(async () => {
  /* =========================
     1️⃣ Map 초기화
     ========================= */
  const map = L.map('map', {
    crs: L.CRS.Simple,
    minZoom: -2,
    maxZoom: 2
  })

  /* =========================
     2️⃣ 전체 맵 영역 (선)
     ========================= */
  const mapArea = [
    [0, 0],
    [300, 0],
    [300, 300],
    [0, 300]
  ]

  const mapBorder = L.polygon(mapArea, {
    color: '#495057',
    weight: 2,
    fillOpacity: 0,
    dashArray: '8,4'
  }).addTo(map)

  map.fitBounds(mapBorder.getBounds())

  /* =========================
     3️⃣ 데이터 조회
     ========================= */
  const [deskRes, oaRes] = await Promise.all([
    axios.get('/api/seats/selectDeskOccupancyList'),
    axios.get('/api/seats/selectOaList')
  ])

  const desks = deskRes.data
  const oas = oaRes.data

  /* =========================
     4️⃣ Desk 그리기
     ========================= */
  desks.forEach(desk => {
    const polygon = parsePolygon(desk.deskGeom)

    L.polygon(polygon, {
      color: desk.occupied === 'Y' ? '#dc3545' : '#198754',
      weight: 2,
      fillOpacity: 0.35
    })
      .addTo(map)
      .bindTooltip(
        `책상명: ${desk.deskName}<br>점유여부: ${desk.occupied}<br>책상센서위치: ${desk.deskSensorLoc}`,
        { sticky: true }
      )

      /* =========================
     📍 Desk Sensor Point
     ========================= */
    if (desk.deskSensorLoc) {
      console.log('HJLGO deskpoint : ', desk.deskSensorLoc);
      const sensorPoint = parsePoint(desk.deskSensorLoc)

      L.circleMarker(sensorPoint, {
        radius: 4,
        color: '#ffc107',
        fillColor: '#ffc107',
        fillOpacity: 1
      })
        .addTo(map)
        .bindTooltip(
          `센서<br>책상명: ${desk.deskName}`,
          { sticky: true }
        )
    }
  })
  

  /* =========================
     5️⃣ OA Point 그리기
     ========================= */
  oas.forEach(oa => {
    console.log('HJLOG oa ', oa);
    console.log('HJLOG oa ', oa.point);
    if (!oa.point) return

    const point = parsePoint(oa.point)

    L.circleMarker(point, {
      radius: 6,
      color: '#0d6efd',
      fillColor: '#0d6efd',
      fillOpacity: 0.9
    })
      .addTo(map)
      .bindTooltip(`OA ID: ${oa.oaId}<br>OA센서:${oa.point}`),
      { sticky: true }
  })
})
</script>

<style>
#map {
  width: 100%;
  height: 650px;
  background: #f8f9fa;
}
</style>
