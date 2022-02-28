import { scrollIntoView, tryToSubmitRelatedForm } from "@react-md/utils";
import { createElement, RefObject, useEffect, useReducer, useRef } from "react";

import {
  ListboxHookListboxOnlyOptions,
  ListboxHookListboxOnlyReturnValue,
  ListboxHookOptions,
  ListboxHookReturnValue,
  ListboxHookSelectOptions,
  ListboxHookSelectReturnValue,
  ListboxSearchableWidgetState,
  ListboxValue,
  ListboxWidgetAction,
  ProvidedSelectWidgetProps,
  SearchableListboxOption,
} from "./types";
import {
  getActiveIndex,
  handleSearch,
  isSearchableEvent,
  isSearchableListboxOption,
  maybeClickOption,
  moveIndex,
  moveTo,
} from "./util";

export const EMPTY_OPTION: SearchableListboxOption<string> = {
  label: "",
  value: "",
  disabled: true,
};

/**
 * First function
 */
export function useListbox<
  Value extends ListboxValue,
  ListboxEl extends HTMLElement = HTMLUListElement,
  _SelectEl extends HTMLElement = HTMLDivElement
>(
  options: ListboxHookListboxOnlyOptions<Value, ListboxEl> & {
    temporary?: false;
  }
): ListboxHookListboxOnlyReturnValue<Value, ListboxEl>;
/**
 * Second function
 */
export function useListbox<
  Value extends ListboxValue,
  ListboxEl extends HTMLElement = HTMLUListElement,
  SelectEl extends HTMLElement = HTMLDivElement
>(
  options: ListboxHookSelectOptions<Value, ListboxEl, SelectEl> & {
    temporary: true;
  }
): ListboxHookSelectReturnValue<Value, ListboxEl, SelectEl>;
/**
 * Third function
 */
export function useListbox<
  Value extends ListboxValue,
  ListboxEl extends HTMLElement = HTMLUListElement,
  SelectEl extends HTMLElement = HTMLDivElement
>(
  options: ListboxHookOptions<Value, ListboxEl, SelectEl>
): ListboxHookReturnValue<Value, ListboxEl, SelectEl>;
/**
 * Final function
 */
export function useListbox<
  Value extends ListboxValue,
  ListboxEl extends HTMLElement,
  SelectEl extends HTMLElement
>({
  id,
  name,
  value,
  setValue,
  onListboxBlur,
  onListboxFocus,
  onListboxKeyDown,
  onSelectBlur,
  onSelectFocus,
  onSelectClick,
  onSelectKeyDown,
  options,
  disabled = false,
  required = false,
  temporary = false,
  searchTimeout = 500,
}: ListboxHookOptions<Value, ListboxEl, SelectEl>): ListboxHookReturnValue<
  Value,
  ListboxEl,
  SelectEl
> {
  if (!name && required) {
    throw new Error("A `name` must be provided for `required` listbox.");
  }

  const searchableOptions = options.filter(isSearchableListboxOption);
  const lastIndex = options.length - 1;
  const selectElRef = useRef<SelectEl>(null);
  const listboxRef = useRef<ListboxEl>(null);
  const optionRefs = useRef<(HTMLLIElement | undefined)[]>([]);

  const [state, dispatch] = useReducer(
    function reducer(
      state: ListboxSearchableWidgetState,
      action: ListboxWidgetAction
    ) {
      switch (action.type) {
        case "show":
          return {
            ...state,
            visible: true,
            activeIndex: getActiveIndex(options, value),
          };
        case "hide":
          return {
            ...state,
            visible: false,
          };
        case "touched":
          return state.touched ? state : { ...state, touched: true };
        case "blur":
          return {
            ...state,
            touched: action.touched || state.touched,
            focused: false,
          };
        case "focus": {
          let { activeIndex } = state;
          if (activeIndex === -1 && temporary) {
            activeIndex = Math.max(0, getActiveIndex(options, value));
          }

          return {
            ...state,
            focused: true,
            activeIndex,
          };
        }
        case "move":
          return moveTo({
            state,
            index: action.index,
            options,
            lastIndex,
          });
        case "moveUp":
          return moveIndex({
            state,
            options,
            lastIndex,
            increment: false,
          });
        case "moveDown":
          return moveIndex({
            state,
            options,
            lastIndex,
            increment: true,
          });
        case "setActiveIndex":
          return {
            ...state,
            activeIndex: action.activeIndex,
          };
        case "clearSearch":
          return { ...state, search: "" };
        case "search":
          return handleSearch({
            key: action.key,
            state,
            options,
          });
      }
    },
    undefined,
    () => {
      return {
        search: "",
        visible: !temporary,
        focused: false,
        touched: false,
        activeIndex: -1,
      };
    }
  );
  const { search, focused, touched, visible, activeIndex } = state;
  const option = searchableOptions.find((opt) => opt.value === value);
  const invalid = required && value === "";
  const error = touched && invalid;

  let activeId: string | undefined;
  if (activeIndex !== -1) {
    activeId = `${id}-option-${activeIndex + 1}`;
  }

  useEffect(() => {
    if (activeIndex === -1 || !visible) {
      return;
    }

    const active = optionRefs.current?.[activeIndex];
    if (active) {
      scrollIntoView(listboxRef.current, active);
    }
  }, [activeIndex, visible]);
  useEffect(() => {
    if (!search) {
      return;
    }

    const timeout = window.setTimeout(() => {
      dispatch({ type: "clearSearch" });
    }, searchTimeout);
    return () => {
      window.clearTimeout(timeout);
    };
  }, [search, searchTimeout]);
  useEffect(() => {
    if (!visible || !temporary) {
      return;
    }

    const handler = (event: MouseEvent): void => {
      if (
        !event.target ||
        !(event.target instanceof HTMLElement) ||
        !selectElRef.current ||
        !listboxRef.current ||
        (!selectElRef.current.contains(event.target) &&
          !listboxRef.current.contains(event.target))
      ) {
        dispatch({ type: "hide" });
      }
    };

    window.addEventListener("click", handler);
    return () => {
      window.removeEventListener("click", handler);
    };
  }, [temporary, visible]);

  const prevValue = useRef(value);
  if (prevValue.current !== value) {
    prevValue.current = value;
    dispatch({
      type: "setActiveIndex",
      activeIndex: getActiveIndex(options, value),
    });
  }

  const prevActiveIndex = useRef(activeIndex);
  if (prevActiveIndex.current !== activeIndex) {
    prevActiveIndex.current = activeIndex;
    if (search && !visible) {
      const found = options[activeIndex];
      if (found && isSearchableListboxOption(found) && !found.disabled) {
        setValue(found.value);
      }
    }
  }

  let selectRef: RefObject<SelectEl> | undefined;
  let selectProps: ProvidedSelectWidgetProps<SelectEl> | undefined;
  if (temporary) {
    selectRef = selectElRef;
    selectProps = {
      "aria-haspopup": "listbox",
      "aria-disabled": disabled || undefined,
      "aria-required": required || undefined,
      "aria-invalid": invalid || undefined,
      id: `${id}-select`,
      ref: selectElRef,
      role: "button",
      tabIndex: disabled ? -1 : 0,
      onBlur(event) {
        onSelectBlur?.(event);
        if (!visible) {
          dispatch({ type: "blur", touched: true });
        }
      },
      onFocus(event) {
        onSelectFocus?.(event);
        dispatch({ type: "focus" });
      },
      onClick(event) {
        onSelectClick?.(event);
        dispatch({ type: "show" });
      },
      onKeyDown(event) {
        onSelectKeyDown?.(event);
        switch (event.key) {
          case " ":
          case "ArrowUp":
          case "ArrowDown":
            event.stopPropagation();
            event.preventDefault();
            dispatch({ type: "show" });
            break;
          case "Enter":
            event.stopPropagation();
            event.preventDefault();

            tryToSubmitRelatedForm(event);
            break;
          default:
            if (isSearchableEvent(event)) {
              event.preventDefault();
              event.stopPropagation();
              dispatch({ type: "search", key: event.key });
            }
        }
      },
    };
  }

  return {
    option,
    focused,
    error,
    visible,
    activeIndex,
    selectRef,
    selectProps,
    hiddenSelectProps: {
      "aria-hidden": true,
      id: `${id}-hidden`,
      name,
      value,
      required,
      onFocus(event) {
        event.stopPropagation();
        dispatch({ type: "touched" });
        if (temporary) {
          selectElRef.current?.focus();
        } else {
          listboxRef.current?.focus();
        }
      },
      onChange() {
        // do nothing since this was only added to hide the warning about
        // uncontrolled components since a `value` as provided.
      },
      className: "hidden-select",
      tabIndex: -1,
      children: searchableOptions.map(({ label, value, disabled }) =>
        createElement("option", { key: value, value, disabled }, label)
      ),
    },
    listboxRef,
    listboxProps: {
      "aria-activedescendant": activeId,
      "aria-disabled": disabled || undefined,
      "aria-required": required || undefined,
      "aria-invalid": invalid || undefined,
      id: `${id}-listbox`,
      ref: listboxRef,
      role: "listbox",
      tabIndex: temporary ? -1 : 0,
      onFocus(event) {
        onListboxFocus?.(event);
        dispatch({ type: "focus" });
      },
      onBlur(event) {
        onListboxBlur?.(event);
        // stop propagation so select onBlur isn't triggered
        event.stopPropagation();
        dispatch({ type: "blur", touched: !temporary });
      },
      onKeyDown(event) {
        onListboxKeyDown?.(event);
        switch (event.key) {
          case "Home":
            event.preventDefault();
            event.stopPropagation();

            dispatch({ type: "move", index: 0 });
            break;
          case "End":
            event.preventDefault();
            event.stopPropagation();

            dispatch({ type: "move", index: lastIndex });
            break;
          case "ArrowUp": {
            event.preventDefault();
            event.stopPropagation();

            dispatch({ type: "moveUp" });
            break;
          }
          case "ArrowDown": {
            event.preventDefault();
            event.stopPropagation();

            dispatch({ type: "moveDown" });
            break;
          }
          case " ":
            event.preventDefault();
            event.stopPropagation();

            maybeClickOption({
              optionRefs,
              activeIndex,
              options,
            });

            break;
          case "Enter":
            event.preventDefault();
            event.stopPropagation();

            if (temporary) {
              maybeClickOption({
                optionRefs,
                activeIndex,
                options,
              });
            } else {
              tryToSubmitRelatedForm(event);
            }
            break;
          case "Escape":
            if (temporary) {
              event.preventDefault();
              event.stopPropagation();
              dispatch({ type: "hide" });
            }
            break;
          case "Tab":
            if (temporary) {
              event.preventDefault();
              event.stopPropagation();
            }
            break;
          default: {
            if (isSearchableEvent(event)) {
              event.preventDefault();
              event.stopPropagation();
              dispatch({ type: "search", key: event.key });
            }
          }
        }
      },
    },
    isOptionFocused(index) {
      return focused && activeIndex === index;
    },
    getOptionProps(option, index) {
      if (process.env.NODE_ENV !== "production" && typeof index !== "number") {
        throw new Error("An `index` must be provided to `getOptionProps`.");
      }

      const selected = option.value === value;
      return {
        "aria-selected": selected || undefined,
        "aria-disabled": option.disabled || undefined,
        id: `${id}-option-${index + 1}`,
        role: "option",
        ref(instance) {
          optionRefs.current[index] = instance || undefined;
        },
        onClick(event) {
          if (option.disabled) {
            return;
          }

          setValue(option.value);
          if (temporary) {
            // Have to stop propagation or else it propagates to the select
            // button for some reason which will make it immediately reopen
            // again.
            event.stopPropagation();
            dispatch({ type: "hide" });
          }
        },
      };
    },
  };
}
