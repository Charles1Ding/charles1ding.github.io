/* ============================================================
   Curriculum Swap — model DETAIL pages (AL/IG <-> AP)
   Single-file drop-in: self-loads curriculum.css / ap-models.js /
   curriculum.js, adds a floating toggle, and swaps the page <h1>
   title + intro paragraph based on AP copy (safe fallback).
   Inject with:  <script src="curriculum-swap.js" defer></script>
   ============================================================ */
(function () {
  var BASE = (function () {
    // resolve site root relative to this script so it works in subfolders too
    var s = document.currentScript;
    if (s && s.src) return s.src.replace(/curriculum-swap\.js.*$/, '');
    return '';
  })();

  function ensureCss(href) {
    if (document.querySelector('link[href$="curriculum.css"]')) return;
    var l = document.createElement('link');
    l.rel = 'stylesheet';
    l.href = href;
    document.head.appendChild(l);
  }

  function loadScript(src) {
    return new Promise(function (resolve, reject) {
      var existing = document.querySelector('script[src$="' + src.split('/').pop() + '"]');
      if (existing && window.__cs_loaded__ && window.__cs_loaded__[src]) return resolve();
      var el = document.createElement('script');
      el.src = src;
      el.onload = function () {
        window.__cs_loaded__ = window.__cs_loaded__ || {};
        window.__cs_loaded__[src] = true;
        resolve();
      };
      el.onerror = reject;
      document.head.appendChild(el);
    });
  }

  function currentFile() {
    var path = decodeURIComponent(location.pathname);
    var name = path.substring(path.lastIndexOf('/') + 1);
    return name || 'index.html';
  }

  function findTitleEl() {
    return document.querySelector('h1');
  }

  function findIntroEl(h1) {
    if (!h1) return null;
    // Prefer a <p> that is the next element sibling of h1 (or within same header).
    var sib = h1.nextElementSibling;
    if (sib && sib.tagName === 'P') return sib;
    var parent = h1.parentElement;
    if (parent) {
      var p = parent.querySelector('p');
      if (p) return p;
    }
    return null;
  }

  function init() {
    var C = window.Curriculum;
    if (!C) return;

    var file = currentFile();
    var titleEl = findTitleEl();
    var introEl = findIntroEl(titleEl);

    // Capture originals so we can restore when switching back.
    if (titleEl && titleEl.getAttribute('data-orig-title') === null) {
      titleEl.setAttribute('data-orig-title', titleEl.textContent);
    }
    if (titleEl && !titleEl.hasAttribute('data-orig-title')) {
      titleEl.setAttribute('data-orig-title', titleEl.textContent);
    }
    if (introEl && !introEl.hasAttribute('data-orig-intro')) {
      introEl.setAttribute('data-orig-intro', introEl.textContent);
    }

    function apply() {
      var isAp = C.get() === 'ap';
      var ap = (window.AP_MODELS && window.AP_MODELS[file]) || null;
      if (titleEl) {
        var origT = titleEl.getAttribute('data-orig-title');
        titleEl.textContent = (isAp && ap && ap.title) ? ap.title : origT;
      }
      if (introEl) {
        var origI = introEl.getAttribute('data-orig-intro');
        introEl.textContent = (isAp && ap && ap.desc) ? ap.desc : origI;
      }
    }

    // Floating toggle pill (top-right).
    var host = document.createElement('div');
    host.id = 'currToggleHostDetail';
    document.body.appendChild(host);
    C.renderToggle(host, { floating: true });

    window.addEventListener(C.EVENT, apply);
    apply();
  }

  ensureCss(BASE + 'curriculum.css');
  loadScript(BASE + 'ap-models.js')
    .then(function () { return loadScript(BASE + 'curriculum.js'); })
    .then(function () {
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
      } else {
        init();
      }
    })
    .catch(function () { /* silent: fall back to native AL/IG page */ });
})();
