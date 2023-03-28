/** @type {import('next').NextConfig} */

const withPlugins = require('next-compose-plugins');
const withTM = require('next-transpile-modules')([
  'uniforms-bridge-json-schema',
  'uniforms',
  'uniforms-antd',
  'next-auth',
  'ajv',
  'ajv-i18n'
]);

const basePath = '/projecttemplate';
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withPlugins([withTM,withBundleAnalyzer], {
  basePath,
  assetPrefix: basePath,
  env: {
    API_PATH: basePath + '/api'
  }
});
