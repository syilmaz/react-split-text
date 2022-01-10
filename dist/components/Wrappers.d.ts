import React from 'react';
export interface LineWrapperProp<T = any> {
  /**
   * The current index of the line.
   */
  lineIndex: number;
  /**
   * The total number of lines.
   */
  totalLines: number;
  /**
   * Extra props forwarded from SplitText.
   */
  extraProps?: T;
}
export declare const LineWrapper: React.FC<LineWrapperProp>;
export interface WordWrapperProp<T = any> {
  /**
   * The current line index where the word wrapper lives.
   */
  lineIndex: number;
  /**
   * The total number of lines.
   */
  totalLines: number;
  /**
   * The current index of the word.
   */
  wordIndex: number;
  /**
   * The total number of words.
   */
  totalWords: number;
  /**
   * The current index of the total wrapped words inside <SplitText />.
   */
  countIndex: number;
  /**
   * Extra props forwarded from SplitText.
   */
  extraProps?: T;
}
export declare const WordWrapper: React.FC<WordWrapperProp>;
export interface LetterWrapperProp<T = any> {
  /**
   * The current line index where the letter wrapper lives.
   */
  lineIndex: number;
  /**
   * The total number of lines.
   */
  totalLines: number;
  /**
   * The current word index where the letter wrapper lives.
   */
  wordIndex: number;
  /**
   * The total number of words.
   */
  totalWords: number;
  /**
   * The current index of the letter.
   */
  letterIndex: number;
  /**
   * The total number of letters.
   */
  totalLetters: number;
  /**
   * The current index of the total wrapped letters inside <SplitText />.
   */
  countIndex: number;
  /**
   * Extra props forwarded from SplitText.
   */
  extraProps?: T;
}
export declare const LetterWrapper: React.FC<LetterWrapperProp>;
