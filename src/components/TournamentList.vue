<template>
  <div>
    <h2>Список турниров</h2>
    <ul>
      <li v-for="t in tournaments" :key="t.startTime">
        <strong>{{ formatDate(t.startTime) }}</strong> — {{ t.tournamentName }} —
        ${{ t.info.buyIn }} бай-ин — ${{ t.info.prizePool }} приз
        <button @click="$emit('select', t)">Подробнее</button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'
const props = defineProps({
  tournaments: Array
})
const formatDate = (dateStr) => new Date(dateStr).toLocaleString('ru-RU')
</script>
