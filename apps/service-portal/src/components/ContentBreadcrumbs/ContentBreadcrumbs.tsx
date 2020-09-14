import React, { FC } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Breadcrumbs, Box, Hidden } from '@island.is/island-ui/core'
import {
  ServicePortalPath,
  ServicePortalNavigationItem,
} from '@island.is/service-portal/core'
import useNavigation from '../../hooks/useNavigation/useNavigation'

const reduce = (
  f: (
    acc: ServicePortalNavigationItem[],
    n: ServicePortalNavigationItem,
  ) => ServicePortalNavigationItem[],
  tree: ServicePortalNavigationItem,
  acc: ServicePortalNavigationItem[],
): ServicePortalNavigationItem[] => {
  const { children } = tree
  const newAcc = f(acc, tree)

  if (!children) return newAcc
  return children.reduce((iAcc, n) => reduce(f, n, iAcc), newAcc)
}

const ContentBreadcrumbs: FC<{}> = () => {
  const navigation = useNavigation()
  const location = useLocation()
  const items: ServicePortalNavigationItem[] = reduce(
    (acc, n) => {
      if (n.path && location.pathname.includes(n.path)) return [...acc, n]
      else return acc
    },
    {
      name: 'Mitt Ísland',
      path: ServicePortalPath.MinarSidurRoot,
      children: navigation,
    },
    [] as ServicePortalNavigationItem[],
  )

  if (items.length < 2) return null

  return (
    <Hidden below="lg">
      <Box paddingY={2}>
        <Breadcrumbs>
          {items.map(
            (item, index) =>
              item.path !== undefined && (
                <Link key={index} to={item.path}>
                  {item.name}
                </Link>
              ),
          )}
        </Breadcrumbs>
      </Box>
    </Hidden>
  )
}

export default ContentBreadcrumbs
