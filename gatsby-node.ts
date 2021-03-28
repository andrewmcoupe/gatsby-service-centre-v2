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
}
