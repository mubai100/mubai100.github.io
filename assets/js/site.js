/* 木白 · 全站统一交互 v1：回到顶部 + 顶栏导航高亮 */
(function(){
  function ready(fn){
    if(document.readyState !== 'loading'){ fn(); }
    else{ document.addEventListener('DOMContentLoaded', fn); }
  }
  ready(function(){
    /* 回到顶部 */
    if(!document.querySelector('.mb-totop')){
      var btn = document.createElement('button');
      btn.className = 'mb-totop';
      btn.type = 'button';
      btn.setAttribute('aria-label', '回到顶部');
      btn.textContent = '↑';
      document.body.appendChild(btn);
      btn.addEventListener('click', function(){
        window.scrollTo({ top:0, behavior:'smooth' });
      });
      window.addEventListener('scroll', function(){
        if(window.scrollY > 420){ btn.classList.add('show'); }
        else{ btn.classList.remove('show'); }
      }, { passive:true });
    }

    /* 顶栏导航高亮（仅首页锚点场景） */
    var nav = document.querySelector('.mb-sitebar .mb-nav');
    if(!nav) return;
    var links = Array.prototype.slice.call(nav.querySelectorAll('a[href*="#"]'));
    if(!links.length) return;
    var map = [];
    links.forEach(function(a){
      var hash = a.getAttribute('href').split('#')[1];
      if(!hash) return;
      var el = document.getElementById(hash);
      if(el) map.push({ el: el, a: a });
    });
    if(!map.length) return;
    if('IntersectionObserver' in window){
      var obs = new IntersectionObserver(function(entries){
        entries.forEach(function(e){
          if(e.isIntersecting){
            var hit = map.filter(function(m){ return m.el === e.target; })[0];
            if(hit){
              links.forEach(function(a){ a.classList.remove('active'); });
              hit.a.classList.add('active');
            }
          }
        });
      }, { rootMargin:'-45% 0px -50% 0px' });
      map.forEach(function(m){ obs.observe(m.el); });
    }
  });
})();
