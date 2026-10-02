import { createRootRoute, createRoute, createRouter, ErrorComponent } from '@tanstack/react-router'
import { DashboardPage } from './pages/Dashboard.page'
import { LoginPage } from './pages/Login.page'
import { LayoutPage } from './pages/Layout.page'
import { UserLayoutPage } from './pages/UserLayout.page'
import { NotFoundPage } from './pages/NotFound.page'
import { FeaturePage } from './pages/Feature.page'
import { AddEditPage } from './pages/AddEdit.page'
import { ViewPage } from './pages/View.page'
import { Feature } from './types'

const rootRoute = createRootRoute({
  component: LayoutPage,
  notFoundComponent: NotFoundPage,
  errorComponent: ErrorComponent,
})
const userLayoutRouter = createRoute({
  component: UserLayoutPage,
  id: 'user-layout',
  getParentRoute: () => rootRoute,
})

const routeTree = rootRoute.addChildren([
  createRoute({ getParentRoute: () => rootRoute, path: '/login', component: LoginPage }),
  userLayoutRouter.addChildren([
    createRoute({
      getParentRoute: () => userLayoutRouter,
      path: '/',
      component: DashboardPage,
    }),
    createRoute({
      getParentRoute: () => userLayoutRouter,
      path: '$feature',
      validateSearch: (search) =>
        search as {
          [K in keyof Feature]?: Feature[K]['queryparam']
        },
      component: FeaturePage,
    }),
    createRoute({
      getParentRoute: () => userLayoutRouter,
      path: '$feature/add',
      component: AddEditPage,
    }),
    createRoute({
      getParentRoute: () => userLayoutRouter,
      path: '$feature/$id',
      component: ViewPage,
    }),
    createRoute({
      getParentRoute: () => userLayoutRouter,
      path: '$feature/$id/edit',
      component: AddEditPage,
    }),
  ]),
])

const router = createRouter({ routeTree })

export { router }
