import type { RouteRecordRaw } from 'vue-router'
import { defineComponent } from 'vue'

/**
* redirect: noredirect        When set to noredirect, the route is not clickable in the breadcrumb
* name:'router-name'          The route name; it is required, otherwise <keep-alive> misbehaves
* meta : {
    hidden: true              When true the route is hidden from the sidebar, e.g. 404 or login (default false)

    alwaysShow: true          When a route declares more than one child under children it automatically
                              becomes a nested menu. With a single child, that child is shown in the
                              sidebar as the root entry. Set alwaysShow: true to ignore that rule and
                              always show the root entry (default false)

    title: 'title'            The name shown for this route in the sidebar and breadcrumb

    icon: 'svg-name'          The icon of this route

    noCache: true             When true the route is not cached by <keep-alive> (default false)

    breadcrumb: false         When false the route is not shown in the breadcrumb (default true)

    affix: true               When true the tab of this route is pinned (default false)

    noTagsView: true          When true the route is not shown in the tags view (default false)

    activeMenu: '/dashboard'  The route path that stays highlighted

    canTo: true               When true the route can still be navigated to even if hidden is true (default false)

    permission: ['edit','add', 'delete']    The permissions required for this route
  }
**/

interface RouteMetaCustom extends Record<string | number | symbol, unknown> {
  hidden?: boolean
  alwaysShow?: boolean
  title?: string
  icon?: string
  noCache?: boolean
  breadcrumb?: boolean
  affix?: boolean
  activeMenu?: string
  noTagsView?: boolean
  canTo?: boolean
  permission?: string[]
}

declare module 'vue-router' {
  interface RouteMeta extends RouteMetaCustom {}
}

type Component<T = any> =
  | ReturnType<typeof defineComponent>
  | (() => Promise<typeof import('*.vue')>)
  | (() => Promise<T>)

declare global {
  declare interface AppRouteRecordRaw extends Omit<RouteRecordRaw, 'meta' | 'children'> {
    name: string
    meta: RouteMetaCustom
    component?: Component | string
    children?: AppRouteRecordRaw[]
    props?: Recordable
    fullPath?: string
  }

  declare interface AppCustomRouteRecordRaw
    extends Omit<RouteRecordRaw, 'meta' | 'component' | 'children'> {
    name: string
    meta: RouteMetaCustom
    component: string
    path: string
    redirect: string
    children?: AppCustomRouteRecordRaw[]
  }
}
