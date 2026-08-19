# STEC | Diagnostico empresarial DS44

MVP web para diagnosticar la preparacion de una empresa frente a la guia tecnica de capacitacion en prevencion de riesgos laborales asociada al DS N 44.

## Base usada

- Guia tecnica dictada por Resolucion Exenta N 1117, de 7 de agosto de 2026.
- Publicacion en Diario Oficial: 11 de agosto de 2026.
- Vigencia informada: 1 de noviembre de 2026.
- Estándar principal: capacitacion minima de 8 horas, contenidos, metodologia, evaluacion verificable y registro.

La herramienta entrega orientacion de madurez documental y operativa. No emite una declaracion legal de cumplimiento.

## Ejecutar localmente

```bash
npm install
npm run dev
```

## Verificar build

```bash
npm run build
```

## Base de datos InsForge

La app guarda diagnosticos en `public.ds44_diagnostic_submissions`.

La tabla permite `INSERT` a usuarios anonimos/autenticados y no concede lectura publica. La lectura queda para administracion del proyecto.

Aplicar migraciones:

```bash
npx -y @insforge/cli db migrations up --all
```

## Configuracion local

Crear `.env.local` con:

```bash
VITE_INSFORGE_URL=https://h24y9fcn.us-east.insforge.app
VITE_INSFORGE_ANON_KEY=<anon-key>
```

El anon key se obtiene con:

```bash
npx -y @insforge/cli secrets get ANON_KEY
```

## Desplegar en InsForge

El proyecto ya puede vincularse desde esta carpeta:

```bash
npx -y @insforge/cli current --json
npx -y @insforge/cli link
```

Luego verificar localmente y desplegar el frontend:

```bash
npm install
npm run build
npx -y @insforge/cli deployments env set VITE_INSFORGE_URL https://h24y9fcn.us-east.insforge.app
npx -y @insforge/cli deployments env set VITE_INSFORGE_ANON_KEY <anon-key>
npx -y @insforge/cli deployments deploy . --json
```

Si se usa solo en modo local sin variables de entorno, el diagnostico funciona y permite descargar el informe, pero no guarda envios en InsForge.
