// Shared search widget — include after search-index.json is fetchable
(function() {
  if (document.getElementById('searchOverlay')) return; // already injected

  var overlay = document.createElement('div');
  overlay.className = 'search-overlay';
  overlay.id = 'searchOverlay';
  overlay.onclick = function(e) { if (e.target === overlay) closeSearch(); };
  overlay.innerHTML =
    '<div class="search-panel">' +
      '<div class="search-input-wrap">' +
        '<svg viewBox="0 0 24 24" style="width:20px;height:20px;stroke:#4a78c8;stroke-width:2.2;fill:none;stroke-linecap:round;flex-shrink:0;"><circle cx="10.5" cy="10.5" r="6.5"/><line x1="15.5" y1="15.5" x2="21" y2="21"/></svg>' +
        '<input type="text" id="searchInput" placeholder="Search everything..." autocomplete="off" oninput="doSearch()" onkeydown="searchKeydown(event)" />' +
        '<button class="search-close" onclick="closeSearch()">✕</button>' +
      '</div>' +
      '<div class="search-results" id="searchResults">' +
        '<div class="search-empty">👆 Type to search across past papers, models, notes, music & more</div>' +
      '</div>' +
    '</div>' +
    '<div class="sres-hint" id="searchHint"></div>';

  document.body.appendChild(overlay);

  // Inject CSS
  var style = document.createElement('style');
  style.textContent =
    '.search-overlay{position:fixed;inset:0;z-index:9999;background:rgba(15,25,50,0.55);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);display:flex;align-items:flex-start;justify-content:center;padding-top:16vh;opacity:0;pointer-events:none;transition:opacity 0.22s}' +
    '.search-overlay.open{opacity:1;pointer-events:auto}' +
    '.search-panel{width:92%;max-width:580px;background:rgba(255,255,255,0.92);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border-radius:20px;border:1.5px solid rgba(74,120,200,0.3);box-shadow:0 20px 60px rgba(0,0,0,0.25);overflow:hidden;max-height:70vh;display:flex;flex-direction:column}' +
    '.search-input-wrap{display:flex;align-items:center;gap:12px;padding:16px 20px;border-bottom:1px solid rgba(74,120,200,0.15)}' +
    '.search-input-wrap input{flex:1;border:none;outline:none;font-family:Nunito,sans-serif;font-size:1.15rem;font-weight:700;font-style:italic;color:#1e3a6e;background:transparent}' +
    '.search-input-wrap input::placeholder{color:#a0b8d8;font-style:italic;font-weight:600}' +
    '.search-close{width:32px;height:32px;border-radius:50%;background:rgba(74,120,200,0.1);border:none;cursor:pointer;flex-shrink:0;display:flex;align-items:center;justify-content:center;font-size:1.1rem;color:#4a78c8;font-weight:800;transition:background 0.15s}' +
    '.search-close:hover{background:rgba(74,120,200,0.2)}' +
    '.search-results{overflow-y:auto;flex:1;padding:8px}' +
    '.search-results::-webkit-scrollbar{width:5px}' +
    '.search-results::-webkit-scrollbar-thumb{background:rgba(74,120,200,0.2);border-radius:3px}' +
    '.search-empty{text-align:center;padding:40px 20px;font-family:Nunito,sans-serif;font-size:0.95rem;font-weight:600;font-style:italic;color:#8aafd8}' +
    '.sres-item{display:flex;align-items:center;gap:14px;padding:12px 16px;border-radius:12px;text-decoration:none;color:inherit;transition:background 0.15s}' +
    '.sres-item:hover,.sres-item.active{background:rgba(74,120,200,0.08)}' +
    '.sres-icon{width:36px;height:36px;border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:1rem;flex-shrink:0}' +
    '.sres-body{flex:1;min-width:0}' +
    '.sres-title{font-family:Nunito,sans-serif;font-size:0.95rem;font-weight:800;font-style:italic;color:#1e3a6e;line-height:1.3;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}' +
    '.sres-title mark{background:rgba(74,120,200,0.18);color:#1e3a6e;border-radius:2px;padding:0 1px}' +
    '.sres-badge{display:inline-block;padding:2px 10px;border-radius:10px;font-size:0.7rem;font-weight:800;letter-spacing:0.3px;margin-top:3px}' +
    '.sres-badge.paper{background:#e8f0fe;color:#2563c7}' +
    '.sres-badge.model{background:#eaf7ea;color:#0e8a6d}' +
    '.sres-badge.note{background:#fef3e8;color:#c07a3a}' +
    '.sres-badge.music{background:#fde8f0;color:#c76a8a}' +
    '.sres-badge.game{background:#e8e4fe;color:#6a4ac7}' +
    '.sres-badge.page{background:#deedf7;color:#3a7aac}' +
    '.sres-hint{position:absolute;top:100%;left:50%;transform:translateX(-50%);margin-top:16px;font-family:Nunito,sans-serif;font-size:0.8rem;font-weight:600;color:rgba(255,255,255,0.55);text-align:center;pointer-events:none}' +
    '@media(max-width:580px){.search-panel{max-height:60vh}}';
  document.head.appendChild(style);
})();

var searchIdx = [];
var searchActive = -1;

fetch('search-index.json')
  .then(function(r) { return r.json(); })
  .then(function(data) { searchIdx = data; })
  .catch(function() { console.warn('Search index not loaded'); });

window.openSearch = function() {
  var o = document.getElementById('searchOverlay');
  o.classList.add('open');
  setTimeout(function() { document.getElementById('searchInput').focus(); }, 100);
  window._showHint('↑↓ navigate  ·  ↵ open  ·  esc close');
};

window.closeSearch = function() {
  document.getElementById('searchOverlay').classList.remove('open');
  document.getElementById('searchInput').value = '';
  document.getElementById('searchResults').innerHTML =
    '<div class="search-empty">👆 Type to search across past papers, models, notes, music & more</div>';
  searchActive = -1;
};

window._showHint = function(msg) {
  var h = document.getElementById('searchHint');
  h.textContent = msg;
  clearTimeout(h._t);
  h._t = setTimeout(function() { h.textContent = ''; }, 3000);
};

var badgeClass = {
  'Past Paper': 'paper', 'Simulation Model': 'model', 'Review Note': 'note',
  'Music': 'music', 'Gaming': 'game', 'Page': 'page', 'Private Space': 'game'
};

var catIcon = {
  'Past Paper': '📄', 'Simulation Model': '🧪', 'Review Note': '📝',
  'Music': '🎵', 'Gaming': '🎮', 'Page': '📁', 'Private Space': '🔐'
};

window.doSearch = function() {
  var q = document.getElementById('searchInput').value.trim().toLowerCase();
  var container = document.getElementById('searchResults');
  if (!q) {
    container.innerHTML = '<div class="search-empty">👆 Type to search across past papers, models, notes, music & more</div>';
    searchActive = -1;
    return;
  }
  var terms = q.split(/\s+/);
  var matches = [];
  for (var i = 0; i < searchIdx.length; i++) {
    var item = searchIdx[i];
    var score = 0;
    for (var j = 0; j < terms.length; j++) {
      var t = terms[j];
      if (item.title.toLowerCase().indexOf(t) !== -1) score += 2;
      if (item.category.toLowerCase().indexOf(t) !== -1) score += 1;
    }
    if (score > 0) matches.push({ item: item, score: score });
  }
  matches.sort(function(a, b) { return b.score - a.score; });
  matches = matches.slice(0, 25);

  if (matches.length === 0) {
    container.innerHTML = '<div class="search-empty">😕 No results found</div>';
    searchActive = -1;
    return;
  }

  var html = '';
  for (var k = 0; k < matches.length; k++) {
    var m = matches[k];
    html +=
      '<a class="sres-item' + (k === 0 ? ' active' : '') + '" href="' + m.item.url + '" ' +
      'onmouseenter="window._setActive(' + k + ')" onclick="closeSearch()">' +
      '<div class="sres-icon">' + (catIcon[m.item.category] || '📄') + '</div>' +
      '<div class="sres-body">' +
        '<div class="sres-title">' + highlight(m.item.title, terms) + '</div>' +
        '<span class="sres-badge ' + (badgeClass[m.item.category] || 'page') + '">' + m.item.category + '</span>' +
      '</div>' +
      '</a>';
  }
  container.innerHTML = html;
  searchActive = 0;
  window._showHint(matches.length + ' results  ·  ↑↓ navigate  ·  ↵ open');
};

function highlight(text, terms) {
  var result = text;
  for (var i = 0; i < terms.length; i++) {
    var t = terms[i];
    var re = new RegExp('(' + t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'gi');
    result = result.replace(re, '<mark>$1</mark>');
  }
  return result;
}

window._setActive = function(i) {
  var items = document.querySelectorAll('.sres-item');
  if (searchActive >= 0 && items[searchActive]) items[searchActive].classList.remove('active');
  searchActive = i;
  if (items[i]) items[i].classList.add('active');
};

window.searchKeydown = function(e) {
  var items = document.querySelectorAll('.sres-item');
  if (e.key === 'ArrowDown') { e.preventDefault(); window._setActive(Math.min(searchActive + 1, items.length - 1)); }
  else if (e.key === 'ArrowUp') { e.preventDefault(); window._setActive(Math.max(searchActive - 1, 0)); }
  else if (e.key === 'Enter') {
    e.preventDefault();
    if (searchActive >= 0 && items[searchActive]) { items[searchActive].click(); }
  }
  else if (e.key === 'Escape') { closeSearch(); }
  var active = document.querySelector('.sres-item.active');
  if (active) active.scrollIntoView({ block: 'nearest' });
};

document.addEventListener('keydown', function(e) {
  if ((e.metaKey || e.ctrlKey) && e.key === 'k') { e.preventDefault(); openSearch(); }
});
