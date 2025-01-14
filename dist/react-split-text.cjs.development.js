'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault(ex) {
  return ex && typeof ex === 'object' && 'default' in ex ? ex['default'] : ex;
}

var React = require('react');
var React__default = _interopDefault(React);

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === 'string') return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === 'Object' && o.constructor) n = o.constructor.name;
  if (n === 'Map' || n === 'Set') return Array.from(o);
  if (n === 'Arguments' || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
    return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _createForOfIteratorHelperLoose(o, allowArrayLike) {
  var it;

  if (typeof Symbol === 'undefined' || o[Symbol.iterator] == null) {
    if (
      Array.isArray(o) ||
      (it = _unsupportedIterableToArray(o)) ||
      (allowArrayLike && o && typeof o.length === 'number')
    ) {
      if (it) o = it;
      var i = 0;
      return function() {
        if (i >= o.length)
          return {
            done: true,
          };
        return {
          done: false,
          value: o[i++],
        };
      };
    }

    throw new TypeError(
      'Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.'
    );
  }

  it = o[Symbol.iterator]();
  return it.next.bind(it);
}

var LineWrapper = function LineWrapper(_ref) {
  var children = _ref.children;
  return React__default.createElement('div', null, children);
};
var WordWrapper = function WordWrapper(_ref2) {
  var children = _ref2.children;
  return React__default.createElement(
    'span',
    {
      style: {
        whiteSpace: 'pre',
      },
    },
    children
  );
};
var LetterWrapper = function LetterWrapper(_ref3) {
  var children = _ref3.children;
  return React__default.createElement('span', null, children);
};

var DefaultLineWrapper = /*#__PURE__*/ React.memo(LineWrapper);
var DefaultWordWrapper = /*#__PURE__*/ React.memo(WordWrapper);
var DefaultLetterWrapper = /*#__PURE__*/ React.memo(LetterWrapper);
var SplitTextInner = /*#__PURE__*/ React.forwardRef(function SplitTextInner(
  _ref,
  _ref2
) {
  var children = _ref.children,
    className = _ref.className,
    style = _ref.style,
    _ref$LineWrapper = _ref.LineWrapper,
    LineWrapper =
      _ref$LineWrapper === void 0 ? DefaultLineWrapper : _ref$LineWrapper,
    _ref$WordWrapper = _ref.WordWrapper,
    WordWrapper =
      _ref$WordWrapper === void 0 ? DefaultWordWrapper : _ref$WordWrapper,
    _ref$LetterWrapper = _ref.LetterWrapper,
    LetterWrapper =
      _ref$LetterWrapper === void 0 ? DefaultLetterWrapper : _ref$LetterWrapper,
    extraProps = _ref.extraProps;
  var text = '';
  React__default.Children.map(children, function(child) {
    if (typeof child === 'string' || typeof child === 'number') {
      text += String(child);
    } else {
      throw new Error('SplitText expect a text as children');
    }
  });
  var elRef = React.useRef(null);

  var _useState = React.useState([]),
    lines = _useState[0],
    setLines = _useState[1];

  var maxCharPerLine = React.useRef(0);

  function makeLines() {
    var el = elRef.current;
    if (!el) return;

    if (lines.length > 0) {
      return refreshLines(lines, text);
    }

    var lastY;
    var newLines = [];
    var words = [];

    for (
      var _i = 0, _Array$from = Array.from(el.children);
      _i < _Array$from.length;
      _i++
    ) {
      var child = _Array$from[_i];
      var y = child.getBoundingClientRect().top;
      if (lastY == null) lastY = y;

      if (y !== lastY) {
        newLines.push(words.join(' '));
        words = [];
      }

      lastY = y;
      words.push((child.textContent || '').trim());
    }

    newLines.push(words.join(' '));
    setLines(newLines);
  }

  function refreshLines(previous, newText) {
    var charPerLine =
      maxCharPerLine.current ||
      previous
        .map(function(line) {
          return line.length;
        })
        .sort(function(a, b) {
          return b - a;
        })[0];
    var lines = [];
    var line = '';
    var charCount = 0;
    var words = newText.split(' ');

    for (
      var _iterator = _createForOfIteratorHelperLoose(words.entries()), _step;
      !(_step = _iterator()).done;

    ) {
      var _step$value = _step.value,
        word = _step$value[1];
      charCount += word.length + 1;

      if (charCount > charPerLine + 1) {
        lines.push(line);
        line = '';
        charCount = 0;
      }

      line += word.trim() + ' ';
    }

    lines.push(line);
    setLines(
      lines.map(function(line) {
        return line.trim();
      })
    );

    if (charPerLine > maxCharPerLine.current) {
      maxCharPerLine.current = charPerLine;
    }
  }

  React.useLayoutEffect(
    function() {
      return makeLines();
    },
    [text]
  );
  var wordCount = 0;
  var letterCount = 0;

  if (lines.length) {
    var totalLines = lines.length;
    var totalWords = lines.reduce(function(count, line) {
      return count + line.split(' ').length;
    }, 0);
    var totalChars = lines.reduce(function(count, line) {
      var words = line.split(' ');
      words = words.map(function(w, i) {
        return i === words.length - 1 ? w : w + ' ';
      });
      var charCount = words.reduce(function(total, word) {
        return total + word.length;
      }, 0);
      return count + charCount;
    }, 0);
    console.log(
      'Line Total: ' +
        lines.length +
        ', Words Total: ' +
        totalWords +
        ', Letter Total: ' +
        totalChars
    );
    return React__default.createElement(
      'div',
      {
        className: className,
        ref: function ref(div) {
          elRef.current = div;

          if (typeof _ref2 == 'function') {
            _ref2(div);
          } else if (_ref2) {
            _ref2.current = div;
          }
        },
        style: style,
      },
      lines.map(function(line, i) {
        var words = line.split(' ');
        words = words.map(function(word, i) {
          return i === words.length - 1 ? word : word + ' ';
        });
        return React__default.createElement(
          LineWrapper,
          {
            key: i,
            lineIndex: i,
            totalLines: totalLines,
            extraProps: extraProps,
          },
          words.map(function(word, j) {
            var letters = word.split('');
            return React__default.createElement(
              WordWrapper,
              {
                key: j,
                lineIndex: i,
                totalLines: totalLines,
                wordIndex: j,
                totalWords: totalWords,
                countIndex: wordCount++,
                extraProps: extraProps,
              },
              letters.map(function(_char, k) {
                return React__default.createElement(
                  LetterWrapper,
                  {
                    key: k,
                    lineIndex: i,
                    totalLines: totalLines,
                    wordIndex: j,
                    totalWords: totalWords,
                    letterIndex: k,
                    totalLetters: totalChars,
                    countIndex: letterCount++,
                    extraProps: extraProps,
                  },
                  _char
                );
              })
            );
          })
        );
      })
    );
  } else {
    return React__default.createElement(
      'div',
      {
        className: className,
        ref: elRef,
        style: style,
      },
      text.split(' ').map(function(word, i) {
        return React__default.createElement(
          'span',
          {
            key: i,
          },
          word,
          ' '
        );
      })
    );
  }
});
/*
return lines.length ? (
  <div
    className={className}
    ref={div => {
      elRef.current = div;
      if (typeof ref == 'function') {
        ref(div);
      } else if (ref) {
        (ref as MutableRefObject<HTMLDivElement | null>).current = div;
      }
    }}
    style={style}
  >
    {lines.map((line, i) => {
      let words = line.split(' ');
      words = words.map((word, i) =>
        i === words.length - 1 ? word : word + ' '
      );
      return (
        <LineWrapper key={i} lineIndex={i} totalLines={totalLines.current} extraProps={extraProps}>
          {words.map((word, j) => {
            const letters = word.split('');
            return (
              <WordWrapper
                key={j}
                lineIndex={i}
                totalLines={totalLines.current}
                wordIndex={j}
                totalWords={totalWords.current}
                countIndex={wordCount++}
                extraProps={extraProps}
              >
                {letters.map((char, k) => (
                  <LetterWrapper
                    key={k}
                    lineIndex={i}
                    totalLines={totalLines.current}
                    wordIndex={j}
                    totalWords={totalWords.current}
                    letterIndex={k}
                    totalLetters={totalChars.current}
                    countIndex={letterCount++}
                    extraProps={extraProps}
                  >
                    {char}
                  </LetterWrapper>
                ))}
              </WordWrapper>
            );
          })}
        </LineWrapper>
      );
    })}
  </div>
) : (
  <div className={className} ref={elRef} style={style}>
    {text.split(' ').map((word, i) => (
      <span key={i}>{word} </span>
    ))}
  </div>
);

*/

function debounce(callback, wait, immediate) {
  if (immediate === void 0) {
    immediate = false;
  }

  var timeout;
  return function() {
    var _this = this;

    for (
      var _len = arguments.length, args = new Array(_len), _key = 0;
      _key < _len;
      _key++
    ) {
      args[_key] = arguments[_key];
    }

    var callNow = immediate && !timeout;

    var next = function next() {
      return callback.apply(_this, args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(next, wait);

    if (callNow) {
      next();
    }
  };
}

var SplitText = /*#__PURE__*/ React.forwardRef(function SplitText(_ref, ref) {
  var children = _ref.children,
    props = _objectWithoutPropertiesLoose(_ref, ['children']);

  var _useState = React.useState(0),
    key = _useState[0],
    setKey = _useState[1];

  var onResize = debounce(function() {
    return setKey(function(v) {
      return v + 1;
    });
  }, 300);
  React.useEffect(function() {
    window.addEventListener('resize', onResize);
    return function() {
      return window.removeEventListener('resize', onResize);
    };
  }, []);
  return React__default.createElement(
    SplitTextInner,
    Object.assign(
      {
        key: key,
      },
      props,
      {
        ref: ref,
      }
    ),
    children
  );
});

exports.LetterWrapper = LetterWrapper;
exports.LineWrapper = LineWrapper;
exports.SplitText = SplitText;
exports.WordWrapper = WordWrapper;
//# sourceMappingURL=react-split-text.cjs.development.js.map
