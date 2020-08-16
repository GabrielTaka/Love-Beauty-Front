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
              <h3 class="title font-weight-light"> Categorias </h3>
              <h4 class="category font-weight-thin mb-0 "> Visualize categorias cadastradas</h4>
            </v-col>

            <v-col cols="2">
              <v-btn to="/admin/categories/new" color="blueButtons" dark> Cadastrar </v-btn>
            </v-col>
          </v-row>
        </v-card>

        <v-data-table
          :headers="headers"
          :items="categories"
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
                  @click="deleteCategory( item.id )"
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
                  @click="editCategory( item.id )"
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
  import { securedAxiosInstance } from '../plugins/axios'

  export default {
    components: {},

    mounted() {
      this.getCategories()
    },

    data: () => ({

      categories: [],
      error: false,

      headers: [
        {
          sortable: false,
          text: 'Nome',
          value: 'name'
        },
        {
          text: 'Ação',
          value: 'action'
        }
      ],
    }),

    methods: {
      async getCategories() {
        let response = null

        await securedAxiosInstance.get(`/api/v1/private/category_types`,
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
          this.categories = response.data
        } else {
          this.error = true
        }
      },

      async deleteCategory( id ) {
        let response = null

        await securedAxiosInstance.delete(`/api/v1/private/category_types/${id}`,
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
          this.establishments = []
          this.getCategories()
        }
      },

      editCategory( id ) {
        this.$router.push(`/admin/categories/${id}/edit`)
      }

    },
  }
</script>


<style scoped>

  .cursor-type {
    cursor: pointer;
  }
</style>