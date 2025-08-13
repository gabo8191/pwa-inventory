# Research Information PWA

Progressive Web App para recolección de información de investigación con funcionalidad offline completa.

## ✨ Características

- **PWA completa**: Instalable en dispositivos móviles y desktop
- **Funciona offline**: Los datos se guardan localmente y se sincronizan automáticamente
- **Formulario completo**: 15 campos organizados en 4 secciones
- **Diseño responsive**: Optimizado para móviles y desktop
- **Validación en tiempo real**: Feedback inmediato al usuario

## 🚀 Instalación y Uso

### Desarrollo

```bash
npm install
npm run dev
```

### Producción

```bash
npm run build
npm run preview
```

### Instalar como App

1. **Navegadores Desktop (Chrome/Edge)**: Busca el ícono de instalación en la barra de direcciones
2. **Android**: Menú → "Añadir a pantalla de inicio"
3. **iOS**: Safari → Compartir → "Añadir a pantalla de inicio"

## 📋 Campos del Formulario

### Información Personal

- Nombre completo
- Email
- Teléfono
- Fecha de nacimiento

### Información Profesional

- Ocupación
- Empresa/Organización
- Nivel de experiencia
- Nivel educativo

### Información de Investigación

- Área de investigación
- Título del proyecto
- Descripción del proyecto
- Presupuesto

### Información Adicional

- Método de contacto preferido
- Fecha de disponibilidad
- Notas adicionales

## 🛠️ Tecnologías

- React 19 + TypeScript
- Tailwind CSS v4
- Vite + PWA Plugin
- React Hook Form + Zod
- Workbox (Service Worker)

## 📡 API

El formulario envía datos a:

```
POST http://localhost:3005/api/research-info
```

Los datos se guardan automáticamente offline si no hay conexión.
