import { PrismaClient } from '@prisma/client'

let prisma: PrismaClient

declare global {
  // allow global `var` declarations
  // eslint-disable-next-line no-var
  var __db: PrismaClient | undefined
}

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient()
} else {
  if (!global.__db) {
    global.__db = new PrismaClient()
  }
  prisma = global.__db
}

export { prisma }
