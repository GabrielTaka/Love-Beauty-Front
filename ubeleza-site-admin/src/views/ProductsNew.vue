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
              <h3 class="title font-weight-light"> {{title}} teste </h3>
            </v-col>

            <v-col cols="2">
              <v-btn to="/admin/products" color="blueButtons" dark> Voltar </v-btn>
            </v-col>
          </v-row>

          <v-row class="form-config">
            <v-col cols="12">
              <form class="pl-5 pr-5 pt-6 pb-6">
                <v-row>
                  <v-col sm="12">
                    <v-select
                      v-model="establishment"
                      required
                      :error-messages="productEstablishmentErrors"
                      @input="$v.establishment.$touch()"
                      @blur="$v.establishment.$touch()"
                      :items="establishments"
                      label="Estabelecimento"
                      single-line
                      item-text="name"
                      item-value="id"
                      return-object
                      disabled
                    />
                  </v-col>

                  <v-col sm="12">
                    <v-select
                      v-model="category"
                      required
                      :error-messages="productCategoryErrors"
                      @input="$v.category.$touch()"
                      @blur="$v.cateogry.$touch()"
                      :items="categories"
                      label="Categorias"
                      single-line
                      item-text="name"
                      item-value="id"
                      attach
                      chips
                      multiple
                      return-object
                      @change="getSubcategories()"
                    />
                  </v-col>

                  <v-col
                    cols="12"
                    sm="12"
                    md="6"
                  >
                    <v-select
                      v-model="subcategory"
                      required
                      :error-messages="productSubcategoryErrors"
                      @input="$v.subcategory.$touch()"
                      @blur="$v.subcategory.$touch()"
                      :items="subcategories"
                      label="Subcategorias"
                      single-line
                      item-text="name"
                      item-value="id"
                      return-object
                    />
                  </v-col>

                  <v-col
                    cols="12"
                    sm="12"
                    md="6"
                  >
                    <v-text-field
                      v-model="product.price"
                      :error-messages="productPriceErrors"
                      label="Preço"
                      required
                      @input="$v.product.price.$touch()"
                      @blur="$v.product.price.$touch()"
                    ></v-text-field>
                  </v-col>

                  <v-col
                    cols="12"
                    sm="12"
                    md="6"
                  >
                    <v-textarea
                      v-model="product.description"
                      :error-messages="productDescriptionErrors"
                      name="input-7-1"
                      label="Descrição do Serviço"
                      rows="1"
                      required
                      @input="$v.product.description.$touch()"
                      @blur="$v.product.description.$touch()"
                    ></v-textarea>
                  </v-col>

                  <v-col
                    cols="12"
                    sm="12"
                    md="6"
                  >
                    <v-text-field
                      v-model="product.details.duration"
                      :error-messages="productDurationErrors"
                      label="Duração (minutos)"
                      required
                      @input="$v.product.details.duration.$touch()"
                      @blur="$v.product.details.duration.$touch()"
                    ></v-text-field>
                  </v-col>

                  <v-col
                    cols="12"
                  >
                    <v-img
                      class="size-img"
                      v-for="(image,index) in product.images"
                      :key="index"
                      :src="image_url(image.url)"
                    />
                  </v-col>


                  <v-file-input
                    label="Avatar do Serviço"
                    required
                    multiple
                    id="files"
                    ref="files"
                    v-model="files"
                  />
                </v-row>

                <v-row
                  align="center"
                  justify="center"
                >
                  <v-btn class="mr-4" @click="beforeSubmit" color="primary"> 
                    <span v-if="!loading"> {{button_action}}  </span> 
                    <v-progress-circular v-if="loading" indeterminate color="blue" />
                  </v-btn>
                  <v-btn @click="clear" color="error"> Cancelar </v-btn>
                </v-row>

              </form>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import { validationMixin } from 'vuelidate'
  import { required, maxLength, email } from 'vuelidate/lib/validators'
  import { securedAxiosInstance } from '../plugins/axios'

  export default {
    mixins: [validationMixin],

    validations: {
      product: {
        price: { required },
        description: { required },
        details: {
          duration: { required }
        }
      },

      establishment: { required },
      category: { required },
      subcategory: { required }
    },

    data () {
      return {
        dialog: false,
        notifications: false,
        sound: true,
        widgets: false,
        loading: false,

        product: {
          title: "",
          price: "",
          description: "",
          details: {
            duration: "",
          },
        },

        category: [],
        categories: [],
        establishment: {},
        establishments: [],
        subcategories: [],
        subcategory: {},

        files: [],

        title: "Cadastro de Serviço",
        product_id: this.$route.params.id,
        edit: false,
        button_action: "Cadastrar"

      }
    },

    created() {
      this.establishment = this.$store.state.selectedEstablishment
    },

    mounted() {
      this.getEstablishments()
      this.getCategories()

      if ( this.product_id ) {
        this.title = "Edição de Serviço"
        this.edit = true
        this.button_action = "Editar"
        this.getProduct();
        this.getSubcategories();
      }
      window.addEventListener("keypress", e => {
        if (e.keyCode == 13 ) {
        this.beforeSubmit()
        }
	    });
    },

    computed: {

      productCategoryErrors () {
        const errors = []
        if (!this.$v.category.$dirty) return errors
        !this.$v.category.required && errors.push('Selecione uma categoria.')
        return errors
      },

      productSubcategoryErrors () {
        const errors = []
        if (!this.$v.subcategory.$dirty) return errors
        !this.$v.subcategory.required && errors.push('Selecione uma subcategoria.')
        return errors
      },

      productPriceErrors() {
        const errors = []
        if (!this.$v.product.price.$dirty) return errors
        !this.$v.product.price.required && errors.push('Insira o preço do Serviço.')
        return errors
      },

      productDescriptionErrors() {
        const errors = []
        if (!this.$v.product.description.$dirty) return errors
        !this.$v.product.description.required && errors.push('Insira a descrição do Serviço.')
        return errors
      },

      productDurationErrors () {
        const errors = []
        if (!this.$v.product.details.duration.$dirty) return errors
        !this.$v.product.details.duration.required && errors.push('Insira o tempo de duração.')
        return errors
      },

      productEstablishmentErrors() {
        const errors = []
        if (!this.$v.establishment.$dirty) return errors
        !this.$v.establishment.required && errors.push('Selecione um estabelecimento.')
        return errors
      }
    },

    methods: {

      handleFilesUploads() {
        this.files = this.$refs.files.files;
      },

      beforeSubmit() {
        this.submit()
      },

      async submit() {
        let response = null
        let formData = new FormData();
        let category_id = []
        this.loading = true

        this.category.forEach( cat => {
          category_id.push(cat.id)
        })

        formData.append('category_id', JSON.stringify(category_id))
        formData.append('subcategory', JSON.stringify(this.subcategory))
        formData.append('product', JSON.stringify(this.product))
        formData.append('establishment', JSON.stringify(this.establishment.id))
        formData.append('access_token', localStorage.getItem('access_token'))

        for( var i = 0; i < this.files.length; i++ ){
          let file = this.files[i];
          formData.append('images[' + i + ']', file);
        }

        if( this.edit ) {
          await securedAxiosInstance.patch(`/api/v1/private/products/${this.product_id}`, formData,
            { headers: {
              'Content-Type': 'multipart/form-data',
            } }
          )
          .then((result) => {
            response = result

          }).catch((err) => {
            response = err
          });

        } else {
          await securedAxiosInstance.post('/api/v1/private/products', formData,
            { headers: {
              'Content-Type': 'multipart/form-data',
            } },
          )
          .then((result) => {
            response = result
          }).catch((err) => {
            response = err
          });
        }

        if ( response.status == 201 || response.status == 200) {
          this.$v.$reset()
          this.product = {
            price: "",
            description: "",
            details: {
              validate: "",
            },
          },
          this.files = ''
          this.$router.push('/admin/products')
        }
        this.loading = false
      },

      async getEstablishments() {
        let response = null

        await securedAxiosInstance.get(`/api/v1/private/establishments`,
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
          this.establishments = response.data
        }
      },

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

      async getProduct() {
        let response = null
        await securedAxiosInstance.get(`/api/v1/private/products/${this.product_id}`,
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
          this.product = response.data
          this.establishment = response.data.establishment
          this.category = response.data.category_types


          setTimeout(() => {
            this.subcategory = response.data.subcategory
          }, 500);
        }
      },

      image_url( url ) {
        url = "http://" + url
        return url
      },

      clear() {
        this.$v.$reset()
          this.product = {
            title: "",
            price: "",
            description: "",
            details: {
              validate: "",
            },
          },
          this.files = ''
          this.dialog = false
      },

      async getSubcategories() {
        let response = null

        await securedAxiosInstance.get(`/api/v1/private/category_types/${this.category[0].id}/sub_categories`,
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
      }
    },

  }
</script>

<style scoped>
  .background-dialog {
    background-color:#fafafa;
    height: 100%;
  }

  .form-config {
    background-color: white !important;
  }

  .size-img {
    width: 400px;
  }
</style>

