// Nav: solid background + shadow once the page scrolls
var nav = document.getElementById('nav');
function updateNavState(){
  if(window.scrollY > 8){ nav.classList.add('is-scrolled'); }
  else{ nav.classList.remove('is-scrolled'); }
}
window.addEventListener('scroll', updateNavState, { passive:true });
updateNavState();

// Mobile nav toggle
var navToggle = document.getElementById('navToggle');
var navLinks = document.getElementById('navLinks');
navToggle.addEventListener('click', function(){
  var isOpen = navLinks.classList.toggle('is-open');
  navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
});
navLinks.querySelectorAll('a').forEach(function(link){
  link.addEventListener('click', function(){
    navLinks.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// Scroll-reveal for elements marked .reveal
if('IntersectionObserver' in window){
  var revealObserver = new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      if(entry.isIntersecting){
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -8% 0px' });

  document.querySelectorAll('.reveal').forEach(function(el){
    revealObserver.observe(el);
  });

  // Hero photo frame ring, once visible
  var heroPhoto = document.getElementById('heroPhoto');
  if(heroPhoto){
    var photoObserver = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(entry.isIntersecting){
          entry.target.classList.add('is-visible');
          photoObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });
    photoObserver.observe(heroPhoto);
  }
} else {
  // No IntersectionObserver support — just show everything
  document.querySelectorAll('.reveal').forEach(function(el){
    el.classList.add('is-visible');
  });
  var fallbackPhoto = document.getElementById('heroPhoto');
  if(fallbackPhoto) fallbackPhoto.classList.add('is-visible');
}

// Note: contact form submission is handled by Formspree's own
// @formspree/ajax library, initialized inline in index.html —
// no custom submit handler needed here.