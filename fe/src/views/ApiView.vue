<script setup>
import { ref, onMounted } from "vue";
import api from "@/apis/api.js";

const message = ref("");

onMounted(async () => {
  const res = await api.get("/get");
  message.value = res.data;
});
</script>

<template>
  <div>
    <h2>{{ message }}</h2>
  </div>
</template>