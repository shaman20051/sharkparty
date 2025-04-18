<script>
const app = Vue.createApp({
  data() {
    return {
      tournaments: [],
      selectedTournament: null
    };
  },
  computed: {
    topPlayers() {
      return this.selectedTournament?.players?.slice(0, 10) || [];
    }
  },
  methods: {
    async loadTournaments() {
      const files = [
        '/data/data_turnament_04_16_1930.json',
        '/data/data_turnament_04_17_1600.json'
      ];
      try {
        const data = await Promise.all(files.map(f => fetch(f).then(res => res.json())));
        this.tournaments = data;
        console.log('Загружено:', this.tournaments); // 👉 проверь, что тут массив из 2 турниров
      } catch (e) {
        console.error("Ошибка загрузки данных турниров:", e);
      }
    },
    selectTournament(t) {
      this.selectedTournament = t;
    },
    formatDate(dateStr) {
      return new Date(dateStr).toLocaleString('ru-RU');
    },
    formatCountry(code) {
      return code ? code.toUpperCase() : '';
    }
  },
  mounted() {
    this.loadTournaments();
  }
});

app.mount('#tournament-list');
</script>
