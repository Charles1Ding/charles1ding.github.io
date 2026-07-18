/* ── Shared Dark Mode Toggle ── */
(function() {
  if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark');
  }
  var btn = document.getElementById('themeBtn');
  if (btn) btn.textContent = document.body.classList.contains('dark') ? '\u2600\uFE0F' : '\uD83C\uDF19';
})();
window.toggleTheme = function() {
  var d = document.body.classList.toggle('dark');
  localStorage.setItem('theme', d ? 'dark' : 'light');
  var btn = document.getElementById('themeBtn');
  if (btn) btn.textContent = d ? '\u2600\uFE0F' : '\uD83C\uDF19';
};
