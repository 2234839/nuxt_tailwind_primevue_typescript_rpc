import { useAuth } from '~/composables/useAuth'

export default defineNuxtRouteMiddleware((to, from) => {
  const { isAuthenticated, checkAuth } = useAuth()
  // 检查认证状态
  checkAuth()
  // 如果用户未认证且不是访问登录页，则重定向到登录页
  if (!isAuthenticated.value && to.path !== '/login') {
    // return navigateTo('/login')
  }
})

