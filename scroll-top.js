// Scroll-to-top button — injected into long pages
(function() {
  var btn = document.createElement('button');
  btn.innerHTML = '↑';
  btn.id = 'scrollTopBtn';
  btn.setAttribute('aria-label', 'Back to top');
  btn.style.cssText = 'position:fixed;bottom:24px;right:24px;z-index:9997;width:44px;height:44px;border-radius:50%;background:rgba(30,45,70,0.85);backdrop-filter:blur(8px);border:1.5px solid rgba(148,180,220,0.3);color:#c8ddf8;font-size:1.3rem;font-weight:800;cursor:pointer;opacity:0;transform:translateY(16px);transition:opacity 0.3s,transform 0.3s;display:flex;align-items:center;justify-content:center;line-height:1;';
  btn.onclick = function() { window.scrollTo({ top: 0, behavior: 'smooth' }); };
  btn.onmouseover = function() { this.style.background='rgba(34,211,238,0.2)'; this.style.borderColor='rgba(34,211,238,0.5)'; this.style.color='#22d3ee'; };
  btn.onmouseout = function() { this.style.background='rgba(30,45,70,0.85)'; this.style.borderColor='rgba(148,180,220,0.3)'; this.style.color='#c8ddf8'; };
  document.body.appendChild(btn);

  var ticking = false;
  window.addEventListener('scroll', function() {
    if (!ticking) {
      requestAnimationFrame(function() {
        if (window.scrollY > 300) {
          btn.style.opacity = '1';
          btn.style.transform = 'translateY(0)';
        } else {
          btn.style.opacity = '0';
          btn.style.transform = 'translateY(16px)';
        }
        ticking = false;
      });
      ticking = true;
    }
  });
})();
