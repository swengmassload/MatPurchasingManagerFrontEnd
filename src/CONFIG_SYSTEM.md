# Runtime Configuration System

This document describes the runtime configuration system that allows environment settings to be modified after deployment without rebuilding the application.

## Overview

The system replaces environment variables with a runtime configuration loaded from `public/config.json`. This enables:

- **Post-deployment configuration changes**: Update settings without rebuilding
- **Environment-specific deployments**: Same build artifacts for different environments
- **Dynamic configuration loading**: Configuration is loaded at application startup
- **Fallback support**: Graceful degradation to environment variables if config.json fails

## Configuration Files

### `public/config.json`

This is the main configuration file that can be edited after deployment:

```json
{
  "APPLICATIONSTAGE": "LOCAL",
  "GATEWAYSERVERIP": "localhost",
  "SERVERPROTOCOL": "https://",
  "FRONTENDPROTOCOL": "http://",
  "DASHBOARD_PORT": ":5170",
  "REGISTRATIONFRONT_PORT": ":5171",
  "MODELMANAGERFRONT_PORT": ":5172",
  "PRODUCTMANAGERFRONT_PORT": ":5173",
  "GATEWAY_PORT": ":7179"
}
```

### Environment Variables (Fallback)

The `.env` file serves as fallback if `config.json` cannot be loaded:

```
VITE_APPLICATIONSTAGE=LOCAL
VITE_GATEWAYSERVERIP=localhost
VITE_SERVERPROTOCOL=https://
VITE_FRONTENDPROTOCOL=http://
VITE_DASHBOARD_PORT=:5170
VITE_REGISTRATIONFRONT_PORT=:5171
VITE_MODELMANAGERFRONT_PORT=:5172
VITE_PRODUCTMANAGERFRONT_PORT=:5173
VITE_GATEWAY_PORT=:7179
```

## Usage

### In React Components

Use the `useConfig` hook for reactive configuration access:

```tsx
import { useConfig, useConfigUrls } from "../Hooks/useConfig";

// Get full configuration
function MyComponent() {
  const { config, loading, error, reloadConfig } = useConfig();

  if (loading) return <div>Loading configuration...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      Environment: {config?.APPLICATIONSTAGE}
      <button onClick={reloadConfig}>Reload Config</button>
    </div>
  );
}

// Get specific configuration value
function ServerStatus() {
  const { config, loading, error } = useConfig("GATEWAYSERVERIP");

  if (loading) return <div>Loading...</div>;

  return <div>Server: {config}</div>;
}

// Build URLs dynamically
function ApiClient() {
  const { buildGatewayUrl, buildFrontendUrl } = useConfigUrls();

  const handleApiCall = async () => {
    const apiUrl = await buildGatewayUrl("/api/users");
    const dashboardUrl = await buildFrontendUrl("DASHBOARD_PORT", "/dashboard");

    // Use URLs for API calls or navigation
  };

  return <button onClick={handleApiCall}>Make API Call</button>;
}
```

### In Service/Utility Files

Use the `configService` directly for non-React code:

```typescript
import { configService, getConfig, buildGatewayUrl } from "../Services/ConfigService";

// Get specific config value
const serverIp = await getConfig("GATEWAYSERVERIP");

// Build complete URLs
const apiUrl = await buildGatewayUrl("/api/endpoint");
const frontendUrl = await configService.buildFrontendUrl("DASHBOARD_PORT", "/path");

// Get full configuration
const fullConfig = await configService.getFullConfig();

// Reload configuration
await configService.reloadConfig();
```

### Legacy Support (Backward Compatibility)

For existing code, update imports to use the new system:

```typescript
// Old way (using environment variables directly)
import { BASEAPIURL, AuthUrls } from "../Constants/FixValues";

// New way (using configurable URLs)
import { ConfigurableUrls } from "../Constants/FixValues";

// Instead of: BASEAPIURL
const baseUrl = await ConfigurableUrls.getBaseApiUrl();

// Instead of: AuthUrls.APPLICATIONTOKEN_BASEURL
const authUrls = await ConfigurableUrls.getAuthUrls();
const tokenUrl = authUrls.APPLICATIONTOKEN_BASEURL;
```

## Configuration Management

### Development

1. **Local Development**: Edit `public/config.json` for quick configuration changes
2. **Environment Variables**: Still available as fallback during development
3. **Hot Reload**: Configuration changes require page refresh (or manual reload)

### Production Deployment

1. **Build Process**: `config.json` is copied to the build output directory
2. **Server Configuration**: Edit `build/config.json` directly on the server
3. **No Rebuild Required**: Changes take effect on page refresh
4. **Validation**: Invalid configurations fall back to environment variables

### Example Deployment Scenarios

#### Staging Environment

```json
{
  "APPLICATIONSTAGE": "STAGING",
  "GATEWAYSERVERIP": "staging-api.example.com",
  "SERVERPROTOCOL": "https://",
  "FRONTENDPROTOCOL": "https://",
  "DASHBOARD_PORT": "",
  "REGISTRATIONFRONT_PORT": "",
  "MODELMANAGERFRONT_PORT": "",
  "PRODUCTMANAGERFRONT_PORT": "",
  "GATEWAY_PORT": ""
}
```

#### Production Environment

```json
{
  "APPLICATIONSTAGE": "PRODUCTION",
  "GATEWAYSERVERIP": "api.example.com",
  "SERVERPROTOCOL": "https://",
  "FRONTENDPROTOCOL": "https://",
  "DASHBOARD_PORT": "",
  "REGISTRATIONFRONT_PORT": "",
  "MODELMANAGERFRONT_PORT": "",
  "PRODUCTMANAGERFRONT_PORT": "",
  "GATEWAY_PORT": ""
}
```

## Configuration Validation

The system includes automatic validation:

- **Required Fields**: All configuration keys must be present
- **Type Checking**: All values must be strings
- **Format Validation**: Ports must follow `:PORT` format, protocols must end with `://`
- **Error Handling**: Invalid configurations trigger fallback to environment variables

## Testing

Comprehensive tests are included:

- **Unit Tests**: `ConfigService.test.ts` - Tests the configuration service
- **Hook Tests**: `useConfig.test.ts` - Tests React hooks
- **Value Tests**: `config.test.ts` - Validates configuration values and formats

Run tests with:

```bash
npm test
```

## Migration Guide

### From Environment Variables

1. **Identify Usage**: Find all `import.meta.env.VITE_*` usages
2. **Update Imports**: Change to use `configService` or `useConfig`
3. **Handle Async**: Convert synchronous access to asynchronous
4. **Test Thoroughly**: Ensure all configuration paths work correctly

### Example Migration

```typescript
// Before
const apiUrl = `${import.meta.env.VITE_SERVERPROTOCOL}${import.meta.env.VITE_GATEWAYSERVERIP}${
  import.meta.env.VITE_GATEWAY_PORT
}`;

// After
const apiUrl = await buildGatewayUrl();
```

## Troubleshooting

### Common Issues

1. **Configuration Not Loading**: Check browser network tab for `/config.json` request
2. **Fallback Values Used**: Indicates `config.json` failed to load or validate
3. **Stale Configuration**: Use `reloadConfig()` to refresh without page reload
4. **Type Errors**: Ensure all configuration values are strings

### Debug Tools

```typescript
// Check current configuration
console.log(await configService.getFullConfig());

// Reload configuration manually
await configService.reloadConfig();

// Check for errors in browser console
```

## Security Considerations

- **Public Configuration**: `config.json` is publicly accessible
- **No Secrets**: Never store sensitive data in configuration
- **Validation**: Always validate configuration values before use
- **Fallback**: Ensure fallback values are safe defaults

## Performance

- **Caching**: Configuration is loaded once and cached
- **Lazy Loading**: Configuration loads during app initialization
- **Minimal Overhead**: Negligible performance impact after initial load
