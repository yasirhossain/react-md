import type { ReactElement } from "react";

import VersionMenuItem from "./VersionMenuItem";

// Current major version is 3, so 3 - 1
const MAX = 2;

export interface PreviousDocsMenuItemsProps {
  small?: boolean;
}

export default function PreviousDocsMenuItems({
  small,
}: PreviousDocsMenuItemsProps): ReactElement {
  return (
    <>
      {typeof window !== "undefined" &&
        window.location.origin !== "https://react-md.dev" && (
          <VersionMenuItem key="latest" small={small} version="latest" />
        )}
      {Array.from({ length: MAX }, (_, i) => (
        <VersionMenuItem key={i} small={small} version={`v${MAX - i}`} />
      ))}
    </>
  );
}
