
interface Options {
  url: string;
  parentElement: Element;
  prefill?: Record<string, any>;
  utm?: Record<string, string>;
}

declare const Calendly: { initInlineWidget: (options: Options) => any };
