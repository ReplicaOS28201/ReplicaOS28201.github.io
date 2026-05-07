# Common GitHub Actions Workflows Used in Real-World Projects

This catalog summarizes workflow patterns that are widely used in production repositories across web apps, APIs, libraries, mobile backends, and platform teams.

## 1) Core Development

| Typical filename | What it does |
|---|---|
| `ci.yml` | Runs the main continuous integration checks (checkout, install, test, and basic validation) on pushes and pull requests. |
| `test.yml` | Executes unit/integration/e2e test suites and reports failures before code is merged. |
| `lint.yml` | Runs linters and format checks (ESLint, Ruff, Flake8, golangci-lint, etc.) to enforce style and static correctness. |
| `build.yml` | Builds the project artifacts (binary, package, static site bundle, container context) to verify build reproducibility. |
| `typecheck.yml` | Performs static type checks (TypeScript, mypy, pyright, etc.) to catch API misuse early. |
| `validate.yml` | Validates repo conventions such as schema files, generated files, commit message rules, or config consistency. |
| `pre-merge.yml` | Aggregates required checks into a single gate workflow used as a required status check in branch protection. |

## 2) Deployment

| Typical filename | What it does |
|---|---|
| `deploy-staging.yml` | Deploys approved changes to a staging environment for QA and smoke testing. |
| `deploy-production.yml` | Deploys tagged or manually approved releases to production with environment protection rules. |
| `release.yml` | Creates a release (notes, tags, artifacts, binaries/packages) when a version is cut. |
| `pages.yml` | Builds and publishes static content to GitHub Pages. |
| `vercel.yml` | Builds and deploys preview/production environments on Vercel, often tied to PRs and main branch. |
| `netlify.yml` | Triggers Netlify builds for preview deploys and production publish workflows. |
| `cloud-run.yml` | Builds/pushes containers and deploys to Google Cloud Run. |
| `ecs-deploy.yml` | Updates AWS ECS services/task definitions using newly built container images. |
| `azure-webapp.yml` | Deploys build artifacts or containers to Azure App Service/Web Apps. |

## 3) Security & Quality

| Typical filename | What it does |
|---|---|
| `codeql-analysis.yml` | Runs GitHub CodeQL analysis to detect security vulnerabilities and code quality issues. |
| `dependency-review.yml` | Checks dependency changes in pull requests for known vulnerabilities and risky licenses. |
| `secret-scanning.yml` | Runs secret detection tooling (e.g., Gitleaks/TruffleHog) on commits and PRs. |
| `sast.yml` | Executes static application security testing tools beyond CodeQL (Semgrep, Sonar, etc.). |
| `container-scan.yml` | Scans Docker/OCI images for CVEs before publish/deploy. |
| `license-compliance.yml` | Audits dependency licenses and fails when incompatible licenses are introduced. |
| `quality-gate.yml` | Enforces quality thresholds (coverage, maintainability rating, duplication) from tools like SonarQube. |

## 4) Automation

| Typical filename | What it does |
|---|---|
| `stale.yml` | Automatically marks and optionally closes inactive issues and pull requests after configured inactivity windows. |
| `labeler.yml` | Applies labels to PRs/issues based on changed paths or metadata to speed triage. |
| `issue-triage.yml` | Routes incoming issues with templates, labels, and team assignments. |
| `pr-automation.yml` | Automates PR comments, checklist enforcement, reviewer assignment, and merge readiness checks. |
| `auto-merge.yml` | Enables or executes automerge when required checks and policy conditions are met. |
| `backport.yml` | Cherry-picks merged PRs into release branches automatically based on labels. |
| `project-sync.yml` | Syncs issues/PRs with GitHub Projects fields and status automation. |

## 5) Dependency Management

| Typical filename | What it does |
|---|---|
| `dependabot-auto-merge.yml` | Applies policy checks and automerges safe Dependabot updates. |
| `dependency-update.yml` | Runs scheduled dependency update jobs (Renovate/custom scripts) and opens update PRs. |
| `lockfile-maintenance.yml` | Refreshes lockfiles on a schedule to keep transitive dependencies current. |
| `base-image-update.yml` | Rebuilds container images when base images are updated and opens PRs with digest bumps. |
| `sbom.yml` | Generates and publishes software bill of materials (SBOM) artifacts for supply-chain visibility. |

## 6) Reporting & Analytics

| Typical filename | What it does |
|---|---|
| `coverage.yml` | Publishes code coverage reports/comments and enforces minimum coverage thresholds. |
| `benchmark.yml` | Runs performance benchmarks and reports regressions on PRs or scheduled runs. |
| `metrics.yml` | Collects CI metrics (duration, flakiness, pass/fail trends) and exports dashboards/artifacts. |
| `changelog.yml` | Generates changelog entries from merged PR labels/titles for release notes. |
| `artifact-report.yml` | Uploads test logs, screenshots, binaries, and diagnostics for post-failure analysis. |

## 7) Advanced CI/CD Patterns

| Typical filename | What it does |
|---|---|
| `matrix-ci.yml` | Runs the same checks across multiple language/runtime/OS versions using a strategy matrix. |
| `docker-build.yml` | Builds and tests Docker images (often multi-stage) and optionally pushes to registries. |
| `docker-publish.yml` | Publishes versioned and SHA-tagged images to GHCR, ECR, Docker Hub, or GCR. |
| `multi-env-deploy.yml` | Promotes artifacts through dev/stage/prod environments using approvals and reusable jobs. |
| `reusable-ci.yml` | Defines reusable workflows (`workflow_call`) consumed by multiple repositories for standardization. |
| `monorepo-ci.yml` | Executes path-filtered jobs to test/build only changed packages in monorepos. |
| `canary-deploy.yml` | Deploys canary releases to a subset of traffic and promotes or rolls back based on health checks. |
| `rollback.yml` | Provides manual or automated rollback to the last known-good release artifact. |

## 8) Bot / Scheduled Workflows

| Typical filename | What it does |
|---|---|
| `nightly.yml` | Runs nightly builds/tests (often heavier suites) on a cron schedule. |
| `weekly-maintenance.yml` | Performs weekly housekeeping such as cache cleanup, audit jobs, and report generation. |
| `reminder-bot.yml` | Posts reminders for stale reviews, unresolved incidents, or release checklists. |
| `sync-fork.yml` | Keeps forked or mirror branches synchronized with an upstream repository. |
| `health-check.yml` | Performs scheduled smoke checks against deployed services and alerts on failure. |
| `cert-rotation-check.yml` | Validates certificate expiration windows and opens alerts/issues before expiry. |

---

## Typical `.github/workflows/` Folder Structure

```text
.github/
  workflows/
    ci.yml
    test.yml
    lint.yml
    build.yml

    codeql-analysis.yml
    dependency-review.yml
    secret-scanning.yml

    deploy-staging.yml
    deploy-production.yml
    release.yml

    matrix-ci.yml
    docker-build.yml
    docker-publish.yml

    stale.yml
    labeler.yml
    issue-triage.yml
    auto-merge.yml

    dependency-update.yml
    lockfile-maintenance.yml
    sbom.yml

    coverage.yml
    benchmark.yml
    nightly.yml
```

## How Workflows Are Commonly Organized in Production Repos

1. **By lifecycle stage:** teams typically separate CI validation, security, deployment, and maintenance into different files so ownership and failures are clear.
2. **By trigger type:** PR workflows (`pull_request`) are kept fast, while scheduled (`schedule`) and release workflows handle heavier or slower tasks.
3. **By criticality:** required checks (lint/test/build/security basics) are minimal and stable, while optional analytics or long-running jobs are non-blocking.
4. **With reusable components:** organizations centralize common jobs via reusable workflows or composite actions to reduce duplication.
5. **With environment protections:** production deploy workflows are isolated and tied to GitHub environments for approvals, secrets scoping, and auditability.
6. **With naming consistency:** practical teams use explicit, descriptive filenames so maintainers can quickly find and modify the correct pipeline.
