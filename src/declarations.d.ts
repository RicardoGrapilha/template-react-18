declare module 'numeral' {
    const numeral: any;
    export default numeral;
  }
  declare module 'nprogress' {
    // Adicione aqui as declarações necessárias para o que você está usando
    export interface NProgress {
      start(): void;
      done(): void;
      set(value: number): void;
      inc(amount?: number): void;
      configure(options: NProgress.Options): void;
    }
  
    export interface Options {
      trickleRate?: number;
      trickleSpeed?: number;
      minimum?: number;
      easing?: string;
      speed?: number;
      showSpinner?: boolean;
      parent?: string;
      template?: string;
    }
  
    const NProgress: NProgress;
    export default NProgress;
  }
  