import type { Argument } from "classnames";
import cn from "classnames";
import { bem } from "../bem";

const gridStyles = bem("rmd-grid");
const gridListStyles = bem("rmd-grid-list");

/** @remarks \@since REPLACE_VERSION */
export interface GridClassNameOptions {
  /** @defaultValue `false` */
  disablePadding?: boolean;
}

/**
 * Get a `className` string for a grid based on different styling options.
 *
 * @param options - Any styling options to apply additional class names.
 * @param others - Any other arguments that should be passed to `classnames`.
 * @returns a class name string
 * @remarks \@since REPLACE_VERSION
 */
export function gridClassName(
  options: GridClassNameOptions,
  ...others: readonly Argument[]
): string {
  const { disablePadding = false } = options;
  return cn(gridStyles({ "no-padding": disablePadding }), ...others);
}

/** @remarks \@since REPLACE_VERSION */
export interface GridCellClassNameOptions {
  /**
   * The number of columns that the cell should span. If this value is provided,
   * it will be used instead of the `colEnd` property.
   *
   * Note: If this value is larger than the number of columns allowed in the
   * current grid, it will shrink all the other columns.
   */
  colSpan?: number;
}

/**
 * Get a `className` string for a grid cell based on different styling options.
 *
 * @param options - Any styling options to apply additional class names.
 * @param others - Any other arguments that should be passed to `classnames`.
 * @returns a class name string
 * @remarks \@since REPLACE_VERSION
 */
export function gridCellClassName(
  options: GridCellClassNameOptions,
  ...others: readonly Argument[]
): string {
  const { colSpan } = options;
  return cn(
    gridStyles("cell", {
      [`${colSpan}`]: colSpan,
    }),
    ...others
  );
}

/**
 * Get a `className` string for a grid list based on different styling options.
 *
 * @param others - Any other arguments that should be passed to `classnames`.
 * @returns a class name string
 * @remarks \@since REPLACE_VERSION
 */
export function gridListClassName(...others: readonly Argument[]): string {
  return cn(gridListStyles(), ...others);
}

/** @remarks \@since REPLACE_VERSION */
export interface GridListCellClassNameOptions {
  /**
   * Boolean if the cell should be square by also setting the current cell size
   * to the `height`.
   *
   * @defaultValue `false`
   */
  square?: boolean;
}

/**
 * Get a `className` string for a grid list cell based on different styling
 * options.
 *
 * @param options - Any styling options to apply additional class names.
 * @param others - Any other arguments that should be passed to `classnames`.
 * @returns a class name string
 * @remarks \@since REPLACE_VERSION
 */
export function gridListCellClassName(
  options: GridListCellClassNameOptions,
  ...others: readonly Argument[]
): string {
  const { square = false } = options;
  return cn(gridListStyles("cell", { square }), ...others);
}
