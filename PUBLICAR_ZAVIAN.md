# Publicar ZAVIAN como web accesible desde cualquier lugar

## Método usado por BRITHIDA: Render + GitHub

El archivo `render.yaml` ya deja configurado ZAVIAN como sitio estático gratuito en Render. Al conectar el repositorio de GitHub en Render, el servicio publica la carpeta `digital` y entrega una dirección `onrender.com` que funciona desde PC y celular.

Como ZAVIAN guarda los cambios en el navegador, cada dispositivo mantiene sus propios datos. Para compartir los mismos datos entre PC y teléfono habrá que agregar sincronización online después.

## Estado actual

- El panel es responsive para PC y celular.
- Tiene modo servidor local en `Abrir_ZAVIAN_Red.cmd`.
- Tiene manifest y service worker para instalarlo como PWA cuando esté publicado por HTTPS.
- Los datos actuales se guardan en el navegador. Eso sirve para probar, pero todavía no sincroniza automáticamente entre PC y teléfono.

## Qué falta para que sea una web real con datos compartidos

1. Crear o conectar una cuenta de hosting, por ejemplo Vercel.
2. Publicar la carpeta `ZAVIAN/digital`.
3. Crear una base online, por ejemplo Supabase.
4. Integrar autenticación y sincronización remota para proveedores, contactos, productos y ventas.
5. Probar desde un teléfono con datos móviles y Wi-Fi distinto.

## Configuración preparada para Vercel

El archivo `vercel.json` ya está creado en la carpeta `ZAVIAN`. Al publicar el proyecto, la raíz abrirá automáticamente `digital/index.html`, junto con el manifest, service worker e ícono instalable.

También queda disponible `Publicar_ZAVIAN.cmd`: en una PC con Node.js/Vercel autenticado, se puede ejecutar para publicar en producción.

## Alternativa gratuita: GitHub Pages

La carpeta `.github/workflows/deploy-pages.yml` deja preparada la publicación automática del panel estático. Requiere un repositorio GitHub y activar GitHub Pages con **GitHub Actions**. El servicio es apto para esta web estática y no necesita comprar dominio.

No se pueden completar los puntos 1, 3 y 4 sin autorización/cuentas del usuario: requieren acceso externo y credenciales. No se deben guardar credenciales dentro del código.

## Prueba local desde el teléfono

En la PC, ejecutar `Abrir_ZAVIAN_Red.cmd`, mantener abierta la ventana del servidor y entrar desde el teléfono a la dirección `http://IP-DE-LA-PC:8765` que aparece en esa ventana. Ambos dispositivos deben estar en la misma Wi-Fi.

Esto es una prueba de red local, no una publicación pública. Para entrar desde cualquier lugar hace falta completar el despliegue en hosting y la base online.
