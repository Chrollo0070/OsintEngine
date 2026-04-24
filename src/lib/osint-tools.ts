import {
  Camera,
  Users,
  Lock,
  Network,
  Map,
  Hash,
  FileSearch,
  type LucideIcon,
} from 'lucide-react';

export type OsintCategory = {
  id: string;
  title: string;
  icon: LucideIcon;
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

export type OsintSectionTool = {
  name: string;
  description: string;
  href: string;
  badge?: string;
  domain?: string;
};

export type OsintToolSection = {
  id: string;
  title: string;
  description: string;
  tools: OsintSectionTool[];
};

export const osintToolSections: OsintToolSection[] = [
  {
    id: 'live-cameras',
    title: 'Live Cameras & Street View',
    description: 'Open-source camera directories and map feeds for quick visual verification.',
    tools: [
      {
        name: 'Insecam',
        description: 'Search public camera feeds by country, city, and camera type.',
        href: 'http://www.insecam.org/',
        badge: 'LIVE',
        domain: 'insecam.org',
      },
      {
        name: 'EarthCam',
        description: 'Curated scenic and urban live webcams around the world.',
        href: 'https://www.earthcam.com/',
        domain: 'earthcam.com',
      },
      {
        name: 'Google Maps',
        description: 'Pivot to street view, landmarks, and route context around the target.',
        href: 'https://www.google.com/maps',
        domain: 'google.com',
      },
    ],
  },
  {
    id: 'transport-weather',
    title: 'Transport & Environmental Context',
    description: 'Correlate events with aircraft, vessel, and weather activity.',
    tools: [
      {
        name: 'FlightRadar24',
        description: 'Inspect historical and live aircraft movement near a target location.',
        href: 'https://www.flightradar24.com/',
        domain: 'flightradar24.com',
      },
      {
        name: 'MarineTraffic',
        description: 'Track vessel movement and maritime patterns.',
        href: 'https://www.marinetraffic.com/',
        domain: 'marinetraffic.com',
      },
      {
        name: 'SunCalc',
        description: 'Estimate shadow direction and time-of-day from imagery.',
        href: 'https://www.suncalc.org/',
        badge: 'TIME',
        domain: 'suncalc.org',
      },
    ],
  },
  {
    id: 'domain-recon',
    title: 'Domain Recon',
    description: 'Discover related infrastructure and exposed assets tied to a domain.',
    tools: [
      {
        name: 'Shodan',
        description: 'Find exposed internet-facing services and cameras.',
        href: 'https://www.shodan.io/',
        badge: 'INFRA',
        domain: 'shodan.io',
      },
      {
        name: 'Censys',
        description: 'Search indexed certificates, hosts, and internet infrastructure.',
        href: 'https://search.censys.io/',
        domain: 'search.censys.io',
      },
      {
        name: 'DNSDumpster',
        description: 'Map subdomains and DNS relationships.',
        href: 'https://dnsdumpster.com/',
        domain: 'dnsdumpster.com',
      },
    ],
  },
];

export function buildDomainSearchUrl(domain: string, query: string): string {
  const trimmedDomain = domain.trim();
  const trimmedQuery = query.trim();
  const searchQuery = trimmedQuery
    ? `site:${trimmedDomain} ${trimmedQuery}`
    : `site:${trimmedDomain}`;

  return `https://www.google.com/search?q=${encodeURIComponent(searchQuery)}`;
}
