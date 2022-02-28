export interface ExamplePreviewOptions {
  disableCard?: boolean;
}

export interface Example extends ExamplePreviewOptions {
  title: string;
  description: string;
}

export type ExampleList = readonly Example[];

export interface ExamplesConfig {
  fonts?: readonly string[];
  resetIcons?: boolean;
}
