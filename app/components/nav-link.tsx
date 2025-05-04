import {
  NavLink as RouterNavLink,
  type NavLinkProps as RouterNavLinkProps,
} from 'react-router'
import { cn } from '~/lib/utils'

type NavLinkProps = RouterNavLinkProps

export function NavLink({ className, ...props }: NavLinkProps) {
  return (
    <RouterNavLink
      className={cn('text-blue-500 hover:underline', className)}
      {...props}
    />
  )
}
