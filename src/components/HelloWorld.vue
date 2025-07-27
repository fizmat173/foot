<template>
  <v-container class="fill-hight" fluid>
    <v-row>
      <v-col
        v-for="(league, index) in paginatedLeagues"
        :key="index"
        cols="12"
        md="4"
        sm="6"
      >
        <v-card class="league-card flex-grow-1 d-flex flex-column">
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
  </v-container>
</template>

<script>
  import axios from 'axios'
  export default {
    data () {
      return {
        leagues: [],
        page: 1,
        ItemsPerPage: 12,
      }
    },
    computed: {
      totalPages () {
        return Math.ceil(this.leagues.length / this.ItemsPerPage)
      },
      paginatedLeagues () {
        const start = (this.page - 1) * this.ItemsPerPage
        const end = start + this.ItemsPerPage
        return this.leagues.slice(start, end)
      },
    },
    mounted () {
      axios.get('api/v2/competitions')
        .then(response => this.leagues = response.data.competitions)
        .catch(error => console.error(error))
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

