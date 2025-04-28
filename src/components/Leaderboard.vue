<template>
    <section class="leaderboards-section">
    <!-- Блок "Список лидербордов" -->
    <div class="leaderboards-list">
        <h2 class="leaderboards-list__title">Список лидербордов</h2>
        
        <div class="leaderboards-grid">
            <!-- Шапка таблицы -->
            <div class="leaderboards-grid__header leaderboards-grid__row">
                <div class="leaderboards-grid__cell leaderboards-grid__cell--number">№</div>
                <div class="leaderboards-grid__cell leaderboards-grid__cell--name">Название</div>
                <div class="leaderboards-grid__cell leaderboards-grid__cell--period">Срок проведения</div>
                <div class="leaderboards-grid__cell leaderboards-grid__cell--details"></div>
            </div>
            
            <!-- Строки с лидербордами -->
            <div class="leaderboards-grid__row">
                <div class="leaderboards-grid__cell leaderboards-grid__cell--number">1</div>
                <div class="leaderboards-grid__cell leaderboards-grid__cell--name">Ежедневный</div>
                <div class="leaderboards-grid__cell leaderboards-grid__cell--period">15/мая/2024 - 16/мая/2024</div>
                <div class="leaderboards-grid__cell leaderboards-grid__cell--details">
                    <a href="#leaderboard-daily" class="leaderboards-grid__details-link">Подробнее</a>
                </div>
            </div>
            
            <div class="leaderboards-grid__row">
                <div class="leaderboards-grid__cell leaderboards-grid__cell--number">2</div>
                <div class="leaderboards-grid__cell leaderboards-grid__cell--name">Недельный</div>
                <div class="leaderboards-grid__cell leaderboards-grid__cell--period">12/мая/2024 - 19/мая/2024</div>
                <div class="leaderboards-grid__cell leaderboards-grid__cell--details">
                    <a href="#leaderboard-weekly" class="leaderboards-grid__details-link">Подробнее</a>
                </div>
            </div>
            
            <div class="leaderboards-grid__row">
                <div class="leaderboards-grid__cell leaderboards-grid__cell--number">3</div>
                <div class="leaderboards-grid__cell leaderboards-grid__cell--name">Именной "Shark Party"</div>
                <div class="leaderboards-grid__cell leaderboards-grid__cell--period">01/мая/2024 - 31/мая/2024</div>
                <div class="leaderboards-grid__cell leaderboards-grid__cell--details">
                    <a href="#leaderboard-shark" class="leaderboards-grid__details-link">Подробнее</a>
                </div>
            </div>
        </div>
    </div>

    <!-- Блок "Таблица лидерборда" -->
    <div class="leaderboard-details" id="leaderboard-daily">
        <div class="leaderboard-header">
            <h2 class="leaderboard-header__title">Лидерборд "Ежедневный"</h2>
            <div class="leaderboard-header__period">15/мая/2024 - 16/мая/2024</div>
        </div>
        
        <div class="leaderboard-conditions">
            <h3 class="leaderboard-conditions__title">Условия проведения:</h3>
            <p class="leaderboard-conditions__text">В лидерборд учитываются все турниры, прошедшие в указанный период с бай-ином от $1. Очки начисляются по формуле: (призовые / бай-ин) × коэффициент места.</p>
            <div class="leaderboard-conditions__tournaments">
                <h4 class="leaderboard-conditions__subtitle">Турниры лидерборда:</h4>
                <ul class="leaderboard-conditions__list">
                    <li class="leaderboard-conditions__item"><a href="#" class="leaderboard-conditions__link">Турнир Shark Party 10000</a></li>
                    <li class="leaderboard-conditions__item"><a href="#" class="leaderboard-conditions__link">Турнир Shark Party 2000</a></li>
                    <li class="leaderboard-conditions__item"><a href="#" class="leaderboard-conditions__link">Турнир Shark Party 5000</a></li>
                </ul>
            </div>
        </div>
        
        <div class="leaderboard-table">
            <div class="leaderboard-grid">
                <!-- Шапка таблицы -->
                <div class="leaderboard-grid__header leaderboard-grid__row">
                    <div class="leaderboard-grid__cell leaderboard-grid__cell--number">№</div>
                    <div class="leaderboard-grid__cell leaderboard-grid__cell--player">Игрок</div>
                    <div class="leaderboard-grid__cell leaderboard-grid__cell--points">Очки</div>
                    <div class="leaderboard-grid__cell leaderboard-grid__cell--details"></div>
                </div>
                
                <!-- Строки с игроками -->
                <div class="leaderboard-grid__row leaderboard-grid__row--player" data-player-id="1">
                    <div class="leaderboard-grid__cell leaderboard-grid__cell--number">1</div>
                    <div class="leaderboard-grid__cell leaderboard-grid__cell--player">Kentavr</div>
                    <div class="leaderboard-grid__cell leaderboard-grid__cell--points">125.75</div>
                    <div class="leaderboard-grid__cell leaderboard-grid__cell--details">
                        <button class="leaderboard-grid__details-btn" aria-expanded="false" aria-controls="player-1-tournaments">Подробнее</button>
                    </div>
                </div>
                
                <!-- Детализация по турнирам игрока (скрыта по умолчанию) -->
                <div class="leaderboard-grid__row leaderboard-grid__row--tournaments" id="player-1-tournaments" style="display: none;" hidden>
                    <div class="leaderboard-grid__cell leaderboard-grid__cell--full" colspan="4">
                        <div class="player-tournaments">
                            <div class="player-tournaments__header player-tournaments__row">
                                <div class="player-tournaments__cell player-tournaments__cell--number">№</div>
                                <div class="player-tournaments__cell player-tournaments__cell--name">Турнир</div>
                                <div class="player-tournaments__cell player-tournaments__cell--place">Место</div>
                                <div class="player-tournaments__cell player-tournaments__cell--prize">Призовые</div>
                                <div class="player-tournaments__cell player-tournaments__cell--points">Очки</div>
                            </div>
                            
                            <div class="player-tournaments__row">
                                <div class="player-tournaments__cell player-tournaments__cell--number">1</div>
                                <div class="player-tournaments__cell player-tournaments__cell--name">
                                    <a href="#" class="player-tournaments__link">Shark Party 10000</a>
                                </div>
                                <div class="player-tournaments__cell player-tournaments__cell--place">3</div>
                                <div class="player-tournaments__cell player-tournaments__cell--prize">1500.00</div>
                                <div class="player-tournaments__cell player-tournaments__cell--points">45.25</div>
                            </div>
                            
                            <div class="player-tournaments__row">
                                <div class="player-tournaments__cell player-tournaments__cell--number">2</div>
                                <div class="player-tournaments__cell player-tournaments__cell--name">
                                    <a href="#" class="player-tournaments__link">Shark Party 2000</a>
                                </div>
                                <div class="player-tournaments__cell player-tournaments__cell--place">1</div>
                                <div class="player-tournaments__cell player-tournaments__cell--prize">800.00</div>
                                <div class="player-tournaments__cell player-tournaments__cell--points">80.50</div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Еще один игрок -->
                <div class="leaderboard-grid__row leaderboard-grid__row--player" data-player-id="2">
                    <div class="leaderboard-grid__cell leaderboard-grid__cell--number">2</div>
                    <div class="leaderboard-grid__cell leaderboard-grid__cell--player">BigBaby</div>
                    <div class="leaderboard-grid__cell leaderboard-grid__cell--points">112.30</div>
                    <div class="leaderboard-grid__cell leaderboard-grid__cell--details">
                        <button class="leaderboard-grid__details-btn" aria-expanded="false" aria-controls="player-2-tournaments">Подробнее</button>
                    </div>
                </div>
                
                <div class="leaderboard-grid__row leaderboard-grid__row--tournaments" id="player-2-tournaments" style="display: none;" hidden>
                    <div class="leaderboard-grid__cell leaderboard-grid__cell--full" colspan="4">
                        <div class="player-tournaments">
                            <div class="player-tournaments__header player-tournaments__row">
                                <div class="player-tournaments__cell player-tournaments__cell--number">№</div>
                                <div class="player-tournaments__cell player-tournaments__cell--name">Турнир</div>
                                <div class="player-tournaments__cell player-tournaments__cell--place">Место</div>
                                <div class="player-tournaments__cell player-tournaments__cell--prize">Призовые</div>
                                <div class="player-tournaments__cell player-tournaments__cell--points">Очки</div>
                            </div>
                            
                            <div class="player-tournaments__row">
                                <div class="player-tournaments__cell player-tournaments__cell--number">1</div>
                                <div class="player-tournaments__cell player-tournaments__cell--name">
                                    <a href="#" class="player-tournaments__link">Shark Party 5000</a>
                                </div>
                                <div class="player-tournaments__cell player-tournaments__cell--place">2</div>
                                <div class="player-tournaments__cell player-tournaments__cell--prize">1200.00</div>
                                <div class="player-tournaments__cell player-tournaments__cell--points">72.30</div>
                            </div>
                            
                            <div class="player-tournaments__row">
                                <div class="player-tournaments__cell player-tournaments__cell--number">2</div>
                                <div class="player-tournaments__cell player-tournaments__cell--name">
                                    <a href="#" class="player-tournaments__link">Shark Party 10000</a>
                                </div>
                                <div class="player-tournaments__cell player-tournaments__cell--place">5</div>
                                <div class="player-tournaments__cell player-tournaments__cell--prize">800.00</div>
                                <div class="player-tournaments__cell player-tournaments__cell--points">40.00</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
</template>

<script setup></script>