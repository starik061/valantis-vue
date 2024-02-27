<template>
  <Loader :isLoading="isLoading" />
  <div class="main-container">
    <HeaderBar @filtration="doProductsFiltration" />
    <MainContent v-if="!isLoading" :fullProductsData="fullProductsData" :page="page" @pageChanged="changePage" />
    <FooterBar class="footer" />

  </div>
</template>

<script>
import Loader from "@/components/Loader.vue";
import HeaderBar from "@/components/HeaderBar.vue";
import MainContent from "@/components/MainContent.vue";
import FooterBar from "@/components/FooterBar.vue";

import { getProductData, getProductImages } from "@/api/index.js"

import placeholderImage from "@/assets/placeholder_image.jpg";



export default {
  components: { Loader, HeaderBar, MainContent, FooterBar },

  data() {
    return {
      productIDs: [],
      filteredProductIDs: [],
      fullProductsData: [],
      isLoading: true,
      isRetryAttempted: false,
      page: 1,
      isFiltration: false,
    }
  },
  methods: {
    async changePage(page) {
      this.page = page;
      this.fullProductsData = [];
      if (!this.isFiltration) {
        this.getProducts()
      } else {
        this.doProductsFiltration()
      }
    },

    async getProducts() {
      this.isLoading = true;
      let offset = (this.page - 1) * 50;
      let limit = 50;
      let params = {
        offset, limit
      }

      try {
        let response = await getProductData("get_ids", params);
        this.productIDs = response;

        response = await getProductData("get_items", { "ids": this.productIDs });

        // Фильтруем response, оставляя только первый объект с уникальным id
        const uniqIds = new Set();

        response.filter(product => {
          if (!uniqIds.has(product.id)) {
            uniqIds.add(product.id);
            this.fullProductsData.push(product);
            return true;
          }
          return false;
        });

        limit = 1;
        offset = offset + this.productIDs.length + 1;

        while (this.fullProductsData.length < 50) {
          params = {
            offset, limit
          }
          let oneIDResponse = await getProductData("get_ids", params);
          if (!oneIDResponse || oneIDResponse.length < 1) { break };

          let oneFullProductResponse = await getProductData("get_items", { "ids": oneIDResponse });

          // Фильтруем response, оставляя только первый объект с уникальным id
          oneFullProductResponse.filter(product => {
            if (!uniqIds.has(product.id)) {
              uniqIds.add(product.id);
              this.productIDs.push(product);
              this.fullProductsData.push(product);
              return true;
            }
            offset += 1;
            return false;
          });
        }

        // ДОбавляем к инфе о товарах рандомные картинки.

        const imgDataResponse = await getProductImages(this.fullProductsData.length, this.page);

        this.fullProductsData.forEach((product, productIndex) => {
          product.image = imgDataResponse[productIndex]?.webformatURL
            ? imgDataResponse[productIndex]?.webformatURL : placeholderImage
        })
      } catch (error) {
        console.error('Произошла ошибка:', error.message);

        // Проверяем, была ли уже сделана попытка повторного запроса
        if (!this.isRetryAttempted) {
          console.log('Повторный запрос...');
          this.isRetryAttempted = true;

          await this.getProducts();
        } else {
          console.error('Повторная попытка выполнения запроса не удалась');
        }
      }
      this.isLoading = false;
    },

    async doProductsFiltration({ filtrationField, filterQuery }) {
      this.isFiltration = true;
      let params = {
        [filtrationField]: filterQuery,
      }
      // let offset = (this.page - 1) * 50;
      // let limit = 50;

      try {
        this.isLoading = true;

        this.filteredProductIDs = await getProductData("filter", params);
        this.productIDs = this.filteredProductIDs.slice(0, 50);

        this.fullProductsData = await getProductData("get_items", { "ids": this.productIDs });

        // ДОбавляем к инфе о товарах рандомные картинки.

        const imgDataResponse = await getProductImages(this.fullProductsData.length, this.page);

        this.fullProductsData.forEach((product, productIndex) => {
          product.image = imgDataResponse[productIndex]?.webformatURL
            ? imgDataResponse[productIndex]?.webformatURL : placeholderImage
        })

      } catch (error) {
        console.error('Произошла ошибка:', error.message);

        // Проверяем, была ли уже сделана попытка повторного запроса
        if (!this.isRetryAttempted) {
          console.log('Повторный запрос...');
          this.isRetryAttempted = true;

          await this.doProductsFiltration();
        } else {
          console.error('Повторная попытка выполнения запроса не удалась');
        }
      }
      this.isLoading = false;
    },
  },

  async mounted() {
    await this.getProducts()
  }
}
</script>

<style scoped lang="scss">
.main-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  position: relative;
}

.footer {
  margin-top: auto;
}
</style>
