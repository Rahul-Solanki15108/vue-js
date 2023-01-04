<template>
  <ProgressBar v-if="loading" mode="indeterminate" style="height: 0.3em" />
  <Toast />
  <div class="card">
    <div class="card-container blue-container">
      <div class="shadow-8 m-3 surface-card p-3 border-round-sm font-semibold">
        <form @submit.prevent="handleSubmit">
          <div class="card">
            <h2>{{ $route.params.id ? "Edit Post" : "Add Post" }}</h2>
            <div class="formgrid grid">
              <div class="field col-12 md:col-6">
                <label for="title">Title</label>
                <input
                  v-model="newPostData.title"
                  id="title"
                  type="text"
                  class="
                    text-base text-color
                    surface-overlay
                    p-2
                    border-1 border-solid
                    surface-border
                    border-round
                    appearance-none
                    outline-none
                    focus:border-primary
                    w-full
                  "
                />
              </div>
              <div class="field col-12">
                <label for="body">Body</label>
                <textarea
                  v-model="newPostData.body"
                  id="body"
                  type="text"
                  rows="4"
                  class="
                    text-base text-color
                    surface-overlay
                    p-2
                    border-1 border-solid
                    surface-border
                    border-round
                    appearance-none
                    outline-none
                    focus:border-primary
                    w-full
                  "
                ></textarea>
              </div>
            </div>
          </div>
          <div class="flex align-items-center justify-content-center">
            <Button
              type="submit"
              label="SUBMIT"
              class="p-button-rounded mr-3"
            />
            <Button
              @click="$router.push('/products')"
              label="CANCEL"
              class="p-button-rounded p-button-danger"
            />
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import Button from "primevue/button";
import { onBeforeMount, ref, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import ProgressBar from "primevue/progressbar";
import { useProductStore } from "@/store/product/ProductStore";
import { useToast } from "primevue/usetoast";

export default {
  name: "ProductAdd",
  setup() {
    const newPostData = ref({
      title: "",
      body: "",
      userId: 1,
    });
    const toast = useToast();
    const store = useProductStore();
    const router = useRouter();
    const route = useRoute();
    const loading = ref(false);
    watch(
      () => route.params.id,
      async (newId) => {
        newPostData.value = await store.getProductById(newId);
      }
    );

    const handleSubmit = () => {
      if (route.params.id) {
        loading.value = true;
        store
          .editProduct(newPostData.value)
          .then(() => {
            loading.value = false;
            toast.add({
              severity: "success",
              summary: "Success",
              detail: "Post Edited Successfully",
              life: 3000,
            });
            router.push("/products");
          })
          .catch((err) => {
            // toast.add({
            //   severity: "success",
            //   summary: "Success",
            //   detail: {{ ${this.err.message} }},
            //   life: 3000,
            // });
            console.log(err.message);
          });
      } else {
        loading.value = true;
        store
          .addProduct(newPostData.value)
          .then(() => {
            loading.value = false;
            router.push("/products");
          })
          .catch((err) => {
            console.log(err.message);
          });
      }
    };

    const fetchPostData = async (id) => {
      newPostData.value = await store.getProductById(id);
    };

    onBeforeMount(() => {
      if (route.params.id) {
        fetchPostData(route.params.id);
      }
    });

    return {
      newPostData,
      loading,
      handleSubmit,
    };
  },
  components: {
    Button,
    ProgressBar,
  },
};
</script>
