# MCP Argentina Datos

Este proyecto es un servidor de [Model Context Protocol (MCP)](https://docs.modelcontext.io/) que utiliza la API de [Argentina Datos](https://argentinadatos.com/) para proveer herramientas que entregan información sobre Argentina.

## Instalación

Para instalar las dependencias, necesitás tener [pnpm](https://pnpm.io/installation) instalado. Luego, ejecutá:

```bash
pnpm install
```

## Uso

Para iniciar en modo desarrollo, ejecutá: (recomendado)

```bash
pnpm dev
```

Para iniciar el servidor, ejecutá:

```bash
pnpm start
```

Para inspeccionar el servidor, ejecutá:

```bash
npx -y @modelcontextprotocol/inspector npx -y tsx main.ts
```

## Herramientas Disponibles

- `get-feriados`: Devuelve los feriados del año actual.
- `get-feriados-timeframe`: Devuelve los feriados de un año específico. (Parámetro: `year`)
- `eventos-presidenciales`: Devuelve los eventos presidenciales.
- `dolares-historico`: Devuelve las cotizaciones de todas las casas de cambio.
- `dolares-por-casa`: Devuelve las cotizaciones del dólar de la casa de cambio especificada. (Parámetro: `casa`)
- `dolares-por-casa-fecha`: Devuelve la cotización del dólar de una casa de cambio en una fecha específica. (Parámetros: `casa`, `fecha`)
- `senadores`: Devuelve los senadores.
- `senado-actas`: Devuelve las actas del senado.
- `senado-actas-por-anio`: Devuelve las actas del senado de un año específico. (Parámetro: `anio`)
- `diputados`: Devuelve los diputados.
- `diputados-actas`: Devuelve las actas de los diputados.
- `diputados-actas-por-anio`: Devuelve las actas de los diputados de un año específico. (Parámetro: `anio`)
- `salud`: Devuelve el estado de la salud de la API.
