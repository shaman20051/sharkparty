<template>
  <section class="leaderboards-section">
    <LeaderboardList
      v-if="!selectedLeaderboard"
      :leaderboards="leaderboards"
      @selectLeaderboard="showLeaderboard"
    />

    <Leaderboard
      v-else
      :leaderboard="selectedLeaderboard"
      @back="selectedLeaderboard = null"
    />
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import LeaderboardList from '@/components/LeaderboardList.vue'
import Leaderboard from '@/components/Leaderboard.vue'

const leaderboards = ref([])
const selectedLeaderboard = ref(null)
const basePath = import.meta.env.BASE_URL

const fetchJson = async (url) => {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Failed to load ${url}`)
  return res.json()
}

onMounted(async () => {
  const index = await fetchJson(`${basePath}data/index_leaderboard.json`)

  const leaderboardData = await Promise.all(
    index.map(async (file) => {
      const leaderboard = await fetchJson(`${basePath}data/${file}`)
      const indexTournamentFile = leaderboard.indexFiles || 'index_tournament.json'
      const tournamentIndex = await fetchJson(`${basePath}data/${indexTournamentFile}`)

      const tournamentFiles = await Promise.all(
        tournamentIndex.map(f => fetchJson(`${basePath}data/${f}`))
      )

      const leaderboardTournaments = tournamentFiles.filter(t => {
        const time = new Date(t.startTime)
        return time >= new Date(leaderboard.startTime) && time <= new Date(leaderboard.endTime) && t.info.buyIn >= 1
      })
      
      const playerMap = {}

      leaderboardTournaments.forEach(t => {
        const buyIn = t.info.buyIn
        t.players.forEach(p => {
          const rank = p.rank

          const prizeObj = t.prize.find(pr => {
            if (typeof pr.place === 'string' && pr.place.includes('-')) {
              const [start, end] = pr.place.split('-').map(Number)
              return rank >= start && rank <= end
            }
            return Number(pr.place) === rank
          })

          const prize = prizeObj?.prize ?? 0
          const points = +(prize / buyIn).toFixed(2)
          const nickname = p.player.nickname

          if (!playerMap[nickname]) {
            playerMap[nickname] = {
              nickname,
              country: p.player.country,
              totalPoints: 0,
              tournaments: []
            }
          }

          playerMap[nickname].totalPoints += points
          playerMap[nickname].tournaments.push({
            tournamentName: t.tournamentName,
            startTime: t.startTime,
            place: rank,
            prize,
            points
          })
        })
      })

      const players = Object.values(playerMap).sort((a, b) => b.totalPoints - a.totalPoints)

      return {
        ...leaderboard,
        tournaments: leaderboardTournaments,
        players
      }
    })
  )

  leaderboards.value = leaderboardData
})

function showLeaderboard(lb) {
  selectedLeaderboard.value = lb
}
</script>
