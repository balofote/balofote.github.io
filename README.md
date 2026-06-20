# balofote's rabbit hole

Uma página pessoal interativa com tema **Windows XP**, hospedada no GitHub Pages. Simula um desktop retrô completo com tela de login, taskbar funcional, janelas, screensaver e ícones clicáveis.

> 🐇 *"welcome, stranger. are u here just 4fun too? hahahah. now tell me, where u wanna go?"*

---

## 🎯 Visão Geral

O projeto recria a experiência de um desktop Windows XP diretamente no navegador. O usuário passa por uma tela de login autêntica (com welcome text, seleção de usuário e som de inicialização) antes de acessar o desktop, que conta com taskbar funcional, ícones, janela de links e um screensaver animado do DVD.

---

## 📋 Funcionalidades

### Tela de Login (Windows XP)
- **Fase 1 (0–3s):** Texto "welcome" em fonte Framdit (72px, itálico) sobre fundo `login.png`
- **Fase 2 (após 3s):** Logo Windows XP + instrução "To begin, click your user name" (esquerda), separador vertical gradiente, foto de perfil + nome "Daniel" (direita)
- **Clique no usuário:** Efeito gradiente azul escuro (esquerda → transparente), toca `startup.wav`, fade para desktop
- **Power button:** Ícone `power.ico` + "Turn off computer" no canto inferior esquerdo

### Desktop Window (XP)
- Container `.window` (XP.css) com borda azul envolvendo title bar + screen 800×600
- Title bar XP: gradiente azul, texto `c:\user\danixd\documents\bootleg_realm.exe`
- Wallpaper personalizado como fundo do desktop

### Barra de Tarefas (XP)
- **Start:** Logo Windows XP, fonte Framdit, efeito de pressionado (mousedown/mouseup)
- **Task items:** "Warning://aviso!" — minimiza/restaura a janela principal
- **System tray:** Ícone de rede (tooltip "redebr1 has internet connection"), volume (toggle mute com tooltip), info "made by balofote", relógio 12h com tooltip de data

### Ícones de Desktop
- Counter-Strike, Winamp (apenas visual — Webamp removido), Internet Explorer (canto superior esquerdo)
- Recycle Bin (canto inferior esquerdo)

### Janela Principal
- Título "balofote's rabbit hole"
- Botões Minimize, Maximize, Close
- Mensagem de boas-vindas + links para YouTube, Spotify e GitHub
- Aparece 1s após o desktop com som `ding.wav`
- Minimizar/restaurar via botão ou taskbar

### DVD Screensaver
- Logo DVD quicando pelas bordas da viewport
- Colisão com os limites da tela (compatível com a moldura do `.screen`)
- Animação via `requestAnimationFrame`

### Sistema de Som
- `startup.wav` ao clicar no usuário (transição login → desktop)
- `ding.wav` ao aparecer a janela principal (1s após desktop)
- Mute toggle no ícone de volume (alterna `sound.ico` / `nosound.ico`, afeta todos os áudios HTML5)
- Estado inicial: som ativo (`isMuted = false`)

### Tooltips
- Tooltips personalizados nos ícones da system tray (rede, volume, info, relógio)
- Animação CSS com delay de 1s para aparecer
- Setinha inferior estilo balão

---

## 🛠️ Estrutura do Projeto

```
balofote.github.io/
├── index.html              # Página principal (todo o código em um arquivo)
├── index_test.html         # Página de teste experimental (não integrada)
├── README.md               # Documentação
├── AUDIT.md                # Auditoria de código e issues
├── AQCSonnetChat.md        # Histórico de conversas do desenvolvimento
├── webamp_constructor.md   # Referência da API Webamp (para futura implementação)
├── xp_temp.css             # CSS temporário experimental
│
├── assets/
│   ├── images/             # bg.png, wallpaper.png, login.png, profilepic.png, winlogo.png, dvd.png, sddefault.jpg
│   ├── icons/              # cs_p6.ico, winamp.ico, ie.ico, bin.ico, app.ico, net.ico, sound.ico, nosound.ico, info.ico, power.ico, logo.png
│   ├── cursor/             # arrow.cur, hand.cur, help.cur, load.cur, move.cur, text.cur
│   ├── sounds/             # startup.wav, ding.wav
│   └── fonts/              # framdit.ttf, tahoma.ttf
│
└── webamp/                 # Biblioteca Webamp (preservada para implementação futura)
    ├── package.json
    ├── README.md
    └── built/
```

---

## 🎨 Detalhes Técnicos

### CSS
- **XP.css** + **98.css** via CDN (unpkg): bibliotecas de componentes retrô
- **Background:** `bg.png` 512×512 repeating + radial-gradient vignette overlay para efeito de profundidade
- **Login screen:** `login.png` com `background-size: 100% 100%` dentro da `.screen`
- **Desktop Window:** XP.css `.window` com box-shadow azul envolvendo `.title-bar` + `.screen`
- **Z-index hierarchy:** DVD (999) > Login (200) > Taskbar (100) > Janela principal (10) > Ícones desktop (5) > Wallpaper (1)
- **Fontes:** Framdit (títulos), Tahoma (textos), fallback para sans-serif
- **Cursor:** Sistema de cursores Windows XP via arquivos .cur
- **Tooltips:** Animação CSS com `@keyframes` (show/hide com delay)

### JavaScript
- **Login flow:** welcome (3s) → fade → user selection → click → startup.wav → fade para desktop
- **Guard `desktopShown`:** Evita execução duplicada de `showDesktop()`
- **DVD screensaver:** `requestAnimationFrame` com detecção de colisão nas bordas da viewport e do `.screen`
- **Relógio:** Formato 12h com AM/PM, atualizado a cada 60s
- **Data:** Tooltip com formato "January 1st 2024" (atualizado dinamicamente)
- **Minimizar/Restaurar:** Alternância via botão da janela ou taskbar
- **Mute toggle:** Alterna ícone e aplica `muted = true/false` em todos os elementos `<audio>`
- **Código organizado em blocos:** Login Screen Logic → Core Elements → DVD Screensaver → Clock/Date → Main Window → Start Button → Volume/Mute

### Bibliotecas Externas
- **XP.css** (v1.x): Estilos de janelas Windows XP
- **98.css** (v1.x): Estilos complementares Windows 98

---

## 📊 Estado do Projeto

### Implementado ✅
- Tela de login completa com animações e som
- Desktop wrapper com wallpaper e ícones
- Barra de título XP com texto personalizado
- Taskbar funcional (start, task items, system tray, relógio)
- Janela principal com links e controles (minimizar/restaurar)
- DVD screensaver animado
- Sistema de som com mute toggle
- Tooltips nos ícones da system tray
- Cursores Windows XP personalizados
- Código organizado em blocos funcionais

### Módulos a Implementar 🔄
- **Webamp Player:** Player Winamp será reinserido futuramente. Código removido do HTML principal, mas informações da playlist (9 músicas), configurações de layout e referências da API estão preservadas no `AUDIT.md` e `webamp_constructor.md`. A biblioteca Webamp permanece em `webamp/built/` aguardando reimplementação.

### Comportamentos Especiais
- Login com som startup.wav (fallback de 3s se o áudio falhar)
- Janela principal aparece 1s após o desktop com som ding.wav
- Mute toggle afeta todos os áudios HTML5 da página
- DVD screensaver colide com as bordas da viewport e da moldura do `.screen`

### Especificações Técnicas
- **Resolução fixa:** 800×600 (container `.screen`)
- **Taskbar:** 30px de altura
- **Fonte principal:** Tahoma (fallback Segoe UI, sans-serif)
- **Fonte de destaque:** Framdit (títulos e start button)
- **Plataforma:** GitHub Pages (estático)

---

## 🔧 Como Executar

Abra o arquivo `index.html` em qualquer navegador moderno, ou acesse via GitHub Pages:

```
https://balofote.github.io
```

---

**Projeto:** balofote's rabbit hole  
**Versão:** 1.3  
**Última atualização:** 2026-06-19  
**Autor:** [@balofote](https://github.com/balofote)