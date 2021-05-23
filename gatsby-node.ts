import path from 'path'
import { GatsbyNode } from 'gatsby'

export const onCreatePage: GatsbyNode['onCreatePage'] = async ({ page, actions }) => {
  const { createPage } = actions

  if (page.path.match(/^\/customer/)) {
    createPage({
      path: '/customer/:id',
      matchPath: '/customer/:id',
      component: path.resolve('./src/pages/customer.tsx'),
      context: null,
    })
  }

  if (page.path.match(/^\/edit-customer/)) {
    createPage({
      path: '/edit-customer/:id',
      matchPath: '/edit-customer/:id',
      component: path.resolve('./src/pages/edit-customer.tsx'),
      context: null,
    })
  }

  if (page.path.match(/^\/add-history/)) {
    createPage({
      path: '/add-history/:id',
      matchPath: '/add-history/:id',
      component: path.resolve('./src/pages/add-history.tsx'),
      context: null,
    })
  }
}
