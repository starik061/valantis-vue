<template>
  <Loader :isLoading="isLoading" />
  <div class="main-container">
    <HeaderBar />
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
      fullProductsData: [],
      isLoading: true,
      isRetryAttempted: false,
      page: 1
    }
  },
  methods: {
    async changePage(page) {
      this.page = page;
      this.fullProductsData = [];
      this.getProducts()
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
              this.productIDs.push(response);
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
          console.log("img")
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
    }
  },

  async mounted() {
    await this.getProducts()
    // getProductData("get_fields")

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
