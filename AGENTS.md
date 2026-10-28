# Instrucciones del proyecto Restaurante

## Límites y arquitectura

- Este repositorio no tiene un ejecutor raíz: trabaja desde `icard/` para Django o desde `icard_fronted/` para React/Vite.
- El backend usa Django 5.2, DRF, PostgreSQL y las apps `users`, `categories`, `products`, `tables`, `orders` y `payments`; todas sus rutas se montan bajo `/api/v1/` en `icard/icard/urls.py`.
- El frontend entra por `src/main.jsx` → `src/App.jsx`; conserva HTTP en `src/api/`, estado reutilizable en `src/hooks/`/`src/context/` y UI en componentes/páginas.
- Revisa `git status` antes de editar y preserva cambios locales ajenos. Responde en español salvo petición contraria.
- No leas ni muestres `icard/.env`; los nombres requeridos están en `icard/.env.example`. No edites `uploads/`, `dist/`, cachés ni `__pycache__`.

## Frontend (`icard_fronted/`)

- Usa exclusivamente `pnpm`; el lockfile canónico es `pnpm-lock.yaml`. No generes archivos de npm o Yarn.
- Comandos disponibles: `pnpm dev`, `pnpm build`, `pnpm lint`, `pnpm preview`. No hay scripts de test ni typecheck.
- Para verificación enfocada usa `pnpm exec eslint <archivos-modificados>`; `pnpm build` crea el `dist/` descartable e ignorado.
- Construye URLs con `BASE_API` y usa `apiFetch`; `BASE_API` lee `VITE_API_URL` y por defecto apunta a `http://127.0.0.1:8000`.
- Los `BaseModelViewSet` no devuelven listas planas: los registros están en `retData`; las listas paginadas añaden `retCount`, `retTotal` y `retNext`. Antes de usar `.map()`, `.length` o `.forEach()`, normaliza con `response?.retData ?? []`.
- Mantén los valores API de estados en minúsculas: pedidos `pending`/`delivered`, pagos `pending`/`paid` y tipos de pago `card`/`cash`.
- Los formularios existentes usan Formik + Yup; replica allí validaciones importantes de modelos/serializers. Los estilos son Sass con clases BEM.

## Backend (`icard/`)

- Activa el entorno local con `source ../icard_venv/bin/activate`; no instales dependencias Python globalmente.
- La configuración depende de las variables de `.env`. Levanta PostgreSQL, cuando haga falta, con `docker compose up -d db` desde `icard/`.
- Usa el runner de Django (no hay pytest configurado): `python manage.py test` o, de forma enfocada, `python manage.py test <app>[.tests.TestClass[.test_method]]`.
- Verificación base: `python manage.py check` y `python manage.py makemigrations --check`. Ejecuta `python manage.py migrate` solo cuando corresponda aplicar migraciones.
- Todo cambio de modelo requiere una migración nueva (`python manage.py makemigrations <app>`); no reescribas migraciones existentes compartidas.
- Los viewsets deben heredar de `common.responses.BaseModelViewSet`, que envuelve éxitos en `retCode`, `retMsg` y `retData` y devuelve `200`, no `204`, al eliminar.
- El usuario personalizado autentica por correo (`USERNAME_FIELD = 'email'`) y DRF usa JWT Bearer. Conserva `IsAdminUser` para usuarios y lectura anónima/escritura autenticada en catálogos.
- Si el frontend añade parámetros de consulta, declara filtros explícitos con `DjangoFilterBackend`; los filtros existentes son parte del contrato API.
- Conserva reglas reutilizables en modelos mediante validadores y añade en serializers solo validaciones específicas de la API.

## Cierre de una tarea

- Frontend: ESLint enfocado y, si cambia ejecución o empaquetado, `pnpm build`.
- Backend: `python manage.py check`, `python manage.py makemigrations --check` y pruebas Django enfocadas.
- Si faltan variables, entorno o base de datos, informa qué comando no pudo ejecutarse; no presentes una validación omitida como exitosa.
