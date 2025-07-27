<template>
  <div>

    <v-progress-circular
      v-if="isLoading"
      class="d-block mx-auto my-8"
      color="primary"
      indeterminate
    />

    <v-data-table
      :headers="headers"
      :items="matches"
      template
    /></div></template>

<script>
  import api from '@/api'
  export default {
    data () {
      return {
        leagues: [],
        page: 1,
        ItemsPerPage: 12,
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
        if (!this.searchQuery) return this.leagues
        const query = this.searchQuery.toLowerCase()
        return this.leagues.filter(league => league.name.toLowerCase().includes(query))
      },
    },
    mounted () {
      this.loadMatches()
    },
    methods: {
      loadMatches () {
        this.isLoading = true
        const leagueId = this.$route.query.id

        api.get(`api/v4/competitions/${leagueId}/matches`)
          .then(response => this.leagues = response.data.competitions)
          .catch(error => console.error(error))
          .finally(() => this.isLoading = false)
      },
      onSearchInput () {
        this.page = 1
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
