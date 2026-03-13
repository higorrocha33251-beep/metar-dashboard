export interface City {
  icao: string;
  name: string;
  region: string;
  timezone: string;
  wundergroundUrl: string;
  noaaUrl: string;
  windyUrl: string;
}

export const CITIES: City[] = [
  {
    icao: "KLGA",
    name: "New York City",
    region: "LaGuardia Airport",
    timezone: "America/New_York",
    wundergroundUrl: "https://www.wunderground.com/weather/us/ny/new-york/KLGA",
    noaaUrl: "https://tgftp.nws.noaa.gov/data/observations/metar/stations/KLGA.TXT",
    windyUrl: "https://www.windy.com/station/wmo-72503"
  },
  {
    icao: "KORD",
    name: "Chicago",
    region: "O'Hare International",
    timezone: "America/Chicago",
    wundergroundUrl: "https://www.wunderground.com/weather/us/il/chicago/KORD",
    noaaUrl: "https://tgftp.nws.noaa.gov/data/observations/metar/stations/KORD.TXT",
    windyUrl: "https://www.windy.com/station/wmo-72530"
  },
  {
    icao: "KATL",
    name: "Atlanta",
    region: "Hartsfield-Jackson",
    timezone: "America/New_York",
    wundergroundUrl: "https://www.wunderground.com/weather/us/ga/atlanta/KATL",
    noaaUrl: "https://tgftp.nws.noaa.gov/data/observations/metar/stations/KATL.TXT",
    windyUrl: "https://www.windy.com/station/wmo-72219"
  },
  {
    icao: "KMIA",
    name: "Miami",
    region: "Miami International",
    timezone: "America/New_York",
    wundergroundUrl: "https://www.wunderground.com/weather/us/fl/miami/KMIA",
    noaaUrl: "https://tgftp.nws.noaa.gov/data/observations/metar/stations/KMIA.TXT",
    windyUrl: "https://www.windy.com/station/wmo-72202"
  },
  {
    icao: "KDAL",
    name: "Dallas",
    region: "Love Field",
    timezone: "America/Chicago",
    wundergroundUrl: "https://www.wunderground.com/weather/us/tx/dallas/KDAL",
    noaaUrl: "https://tgftp.nws.noaa.gov/data/observations/metar/stations/KDAL.TXT",
    windyUrl: "https://www.windy.com/station/wmo-72253"
  },
  {
    icao: "KSEA",
    name: "Seattle",
    region: "Seattle-Tacoma",
    timezone: "America/Los_Angeles",
    wundergroundUrl: "https://www.wunderground.com/weather/us/wa/seattle/KSEA",
    noaaUrl: "https://tgftp.nws.noaa.gov/data/observations/metar/stations/KSEA.TXT",
    windyUrl: "https://www.windy.com/station/wmo-72793"
  },
  {
    icao: "EGLC",
    name: "London",
    region: "London City Airport",
    timezone: "Europe/London",
    wundergroundUrl: "https://www.wunderground.com/weather/gb/london/EGLC",
    noaaUrl: "https://tgftp.nws.noaa.gov/data/observations/metar/stations/EGLC.TXT",
    windyUrl: "https://www.windy.com/station/wmo-03768"
  },
  {
    icao: "LFPG",
    name: "Paris",
    region: "Charles de Gaulle",
    timezone: "Europe/Paris",
    wundergroundUrl: "https://www.wunderground.com/weather/fr/paris/LFPG",
    noaaUrl: "https://tgftp.nws.noaa.gov/data/observations/metar/stations/LFPG.TXT",
    windyUrl: "https://www.windy.com/station/wmo-07157"
  },
  {
    icao: "RJTT",
    name: "Tokyo",
    region: "Haneda Airport",
    timezone: "Asia/Tokyo",
    wundergroundUrl: "https://www.wunderground.com/weather/jp/tokyo/RJTT",
    noaaUrl: "https://tgftp.nws.noaa.gov/data/observations/metar/stations/RJTT.TXT",
    windyUrl: "https://www.windy.com/station/wmo-47671"
  },
  {
    icao: "SBGR",
    name: "São Paulo",
    region: "Guarulhos International",
    timezone: "America/Sao_Paulo",
    wundergroundUrl: "https://www.wunderground.com/weather/br/sao-paulo/SBGR",
    noaaUrl: "https://tgftp.nws.noaa.gov/data/observations/metar/stations/SBGR.TXT",
    windyUrl: "https://www.windy.com/station/wmo-83746"
  }
];
