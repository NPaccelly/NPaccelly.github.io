(function(){
  // ===== Nav com fundo ao rolar =====
  var nav = document.getElementById('siteNav');
  function onScroll(){
    if(window.scrollY > 24){ nav.classList.add('scrolled'); }
    else { nav.classList.remove('scrolled'); }
  }
  window.addEventListener('scroll', onScroll, {passive:true});
  onScroll();

  // ===== Menu mobile =====
  var toggle = document.getElementById('navToggle');
  var menu = document.getElementById('mobileMenu');
  toggle.addEventListener('click', function(){
    menu.classList.toggle('open');
  });
  menu.querySelectorAll('a').forEach(function(a){
    a.addEventListener('click', function(){ menu.classList.remove('open'); });
  });

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ===== Contador animado dos números do hero =====
  function animateCount(el){
    var target = parseInt(el.dataset.target, 10);
    var suffix = el.dataset.suffix || '';
    var duration = 1400;
    var start = performance.now();
    function tick(now){
      var progress = Math.min((now - start) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(eased * target) + suffix;
      if(progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  if(reduceMotion){
    document.querySelectorAll('.hero-stats .num').forEach(function(el){
      el.textContent = el.dataset.target + (el.dataset.suffix || '');
    });
    document.querySelectorAll('.reveal, .stage-item').forEach(function(el){
      el.classList.add('in-view');
    });
  } else if('IntersectionObserver' in window){
    var statObserver = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(entry.isIntersecting){
          animateCount(entry.target);
          statObserver.unobserve(entry.target);
        }
      });
    }, {threshold:0.6});
    document.querySelectorAll('.hero-stats .num').forEach(function(el){ statObserver.observe(el); });

    // ===== Revelação suave das seções ao rolar =====
    var revealObserver = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(entry.isIntersecting){
          entry.target.classList.add('in-view');
          revealObserver.unobserve(entry.target);
        }
      });
    }, {threshold:0.14, rootMargin:'0px 0px -40px 0px'});
    document.querySelectorAll('.reveal').forEach(function(el){ revealObserver.observe(el); });

    // ===== Pontos da linha do tempo acendem ao entrar em vista =====
    var stageObserver = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(entry.isIntersecting){
          entry.target.classList.add('in-view');
        }
      });
    }, {threshold:0.5});
    document.querySelectorAll('.stage-item').forEach(function(el){ stageObserver.observe(el); });
  }
})();
