import { KeyboardEvent, MutableRefObject } from "react";
import { findMatchIndex } from "@react-md/utils";

import {
  ListboxOption,
  ListboxSearchableWidgetState,
  ListboxValue,
  SearchableListboxOption,
} from "./types";

export function isSearchableListboxOption<V extends ListboxValue>(
  option: ListboxOption<V>
): option is SearchableListboxOption<V> {
  return "label" in option && "value" in option;
}

/**
 * This mimics the native select behavior better preventing disabled options from being focusable.
 */
export function isFocusableOption<V extends ListboxValue>(
  option: ListboxOption<V>
): option is SearchableListboxOption<V> {
  return (
    isSearchableListboxOption(option) && !option.disabled && option.value !== ""
  );
}

type SearchKeys = "altKey" | "ctrlKey" | "metaKey" | "shiftKey" | "key";

/** @internal */
export function isSearchableEvent(
  event: Pick<KeyboardEvent, SearchKeys>
): boolean {
  const { altKey, ctrlKey, metaKey, shiftKey, key } = event;
  return !altKey && !ctrlKey && !metaKey && !shiftKey && key.length === 1;
}

/** @internal */
export function getActiveIndex<V extends ListboxValue>(
  options: readonly ListboxOption<V>[],
  value: V
): number {
  let firstFocusable = -1;
  for (let i = 0; i < options.length; i += 1) {
    const option = options[i];
    if (isFocusableOption(option) && option.value === value) {
      return i;
    }

    if (firstFocusable === -1 && isFocusableOption(option)) {
      firstFocusable = i;
    }
  }

  return firstFocusable;
}

/** @internal */
export function isKeyboardClickIgnored<V extends ListboxValue>(
  activeIndex: number,
  options: readonly ListboxOption<V>[]
): boolean {
  const [option] = options;
  return (
    activeIndex === 0 ||
    !option ||
    !isSearchableListboxOption(option) ||
    option.value === ""
  );
}

/** @internal */
interface ClickOptions {
  optionRefs: MutableRefObject<(HTMLLIElement | undefined)[]>;
  activeIndex: number;
  options: readonly ListboxOption<ListboxValue>[];
}

/**
 * Added this util since apparently clicking a disabled option will force the
 * current selected option to be re-focused instead of just doing nothing.
 *
 * @internal
 */
export function maybeClickOption({
  optionRefs,
  activeIndex,
  options,
}: ClickOptions): void {
  const option = options[activeIndex];
  if (!option || !isSearchableListboxOption(option)) {
    // eslint-disable-next-line no-console
    console.log("NOT SEARCHABLE activeIndex option:", option);
    return;
  }

  const element = optionRefs.current[activeIndex];
  if (option && element && !option.disabled) {
    element.click();
  }
}

// STATE UTILS

/** @internal */
interface IndexOptions<V extends ListboxValue> {
  options: readonly ListboxOption<V>[];
  lastIndex: number;
  activeIndex: number;
}

/** @internal */
function isActiveIndexNonSearchable<V extends ListboxValue>({
  activeIndex,
  lastIndex,
  options,
}: IndexOptions<V>): boolean {
  return (
    activeIndex > -1 &&
    activeIndex < lastIndex &&
    !isFocusableOption(options[activeIndex])
  );
}

/** @internal */
interface NewIndexOptions<V extends ListboxValue> extends IndexOptions<V> {
  state: ListboxSearchableWidgetState;
}

/** @internal */
function isNotNewIndex<V extends ListboxValue>({
  state,
  options,
  lastIndex,
  activeIndex,
}: NewIndexOptions<V>): boolean {
  return (
    activeIndex === state.activeIndex ||
    activeIndex === -1 ||
    (activeIndex === lastIndex && !isFocusableOption(options[activeIndex]))
  );
}

/** @internal */
interface BaseOptions<V extends ListboxValue> {
  state: ListboxSearchableWidgetState;
  options: readonly ListboxOption<V>[];
}

/** @internal */
interface MoveOptions<V extends ListboxValue> extends BaseOptions<V> {
  lastIndex: number;
  increment: boolean;
}

/** @internal */
export function moveIndex<V extends ListboxValue>({
  state,
  increment,
  options,
  lastIndex,
}: MoveOptions<V>): ListboxSearchableWidgetState {
  const amount = increment ? 1 : -1;
  const prevActiveIndex = state.activeIndex;
  let activeIndex = Math.min(lastIndex, prevActiveIndex + amount);
  while (isActiveIndexNonSearchable({ activeIndex, lastIndex, options })) {
    activeIndex += amount;
  }

  if (isNotNewIndex({ state, options, lastIndex, activeIndex })) {
    return state;
  }

  return {
    ...state,
    activeIndex,
  };
}

/** @internal */
interface SearchOptions<V extends ListboxValue> extends BaseOptions<V> {
  key: string;
}

/** @internal */
export function handleSearch<V extends ListboxValue>({
  key,
  state,
  options,
}: SearchOptions<V>): ListboxSearchableWidgetState {
  const search = `${state.search}${key === state.search ? "" : key}`;

  // Note: The native select element will only focus the first matching
  // option when repeating a key if any of the other options starting
  // with the same letter are disabled (at least in chrome 93.0.4577.82)
  //
  // So with options:
  // - { label: "Apple", value: "a" }
  // - { label: "Alpha", value: "b", disabled: true }
  // - { label: "Additional", value: "c" }
  //
  // Only "Apple" would be able to be selected if repeating the letter
  // "a". If "Apple" was disabled, the first non-disabled option
  // starting with the same letter would be chosen instead.
  //
  // This matcher will still allow the focus to change which I actually
  // prefer.
  let activeIndex = findMatchIndex(
    search,
    options.map((option) =>
      isFocusableOption(option) ? `${option.label}` : ""
    ),
    Math.max(0, state.activeIndex)
  );
  if (activeIndex === -1) {
    ({ activeIndex } = state);
  }

  return {
    ...state,
    search,
    activeIndex,
  };
}

/** @internal */
interface MoveToOptions<V extends ListboxValue> extends BaseOptions<V> {
  index: number;
  lastIndex: number;
}

/** @internal */
export function moveTo<V extends ListboxValue>({
  state,
  index,
  options,
  lastIndex,
}: MoveToOptions<V>): ListboxSearchableWidgetState {
  if (isFocusableOption(options[index])) {
    return {
      ...state,
      activeIndex: index,
    };
  }

  const amount = index === 0 ? 1 : -1;
  let activeIndex = Math.min(lastIndex, index + amount);
  while (isActiveIndexNonSearchable({ activeIndex, options, lastIndex })) {
    activeIndex += amount;
  }

  if (isNotNewIndex({ state, options, lastIndex, activeIndex })) {
    return state;
  }

  return {
    ...state,
    activeIndex,
  };
}
