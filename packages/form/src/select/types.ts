import {
  ChangeEventHandler,
  FocusEventHandler,
  KeyboardEventHandler,
  MouseEventHandler,
  ReactElement,
  ReactNode,
  RefCallback,
  RefObject,
} from "react";

export type ListboxValue = string | number;
export type RequiredListboxValue<V extends ListboxValue> = V | "";

export interface SearchableListboxOption<V extends ListboxValue> {
  /**
   * This should be the `children` that would appear in a native `<option>`
   * element:
   *
   * ```ts
   * <option value={value}>Label</option>
   * ```
   *
   * This is also used for the search/matching behavior that allows the user to
   * type their desired option to focus and select it.
   */
  label: string;

  /**
   * This should be the `value` that would appear in a native `<option>`
   * element:
   *
   * ```ts
   * <option value={value}>Label</option>
   * ```
   */
  value: V;

  /**
   * Boolean if the option should be disabled.
   */
  disabled?: boolean;

  /**
   * Any other required to identify what the current option is or anything used
   * to help render the `Option` component. Additional keys are generally props
   * that can be passed to the `Option` component.
   *
   * @example
   * Adding Addons
   * ```ts
   * const option = {
   *   label: "Label 1",
   *   value: 0,
   *   leftAddon: <FavoriteSVGIcon />,
   *   rightAddon: <Avatar src="https://example.com" />,
   * };
   * ```
   */
  [key: string]: unknown;
}

export type IgnoredListboxOption = Record<string, unknown> | ReactElement;

/**
 *
 */
export type ListboxOption<V extends ListboxValue> =
  | SearchableListboxOption<V>
  | IgnoredListboxOption;

export type ListboxOptions<V extends ListboxValue> =
  readonly ListboxOption<V>[];

export interface ProvidedSelectWidgetProps<E extends HTMLElement> {
  "aria-haspopup": "listbox";
  "aria-disabled": true | undefined;
  "aria-required": true | undefined;
  "aria-invalid": true | undefined;
  id: string;
  ref: RefObject<E>;
  role: "button";
  tabIndex: number;
  onBlur: FocusEventHandler<E>;
  onFocus: FocusEventHandler<E>;
  onClick: MouseEventHandler<E>;
  onKeyDown: KeyboardEventHandler<E>;
}

export interface ProvidedListboxWidgetProps<E extends HTMLElement> {
  "aria-activedescendant": string | undefined;
  // "aria-multiselectable": true | undefined;
  "aria-required": true | undefined;
  "aria-disabled": true | undefined;
  "aria-invalid": true | undefined;
  id: string;
  ref: RefObject<E>;
  role: "listbox";
  tabIndex: number;
  onBlur: FocusEventHandler<E>;
  onFocus: FocusEventHandler<E>;
  onKeyDown: KeyboardEventHandler<E>;
}

export interface ProvidedOptionWidgetProps {
  "aria-selected": true | undefined;
  id: string;
  ref: RefCallback<HTMLLIElement>;
  role: "option";
  onClick: MouseEventHandler<HTMLLIElement>;
}

export interface ProvidedHiddenSelectProps {
  /**
   * This is provided so that screen readers do not show this element in the
   * list of available form controls. Users should interact with the button or
   * listbox directly.
   */
  "aria-hidden": true;

  /**
   * An id which can be used to find this element if needed.
   */
  id: string;

  /**
   * A name for the select field that **should** be defined when `required`.
   *
   * The way to get a select field to trigger form validation is to:
   * - set the field to required
   * - have a valid name
   * - have the first option have a value of an empty string
   *
   * If one of the three are missing, the validation will not occur and the form
   * would still be submitted even if no value was chosen.
   */
  name?: string;

  /**
   * Boolean of the select field is required.
   *
   * @see {@link ProvidedHiddenSelectProps.name}
   */
  required: boolean;

  /**
   * The current value for the select field.
   */
  value: ListboxValue;

  /**
   *
   */
  onFocus: FocusEventHandler<HTMLSelectElement>;
  onChange: ChangeEventHandler<HTMLSelectElement>;

  className: string;

  /**
   * Set the `tabIndex` to `-1` so that it will not be tab-focusable, but would
   * still be focused if the user attempts to submit the form while `required`
   * and no value has been selected.
   */
  tabIndex: -1;

  children: ReactNode;
}

export interface ListboxHookListboxOnlyOptions<
  Value extends ListboxValue,
  ListboxEl extends HTMLElement
> {
  /**
   * An id required for a11y. This will be used to create ids for the different
   * parts of a listbox widget.
   */
  id: string;

  /**
   * A name to use for the hidden `<select>` element within a form.
   *
   * Note: This is **required** to be a non-empty string when the
   * {@link required} option is also enabled so that the default form validation
   * will prevent a form from being submitted if a user hasn't selected an
   * option yet.
   */
  name?: string;

  /**
   * The current value for the listbox.
   */
  value: Value | "";

  /**
   * A function that will update the value for the listbox.
   */
  setValue(value: Value): void;

  /**
   * A list of options available for within the listbox. Only options that match
   * the {@link SearchableListboxOption} will be able to be selected.
   */
  options: ListboxOptions<Value>;

  /**
   * Boolean if the listbox is disabled and non-interactable.
   *
   * @defaultValue `false`
   */
  disabled?: boolean;

  /**
   * Boolean if the listbox is required and the user must select one of the
   * options before submitting a form.
   *
   * @defaultValue `false`
   */
  required?: boolean;

  /**
   * Boolean if the listbox should appear withing a dropdown menu instead of
   * being always visible to the user.
   *
   * @defaultValue `false`
   */
  temporary?: boolean;

  /**
   * The amount of time (in milliseconds) before the keyboard search/matching is
   * reset.
   *
   * @defaultValue `500`
   */
  searchTimeout?: number;

  onListboxBlur?: FocusEventHandler<ListboxEl>;
  onListboxFocus?: FocusEventHandler<ListboxEl>;
  onListboxKeyDown?: KeyboardEventHandler<ListboxEl>;
}

export interface ListboxHookSelectOptions<
  Value extends ListboxValue,
  SelectEl extends HTMLElement,
  ListboxEl extends HTMLElement
> extends ListboxHookListboxOnlyOptions<Value, ListboxEl> {
  onSelectBlur?: FocusEventHandler<SelectEl>;
  onSelectFocus?: FocusEventHandler<SelectEl>;
  onSelectClick?: MouseEventHandler<SelectEl>;
  onSelectKeyDown?: KeyboardEventHandler<SelectEl>;
}

export type ListboxHookOptions<
  Value extends ListboxValue,
  ListboxEl extends HTMLElement,
  SelectEl extends HTMLElement
> = ListboxHookSelectOptions<Value, SelectEl, ListboxEl>;

/**
 * @example
 * Test via click with `@testing-library/react` + `@testing-library/jest-dom/extend-expect`
 * ```ts
 * const { getByRole } = render(<Test />);
 *
 * // First:
 * // Find the native select element so you can check the value
 * const select = getByRole("listbox", name: "Label");
 * expect(select).toHaveValue("")
 *
 * // Second:
 * // Find the select button and click it to show the list of options
 * //
 * // Note: have to use regex since the button would also contain the:
 * // - current label (if a value is selected)
 * // - placeholder text (if no value is selected and was provided)
 * fireEvent.click(getByRole("button", { name: /^Label/ }));
 *
 * // Third:
 * // Find the option you want to select and click it
 * fireEvent.click(getByRole("option", { name: "Option Label" }));
 *
 * // Finally:
 * // Verify the select value has updated
 * expect(select).toHaveValue("value")
 * ```
 */

/** @internal */
interface Action<T extends string> {
  type: T;
}

/** @internal */
interface KeyboardSearchAction extends Action<"search"> {
  /**
   * the next key to use in the search.
   */
  key: string;
}

interface KeyboardMoveAction extends Action<"move"> {
  /**
   * The option's index to move to.
   */
  index: number;
}

interface BlurAction extends Action<"blur"> {
  touched: boolean;
}

interface SetActiveIndexAction extends Action<"setActiveIndex"> {
  activeIndex: number;
}

export type ListboxWidgetAction =
  | Action<"focus">
  | Action<"moveUp">
  | Action<"moveDown">
  | Action<"clearSearch">
  | Action<"show">
  | Action<"hide">
  | Action<"touched">
  | BlurAction
  | SetActiveIndexAction
  | KeyboardMoveAction
  | KeyboardSearchAction;

export interface ListboxWidgetState {
  visible: boolean;
  focused: boolean;
  activeIndex: number;
}

/** @internal */
export interface ListboxSearchableWidgetState extends ListboxWidgetState {
  search: string;
  touched: boolean;
}

export interface ListboxHookListboxOnlyReturnValue<
  Value extends ListboxValue,
  ListboxEl extends HTMLElement
> extends ListboxWidgetState {
  /**
   * The current option based on the provided `value`.
   */
  option: SearchableListboxOption<Value> | undefined;

  /**
   * This will only be `true` when:
   * - the `required` option is `true`
   * - the current value is the empty string
   * - the user has touched the field at least once
   *
   * @see {@link ListboxHookOptions.required} for more information
   */
  error: boolean;

  getOptionProps(
    option: SearchableListboxOption<Value>,
    index: number
  ): ProvidedOptionWidgetProps;
  isOptionFocused(index: number): boolean;

  listboxRef: RefObject<ListboxEl>;
  /** {@inheritDoc ProvidedListboxWidgetProps} */
  listboxProps: ProvidedListboxWidgetProps<ListboxEl>;
  /** {@inheritDoc ProvidedHiddenSelectProps} */
  hiddenSelectProps: ProvidedHiddenSelectProps;
}

export interface ListboxHookSelectReturnParts<SelectEl extends HTMLElement> {
  /**
   * This is the same `ref` that is returned in the {@link selectProps} if you
   * need access to the select element.
   */
  selectRef: RefObject<SelectEl>;
  /** {@inheritDoc ProvidedSelectWidgetProps} */
  selectProps: ProvidedSelectWidgetProps<SelectEl>;
}

export interface ListboxHookSelectReturnValue<
  Value extends ListboxValue,
  ListboxEl extends HTMLElement,
  SelectEl extends HTMLElement
> extends ListboxHookListboxOnlyReturnValue<Value, ListboxEl>,
    ListboxHookSelectReturnParts<SelectEl> {}

export interface ListboxHookReturnValue<
  Value extends ListboxValue,
  ListboxEl extends HTMLElement,
  SelectEl extends HTMLElement
> extends ListboxHookListboxOnlyReturnValue<Value, ListboxEl>,
    Partial<ListboxHookSelectReturnParts<SelectEl>> {}
