import type { Argument } from "classnames";
import cn from "classnames";
import type { ListItemHeight } from "@react-md/list";
import { bem } from "@react-md/utils";

const treeStyles = bem("rmd-tree");
const treeItemStyles = bem("rmd-tree-item");
const treeGroupStyles = bem("rmd-tree-group");

/**
 * Get a `className` string for a tree based on different styling options.
 *
 * @param others - Any other arguments that should be passed to `classnames`.
 * @returns a class name string
 * @remarks \@since REPLACE_VERSION
 */
export function treeClasses(...args: readonly Argument[]): string {
  return cn(treeStyles(), ...args);
}

/**
 * Get a `className` string for a treeitem based on different styling options.
 *
 * @param others - Any other arguments that should be passed to `classnames`.
 * @returns a class name string
 * @remarks \@since REPLACE_VERSION
 */
export function treeItemClasses(...args: readonly Argument[]): string {
  return cn(treeItemStyles(), ...args);
}

/** @remarks \@since REPLACE_VERSION */
export interface TreeItemContentStyleOptions {
  /**
   * Boolean if the content is within a link instead of an `<li>`.
   *
   * @defaultValue `false`
   */
  link?: boolean;

  /** {@inheritDoc ListItemHeight} */
  height?: ListItemHeight;

  /**
   * Boolean if the tree item is currently focused via `aria-activedescendant`.
   *
   * @defaultValue `false`
   */
  focused?: boolean;

  /**
   * Boolean if the tree item is one of the selections within the tree.
   *
   * @defaultValue `false`
   */
  selected?: boolean;

  /**
   * Boolean if the tree item should be clickable/interactable. This should be
   * `true` unless the tree item is disabled or readonly.
   *
   * @defaultValue `true`
   */
  clickable?: boolean;

  /**
   * Boolean if the tree item should gain styles for displaying three lines of
   * text instead of two.
   *
   * @defaultValue `false`
   */
  threeLines?: boolean;
}

/**
 * Get a `className` string for a tree based on different styling options.
 *
 * @param options - Any styling options to apply additional class names.
 * @param others - Any other arguments that should be passed to `classnames`.
 * @returns a class name string
 * @remarks \@since REPLACE_VERSION
 */
export function treeItemContentClasses(
  options: TreeItemContentStyleOptions,
  ...args: readonly Argument[]
): string {
  const {
    link,
    height = "auto",
    focused = false,
    selected = false,
    clickable = true,
    threeLines = false,
  } = options;

  return cn(
    treeItemStyles("content", {
      link,
      focused,
      selected,
      clickable,
      [height]: height !== "auto" && height !== "normal",
      "three-lines": threeLines,
    }),
    ...args
  );
}

/**
 * Get a `className` string for a tree based on different styling options.
 *
 * @param others - Any other arguments that should be passed to `classnames`.
 * @returns a class name string
 * @remarks \@since REPLACE_VERSION
 */
export function treeGroupClasses(...args: readonly Argument[]): string {
  return cn(treeGroupStyles(), ...args);
}

/**
 * Get a `className` string for a tree based on different styling options.
 *
 * @param others - Any other arguments that should be passed to `classnames`.
 * @returns a class name string
 * @remarks \@since REPLACE_VERSION
 */
export function treeItemRotatorClasses(...args: readonly Argument[]): string {
  return cn(treeItemStyles("rotator-icon"), ...args);
}
