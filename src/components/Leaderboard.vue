<template>
<!-- Список лидербордов -->
<div class="leaderboards-grid">
  <div class="leaderboards-grid__header leaderboards-grid__row">
    <div class="leaderboards-grid__cell leaderboards-grid__cell--number">№</div>
    <div class="leaderboards-grid__cell leaderboards-grid__cell--name">Название</div>
    <div class="leaderboards-grid__cell leaderboards-grid__cell--period">Срок проведения</div>
    <div class="leaderboards-grid__cell leaderboards-grid__cell--details"></div>
  </div>

  <div v-for="(lb, index) in leaderboards" :key="lb.leaderboardName" class="leaderboards-grid__row">
    <div class="leaderboards-grid__cell leaderboards-grid__cell--number">{{ index + 1 }}</div>
    <div class="leaderboards-grid__cell leaderboards-grid__cell--name">{{ lb.leaderboardName }}</div>
    <div class="leaderboards-grid__cell leaderboards-grid__cell--period">
      {{ new Date(lb.startTime).toLocaleDateString() }} - {{ new Date(lb.endTime).toLocaleDateString() }}
    </div>
    <div class="leaderboards-grid__cell leaderboards-grid__cell--details">
      <a :href="'#leaderboard-' + lb.leaderboardName.toLowerCase()" class="leaderboards-grid__details-link">Подробнее</a>
    </div>
  </div>
</div>

<!-- Детали лидерборда -->
<div v-for="lb in leaderboards" :key="lb.leaderboardName" class="leaderboard-details" :id="'leaderboard-' + lb.leaderboardName.toLowerCase()">
  <div class="leaderboard-header">
    <h2 class="leaderboard-header__title">Лидерборд "{{ lb.leaderboardName }}"</h2>
    <div class="leaderboard-header__period">
      {{ new Date(lb.startTime).toLocaleDateString() }} - {{ new Date(lb.endTime).toLocaleDateString() }}
    </div>
  </div>

  <div class="leaderboard-conditions">
    <h3 class="leaderboard-conditions__title">Условия проведения:</h3>
    <p class="leaderboard-conditions__text">{{ lb.info }}</p>
    <div class="leaderboard-conditions__tournaments">
      <h4 class="leaderboard-conditions__subtitle">Турниры лидерборда:</h4>
      <ul class="leaderboard-conditions__list">
        <li v-for="t in lb.tournaments" :key="t.tournamentName" class="leaderboard-conditions__item">
          <a href="#" class="leaderboard-conditions__link">Турнир {{ t.tournamentName }}</a>
        </li>
      </ul>
    </div>
  </div>

  <div class="leaderboard-table">
    <div class="leaderboard-grid">
      <div class="leaderboard-grid__header leaderboard-grid__row">
        <div class="leaderboard-grid__cell leaderboard-grid__cell--number">№</div>
        <div class="leaderboard-grid__cell leaderboard-grid__cell--player">Игрок</div>
        <div class="leaderboard-grid__cell leaderboard-grid__cell--points">Очки</div>
        <div class="leaderboard-grid__cell leaderboard-grid__cell--details"></div>
      </div>

      <template v-for="(player, index) in lb.players" :key="player.nickname">
        <div class="leaderboard-grid__row leaderboard-grid__row--player" :data-player-id="index">
          <div class="leaderboard-grid__cell leaderboard-grid__cell--number">{{ index + 1 }}</div>
          <div class="leaderboard-grid__cell leaderboard-grid__cell--player">{{ player.nickname }}</div>
          <div class="leaderboard-grid__cell leaderboard-grid__cell--points">{{ player.totalPoints.toFixed(2) }}</div>
          <div class="leaderboard-grid__cell leaderboard-grid__cell--details">
            <button
              class="leaderboard-grid__details-btn"
              @click="player.showDetails = !player.showDetails"
              :aria-expanded="player.showDetails"
              :aria-controls="'player-' + index + '-tournaments'"
            >Подробнее</button>
          </div>
        </div>

        <div
          class="leaderboard-grid__row leaderboard-grid__row--tournaments"
          v-show="player.showDetails"
          :id="'player-' + index + '-tournaments'"
        >
          <div class="leaderboard-grid__cell leaderboard-grid__cell--full" colspan="4">
            <div class="player-tournaments">
              <div class="player-tournaments__header player-tournaments__row">
                <div class="player-tournaments__cell player-tournaments__cell--number">№</div>
                <div class="player-tournaments__cell player-tournaments__cell--name">Турнир</div>
                <div class="player-tournaments__cell player-tournaments__cell--place">Место</div>
                <div class="player-tournaments__cell player-tournaments__cell--prize">Призовые</div>
                <div class="player-tournaments__cell player-tournaments__cell--points">Очки</div>
              </div>

              <div
                class="player-tournaments__row"
                v-for="(t, tIndex) in player.tournaments"
                :key="t.tournamentName + tIndex"
              >
                <div class="player-tournaments__cell player-tournaments__cell--number">{{ tIndex + 1 }}</div>
                <div class="player-tournaments__cell player-tournaments__cell--name">
                  <a href="#" class="player-tournaments__link">{{ t.tournamentName }}</a>
                </div>
                <div class="player-tournaments__cell player-tournaments__cell--place">{{ t.place }}</div>
                <div class="player-tournaments__cell player-tournaments__cell--prize">{{ t.prize.toFixed(2) }}</div>
                <div class="player-tournaments__cell player-tournaments__cell--points">{{ t.points.toFixed(2) }}</div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</div>

</template>

<script setup>
import { ref, onMounted } from 'vue'

const leaderboards = ref([])
const loading = ref(true)
const basePath = import.meta.env.BASE_URL;

onMounted(async () => {
  const leaderboardIndex = await fetch(`${basePath}data/index_leaderboard.json`).then(res => res.json())

  const leaderboardData = await Promise.all(
    leaderboardIndex.map(async (file) => {
      const leaderboard = await fetch(`${basePath}data/${file}`).then(res => res.json())

      const indexTournamentFile = leaderboard.indexFiles || 'index_tournament.json'
      const tournamentIndex = await fetch(`${basePath}data/${indexTournamentFile}`).then(res => res.json())

      const tournamentFiles = await Promise.all(
        tournamentIndex.map(f => fetch(`${basePath}data/${f}`).then(res => res.json()))
      )

      const leaderboardTournaments = tournamentFiles.filter(t => {
        const time = new Date(t.startTime)
        return time >= new Date(leaderboard.startTime) && time <= new Date(leaderboard.endTime) && t.info.buyIn >= 1
      })

      const playerMap = {}

      leaderboardTournaments.forEach(t => {
        const buyIn = t.info.buyIn
        t.players.forEach(p => {
          const prizeObj = t.prize.find(pr => {
            if (typeof pr.place === 'string' && pr.place.includes('-')) {
              const [start, end] = pr.place.split('-').map(Number)
              return p.rank >= start && p.rank <= end
            }
            return Number(pr.place) === p.rank
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
            place: p.rank,
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
  loading.value = false
})
</script>
