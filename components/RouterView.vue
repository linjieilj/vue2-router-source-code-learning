<script>
export default {
  name: 'RouterView',
  render() {
    const route = this._routerRoot._routerRoot
    if (!route) {
      return
    }

    const { component } = route
    const hook = {
      init(vnode) {
        route.instance = vnode.componentInstance
        console.log("vnode:", vnode)
        console.log("instance:", vnode.componentInstance)
      }
    }
    return <component hook={hook}/>
  }
}
</script>