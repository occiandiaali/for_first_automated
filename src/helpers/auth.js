import { useRouter } from "vue-router";
import axios from "axios";

const router = useRouter();

export function getUserId() {
    return localStorage.getItem('userId');
}
export function storeUserId(id) {
    if (!id) throw new Error("Missing ID")
    localStorage.setItem('userId', id)
}

export function getUserRole() {
    return localStorage.getItem('userRole') || 'user';
}

export function storeUserRole(role) {
    if (!role) throw new Error("Missing role")
    localStorage.setItem('userRole', role)
}

export function storeUsername(name) {
    if (!name) throw new Error("Missing name")
    localStorage.setItem('userName', name)
}

export function getUserName() {
    return localStorage.getItem('userName') || '';
}

export function logoutUser() {
  axios.post('http://localhost:3000/api/auth/logout', {}, {withCredentials:true})
  .then(() => {
      localStorage.removeItem('userRole')
      localStorage.removeItem('userName')
      router?.push('/login')

  }).catch(e => console.error('Logout err ',e))
}