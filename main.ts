import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

const BASE_URL = "https://api.argentinadatos.com/v1";

const server = new McpServer({
  name: "mcp-argentina-datos",
  version: "1.0.0",
  description:
    "MCP para obtener datos de Argentina, utilizando la API de https://argentinadatos.com/",
});

server.tool("get-feriados", "Devuelve los feriados del año", {}, async ({}) => {
  try {
    const feriados = await fetch(`${BASE_URL}/feriados/`);
    const data = await feriados.json();
    if (data.length === 0) {
      return {
        content: [
          {
            type: "text",
            text: "No se encontraron feriados para el año actual",
          },
        ],
      };
    }
    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(data, null, 2),
          mimeType: "application/json",
        },
      ],
    };
  } catch (error) {
    return {
      content: [{ type: "text", text: "Error al obtener los feriados" }],
    };
  }
});

server.tool(
  "get-feriados-timeframe",
  "Devuelve los feriados de un año específico pasado por parámetro",
  {
    year: z.number(),
  },
  async ({ year }) => {
    try {
      const feriados = await fetch(`${BASE_URL}/feriados/${year}`);
      const data = await feriados.json();
      if (data.length === 0) {
        return {
          content: [
            {
              type: "text",
              text: "No se encontraron feriados para el año especificado",
            },
          ],
        };
      }
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(data, null, 2),
            mimeType: "application/json",
          },
        ],
      };
    } catch (error) {
      return {
        content: [{ type: "text", text: "Error al obtener los feriados" }],
      };
    }
  }
);

server.tool(
  "eventos-presidenciales",
  "Devuelve los eventos presidenciales",
  {},
  async ({}) => {
    try {
      const eventos = await fetch(`${BASE_URL}/eventos/presidenciales/`);
      const data = await eventos.json();
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(data, null, 2),
            mimeType: "application/json",
          },
        ],
      };
    } catch (error) {
      return {
        content: [
          { type: "text", text: "Error al obtener los eventos presidenciales" },
        ],
      };
    }
  }
);

server.tool(
  "dolares-historico",
  "Devuelve las cotizaciones de todas las casas de cambio.",
  {},
  async ({}) => {
    try {
      const dolares = await fetch(`${BASE_URL}/cotizaciones/dolares`);
      const data = await dolares.json();
      if (data.length === 0) {
        return {
          content: [
            { type: "text", text: "No se encontraron cotizaciones de dólares" },
          ],
        };
      }
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(data, null, 2),
            mimeType: "application/json",
          },
        ],
      };
    } catch (error) {
      return {
        content: [
          {
            type: "text",
            text: "Error al obtener las cotizaciones de dólares",
          },
        ],
      };
    }
  }
);

server.tool(
  "dolares-por-casa",
  "Devuelve las cotizaciones del dólar de la casa de cambio especificada.",
  {
    casa: z.string().describe("EJ: blue, oficial, cripto, etc."),
  },
  async ({ casa }) => {
    try {
      const dolares = await fetch(`${BASE_URL}/cotizaciones/dolares/${casa}`);
      const data = await dolares.json();
      if (data.length === 0) {
        return {
          content: [
            {
              type: "text",
              text: "No se encontraron cotizaciones de dólares para la casa de cambio especificada",
            },
          ],
        };
      }
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(data, null, 2),
            mimeType: "application/json",
          },
        ],
      };
    } catch (error) {
      return {
        content: [
          {
            type: "text",
            text: "Error al obtener las cotizaciones de dólares para la casa de cambio especificada",
          },
        ],
      };
    }
  }
);

server.tool(
  "dolares-por-casa-fecha",
  "Devuelve la cotización del dólar de la casa de cambio especificada en la fecha indicada (en formato YYYY/MM/DD).",
  {
    casa: z.string().describe("EJ: blue, oficial, cripto, etc."),
    fecha: z.string().describe("EJ: 2025/01/01"),
  },
  async ({ casa, fecha }) => {
    try {
      const dolares = await fetch(
        `${BASE_URL}/cotizaciones/dolares/${casa}/${fecha}`
      );
      const data = await dolares.json();
      if (data.length === 0) {
        return {
          content: [
            {
              type: "text",
              text: "No se encontraron cotizaciones de dólares para la casa de cambio especificada en la fecha indicada",
            },
          ],
        };
      }
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(data, null, 2),
            mimeType: "application/json",
          },
        ],
      };
    } catch (error) {
      return {
        content: [
          {
            type: "text",
            text: "Error al obtener la cotización del dólar para la casa de cambio especificada en la fecha indicada",
          },
        ],
      };
    }
  }
);

server.tool("senadores", "Devuelve los senadores.", {}, async ({}) => {
  try {
    const senadores = await fetch(`${BASE_URL}/senado/senadores`);
    const data = await senadores.json();
    if (data.length === 0) {
      return {
        content: [{ type: "text", text: "No se encontraron senadores" }],
      };
    }
    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(data, null, 2),
          mimeType: "application/json",
        },
      ],
    };
  } catch (error) {
    return {
      content: [{ type: "text", text: "Error al obtener los senadores" }],
    };
  }
});

server.tool("senado-actas", "Devuelve las actas del senado", {}, async ({}) => {
  try {
    const actas = await fetch(`${BASE_URL}/senado/actas`);
    const data = await actas.json();
    if (data.length === 0) {
      return {
        content: [{ type: "text", text: "No se encontraron actas" }],
      };
    }
    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(data, null, 2),
          mimeType: "application/json",
        },
      ],
    };
  } catch (error) {
    return {
      content: [
        { type: "text", text: "Error al obtener las actas del senado" },
      ],
    };
  }
});

server.tool(
  "senado-actas-por-anio",
  "Devuelve las actas del senado de un año específico",
  {
    anio: z.number(),
  },
  async ({ anio }) => {
    try {
      const actas = await fetch(`${BASE_URL}/senado/actas/${anio}`);
      const data = await actas.json();
      if (data.length === 0) {
        return {
          content: [
            {
              type: "text",
              text: "No se encontraron actas para el año especificado",
            },
          ],
        };
      }
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(data, null, 2),
            mimeType: "application/json",
          },
        ],
      };
    } catch (error) {
      return {
        content: [
          { type: "text", text: "Error al obtener las actas del senado" },
        ],
      };
    }
  }
);

server.tool("diputados", "Devuelve los diputados.", {}, async ({}) => {
  try {
    const diputados = await fetch(`${BASE_URL}/diputados/diputados`);
    const data = await diputados.json();
    if (data.length === 0) {
      return {
        content: [{ type: "text", text: "No se encontraron diputados" }],
      };
    }
    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(data, null, 2),
          mimeType: "application/json",
        },
      ],
    };
  } catch (error) {
    return {
      content: [{ type: "text", text: "Error al obtener los diputados" }],
    };
  }
});

server.tool(
  "diputados-actas-por-anio",
  "Devuelve las actas de los diputados de un año específico",
  {
    anio: z.number(),
  },
  async ({ anio }) => {
    try {
      const actas = await fetch(`${BASE_URL}/diputados/actas/${anio}`);
      const data = await actas.json();
      if (data.length === 0) {
        return {
          content: [
            {
              type: "text",
              text: "No se encontraron actas para el año especificado",
            },
          ],
        };
      }
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(data, null, 2),
            mimeType: "application/json",
          },
        ],
      };
    } catch (error) {
      return {
        content: [
          { type: "text", text: "Error al obtener las actas de los diputados" },
        ],
      };
    }
  }
);

server.tool(
  "diputados-actas",
  "Devuelve las actas de los diputados",
  {},
  async ({}) => {
    try {
      const actas = await fetch(`${BASE_URL}/diputados/actas`);
      const data = await actas.json();
      if (data.length === 0) {
        return {
          content: [
            { type: "text", text: "No se encontraron actas de los diputados" },
          ],
        };
      }
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(data, null, 2),
            mimeType: "application/json",
          },
        ],
      };
    } catch (error) {
      return {
        content: [
          { type: "text", text: "Error al obtener las actas de los diputados" },
        ],
      };
    }
  }
);

server.tool(
  "salud",
  "Devuelve el estado de la salud de la API",
  {},
  async ({}) => {
    try {
      const response = await fetch(`${BASE_URL}/estado`);
      const data = await response.json();
      if (data.estado === "Correcto") {
        return {
          content: [
            { type: "text", text: "La API está funcionando correctamente" },
          ],
        };
      } else {
        return {
          content: [
            { type: "text", text: "La API no está funcionando correctamente" },
          ],
        };
      }
    } catch (error) {
      return {
        content: [
          {
            type: "text",
            text: "Error al obtener el estado de la salud de la API",
          },
        ],
      };
    }
  }
);

const transport = new StdioServerTransport();
await server.connect(transport);
