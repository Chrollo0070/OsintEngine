export type UsernamePivotPlatform = {
  id: string;
  name: string;
  category: 'social' | 'dev' | 'community';
  profileBaseUrl: string;
  searchBaseUrl: string;
};

export type UsernamePivotFinding = {
  platformId: string;
  platformName: string;
  category: UsernamePivotPlatform['category'];
  profileUrl: string;
  searchUrl: string;
  confidence: 'high' | 'medium';
  evidence: string;
};

export const USERNAME_PIVOT_PLATFORMS: UsernamePivotPlatform[] = [
  {
    id: 'github',
    name: 'GitHub',
    category: 'dev',
    profileBaseUrl: 'https://github.com/',
    searchBaseUrl: 'https://github.com/search?q=',
  },
  {
    id: 'reddit',
    name: 'Reddit',
    category: 'community',
    profileBaseUrl: 'https://www.reddit.com/user/',
    searchBaseUrl: 'https://www.reddit.com/search/?q=',
  },
  {
    id: 'x',
    name: 'X (Twitter)',
    category: 'social',
    profileBaseUrl: 'https://x.com/',
    searchBaseUrl: 'https://x.com/search?q=',
  },
  {
    id: 'instagram',
    name: 'Instagram',
    category: 'social',
    profileBaseUrl: 'https://www.instagram.com/',
    searchBaseUrl: 'https://www.google.com/search?q=',
  },
  {
    id: 'tiktok',
    name: 'TikTok',
    category: 'social',
    profileBaseUrl: 'https://www.tiktok.com/@',
    searchBaseUrl: 'https://www.tiktok.com/search?q=',
  },
];

export function normalizeUsername(rawInput: string): string {
  return rawInput.trim().replace(/^@+/, '').replace(/\s+/g, '');
}

export function buildUsernamePivotFindings(rawInput: string): UsernamePivotFinding[] {
  const username = normalizeUsername(rawInput);
  if (!username) return [];

  const encodedUsername = encodeURIComponent(username);

  return USERNAME_PIVOT_PLATFORMS.map((platform) => {
    const profileUrl = `${platform.profileBaseUrl}${encodedUsername}`;
    const searchUrl =
      platform.id === 'instagram'
        ? `${platform.searchBaseUrl}${encodeURIComponent(`site:instagram.com "${username}"`)}`
        : `${platform.searchBaseUrl}${encodedUsername}`;

    return {
      platformId: platform.id,
      platformName: platform.name,
      category: platform.category,
      profileUrl,
      searchUrl,
      confidence: 'medium',
      evidence: `Exact handle profile hypothesis generated from the provided username on ${platform.name}.`,
    };
  });
}
