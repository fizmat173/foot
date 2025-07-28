<template>
  <div>
    <v-progress-circular
      v-if="isLoading"
      class="d-block mx-auto my-8"
      color="primary"
      indeterminate
    />
    <v-row>
      <v-col>
        <v-date-picker
          v-model="dateFrom"
        />
      </v-col>
      <v-col>
        <v-text-field v-model="formattedDate" />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-btn @click="clearFilter">Очистить фильтр</v-btn>
      </v-col>
    </v-row>

    <v-data-table
      :headers="headers"
      :items="filteredMatches"
    >
      <!-- eslint-disable-next-line -->
      <template #item.utcDate="{ item }">
        {{ new Date(item.utcDate).toLocaleString() }}
      </template>
      <!-- eslint-disable-next-line -->
      <template #item.status="{ item }">
        <v-chip :color="getStatusColor(item.status)" small>
          {{ getStatusText(item.status) }}
        </v-chip>
      </template>
      <!-- eslint-disable-next-line -->
      <template #item.teams="{ item }">
        <b>{{ item.homeTeam?.name }}</b> - {{ item.awayTeam?.name }}
      </template>
    </v-data-table>

  </div></template>


<script>
  import api from '@/api'
  export default {
    data () {
      return {
        dateFrom: null,
        page: 1,
        itemsPerPage: 12,
        matches: [],
        isLoading: false,
        headers: [
          { key: 'utcDate', title: 'Дата' },
          { key: 'status', title: 'Статус' },
          { key: 'teams', title: 'Команды' },
          { key: 'score', title: 'Счет' },
        ],
      }
    },
    computed: {
      filteredMatches () {
        if (!this.dateFrom) return this.matches;
        return this.matches.filter (match => {
          const matchDate = new Date(match.utcDate);
          if (matchDate >= this.dateFrom) return true
          return false
        }
        )
      },
      formattedDate () {
        return new Date (this.dateFrom).toLocaleString()
      },
      totalPages () {
        return Math.ceil(this.matches.length / this.itemsPerPage)
      },
      paginatedLeagues () {
        const start = (this.page - 1) * this.itemsPerPage
        const end = start + this.itemsPerPage
        return this.matches.slice(start, end)
      },
    },
    mounted () {
      this.loadMatches();
    },
    methods: {
      clearFilter () {
        this.dateFrom = null
      },
      getStatusText (status) {
        const statusMap = {
          FINISHED: 'Матч завершен',
          SCHEDULED: 'Запланирован',
          LIVE: 'В прямом эфире',
        }
        return statusMap[status] || status
      },
      getStatusColor (status) {
        const statusMap = {
          FINISHED: 'green',
          SCHEDULED: 'blue',
          LIVE: 'red',
        }
        return statusMap[status] || status
      },
      loadMatches (){
        this.isLoading = true;
        const leagueId = this.$route.query.id;
        api.get(`api/v4/competitions/${leagueId}/matches`)
          .then(response => this.matches = response.data.matches)
          .catch(error => console.error(error))
          .finally( () => this.isLoading = false);
      },
      onSearchInput () {
        this.page = 1;
      },
    },
  }
</script>
<style scoped>
.league-card {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  transition: transform 0.3s;
  margin-bottom: 16px;
}

.league-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.v-card-title {
  font-size: 1.2rem;
  font-weight: bold;
  padding-bottom: 0;
}

.v-card-subtitle {
  padding-top: 0;
  font-size: 1rem;
}

.v-pagination {
  justify-content: center;
}
</style>
