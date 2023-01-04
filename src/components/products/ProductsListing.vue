<template>
  <div style="margin-top: -1px">
    <ProgressBar v-if="loading" mode="indeterminate" style="height: 0.3em" />
  </div>
  <div>
    <Toast />
    <Toast position="bottom-center" group="bc">
      <template #message="slotProps">
        <div class="flex flex-column">
          <div class="text-center">
            <i class="pi pi-exclamation-triangle" style="font-size: 3rem"></i>
            <h4>{{ slotProps.message.summary }}</h4>
            <p>{{ slotProps.message.detail }}</p>
          </div>
          <div class="grid p-fluid">
            <div class="col-6">
              <Button
                class="p-button-success"
                label="Yes"
                @click="onConfirm"
              ></Button>
            </div>
            <div class="col-6">
              <Button
                class="p-button-secondary"
                label="No"
                @click="onReject"
              ></Button>
            </div>
          </div>
        </div>
      </template>
    </Toast>
  </div>

  <Toolbar class="mb-4">
    <template #start>
      <Button
        label="New"
        icon="pi pi-plus"
        class="p-button-success mr-2"
        @click="ProductAdd"
      />
      <Button
        label="Delete"
        icon="pi pi-trash"
        class="p-button-danger"
        @click="confirmDeleteSelected"
      />
    </template>
  </Toolbar>

  <div>
    <DataTable :value="products" responsiveLayout="scroll">
      <Column
        selectionMode="multiple"
        style="width: 3rem"
        :exportable="false"
      ></Column>
      <template #header>
        <div class="table-header">Posts</div>
      </template>
      <Column field="id" header="Id" :sortable="true"> </Column>
      <Column field="title" header="Title"> </Column>
      <Column field="body" header="Body"> </Column>
      <Column header="Action">
        <template #body="slotProps">
          <Button
            icon="pi pi-pencil"
            class="p-button-rounded mr-2"
            @click="editProduct(slotProps.data.id)"
          />
          <Button
            icon="pi pi-trash"
            class="p-button-rounded p-button-danger mr-2"
            @click="showTemplate(slotProps.data.id)"
          />
        </template>
      </Column>
      <template #footer>
        In total there are
        {{ products ? products.length : 0 }} products.
      </template>
    </DataTable>
  </div>
  
</template>
<script>
import ProgressBar from "primevue/progressbar";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Toolbar from "primevue/toolbar";
import Button from "primevue/button";

import { useToast } from "primevue/usetoast";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useProductStore } from "@/store/product/ProductStore";
import { storeToRefs } from "pinia";

export default {
  name: "ProductListing",
  setup() {
    const store = useProductStore();
    const router = useRouter();
    const toast = useToast();

    const { products } = storeToRefs(store) || [];
    const deleteId = ref();
    const loading = ref(false);
    const formatCurrency = (value) => {
      if (value)
        return value.toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
        });
    };

    const editProduct = (id) => {
      router.push(`/products/edit/${id}`);
    };

    const ProductAdd = () => {
      router.push("/products/add");
    };

    const onConfirm = () => {
      loading.value = true;
      store.deleteProduct(deleteId.value).then(() => {
        toast.removeGroup("bc");
        loading.value = false;
        toast.add({
          severity: "success",
          summary: "Success",
          detail: "Successfully Deleted Post",
          life: 3000,
        });
      });
    };
    const onReject = () => {
      toast.removeGroup("bc");
      deleteId.value = "";
    };

    onMounted(() => {
      loading.value = true;
      if (products.value.length === 0) {
        store.allProducts().then(() => {
          loading.value = false;
        });
      } else {
        loading.value = false;
      }
    });

    const showTemplate = (id) => {
      deleteId.value = id;
      toast.add({
        severity: "warn",
        summary: "Are you sure?",
        detail: "Proceed to confirm",
        group: "bc",
      });
    };
    return {
      products,
      formatCurrency,
      ProductAdd,
      loading,
      editProduct,
      showTemplate,
      onConfirm,
      onReject,
    };
  },
  components: {
    ProgressBar,
    DataTable,
    Column,
    Toolbar,
    Button,
  },
};
</script>

<style lang="scss" scoped >
.table-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.product-image {
  width: 90px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
}
.flex {
  width: 100%;
}
</style>     
