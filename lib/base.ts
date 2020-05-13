import { AxiosInstance } from "axios";

export class Base {
  config: Record<string, any>;
  http: AxiosInstance;

  /**
   * 默认内存存储
   * ttl 秒后过期
   */
  storage = {
    cache: Object,
    set(k: string, v: string, ttl: number) {
      this.cache[k] = { value: v, expiresAt: +new Date() + 1000 * ttl };
    },
    get(k: string): string | Promise<string> {
      return this.cache[k] && this.cache[k].expiresAt > +new Date()
        ? this.cache[k].value
        : null;
    }
  };

  constructor(config: Record<string, any>) {
    this.config = config;
    if (config.storage) {
      this.storage.set = config.storage.set;
      this.storage.get = config.storage.get;
    }
  }
}
