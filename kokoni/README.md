# Kokoni - Frontend

## Introducción (General)
Bienvenido al frontend de **Kokoni**, un gestor avanzado de medios y lecturas enfocado principalmente en mangas, manhwas y otros formatos. Esta interfaz de usuario permite a los lectores buscar, descubrir y hacer seguimiento de su progreso de lectura mediante una experiencia visual atractiva y fluida, construida sobre tecnologías web modernas.

Kokoni Frontend está desarrollado principalmente con React (Vite) y diseñado utilizando Tailwind CSS para ofrecer un entorno de usuario altamente personalizable, responsivo y adaptado tanto a escritorio como a móvil.

---

## Detalles Técnicos (Específico)
### Tecnologías Utilizadas
- **React.js (Vite):** Framework principal para renderizar la UI de manera eficiente y rápida.
- **Tailwind CSS:** Para el estilado de componentes y un sistema de diseño consistente basado en clases de utilidad.
- **React Router DOM:** Manejo de rutas, navegación privada (`PrivateRoute`) y estado en el flujo de la aplicación.
- **Lucide React:** Colección de iconos modernos y ligeros.

### Arquitectura de Componentes (Atomic Design)
El proyecto está estructurado bajo la filosofía de Diseño Atómico (*Atomic Design*) para maximizar la reutilidad:
- `/components/atoms:` Componentes básicos indivisibles (Ej. `Button.jsx`, `Tag.jsx`, `Input.jsx`).
- `/components/molecules:` Agrupación simple de átomos (Ej. `MediaCard.jsx`, `MangaListItem.jsx`).
- `/components/organisms:` Estructuras complejas o secciones completas (Ej. `TopNavbar.jsx`, `BottomNavbar.jsx`).
- `/pages:` Las vistas principales que usan directamente el router (Ej. `Home.jsx`, `Explore.jsx`, `Settings.jsx`).

### Enfoque de Accesibilidad y Buenas Prácticas
Se aplica un plan de Accesibilidad Web enfocado a utilizar HTML5 puramente semántico (`<main>`, `<article>`, `<section>`, `<nav>`, `<figure>`), reduciendo a la mínima expresión el uso de contenedores genéricos vacíos para mejorar el SEO y los lectores de pantalla. Las interacciones de la base de usuarios están ligadas a herramientas accesibles o manejadores explícitos.

### Configuración y Despliegue
Para correr el proyecto en local:
1. Asegúrate de tener Node.js instalado.
2. Clona el repositorio y navega a la carpeta de este backend.
3. Ejecuta `npm install` para instalar dependencias.
4. Ejecuta `npm run dev` para levantar el servidor de desarrollo de Vite.