# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 1.x.x   | :white_check_mark: |
| < 1.0   | :x:                |

## Reporting a Vulnerability

If you discover a security vulnerability in pm-skills, please report it responsibly.

**Do not report security vulnerabilities through public GitHub issues.**

Instead, please email [security contact] or use GitHub's private vulnerability reporting feature.

We will:
- Acknowledge receipt within 48 hours
- Provide a detailed response within 72 hours
- Keep you informed of progress toward resolution

## Scope

This security policy applies to:
- The pm-skills repository and its contents
- Skills, templates, and workflow definitions
- GitHub Actions workflows in this repository

Since pm-skills consists primarily of markdown templates and YAML configurations (not executable code), the primary security concerns are:
- Malicious content injection in templates
- Supply chain risks in referenced tools/dependencies
- Accidental secret exposure in examples