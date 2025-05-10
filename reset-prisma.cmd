@echo off
setlocal enabledelayedexpansion

echo Removing old migrations...
if exist prisma\migrations (
  rmdir /s /q prisma\migrations
)

echo Resetting the database...
call npx prisma migrate reset --force --skip-seed

echo Recreating the latest migration...
call npx prisma migrate dev --name init

echo Seeding the database...
call npx prisma db seed

echo Done!
endlocal