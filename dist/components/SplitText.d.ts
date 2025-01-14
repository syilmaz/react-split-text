import React, { ComponentType, CSSProperties, FC } from 'react';
import {
  LineWrapperProp,
  WordWrapperProp,
  LetterWrapperProp,
} from './Wrappers';
export interface SplitTextProps<T = any> {
  /**
   * className to forward to the container.
   * @type string
   */
  className?: string;
  /**
   * A style object to forward to the container.
   * @type CSSProperties
   */
  style?: CSSProperties;
  /**
   * A React ref to forward to the container.
   * @type A React ref
   */
  ref?: ((instance: unknown) => void) | React.MutableRefObject<unknown> | null;
  /**
   * A custom component to wrap each split line.
   * @type ComponentType<LineWrapperProp>
   */
  LineWrapper?: ComponentType<LineWrapperProp>;
  /**
   * A custom component to wrap each split word.
   * @type ComponentType<WordWrapperProp>
   */
  WordWrapper?: ComponentType<WordWrapperProp>;
  /**
   * A custom component to wrap each split letter.
   * @type ComponentType<LetterWrapperProp>
   */
  LetterWrapper?: ComponentType<LetterWrapperProp>;
  /**
   * An extra value that will be forwarded to each wrappers.
   * @type T = any
   */
  extraProps?: T;
}
export declare const SplitText: FC<SplitTextProps>;
