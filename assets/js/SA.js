// Simple JS for mobile nav toggle and reveal-on-scroll animations
document.addEventListener('DOMContentLoaded', function(){
  const mobileBtn = document.getElementById('mobile-menu-button');
  const mobileNav = document.getElementById('mobile-nav');
  if(mobileBtn && mobileNav){
    mobileBtn.addEventListener('click', ()=>{
      mobileNav.classList.toggle('hidden');
      mobileNav.classList.toggle('block');
    });
  }

  // Add reveal classes to sections with varied animations
  const header = document.querySelector('header');
  if(header) header.classList.add('reveal', 'fade-left');

  const heroSection = document.querySelector('section'); // first section (hero)
  if(heroSection) heroSection.classList.add('reveal');

  const aboutSection = document.getElementById('about');
  if(aboutSection) aboutSection.classList.add('reveal');

  const projectsSection = document.getElementById('projects');
  if(projectsSection){
    projectsSection.classList.add('reveal');
    const projectGrid = projectsSection.querySelector('.grid');
    if(projectGrid) projectGrid.classList.add('reveal-stagger');
  }

  const skillsSection = document.getElementById('skills');
  if(skillsSection){
    skillsSection.classList.add('reveal');
    const skillsList = document.getElementById('skills-list');
    if(skillsList) skillsList.classList.add('reveal-stagger');
  }

  const contactSection = document.getElementById('contact');
  if(contactSection) contactSection.classList.add('reveal', 'fade-right');

  const footer = document.querySelector('footer');
  if(footer) footer.classList.add('reveal');

  // IntersectionObserver for triggering animations
  const revealElements = document.querySelectorAll('.reveal, .reveal-stagger');
  
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add('revealed');
        // unobserve to keep it simple
        io.unobserve(entry.target);
      }
    });
  }, {threshold: 0.1, rootMargin: '0px 0px -80px 0px'});

  revealElements.forEach(el=> io.observe(el));
});
