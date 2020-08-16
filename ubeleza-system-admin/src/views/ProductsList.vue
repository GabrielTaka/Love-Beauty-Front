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
              <h3 class="title font-weight-light"> Serviços </h3>
              <h4 class="category font-weight-thin mb-0 "> Visualize serviços cadastrados </h4>
            </v-col>

            <v-col cols="2">
              <!-- <product-new v-on:reload="reloadProcuts"/> -->
              <v-btn color="blueButtons" dark to="/admin/products/new"> Cadastrar </v-btn>
            </v-col>
          </v-row>
        </v-card>

        <v-data-table
          :headers="headers"
          :items="products"
        >
          <template v-slot:item.title="{ item }">
            {{item.title}}
          </template>

          <template v-slot:item.price="{ item }">
            R$ {{item.price}}
          </template>

          <template v-slot:item.description="{ item }">
            {{item.description}}
          </template>



          <!-- <template v-slot:item.establishment="{ item }">
            <v-chip
              color="primary"
              dark
            >
              {{ item.establishment.name }}
            </v-chip>
          </template>

          <template v-slot:item.category="{ item }">
            <v-chip
              v-for="(category_type, index) in item.category_types"
              :key="index"
              color="primary"
              dark
            >
              {{ category_type.name }}
            </v-chip>
          </template> -->

          <template v-slot:item.action="{ item }">
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-icon
                  color="error"
                  class="cursor-type"
                  large v-on="on"
                  @click="deleteProduct( item.id )"
                >
                  mdi-delete-circle
                </v-icon>
              </template>
              <span> Excluir Serviço </span>
            </v-tooltip>

            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-icon
                  color="primary"
                  class="cursor-type"
                  large v-on="on"
                  @click="editProduct( item.id )"
                >
                  mdi-pencil-circle
                </v-icon>
              </template>
              <span> Editar Serviço </span>
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
      ProductNew: () => import('@/views/ProductsNew'),
      ProductEdit: () => import('@/views/ProductsEdit'),
    },

    mounted() {
      this.getProducts()
    },

    data: () => ({
      dialog: false,
      notifications: false,
      sound: true,
      widgets: false,
      products: [],
      error: false,

      headers: [
        {
          sortable: false,
          text: 'Preço (R$)',
          value: 'price'
        },
        {
          sortable: false,
          text: 'Descrição',
          value: 'description'
        },
        {
          sortable: false,
          text: 'Estabelecimento',
          value: 'establishment'
        },
        {
          sortable: false,
          text: 'Categoria',
          value: 'category'
        },
        {
          sortable: false,
          text: 'Subcategoria',
          value: 'subcategory.name'
        },
        {
          text: 'Ação',
          value: 'action'
        }
      ],
    }),

    methods: {
      async getProducts() {
        let response = null

        await securedAxiosInstance.get(`/api/v1/private/products`,
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
          this.products = response.data
          console.log("++++++++++++++++++++")
          console.log( this.products )
          console.log("++++++++++++++++++++")
        } else {
          this.error = true
        }
      },

      async deleteProduct( id ) {
        let response = null

        await securedAxiosInstance.delete(`/api/v1/private/products/${id}`,
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
          this.products = []
          this.getProducts()
        }
      },


      editProduct( id ) {
        this.$router.push(`/admin/products/${id}`)
      }

    },
  }
</script>


<style scoped>

  .cursor-type {
    cursor: pointer;
  }
</style>