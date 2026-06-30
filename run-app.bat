@echo off
setlocal

cd /d "%~dp0"

if not exist "node_modules" (
  echo Installing dependencies...
  where pnpm >nul 2>nul
  if not errorlevel 1 (
    pnpm install
  ) else if exist "%ProgramFiles%\nodejs\corepack.cmd" (
    "%ProgramFiles%\nodejs\corepack.cmd" pnpm install
  ) else (
    npm.cmd install
  )
  if errorlevel 1 exit /b 1
)

echo Starting the app...
echo Open the Local URL printed by Vite in your browser.
if exist "node_modules\.bin\vite.CMD" (
  "node_modules\.bin\vite.CMD" --host :: --port 8080
) else if exist "node_modules\.bin\pnpm.CMD" (
  "node_modules\.bin\pnpm.CMD" dev
) else (
  pnpm dev
)
