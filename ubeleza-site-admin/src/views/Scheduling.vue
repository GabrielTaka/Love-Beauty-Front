<template>
  <v-container
    fill-height
    fluid
    grid-list-xl
  >

    <v-overlay :value="overlay">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
  
    <v-row justify="center">
      <v-col cols="12">

        <v-card color="green" class="white--text pa-3">
          <v-row>
            <v-col cols="10">
              <h3 class="title font-weight-light"> Agenda </h3>
              <h4 class="category font-weight-thin mb-0 "> Visualize a agenda do estabelecimento.</h4>
            </v-col>
          </v-row>
        </v-card>

        <v-card>
          <v-card-text>
            <div>
          <v-sheet
            tile
            height="54"
            color="grey lighten-3"
            class="d-flex mb-5 sheet-title pt-2"
          >
            <v-btn
              icon
              class="ma-2"
              @click="$refs.calendar.prev()"
            >
              <v-icon>mdi-chevron-left</v-icon>
            </v-btn>
            <v-select
              v-model="type"
              :items="types"
              dense
              outlined
              hide-details
              label="Filtro"
            ></v-select>

            <v-spacer></v-spacer>

            <v-btn
              icon
              class="ma-2"
              @click="$refs.calendar.next()"
            >
              <v-icon>mdi-chevron-right</v-icon>
            </v-btn>
          </v-sheet>

          <v-sheet height="600">
            <v-calendar
              ref="calendar"
              v-model="value"
              :weekdays="weekday"
              :type="type"
              :events="events"
              :event-overlap-mode="mode"
              :event-overlap-threshold="30"
              :event-color="getEventColor"
              @click:event="showEvent"
              @click:date="newEvent"
            ></v-calendar>
          </v-sheet>
        </div>
          </v-card-text>
        </v-card>

        <!-- calendar -->
      </v-col>
    </v-row>

    <v-dialog v-model="showDialogDetails" width="500px">
      <v-card>
        <v-card-title class="primary white--text">
          Informações sobre serviço agendado
        </v-card-title>

        <v-card-text class="mt-5" v-if="step == 1">
          <v-row>
            <v-col
              sm="6"
            >
              <strong> Estabelecimento: </strong> {{eventScheduled.all_data.establishment.name}}
            </v-col>

            <v-col
              sm="6"
            >
              <strong> Profissional: </strong> {{eventScheduled.all_data.professional.name}}
            </v-col>
          </v-row>

          <v-row>
            <v-col
              sm="6"
            >
              <strong> Serviço: </strong> {{eventScheduled.all_data.subcategory.name}}
            </v-col>
            <v-col
              sm="6"
            >
              <strong> Cliente: </strong> {{eventScheduled.all_data.user.name}}
            </v-col>
          </v-row>

          <v-row>
            <v-col
              sm="6"
            >
              <strong> Horário de Início:</strong> {{ parseDate(eventScheduled.all_data.start) }}
            </v-col>
            <v-col
              sm="6"
            >
              <strong> Horário de Termino:</strong> {{ parseDate(eventScheduled.all_data.end) }}
            </v-col>
          </v-row>

        </v-card-text>

        <v-card-text v-else class="mt-5"> 
          <v-row>
            <v-col sm="6">
              <strong> Serviço: </strong> {{eventScheduled.all_data.subcategory.name }}
            </v-col>
            <v-col sm="6">
              <strong> Horário Agendado: </strong> {{ parseDate(eventScheduled.all_data.start) }}
            </v-col>
          </v-row>
          
          <v-row justify="center">
            <v-date-picker width="450" v-model="pickerNewScheduler"></v-date-picker>
            <v-text-field
              v-model="scheduling.start"
              dense 
              outlined 
              label="Novo horário de início"
              v-mask="hourMask"
              class="mt-3"
            />
          </v-row>
        </v-card-text>

        <v-card-actions v-if="step == 1">
          <v-btn
            roudend
            class="px-5 blue"
            dark
            @click="step = 2"
          >
            Reagendar
          </v-btn>
          <v-spacer/>
          <v-btn
            class="px-5 error"
            @click="deleteScheduling(eventScheduled.all_data.id)"
          > 
            Excluir
          </v-btn>
        </v-card-actions>

        <v-card-actions v-if="step == 2">
          <v-btn
            roudend
            class="px-5 blue"
            dark
            @click="updateScheduling()"
          >
            Reagendar
          </v-btn>
          <v-spacer/>
          <v-btn
            class="px-5 error"
            @click="step = 1"
          > 
            Voltar
          </v-btn>
        </v-card-actions>

      </v-card>
    </v-dialog>

    <v-dialog v-model="showDialogNewScheduler" width="500px">
      <v-card>
        <v-card-title class="primary white--text">
          Cadastrar Agendamento
        </v-card-title>

        <v-card-text class="mt-5">
          <v-row>

            <v-col
              sm="12"
            >
              <v-select
                v-model="scheduling.professional_id"
                :items="users"
                required
                :error-messages="schedulingProfessionalErrors"
                @input="$v.scheduling.professional_id.$touch()"
                @blur="$v.scheduling.professional_id.$touch()"
                dense
                outlined
                hide-details
                item-value="id"
                item-text="name"
                label="Profissionais"
              ></v-select>
            </v-col>
          </v-row>

          <v-row>
            <v-col
              sm="12"
            >
              <v-select
                v-model="scheduling.product_id"
                :items="products"
                required
                :error-messages="schedulingProductErrors"
                @input="$v.scheduling.product_id.$touch()"
                @blur="$v.scheduling.product_id.$touch()"
                dense
                outlined
                hide-details
                item-value="id"
                item-text="subcategory.name"
                label="Serviços"
              ></v-select>
            </v-col>
            <v-col
              sm="12"
            >
              <v-select
                v-model="scheduling.user_id"
                :items="customers"
                required
                :error-messages="schedulingUsersErrors"
                @input="$v.scheduling.user_id.$touch()"
                @blur="$v.scheduling.user_id.$touch()"
                dense
                outlined
                hide-details
                item-value="id"
                item-text="name"
                label="Clientes"
              ></v-select>
            </v-col>
          </v-row>

          <v-row>
            <v-col
              sm="12"
            >
              <v-text-field
                v-model="scheduling.start"
                required
                :error-messages="schedulingStartErrors"
                @input="$v.scheduling.start.$touch()"
                @blur="$v.scheduling.start.$touch()"
                dense 
                outlined 
                label="Horário de Início"
                v-mask="hourMask"
              />
            </v-col>
            
          </v-row>
        </v-card-text>

        <v-card-actions>
          <v-btn
            roudend
            dark
            class="px-5 blue full-width"
            @click="beforeSubmit()"
          >
            Cadastrar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </v-container>
</template>

<script>
  import UserRepository from '../repositories/UserRepository'
  import ProductRepository from '../repositories/ProductRepository'
  import SchedulerRepository from '../repositories/SchedulerRepository'

  import { securedAxiosInstance } from '../plugins/axios'
  import moment from 'moment';
  import { format } from 'path';
  import { mask } from 'vue-the-mask'

  import { validationMixin } from 'vuelidate'
  import { required, maxLength, email } from 'vuelidate/lib/validators'

  export default {
    directives: { mask },

    mixins: [validationMixin],

    validations: {
      scheduling: {
        user_id: { required },  
        product_id: { required },
        professional_id: { required },
        start: { required },
      },
    },

    mounted() {
      this.getEvents()
    },

    data: () => ({
      type: 'month',
      types: ['month', 'week', 'day', '4day'],
      mode: 'stack',
      weekday: [0, 1, 2, 3, 4, 5, 6],
      weekdays: [
        { text: 'Dom - Sab', value: [0, 1, 2, 3, 4, 5, 6] },
        { text: 'Seg - Dom', value: [1, 2, 3, 4, 5, 6, 0] },
        { text: 'Seg - Sex', value: [1, 2, 3, 4, 5] },
        { text: 'Seg, Qua, Qui', value: [1, 3, 5] },
      ],
      value: '',
      events: [],
      colors: ['blue', 'indigo', 'deep-purple', 'cyan', 'green', 'orange', 'grey darken-1'],
      names: ['Meeting', 'Holiday', 'PTO', 'Travel', 'Event', 'Birthday', 'Conference', 'Party'],

      showDialogDetails: false,
      showDialogNewScheduler: false,
      overlay: false,



      eventScheduled: {
        all_data: {
          establishment: {
            name: null
          },
          professional: {
            name: null
          },
          product: {
            name: null
          },
          user: {
            name: null
          },
          subcategory: {
            name: null
          },
          start: null,
          end: null,
        },
      },

      users: [],
      products: [],
      customers: [],
      hourMask: 'XX:XX',
      registerDay: null,
      registerMonth: null,
      registerYear: null,

      scheduling: {
        establishment_id: null,
        user_id: null,
        professional_id: null,
        product_id: null,
        start: null
      },

      step: 1,
      pickerNewScheduler: null
    }),

    computed: {
      schedulingUsersErrors () {
        const errors = []
        if (!this.$v.scheduling.user_id.$dirty) return errors
        !this.$v.scheduling.user_id.required && errors.push('Selecione um usuário.')
        return errors
      },

      schedulingProductErrors () {
        const errors = []
        if (!this.$v.scheduling.product_id.$dirty) return errors
        !this.$v.scheduling.product_id.required && errors.push('Selecione um produto.')
        return errors
      },

      schedulingProfessionalErrors () {
        const errors = []
        if (!this.$v.scheduling.professional_id.$dirty) return errors
        !this.$v.scheduling.professional_id.required && errors.push('Selecione um profissional.')
        return errors
      },

      schedulingStartErrors () {
        const errors = []
        if (!this.$v.scheduling.start.$dirty) return errors
        !this.$v.scheduling.start.required && errors.push('Informe um horário.')
        return errors
      },
    },

    methods: {
      getEvents () {
          this.overlay = true
          const events = []
          this.getSchedulings()
          this.overlay = false
      },

      getEventColor (event) {
        return event.color
      },

      rnd (a, b) {
        return Math.floor((b - a + 1) * Math.random()) + a
      },

      formatDate (a, withTime) {
        let newDate = new Date(a)
        let date = `${newDate.getFullYear()}-${newDate.getMonth() + 1}-${newDate.getDate()} ${newDate.getHours() + 3}:${newDate.getMinutes()}`
        return date

      },

      async getSchedulings() {
        let response = null
        let events = []
        await securedAxiosInstance.get(`/api/v1/establishments/${this.$store.state.selectedEstablishment.id}/schedulings`,
          {
            params: { access_token: localStorage.getItem('access_token') }
          }
        )
        .then((result) => {
          response = result
        }).catch((err) => {
          response = err
        });

        if ( response.status == 200 ) {
          console.log("===========================??")
          console.log( response.data)
          console.log("===========================")
          response.data.forEach(event => {
            events.push({
              name: `${event.user.name} - ${event.professional.name}`,
              start: this.formatDate(event.start, true),
              end: this.formatDate(event.end, true),
              color: this.colors[this.rnd(0, this.colors.length - 1)],
              all_data: event
            })
          });

          this.events = events
        }
      },

      newEvent({ day , month , year,  time }) {

        this.registerDay = day
        this.registerMonth = month
        this.registerYear = year

        let newDate = new Date()
        if ( month > moment(newDate).format('MM') ) {
          this.showDialogNewScheduler = true
          this.getUsers()
          this.getProducts()
          this.getCustomers()

        } else if ( month == moment(newDate).format('MM') ) {
          if ( day >= moment(newDate).format('DD') ) {
            this.showDialogNewScheduler = true
            this.getUsers()
            this.getProducts()
            this.getCustomers()
          }
        }
      },
      

      async getUsers () {
        let response = await UserRepository.byEstablishment(this.$store.state.selectedEstablishment.id, localStorage.getItem('access_token'))
        this.users = response.data
      },

      async getProducts () {
        let response = await ProductRepository.byEstablishment(this.$store.state.selectedEstablishment.id, localStorage.getItem('access_token'))
        this.products = response.data
      },

      async getCustomers () {
        let response = await UserRepository.allUsers(0, localStorage.getItem('access_token'))
        this.customers = response.data
      },
      
      showEvent({ event }) {
        this.showDialogDetails = true
        this.eventScheduled = event
      },

      beforeSubmit () {
        this.$v.$touch() 
        if ( this.$v.$invalid) { 
          return 
        } 
        else { 
          this.submit() 
        }
      },

      async submit () {        
        let newDate = new Date()
        
        if (parseInt(this.scheduling.start) < moment(newDate).format('HH')) {
          return
        }

        this.scheduling.establishment_id = this.$store.state.selectedEstablishment.id
        this.scheduling.start = `${this.registerYear}-${this.registerMonth}-${this.registerDay} ${this.scheduling.start}`
        let response = await SchedulerRepository.registerScheduling( this.scheduling, localStorage.getItem('access_token') )

        if ( response.status == 200 ) {
          this.scheduling = {}
          this.showDialogNewScheduler = false
          this.getEvents()
        }
      },

      parseDate( date ) {
        return moment(date).add('3', 'hours').format('DD/MM HH:mm')
      },

      async deleteScheduling( id ) {
        let response = await SchedulerRepository.deleteScheduling( localStorage.getItem('access_token'), id )
        if ( response.status == 200 ) {
          this.showDialogDetails = false
          this.getSchedulings()
        }
      },

      async updateScheduling () {
        let form = {
          new_start: `${this.pickerNewScheduler} ${this.scheduling.start}`
        }

        let response = await SchedulerRepository.updateScheduling( localStorage.getItem('access_token'), this.eventScheduled.all_data.id, form )
        if ( response.status == 200 ) {
          this.step = 1
          this.showDialogDetails = false 
          this.getSchedulings()
        }
      }
    }

  }
</script>


<style scoped>

  .cursor-type {
    cursor: pointer;
  }

  .sheet-title {
    height: 70px !important;
  }

  .full-width {
    width: 100%;
  }
</style>