/* @ds-bundle: {"format":4,"namespace":"DaniMegerDesignSystem_1b3890","components":[{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"EyebrowLabel","sourcePath":"components/core/EyebrowLabel.jsx"},{"name":"Icon","sourcePath":"components/core/Icon.jsx"}],"sourceHashes":{"components/core/Badge.jsx":"92035c09f12b","components/core/Button.jsx":"86743cef55a4","components/core/EyebrowLabel.jsx":"2f78b6a035ba","components/core/Icon.jsx":"39e41ea1de44"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.DaniMegerDesignSystem_1b3890 = window.DaniMegerDesignSystem_1b3890 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/core/Badge.jsx
try { (() => {
function Badge({
  children
}) {
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-block',
      fontSize: '0.6rem',
      fontWeight: 700,
      letterSpacing: '0.1em',
      textTransform: 'uppercase',
      color: 'var(--text-on-gold)',
      background: 'var(--gold)',
      padding: '3px 10px',
      borderRadius: 'var(--radius-pill)'
    }
  }, children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const {
  useState
} = React;
const SIZES = {
  hero: {
    padding: '20px 48px',
    fontSize: '0.95rem',
    borderRadius: 'var(--radius-xl)'
  },
  compact: {
    padding: '18px 24px',
    fontSize: '0.88rem',
    borderRadius: 'var(--radius-lg)'
  }
};
function Button({
  children,
  size = 'hero',
  fullWidth = false,
  href,
  style,
  ...rest
}) {
  const [hover, setHover] = useState(false);
  const Tag = href ? 'a' : 'button';
  const baseStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: fullWidth ? '100%' : undefined,
    fontFamily: 'var(--font-sans)',
    fontWeight: 700,
    letterSpacing: '0.02em',
    color: 'var(--text-on-gold)',
    background: 'var(--gradient-gold)',
    border: 'none',
    cursor: 'pointer',
    textAlign: 'center',
    boxShadow: hover ? 'var(--shadow-gold-btn-hover)' : 'var(--shadow-gold-btn)',
    transform: hover ? 'translateY(-3px)' : 'none',
    transition: 'transform 0.3s, box-shadow 0.3s',
    ...SIZES[size],
    ...style
  };
  return /*#__PURE__*/React.createElement(Tag, _extends({
    href: href,
    style: baseStyle,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false)
  }, rest), children);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/EyebrowLabel.jsx
try { (() => {
function EyebrowLabel({
  children,
  soft = false,
  style
}) {
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-block',
      fontSize: 'var(--text-eyebrow)',
      fontWeight: 'var(--weight-bold)',
      letterSpacing: 'var(--tracking-widest)',
      textTransform: 'uppercase',
      // --text-accent already swaps shade per theme (light gold on
      // dark pages, dark bronze on light pages) to stay legible
      color: soft ? 'var(--text-accent-soft)' : 'var(--text-accent)',
      marginBottom: 20,
      ...style
    }
  }, children);
}
Object.assign(__ds_scope, { EyebrowLabel });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/EyebrowLabel.jsx", error: String((e && e.message) || e) }); }

// components/core/Icon.jsx
try { (() => {
function renderPaths(name) {
  switch (name) {
    case 'bar-chart-3':
      return /*#__PURE__*/React.createElement("path", {
        d: "M9 19v-6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2zm0 0V9a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v10m-6 0a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2m0 0V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2z"
      });
    case 'lock':
      return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("rect", {
        x: "3",
        y: "11",
        width: "18",
        height: "11",
        rx: "2",
        ry: "2"
      }), /*#__PURE__*/React.createElement("path", {
        d: "M7 11V7a5 5 0 0 1 10 0v4"
      }));
    case 'graduation-cap':
      return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
        d: "M22 10v6M2 10l10-5 10 5-10 5z"
      }), /*#__PURE__*/React.createElement("path", {
        d: "M6 12v5c3 3 9 3 12 0v-5"
      }));
    case 'book-open':
      return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
        d: "M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"
      }), /*#__PURE__*/React.createElement("path", {
        d: "M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"
      }));
    default:
      return null;
  }
}
function Icon({
  name,
  size = 16,
  color = 'currentColor',
  style
}) {
  return /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    strokeWidth: "1.5",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    width: size,
    height: size,
    style: style
  }, renderPaths(name));
}
Object.assign(__ds_scope, { Icon });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Icon.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.EyebrowLabel = __ds_scope.EyebrowLabel;

__ds_ns.Icon = __ds_scope.Icon;

})();
