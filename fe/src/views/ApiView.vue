<script setup>
import { ref, onMounted } from "vue";
import api from "@/apis/api.js";

const message = ref("");

onMounted(async () => {
  const res = await api.get("/get");
  message.value = res.data;
});

const sendData = async () => {
  const res = await api.get("/seatList", {
  });
  console.log(res.data);
};
</script>

<template>
  <div>
    <h2>{{ message }}</h2>
    <button @click="sendData">데이터 보내기</button>
  </div>
</template>