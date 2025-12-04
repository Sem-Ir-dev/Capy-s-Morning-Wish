// ==========================
// Простая логика интерактивности
// ==========================

// DOM
const toMenuBtn = document.getElementById('toMenuBtn');
const menuSection = document.getElementById('menu');
const orderForm = document.getElementById('orderForm');
const previewName = document.getElementById('previewName');
const previewDate = document.getElementById('previewDate');
const previewDish = document.getElementById('previewDish');
const previewNote = document.getElementById('previewNote');
const categoryRow = document.getElementById('categoryRow');
const dishesList = document.getElementById('dishesList');
const dateInput = document.getElementById('date');
const nameInput = document.getElementById('name');
const noteField = document.getElementById('noteField');
const modal = document.getElementById('modal');
const closeModal = document.getElementById('closeModal');
const floatingCapy = document.getElementById('floatingCapy');
const capyToast = document.getElementById('capyToast');
const astroQuote = document.getElementById('astroQuote');
const newQuoteBtn = document.getElementById('newQuote');

const menuData = {
    sweet: [
        {id:'s1',name:'Капи-вафли',desc:'Хрустящие вафли с кленовым сиропом, свежими ягодами и взбитыми сливками<br/><br/>Цена: 3 поцелуйчика 💋'},
        {id:'s2',name:'Капи-тосты',desc:'Тосты, запечённые в яично-молочной смеси с корицей. Подавать с йогуртом и абрикосовым джемом<br/><br/>Цена: 2 поцелуйчика 💋'},
        {id:'s3',name:'Блинчики',desc:'Тонкие блинчики с творожной или шоколадной начинкой, свёрнутые в конвертики<br/><br/>Цена: 2 поцелуйчика 💋'}
    ],
    light: [
        {id:'l1',name:'Авокапи-тост',desc:'Цельнозерновой тост с авокадо и семенами<br/><br/>Цена: 3 поцелуйчика 💋'},
        {id:'l2',name:'Йогуртный парфе',desc:'Нежный йогурт, мюсли и ягоды<br/><br/>Цена: 2 поцелуйчика 💋'},
        {id:'l3',name:'Рулетики «Утренний луч»',desc:'Лаваш или тортилья с мягким сыром, слабосолёной семгой и огурцом<br/><br/>Цена: 2 поцелуйчика 💋'}
    ],
    hearty: [
        {id:'h1',name:'Капи-омлет',desc:'Пушистый омлет с сыром и травами<br/><br/>Цена: 2 поцелуйчика 💋'},
        {id:'h2',name:'Гречневая миска',desc:'Теплая гречка с овощами и соусом<br/><br/>Цена: 2 поцелуйчика 💋'},
        {id:'h3',name:'Запеканка',desc:'Творожная или картофельная запеканка с сосисками или ягодами<br/><br/>Цена: 3 поцелуйчика 💋'}
    ],
    fast: [
        {id:'h1',name:'Идеальные бутерброды',desc:'С колбасой и сыром<br/><br/>Цена: 2 поцелуйчика 💋'},
        {id:'h2',name:'Йогурт «Мгновение»',desc:'Готовый греческий йогурт в баночке с набором топпингов (гранола, орешки, сублимированные ягоды) отдельно<br/><br/>Цена: 3 поцелуйчика 💋'},
        {id:'h3',name:'Готовые блинчики',desc:'Со вечера можно приготовить тонкие блинчики, а утром просто разогреть с начинкой<br/><br/>Цена: 2 поцелуйчика 💋'}
    ]
};

let selectedCategory = null;
let selectedDish = null;

// Set date default to tomorrow
(function setDefaultDate(){
    const t = new Date();
    t.setDate(t.getDate()+1);
    const iso = t.toISOString().split('T')[0];
    dateInput.value = iso;
})();

// Scroll to menu
toMenuBtn.addEventListener('click', ()=>{
    menuSection.scrollIntoView({behavior:'smooth',block:'center'});
});

// Category select
categoryRow.addEventListener('click',(e)=>{
    const card = e.target.closest('.card-option');
    if(!card) return;
    [...categoryRow.children].forEach(c=>c.classList.remove('active'));
    card.classList.add('active');
    selectedCategory = card.dataset.cat;
    selectedDish = null;
    renderDishes(selectedCategory);
    refreshPreview();
});

function renderDishes(cat){
    dishesList.innerHTML='';
    if(!cat) return;
    const list = menuData[cat];
    const wrap = document.createElement('div');
    list.forEach(d => {
        const el = document.createElement('div');
        el.className='card-option';
        el.style.flex='1';
        el.innerHTML = `<strong>${d.name}</strong><div class="dish-desc">${d.desc}</div>`;
        el.addEventListener('click', ()=>{
        // mark active dish
          [...wrap.children].forEach(ch=>ch.classList.remove('active'));
          el.classList.add('active');
          selectedDish = d;
          refreshPreview();
    });
    wrap.appendChild(el);
});
    dishesList.appendChild(wrap);
}

function refreshPreview(){
    previewName.innerHTML = `Имя: <strong>${nameInput.value || '—'}</strong>`;
    previewDate.innerHTML = `Дата: <strong>${dateInput.value || '—'}</strong>`;
    previewDish.innerHTML = `Блюдо: <strong>${selectedDish ? selectedDish.name : (selectedCategory ? 'Выберите блюдо' : '—')}</strong>`;
    previewNote.innerText = `Особые пожелания: ${noteField.value || '—'}`;
}

// live updates
[nameInput,dateInput,noteField].forEach(el=>el.addEventListener('input',refreshPreview));

function collectPayload(){
    return {
        name: nameInput.value,
        date: dateInput.value,
        category: selectedCategory,
        dish: selectedDish ? selectedDish.name : null,
        note: noteField.value
    };
}

// Submit -> simulate sending
orderForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    const payload = collectPayload();

    // Validation (simple)
    if(!payload.date || !payload.dish){
        alert('Пожалуйста, укажи дату и выбери блюдо.');
        return;
    }

    // TODO: replace this block with real integration (Formspree/EmailJS/Telegram)
    // Example (Formspree):
    // fetch('https://formspree.io/f/YOUR_ID', {method:'POST', body: new FormData(orderForm)})
    //   .then(r => ...)

    console.log('=== Отправка на бэкенд (симуляция) ===');
    console.log(payload);

    // show modal
    modal.classList.add('show');

    // gentle reset of form (but keep name)
    setTimeout(()=>{
        dateInput.value = ''; // keep empty — пользователь может выбрать новую дату
        selectedCategory=null; selectedDish=null; dishesList.innerHTML='';
        [...categoryRow.children].forEach(c=>c.classList.remove('active'));
        noteField.value='';
        refreshPreview();
    },700);
});

closeModal.addEventListener('click', ()=>{modal.classList.remove('show')});

// Floating capy click -> friendly toast
floatingCapy.addEventListener('click', ()=>{
    capyToast.classList.add('show');
    // tiny sound/animation placeholder — if you want to play sound, integrate audio here
    // const audio = new Audio('capy-sound.mp3'); audio.play();
    setTimeout(()=>capyToast.classList.remove('show'),2200);
});

// Astro quotes
const quotes = [
    'Пусть в кружке будет немного больше карамели, чем нужно — для храбрости.',
    'Сегодня идеальный день для того, чтобы съесть ещё одну булочку.',
    'Если утро холодное — добавь ещё одну тёплую мысль.',
    'Капибара говорит: обними чашку, прежде чем пить.',
    'Звёзды шепчут — раздели завтрак с кем-то, кто улыбается.',
    'Пусть сегодня все важные дела решатся сами, пока ты нежишься в тёплой луже своего настроения.',
    'Желаю, чтобы даже самый простой завтрак принёс тебе невероятное удовольствие. Как будто ты впервые пробуешь сочную травку после дождя.',
    'Пусть сегодня твоё сердце будет таким же тёплым и мягким, как брюшко у спящей капибары.',
    'Помни: иногда самое продуктивное, что можно сделать — это просто полежать и поразмыслить о вечном, медленно пережёвывая салатик.'
];
newQuoteBtn.addEventListener('click', ()=>{
    astroQuote.textContent = quotes[Math.floor(Math.random()*quotes.length)];
});

// Initial preview fill
refreshPreview();

// Scroll reveal simple observer
const revealEls = document.querySelectorAll('.hero, .menu, .astro');
const io = new IntersectionObserver((entries)=>{
    entries.forEach(en=>{
        if(en.isIntersecting){
          en.target.style.transition='opacity .8s ease, transform .8s ease';
          en.target.style.opacity=1;en.target.style.transform='none';
        }else{en.target.style.opacity=0;en.target.style.transform='translateY(12px)'}
    });
},{threshold:0.12});
revealEls.forEach(el=>{el.style.opacity=0;el.style.transform='translateY(12px)';io.observe(el)});

// Accessibility niceties: close modal on ESC
document.addEventListener('keydown',(e)=>{ if(e.key==='Escape'){modal.classList.remove('show')} });