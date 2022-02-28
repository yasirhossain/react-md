import type { ReactElement, ReactNode } from "react";
import type { IconRotatorBaseProps } from "@react-md/icon";
import { IconRotator, useIcon } from "@react-md/icon";

import { treeItemRotatorClasses } from "./styles";

export interface TreeItemExpanderIconProps extends IconRotatorBaseProps {
  children?: ReactNode;
}

/**
 * The `TreeItemExpanderIcon` is a simple wrapper of the `IconRotator` prop to
 * be used within a `TreeView`.
 */
export function TreeItemExpanderIcon({
  className,
  children,
  rotated = false,
  ...props
}: TreeItemExpanderIconProps): ReactElement {
  const icon = useIcon("expander", children);

  return (
    <IconRotator
      {...props}
      rotated={rotated}
      className={treeItemRotatorClasses(className)}
    >
      {icon}
    </IconRotator>
  );
}
