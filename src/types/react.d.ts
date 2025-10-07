/// <reference types="astro/client" />

declare module '*.astro' {
  const Component: any;
  export default Component;
}

declare module '@astrojs/react' {
  export const react: any;
}
