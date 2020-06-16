export interface IOfficialAccountConfig {
  appId: string;
  secret: string;
  token: string;
  aesKey?: string;
  storage?: {
    set(k: string, v: string, ttl: number): void | Promise<void>;
    get(k: string): string | Promise<string>;
  };
}
