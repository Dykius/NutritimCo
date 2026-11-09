# NutritimCo · Prototipo navegable

Prototipo de la página de recomendaciones saludables NutritimCo, hecho para la Actividad de Construcción Aplicada de Ingeniería Web (CUN Digital). Está construido solo con HTML, CSS y JavaScript, sin frameworks ni pasos de compilación.

## Cómo abrirlo

Abre `index.html` en el navegador. No necesita servidor. Las fotos y las tipografías se cargan desde internet, así que sin conexión verás bloques de color con la descripción de cada foto.

## Despliegue en GitHub Pages

1. Sube la carpeta completa a un repositorio (con `index.html` en la raíz).
2. En el repositorio entra a Settings › Pages.
3. En Source elige "Deploy from a branch", la rama `main` y la carpeta `/ (root)`. Guarda.
4. Espera uno o dos minutos y abre el enlace que aparece. Pruébalo en una ventana de incógnito antes de ponerlo en el informe.

En Netlify o Vercel basta con importar el repositorio. No hay comando de compilación y la carpeta de publicación es la raíz.

## Cuentas de prueba

| Cuenta | Para qué sirve |
| --- | --- |
| laura@correo.com | Usuaria con perfil, favoritos y hábitos de ejemplo |
| editor@nutritimco.example | Acceso al panel del editor |

Sirve cualquier contraseña de 8 caracteres o más. El inicio de sesión es simulado: el prototipo no guarda contraseñas. También puedes crear una cuenta nueva.

Los datos se guardan en el navegador (localStorage). El enlace "Reiniciar datos de prueba" del pie de página devuelve todo al estado inicial.

## Flujos para probar

- **A. Registro y personalización:** Inicio › Crear mi perfil › registro › perfil de salud en 3 pasos › Para ti.
- **B. Buscar y guardar:** Inicio › Explorar › buscar y filtrar › detalle › Guardar en favoritos › Favoritos.
- **C. Hábito:** detalle › Añadir como hábito › Hábitos › marcar el hábito del día.
- **D. Publicar contenido:** ingresar como editor › Panel del editor › Nueva recomendación › Publicar › verla en Explorar.
- **E. Privacidad:** menú de la cuenta › Privacidad y datos › consentimientos › descargar o eliminar datos.

## Rutas

| Pantalla | Ruta |
| --- | --- |
| 1. Inicio | `#/inicio` |
| 2. Registro e inicio de sesión | `#/acceso?modo=registro` y `#/acceso?modo=ingresar` |
| 3. Perfil de salud | `#/perfil` |
| 4. Explorar | `#/explorar` |
| 5. Detalle | `#/r/ajiaco-liviano` (por ejemplo) |
| 6. Para ti | `#/para-ti` |
| 7. Favoritos | `#/favoritos` |
| 8. Hábitos | `#/habitos` |
| 9. Panel del editor | `#/editor` |
| 10. Privacidad y datos | `#/privacidad` |
| Política, términos y aviso médico | `#/legal` |
| Créditos y referencias | `#/creditos` |

Las pantallas 3, 6, 7, 8 y 10 piden iniciar sesión. La 9 pide la cuenta de editor.

## Estructura

```
index.html        Documento base
css/styles.css    Sistema visual del mockup y versión móvil
js/data.js        Catálogo, fotos con créditos y datos de ejemplo
js/store.js       Estado y persistencia (simula el backend)
js/ui.js          Componentes reutilizables: iconos, tarjeta, avisos, modales
js/views.js       Las 10 pantallas
js/app.js         Enrutador, encabezado, pie y acciones globales
```

## Créditos de las fotografías

| Foto | Autor | Fuente | Licencia |
| --- | --- | --- | --- |
| Plaza de mercado en Bogotá | Mussi Katz | [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Market_in_Bogot%C3%A1.jpg) | CC0 1.0 |
| Ajiaco | Mauricio Giraldo | [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Ajiaco.jpg) | CC BY-SA 2.0 |
| Lulos | Fibonacci | [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Lulo.jpg) | GFDL |
| Arepas | Leila Issa | [Unsplash](https://unsplash.com/photos/white-and-brown-pastry-on-black-tray-4C_k18o_tnk) | Licencia Unsplash |
| Caminata | Alexander Ramsey | [Unsplash](https://unsplash.com/photos/woman-walking-along-pathway-during-daytime-f8nHGR0kOqA) | Licencia Unsplash |
| Estiramiento | GMB Fitness | [Unsplash](https://unsplash.com/photos/a-woman-doing-a-yoga-pose-on-a-mat-VLpbB4YlNiw) | Licencia Unsplash |
| Sentadilla | GMB Fitness | [Unsplash](https://unsplash.com/photos/a-man-sitting-on-the-floor-stretching-his-legs-9v1rPKsE4cU) | Licencia Unsplash |
| Descanso nocturno | Slaapwijsheid.nl | [Unsplash](https://unsplash.com/photos/a-woman-is-sleeping-in-a-bed-with-a-blue-comforter-cpmodOdIdKc) | Licencia Unsplash |
| Habitación tranquila | Allen Y | [Unsplash](https://unsplash.com/photos/an-unmade-bed-in-a-dark-quiet-bedroom-Mb1cVr467w4) | Licencia Unsplash |
| Pausa para descansar | Dmitry Ganin | [Unsplash](https://unsplash.com/photos/a-woman-lying-in-a-bed-Z56eN0CGtyk) | Licencia Unsplash |
| Respirar con calma | Akson | [Unsplash](https://unsplash.com/photos/woman-closed-eye-sitting-outdoor-during-daytime-CNCL8wdRIQY) | Licencia Unsplash |
| Diario de gratitud | Mark Casey | [Unsplash](https://unsplash.com/photos/a-notebook-with-writing-and-a-camera-on-top-of-it-O7fUXu51S7w) | Licencia Unsplash |
| Pausa en el parque | Dmitriy Frantsev | [Unsplash](https://unsplash.com/photos/a-woman-sitting-on-a-wooden-bench-in-a-park-v9syWPe4jYs) | Licencia Unsplash |

Antes de citar las tres fotos de Wikimedia Commons, abre su enlace y confirma el autor y la licencia.

## Aclaraciones

- Es un prototipo académico. El inicio de sesión, los correos y la base de datos son simulados.
- Los textos de las recomendaciones son de ejemplo y no fueron revisados por un profesional de la salud.
- El correo privacidad@nutritimco.example es ficticio.
- Las medidas técnicas de seguridad (HTTPS, cifrado de contraseñas, control de acceso en el servidor) son lineamientos para una implementación real.
- Tipografías: Young Serif y Atkinson Hyperlegible (Google Fonts, licencia SIL OFL). Los iconos son SVG de línea dibujados para el proyecto.
