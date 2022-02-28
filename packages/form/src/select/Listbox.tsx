import { List, ListElement, ListProps } from "@react-md/list";
import { applyRef, bem } from "@react-md/utils";
import cn from "classnames";
import React, {
  FocusEventHandler,
  forwardRef,
  KeyboardEventHandler,
  RefObject,
  useCallback,
} from "react";

const styles = bem("rmd-listbox");

export interface ListboxWidgetProps<E extends HTMLElement> {
  "aria-activedescendant": string | undefined;
  "aria-multiselectable"?: true | undefined;
  "aria-required"?: true | undefined;
  "aria-disabled"?: true | undefined;
  "aria-invalid"?: true | undefined;
  id: string;
  role: "listbox";
  tabIndex: number;
  onBlur: FocusEventHandler<E>;
  onFocus: FocusEventHandler<E>;
  onKeyDown: KeyboardEventHandler<E>;
  listboxRef: RefObject<E>;
}

// export interface ListboxProps
//   extends ListProps,
//     ListboxWidgetProps<HTMLUListElement> {
//   temporary?: boolean;
// }

export type ListboxProps = ListProps &
  ListboxWidgetProps<ListElement> & {
    temporary?: boolean;
  };

export const Listbox = forwardRef<HTMLUListElement, ListboxProps>(
  function Listbox(
    { className, temporary = false, children, listboxRef, ...props },
    ref
  ) {
    const refCallback = useCallback(
      (instance: ListElement | null) => {
        applyRef(instance, listboxRef);
        applyRef(instance, ref);
      },
      [listboxRef, ref]
    );

    return (
      <List
        {...props}
        ref={refCallback}
        className={cn(styles({ temporary }), className)}
      >
        {children}
      </List>
    );
  }
);
