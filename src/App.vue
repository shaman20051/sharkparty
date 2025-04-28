<template>
  <div>
    <TournamentList @select="selectTournament" :tournaments="tournaments" />
    <Tournament />
    <!-- <Leaderboard /> -->
    <!-- <TournamentDetail v-if="selectedTournament" :tournament="selectedTournament" @close="selectedTournament = null" /> -->
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

import Tournament from './components/Tournament.vue'
import TournamentList from './components/TournamentList.vue'
import TournamentDetail from './components/TournamentDetail.vue'
import Leaderboard from './components/Leaderboard.vue'

const tournaments = ref([])
const selectedTournament = ref(null)

const selectTournament = (tournament) => {
  selectedTournament.value = tournament
}

onMounted(async () => {
  const basePath = import.meta.env.BASE_URL;

  const files = [
    `${basePath}data/data_turnament_example.json`
  ];



  const index = await fetch('${basePath}/data/index_tournament.json').then(res => res.json())
  const results = await Promise.all(
    index.map(file => fetch(`${basePath}/data/${file}`).then(res => res.json()))
  )
  tournaments.value = results
})

</script>
