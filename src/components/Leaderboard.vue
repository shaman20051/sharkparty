<template>
    <div class="leaderboard-details">
      <div class="leaderboards-grid__cell leaderboards-grid__cell--details">
        <button class="leaderboards-grid__details-link" @click="$emit('back')">
          Список лидербордов
        </button>
      </div>
  
      <div class="leaderboard-header">
        <h2 class="leaderboard-header__title">Лидерборд "{{ leaderboard.leaderboardName }}"</h2>
        <div class="leaderboard-header__period">
          {{ formatDateTime(leaderboard.startTime) }} - {{ formatDateTime(leaderboard.endTime) }}
        </div>
      </div>
  
      <div class="leaderboard-conditions">
        <h3 class="leaderboard-conditions__title">Условия проведения:</h3>
        <p class="leaderboard-conditions__text">{{ leaderboard.info }}</p>
        <div class="leaderboard-conditions__tournaments">
          <h4 class="leaderboard-conditions__subtitle">Турниры лидерборда:</h4>
          <ul class="leaderboard-conditions__list">
            <li
              class="leaderboard-conditions__item"
              v-for="t in leaderboard.tournaments || []"
              :key="t.tournamentName"
            >
              <a href="#" class="leaderboard-conditions__link">Турнир {{ t.tournamentName }}</a>
            </li>
          </ul>
        </div>
      </div>
  
      <div class="leaderboard-table">
        <div class="leaderboard-grid">
          <div class="leaderboard-grid__header leaderboard-grid__row">
            <div class="leaderboard-grid__cell leaderboard-grid__cell--number">№</div>
            <div class="leaderboard-grid__cell leaderboard-grid__cell--player sortable" @click="setSort('nickname')">
              Игрок <span v-if="sortKey === 'nickname'">{{ sortAsc ? '▲' : '▼' }}</span>
            </div>
            <div class="leaderboard-grid__cell leaderboard-grid__cell--country sortable" @click="setSort('country')">
              Страна <span v-if="sortKey === 'country'">{{ sortAsc ? '▲' : '▼' }}</span>
            </div>
            <div class="leaderboard-grid__cell leaderboard-grid__cell--points sortable" @click="setSort('totalPoints')">
              Очки <span v-if="sortKey === 'totalPoints'">{{ sortAsc ? '▲' : '▼' }}</span>
            </div>
            <div class="leaderboard-grid__cell leaderboard-grid__cell--details"></div>
          </div>
  
          <template v-for="player in paginatedPlayers" :key="player.nickname">
            <div class="leaderboard-grid__row leaderboard-grid__row--player">
              <div class="leaderboard-grid__cell leaderboard-grid__cell--number">{{ player.rank }}</div>
              <div class="leaderboard-grid__cell leaderboard-grid__cell--player">{{ player.nickname }}</div>
              <div class="leaderboard-grid__cell leaderboard-grid__cell--country">{{ player.country }}</div>
              <div class="leaderboard-grid__cell leaderboard-grid__cell--points">{{ player.totalPoints.toFixed(2) }}</div>
              <div class="leaderboard-grid__cell leaderboard-grid__cell--details">
                <button class="leaderboard-grid__details-btn" @click="togglePlayer(player)">
                  Подробнее
                </button>
              </div>
            </div>
  
            <div v-show="player.show" class="leaderboard-grid__row leaderboard-grid__row--tournaments">
              <div class="leaderboard-grid__cell leaderboard-grid__cell--full" colspan="5">
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
                    v-for="(t, i) in player.tournaments"
                    :key="i"
                  >
                    <div class="player-tournaments__cell player-tournaments__cell--number">{{ i + 1 }}</div>
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
  
        <div class="pagination">
          <a href="#" class="pagination__link" @click.prevent="goToPrevPage">«</a>
          <template v-for="page in visiblePages" :key="page">
            <span v-if="page === '...'" class="pagination__link">...</span>
            <a
              v-else
              href="#"
              class="pagination__link"
              :class="{ 'pagination__link--active': currentPage === page }"
              @click.prevent="goToPage(page)"
            >{{ page }}</a>
          </template>
          <a href="#" class="pagination__link" @click.prevent="goToNextPage">»</a>
        </div>
  
        <div class="pagination-controls">
          <label>
            Показывать:
            <select v-model.number="itemsPerPage">
              <option :value="10">10</option>
              <option :value="25">25</option>
              <option :value="50">50</option>
            </select>
          </label>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, watch, reactive } from 'vue'
  
  const props = defineProps({ leaderboard: Object })
  
  const currentPage = ref(1)
  const itemsPerPage = ref(10)
  const sortKey = ref('totalPoints')
  const sortAsc = ref(false)
  
  function formatDateTime(value) {
    return new Date(value).toLocaleString('ru-RU', {
      day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit'
    })
  }
  
  // сохраняем все игроки реактивно с show
  const allPlayers = ref([])
  
  watch(
    () => props.leaderboard.players,
    (players) => {
      const sorted = [...(players || [])]
        .sort((a, b) => b.totalPoints - a.totalPoints)
        .map((p, i) => reactive({ ...p, rank: i + 1, show: false }))
  
      allPlayers.value = sorted
    },
    { immediate: true }
  )
  
  const sortedPlayers = computed(() => {
    const list = [...allPlayers.value]
    return list.sort((a, b) => {
      const aVal = typeof a[sortKey.value] === 'string' ? a[sortKey.value].toLowerCase() : a[sortKey.value]
      const bVal = typeof b[sortKey.value] === 'string' ? b[sortKey.value].toLowerCase() : b[sortKey.value]
      if (aVal < bVal) return sortAsc.value ? -1 : 1
      if (aVal > bVal) return sortAsc.value ? 1 : -1
      return 0
    })
  })
  
  const paginatedPlayers = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage.value
    return sortedPlayers.value.slice(start, start + itemsPerPage.value)
  })
  
  const totalPages = computed(() => Math.ceil(sortedPlayers.value.length / itemsPerPage.value))
  
  const visiblePages = computed(() => {
    const pages = []
    const delta = 2
    for (let i = 1; i <= totalPages.value; i++) {
      if (i === 1 || i === totalPages.value || (i >= currentPage.value - delta && i <= currentPage.value + delta)) {
        pages.push(i)
      } else if (pages[pages.length - 1] !== '...') {
        pages.push('...')
      }
    }
    return pages
  })
  
  watch(itemsPerPage, () => currentPage.value = 1)
  
  function goToPage(page) {
    if (typeof page === 'number') currentPage.value = page
  }
  function goToPrevPage() {
    if (currentPage.value > 1) currentPage.value--
  }
  function goToNextPage() {
    if (currentPage.value < totalPages.value) currentPage.value++
  }
  function setSort(key) {
    if (sortKey.value === key) {
      sortAsc.value = !sortAsc.value
    } else {
      sortKey.value = key
      sortAsc.value = true
    }
    currentPage.value = 1
  }
  function togglePlayer(player) {
    player.show = !player.show
  }
  </script>
  