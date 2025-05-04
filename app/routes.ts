import {
  index,
  layout,
  prefix,
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
  ...prefix('auth', [
    route('google', './routes/auth/google.tsx', [
      route('callback', './routes/auth/google.callback.tsx'),
    ]),
  ]),
] satisfies RouteConfig
