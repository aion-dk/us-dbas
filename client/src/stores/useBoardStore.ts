import { defineStore } from "pinia";
import { ref } from "vue";
import { api } from "../lib/api";

export default defineStore("boardStore", () => {
  const items = ref([]);
  const meta = ref({});
  const currentPage = ref(null);
  const currentFilter = ref([]);

  const loadPage = async (slug: string, page: number, filter: array) => {
    if (currentPage.value === page && filter == currentFilter.value) return;

    let url = `/${slug}/board?page=${page}`;
    filter.map((f) => (url = `${url}&filter[]=${f}`));
    const { data } = await api.get(url);

    items.value = data.items;
    meta.value = data.meta;
    currentPage.value = page;
  };

  return { items, meta, loadPage, currentPage, currentFilter };
});
