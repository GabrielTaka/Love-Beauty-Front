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
              <h3 class="title font-weight-light"> Subcategorias </h3>
              <h4 class="category font-weight-thin mb-0 "> Visualize subcategorias cadastradas</h4>
            </v-col>

            <v-col cols="2">
              <v-btn to="/admin/subcategories/new" color="blueButtons" dark> Cadastrar </v-btn>
            </v-col>
          </v-row>
        </v-card>

        <v-data-table
          :headers="headers"
          :items="subcategories"
        >
          <template v-slot:item.name="{ item }">
            {{item.name}}
          </template>

          <template v-slot:item.action="{ item }">
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-icon
                  color="error"
                  class="cursor-type"
                  large v-on="on"
                  @click="deleteSubcategory( item.id )"
                >
                  mdi-delete-circle
                </v-icon>
              </template>
              <span> Excluir Categoria </span>
            </v-tooltip>

            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-icon
                  color="success"
                  class="cursor-type"
                  large v-on="on"
                  @click="editSubcategory( item.id )"
                >
                  mdi-pencil-circle
                </v-icon>
              </template>
              <span> Editar Categoria </span>
            </v-tooltip>

          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import { securedAxiosInstance } from '../../plugins/axios'

  export default {
    components: {},

    mounted() {
      this.getSubategories()
    },

    data: () => ({

      subcategories: [],
      error: false,

      headers: [
        {
          sortable: false,
          text: 'Nome',
          value: 'name'
        },
        {
          sortable: false,
          text: 'Categoria',
          value: 'category_type.name'
        },
        {
          text: 'Ação',
          value: 'action'
        }
      ],
    }),

    methods: {
      async getSubategories() {
        let response = null

        await securedAxiosInstance.get(`/api/v1/subcategories`,
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
          this.subcategories = response.data

        } else {
          this.error = true
        }
      },

      async deleteSubcategory( id ) {
        let response = null

        await securedAxiosInstance.delete(`/api/v1/private/subcategories/${id}`,
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
          this.subcategories = []
          this.getSubategories()
        }
      },

      editSubcategory( id ) {
        this.$router.push(`/admin/subcategories/${id}/edit`)
      }

    },
  }
</script>


<style scoped>

  .cursor-type {
    cursor: pointer;
  }
</style>