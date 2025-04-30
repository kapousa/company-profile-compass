
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  // Add more environment variables as needed
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

// Fix for missing JSX namespace
declare namespace React {
  interface ReactElement<
    P = any,
    T extends string | JSXElementConstructor<any> = 
      | string
      | JSXElementConstructor<any>
  > {
    type: T;
    props: P;
    key: Key | null;
  }

  interface ReactNode {
    children?: ReactNode | undefined;
  }

  type JSXElementConstructor<P> =
    | ((props: P) => ReactElement<any, any> | null)
    | (new (props: P) => Component<any, any>);
}
