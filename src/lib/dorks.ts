export interface DorkEntry {
  label: string;
  query: string;
}

export interface DorkCategory {
  name: string;
  icon: string;
  dorks: DorkEntry[];
}

export function generateDorkUrl(query: string, dork: string): string {
  const fullQuery = `${dork.replace('$QUERY', `"${query}"`)}`;
  return `https://www.google.com/search?q=${encodeURIComponent(fullQuery)}`;
}

export function getDorkCategories(query: string): DorkCategory[] {
  const q = query.trim();
  return [
    {
      name: 'Social Media',
      icon: '👤',
      dorks: [
        { label: 'LinkedIn', query: `"${q}" site:linkedin.com` },
        { label: 'Twitter/X', query: `"${q}" site:twitter.com` },
        { label: 'Facebook', query: `"${q}" site:facebook.com` },
        { label: 'Instagram', query: `"${q}" site:instagram.com` },
        { label: 'Reddit', query: `"${q}" site:reddit.com` },
        { label: 'TikTok', query: `"${q}" site:tiktok.com` },
        { label: 'Pinterest', query: `"${q}" site:pinterest.com` },
        { label: 'Snapchat', query: `"${q}" site:snapchat.com` },
      ],
    },
    {
      name: 'Professional',
      icon: '💼',
      dorks: [
        { label: 'GitHub', query: `"${q}" site:github.com` },
        { label: 'GitLab', query: `"${q}" site:gitlab.com` },
        { label: 'StackOverflow', query: `"${q}" site:stackoverflow.com` },
        { label: 'Medium', query: `"${q}" site:medium.com` },
        { label: 'Dev.to', query: `"${q}" site:dev.to` },
        { label: 'Resume', query: `"${q}" inurl:resume` },
        { label: 'CV', query: `"${q}" inurl:cv` },
        { label: 'Portfolio', query: `"${q}" inurl:portfolio` },
      ],
    },
    {
      name: 'Documents',
      icon: '📄',
      dorks: [
        { label: 'PDF', query: `"${q}" filetype:pdf` },
        { label: 'DOC', query: `"${q}" filetype:doc` },
        { label: 'DOCX', query: `"${q}" filetype:docx` },
        { label: 'PPT', query: `"${q}" filetype:ppt` },
        { label: 'XLS', query: `"${q}" filetype:xls` },
      ],
    },
    {
      name: 'Leaks & Pastes',
      icon: '🔓',
      dorks: [
        { label: 'Pastebin', query: `"${q}" site:pastebin.com` },
        { label: 'Ghostbin', query: `"${q}" site:ghostbin.com` },
        { label: 'Rentry', query: `"${q}" site:rentry.co` },
      ],
    },
    {
      name: 'News & Press',
      icon: '📰',
      dorks: [
        { label: 'Google News', query: `"${q}" site:news.google.com` },
        { label: 'News URLs', query: `"${q}" inurl:news` },
        { label: 'Press Releases', query: `"${q}" "press release"` },
      ],
    },
    {
      name: 'Legal & Public Records',
      icon: '⚖️',
      dorks: [
        { label: 'Court Records', query: `"${q}" court OR arrest OR lawsuit` },
        { label: 'Criminal', query: `"${q}" charges OR conviction` },
      ],
    },
    {
      name: 'Email Patterns',
      icon: '📧',
      dorks: [
        { label: 'Gmail', query: `"${q}" "@gmail.com"` },
        { label: 'Yahoo', query: `"${q}" "@yahoo.com"` },
        { label: 'Outlook', query: `"${q}" "@outlook.com"` },
        { label: 'ProtonMail', query: `"${q}" "@protonmail.com"` },
      ],
    },
    {
      name: 'Images',
      icon: '🖼️',
      dorks: [
        { label: 'Photos', query: `"${q}" photos` },
        { label: 'Images', query: `"${q}" images` },
      ],
    },
    {
      name: 'Cache & Archives',
      icon: '🗃️',
      dorks: [
        { label: 'Google Cache', query: `cache:"${q}"` },
        { label: 'Wayback Machine', query: `"${q}" site:web.archive.org` },
        { label: 'Archive.ph', query: `"${q}" site:archive.ph` },
      ],
    },
    {
      name: 'Deep Web Indexed',
      icon: '🕸️',
      dorks: [
        { label: 'Index Of', query: `"${q}" intitle:"index of"` },
        { label: 'Admin Panels', query: `"${q}" inurl:admin` },
        { label: 'Confidential', query: `"${q}" intext:"confidential"` },
      ],
    },
    {
      name: 'Dating & Forums',
      icon: '💬',
      dorks: [
        { label: 'Quora', query: `"${q}" site:quora.com` },
        { label: 'Discord', query: `"${q}" site:discord.com` },
        { label: 'Telegram', query: `"${q}" site:telegram.me` },
      ],
    },
  ];
}
