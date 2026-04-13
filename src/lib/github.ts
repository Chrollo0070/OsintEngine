export interface GitHubUser {
  login: string;
  avatarUrl: string;
  htmlUrl: string;
  name: string | null;
  bio: string | null;
  publicRepos: number;
  followers: number;
  following: number;
  location: string | null;
  company: string | null;
  blog: string | null;
}

export interface GitHubRepo {
  name: string;
  fullName: string;
  description: string | null;
  htmlUrl: string;
  language: string | null;
  stars: number;
  forks: number;
  updatedAt: string;
}

export interface GitHubResults {
  users: GitHubUser[];
  repos: GitHubRepo[];
}

export async function searchGitHub(query: string): Promise<GitHubResults> {
  const token = process.env.GITHUB_TOKEN;
  const headers: Record<string, string> = {
    Accept: 'application/vnd.github.v3+json',
    'User-Agent': 'PHANTOM-OSINT',
  };

  if (token) {
    headers.Authorization = `token ${token}`;
  }

  try {
    const [usersRes, reposRes] = await Promise.allSettled([
      fetch(`https://api.github.com/search/users?q=${encodeURIComponent(query)}&per_page=5`, { headers }),
      fetch(`https://api.github.com/search/repositories?q=${encodeURIComponent(query)}&sort=stars&per_page=5`, { headers }),
    ]);

    const users: GitHubUser[] = [];
    const repos: GitHubRepo[] = [];

    if (usersRes.status === 'fulfilled' && usersRes.value.ok) {
      const data = await usersRes.value.json();
      const userItems = data.items || [];

      // Fetch detailed info for each user (up to 5)
      const detailPromises = userItems.slice(0, 5).map(async (user: Record<string, unknown>) => {
        try {
          const detailRes = await fetch(user.url as string, { headers });
          if (!detailRes.ok) return null;
          const detail = await detailRes.json();
          return {
            login: detail.login,
            avatarUrl: detail.avatar_url,
            htmlUrl: detail.html_url,
            name: detail.name,
            bio: detail.bio,
            publicRepos: detail.public_repos,
            followers: detail.followers,
            following: detail.following,
            location: detail.location,
            company: detail.company,
            blog: detail.blog,
          } as GitHubUser;
        } catch {
          return null;
        }
      });

      const detailedUsers = await Promise.all(detailPromises);
      users.push(...detailedUsers.filter((u): u is GitHubUser => u !== null));
    }

    if (reposRes.status === 'fulfilled' && reposRes.value.ok) {
      const data = await reposRes.value.json();
      for (const repo of (data.items || []).slice(0, 5)) {
        repos.push({
          name: repo.name,
          fullName: repo.full_name,
          description: repo.description,
          htmlUrl: repo.html_url,
          language: repo.language,
          stars: repo.stargazers_count,
          forks: repo.forks_count,
          updatedAt: repo.updated_at,
        });
      }
    }

    return { users, repos };
  } catch {
    return { users: [], repos: [] };
  }
}
