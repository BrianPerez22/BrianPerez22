# Perfil de GitHub de Brian Pérez Herrera — Ecosistema TypeScript & React

Este repositorio contiene la interfaz completa de tu perfil (`BrianPerez22/BrianPerez22`), configurada con **TypeScript**, componentes **React (TSX)** y un sistema que **simula 2048-Petal de forma real** y regenera la animación en SVG con paleta **amarillo neón** y margaritas.

## 📁 Estructura del repositorio

```
├── README.md                      → El README principal de tu perfil
├── retro-terminal.svg             → Datos del perfil en formato consola borderless (amarillo neón)
├── 2048-terminal.svg              → Animación del 2048-Petal regenerada automáticamente
├── chispa-triangulo-amarillo-feliz.svg → Chispa (mascota y mentor de Elemental W en amarillo neón)
├── icons/                         → Íconos SVG estilizados en amarillo neón (incluye daisy.svg)
├── scripts/
│   ├── engine.ts                  → Motor de 2048 escrito en TypeScript con tipado estricto
│   ├── render.ts                  → Renderizador del SVG con paleta floral amarillo neón
│   ├── generate-2048.ts           → Script ejecutor TypeScript
│   └── components/                → Componentes React (TSX) para la UI
│       ├── NeonDaisy.tsx          → Componente React para la margarita neón
│       └── ProfileTerminal.tsx    → Componente React para la consola de datos
├── .gitattributes                 → Configura GitHub Linguist para mostrar TypeScript al 100%
├── tsconfig.json                  → Configuración de TypeScript y JSX React
└── package.json                   → Configuración de scripts y dependencias (TypeScript, React)
```

## 🚀 Cómo ejecutar o regenerar la animación localmente

```bash
# Ejecutar directamente el generador TypeScript
npm run generate
```
