import { defineStore } from "pinia";
import ProductService from "@/services/ProductService";
export const useProductStore = defineStore("products", {
  state: () => ({
    products: [],
  }),

  actions: {
    async allProducts() {
      try {
        await ProductService.getAll()
          .then((res) => {
            this.products = res.data;
            return this.products;
          })
          .catch((error) => {
            console.log(error);
          });
      } catch (error) {
        console.log(error);
        return error;
      }
    },
    async addProduct(data) {
      try {
        await ProductService.create(data).then((res) => {
          this.products.push(res.data);
        });
      } catch (error) {
        console.log(error);
        return error;
      }
    },
    async deleteProduct(id) {
      try {
        await ProductService.delete(id).then((res) => {
          this.products = this.products.filter((post) => post.id != id);
          return res.data;
        });
      } catch (error) {
        console.log(error);
        return error;
      }
    },
    async editProduct(data) {
      try {
        const editPostData = await ProductService.update(data).then((res) => {
          return res.data;
        });
        const newProducts = this.products.map((post) => {
          if (post.id === editPostData.id) {
            return { ...data };
          } else {
            return post;
          }
        });
        this.products = newProducts;
      } catch (error) {
        console.log(error);
        return error;
      }
    },
    async getProductById(id) {
      try {
        //Dummy API cant give updated data thats why we fetch form store
        // await ProductService.getById(id).then((res) => res.data)
        const postData = this.products.find((post) => {
          if (post.id == id) {
            return post;
          } else {
            return null;
          }
        });
        return postData;
      } catch (error) {
        console.log(error);
        return error;
      }
    },
  },
});
