<template>
  <div>
    <div class="card">
      <TabMenu :model="items" />
      <router-view />
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import TabMenu from "primevue/tabmenu";
export default {
  name: "App",
  setup() {
    const active = ref(3);
    const items = ref([
      {
        label: "Home",
        icon: "pi pi-fw pi-home",
        to: "/",
      },
      {
        label: "Products",
        icon: "pi pi-fw pi-calendar",
        to: "/products",
      },
    ]);

    return { active, items };
  },
  components: {
    TabMenu,
  },
};
</script>

<style scoped lang="scss">
::v-deep(.tabmenudemo-content) {
  padding: 2rem 1rem;
}
</style>