import { authenticator } from '~/services/auth.server'

export const loader = ({ request }: { request: Request }) =>
  authenticator.authenticate('google', request)
