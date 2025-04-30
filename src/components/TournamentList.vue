<template>
  <div>
    <h2>Список турниров ЛИДЕРБОРДА</h2>

    <section class="tournaments-section">
    <div class="tournaments-filters">
        <form class="tournaments-filters__form">
            <span class="tournaments-filters__label">Фильтровать по:</span>
            <select class="tournaments-filters__select" name="status" aria-label="Статус турнира">
                <option value="all" selected>Все турниры</option>
                <option value="finished">Законченные</option>
                <option value="upcoming">Запланированные</option>
            </select>
            <select class="tournaments-filters__select" name="sort" aria-label="Сортировка">
                <option value="newest" selected>Сначала новые</option>
                <option value="oldest">Сначала старые</option>
                <option value="popular">По популярности</option>
                <option value="leaderboards">По лидербордам</option>
            </select>
            <button type="submit" class="tournaments-filters__button" aria-label="Применить фильтры">
                <span class="tournaments-filters__button-text">Применить</span>
                <svg class="tournaments-filters__button-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="20" height="20" aria-hidden="true">
                    <path d="M4.25 5.61C6.27 8.2 10 13 10 13v6c0 .55.45 1 1 1h2c.55 0 1-.45 1-1v-6s3.72-4.8 5.74-7.39c.51-.66.04-1.61-.79-1.61H5.04c-.83 0-1.3.95-.79 1.61z"/>
                </svg>
            </button>
        </form>
    </div>

    <div class="tournaments-list">
        <h2 class="tournaments-list__title">Турниры лидерборда</h2>
        
        <div class="tournaments-grid">
            <!-- Шапка таблицы -->
            <div class="tournaments-grid__header tournaments-grid__row">
                <div class="tournaments-grid__cell tournaments-grid__cell--date">Дата</div>
                <div class="tournaments-grid__cell tournaments-grid__cell--name">Турнир</div>
                <div class="tournaments-grid__cell tournaments-grid__cell--prize">Гарантия ($)</div>
                <div class="tournaments-grid__cell tournaments-grid__cell--buyin">Бай-ин ($)</div>
                <div class="tournaments-grid__cell tournaments-grid__cell--prize-structure">Призовые ($/вход/реентри)</div>
                <div class="tournaments-grid__cell tournaments-grid__cell--leaderboard">Лидерборд</div>
                <div class="tournaments-grid__cell tournaments-grid__cell--details"></div>
            </div>
            
            <!-- Строки с турнирами -->
            <div class="tournaments-grid__row" 
            v-for="t in tournaments" :key="t.startTime"
            >
                <div class="tournaments-grid__cell tournaments-grid__cell--date">{{ formatDate(t.startTime) }}</div>
                <div class="tournaments-grid__cell tournaments-grid__cell--name">{{ t.tournamentName }}</div>
                <div class="tournaments-grid__cell tournaments-grid__cell--prize">${{ t.info.prizePool }}</div>
                <div class="tournaments-grid__cell tournaments-grid__cell--buyin">${{ t.info.buyIn }}</div>
                <div class="tournaments-grid__cell tournaments-grid__cell--prize-structure">
                    <span class="tournaments-grid__prize-value tournaments-grid__prize-value--green">
                      ${{ t.info.buyIn * t.info.registered + t.info.reEntry * t.info.reEntered }}
                      <br />
                      {{ t.info.registered }}/{{ t.info.reEntered }} 
                    </span>
                </div>
                <div class="tournaments-grid__cell tournaments-grid__cell--leaderboard">
                    <a href="#" class="tournaments-grid__leaderboard-link">Ежедневный</a>
                </div>
                <div class="tournaments-grid__cell tournaments-grid__cell--details">
                    <a href="#" class="tournaments-grid__details-link" @click="$emit('select', t)">Подробнее</a>
                </div>
            </div>
        </div>
        
        <div class="pagination">
            <a href="#" class="pagination__link" aria-label="Предыдущая страница">&laquo;</a>
            <a href="#" class="pagination__link">1</a>
            <a href="#" class="pagination__link pagination__link--active">2</a>
            <a href="#" class="pagination__link">3</a>
            <a href="#" class="pagination__link">4</a>
            <a href="#" class="pagination__link" aria-label="Следующая страница">&raquo;</a>
        </div>
    </div>
</section>


<!-- 

    <ul>
      <li v-for="t in tournaments" :key="t.startTime">
        <strong>{{ formatDate(t.startTime) }}</strong> — {{ t.tournamentName }} —
        ${{ t.info.buyIn }} бай-ин — ${{ t.info.prizePool }} приз
        <button @click="$emit('select', t)">Подробнее</button>
      </li>
    </ul> -->
  </div>
</template>

<script setup>
import { defineProps } from 'vue'
const props = defineProps({
  tournaments: Array
})
const formatDate = (dateStr) => new Date(dateStr).toLocaleString('ru-RU')
</script>
