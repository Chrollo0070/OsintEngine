import { Camera, Users, Lock, Network, Map, Hash, Scan, FileSearch, Link } from 'lucide-react';

export type OsintCategory = {
  id: string;
  title: string;
  icon: any;
  tools: OsintTool[];
};

export type OsintTool = {
  name: string;
  url: string;
  desc: string;
};

export const OSINT_TOOLKIT: OsintCategory[] = [
  {
    id: "cameras",
    title: "Public CCTVs & Cameras",
    icon: Camera,
    tools: [
      { name: "Insecam", url: "http://www.insecam.org/", desc: "Largest directory of online public security cameras." },
      { name: "EarthCam", url: "https://www.earthcam.com/", desc: "Network of scenic webcams and streaming feeds." },
      { name: "Shodan: SQ-WEBCAM", url: "https://www.shodan.io/search?query=Server%3A+SQ-WEBCAM", desc: "Discover exposed webcams globally." },
      { name: "Open Network Cameras", url: "https://www.shodan.io/search?query=title%3A%22Network+Camera%22", desc: "Find open network cameras on Shodan." }
    ]
  },
  {
    id: "people",
    title: "People & Identities",
    icon: Users,
    tools: [
      { name: "Epios", url: "https://epios.com/", desc: "Reverse email search and Google Account enumeration." },
      { name: "WhatsMyName", url: "https://whatsmyname.app/", desc: "Enumerate usernames across hundreds of websites." },
      { name: "TruePeopleSearch", url: "https://www.truepeoplesearch.com/", desc: "Free public records directory (US)." },
      { name: "Webmii", url: "https://webmii.com/", desc: "People search evaluating public web presence." },
      { name: "Sherlock", url: "https://github.com/sherlock-project/sherlock", desc: "Hunt down social media accounts by username." }
    ]
  },
  {
    id: "breaches",
    title: "Breaches & Passwords",
    icon: Lock,
    tools: [
      { name: "HaveIBeenPwned", url: "https://haveibeenpwned.com/", desc: "Check if an email or phone is in a data breach." },
      { name: "DeHashed", url: "https://dehashed.com/", desc: "Advanced database of leaked credentials." },
      { name: "LeakIX", url: "https://leakix.net/", desc: "Search engine indexing public data leaks and open databases." },
      { name: "BreachDirectory", url: "https://breachdirectory.org/", desc: "Search through public data breaches." }
    ]
  },
  {
    id: "network",
    title: "Network & Infrastructure",
    icon: Network,
    tools: [
      { name: "Shodan", url: "https://www.shodan.io/", desc: "Search engine for Internet-connected devices." },
      { name: "Censys", url: "https://search.censys.io/", desc: "Platform for discovering infrastructure and attack surfaces." },
      { name: "DNSDumpster", url: "https://dnsdumpster.com/", desc: "DNS reconnaissance and mapping tool." },
      { name: "ViewDNS.info", url: "https://viewdns.info/", desc: "Huge collection of DNS and network tools." },
      { name: "BGPView", url: "https://bgpview.io/", desc: "Search ASNs, IPv4/IPv6 prefixes, and BGP routing." }
    ]
  },
  {
    id: "imagery",
    title: "Imagery & Geo",
    icon: Map,
    tools: [
      { name: "TinEye", url: "https://tineye.com/", desc: "Reverse image search engine." },
      { name: "Overpass Turbo", url: "https://overpass-turbo.eu/", desc: "Advanced OSM querying tool for precise geo-location." },
      { name: "Snap Map", url: "https://map.snapchat.com/", desc: "Live global map of public Snapchat stories." },
      { name: "SunCalc", url: "https://www.suncalc.org/", desc: "Calculate sun path and shadows for chronolocation." },
      { name: "FlightRadar24", url: "https://www.flightradar24.com/", desc: "Live global flight tracking map." },
      { name: "MarineTraffic", url: "https://www.marinetraffic.com/", desc: "Live global ship tracking map." }
    ]
  },
  {
    id: "social",
    title: "Social Media Intelligence",
    icon: Hash,
    tools: [
      { name: "Social-Searcher", url: "https://www.social-searcher.com/", desc: "Free social media search engine." },
      { name: "X (Twitter) Advanced", url: "https://twitter.com/search-advanced", desc: "Advanced querying for X/Twitter." },
      { name: "Twint (Fork)", url: "https://github.com/twintproject/twint", desc: "Advanced Twitter scraping tool." },
      { name: "TikTok Search", url: "https://www.tiktok.com/search", desc: "Native TikTok search engine." }
    ]
  },
  {
    id: "docs",
    title: "Documents & Files",
    icon: FileSearch,
    tools: [
      { name: "FOCA", url: "https://github.com/ElevenPaths/FOCA", desc: "Extract hidden metadata from documents." },
      { name: "ExifTool", url: "https://exiftool.org/", desc: "Read, write, and edit meta information in files." },
      { name: "FilePursuit", url: "https://filepursuit.com/", desc: "Discover public files and directories across the web." }
    ]
  }
];

export function buildDomainSearchUrl(domain: string, query: string): string {
  const q = encodeURIComponent(`site:${domain} "${query}"`);
  return `https://www.google.com/search?q=${q}`;
}

export const osintToolSections = [
  {
    id: 'cctv',
    title: 'Visual Verification & CCTV',
    description: 'Real-time visual feeds and historical imagery to verify physical presence.',
    tools: [
      {
        name: 'Insecam',
        badge: 'Live',
        description: 'World\'s largest directory of online public security cameras.',
        href: 'http://www.insecam.org/',
        domain: 'insecam.org'
      },
      {
        name: 'EarthCam',
        badge: 'HD Feeds',
        description: 'Global network of scenic webcams and professional streaming feeds.',
        href: 'https://www.earthcam.com/',
        domain: 'earthcam.com'
      },
      {
        name: 'Shodan Cameras',
        badge: 'IoT',
        description: 'Discovery of exposed network cameras and IoT devices globally.',
        href: 'https://www.shodan.io/search?query=Server%3A+SQ-WEBCAM',
        domain: 'shodan.io'
      },
      {
        name: 'Webcam Hopper',
        badge: 'Aggregator',
        description: 'Global webcam search engine aggregate.',
        href: 'https://www.webcamhopper.com/',
        domain: 'webcamhopper.com'
      }
    ]
  },
  {
    id: 'mapping',
    title: 'Advanced Mapping & GIS',
    description: 'Geospatial intelligence tools for site mapping and perimeter analysis.',
    tools: [
      {
        name: 'Overpass Turbo',
        badge: 'OSM',
        description: 'Mining OpenStreetMap data with complex queries for specific locations.',
        href: 'https://overpass-turbo.eu/',
        domain: 'openstreetmap.org'
      },
      {
        name: 'Wikimapia',
        badge: 'Crowdsourced',
        description: 'Open-content collaborative map to find described physical places.',
        href: 'https://wikimapia.org/',
        domain: 'wikimapia.org'
      },
      {
        name: 'PeakVisor',
        badge: 'Terrain',
        description: '3D maps and mountain identification for outdoor reconnaissance.',
        href: 'https://peakvisor.com/',
        domain: 'peakvisor.com'
      },
      {
        name: 'OpenStreetCam',
        badge: 'Street View',
        description: 'Free and open platform for street-level imagery.',
        href: 'https://openstreetcam.org/',
        domain: 'kartaview.org'
      }
    ]
  }
];
