import { ref, reactive } from "vue";
import { useRouter, useCookie } from "nuxt/app";
import { ClientAPI } from "~/util/client.rpc";

export const useAuth = () => {
  const router = useRouter();
  const authCookie = useCookie("auth-token");
  const isAuthenticated = ref(false);
  const user = reactive({
    id: "",
    name: "",
    username: "",
  });

  const login = async (username: string, password: string) => {
    return await ClientAPI.user.login({
      password,
      username,
    });
  };

  const logout = () => {
    isAuthenticated.value = false;
    user.id = "";
    user.name = "";
    user.username = "";
    // 清除 cookie
    authCookie.value = null;
    // router.push("/login");
  };

  const checkAuth = () => {
    const token = authCookie.value;
    if (token) {
      isAuthenticated.value = true;
      // 这里你可能需要验证 token 并获取用户信息
    }
  };

  return {
    isAuthenticated,
    user,
    login,
    logout,
    checkAuth,
  };
};
