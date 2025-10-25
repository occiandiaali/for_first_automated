// composables/useUsers.ts
import { ref, onMounted } from 'vue';
import axios from 'axios';

interface User {
  _id: string;
  name: string;
  email: string;
  // Add other fields from your schema
}

export function useUsers() {
  const users = ref<User[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  const fetchUsers = async () => {
    loading.value = true;
    try {
      const response = await axios.get<User[]>('http://localhost:3000/api/admin/staff', {withCredentials:true});
      users.value = response.data;
    } catch (err) {
      error.value = 'Failed to fetch users';
      console.error(err)
    } finally {
      loading.value = false;
    }
  };

  onMounted(fetchUsers);

  return { users, loading, error };
}
