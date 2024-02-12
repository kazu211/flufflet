export default defineNuxtRouteMiddleware((to, from) => {
  const user = useLoginUser()
  if (!user.auth && to.path !== '/login') {
    const path = '/login'
    return { path }
  }
})
