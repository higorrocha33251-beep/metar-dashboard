export interface ParsedMETAR {
  station: string;
  timestamp: string;
  tempC: number | null;
  tempF: number | null;
  dewpointC: number | null;
  windDirection: number | null;
  windSpeed: number | null;
  windGust: number | null;
  visibility: number | null;
  pressure: number | null;
  raw: string;
}

export function parseNOAAMETAR(text: string): ParsedMETAR {
  const lines = text.trim().split('\n');
  const timestampLine = lines[0]?.trim() || '';
  const metarLine = lines[1]?.trim() || '';
  
  const tempMatch = metarLine.match(/(\d{2})\/M?(\d{2})(?= A\d{4})/);
  let tempC = null;
  let tempF = null;
  let dewpointC = null;
  
  if (tempMatch) {
    tempC = parseInt(tempMatch[1]);
    dewpointC = tempMatch[0].includes('M') ? -parseInt(tempMatch[2]) : parseInt(tempMatch[2]);
    tempF = Math.round((tempC * 9/5) + 32);
  }
  
  const windMatch = metarLine.match(/(\d{3})(\d{2})G?(\d{2})?KT/);
  let windDirection = null;
  let windSpeed = null;
  let windGust = null;
  
  if (windMatch) {
    windDirection = parseInt(windMatch[1]);
    windSpeed = parseInt(windMatch[2]);
    windGust = windMatch[3] ? parseInt(windMatch[3]) : null;
  }
  
  const pressureMatch = metarLine.match(/A(\d{4})/);
  const pressure = pressureMatch ? parseInt(pressureMatch[1]) / 100 : null;
  
  const visMatch = metarLine.match(/(\d+)SM/);
  const visibility = visMatch ? parseInt(visMatch[1]) : null;
  
  return {
    station: metarLine.substring(0, 4),
    timestamp: timestampLine,
    tempC,
    tempF,
    dewpointC,
    windDirection,
    windSpeed,
    windGust,
    visibility,
    pressure,
    raw: metarLine
  };
}
