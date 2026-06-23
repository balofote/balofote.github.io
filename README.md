# balofote's rabbit hole 🐇

Uma página pessoal interativa com tema **Windows XP**, hospedada no GitHub Pages. Simula um desktop retrô completo com tela de login, taskbar funcional, janelas arrastáveis, sistema de foco de janelas, screensaver animado, player Winamp (Webamp) integrado e um instalador glitchado do Counter-Strike 1.6.

> 🐇 *"welcome, stranger. are u here just 4fun too? hahahah. now tell me, where u wanna go?"*

---

## 🎯 Visão Geral

O projeto recria a experiência de um desktop Windows XP diretamente no navegador. O usuário passa por uma tela de login autêntica (com welcome text animado, seleção de usuário e som de inicialização) antes de acessar o desktop, que conta com taskbar funcional, ícones clicáveis, janela de links, sistema de foco de janelas (z-index dinâmico), player Winamp (Webamp) com 9 músicas, um instalador glitchado do Counter-Strike 1.6 e um screensaver animado do DVD.

---

## 📋 Funcionalidades

### Tela de Login (Windows XP)
- **Fase 1 (0–3s):** Texto "welcome" em fonte Framdit (72px, itálico) sobre fundo `login.png`. Interação bloqueada — cliques são ignorados.
- **Fase 2 (após 3s):** Logo Windows XP + instrução "To begin, click your user name" (esquerda), separador vertical gradiente, foto de perfil + nome "Daniel" (direita). Apenas agora os cliques são permitidos.
- **Clique no usuário:** Efeito gradiente azul escuro (esquerda → transparente), toca `startup.wav` (exclusivamente neste momento), fade para desktop com fallback de 4.5s se o áudio falhar.
- **Power button:** Ícone `power.ico` + "Turn off computer" no canto inferior esquerdo.

### Desktop Window (XP)
- Container `.window` (XP.css) com borda azul envolvendo title bar + screen 800×600.
- Title bar XP: gradiente azul, texto `c:\user\danixd\documents\bootleg_realm.exe`.
- Wallpaper personalizado como fundo do desktop.
- **Overflow oculto:** `.screen` com `overflow: hidden` para conter todos os elementos dentro dos limites visuais.

### Barra de Tarefas (XP)
- **Start:** Logo Windows XP, fonte Framdit, efeito de pressionado (mousedown/mouseup), sem outlines/borders de foco.
- **Task items:** "Warning://aviso!" — minimiza/restaura a janela principal. "CS Setup Wizard" — minimiza/restaura o instalador do CS. "Winamp" — minimiza/restaura o player Webamp.
- **System tray:** Ícone de rede (tooltip "redebr1 has internet connection"), volume (toggle mute com tooltip, sincronizado com Webamp), info "made by balofote", relógio 12h com tooltip de data.

### Ícones de Desktop
- **Counter-Strike:** Duplo clique abre o instalador glitchado.
- **Winamp:** Duplo clique inicializa o player Webamp (Winamp).
- **Internet Explorer:** Ícone decorativo no canto superior esquerdo.
- **Recycle Bin:** Ícone decorativo no canto inferior esquerdo.

### Janela Principal ("Warning://aviso!")
- Título "Warning://aviso!" com controles Minimize, Maximize, Close.
- Mensagem de boas-vindas + links para YouTube (`youtube.com/theseanlegion`), Spotify e GitHub.
- Aparece 1s após o desktop com som `ding.wav`.
- Minimizar/restaurar via botão ou taskbar.
- **Arrastável:** Implementado com `makeDraggable()` — coordenadas relativas ao `.screen`, clamping dentro dos limites 800×600 (com 30px reservados para a taskbar).

### Instalador Glitchado do Counter-Strike 1.6
- Abre ao dar duplo clique no ícone "Counter-Strike" do desktop.
- Janela estilo wizard de instalação do Windows com:
  - **Sidebar esquerda:** Fundo azul marinho escuro com ícone de computador animado (glow pulsante).
  - **Painel direito:** Fundo branco com título, texto descritivo e indicador "To continue, click Next".
  - **Barra inferior:** Botões "Назад" (disabled), "Далее" (Next), "Отмена" (Cancel).
- **3 etapas de instalação:**
  1. **Welcome:** Tela de boas-vindas com texto glitchado em russo/Cyrillic + blocks.
  2. **EULA:** Licença de software corrupta com avisos em russo.
  3. **Instalação:** Barra de progresso animada + log de instalação com mensagens glitchadas.
- **Comportamento:** Pode ser arrastada, minimizada para a taskbar, fechada. Título da janela tem animação de flicker glitch.
- **Taskbar:** Item "CS Setup Wizard" aparece quando a janela está aberta.

### Webamp (Winamp Player)
- **Inicialização:** Escondido até o usuário dar duplo clique no ícone "Winamp" do desktop.
- **Playlist de 9 músicas:**
  - Akon feat. Snoop Dogg — I Wanna F*ck You
  - Akon feat. Kardinal Offishall — Dangerous
  - Ne-Yo — Closer
  - Black Eyed Peas — Meet Me Halfway
  - Diddy feat. Keyshia Cole — Last Night
  - Edward Maya & Vika Jigulina — Stereo Love
  - Modjo — Lady
  - Cassie — Me & U
  - Nelly Furtado — Say It Right
- **Controles:** Minimizar (fecha visualmente, música continua), Fechar (destrói instância, remove da taskbar).
- **Restauração:** Duplo clique no ícone do desktop recria a instância.
- **Taskbar:** Item "Winamp" aparece quando o player está aberto.
- **Delimitação física:** Webamp é rigidamente confinado ao container `.screen` (800×600) via `MutationObserver` que monitora e corrige posições `translate()`.
- **Cursor:** Cursor de movimento (`move.cur`) restrito exclusivamente às bordas e cabeçalho do Webamp. Conteúdo interno (playlist, controles) usa cursor padrão ou `hand.cur`.
- **Sincronização de volume:** O mute toggle da system tray também silencia o Webamp via `store.dispatch({ type: 'SET_VOLUME' })`.

### Sistema de Foco de Janelas (Z-Index Dinâmico)
- Gerenciador de foco implementado via `registerWindow()` e `bringToFront()`.
- **Janela ativa:** z-index 120, title-bar com estilo normal.
- **Janelas inativas:** z-index 110, title-bar com classe `.inactive` (escurece).
- Webamp registrado como janela não-OS (sem title-bar styling), com z-index 15 (normal) / 18 (ativo).
- Clique em qualquer janela a traz para o forefront.

### DVD Screensaver
- Logo DVD quicando pelas bordas da **janela inteira do navegador** (não apenas do `.screen`).
- Posicionado com `position: fixed` no `<body>`.
- Colisão com `window.innerWidth` / `window.innerHeight`.
- Animação via `requestAnimationFrame`.
- Filtro `brightness(0) invert(1)` para logo branco.

### Sistema de Som
- `startup.wav` ao clicar no usuário (transição login → desktop), com fallback de 4.5s.
- `ding.wav` ao aparecer a janela principal (1s após desktop).
- Mute toggle no ícone de volume (alterna `sound.ico` / `nosound.ico`, afeta todos os áudios HTML5 + Webamp).
- Estado inicial: som ativo (`isMuted = false`).

### Tooltips
- Tooltips personalizados nos ícones da system tray (rede, volume, info, relógio).
- Animação CSS com delay de 1s para aparecer.
- Setinha inferior estilo balão.

### Cursores Windows XP
- Sistema completo de cursores via arquivos `.cur`:
  - `arrow.cur` — padrão
  - `hand.cur` — botões, ícones, elementos interativos
  - `help.cur` — ícone de info
  - `move.cur` — elementos arrastáveis (title bars)
  - `text.cur` — áreas de texto selecionável
  - `load.cur` — áreas de drop do Webamp
- Aplicados com `!important` para consistência global.

---

## 🛠️ Estrutura do Projeto

```
balofote.github.io/
├── index.html              # Página principal (todo o código em um arquivo)
├── index_test.html         # Página de teste experimental (não integrada)
├── README.md               # Documentação
├── AUDIT.md                # Auditoria de código e issues
├── webamp_constructor.md   # Referência da API Webamp
│
├── assets/
│   ├── images/             # bg.png, wallpaper.png, login.png, profilepic.png, winlogo.png, dvd.png
│   ├── icons/              # cs_p6.ico, winamp.ico, ie.ico, bin.ico, app.ico, net.ico, sound.ico, nosound.ico, info.ico, power.ico, logo.png
│   ├── cursor/             # arrow.cur, hand.cur, help.cur, load.cur, move.cur, text.cur
│   ├── sounds/             # startup.wav, ding.wav, + 9 tracks MP3 para o Webamp
│   └── fonts/              # framdit.ttf, tahoma.ttf
│
├── xp.css/                 # Biblioteca XP.css (local, sem CDN)
│   └── dist/XP.css
│
├── 98.css/                 # Biblioteca 98.css (local, sem CDN)
│   └── dist/98.css
│
└── webamp/                 # Biblioteca Webamp (Winamp player)
    ├── package.json
    ├── README.md
    └── built/
        └── webamp.bundle.min.js
```

---

## 🎨 Detalhes Técnicos

### CSS
- **XP.css** + **98.css** locais (arquivos em `xp.css/dist/` e `98.css/dist/`): bibliotecas de componentes retrô.
- **Background:** `bg.png` 512×512 repeating + radial-gradient vignette overlay para efeito de profundidade.
- **Login screen:** `login.png` com `background-size: 100% 100%` dentro da `.screen`.
- **Desktop Window:** XP.css `.window` com box-shadow azul envolvendo `.title-bar` + `.screen`.
- **Z-index hierarchy:** DVD (0, dentro do .screen) < Wallpaper (1) < Ícones desktop (5) < Webamp normal (15) < Webamp ativo (18) < Taskbar (100) < Janelas inativas (110) < Janela ativa (120).
- **Fontes:** Framdit (títulos), Tahoma (textos), fallback para sans-serif.
- **Cursor:** Sistema de cursores Windows XP via arquivos .cur com `!important`.
- **Tooltips:** Animação CSS com `@keyframes` (show/hide com delay).
- **Title bar:** 30px de altura, flexbox com controles de 21×21px alinhados à direita.
- **Glitch flicker:** Animação CSS no título do instalador CS (opacidade oscilante).

### JavaScript
- **Login flow:** welcome (3s) → fade → user selection → click → startup.wav → fade para desktop. Guard `desktopShown` previne execução duplicada.
- **Interaction lock:** `.login-body` com `pointer-events: none` até receber classe `.visible` (após 3s).
- **Drag and drop:** Função `makeDraggable()` reutilizável — coordenadas relativas ao `.screen`, clamping nos limites 800×600.
- **Window focus manager:** `registerWindow()` + `bringToFront()` — z-index dinâmico (120 ativo, 110 inativo).
- **DVD screensaver:** `requestAnimationFrame` com detecção de colisão nas bordas da janela do navegador (`window.innerWidth/Height`).
- **Relógio:** Formato 12h com AM/PM, sincronizado com o início do minuto (AUDIT MÉDIO #5 corrigido).
- **Data:** Tooltip com formato "January 1st 2024" (atualizado dinamicamente).
- **Minimizar/Restaurar:** Alternância via botão da janela ou taskbar.
- **Mute toggle:** Alterna ícone, aplica `muted = true/false` em todos os elementos `<audio>`, e sincroniza com Webamp via `store.dispatch`.
- **Webamp:** Inicialização sob demanda (duplo clique), `onMinimize`/`onClose` hooks, `MutationObserver` para confinamento físico.
- **CS Wizard:** Navegação em 3 etapas, barra de progresso animada, log de instalação com mensagens glitchadas.
- **Código organizado em blocos:** Volume/Mute → Login Screen Logic → Core Elements → makeDraggable → Window Focus Manager → DVD Screensaver → Clock/Date → Main Window → Start Button → Volume/Mute Toggle → Webamp Integration → CS Wizard.

### Bibliotecas Externas (Locais)
- **XP.css** (v1.x): Estilos de janelas Windows XP — carregado de `xp.css/dist/XP.css`.
- **98.css** (v1.x): Estilos complementares Windows 98 — carregado de `98.css/dist/98.css`.
- **Webamp** (UMD bundle): Player Winamp — carregado de `webamp/built/webamp.bundle.min.js`.

---

## 📊 Estado do Projeto

### Implementado ✅
- Tela de login completa com animações, interaction lock e som
- Desktop wrapper com wallpaper e ícones
- Barra de título XP com texto personalizado (30px altura)
- Taskbar funcional (start, task items, system tray, relógio)
- Janela principal com links e controles (minimizar/restaurar/maximizar)
- **Janelas arrastáveis** via `makeDraggable()` com clamping nos limites do `.screen`
- **Sistema de foco de janelas** (z-index dinâmico: ativo 120, inativo 110)
- **Webamp (Winamp) Player** — 9 músicas, inicialização por duplo clique, minimize/close hooks, confinamento físico, sincronização de volume
- **Instalador Glitchado do Counter-Strike 1.6** — 3 etapas, barra de progresso, texto em russo/Cyrillic, animação glitch
- DVD screensaver animado (janela inteira do navegador)
- Sistema de som com mute toggle (sincronizado com Webamp)
- Tooltips nos ícones da system tray
- Cursores Windows XP personalizados (consistência global com `!important`)
- Start button com estilo XP (sem outlines/focus rings)
- CSS libraries carregadas localmente (sem CDN)
- Código organizado em blocos funcionais
- YouTube link aponta para `youtube.com/theseanlegion`

### Correções de Auditoria Aplicadas 🔧
- **CRÍTICO #1:** Variável `mainWindow` declarada uma única vez (duplicata removida)
- **CRÍTICO #2:** DVD screensaver movido para fora do `.screen` (agora ocupa a janela inteira)
- **ALTO #1:** `text-rendering` unificado em `optimizeSpeed`
- **ALTO #2:** Regra genérica `.screen > *` removida, z-index definido individualmente
- **ALTO #3:** `isMuted` declarado antes da IIFE do login
- **ALTO #5:** Start button sem outlines de foco (estilo XP autêntico)
- **MÉDIO #5:** Relógio sincronizado com o início do minuto
- **MÉDIO #6:** Interaction lock no login (cliques bloqueados antes dos 3s)
- **MÉDIO #7:** `.screen` com `overflow: hidden`
- **BAIXO #1:** `border: none` duplicado removido do `.start-btn`

### Melhorias Planejadas 🔄
- **Start Menu:** Menu iniciar estilo Windows XP (ainda não implementado)
- **Milkdrop Visualizer:** Visualizações do Webamp (Butterchurn)
- **Navegação por teclado:** Tabindex e eventos de teclado nos ícones do desktop
- **ARIA:** Atributos de acessibilidade nos tooltips
- **Page Visibility API:** Pausar DVD screensaver quando a aba estiver oculta
- **SEO/Open Graph:** Meta tags para compartilhamento em redes sociais

### Especificações Técnicas
- **Resolução fixa:** 800×600 (container `.screen`)
- **Taskbar:** 30px de altura
- **Title bar:** 30px de altura
- **Fonte principal:** Tahoma (fallback Segoe UI, sans-serif)
- **Fonte de destaque:** Framdit (títulos e start button)
- **Plataforma:** GitHub Pages (estático)
- **Navegadores:** Chromium-based (Chrome, Edge, Opera), Firefox
- **Testado:** Funciona perfeitamente via protocolo `file://`

---

## 🔧 Como Executar

Abra o arquivo `index.html` em qualquer navegador moderno, ou acesse via GitHub Pages:

```
https://balofote.github.io
```

Nenhum servidor ou build step é necessário — o projeto funciona diretamente via protocolo `file://`.

---

## 🧪 Como Testar

1. **Login:** Aguarde 3s → clique no perfil "Daniel" → ouça o startup.wav → desktop aparece.
2. **Janela principal:** Aparece 1s após o desktop com som ding.wav. Arraste pela title bar. Minimize/restaure via botões ou taskbar.
3. **Webamp:** Duplo clique no ícone "Winamp" → player aparece. Duplo clique em uma música na playlist para tocar. Minimize (música continua). Feche (instância destruída).
4. **CS Wizard:** Duplo clique no ícone "Counter-Strike" → wizard abre. Navegue pelas 3 etapas. Observe o texto glitchado e a barra de progresso.
5. **Foco de janelas:** Clique na janela principal → ela vai para o forefront. Clique no Webamp → ele rouba o foco.
6. **DVD Screensaver:** Observe o logo DVD quicando pelas bordas do navegador.
7. **Mute:** Clique no ícone de volume da system tray → todos os áudios (incluindo Webamp) são silenciados.
8. **Cursores:** Passe o mouse sobre botões, ícones, title bars — observe os cursores Windows XP.

---

## 📝 Notas Técnicas

- **Código monolítico:** Todo o projeto está em um único arquivo (`index.html`). Para manutenção futura, considere separar CSS e JavaScript em arquivos externos.
- **Sem sistema de build:** O projeto não utiliza bundlers (webpack, vite), transpiladores (Babel), ou pré-processadores CSS (SASS, LESS).
- **Sem testes automatizados:** Qualquer alteração requer teste manual completo.
- **Webamp:** A API `store.dispatch` usada para sincronização de volume é uma API interna do Webamp e pode quebrar em atualizações futuras da biblioteca.
- **DVD Screensaver:** O filtro `brightness(0) invert(1)` transforma o logo do DVD em branco puro. Para o comportamento clássico (logo colorido que muda de cor), seria necessário implementar mudança de cor aleatória nas colisões.

---

**Projeto:** balofote's rabbit hole  
**Versão:** 2.0  
**Última atualização:** 2026-06-22  
**Autor:** [@balofote](https://github.com/balofote)