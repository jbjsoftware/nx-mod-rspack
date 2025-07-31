import { ModuleFederationConfig } from '@nx/module-federation';

const config: ModuleFederationConfig = {
  name: 'host',
  remotes:
    process.env.NODE_ENV === 'production'
      ? [
          ['dashboard', 'http://localhost:3000/remotes/dashboard'],
          ['connections', 'http://localhost:3000/remotes/connections'],
        ]
      : ['dashboard', 'connections'],
  shared: (packageName: string) => {
    if (packageName === 'react') {
      return {
        singleton: true,
        eager: true,
        requiredVersion: '^19.0.0',
      };
    }
    if (packageName === 'react-dom') {
      return {
        singleton: true,
        eager: true,
        requiredVersion: '^19.0.0',
      };
    }
    if (packageName === 'react-router-dom') {
      return {
        singleton: true,
        eager: false,
        requiredVersion: '^6.29.0',
      };
    }
    return false;
  },
};

/**
 * Nx requires a default export of the config to allow correct resolution of the module federation graph.
 **/
export default config;
