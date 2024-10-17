
import '../css/kontakta-oss.scss'



	
let accordions = document.querySelectorAll('.kontakta-faq__accordion');
accordions.forEach(accordion => {
  let items = accordion.querySelectorAll('.kontakta-faq__accordion__block .kontakta-faq__accordion__block__question');

  items.forEach(item => {
    item.addEventListener('click', e => {
      if (e.currentTarget.classList.contains('open')) {
        e.currentTarget.classList.remove('open');
      } else {
        items.forEach(el => {
          el.classList.remove('open');
        });
        e.currentTarget.classList.add('open');
      }
    });
  });
});
