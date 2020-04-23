let url = 'http://localhost:8001';

new Vue({
  el: '#layer',
  data() {
    return {
      form: {
        product_name: '',
        price: '',
        description: ''
      },
      product: [],
      isLoading: false,
      sku: ''
    }
  },

  async mounted() {
   const response = await axios.get(`${url}/listingProduct`);
   this.isLoading = true;
   this.product = response.data;
  },

  methods: {
    async detailProduct(sku) {
      const response = await axios.get(`${url}/detailProduct/${sku}`);
      this.sku = response.data[0].sku;
      this.form = {
        product_name: response.data[0].product_name,
        price: response.data[0].price,
        description: response.data[0].description
      }
    },

    updateProduct() {
      const response = axios.put(`${url}/update/${this.sku}`, this.form);
      setTimeout(() => {
        location.reload();
      }, 1000)
    },

    deleteProduct(sku) {
      console.log('sku delete', sku);
    },
  }
})