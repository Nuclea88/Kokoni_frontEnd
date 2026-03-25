Kokoni - Frontend
Introducción (General)
Bienvenido al frontend de Kokoni, un gestor avanzado de medios y lecturas enfocado principalmente en mangas, manhwas y otros formatos. Esta interfaz de usuario permite a los lectores buscar, descubrir y hacer seguimiento de su progreso de lectura mediante una experiencia visual atractiva y fluida, construida sobre tecnologías web modernas.

Kokoni Frontend está desarrollado principalmente con React (Vite) y diseñado utilizando Tailwind CSS para ofrecer un entorno de usuario altamente personalizable, responsivo y adaptado tanto a escritorio como a móvil.

Detalles Técnicos (Específico)
Tecnologías Utilizadas
React.js (Vite): Framework principal para renderizar la UI de manera eficiente y rápida.
Tailwind CSS: Para el estilado de componentes y un sistema de diseño consistente basado en clases de utilidad.
React Router DOM: Manejo de rutas, navegación privada (PrivateRoute) y estado en el flujo de la aplicación.
Lucide React: Colección de iconos modernos y ligeros.
Arquitectura de Componentes (Atomic Design)
El proyecto está estructurado bajo la filosofía de Diseño Atómico (Atomic Design) para maximizar la reutilidad:

/components/atoms: Componentes básicos indivisibles (Ej. 
Button.jsx
, 
Tag.jsx
, 
Input.jsx
).
/components/molecules: Agrupación simple de átomos (Ej. 
MediaCard.jsx
, 
MangaListItem.jsx
).
/components/organisms: Estructuras complejas o secciones completas (Ej. 
TopNavbar.jsx
, 
BottomNavbar.jsx
).
/pages: Las vistas principales que usan directamente el router (Ej. 
Home.jsx
, 
Explore.jsx
, 
Settings.jsx
).
Enfoque de Accesibilidad y Buenas Prácticas
Se sigue un plan de mejora continua enfocado a reemplazar iterativamente contenedores genéricos (<div>, <span>) por HTML semántico (<main>, <article>, <section>, <nav>). Aquellos elementos que tienen interactividad (ej. onClick="...") deben renderizar etiquetas interactuables como <button> o tener manejadores de teclado accesibles (tabIndex, onKeyDown).

Configuración y Despliegue
Para correr el proyecto en local:

Asegúrate de tener Node.js instalado.
Clona el repositorio y navega a /Kokoni_Front/Kokoni_frontEnd/kokoni.
Ejecuta npm install para instalar dependencias.
Ejecuta npm run dev para levantar el servidor de desarrollo de Vite.