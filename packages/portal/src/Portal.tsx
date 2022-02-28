import React, {
  createContext,
  ReactElement,
  ReactNode,
  useContext,
  useState,
} from "react";
import { createPortal } from "react-dom";

export type PortalNode = Element | null;

const getInitialState = (): PortalNode => {
  if (typeof document === "undefined") {
    return null;
  }

  return document.body;
};

const context = createContext<PortalNode>(getInitialState());
context.displayName = "Portal";
const { Provider } = context;

export function usePortalNode(): PortalNode {
  return useContext(context);
}

export interface PortalProviderProps {
  children: ReactNode;
}

export function PortalProvider({
  children,
}: PortalProviderProps): ReactElement {
  const [portalNode, setPortalNode] = useState<PortalNode>(null);

  return (
    <Provider value={portalNode}>
      {children}
      <span ref={setPortalNode} />
    </Provider>
  );
}

export function Portal({ children }: PortalProviderProps): ReactElement | null {
  const portalNode = usePortalNode();
  if (!portalNode) {
    return null;
  }

  return createPortal(children, portalNode);
}
