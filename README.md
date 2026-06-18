# balofote's rabbit hole

Uma página pessoal interativa com tema **Windows XP**, hospedada no GitHub Pages. É um projeto nostálgico que simula um desktop Windows XP completo com elementos funcionais.

## 🎯 Visão Geral

A página apresenta um desktop Windows XP autêntico com:
- Monitor tubo CRT com moldura realista
- Fundo Bliss (gradiente clássico do XP)
- Taskbar funcional
- Janelas draváveis
- Aplicativos e ícones de desktop
- DVD screensaver animado
- Player Winamp integrado (Webamp)
- Efeitos sonoros

## 📋 Funcionalidades Implementadas

### Interface Principal
- **Monitor CRT**: Simulação visual de monitor tubo com efeito de bezel
- **Wallpaper**: Imagem adaptada (800x600) sem letterbox
- **Cursor Customizado**: Cursor do Windows XP

### Barra de Tarefas
- **Botão Start**: Com logo do Windows XP, fonte Framdit, efeito de pressionado ao clicar
- **Itens de Tarefa**: Mostra programas abertos (Warning://aviso!)
- **System Tray**: 
  - Ícone de rede com tooltip "redebr1 has internet connection"
  - Ícone de volume com toggle mute (alterna entre som.ico e nosound.ico)
  - Ícone info com tooltip "made by balofote"
  - Relógio em formato 12h (AM/PM) com tooltip mostrando data formatada (ex: "January 15th 2024")

### Janela Principal
- **Título**: "balofote's rabbit hole"
- **Conteúdo**: Texto de boas-vindas, 3 botões (YouTube, Spotify, GitHub)
- **Controles**:
  - Botão minimizar: Oculta a janela mas mantém na taskbar
  - Botão maximizar/fechar
  - Barra de título redimensionada (26px) com botões bem posicionados

### Ícones de Desktop
Organizados verticalmente no canto superior esquerdo:
1. **Counter-Strike** (cs.png)
2. **Winamp** (winamp.png)
3. **Internet Explorer** (ie.ico)

Posicionado no canto inferior esquerdo:
- **Recycle Bin** (bin.ico)

### DVD Screensaver
- Transita pelo background fora da tela principal
- Ricocheta nas bordas da janela e da tela
- Velocidade reduzida em 1/3
- Logo DVD em branco (48x48)

### Webamp (Player Winamp)
Integração completa do Webamp com:
- **Playlist de 9 músicas**:
  1. I Wanna F*ck You - Akon feat. Snoop Dogg
  2. Dangerous - Akon feat. Kardinal Offishall
  3. Closer - Ne-Yo
  4. Meet Me Halfway - Black Eyed Peas
  5. Last Night - Diddy feat. Keyshia Cole
  6. Stereo Love - Edward Maya & Vika Jigulina
  7. Lady - Modjo
  8. Me & U - Cassie
  9. Say It Right - Nelly Furtado

- **Funcionalidades**:
  - Clique no ícone Winamp para abrir
  - Aparece na taskbar com ícone e nome
  - Minimizar: Oculta da interface mas continua na taskbar
  - Fechar: Remove completamente
  - Restaurar: Clicando na taskbar

### Som
- **Startup**: ding.wav toca 1 segundo após carregar a página
- **Mute**: Clique no ícone de volume para mutar/desmutar toda a página

### Tooltips
- **Bordas arredondadas**: 1px de outline preto
- **Cores claras**: Texto em #333 (10% mais claro)
- **Posicionamento**: Data alinhada à direita para não ficar cortada

## 🛠️ Estrutura de Arquivos

```
assets/
├── images/
│   ├── logo.png              # Logo Windows XP (botão Start)
│   ├── wallpaper.png         # Wallpaper 800x600
│   ├── dvd.png               # DVD screensaver
│   ├── cursor.png            # Cursor customizado
│   ├── cs.png                # Ícone Counter-Strike
│   ├── winamp.png            # Ícone Winamp
│   ├── ie.ico                # Ícone Internet Explorer
│   ├── bin.ico               # Ícone Recycle Bin
│   ├── app.png               # Ícone tarefa ativa
│   ├── net.png               # Ícone rede
│   ├── sound.ico             # Ícone volume
│   ├── nosound.ico           # Ícone mute
│   └── info.png              # Ícone info
├── sounds/
│   ├── ding.wav              # Som startup
│   ├── iwannafku.mp3         # Música 1
│   ├── dangerous.mp3         # Música 2
│   ├── closer.mp3            # Música 3
│   ├── mmhalfway.mp3         # Música 4
│   ├── lastnight.mp3         # Música 5
│   ├── stereolove.mp3        # Música 6
│   ├── lady.mp3              # Música 7
│   ├── me_u.mp3              # Música 8
│   └── sayitright.mp3        # Música 9
└── fonts/
    ├── framdit.ttf           # Fonte botão Start
    ├── tahoma.ttf            # Fonte padrão
    └── trebucbd.ttf          # Fonte títulos

index.html                     # Página principal
README.md                      # Esta documentação
```

## 🎨 Detalhes Técnicos

### CSS & Styling
- **XP.css**: Biblioteca CSS para componentes Windows XP autênticos
- **Gradientes customizados**: Para monitor CRT, taskbar e janelas
- **Position absolute/relative**: Para ícones e elementos de desktop
- **Z-index hierarchy**: Gerenciamento de sobreposição (DVD: 999, Webamp: 20, Janela: 10, Ícones: 5)

### JavaScript
- **Relógio em tempo real**: Atualiza a cada minuto
- **Animação DVD**: RequestAnimationFrame para suavidade
- **Gerenciamento de estado**: Minimizar/restaurar/fechar janelas
- **Mute global**: Controla todos os áudios da página
- **Webamp integration**: Biblioteca externa para player

### Bibliotecas Externas
- **XP.css**: Componentes Windows XP (https://unpkg.com/xp.css)
- **Webamp**: Player Winamp estilo 2.91 (https://unpkg.com/webamp)

## 🚀 Como Usar

1. **Abrir a página**: Acesse via GitHub Pages
2. **Desktop**: Clique nos ícones para abrir aplicativos/programas
3. **Janela**: Minimize/maximize/feche como em um Windows XP real
4. **Som**: Clique no volume para mutar, clique novamente para desmutar
5. **Webamp**: Abra clicando no ícone Winamp, selecione músicas da playlist
6. **DVD**: Observe o screensaver se movendo pelo background

## 🎭 Comportamentos Especiais

- **Janela minimizada**: Desaparece da interface mas fica na taskbar
- **Webamp minimizado**: Mesmo comportamento da janela principal
- **Fechar Webamp**: Remove completamente (diferente de minimizar)
- **DVD**: Ricocheta apenas nas bordas da tela, não entra dentro dela
- **Início**: Toca som ding.wav automaticamente após 1 segundo
- **Cursor**: Customizado em toda a página

## 📱 Resolução

- **Resolução fixa**: 800x600px (padrão de monitor XP)
- **Centralizado**: Na tela do usuário
- **Responsivo**: Monitor se adapta ao navegador

## 🌐 Plataforma

- **Hospedagem**: GitHub Pages
- **Linguagem**: HTML5, CSS3, JavaScript (ES6+)
- **Compatibilidade**: Navegadores modernos (Chrome, Firefox, Safari, Edge)

## ✨ Detalhes Visuais

- Background: Gradiente radial cinza azulado escuro com efeito de monitor de tubo
- Moldura do monitor: Múltiplas box-shadows criando efeito 3D realista
- Fonte padrão: Tahoma (XP padrão)
- Fonte botão Start: Framdit (Franklin Gothic Medium Italic)
- Palette de cores: Azul XP clássico (#245dd7, #0e3cbd, etc)

## 📝 Notas

- Todo o conteúdo é em inglês (conforme solicitado)
- Tooltips desaparecem após 1 segundo de delay
- Mute afeta Webamp e todos os áudios da página
- DVD screensaver roda continuamente
- Página é responsiva mas mantém proporção 800x600

---

**Projeto**: balofote's rabbit hole  
**Versão**: 1.0  
**Última atualização**: 2026-06-18
