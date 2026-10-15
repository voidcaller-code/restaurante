# Instrucciones del proyecto Restaurante

## Estructura

- `icard/`: backend Django 5.2 y Django REST Framework.
- `icard_fronted/`: frontend React 19 con Vite.
- El backend usa PostgreSQL, JWT, `django-filter` y drf-spectacular.
- Las aplicaciones Django actuales son `users`, `categories`, `products`, `tables` y `orders`.
- La API se publica bajo el prefijo `/api/v1/`.

## Reglas generales

- Antes de editar, revisar `git status` y preservar todos los cambios locales del usuario.
- Mantener la estructura, nombres y estilo de los archivos existentes.
- No incluir secretos ni leer, mostrar o versionar valores de `icard/.env`.
- No editar archivos generados, cachés, `__pycache__`, contenido de `dist/` ni archivos de `uploads/`.
- Comunicar al usuario en español, salvo que solicite otro idioma.

## Frontend

- Usar exclusivamente **pnpm**. No ejecutar `npm`, `npx` ni `yarn`, y no crear `package-lock.json` o `yarn.lock`.
- Ejecutar scripts desde `icard_fronted/`:

```bash
pnpm dev
pnpm build
pnpm lint
pnpm exec eslint <archivos-modificados>
```

- `pnpm build` genera `icard_fronted/dist/`; este directorio es descartable y no debe editarse ni versionarse.
- Reutilizar las dependencias existentes antes de añadir una nueva.
- Mantener las llamadas HTTP en `src/api/`, el estado reutilizable en `src/hooks/` y la presentación en componentes/páginas.
- Usar `apiFetch` para las llamadas HTTP y `BASE_API` para construir las URL.
- Las listas paginadas del backend no son arreglos directos: los registros están en `retData` y el total en `retTotal`.
- Cuando un hook exponga una lista a componentes que usan `.map()`, `.length` o `.forEach()`, normalizarla con `response?.retData ?? []`.
- Mantener los valores de estado de pedidos en minúsculas: `pending` y `delivered`.
- Los formularios usan Formik y Yup; reflejar en el frontend las validaciones importantes del backend para ofrecer respuesta inmediata.
- Los estilos de componentes usan Sass y nombres de clase tipo BEM. Para SVG/componentes de iconos, preferir `currentColor`.

## Backend

- Activar el entorno virtual antes de ejecutar comandos Python; no instalar dependencias globalmente.
- Ejecutar comandos desde `icard/`:

```bash
python manage.py check
python manage.py test
python manage.py makemigrations --check
python manage.py migrate
```

- La base de datos de desarrollo puede iniciarse con `docker compose up -d db` desde `icard/`.
- Las variables necesarias están documentadas en `icard/.env.example`.
- Mantener las reglas de dominio reutilizables en modelos mediante validadores. Los serializers pueden añadir validaciones específicas de la API.
- Crear una migración al cambiar el estado de un modelo. No modificar migraciones que ya hayan sido aplicadas o compartidas.
- Los `ModelViewSet` del proyecto heredan de `common.responses.BaseModelViewSet`.
- Las respuestas exitosas usan `retCode`, `retMsg` y `retData`; las respuestas paginadas también incluyen `retCount`, `retTotal` y `retNext`.
- Conservar los permisos existentes: usuarios administrativos requieren `IsAdminUser`; los catálogos públicos usan lectura anónima y escritura autenticada.
- Añadir filtros con `DjangoFilterBackend` cuando el frontend envíe parámetros de consulta.

## Verificación

- Ejecutar ESLint sobre los archivos frontend modificados y, cuando sea razonable, `pnpm build`.
- Ejecutar `python manage.py check` para cambios backend y pruebas relevantes cuando el entorno esté disponible.
- Si una validación no puede ejecutarse por falta del entorno virtual, base de datos o variables, informarlo claramente; no simular un resultado exitoso.
- No corregir advertencias o errores ajenos a la tarea sin autorización, pero mencionarlos si afectan la validación.
