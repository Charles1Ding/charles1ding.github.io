/* ============================================================
   Curriculum Switch — mechanism (AL/IG <-> AP)
   Global one-click toggle shared across the whole site.
   Depends on: ap-models.js (window.AP_MODELS, window.AP_TOPICS)
   ============================================================ */
(function () {
  var KEY = 'chem_curriculum';       // 'alig' (default) | 'ap'
  var EVT = 'curriculumchange';

  // Default is always AL. localStorage is ignored on first load so every
  // fresh visit opens the blue page; the toggle only persists within the
  // session via set(). To force AL at all times, the get() below can ignore
  // localStorage entirely.
  function get() {
    return 'alig';
  }

  function set(v) {
    v = v === 'ap' ? 'ap' : 'alig';
    localStorage.setItem(KEY, v);
    document.documentElement.setAttribute('data-curriculum', v);
    window.dispatchEvent(new CustomEvent(EVT, { detail: { curriculum: v } }));
  }

  // Reflect current state on <html> as early as possible (no layout shift).
  document.documentElement.setAttribute('data-curriculum', get());

  /* ---- Card image & link swap (data-ap-* / data-al-*) ---- */
  function swapAssets(mode) {
    document.querySelectorAll('img[data-ap-src]').forEach(function (img) {
      var target = mode === 'ap' ? (img.dataset.apSrc || img.dataset.alSrc) : (img.dataset.alSrc || img.src);
      // Cache-busting so the browser always re-fetches the new theme image.
      img.src = target.split('?')[0] + '?v=' + (mode === 'ap' ? 'ap' : 'alig');
    });
    document.querySelectorAll('a[data-ap-href]').forEach(function (a) {
      a.href = mode === 'ap' ? (a.dataset.apHref || a.dataset.alHref) : (a.dataset.alHref || a.href);
    });
    var notesLabel = document.getElementById('notesCardLabel');
    if (notesLabel) notesLabel.textContent = mode === 'ap' ? 'AP Revision' : 'Review Notes';
    var papersLabel = document.getElementById('papersCardLabel');
    if (papersLabel) papersLabel.textContent = mode === 'ap' ? 'AP Past Papers' : 'Past Papers';
  }
  // Run swap after DOM is ready (script is loaded in <head>, so the body is
  // empty at IIFE run time).
  function initSwap() { swapAssets(get()); }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSwap);
  } else {
    initSwap();
  }
  window.addEventListener(EVT, function (e) { swapAssets(e.detail.curriculum); });

  /* ---- AP copy accessors (safe fallback to AL/IG) ---- */

  // Returns the display title for a model given its base model object.
  function modelTitle(model) {
    if (get() === 'ap' && window.AP_MODELS) {
      var ap = window.AP_MODELS[model.file];
      if (ap && ap.title) return ap.title;
    }
    return model.title;
  }

  function modelDesc(model) {
    if (get() === 'ap' && window.AP_MODELS) {
      var ap = window.AP_MODELS[model.file];
      if (ap && ap.desc) return ap.desc;
    }
    return model.desc;
  }

  // AP unit label for a topic key (falls back to provided AL/IG label).
  function topicLabel(topicKey, fallbackLabel) {
    if (get() === 'ap' && window.AP_TOPICS && window.AP_TOPICS.labels) {
      var l = window.AP_TOPICS.labels[topicKey];
      if (l) return l;
    }
    return fallbackLabel;
  }

  // AP observe-hint for a topic key (falls back to provided AL/IG tip).
  function topicTip(topicKey, fallbackTip) {
    if (get() === 'ap' && window.AP_TOPICS && window.AP_TOPICS.tips) {
      var t = window.AP_TOPICS.tips[topicKey];
      if (t) return t;
    }
    return fallbackTip;
  }

  // AP label for a filter button key (falls back to provided AL/IG label).
  function filterLabel(filterKey, fallbackLabel) {
    if (get() === 'ap' && window.AP_TOPICS && window.AP_TOPICS.filters) {
      var f = window.AP_TOPICS.filters[filterKey];
      if (f) return f;
    }
    return fallbackLabel;
  }

  /* ---- Toggle pill renderer ---- */
  // Renders a pill into the element(s) matching selector. `opts.floating` adds
  // fixed positioning. Multiple pills stay in sync via the global event.
  function renderToggle(selector, opts) {
    opts = opts || {};
    var hosts = typeof selector === 'string'
      ? document.querySelectorAll(selector)
      : [selector];
    hosts.forEach(function (host) {
      if (!host) return;
      var pill = document.createElement('div');
      pill.className = 'curr-toggle' + (opts.floating ? ' floating' : '');
      pill.title = 'Switch curriculum: AL/IG ↔ AP';
      pill.innerHTML =
        '<button data-curr="alig">\uD83D\uDCD8 AL / IG</button>' +
        '<button data-curr="ap">\uD83D\uDCD7 AP</button>';
      host.appendChild(pill);

      function paint() {
        var cur = get();
        pill.querySelectorAll('button').forEach(function (b) {
          b.classList.toggle('active', b.getAttribute('data-curr') === cur);
        });
      }
      pill.addEventListener('click', function (e) {
        var b = e.target.closest('button');
        if (!b) return;
        set(b.getAttribute('data-curr'));
      });
      window.addEventListener(EVT, paint);
      paint();
    });
  }

  window.Curriculum = {
    KEY: KEY,
    EVENT: EVT,
    get: get,
    set: set,
    modelTitle: modelTitle,
    modelDesc: modelDesc,
    topicLabel: topicLabel,
    topicTip: topicTip,
    filterLabel: filterLabel,
    renderToggle: renderToggle
  };
})();
