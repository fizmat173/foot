<template>
  <div>
    <v-text-field
      v-model="searchQuery"
      clearable
      label="поиск по названию лиги"
      @input="onSearchInput"
    />
    <v-progress-circular
      v-if="isLoading"
      class="d-block mx-auto my-8"
      color="primary"
      indeterminate
    />
    <v-alert
      v-else-if="filteredLeagues.length === 0"
      type="info"
    >
      {{ searchQuery ? 'Ни одна лига не найдена' : 'Нет доступных лиг' }}
    </v-alert>
    <template v-else>
      <v-row>
        <v-col
          v-for="(league, index) in paginatedLeagues"
          :key="index"
          cols="12"
          md="4"
          sm="6"
        >
          <v-card class="league-card flex-grow-1 d-flex flex-column" @click="goToLeague(league.id)">
            <v-img
              v-if="league.emblemUrl"
              height="100"
              :src="league.emblemUrl"
            />
            <v-img
              v-else
              height="100"
              src="/src/assets/placeholder.svg"
            />
            <v-card-title class="v-card-title"> {{ league.name }} </v-card-title>
            <v-card-subtitle class="v-card-subtitle"> {{ league.area.name }} </v-card-subtitle>
            <v-spacer />
            <v-card-actions class="justify-center flex-grow-0">
              <v-btn color="primary">Подробнее...</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
      <v-pagination
        v-model="page"
        class="v.pagination"
        :length="totalPages"
        :total-visible="7"
      />
    </template>
  </div></template>

<script>
  import api from '@/api'
  export default {
    data () {
      return {
        leagues: [],
        page: 1,
        ItemsPerPage: 12,
        searchQuery: '',
        isLoading: false,
      }
    },
    computed: {
      totalPages () {
        return Math.ceil(this.filteredLeagues.length / this.ItemsPerPage)
      },
      paginatedLeagues () {
        const start = (this.page - 1) * this.ItemsPerPage
        const end = start + this.ItemsPerPage
        return this.filteredLeagues.slice(start, end)
      },
      filteredLeagues () {
        if (!this.searchQuery) return this.leagues;
        const query = this.searchQuery.toLowerCase();
        return this.leagues.filter(league => league.name.toLowerCase().includes(query));
      },
    },
    mounted () {
      this.loadLeagues();
    },
    methods: {
      loadLeagues () {
        this.isLoading = true;
        api.get('api/v4/competitions')
          .then(response => this.leagues = response.data.competitions)
          .catch(error => console.error(error))
          .finally(() => this.isLoading = false);
      },
      onSearchInput () {
        this.page = 1;
      },
      goToLeague (leagueId) {
        this.$router.push(`/league/?id=${leagueId}`)
      },
    },
  }
</script>
<style scoped>
.league-card{
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  transition: transform 0.3s;
  margin-bottom: 16px;
}
.league-card:hover{
  transform: translateY(-5px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.v-card-title {
  font-size: 1.2rem;
  font-weight: hold;
  padding-bottom: 0;
}

.v-card-subtitle {
  font-size: 1rem;
  padding-top: 0;
}

v.pagination {
  justify-content: center;
}

</style>
