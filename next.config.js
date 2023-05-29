const transpilePackages=[
  'uniforms-bridge-json-schema',
  'uniforms',
  'uniforms-antd',
  'next-auth',
  'ajv',
  'ajv-i18n',
]
const withPlugins = require('next-compose-plugins');
const withTM = require('next-transpile-modules')(transpilePackages);
const withBundleAnalyzer = require('@next/bundle-analyzer')({
   enabled: process.env.ANALYZE === 'true',
});

const basePath = '/cloudtreasury';

/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath,
  assetPrefix: basePath,
//  transpilePackages,
  env: {
    API_PATH: basePath + '/api',
  },
}
module.exports = nextConfig;

module.exports = withPlugins([withTM, withBundleAnalyzer], nextConfig);
