import {
  ServicePortalModule,
  ServicePortalPath,
} from '@island.is/service-portal/core'
import { lazy } from 'react'

export const applicationsModule: ServicePortalModule = {
  name: 'Umsóknir',
  widgets: () => [
    {
      name: 'Umsóknir',
      weight: 0,
      render: () => lazy(() => import('./widgets')),
    },
  ],
  routes: (userInfo) => {
    const applicationRoutes = [
      {
        name: 'Umsóknir',
        path: ServicePortalPath.UmsoknirRoot,
        render: () =>
          lazy(() => import('./screens/ApplicationList/ApplicationList')),
      },
      {
        name: 'Umsóknir',
        path: [ServicePortalPath.UmsoknirOpnarUmsoknir],
        render: () => lazy(() => import('./lib/service-portal-applications')),
      },
      {
        name: 'Detention Request POC',
        path: ServicePortalPath.JudicialCreateDetentionPoc,
        render: () =>
          lazy(() =>
            import(
              '../../../../apps/judicial-system/web/src/routes/CreateDetentionRequest/CreateDetentionRequest'
            ),
          ),
      },
      {
        name: 'Detention Request POC',
        path: ServicePortalPath.JudicialDetentionRequestsPoc,
        render: () =>
          lazy(() =>
            import(
              '../../../../apps/judicial-system/web/src/routes/DetentionRequests/DetentionRequests'
            ),
          ),
      },
    ]

    return applicationRoutes
  },
}
