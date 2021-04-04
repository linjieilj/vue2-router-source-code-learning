import runQueqe from "../util/async"

// 基础类，共享hash和html5的公共方法
export default class HistoryBase {
  constructor(router) {
    this.router = router
    this.routerTable = router.routerTable
    this.current = null
  }

  listen(cb) {
    this.cb = cb
  }

  transitionTo(target) {
    const route = this.routerTable.match(target)

    //路由守卫
    this.confirmTransition(route, () => {
      // 路由更新
      this.updateRoute(route)
    })
  }

  confirmTransition(route, onComplete, onAbort) {
    if (route == this.current) {
      return
    }

    const queue = [
      ...this.router.beforeHooks,
      route.beforeEnter,
      route.component.beforeRouterEnter.bind(route.instance),
      ...this.router.resolveHooks
    ]

    const iterator = (hook, next) => {
      hook(route, this.current, (to) => {
        if (to === false) {
          onAbort && onAbort(to)
        } else {
          next(to)
        }
      })
    }

    runQueqe(queue, iterator, () => onComplete())
  }

  updateRoute(route) {
    const from = this.current
    this.current = route
    this.cb(this.current)
    this.router.afterHooks.forEach(hook => {
      hook && hook(route, from)
    })
  }
}