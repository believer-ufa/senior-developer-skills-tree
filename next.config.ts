import { PHASE_DEVELOPMENT_SERVER } from 'next/constants'

const getNextConfig = (phase: string) => {
  const isDev = phase === PHASE_DEVELOPMENT_SERVER

  /**
   * @type {import('next').NextConfig}
   */
  const nextConfig = {
    assetPrefix: isDev ? undefined : '/senior-developer-skills-tree',
    output: 'export',
  }

  return nextConfig;
}

export default getNextConfig;
