import React, { Suspense, lazy, ComponentType } from 'react'
import { Route, Switch } from 'react-router-dom'

const routes: { path: string; component: React.LazyExoticComponent<ComponentType<any>> }[] = [
  {
    path: '/',
    component: lazy(() => import('../pages'))
  },
]

export default function Routes() {
  return (
    <Suspense fallback={<h1>loading...</h1>}>
      <Switch>
        {routes.map((route, key) => {
          return <Route key={key} exact={true} path={route.path} component={route.component} />
        })}
      </Switch>
    </Suspense>
  )
}
