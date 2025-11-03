import axios from "axios";

export async function fetchUserAuth() {
  try {
    const response = await axios.get("https://server-for-first-automated.onrender.com/api/auth/check", {
      withCredentials: true,
    });
    //     const response = await axios.get("http://localhost:3000/api/auth/check", {
    //   withCredentials: true,
    // });

    return response.data; // ✅ Return full user object
  } catch (error) {
    console.error("User fetch failed:", error);
    return { authenticated: false };
  }
}
