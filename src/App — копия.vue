<template>
  <main class="app-container">
    <TournamentList @select="selectTournament" :tournaments="tournaments" />
    <TournamentDetail
      v-if="selectedTournament"
      :tournament="selectedTournament"
      @close="selectedTournament = null"
    />
  </main>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import TournamentList from './components/TournamentList.vue'
import TournamentDetail from './components/TournamentDetail.vue'

const tournaments = ref([])
const selectedTournament = ref(null)

const selectTournament = (tournament) => {
  selectedTournament.value = tournament
}

onMounted(async () => {
  const index = await fetch('/data/index.json').then(res => res.json())
  const results = await Promise.all(
    index.map(file => fetch(`/data/${file}`).then(res => res.json()))
  )
  tournaments.value = results
})

</script>

<style scoped>
.app-container {
  padding: 2rem;
  max-width: 960px;
  margin: 0 auto;
}
</style>
