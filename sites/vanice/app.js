/**
 * VANICE PRIVATE ESTATES - ENGINE DE ANIMAÇÃO & FLUIDEZ
 * Minimalismo, elegância e interações orgânicas
 */

// Base de Dados dos Imóveis com as Fotos Oficiais do Projeto
const PROPERTIES_DATA = [
  {
    id: 'penthouse-ipanema',
    title: 'Penthouse Al Mare',
    location: 'Ipanema · Posto 10, Rio de Janeiro',
    tagLocation: 'Ipanema',
    price: 'R$ 38.000.000',
    area: '680 m²',
    specsShort: '680 m² · 4 suítes · 5 vagas',
    image: './assets/images/cobertura-ipanema-living.jpg',
    excerpt: 'Living de 140 m² integrado ao terraço panorâmico com vista perene para as Ilhas Cagarras e o mar aberto.',
    specs: [
      { label: 'Área Privativa', value: '680 m²' },
      { label: 'Suítes Master', value: '4 Suítes' },
      { label: 'Vagas de Garagem', value: '5 Vagas' },
      { label: 'Condomínio', value: 'R$ 14.200 / mês' },
      { label: 'IPTU', value: 'R$ 68.000 / ano' },
      { label: 'Posição', value: 'Frontal Mar' }
    ],
    details: 'Uma das mais raras coberturas lineares do Posto 10. Projetada para proporcionar continuidade absoluta entre o living e o oceano, com esquadrias de piso a teto que recolhem integralmente. Piso em mármore travertino navona e projeto luminotécnico assinado.',
    highlights: [
      'Vista panorâmica sem obstruções para o mar de Ipanema',
      'Living com pé-direito de 3,20m e climatização central VRF',
      'Automação completa Lutron para iluminação e cortinas',
      'Suíte principal com closet duplo e sala de banho com vista'
    ]
  },
  {
    id: 'vila-horizon-sunset',
    title: 'Vila Horizon Sunset',
    location: 'Costa Verde · Enseada Privativa, RJ',
    tagLocation: 'Costa Verde',
    price: 'R$ 52.000.000',
    area: '1.250 m²',
    specsShort: '1.250 m² · 6 suítes · Heliponto',
    image: './assets/images/residencia-sunset-infinity.jpg',
    excerpt: 'Piscina de borda infinita com 25 metros sobre as rochas ao entardecer e pavilhão de vidro contemporâneo.',
    specs: [
      { label: 'Área do Terreno', value: '3.800 m²' },
      { label: 'Área Construída', value: '1.250 m²' },
      { label: 'Suítes', value: '6 Suítes com Decks' },
      { label: 'Píer Privativo', value: 'Para iates até 90 pés' },
      { label: 'Heliponto', value: 'Homologado dia/noite' },
      { label: 'Orientação', value: 'Pôr do Sol Definitivo' }
    ],
    details: 'Arquitetura que parece levitar sobre as águas transparentes da Costa Verde. Volumes de concreto aparente e panos de vidro que se abrem para um espelho d\'água infinito emoldurado pelo pôr do sol. Privacidade total em condomínio de altíssimo padrão.',
    highlights: [
      'Piscina infinita aquecida com iluminação subaquática cênica',
      'Pavilhão social envidraçado com cortinas fluídas',
      'Deck náutico privativo com poita e guincho',
      'Infraestrutura completa de segurança patrimonial blindada'
    ]
  },
  {
    id: 'residencia-atlantica',
    title: 'Residência Atlântica',
    location: 'Copacabana · Golden Mile, Rio de Janeiro',
    tagLocation: 'Copacabana',
    price: 'R$ 24.500.000',
    area: '520 m²',
    specsShort: '520 m² · 4 suítes · 4 vagas',
    image: './assets/images/copacabana-penthouse-orla.jpg',
    excerpt: 'Perspectiva privilegiada sobre o calçadão de Burle Marx e a praia, em edifício ícone da arquitetura carioca.',
    specs: [
      { label: 'Área Privativa', value: '520 m²' },
      { label: 'Suítes', value: '4 Suítes' },
      { label: 'Vagas', value: '4 Vagas demarcadas' },
      { label: 'Condomínio', value: 'R$ 9.800 / mês' },
      { label: 'Andar', value: 'Andar Alto Exclusivo' },
      { label: 'Segurança', value: 'Guarita 24h Blindada' }
    ],
    details: 'Uma celebração do design brasileiro e da vista mais famosa do mundo. Planta circular com generosidade de espaços sociais, marcenaria sob medida em peroba e freijó, e uma sala de jantar que acomoda 14 pessoas com vista direta para a baía.',
    highlights: [
      'Vista frontal ininterrupta da praia de Copacabana',
      'Marcenaria autoral com painéis ripados integrados',
      'Adega climatizada para 600 garrafas',
      'Edifício clássico com portaria suntuosa e elevador privativo'
    ]
  },
  {
    id: 'grand-suite-leblon',
    title: 'Grand Suite Leblon',
    location: 'Leblon · Delfim Moreira, Rio de Janeiro',
    tagLocation: 'Leblon',
    price: 'R$ 29.800.000',
    area: '480 m²',
    specsShort: '480 m² · 4 suítes · Vista Mar',
    image: './assets/images/suite-master-mar.jpg',
    excerpt: 'Suíte master com 75 m² debruçada sobre o mar com esquadrias acústicas e marcenaria minimalista.',
    specs: [
      { label: 'Área Privativa', value: '480 m²' },
      { label: 'Suítes', value: '4 Suítes Presidenciais' },
      { label: 'Vagas', value: '4 Vagas' },
      { label: 'Localização', value: 'Av. Delfim Moreira' },
      { label: 'Vista', value: 'Mar Total e Morro Dois Irmãos' },
      { label: 'Acabamento', value: 'Pisos de Madeira Natural' }
    ],
    details: 'Uma residência concebida com atmosfera de refúgio privativo. As esquadrias alemãs eliminam qualquer ruído externo, permitindo a contemplação serena do mar do Leblon. Tons neutros, texturas de linho e luz solar em abundância.',
    highlights: [
      'Suíte Master com varanda privativa integrada',
      'Closet duplo walk-in com iluminação embutida',
      'Home office reservado com vista panorâmica',
      'Quarteirão nobre a passos dos melhores bistrôs do Leblon'
    ]
  },
  {
    id: 'spa-bath-pavilion',
    title: 'Spa & Bath Ocean Pavilion',
    location: 'Joá · Encosta Verde, Rio de Janeiro',
    tagLocation: 'Costa Verde',
    price: 'R$ 34.000.000',
    area: '820 m²',
    specsShort: '820 m² · 5 suítes · Spa Privativo',
    image: './assets/images/spa-banho-oceano.jpg',
    excerpt: 'Sala de banho monumental em mármore travertino com banheira de imersão entre a mata e o mar.',
    specs: [
      { label: 'Área Construída', value: '820 m²' },
      { label: 'Suítes', value: '5 Suítes com Varanda' },
      { label: 'Banheiros', value: '7 Banheiros em Rocha Natural' },
      { label: 'Garagem', value: '6 Vagas cobertas' },
      { label: 'Privacidade', value: 'Encosta sem vizinhos frontais' },
      { label: 'Lazer', value: 'Sauna úmida e Spa mineral' }
    ],
    details: 'O encontro sublime entre o design escandinavo e o calor tropical do Rio. A sala de banho principal é um santuário de descanso com banheira freestanding italiana posicionada estrategicamente frente ao oceano azul turquesa.',
    highlights: [
      'Banheira de imersão esculpida em resina mineral',
      'Chuveiros duplos com sistema de hidroterapia',
      'Pisos em pedras naturais atérmicas',
      'Vista cruzada para o mar e para o verde da encosta'
    ]
  },
  {
    id: 'cozinha-gourmet-chef',
    title: 'Cozinha Gourmet do Chef',
    location: 'Alto Gávea · Parque Natural, Rio de Janeiro',
    tagLocation: 'Leblon',
    price: 'R$ 21.000.000',
    area: '560 m²',
    specsShort: '560 m² · Ilha de 4m · Gaggenau',
    image: './assets/images/cozinha-gourmet-minimalista.jpg',
    excerpt: 'Ilha central em quartzo calacatta maciço com torre de cocção Gaggenau e iluminação suave.',
    specs: [
      { label: 'Área Privativa', value: '560 m²' },
      { label: 'Suítes', value: '4 Suítes' },
      { label: 'Cozinha', value: 'Ilha central monolítica' },
      { label: 'Equipamentos', value: 'Linha Premium Alemã' },
      { label: 'Vagas', value: '4 Vagas' },
      { label: 'Ambiente', value: 'Lounge e Adega Integrados' }
    ],
    details: 'Desenhada para os entusiastas da alta gastronomia e recepções memoráveis. Ausência total de puxadores visíveis, marcenaria em laca fosca acetinada e sancas com iluminação indireta de temperatura quente (2700K).',
    highlights: [
      'Ilha de trabalho em bloco monolítico de quartzo',
      'Torre completa com fornos a vapor e aquecedor de pratos',
      'Espaço bar com banquetas em madeira maciça e couro',
      'Integração fluida com a sala de almoço e área externa'
    ]
  },
  {
    id: 'mansao-cliffside-joa',
    title: 'Mansão Cliffside Joá',
    location: 'Joá · Penhasco Privativo, Rio de Janeiro',
    tagLocation: 'Joá',
    price: 'R$ 46.000.000',
    area: '1.100 m²',
    specsShort: '1.100 m² · 5 suítes · Piscina Suspensa',
    image: './assets/images/mansao-joa-cliffside.jpg',
    excerpt: 'Arquitetura monumental esculpida no penhasco com balanços em concreto branco, forro em ripas de teca e piscina suspensa sobre o Atlântico.',
    specs: [
      { label: 'Área Construída', value: '1.100 m²' },
      { label: 'Suítes Master', value: '5 Suítes com Decks' },
      { label: 'Garagem', value: '6 Vagas cobertas' },
      { label: 'Condomínio', value: 'R$ 6.800 / mês' },
      { label: 'IPTU', value: 'R$ 48.000 / ano' },
      { label: 'Vista', value: '180° Mar Aberto e Pedra da Gávea' }
    ],
    details: 'Uma escultura modernista pousada sobre o costão rochoso do Joá. Estrutura em balanço de concreto branco, forro em madeira nobre e portas de vidro piso-teto que integram o living monumental à piscina aquecida de borda infinita.',
    highlights: [
      'Piscina aquecida em balanço sobre as rochas',
      'Varanda gourmet com churrasqueira em inox marítimo',
      'Esquadrias piso-teto de 3,40m com isolamento acústico',
      'Guarita blindada com controle de acesso biométrico'
    ]
  },
  {
    id: 'residencia-botanico-nature',
    title: 'Residência Mata Atlântica',
    location: 'Jardim Botânico · Encosta do Corcovado, RJ',
    tagLocation: 'Jardim Botânico',
    price: 'R$ 32.000.000',
    area: '920 m²',
    specsShort: '920 m² · 5 suítes · Bosque Preservado',
    image: './assets/images/residencia-angra-mar.jpg',
    excerpt: 'Simbiose poética entre arquitetura contemporânea e a floresta tropical nativa, com ripado de madeira e pátio central.',
    specs: [
      { label: 'Área do Terreno', value: '2.400 m²' },
      { label: 'Área Construída', value: '920 m²' },
      { label: 'Suítes', value: '5 Suítes Integradas' },
      { label: 'Garagem', value: '5 Vagas' },
      { label: 'Preservação', value: 'Bosque Privativo Nativo' },
      { label: 'Energia', value: 'Painéis Solares & Captação Pluvial' }
    ],
    details: 'Imersa na vegetação exuberante do Jardim Botânico, esta residência assinada privilegia o silêncio, a iluminação zenital e os materiais orgânicos. Grandes panos de vidro trazem a copa das árvores centenárias para dentro de todos os ambientes sociais.',
    highlights: [
      'Integração total com a copa da Mata Atlântica',
      'Deck de madeira cumaru com lounge externo aquecido',
      'Adega subterrânea climatizada em rocha natural',
      'Energia solar autossuficiente e captação de água'
    ]
  },
  {
    id: 'villa-modernista-gavea',
    title: 'Villa Bauhaus Gávea',
    location: 'Alto Gávea · Parque Imperial, Rio de Janeiro',
    tagLocation: 'Gávea',
    price: 'R$ 27.500.000',
    area: '850 m²',
    specsShort: '850 m² · 4 suítes · Solarium Panorâmico',
    image: './assets/images/mansao-jardim-botanico.jpg',
    excerpt: 'Linhas puras revestidas em limestone claro, solarium privativo na cobertura e piscina em pedra hijau com cascata.',
    specs: [
      { label: 'Área Construída', value: '850 m²' },
      { label: 'Suítes', value: '4 Suítes Presidenciais' },
      { label: 'Vagas', value: '6 Vagas Subterrâneas' },
      { label: 'Condomínio', value: 'R$ 5.500 / mês' },
      { label: 'Pé-direito', value: '6 Metros no Living' },
      { label: 'Lazer', value: 'Rooftop Solarium com Spa' }
    ],
    details: 'Projetada com rigor geométrico e elegância atemporal. A fachada em placas de limestone monolítico contrasta com a transparência das esquadrias em alumínio anodizado preto. O rooftop com solarium oferece uma perspectiva panorâmica rara das montanhas.',
    highlights: [
      'Rooftop solarium com spa e vista para as montanhas',
      'Piscina com cascata de inox e pedra hijau tailandesa',
      'Living com pé-direito duplo de 6 metros',
      'Garagem subterrânea para 6 veículos com carregador elétrico'
    ]
  },
  {
    id: 'residencia-reserva-mar',
    title: 'Residência Marapendi',
    location: 'Barra da Tijuca · Reserva da Praia, RJ',
    tagLocation: 'Barra',
    price: 'R$ 26.000.000',
    area: '780 m²',
    specsShort: '780 m² · 5 suítes · Lagoa & Mar',
    image: './assets/images/residencia-reserva-barra.jpg',
    excerpt: 'Mansão linear contemporânea com laje em balanço branco, esquadrias minimalistas e espelho d\'água cristalino.',
    specs: [
      { label: 'Área do Terreno', value: '1.200 m²' },
      { label: 'Área Construída', value: '780 m²' },
      { label: 'Suítes', value: '5 Suítes Térreas' },
      { label: 'Vagas', value: '6 Vagas' },
      { label: 'Condomínio', value: 'R$ 4.800 / mês' },
      { label: 'Segurança', value: 'Circuito Fechado & Ronda Armada' }
    ],
    details: 'Uma casa pensada para a convivência horizontal com total fluidez. A planta linear conecta todos os dormitórios ao jardim central e à piscina de raia. Ambientes inundados por luz natural e ventilação cruzada permanente.',
    highlights: [
      'Condomínio fechado com marina privativa e segurança armada',
      'Espelho d\'água integrado à varanda de almoço',
      'Piso em grandes placas de porcelanato acetinado italiano',
      'Suíte térrea acessível com jardim privativo'
    ]
  },
  {
    id: 'penthouse-delfim-lounge',
    title: 'Penthouse Living Delfim',
    location: 'Leblon · Posto 12, Rio de Janeiro',
    tagLocation: 'Leblon',
    price: 'R$ 36.500.000',
    area: '620 m²',
    specsShort: '620 m² · 4 suítes · Lareira Ecológica',
    image: './assets/images/penthouse-delfim-moreira.jpg',
    excerpt: 'Cobertura com lareira em chevron de pedra natural, painel de freijó ripado, cozinha integrada e terraço para o mar.',
    specs: [
      { label: 'Área Privativa', value: '620 m²' },
      { label: 'Suítes', value: '4 Suítes' },
      { label: 'Vagas', value: '4 Vagas demarcadas' },
      { label: 'Condomínio', value: 'R$ 13.000 / mês' },
      { label: 'IPTU', value: 'R$ 55.000 / ano' },
      { label: 'Exclusividade', value: '1 Unidade por Andar' }
    ],
    details: 'O equilíbrio perfeito entre sofisticação contemporânea e calor residencial. O living amplo conta com lareira ecológica emoldurada em mosaico de mármore cinza, marcenaria em madeira freijó natural e portas de correr que abrem para a orla mais desejada do Leblon.',
    highlights: [
      'Living amplo com lareira ecológica integrada',
      'Cozinha de chef integrada e copa social',
      'Automação residencial completa Control4',
      'Edifício de apenas uma unidade por andar com vista eterna'
    ]
  }
];

// Slides do Hero Cinematográfico
const HERO_ITEMS = [
  {
    tag: 'Ipanema · Posto 10',
    title: 'Penthouse Al Mare',
    sub: '680 m² com living aberto e horizonte definitivo para o Atlântico.',
    image: './assets/images/cobertura-ipanema-living.jpg',
    id: 'penthouse-ipanema'
  },
  {
    tag: 'Costa Verde · Falésia',
    title: 'Vila Horizon Sunset',
    sub: '1.250 m² com piscina de borda infinita e pavilhão envidraçado.',
    image: './assets/images/residencia-sunset-infinity.jpg',
    id: 'vila-horizon-sunset'
  },
  {
    tag: 'Copacabana · Golden Mile',
    title: 'Residência Atlântica',
    sub: '520 m² com vista panorâmica para o clássico calçadão de Burle Marx.',
    image: './assets/images/copacabana-penthouse-orla.jpg',
    id: 'residencia-atlantica'
  }
];

let activeHeroIndex = 0;
let heroTimer = null;

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
  setupFluidScroll();
  setupEntrance();
  setupHero();
  renderCleanGrid(PROPERTIES_DATA);
  setupFilterTabs();
  setupScrollHeader();
  setupScrollObserver();
  setupCleanForm();
  setupLuxuryCursor();
});

// 1. Entrada Editorial e Suave (Apenas ao Clicar)
function setupEntrance() {
  const screen = document.getElementById('entrance-screen');
  if (!screen) return;

  // Pausa a rolagem enquanto a tela de abertura estiver ativa
  if (window.lenisInstance) {
    window.lenisInstance.stop();
  }

  // A tela sai ESTRITAMENTE quando o usuário clica ou pressiona tecla
  screen.addEventListener('click', () => {
    enterSite();
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ' || e.key === 'Escape') {
      enterSite();
    }
  });
}

function enterSite() {
  const screen = document.getElementById('entrance-screen');
  if (!screen || screen.classList.contains('unveiled')) return;
  screen.classList.add('unveiled');

  window.scrollTo(0, 0);
  if (window.lenisInstance) {
    window.lenisInstance.scrollTo(0, { immediate: true });
    window.lenisInstance.start();
    window.lenisInstance.resize();
  }
}
window.enterSite = enterSite;

function replayEntrance(e) {
  if (e) e.preventDefault();
  const screen = document.getElementById('entrance-screen');
  if (!screen) return;
  screen.classList.remove('unveiled');
  if (window.lenisInstance) {
    window.lenisInstance.stop();
  }
}
window.replayEntrance = replayEntrance;

// 2. Hero Fluido (Transição Suave Anterior de Fundo)
function setupHero() {
  const slider = document.getElementById('hero-slider');
  const tagEl = document.getElementById('hero-tagline');
  const headingEl = document.getElementById('hero-heading');
  const subEl = document.getElementById('hero-subheading');
  const actionBtn = document.getElementById('hero-dossier-btn');
  
  if (!slider || !headingEl) return;
  
  slider.innerHTML = HERO_ITEMS.map((item, idx) => `
    <div class="hero-slide ${idx === 0 ? 'active' : ''}" data-index="${idx}">
      <img src="${item.image}" alt="${item.title}" class="hero-slide-img">
    </div>
  `).join('');
  
  function changeHeroSlide(index) {
    activeHeroIndex = index;
    const item = HERO_ITEMS[index];
    const slides = slider.querySelectorAll('.hero-slide');
    
    // Transição suave anterior (toggle active)
    slides.forEach((s, i) => {
      s.classList.toggle('active', i === index);
    });
    
    // Coreografia de texto com subida suave
    tagEl.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
    headingEl.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
    subEl.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
    
    tagEl.style.opacity = '0';
    tagEl.style.transform = 'translateY(14px)';
    headingEl.style.opacity = '0';
    headingEl.style.transform = 'translateY(22px)';
    subEl.style.opacity = '0';
    subEl.style.transform = 'translateY(14px)';
    
    setTimeout(() => {
      tagEl.textContent = item.tag;
      headingEl.textContent = item.title;
      subEl.textContent = item.sub;
      subEl.style.color = '#e5cdab'; // Dourado nobre
      
      tagEl.style.transition = 'opacity 0.8s var(--ease-silk), transform 0.8s var(--ease-silk)';
      headingEl.style.transition = 'opacity 0.9s var(--ease-silk), transform 0.9s var(--ease-silk)';
      subEl.style.transition = 'opacity 1s var(--ease-silk), transform 1s var(--ease-silk)';
      
      tagEl.style.opacity = '1';
      tagEl.style.transform = 'translateY(0)';
      headingEl.style.opacity = '1';
      headingEl.style.transform = 'translateY(0)';
      subEl.style.opacity = '1';
      subEl.style.transform = 'translateY(0)';
      
      if (actionBtn) {
        actionBtn.onclick = () => openDrawer(item.id);
      }
    }, 380);
  }
  
  function nextSlide() {
    activeHeroIndex = (activeHeroIndex + 1) % HERO_ITEMS.length;
    changeHeroSlide(activeHeroIndex);
  }
  
  function resetHeroTimer() {
    clearInterval(heroTimer);
    heroTimer = setInterval(nextSlide, 7500);
  }
  
  changeHeroSlide(0);
  resetHeroTimer();
}

// 3. Grid Minimalista e Arejado de Imóveis (com Stagger Cascata)
function renderCleanGrid(items) {
  const container = document.getElementById('properties-grid');
  if (!container) return;
  
  if (items.length === 0) {
    container.innerHTML = `
      <div class="col-span-full py-20 text-center text-[#787f89] font-light">
        Nenhuma residência encontrada para esta categoria.
      </div>
    `;
    return;
  }
  
  container.innerHTML = items.map((prop, idx) => `
    <article class="property-card space-y-4 cursor-pointer reveal-on-scroll" style="transition-delay: ${idx * 90}ms" onclick="openDrawer('${prop.id}')">
      
      <!-- Moldura da Fotografia com Proporção Nobre -->
      <div class="property-img-wrapper aspect-[16/11] rounded-sm">
        <img src="${prop.image}" alt="${prop.title}" loading="lazy">
      </div>
      
      <!-- Tipografia Limpa e Externa à Foto -->
      <div class="space-y-2 pt-1">
        <div class="flex items-center justify-between text-[10px] tracking-luxury uppercase text-[#787f89]">
          <span>${prop.location}</span>
          <span class="text-[#e5cdab] font-medium">${prop.price}</span>
        </div>
        
        <h3 class="text-2xl font-serif text-white font-light tracking-wide hover:text-[#e5cdab] transition-colors duration-300">
          ${prop.title}
        </h3>
        
        <p class="text-xs text-[#9ca3af] font-light">
          ${prop.specsShort}
        </p>

        <div class="pt-2 flex items-center gap-2 group-hover:gap-3 transition-all duration-300">
          <span class="text-[11px] uppercase tracking-luxury text-[#e5cdab] font-light">
            Acessar Memorial
          </span>
          <span class="text-[#e5cdab] text-xs">→</span>
        </div>
      </div>
      
    </article>
  `).join('');
  
  // Reaplica observador de animação e micro-interações
  setupScrollObserver();
  if (typeof attachCursorHover === 'function') attachCursorHover();
  if (window.lenisInstance) window.lenisInstance.resize();
}

// 4. Abas de Filtro Minimalistas com Transição Suave
function setupFilterTabs() {
  const tabsContainer = document.getElementById('filter-tabs');
  const gridContainer = document.getElementById('properties-grid');
  if (!tabsContainer) return;
  
  const tabs = tabsContainer.querySelectorAll('.filter-tab');
  
  tabs.forEach(tab => {
    tab.addEventListener('click', (e) => {
      tabs.forEach(t => t.classList.remove('active'));
      e.currentTarget.classList.add('active');
      
      const filter = e.currentTarget.dataset.filter;
      
      if (gridContainer) {
        gridContainer.style.opacity = '0';
        gridContainer.style.transform = 'translateY(10px)';
        gridContainer.style.transition = 'opacity 0.22s var(--ease-silk), transform 0.22s var(--ease-silk)';
        
        setTimeout(() => {
          if (filter === 'all') {
            renderCleanGrid(PROPERTIES_DATA);
          } else {
            const filterKeywords = filter.split(',').map(s => s.trim().toLowerCase());
            const filtered = PROPERTIES_DATA.filter(p => {
              const loc = (p.location || '').toLowerCase();
              const tag = (p.tagLocation || '').toLowerCase();
              return filterKeywords.some(kw => loc.includes(kw) || tag.includes(kw));
            });
            renderCleanGrid(filtered);
          }
          gridContainer.style.opacity = '1';
          gridContainer.style.transform = 'translateY(0)';
        }, 220);
      }
    });
  });
}

// 5. Drawer / Gaveta Lateral de Detalhes
function openDrawer(propId) {
  const property = PROPERTIES_DATA.find(p => p.id === propId);
  if (!property) return;
  
  const drawer = document.getElementById('property-drawer');
  const content = document.getElementById('drawer-content');
  if (!drawer || !content) return;
  
  const whatsappMsg = encodeURIComponent(
    `Olá, Vanice Private Estates. Gostaria de receber o dossiê confidencial e agendar uma visita para "${property.title}" (${property.location}).`
  );
  
  content.innerHTML = `
    <!-- Topo da Gaveta com Botão Fechar -->
    <div class="flex items-center justify-between pb-6 border-b border-white/[0.08]">
      <span class="text-[10px] uppercase tracking-luxury text-[#cbb28d]">Memorial de Residência</span>
      <button onclick="closeDrawer(event)" class="text-xs uppercase tracking-luxury text-[#787f89] hover:text-white transition-colors cursor-pointer">
        Fechar ✕
      </button>
    </div>

    <!-- Imagem Principal & Mini-Galeria Interativa -->
    <div class="space-y-3">
      <div class="property-img-wrapper aspect-[16/10] rounded-sm overflow-hidden border border-white/[0.08]">
        <img id="drawer-main-photo" src="${property.image}" alt="${property.title}" class="w-full h-full object-cover transition-all duration-500">
      </div>
      
      <div class="space-y-1">
        <span class="text-[9px] uppercase tracking-luxury text-[#cbb28d] font-light">Vistas e Ambientes da Residência</span>
        <div class="flex items-center gap-2 overflow-x-auto pb-1 pt-1">
          ${PROPERTIES_DATA.map((p, i) => `
            <div class="drawer-thumb ${p.image === property.image ? 'active' : ''}" onclick="switchDrawerPhoto('${p.image}', this)" title="${p.title}">
              <img src="${p.image}" alt="${p.title}">
            </div>
          `).join('')}
        </div>
      </div>
    </div>

    <!-- Título & Preço -->
    <div class="space-y-2">
      <span class="text-[11px] uppercase tracking-luxury text-[#787f89] block">${property.location}</span>
      <h2 class="text-3xl md:text-4xl font-serif text-white font-light">${property.title}</h2>
      <p class="text-xl font-serif text-[#e5cdab] pt-1">${property.price}</p>
    </div>

    <!-- Descrição Curatorial -->
    <div class="space-y-3 text-sm text-[#9ca3af] font-light leading-relaxed">
      <p>${property.details}</p>
    </div>

    <!-- Especificações em Linha Limpa -->
    <div class="py-6 border-y border-white/[0.08] space-y-3">
      <h4 class="text-xs uppercase tracking-luxury text-white font-medium">Ficha do Imóvel</h4>
      <div class="grid grid-cols-2 gap-4 text-xs">
        ${property.specs.map(s => `
          <div class="space-y-0.5">
            <span class="text-[#787f89] block text-[10px] uppercase tracking-wide">${s.label}</span>
            <span class="text-white font-light">${s.value}</span>
          </div>
        `).join('')}
      </div>
    </div>

    <!-- Destaques Arquitetônicos -->
    <div class="space-y-3">
      <h4 class="text-xs uppercase tracking-luxury text-white font-medium">Diferenciais Construtivos</h4>
      <ul class="space-y-2 text-xs text-[#9ca3af] font-light">
        ${property.highlights.map(h => `
          <li class="flex items-start gap-3">
            <span class="text-[#e5cdab] mt-0.5">•</span>
            <span>${h}</span>
          </li>
        `).join('')}
      </ul>
    </div>

    <!-- Ação Direta -->
    <div class="pt-6 space-y-3">
      <a href="https://wa.me/5521999999999?text=${whatsappMsg}" target="_blank" rel="noopener noreferrer" class="btn-clean-primary w-full text-center">
        Agendar Visita com Concierge
      </a>
      <p class="text-[10px] text-center text-[#787f89] uppercase tracking-luxury font-light">
        Atendimento discreto e sob protocolo de sigilo
      </p>
    </div>
  `;
  
  drawer.classList.add('open');
  document.body.style.overflow = 'hidden';
  if (window.lenisInstance) {
    window.lenisInstance.stop();
  }
}

function switchDrawerPhoto(imgSrc, thumbEl) {
  const mainImg = document.getElementById('drawer-main-photo');
  if (!mainImg) return;
  mainImg.style.opacity = '0';
  mainImg.style.transform = 'scale(1.03)';
  setTimeout(() => {
    mainImg.src = imgSrc;
    mainImg.style.opacity = '1';
    mainImg.style.transform = 'scale(1)';
  }, 220);

  const thumbs = document.querySelectorAll('.drawer-thumb');
  thumbs.forEach(t => t.classList.remove('active'));
  if (thumbEl) thumbEl.classList.add('active');
}
window.switchDrawerPhoto = switchDrawerPhoto;

function closeDrawer(e) {
  if (e) e.stopPropagation();
  const drawer = document.getElementById('property-drawer');
  if (drawer) {
    drawer.classList.remove('open');
    document.body.style.overflow = '';
    if (window.lenisInstance) {
      window.lenisInstance.start();
    }
  }
}

// 6. Header com Transição ao Rolar a Página
function setupScrollHeader() {
  const header = document.getElementById('main-header');
  if (!header) return;
  
  window.addEventListener('scroll', () => {
    updateHeaderScroll(window.scrollY);
  }, { passive: true });
}

// 7. Observer de Scroll para Animações Fluidas
function setupScrollObserver() {
  const elements = document.querySelectorAll('.reveal-on-scroll:not(.revealed)');
  if (!elements.length) return;
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });
  
  elements.forEach(el => observer.observe(el));
}

// 8. Formulário de Contato Silencioso
function setupCleanForm() {
  const form = document.getElementById('clean-contact-form');
  const status = document.getElementById('contact-status');
  if (!form) return;
  
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (status) {
      status.textContent = 'Sua solicitação foi encaminhada confidencialmente ao nosso concierge. Entraremos em contato.';
      form.reset();
    }
  });
}

// 9. Scroll Fluido de Seda (Lenis Luxury Engine)
let lenisInstance = null;

function setupFluidScroll() {
  if (typeof Lenis !== 'undefined') {
    lenisInstance = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Curva exponencial suave de seda
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.2,
      infinite: false
    });

    window.lenisInstance = lenisInstance;

    function raf(time) {
      lenisInstance.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    lenisInstance.on('scroll', (e) => {
      updateTopProgress(e.progress);
      updateHeaderScroll(e.scroll);
    });

    // Rolagem suave para âncoras internas
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId && targetId !== '#' && targetId.length > 1) {
          const targetEl = document.querySelector(targetId);
          if (targetEl) {
            e.preventDefault();
            lenisInstance.scrollTo(targetEl, { offset: -70, duration: 1.2 });
          }
        }
      });
    });
  } else {
    // Fallback nativo suave e limpo caso a lib não esteja presente
    window.addEventListener('scroll', () => {
      updateTopProgress();
      updateHeaderScroll(window.scrollY);
    }, { passive: true });
  }
}

// 10. Linha de Progresso Superior
function updateTopProgress(progress) {
  const line = document.getElementById('top-scroll-line');
  if (!line) return;
  if (typeof progress === 'number') {
    line.style.width = `${Math.min(100, Math.max(0, progress * 100))}%`;
  } else {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const pct = max > 0 ? (window.scrollY / max) * 100 : 0;
    line.style.width = `${pct}%`;
  }
}

// 11. Atualização do Header no Scroll
function updateHeaderScroll(scrollY) {
  const header = document.getElementById('main-header');
  if (!header) return;
  const y = typeof scrollY === 'number' ? scrollY : window.scrollY;
  if (y > 40) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
}

// 12. Cursor Editorial Interativo (Desktop)
function setupLuxuryCursor() {
  const cursor = document.getElementById('luxury-cursor');
  if (!cursor || window.matchMedia('(pointer: coarse)').matches) return;

  let mouseX = -100, mouseY = -100;
  let cursorX = -100, cursorY = -100;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    if (!cursor.classList.contains('active')) {
      cursor.classList.add('active');
    }
  });

  window.addEventListener('mouseleave', () => {
    cursor.classList.remove('active');
  });

  function renderCursor() {
    cursorX += (mouseX - cursorX) * 0.16;
    cursorY += (mouseY - cursorY) * 0.16;
    cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0) translate(-50%, -50%)`;
    requestAnimationFrame(renderCursor);
  }
  requestAnimationFrame(renderCursor);

  function attachCursorHover() {
    document.querySelectorAll('.property-card, .property-img-wrapper').forEach(el => {
      el.addEventListener('mouseenter', () => cursor.classList.add('hovering-card'));
      el.addEventListener('mouseleave', () => cursor.classList.remove('hovering-card'));
    });

    document.querySelectorAll('a, button, input, textarea, .filter-tab').forEach(el => {
      if (!el.closest('.property-card')) {
        el.addEventListener('mouseenter', () => cursor.classList.add('hovering-btn'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('hovering-btn'));
      }
    });
  }
  attachCursorHover();
  window.attachCursorHover = attachCursorHover;
}
