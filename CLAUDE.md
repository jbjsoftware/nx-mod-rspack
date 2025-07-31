# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Architecture

This is an Nx monorepo with a Module Federation setup using Rspack for bundling. The architecture consists of:

- **Host application** (`src/apps/host/`): Main React app that consumes remote modules
- **Remote applications** (`src/remotes/`): Independent React apps exposed as federated modules
  - `dashboard`: Remote module for dashboard functionality
  - `connections`: Remote module for connection management
- **Desktop application** (`src/apps/desktop/`): Electron app wrapper using nx-electron

The project uses Module Federation with:
- Host app runs on port 4200
- Dashboard remote on port 4201
- Connections remote on port 4202

## Common Commands

### Development
```bash
# Serve the host application (main app)
nx serve host

# Serve the desktop app
nx serve desktop

# Serve remotes (these auto-start when needed by host)
nx serve dashboard
nx serve connections

# Custom scripts for full stack development
npm run nxe:serve:frontend  # Alias for nx serve host
npm run nxe:serve:backend   # Alias for nx serve desktop
```

### Building
```bash
# Build host application
nx build host

# Build desktop application
nx build desktop

# Build specific remote
nx build dashboard
nx build connections

# Custom build scripts
npm run nxe:build:frontend  # Alias for nx build host
npm run nxe:build:backend   # Alias for nx build desktop
```

### Testing
```bash
# Run tests for specific project
nx test host
nx test desktop
nx test dashboard
nx test connections

# Run e2e tests
nx e2e host-e2e
nx e2e dashboard-e2e
nx e2e connections-e2e

# Custom test scripts
npm run nxe:test:frontend   # Alias for nx test host
npm run nxe:test:backend    # Alias for nx test desktop
```

### Linting
```bash
# Lint all projects
nx lint host
nx lint desktop
nx lint dashboard
nx lint connections

# Lint specific files (for desktop)
eslint src/apps/desktop/**/*.ts
```

### Electron Packaging
```bash
# Package the desktop app (without building installer)
nx run desktop:package
npm run nxe:package:app

# Build installer/executable
nx run desktop:make
npm run nxe:make:app
```

## Key Technologies

- **Nx**: Monorepo tooling and build system
- **Rspack**: Fast bundler (webpack alternative)
- **Module Federation**: Micro-frontend architecture
- **React 19**: Frontend framework
- **Electron**: Desktop app wrapper
- **TypeScript**: Type safety
- **Jest**: Testing framework
- **Playwright**: E2E testing
- **ESLint**: Code linting
- **PNPM**: Package manager

## Project Structure Notes

- Each app/remote has its own `project.json` defining build targets
- Module Federation configs are in `module-federation.config.ts` files
- Rspack configs are in `rspack.config.ts` files
- The desktop app uses nx-electron executor for Electron-specific builds
- E2E tests are in separate `-e2e` projects using Playwright

## Development Workflow

1. Start host app: `nx serve host` (automatically starts required remotes)
2. For desktop development: `nx serve desktop`
3. Remotes are served automatically when host needs them
4. Each remote can be developed independently with its own serve command