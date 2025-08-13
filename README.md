# Research Information PWA

Progressive Web App para recolección de información de investigación con funcionalidad offline completa.

## ✨ Características

- **PWA completa**: Instalable en dispositivos móviles y desktop
- **Funciona offline**: Los datos se guardan localmente y se sincronizan automáticamente
- **Formulario completo**: 15 campos organizados en 4 secciones
- **Diseño responsive**: Optimizado para móviles y desktop
- **Validación en tiempo real**: Feedback inmediato al usuario
- **Sincronización automática**: Los datos offline se envían cuando se restablece la conexión
- **Indicador de estado**: Notificación visual del estado de conexión
- **Service Worker avanzado**: Caché inteligente para todos los recursos

## 🚀 Instalación y Uso

### Desarrollo

```bash
npm install
npm run dev
```

La aplicación se ejecutará en `http://localhost:5173`

### Producción

```bash
npm run build
npm run preview
```

El build de producción se ejecutará en `http://localhost:4173`

### Despliegue en Producción

La aplicación está completamente configurada para producción:

- ✅ **Service Worker**: Configurado con Workbox para caché offline
- ✅ **PWA Manifest**: Optimizado para instalación en móviles y desktop
- ✅ **Iconos PWA**: Incluye iconos de 192x192 y 512x512 con soporte maskable
- ✅ **Caché Strategy**: NetworkFirst para APIs, CacheFirst para recursos estáticos
- ✅ **Auto-update**: Actualización automática del Service Worker

**Archivos necesarios en producción:**

- `dist/` - Todos los archivos compilados
- `dist/sw.js` - Service Worker generado automáticamente
- `dist/manifest.webmanifest` - Manifest PWA
- `dist/pwa-*.png` - Iconos para la PWA

## 📱 Instalar como PWA

### 🖥️ Desktop (Chrome, Edge, Safari)

1. **Chrome/Edge**: Busca el ícono de instalación (⊕) en la barra de direcciones
2. **Firefox**: Menú → "Instalar aplicación"
3. **Safari**: Solo en macOS Monterey+ → Archivo → "Añadir a Dock"

### 📱 Android

1. **Chrome**: Menú (⋮) → "Añadir a pantalla de inicio" o "Instalar aplicación"
2. **Samsung Internet**: Menú → "Añadir página a" → "Pantalla de inicio"
3. **Firefox**: Menú → "Instalar"

### 🍎 iOS (iPhone/iPad)

1. **Safari**: Toca el botón Compartir (□↑) → "Añadir a pantalla de inicio"
2. **Chrome/Firefox**: No soportan instalación PWA, usar Safari

### ✨ Detección Automática

La aplicación incluye un botón flotante de instalación que:

- Se muestra automáticamente cuando la PWA es instalable
- Detecta la plataforma (iOS, Android, Desktop)
- Proporciona instrucciones específicas para cada dispositivo
- Se oculta una vez instalada la aplicación

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

- **Frontend**: React 19 + TypeScript
- **Estilos**: Tailwind CSS v4
- **Build**: Vite 7 + PWA Plugin
- **Formularios**: React Hook Form + Zod validation
- **PWA**: Workbox (Service Worker)
- **HTTP Client**: Axios
- **Iconos**: Lucide React + React Icons
- **Routing**: React Router DOM v7
- **Notificaciones**: React Toastify

## 📡 API y Sincronización

### Endpoint Principal

```
POST http://localhost:3005/api/research-info
```

### Funcionalidad Offline

- **Almacenamiento local**: Los datos se guardan en localStorage
- **Sincronización automática**: Al restaurar conexión, envía datos pendientes
- **Límite de almacenamiento**: Máximo 50 formularios offline
- **Reintentos automáticos**: Sistema de reintentos para envíos fallidos
- **Indicador visual**: Muestra estado de conexión en tiempo real

### Estrategias de Caché

- **API calls**: NetworkFirst (10s timeout)
- **Imágenes**: CacheFirst (30 días)
- **Recursos estáticos**: StaleWhileRevalidate (7 días)
- **Fuentes**: CacheFirst (1 año)
- **CDN externos**: StaleWhileRevalidate (7 días)

## 🌐 Configuración de Servidor

Para producción, asegúrate de:

1. **HTTPS requerido**: Las PWAs requieren conexión segura
2. **Headers MIME**: Configurar `.webmanifest` como `application/manifest+json`
3. **Service Worker**: Servir `sw.js` con cache-control apropiado
4. **Fallback routing**: Redirigir rutas SPA a `index.html`

### Ejemplo Nginx

```nginx
location / {
    try_files $uri $uri/ /index.html;
}

location /sw.js {
    add_header Cache-Control "no-cache, no-store, must-revalidate";
    add_header Pragma "no-cache";
    add_header Expires "0";
}

location ~* \.webmanifest$ {
    add_header Content-Type application/manifest+json;
}
```

## 📊 Características de Producción

- ✅ **Offline-first**: Funciona completamente sin conexión
- ✅ **Mobile responsive**: Optimizado para dispositivos móviles
- ✅ **Auto-actualización**: Service Worker con actualización automática
- ✅ **Cross-platform**: Compatible con iOS, Android y Desktop
- ✅ **Performance**: Caché inteligente y lazy loading
- ✅ **Accesibilidad**: Cumple estándares WCAG
- ✅ **SEO ready**: Meta tags y manifest optimizados
