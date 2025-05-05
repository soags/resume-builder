import {
  index,
  layout,
  prefix,
  route,
  type RouteConfig,
} from '@react-router/dev/routes'

export default [
  index('./home.tsx'),
  route('login', './auth/login.tsx'),
  route('logout', './auth/logout.tsx'),
  ...prefix('auth', [
    route('google', './auth/google.tsx', [
      route('callback', './auth/google-callback.tsx'),
    ]),
  ]),
  layout('./layout.tsx', [route('resumes', './resumes/resumes.tsx')]),
] satisfies RouteConfig
