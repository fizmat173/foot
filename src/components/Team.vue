<template>
  <div>
    <v-progress-circular
      v-if="isLoading"
      class="d-block mx-auto my-8"
      color="primary"
      indeterminate
    />
    <v-row>
      <v-col cols="12">
        <h2 class="text-h5 font-weight-bold mb-4">Матчи</h2>
      </v-col>
    </v-row>

    <!-- Блок выбора диапазона дат -->
    <v-row class="date-picker-row" dense align="center" no-gutters>
      <v-col cols="auto" class="d-flex align-center">
        <span style="margin-right: 8px; white-space: nowrap;">с</span>
        <v-text-field
          :model-value="formattedDateFrom"
          label="Дата с"
          readonly
          clearable
          prepend-inner-icon="mdi-calendar"
          @click="showDatePickerFrom = true"
          @click:clear="clearDate('from')"
          outlined
          style="min-width: 220px;"
        />
        <v-menu
          v-model="showDatePickerFrom"
          :close-on-content-click="false"
          transition="scale-transition"
          offset-y
          max-width="290px"
          min-width="auto"
        >
          <v-date-picker
            v-model="dateFrom"
            first-day-of-week="1"
            @update:model-value="showDatePickerFrom = false"
          />
        </v-menu>
      </v-col>

      <v-col cols="auto" style="width: 24px;"></v-col>

      <v-col cols="auto" class="d-flex align-center">
        <span style="margin-right: 8px; white-space: nowrap;">по</span>
        <v-text-field
          :model-value="formattedDateTo"
          label="Дата по"
          readonly
          clearable
          prepend-inner-icon="mdi-calendar"
          @click="showDatePickerTo = true"
          @click:clear="clearDate('to')"
          outlined
          style="min-width: 220px;"
        />
        <v-menu
          v-model="showDatePickerTo"
          :close-on-content-click="false"
          transition="scale-transition"
          offset-y
          max-width="290px"
          min-width="auto"
        >
          <v-date-picker
            v-model="dateTo"
            first-day-of-week="1"
            @update:model-value="showDatePickerTo = false"
          />
        </v-menu>
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
      <template #item.utcDate="{ item }">
        {{ new Date(item.utcDate).toLocaleString() }}
      </template>
      <template #item.status="{ item }">
        <v-chip :color="getStatusColor(item.status)" small>
          {{ getStatusText(item.status) }}
        </v-chip>
      </template>
      <template #item.teams="{ item }">
        <b>{{ item.homeTeam?.name }}</b> - {{ item.awayTeam?.name }}
      </template>
      <template #item.score="{ item }">
        <div v-if="item.score">
          {{ formatScore(item.score) }}
        </div>
        <span v-else>-:-</span>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import api from '@/api'

export default {
  data () {
    return {
      dateFrom: null,
      dateTo: null,
      showDatePickerFrom: false,
      showDatePickerTo: false,
      matches: [],
      isLoading: false,
      headers: [
        { key: 'utcDate', title: 'Дата, время' },
        { key: 'status', title: 'Статус' },
        { key: 'teams', title: 'Команды' },
        { key: 'score', title: 'Счет' },
      ],
    }
  },
  computed: {
    formattedDateFrom () {
      return this.dateFrom
        ? this.formatDate(this.dateFrom)
        : ''
    },
    formattedDateTo () {
      return this.dateTo
        ? this.formatDate(this.dateTo)
        : ''
    },
    filteredMatches () {
      return this.matches.filter(match => {
        const matchDate = new Date(match.utcDate)
        // начало дня фильтрующей даты
        const start = this.dateFrom
          ? new Date(this.dateFrom)
          : null
        // конец дня фильтрующей даты
        let end = this.dateTo
          ? new Date(this.dateTo)
          : null
        if (end) {
          end.setHours(23,59,59,999)
        }
        if (start && matchDate < start) return false
        if (end && matchDate > end) return false
        return true
      })
    },
  },
  mounted () {
    this.loadMatches()
  },
  methods: {
    formatDate (date) {
      const d = typeof date === 'string' ? new Date(date) : date
      const dd = String(d.getDate()).padStart(2,'0')
      const mm = String(d.getMonth()+1).padStart(2,'0')
      const yyyy = d.getFullYear()
      return `${dd}.${mm}.${yyyy}`
    },
    clearDate (type) {
      if (type === 'from') this.dateFrom = null
      else this.dateTo = null
    },
    clearFilter () {
      this.dateFrom = null
      this.dateTo = null
      this.showDatePickerFrom = false
      this.showDatePickerTo = false
    },
    getStatusText (status) {
      const map = {
        FINISHED: 'Матч завершен',
        SCHEDULED: 'Запланирован',
        LIVE: 'В прямом эфире',
        TIMED: 'Назначен',
        CANCELED: 'Отменен',
        SUSPENDED: 'Приостановлен',
        POSTPONED: 'Отложен',
        IN_PLAY: 'В игре'
      }
      return map[status] || status
    },
    getStatusColor (status) {
      const map = {
        FINISHED: 'green',
        SCHEDULED: 'blue',
        LIVE: 'red',
        TIMED: 'orange',
        CANCELED: 'grey',
        SUSPENDED: 'amber',
        POSTPONED: 'deep-purple',
        IN_PLAY: 'light-green',
      }
      return map[status] || 'grey'
    },
    loadMatches () {
      this.isLoading = true
      const teamId = this.$route.query.id
      api.get(`api/v4/teams/${teamId}/matches`)
        .then(response => {
          this.matches = response.data.matches
        })
        .catch(err => console.error('Ошибка при загрузке матчей:', err))
        .finally(() => {
          this.isLoading = false
        })
    },
    formatScore (score) {
      if (!score) return '-:-'
      const parts = []
      const ft = score.fullTime || {}
      parts.push(
        ft.home!=null && ft.away!=null
          ? `${ft.home}:${ft.away}`
          : '-:-'
      )
      const et = score.extraTime || {}
      if (et.home!=null && et.away!=null) {
        parts.push(`(${et.home}:${et.away})`)
      }
      const pen = score.penalties || {}
      if (pen.home!=null && pen.away!=null) {
        parts.push(`(${pen.home}:${pen.away})`)
      }
      return parts.join(' ')
    }
  }
}
</script>

<style scoped>
.v-menu__content {
  z-index: 1000;
}
</style>
