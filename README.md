# Kubico – Jardineras modulares de madera

Kubico es una tienda en línea de jardineras modulares fabricadas con madera de origen sostenible. Desde esta aplicación puedes explorar el catálogo completo de productos, usar el configurador paso a paso para diseñar tu jardinera personalizada, generar un presupuesto imprimible y completar el proceso de compra — todo sin necesidad de conexión a internet una vez instalado.

---

## Requisitos previos — Instalar Node.js en Windows 11

Antes de ejecutar el proyecto necesitas tener instalado Node.js (versión 18 o superior) en tu ordenador.

**Instrucciones paso a paso (PowerShell):**

1. Abre PowerShell como Administrador (haz clic con el botón derecho en el botón Inicio → «Windows PowerShell (Administrador)»).
2. Comprueba si Node.js ya está instalado:
   ```
   node --version
   ```
   Si aparece un número de versión (por ejemplo `v22.0.0`) puedes saltar al siguiente apartado.
3. Descarga el instalador de Node.js desde la web oficial:
   - Visita https://nodejs.org en tu navegador.
   - Haz clic en el botón de descarga **«LTS»** (recomendado para la mayoría de usuarios).
   - Ejecuta el archivo `.msi` descargado y sigue el asistente de instalación (acepta todas las opciones predeterminadas).
4. Cierra PowerShell y vuelve a abrirlo; a continuación comprueba la instalación:
   ```
   node --version
   npm --version
   ```
   Ambos comandos deben mostrar números de versión.

---

## Ejecutar el proyecto en Windows 11

1. Abre PowerShell (sin necesidad de permisos de administrador esta vez).
2. Navega hasta la carpeta del proyecto Kubico:
   ```
   cd C:\ruta\hasta\kubico
   ```
   Sustituye `C:\ruta\hasta\kubico` por la ruta real donde guardaste el proyecto; por ejemplo:
   ```
   cd C:\Users\TuNombre\Downloads\kubico
   ```
3. Instala las dependencias del proyecto:
   ```
   npm install
   ```
   Esto puede tardar un minuto. Verás una barra de progreso y algunos mensajes — es normal.
4. Inicia el servidor de desarrollo:
   ```
   npm run dev
   ```
   Verás una salida similar a esta:
   ```
   VITE v8.x.x  listo en 300 ms
   ➜  Local:   http://localhost:5173/
   ```

---

## Abrir la aplicación en el navegador

Una vez que el servidor esté en marcha, abre tu navegador web y accede a:

```
http://localhost:5173
```

La aplicación Kubico se cargará. Puedes explorar los productos, usar el configurador, añadir artículos al carrito y completar el proceso de compra.

---

## Detener el servidor

Para detener el servidor de desarrollo, vuelve a la ventana de PowerShell donde está en ejecución y pulsa:

```
Ctrl + C
```

Escribe `S` y pulsa Intro si PowerShell te pide confirmación. El servidor se detendrá.

---

## Pila tecnológica (para desarrolladores)

- React 18 + TypeScript
- Vite 8 (herramienta de compilación)
- Tailwind CSS v4 (estilos)
- React Router v6 (navegación)
- localStorage (persistencia del carrito, sin backend)
