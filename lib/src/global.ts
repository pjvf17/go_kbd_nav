export {};
declare global {
  interface Window {
    "api": {
      click: (channel: string, data: { x: number; y: number }) => void;
    };
  }
}
