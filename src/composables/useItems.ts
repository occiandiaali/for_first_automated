// composables/useUsers.ts
import { ref, onMounted } from 'vue';
import axios from 'axios';

interface Item {
  _id: string;
  itemName: string;
  qty: number;
  itemPrice: number;
  checked: boolean
  // Add other fields from your schema
}

export function useItems() {
  const items = ref<Item[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  const fetchItems = async () => {
    loading.value = true;
    try {
      //https://server-for-first-automated.onrender.com
      //const response = await axios.get<Item[]>('http://localhost:3000/api/user/items', {withCredentials:true});
      const response = await axios.get<Item[]>(`${process.env.VUE_APP_API_BASE_URL}/api/user/items`, {withCredentials:true});
      items.value = response.data;
    } catch (err) {
      error.value = 'Failed to fetch items';
      console.error(err)
    } finally {
      loading.value = false;
    }
  };

  onMounted(fetchItems);

  return { items, loading, error };
}
