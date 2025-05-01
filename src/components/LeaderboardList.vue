<template>
  <div class="leaderboards-list">
    <h2 class="leaderboards-list__title">Список лидербордов</h2>
    <div class="leaderboards-grid">
      <div class="leaderboards-grid__header leaderboards-grid__row">
        <div class="leaderboards-grid__cell leaderboards-grid__cell--number">№</div>
        <div class="leaderboards-grid__cell leaderboards-grid__cell--name">Название</div>
        <div class="leaderboards-grid__cell leaderboards-grid__cell--period">Срок проведения</div>
        <div class="leaderboards-grid__cell leaderboards-grid__cell--details"></div>
      </div>

      <div
        class="leaderboards-grid__row"
        v-for="(lb, index) in leaderboards"
        :key="lb.leaderboardName"
      >
        <div class="leaderboards-grid__cell leaderboards-grid__cell--number">{{ index + 1 }}</div>
        <div class="leaderboards-grid__cell leaderboards-grid__cell--name">{{ lb.leaderboardName }}</div>
        <div class="leaderboards-grid__cell leaderboards-grid__cell--period">
          {{ new Date(lb.startTime).toLocaleDateString() }} - {{ new Date(lb.endTime).toLocaleDateString() }}
        </div>
        <div class="leaderboards-grid__cell leaderboards-grid__cell--details">
          <button class="leaderboards-grid__details-link" @click="$emit('selectLeaderboard', lb)">
            Подробнее
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  leaderboards: Array
})
</script>
