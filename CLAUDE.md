# Claude Project Instructions

Reference:
@AGENTS.md

## Core Rules
- Read AGENTS.md first before making changes.
- Treat repository code as source of truth over model assumptions.
- Do not invent APIs, routes, or components.
- Check existing patterns in the codebase before adding new ones.
- Prefer modifying existing code over creating duplicate implementations.

## Next.js Rules
- This project may use breaking Next.js behavior.
- Read documentation in:
  node_modules/next/dist/docs/

Before coding verify:
- routing conventions
- server/client boundaries
- middleware usage
- server actions
- deprecated APIs
- migration notices

Do not use outdated Next.js patterns from memory.

## Security Rules
- Do not expose secrets in code.
- Flag hardcoded tokens, keys, or credentials.
- Prefer secure defaults.
- Validate input and sanitize outputs.
- Consider auth, rate limiting, and access control in changes.

## Code Change Rules
Before editing:
1. Understand surrounding files.
2. Check imports and dependencies.
3. Follow existing project architecture.
4. Keep changes minimal and scoped.
5. Explain risky changes.

## For Analysis Requests
When asked for security review or code audit, include:
- findings
- severity
- impact
- remediation
- assumptions

## Never
- Never fabricate implementation details.
- Never ignore deprecation warnings.
- Never overwrite working patterns without reason.
- Never make breaking refactors unless explicitly requested.
