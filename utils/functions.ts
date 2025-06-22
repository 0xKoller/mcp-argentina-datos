const BASE_URL = "https://api.argentinadatos.com/v1";
export const getFeriados = async (year = new Date().getFullYear()) => {
  const feriados = await fetch(`${BASE_URL}/feriados/${year}`);
  const data = await feriados.json();
  return data;
};

export const getEventosPresidenciales = async () => {
  const eventos = await fetch(`${BASE_URL}/eventos/presidenciales/`);
  const data = await eventos.json();
  return data;
};

export const getDolaresHistorico = async () => {
  const dolares = await fetch(`${BASE_URL}/cotizaciones/dolares/`);
  const data = await dolares.json();
  return data;
};

export const getDolaresPorCasa = async (casa: string) => {
  const dolares = await fetch(`${BASE_URL}/cotizaciones/dolares/${casa}`);
  const data = await dolares.json();
  return data;
};

export const getDolaresPorCasaFecha = async (casa: string, fecha: string) => {
  const dolares = await fetch(
    `${BASE_URL}/cotizaciones/dolares/${casa}/${fecha}`
  );
  const data = await dolares.json();
  return data;
};

export const getSenadores = async () => {
  const senadores = await fetch(`${BASE_URL}/senado/senadores`);
  const data = await senadores.json();
  return data;
};

export const getSenadoActas = async () => {
  const actas = await fetch(`${BASE_URL}/senado/actas`);
  const data = await actas.json();
  return data;
};

export const getSenadoActasPorAnio = async (anio: number) => {
  const actas = await fetch(`${BASE_URL}/senado/actas/${anio}`);
  const data = await actas.json();
  return data;
};

export const getDiputados = async () => {
  const diputados = await fetch(`${BASE_URL}/diputados/diputados`);
  const data = await diputados.json();
  return data;
};

export const getDiputadosActas = async () => {
  const actas = await fetch(`${BASE_URL}/diputados/actas`);
  const data = await actas.json();
  return data;
};

export const getDiputadosActasPorAnio = async (anio: number) => {
  const actas = await fetch(`${BASE_URL}/diputados/actas/${anio}`);
  const data = await actas.json();
  return data;
};

export const getSalud = async () => {
  const salud = await fetch(`${BASE_URL}/estado`);
  const data = await salud.json();
  return data;
};
