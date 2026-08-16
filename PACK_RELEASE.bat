@echo off
setlocal EnableDelayedExpansion
cd /d "%~dp0"
set LIMIT=13312
set OUT=RainbowFrontier_release.zip
set BUILT=tools\build\dist\index.html

REM --- syntax check dev source JS ---
powershell -NoProfile -Command "$h=Get-Content -Raw -LiteralPath 'index.html'; $m=[regex]::Match($h,'(?s)<script>(.*)</script>'); if(-not $m.Success){exit 2}; Set-Content -LiteralPath ($env:TEMP+'\rf_chk.js') -Value $m.Groups[1].Value -Encoding UTF8"
node --check "%TEMP%\rf_chk.js"
if errorlevel 1 (echo ERROR: JS syntax check failed & exit /b 1)

REM --- build: terser minify + roadroller pack -> tools\build\dist\index.html ---
if not exist "tools\build\node_modules" (echo ERROR: build deps missing - run: cd tools\build ^&^& npm i & exit /b 1)
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
if errorlevel 1 powershell -NoProfile -Command "Compress-Archive -LiteralPath '%BUILT%' -DestinationPath '%OUT%' -CompressionLevel Optimal"
for %%A in ("%OUT%") do set SIZE=%%~zA
set /a LEFT=%LIMIT%-!SIZE!
echo FINAL ZIP: !SIZE! / %LIMIT%
echo REMAINING: !LEFT!
if !LEFT! LSS 0 (echo ERROR: OVER LIMIT & exit /b 1)
echo OK
endlocal
