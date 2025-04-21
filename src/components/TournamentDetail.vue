<template>
    <div>
      <h2>{{ tournament.tournamentName }}</h2>
      <p>Дата: {{ formatDate(tournament.startTime) }}</p>
      <p>Бай-ин: ${{ tournament.info.buyIn }}</p>
      <p>Призовой фонд: ${{ tournament.info.prizePool }}</p>
      <p>Участников: {{ tournament.info.registered }}</p>
      <p>Повторных входов: {{ tournament.info.reEntered || 0 }}</p>
  
      <h3>👥 Игроки</h3>
      <ol>
        <li v-for="p in tournament.players" :key="p.rank">
          {{ p.rank }}. {{ getFlagEmoji(p.player.country) }} {{ p.player.nickname }}
          <span v-if="getPrizeByRank(p.rank)"> — 💰 ${{ getPrizeByRank(p.rank) }}</span>
        </li>
      </ol>
  
      <button @click="$emit('close')">← Назад</button>
    </div>
  </template>
  
  <script setup>
  import { defineProps } from 'vue'
  
  const props = defineProps({
    tournament: Object
  })
  
  const formatDate = (d) => new Date(d).toLocaleString('ru-RU')
  
  function getFlagEmoji(code) {
    if (!code) return ''
    const cc = code.trim().toUpperCase()
    return cc.replace(/./g, char =>
      String.fromCodePoint(127397 + char.charCodeAt())
    )
  }
  
  function getPrizeByRank(rank) {
    const prizes = props.tournament?.prize || []
    for (const prize of prizes) {
      const place = prize.place
      if (place.includes('-')) {
        const [from, to] = place.split('-').map(Number)
        if (rank >= from && rank <= to) return prize.prize
      } else {
        if (parseInt(place) === rank) return prize.prize
      }
    }
    return null
  }
  </script>
  