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
          {{ new Date(leaderboard.startTime).toLocaleDateString() }} -
          {{ new Date(leaderboard.endTime).toLocaleDateString() }}
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
              <a href="#" class="leaderboard-conditions__link">Турнир {{ t.tournamentName }}</a> {{ new Date(t.startTime).toLocaleString() }}
            </li>
          </ul>
        </div>
      </div>
  
      <div class="leaderboard-table">
        <div class="leaderboard-grid">
          <div class="leaderboard-grid__header leaderboard-grid__row">
            <div class="leaderboard-grid__cell leaderboard-grid__cell--number">№</div>
            <div class="leaderboard-grid__cell leaderboard-grid__cell--player">Игрок</div>
            <div class="leaderboard-grid__cell leaderboard-grid__cell--player">Страна</div>
            <div class="leaderboard-grid__cell leaderboard-grid__cell--points">Очки</div>
            <div class="leaderboard-grid__cell leaderboard-grid__cell--details"></div>
          </div>
  
          <template v-for="(player, index) in leaderboard.players || []" :key="player.nickname">
            <div class="leaderboard-grid__row leaderboard-grid__row--player">
              <div class="leaderboard-grid__cell leaderboard-grid__cell--number">{{ index + 1 }}</div>
              <div class="leaderboard-grid__cell leaderboard-grid__cell--player">{{ player.nickname }}</div>
              <div class="leaderboard-grid__cell leaderboard-grid__cell--player">{{ player.country }}</div>
              <div class="leaderboard-grid__cell leaderboard-grid__cell--points">{{ player.totalPoints.toFixed(2) }}</div>
              <div class="leaderboard-grid__cell leaderboard-grid__cell--details">
                <button
                  class="leaderboard-grid__details-btn"
                  @click="player.show = !player.show"
                  :aria-expanded="player.show"
                >
                  Подробнее
                </button>
              </div>
            </div>
  
            <div
              class="leaderboard-grid__row leaderboard-grid__row--tournaments"
              v-show="player.show"
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
                    v-for="(t, idx) in player.tournaments"
                    :key="idx"
                  >
                    <div class="player-tournaments__cell player-tournaments__cell--number">{{ idx + 1 }}</div>
                    <div class="player-tournaments__cell player-tournaments__cell--name">
                      <a href="#" class="player-tournaments__link">{{ t.tournamentName }} {{ new Date(t.startTime).toLocaleString() }}</a>
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
  const props = defineProps({
    leaderboard: Object
  })
  </script>
  