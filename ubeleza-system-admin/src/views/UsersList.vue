<template>
  <v-container
    fill-height
    fluid
    grid-list-xl
  >
    <v-row justify="center">
      <v-col cols="12">

        <v-card color="green" class="white--text pa-3">
          <v-row>
            <v-col cols="10">
              <h3 class="title font-weight-light"> Usuários / Profissionais </h3>
              <h4 class="category font-weight-thin mb-0 "> Visualize os usuários e os profissionais cadastrados</h4>
            </v-col>

            <v-col cols="2">
              <v-btn to="/admin/users/new" color="blueButtons" dark> Cadastrar </v-btn>
            </v-col>
          </v-row>
        </v-card>

        <v-data-table
          :headers="headers"
          :items="users"
        >
          <template v-slot:item.email="{ item }">
            {{item.email}}
          </template>

          <template v-slot:item.establishments="{ item }">
             <v-chip
              v-for="(estab, index) in item.establishments"
              :key="index"
              color="primary"
              dark
            >
              {{ estab.name }}
            </v-chip>
          </template>

          <template v-slot:item.role="{ item }">
            {{item.role}}
          </template>

          <template v-slot:item.action="{ item }">
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-icon
                  color="error"
                  class="cursor-type"
                  large v-on="on"
                  @click="deleteUser( item.id )"
                >
                  mdi-delete-circle
                </v-icon>
              </template>
              <span> Excluir Usuário </span>
            </v-tooltip>

            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-icon
                  color="success"
                  class="cursor-type"
                  large v-on="on"
                  @click="editUser( item.id )"
                >
                  mdi-pencil-circle
                </v-icon>
              </template>
              <span> Editar Usuário </span>
            </v-tooltip>

          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import { securedAxiosInstance } from '../plugins/axios'

  export default {
    components: {
      EstablishmentNew: () => import('@/views/EstablishmentsNew'),
    },

    mounted() {
      this.getUsers()
    },

    data: () => ({
      dialog: false,
      notifications: false,
      sound: true,
      widgets: false,
      users: [],
      error: false,

      headers: [
        {
          sortable: false,
          text: 'E-mail',
          value: 'email'
        },
        {
          sortable: false,
          text: 'Estabelecimento',
          value: 'establishments'
        },
        {
          sortable: false,
          text: 'Papel',
          value: 'role'
        },
        {
          text: 'Ação',
          value: 'action'
        }
      ],
    }),

    methods: {
      async getUsers() {
        let response = null

        await securedAxiosInstance.get(`/api/v1/private/users`,
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
          this.users = response.data

        } else {
          this.error = true
        }
      },

      async deleteUser( id ) {
        let response = null

        await securedAxiosInstance.delete(`/api/v1/private/users/${id}`,
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
          this.users = []
          this.getUsers()
        }
      },

      editUser( id ) {
        this.$router.push(`/admin/users/${id}/edit`)
      }

    },
  }
</script>


<style scoped>

  .cursor-type {
    cursor: pointer;
  }
</style>