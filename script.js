// Lazy-load images and set footer year
document.addEventListener('DOMContentLoaded', function(){
  const lazyImages = [].slice.call(document.querySelectorAll('img.lazy'));
  if('IntersectionObserver' in window){
    const io = new IntersectionObserver((entries, obs)=>{
      entries.forEach(entry=>{
        if(entry.isIntersecting){
          const img = entry.target;
          img.src = img.dataset.src;
          img.addEventListener('load', ()=> img.classList.add('loaded'));
          img.removeAttribute('data-src');
          obs.unobserve(img);
        }
      });
    },{rootMargin:'200px'});
    lazyImages.forEach(img=> io.observe(img));
  } else {
    // Fallback: load all
    lazyImages.forEach(img=>{
      img.src = img.dataset.src; img.addEventListener('load',()=>img.classList.add('loaded'));
    });
  }

  const yearEl = document.getElementById('year');
  if(yearEl) yearEl.textContent = new Date().getFullYear();
});
