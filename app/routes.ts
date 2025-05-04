import {
  index,
  layout,
  route,
  type RouteConfig,
} from '@react-router/dev/routes'

export default [
  index('./index.tsx'),
  layout('./layout.tsx', [
    route('editor', './editor/layout.tsx', [
      route('basics', './editor/basics.tsx'),
    ]),
  ]),
] satisfies RouteConfig
