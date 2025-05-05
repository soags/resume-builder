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
  layout('./layout.tsx', [
    ...prefix('resumes', [
      index('./resumes/resumes.tsx'),
      route('edit/:resumeId', './resumes/edit/layout.tsx', [
        index('./resumes/edit/index.tsx'),
        route('basics', './resumes/edit/basics.tsx'),
        route('skill', './resumes/edit/skill.tsx'),
      ]),
    ]),
  ]),
] satisfies RouteConfig
