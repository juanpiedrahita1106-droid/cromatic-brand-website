@echo off
set PATH=C:\Program Files\Git\cmd;%PATH%
copy "c:\Users\juanp\OneDrive\Escritorio\Cromatic Brand\Imagenes cromatic\Logo Camaleon.png" "c:\Users\juanp\OneDrive\Escritorio\Cromatic Brand\Cromatic BrandWebsite\assets\img\"
git add .
git commit -m "Añadir favicon (Logo Camaleon)"
git push origin master
