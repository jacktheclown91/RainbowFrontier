@echo off
setlocal EnableDelayedExpansion
cd /d "%~dp0"
set LIMIT=13312
set OUT=RainbowFrontier_release.zip
set BUILT=tools\build\dist\index.html

REM --- syntax check readable source JS ---
for %%F in (src\*.js) do (
  node --check "%%F"
  if errorlevel 1 (
    echo ERROR: JS syntax check failed: %%F
    exit /b 1
  )
)

REM --- build: inline source + terser + roadroller -> dist/index.html ---
if not exist "tools\build\node_modules" (echo ERROR: build deps missing - run: cd tools\build ^&^& npm ci & exit /b 1)
pushd tools\build
node build.mjs
set BERR=!errorlevel!
popd
if not "!BERR!"=="0" (echo ERROR: build/pack failed & exit /b 1)
if not exist "%BUILT%" (echo ERROR: built release not produced & exit /b 1)

REM --- zip the built self-contained release ---
if exist "%OUT%" del /q "%OUT%"
python tools\build\maxzip.py "%BUILT%" "%OUT%" 2>nul
if errorlevel 1 py -3 tools\build\maxzip.py "%BUILT%" "%OUT%" 2>nul
if errorlevel 1 node tools\build\zip.mjs "%BUILT%" "%OUT%"
if errorlevel 1 powershell -NoProfile -Command "Compress-Archive -LiteralPath '%BUILT%' -DestinationPath '%OUT%' -CompressionLevel Optimal"
if not exist "%OUT%" (echo ERROR: release zip not produced & exit /b 1)
for %%A in ("%OUT%") do set SIZE=%%~zA
set /a LEFT=%LIMIT%-!SIZE!
echo FINAL ZIP: !SIZE! / %LIMIT%
echo REMAINING: !LEFT!
if !LEFT! LSS 0 (echo ERROR: OVER LIMIT & exit /b 1)
echo OK
endlocal
