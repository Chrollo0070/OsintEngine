export interface OsintTool {
  name: string;
  description: string;
  href: string;
  domain?: string;
  badge?: string;
}

export interface OsintToolSection {
  id: string;
  title: string;
  description: string;
  tools: OsintTool[];
}

export const osintToolSections: OsintToolSection[] = [
  {
    id: 'cctv',
    title: 'CCTV and Live Cameras',
    description: 'Jump into public webcam directories and live-scene discovery points.',
    tools: [
      {
        name: 'EarthCam',
        description: 'Public live cameras from cities, landmarks, and venues worldwide.',
        href: 'https://www.earthcam.com/',
        domain: 'earthcam.com',
        badge: 'Live',
      },
      {
        name: 'SkylineWebcams',
        description: 'Tourism-heavy live feeds that are useful for weather and crowd checks.',
        href: 'https://www.skylinewebcams.com/',
        domain: 'skylinewebcams.com',
        badge: 'Live',
      },
      {
        name: 'Webcam Taxi',
        description: 'Broad directory of public webcams by country and category.',
        href: 'https://www.webcamtaxi.com/',
        domain: 'webcamtaxi.com',
      },
      {
        name: 'Insecam',
        description: 'Open camera index for exposed IP cameras and CCTV endpoints.',
        href: 'https://www.insecam.org/',
        domain: 'insecam.org',
        badge: 'Exposure',
      },
    ],
  },
  {
    id: 'maps',
    title: 'Map and Geolocation Tools',
    description: 'Map, satellite, and street-level tooling for location verification.',
    tools: [
      {
        name: 'Google Maps',
        description: 'Fast place search, business data, street view, and directions.',
        href: 'https://www.google.com/maps',
        domain: 'google.com',
        badge: 'Maps',
      },
      {
        name: 'OpenStreetMap',
        description: 'Open geospatial map data with strong local detail and editing history.',
        href: 'https://www.openstreetmap.org/',
        domain: 'openstreetmap.org',
        badge: 'Open',
      },
      {
        name: 'Mapillary',
        description: 'Crowdsourced street-level imagery for signage, roads, and storefronts.',
        href: 'https://www.mapillary.com/app/',
        domain: 'mapillary.com',
        badge: 'Street',
      },
      {
        name: 'OpenAerialMap',
        description: 'Open aerial imagery discovery for terrain and overhead context.',
        href: 'https://openaerialmap.org/',
        domain: 'openaerialmap.org',
      },
      {
        name: 'Zoom Earth',
        description: 'Near-real-time weather, wildfire, and satellite overlays.',
        href: 'https://zoom.earth/',
        domain: 'zoom.earth',
        badge: 'Satellite',
      },
      {
        name: 'SunCalc',
        description: 'Sun angle and shadow estimation for photo and video geolocation.',
        href: 'https://www.suncalc.org/',
        domain: 'suncalc.org',
      },
    ],
  },
  {
    id: 'tracking',
    title: 'Movement and Infrastructure',
    description: 'Track aircraft, vessels, transport layers, and environmental conditions.',
    tools: [
      {
        name: 'ADS-B Exchange',
        description: 'Live air traffic map for aircraft tracing and timeline correlation.',
        href: 'https://globe.adsbexchange.com/',
        domain: 'adsbexchange.com',
        badge: 'Aviation',
      },
      {
        name: 'MarineTraffic',
        description: 'Vessel positions, ports, and maritime movement visibility.',
        href: 'https://www.marinetraffic.com/',
        domain: 'marinetraffic.com',
        badge: 'Marine',
      },
      {
        name: 'OpenRailwayMap',
        description: 'Rail infrastructure overlays useful for transit and route analysis.',
        href: 'https://www.openrailwaymap.org/',
        domain: 'openrailwaymap.org',
      },
      {
        name: 'Windy',
        description: 'Weather, cloud, rain, and forecast overlays for event reconstruction.',
        href: 'https://www.windy.com/',
        domain: 'windy.com',
        badge: 'Weather',
      },
    ],
  },
];

export function buildDomainSearchUrl(domain: string, query: string) {
  return `https://www.google.com/search?q=${encodeURIComponent(`site:${domain} ${query}`)}`;
}
