import axios from "axios";

export async function fetchUserAuth() {
  try {
    const response = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/api/auth/check`, {
      withCredentials: true,
    });

    return response.data; // ✅ Return full user object
  } catch (error) {
    console.error("User fetch failed:", error);
    return { authenticated: false };
  }
}
