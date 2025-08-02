<template>
  <div class="ma-4">
    <!-- Выбор лиги -->
    <v-select
      v-model="selectedCompetitionId"
      :items="competitions"
      item-title="name"
      item-value="id"
      label="Выберите лигу"
      outlined
      :loading="isLoading"
      return-object
      clearable
      class="mb-4"
    />

    <!-- Поиск по командам -->
    <v-text-field
      v-model="searchQuery"
      label="Поиск команды"
      outlined
      clearable
      class="mb-4"
    />

   <!-- Команды -->
<v-row>
  <v-col
    v-for="team in paginatedTeams"
    :key="team.id"
    cols="12" sm="6" md="4"
  >
    <v-card
      class="d-flex flex-column align-start"
      @click="goToTeam(team.id)"
      hover
    >
      <v-card-title class="d-flex align-center">
        <v-avatar
          size="40"
          class="me-3"
          v-if="team.crest"
        >
          <v-img :src="team.crest" :alt="team.name" />
        </v-avatar>
        <span>{{ team.name }}</span>
      </v-card-title>

      <v-card-subtitle>
        {{ team.area?.name }}
      </v-card-subtitle>

      <v-card-text>
        <div v-if="team.website">
          <strong>Сайт:</strong>
          <a :href="team.website" target="_blank">{{ team.website }}</a>
        </div>
      </v-card-text>
    </v-card>
  </v-col>
</v-row>


    <!-- Пагинация -->
    <v-pagination
      v-model="page"
      :length="pageCount"
      class="mt-4"
    />
  </div>
</template>

<script>
import api from '@/api'

export default {
  data () {
    return {
      competitions: [],             // Все лиги
      selectedCompetitionId: null,  // Объект выбранной лиги (v-select с return-object)
      teams: [],                    // Все команды выбранной лиги
      searchQuery: '',              // Поиск
      isLoading: false,
      page: 1,
      itemsPerPage: 12
    }
  },
  computed: {
    filteredTeams () {
      const query = this.searchQuery.toLowerCase()
      return this.teams.filter(team =>
        team.name.toLowerCase().includes(query)
      )
    },
    paginatedTeams () {
      const start = (this.page - 1) * this.itemsPerPage
      return this.filteredTeams.slice(start, start + this.itemsPerPage)
    },
    pageCount () {
      return Math.ceil(this.filteredTeams.length / this.itemsPerPage)
    }
  },
  watch: {
    selectedCompetitionId (newVal) {
      if (newVal?.id) {
        this.loadTeams(newVal.id)
      } else {
        this.teams = []
      }
    }
  },
  mounted () {
    this.loadLeagues()
  },
  methods: {
    loadLeagues () {
      this.isLoading = true
      api.get('api/v4/competitions')
        .then(response => {
          this.competitions = response.data.competitions
        })
        .catch(error => {
          console.error('Ошибка при загрузке лиг:', error)
        })
        .finally(() => {
          this.isLoading = false
        })
    },
    loadTeams (competitionId) {
      this.isLoading = true
      api.get(`api/v4/competitions/${competitionId}/teams`)
        .then(response => {
          this.teams = response.data.teams
          this.page = 1 // сбрасываем на первую страницу
        })
        .catch(error => {
          console.error('Ошибка при загрузке команд:', error)
        })
        .finally(() => {
          this.isLoading = false
        })
    },
    goToTeam (teamId) {
    // this.$router.push({ name: 'team', params: { id: teamId } })
    this.$router.push(`/team/?id=${teamId}`)
  }
  }
}
</script>

<style scoped>
.v-select {
  max-width: 400px;
}
</style>
