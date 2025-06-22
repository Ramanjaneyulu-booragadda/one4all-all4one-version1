// src/utils/runtimeConfig.ts
let config: any = null;

export async function getRuntimeConfig() {
  if (!config) {
    const res = await fetch('/config.json');
    config = await res.json();
  }
  return config;
}
