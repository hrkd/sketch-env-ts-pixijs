declare module '*.frag' {
  const src: string;
  export default src;
}

interface Window {
  XR8: any;
  XRExtras: any;
}

declare var window: Window;
