# Changelog Format Reference

Based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## Structure

```markdown
# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased]

### Added
- New feature description

### Changed
- Modified behavior description

### Fixed
- Bug fix description

## [1.0.0] - 2025-01-15

### Added
- Initial release features
```

## Change Categories

| Category | Use For |
|----------|---------|
| `Added` | New features, files, functionality |
| `Changed` | Changes to existing functionality |
| `Deprecated` | Soon-to-be-removed features |
| `Removed` | Removed features |
| `Fixed` | Bug fixes |
| `Security` | Security vulnerability fixes |

## Guidelines

1. **Write for humans** — Clear, concise descriptions
2. **Most recent first** — New entries at the top of each section
3. **Group by type** — Use the categories above
4. **Link issues** — Reference issue numbers when applicable
5. **Date releases** — Use YYYY-MM-DD format for version dates

## Example Entry

```markdown
### Added
- User authentication system with JWT tokens
- Password reset via email functionality
- Rate limiting on login attempts (#123)

### Fixed
- Session timeout now correctly redirects to login (#145)
- Email validation accepts plus signs in addresses
```
