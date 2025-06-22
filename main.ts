import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import {
  getFeriados,
  getEventosPresidenciales,
  getDolaresHistorico,
  getDolaresPorCasa,
  getDolaresPorCasaFecha,
  getSenadores,
  getSenadoActas,
  getSenadoActasPorAnio,
  getDiputados,
  getDiputadosActas,
  getDiputadosActasPorAnio,
  getSalud,
} from "./utils/functions.js";

const server = new McpServer({
  name: "mcp-argentina-datos",
  version: "1.0.0",
  description:
    "MCP para obtener datos de Argentina, utilizando la API de https://argentinadatos.com/",
  tools: [
    {
      name: "get-feriados",
      description: "Devuelve los feriados del año",
      parameters: {},
    },
    {
      name: "get-feriados-timeframe",
      description: "Devuelve los feriados del año",
      parameters: {
        year: z.number().describe("EJ: 2025"),
      },
    },
    {
      name: "eventos-presidenciales",
      description: "Devuelve los eventos presidenciales",
      parameters: {},
    },
    {
      name: "dolares-historico",
      description: "Devuelve las cotizaciones de todas las casas de cambio.",
      parameters: {},
    },
    {
      name: "dolares-por-casa",
      description:
        "Devuelve las cotizaciones del dólar de la casa de cambio especificada.",
      parameters: {
        casa: z.string().describe("EJ: blue, oficial, cripto, etc."),
      },
    },
    {
      name: "dolares-por-casa-fecha",
      description:
        "Devuelve la cotización del dólar de la casa de cambio especificada en la fecha indicada (en formato YYYY/MM/DD).",
      parameters: {
        casa: z.string().describe("EJ: blue, oficial, cripto, etc."),
        fecha: z.string().describe("EJ: 2025/01/01"),
      },
    },
    {
      name: "senadores",
      description: "Devuelve los senadores.",
      parameters: {},
    },
    {
      name: "senado-actas",
      description: "Devuelve las actas del senado",
      parameters: {},
    },
    {
      name: "senado-actas-por-anio",
      description: "Devuelve las actas del senado de un año específico",
      parameters: {
        anio: z.number().describe("EJ: 2025"),
      },
    },
    {
      name: "diputados",
      description: "Devuelve los diputados.",
      parameters: {},
    },

    {
      name: "diputados-actas-por-anio",
      description: "Devuelve las actas de los diputados de un año específico",
      parameters: {
        anio: z.number().describe("EJ: 2025"),
      },
    },
    {
      name: "diputados-actas",
      description: "Devuelve las actas de los diputados",
      parameters: {},
    },
    {
      name: "salud",
      description: "Devuelve el estado de la salud de la API",
      parameters: {},
    },
  ],
});

// Tools

// get-feriados
server.tool("get-feriados", "Devuelve los feriados del año", {}, async ({}) => {
  try {
    const data = await getFeriados();
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

// get-feriados-timeframe
server.tool(
  "get-feriados-timeframe",
  "Devuelve los feriados de un año específico pasado por parámetro",
  {
    year: z.number().describe("EJ: 2025"),
  },
  async ({ year }) => {
    if (year === undefined) {
      return {
        content: [
          {
            type: "text",
            text: "No se ha provisto el parámetro 'year'",
          },
        ],
      };
    }
    try {
      const data = await getFeriados(year);
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

// eventos-presidenciales
server.tool(
  "eventos-presidenciales",
  "Devuelve los eventos presidenciales",
  {},
  async ({}) => {
    try {
      const data = await getEventosPresidenciales();
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

// dolares-historico
server.tool(
  "dolares-historico",
  "Devuelve las cotizaciones de todas las casas de cambio.",
  {},
  async ({}) => {
    try {
      const data = await getDolaresHistorico();
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

// dolares-por-casa
server.tool(
  "dolares-por-casa",
  "Devuelve las cotizaciones del dólar de la casa de cambio especificada.",
  {
    casa: z.string().describe("EJ: blue, oficial, cripto, etc."),
  },
  async ({ casa }) => {
    if (!casa) {
      return {
        content: [
          {
            type: "text",
            text: "No se ha provisto el parámetro 'casa'",
          },
        ],
      };
    }
    try {
      const data = await getDolaresPorCasa(casa);
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

// dolares-por-casa-fecha
server.tool(
  "dolares-por-casa-fecha",
  "Devuelve la cotización del dólar de la casa de cambio especificada en la fecha indicada (en formato YYYY/MM/DD).",
  {
    casa: z.string().describe("EJ: blue, oficial, cripto, etc."),
    fecha: z
      .string()
      .regex(
        /^\d{4}\/(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])$/,
        "El formato de la fecha debe ser YYYY/MM/DD"
      )
      .describe("EJ: 2025/01/01"),
  },
  async ({ casa, fecha }) => {
    if (!casa) {
      return {
        content: [
          {
            type: "text",
            text: "No se ha provisto el parámetro 'casa'",
          },
        ],
      };
    }
    if (!fecha) {
      return {
        content: [
          {
            type: "text",
            text: "No se ha provisto el parámetro 'fecha'",
          },
        ],
      };
    }
    try {
      const data = await getDolaresPorCasaFecha(casa, fecha);
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

// senadores
server.tool("senadores", "Devuelve los senadores.", {}, async ({}) => {
  try {
    const data = await getSenadores();
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

// senado-actas
server.tool("senado-actas", "Devuelve las actas del senado", {}, async ({}) => {
  try {
    const data = await getSenadoActas();
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

// senado-actas-por-anio
server.tool(
  "senado-actas-por-anio",
  "Devuelve las actas del senado de un año específico",
  {
    anio: z.number().describe("EJ: 2025"),
  },
  async ({ anio }) => {
    if (anio === undefined) {
      return {
        content: [
          {
            type: "text",
            text: "No se ha provisto el parámetro 'anio'",
          },
        ],
      };
    }
    try {
      const data = await getSenadoActasPorAnio(anio);
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

// diputados
server.tool("diputados", "Devuelve los diputados.", {}, async ({}) => {
  try {
    const data = await getDiputados();
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

// diputados-actas-por-anio
server.tool(
  "diputados-actas-por-anio",
  "Devuelve las actas de los diputados de un año específico",
  {
    anio: z.number().describe("EJ: 2025"),
  },
  async ({ anio }) => {
    if (anio === undefined) {
      return {
        content: [
          {
            type: "text",
            text: "No se ha provisto el parámetro 'anio'",
          },
        ],
      };
    }
    try {
      const data = await getDiputadosActasPorAnio(anio);
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

// diputados-actas
server.tool(
  "diputados-actas",
  "Devuelve las actas de los diputados",
  {},
  async ({}) => {
    try {
      const data = await getDiputadosActas();
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

// salud
server.tool(
  "salud",
  "Devuelve el estado de la salud de la API",
  {},
  async ({}) => {
    try {
      const data = await getSalud();
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
