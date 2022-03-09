import type { ReactElement, ReactNode } from "react";
import type { AppBarNavProps } from "@react-md/app-bar";
import { AppBarNav as RMDAppBarNav } from "@react-md/app-bar";
import { Tooltip, useTooltip } from "@react-md/tooltip";

interface Props extends AppBarNavProps {
  id: string;
  tooltip?: ReactNode;
}

export default function AppBarNav({
  id,
  tooltip,
  children,
  onClick,
  onBlur,
  onFocus,
  onKeyDown,
  onMouseEnter,
  onMouseLeave,
  onTouchStart,
  onContextMenu,
  ...props
}: Props): ReactElement {
  const handlers = {
    onClick,
    onBlur,
    onFocus,
    onKeyDown,
    onMouseEnter,
    onMouseLeave,
    onTouchStart,
    onContextMenu,
  };
  const { elementProps, tooltipProps } = useTooltip({
    baseId: id,
    ...handlers,
  });

  return (
    <>
      <RMDAppBarNav
        {...props}
        {...(tooltip ? elementProps : { id, ...handlers })}
      >
        {children}
      </RMDAppBarNav>
      <Tooltip {...tooltipProps}>{tooltip}</Tooltip>
    </>
  );
}
