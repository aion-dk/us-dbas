import { defineStore } from "pinia";
import { ref } from "vue";
import { api } from "../lib/api";

export default defineStore("useBoardStore", () => {
  const items = ref([]);
  const meta = ref({});
  const currentPage = ref(null);

  const loadPage = async (slug: string, page: number) => {
    if (currentPage.value === page) return

    const url = `/${slug}/board?page=${page}`;
    const { data } = await api.get(url);
    items.value = data.items;
    meta.value = data.meta;
    currentPage.value = page;
  };

  return { items, meta, loadPage, currentPage };
});
