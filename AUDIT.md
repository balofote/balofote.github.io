# AUDIT.md — Auditoria Completa do Código

**Projeto:** balofote's rabbit hole  
**Data da auditoria:** 2026-06-19  
**Arquivo auditado:** `index.html` (994 linhas)  
**Versão do projeto:** 1.3  

---

## 🎯 Objetivo

Identificar falhas, inconsistências, más práticas e problemas de qualidade no código do projeto, documentando-os para que possam ser estudados e corrigidos futuramente.

---

## 📊 Resumo Executivo

| Categoria | Qtde | Críticos | Altos | Médios | Baixos |
|-----------|------|----------|-------|--------|--------|
| CSS       | 8    | 1        | 2     | 3      | 2      |
| HTML      | 3    | 0        | 1     | 1      | 1      |
| JavaScript| 9    | 1        | 3     | 3      | 2      |
| Acessibilidade | 5 | 0        | 2     | 2      | 1      |
| Performance    | 2 | 0        | 0     | 1      | 1      |
| **Total** | **27** | **2** | **8** | **10** | **7** |

---

## 🔴 ISSUES CRÍTICOS

### CRÍTICO #1: Variável `mainWindow` declarada duas vezes

**Localização:** Linhas 817 e 873  
**Tipo:** JavaScript  
**Severidade:** 🔴 CRÍTICO  

**Descrição:**  
A constante `mainWindow` é declarada duas vezes no mesmo escopo:
- Linha 817: `const mainWindow = document.getElementById('mainWindow');` (dentro da IIFE do login)
- Linha 873: `const mainWindow = document.getElementById('mainWindow');` (escopo global)

**Problema:**  
Em strict mode, isso lança um `SyntaxError` e quebra toda a execução do JavaScript. Em non-strict mode, a segunda declaração é ignorada silenciosamente. Atualmente o código funciona porque não está em strict mode, mas qualquer migração para strict mode quebrará a página completamente.

**Solução:**  
Remover a declaração duplicada. A IIFE do login deve usar a variável global ou recebê-la por parâmetro. Alternativamente, unificar os dois blocos de script em um único escopo.

---

### CRÍTICO #2: DVD Screensaver posicionado FORA do container `.desktop-window`

**Localização:** Linha 691  
**Tipo:** HTML/Estrutura  
**Severidade:** 🔴 CRÍTICO  

**Descrição:**  
O elemento `.dvd-screensaver` está fora do container `.desktop-window`, solto diretamente no `<body>`. Isso significa que:
- O DVD não respeita os limites visuais do desktop (800×600)
- Ele flutua sobre toda a viewport, incluindo áreas fora da "tela" simulada
- Em layouts onde o desktop não ocupa 100% da viewport, o DVD aparece fora do contexto

**Solução:**  
Mover o `.dvd-screensaver` para dentro do `.screen` (ou `.desktop-wrapper`), ajustando a lógica de colisão para usar os limites do container em vez de `window.innerWidth`/`window.innerHeight`.

---

## 🟠 ISSUES DE ALTA SEVERIDADE

### ALTO #1: Conflito de `text-rendering` entre `html` e `body`

**Localização:** Linhas 34 e 64  
**Tipo:** CSS  
**Severidade:** 🟠 ALTO  

**Descrição:**  
```css
html { text-rendering: optimizeLegibility; }
body { text-rendering: optimizeSpeed; }
```
São declarados valores conflitantes. `optimizeLegibility` no `<html>` é herdado pelo `<body>`, mas o `<body>` sobrescreve com `optimizeSpeed`. Isso causa comportamento inconsistente entre navegadores e pode afetar a renderização de texto em elementos fora do `<body>` (como pseudoelementos).

**Solução:**  
Manter apenas um valor consistente em todo o documento. `optimizeSpeed` é mais adequado para um tema retrô (sem kerning avançado).

---

### ALTO #2: `.screen > *` sobrescreve z-index de todos os filhos

**Localização:** Linha 128  
**Tipo:** CSS  
**Severidade:** 🟠 ALTO  

**Descrição:**  
```css
.screen > * { position: relative; z-index: 2; }
```
Esta regra força `z-index: 2` em TODOS os filhos diretos de `.screen`, incluindo:
- `.login-screen` (deveria ser z-index: 200)
- `.desktop-wrapper` (deveria ser z-index: 2 — esse está correto)
- `.window-wrapper` (deveria ser z-index: 10)

**Impacto:**  
O seletor universal `> *` anula os z-index definidos individualmente em cada filho, pois a especificidade é a mesma (uma classe). A ordem de declaração no CSS determina qual prevalece. Como `.screen > *` está antes das classes individuais, estas podem sobrescrever — mas isso depende da ordem no arquivo e pode causar bugs sutis.

**Solução:**  
Remover a regra genérica e definir `position: relative; z-index: N` individualmente em cada filho, ou usar um seletor mais específico.

---

### ALTO #3: `isMuted` usado antes da declaração (forward reference)

**Localização:** Linha 864 vs 975  
**Tipo:** JavaScript  
**Severidade:** 🟠 ALTO  

**Descrição:**  
A variável `isMuted` é referenciada dentro da IIFE do login (linha 864: `if (!isMuted)`) mas é declarada apenas no escopo global (linha 975: `let isMuted = false`). Devido ao hoisting, isso funciona, mas:
- Cria uma dependência oculta entre a IIFE e o escopo global
- Se o bloco global for movido para antes da IIFE, o código quebra
- Dificulta a refatoração futura (ex: migrar para módulos ES6)

**Solução:**  
Declarar `isMuted` antes da IIFE, ou passar como parâmetro, ou mover a declaração para o início do escopo global.

---

### ALTO #4: Sem tratamento de erro para áudios que não carregam

**Localização:** Linhas 834-847, 862-865  
**Tipo:** JavaScript  
**Severidade:** 🟠 ALTO  

**Descrição:**  
Os áudios são criados com `new Audio('assets/sounds/startup.wav')` e `new Audio('assets/sounds/ding.wav')`, mas não há verificação se os arquivos realmente existem ou carregaram corretamente. Se um arquivo de áudio estiver ausente ou corrompido:
- `startup.wav`: O fallback de 3s é ativado, mas o usuário não recebe feedback visual do erro
- `ding.wav`: Simplesmente falha silenciosamente (`.catch(() => {})`)

**Solução:**  
Adicionar eventos `onerror` nos elementos de áudio para logging e feedback visual, e considerar um indicador de carregamento para o startup.wav.

---

### ALTO #5: Botões sem feedback de foco (acessibilidade)

**Localização:** Linhas 376-380, 425-426  
**Tipo:** Acessibilidade  
**Severidade:** 🟠 ALTO  

**Descrição:**  
```css
.start-btn:focus,
.start-btn:focus-visible { outline: none; border: none; }
.task-item { outline: none; }
```
O outline de foco é removido sem fornecer uma alternativa visual. Usuários que navegam por teclado não conseguem identificar qual elemento está focado.

**Solução:**  
Substituir `outline: none` por um estilo de foco personalizado visível (ex: `outline: 2px solid white` ou `box-shadow` diferenciado).

---

## 🟡 ISSUES DE MÉDIA SEVERIDADE

### MÉDIO #1: Propriedade `font-smooth: never` não padronizada

**Localização:** Linhas 35, 63  
**Tipo:** CSS  
**Severidade:** 🟡 MÉDIO  

**Descrição:**  
`font-smooth: never` é uma propriedade não padronizada (apenas WebKit/Blink) e pode ser ignorada em outros navegadores. Além disso, o valor `never` não é válido na especificação CSS Fonts Module Level 4 (os valores corretos seriam `auto`, `always`, ou `never` — mas `never` tem suporte limitado).

**Solução:**  
Documentar que é um enhancement apenas para navegadores baseados em Chromium. Considerar remover se causar problemas de renderização.

---

### MÉDIO #2: `-webkit-text-stroke: 0.5px transparent` em todo o documento

**Localização:** Linha 36  
**Tipo:** CSS  
**Severidade:** 🟡 MÉDIO  

**Descrição:**  
```css
html { -webkit-text-stroke: 0.5px transparent; }
```
Aplica um text-stroke de 0.5px transparente a TODO texto da página. Isso é um hack para suavizar fontes, mas:
- Pode causar artefatos de renderização em alguns navegadores
- Aumenta o custo de renderização de texto
- O efeito é imperceptível na maioria dos casos
- Não é padrão CSS (apenas WebKit)

**Solução:**  
Avaliar se o efeito desejado (anti-aliasing) não pode ser alcançado apenas com `-webkit-font-smoothing: antialiased`.

---

### MÉDIO #3: DVD screensaver sem pause quando a aba está oculta

**Localização:** Linhas 889-919  
**Tipo:** Performance  
**Severidade:** 🟡 MÉDIO  

**Descrição:**  
O `requestAnimationFrame` do DVD continua rodando mesmo quando a aba do navegador está em segundo plano. Isso consome recursos desnecessários da CPU/GPU.

**Solução:**  
Usar a [Page Visibility API](https://developer.mozilla.org/en-US/docs/Web/API/Page_Visibility_API) para pausar a animação quando a aba não estiver visível:
```javascript
document.addEventListener('visibilitychange', () => {
  if (document.hidden) { /* pausar */ } else { /* retomar */ }
});
```

---

### MÉDIO #4: DVD usa `left`/`top` em vez de `transform` para animação

**Localização:** Linhas 915-916  
**Tipo:** Performance  
**Severidade:** 🟡 MÉDIO  

**Descrição:**  
```javascript
dvdSaver.style.left = dvdX + 'px';
dvdSaver.style.top  = dvdY + 'px';
```
Animar propriedades `left`/`top` força o navegador a recalcular o layout a cada frame (layout thrashing). O uso de `transform: translate()` seria mais eficiente, pois é composto apenas pela GPU.

**Solução:**  
Usar `transform: translate(dvdXpx, dvdYpx)` e `will-change: transform` para melhor performance.

---

### MÉDIO #5: Relógio pode ficar desatualizado por até 59 segundos

**Localização:** Linha 943  
**Tipo:** JavaScript  
**Severidade:** 🟡 MÉDIO  

**Descrição:**  
```javascript
setInterval(updateClock, 60000);
```
O relógio atualiza a cada 60 segundos. Se o usuário abrir a página às 12:59:59, o relógio mostrará 12:59 por 59 segundos antes de atualizar para 1:00.

**Solução:**  
Calcular o tempo restante para o próximo minuto e usar um `setTimeout` inicial para sincronizar:
```javascript
const msToNextMin = (60 - new Date().getSeconds()) * 1000;
setTimeout(() => {
  updateClock();
  setInterval(updateClock, 60000);
}, msToNextMin);
```

---

### MÉDIO #6: Possível race condition no login (clique antes de 3s)

**Localização:** Linhas 819-827, 831-850  
**Tipo:** JavaScript  
**Severidade:** 🟡 MÉDIO  

**Descrição:**  
O fluxo de login tem duas fases temporizadas:
1. Welcome visível por 3s (linha 827)
2. Após 3s, welcome some e login body aparece

Se o usuário clicar no perfil antes dos 3 segundos, o `loginBody` ainda não está visível (classe `visible` não adicionada), mas o clique inicia o som e a transição para o desktop. O welcome text some e o login body aparece simultaneamente, causando uma transição visual abrupta.

**Solução:**  
Ignorar cliques no usuário se `loginBody` não tiver a classe `visible`, ou desabilitar o clique até a fase 2 estar completa.

---

### MÉDIO #7: `.screen` sem `overflow: hidden` permite vazamento visual

**Localização:** Linha 109  
**Tipo:** CSS  
**Severidade:** 🟡 MÉDIO  

**Descrição:**  
```css
.screen { overflow: hidden; /* NÃO! overflow não está definido, padrão é visible */ }
```
O `.screen` não tem `overflow: hidden`, o que significa que elementos posicionados dentro dele podem vazar visualmente para fora da área 800×600. Isso quebra a ilusão de uma "tela" de monitor.

**Solução:**  
Adicionar `overflow: hidden` ao `.screen` para conter todos os elementos dentro dos limites visuais.

---

## 🟢 ISSUES DE BAIXA SEVERIDADE

### BAIXO #1: CSS duplicado — `border: none` declarado duas vezes no `.start-btn`

**Localização:** Linhas 375-376  
**Tipo:** CSS  
**Severidade:** 🟢 BAIXO  

**Descrição:**  
```css
.start-btn {
  border: none;
  /* ... */
  outline: none;
  border: none; /* duplicado */
}
```
`border: none` aparece duas vezes. Não causa problema funcional, mas é redundante.

**Solução:**  
Remover a segunda declaração.

---

### BAIXO #2: DVD screensaver com `filter: brightness(0) invert(1)` — perde cor original

**Localização:** Linha 680  
**Tipo:** CSS  
**Severidade:** 🟢 BAIXO  

**Descrição:**  
```css
.dvd-screensaver {
  filter: brightness(0) invert(1);
}
```
Isso transforma o logo do DVD em branco puro, independentemente das cores originais da imagem. O DVD clássico tem um logo colorido que muda de cor ao bater nas bordas — este comportamento não está implementado.

**Solução:**  
Se a intenção é ter um DVD branco, documentar como escolha de design. Se for para simular o DVD clássico, implementar mudança de cor aleatória nas colisões.

---

### BAIXO #3: Navegação por teclado ausente nos ícones do desktop

**Localização:** Linhas 727-744  
**Tipo:** Acessibilidade  
**Severidade:** 🟢 BAIXO  

**Descrição:**  
Os ícones do desktop são `<div>` sem `tabindex`, `role`, ou manipuladores de teclado. Usuários que não usam mouse não conseguem interagir com eles.

**Solução:**  
Adicionar `tabindex="0"`, `role="button"`, e listeners para `keydown` (Enter/Escape) nos ícones.

---

### BAIXO #4: Tooltips sem suporte a leitores de tela

**Localização:** Linhas 472-519  
**Tipo:** Acessibilidade  
**Severidade:** 🟢 BAIXO  

**Descrição:**  
Os tooltips são implementados apenas com CSS (`:hover`), sem atributos ARIA como `aria-describedby` ou `role="tooltip"`. Leitores de tela não conseguem acessar o conteúdo dos tooltips.

**Solução:**  
Adicionar `aria-describedby` nos elementos que possuem tooltip e vincular ao ID do tooltip correspondente.

---

### BAIXO #5: Constante `border = 0` hardcoded na lógica do DVD

**Localização:** Linha 902  
**Tipo:** JavaScript  
**Severidade:** 🟢 BAIXO  

**Descrição:**  
```javascript
const border = 0;
```
O valor da borda está hardcoded como 0. Se o estilo da borda do `.screen` mudar no futuro, a lógica de colisão do DVD ficará incorreta.

**Solução:**  
Calcular dinamicamente a borda a partir do CSS, ou definir como constante nomeada no topo do bloco.

---

### BAIXO #6: Sem meta tags de SEO ou Open Graph

**Localização:** Linhas 3-8  
**Tipo:** HTML  
**Severidade:** 🟢 BAIXO  

**Descrição:**  
O `<head>` não contém meta tags como `description`, `keywords`, Open Graph (`og:title`, `og:description`, `og:image`), ou Twitter Cards. Isso prejudica o compartilhamento em redes sociais e o SEO.

**Solução:**  
Adicionar meta tags básicas de SEO e Open Graph.

---

### BAIXO #7: `sddefault.jpg` na pasta `assets/images/` sem referência no código

**Localização:** Arquivo `assets/images/sddefault.jpg`  
**Tipo:** Organização  
**Severidade:** 🟢 BAIXO  

**Descrição:**  
O arquivo `sddefault.jpg` está presente na pasta de assets mas não é referenciado em lugar nenhum do `index.html`. Pode ser um resquício de desenvolvimento anterior.

**Solução:**  
Remover o arquivo não utilizado ou documentar seu propósito.

---

## 📋 CHECKLIST DE CORREÇÕES RECOMENDADAS

### Prioridade CRÍTICA (corrigir o quanto antes)
- [ ] CRÍTICO #1: Remover declaração duplicada de `mainWindow`
- [ ] CRÍTICO #2: Mover DVD screensaver para dentro do `.screen`

### Prioridade ALTA (corrigir em seguida)
- [ ] ALTO #1: Unificar `text-rendering` em um único valor
- [ ] ALTO #2: Remover `.screen > *` genérico, definir z-index individualmente
- [ ] ALTO #3: Mover declaração de `isMuted` para antes da IIFE
- [ ] ALTO #4: Adicionar tratamento de erro para áudios
- [ ] ALTO #5: Adicionar estilos de foco visíveis nos botões

### Prioridade MÉDIA (melhorias futuras)
- [ ] MÉDIO #1: Documentar/remover `font-smooth: never`
- [ ] MÉDIO #2: Avaliar necessidade de `-webkit-text-stroke`
- [ ] MÉDIO #3: Pausar DVD screensaver quando aba estiver oculta
- [ ] MÉDIO #4: Usar `transform` em vez de `left`/`top` no DVD
- [ ] MÉDIO #5: Sincronizar relógio com o início do minuto
- [ ] MÉDIO #6: Prevenir clique no login antes dos 3s
- [ ] MÉDIO #7: Adicionar `overflow: hidden` ao `.screen`

### Prioridade BAIXA (opcional)
- [ ] BAIXO #1: Remover `border: none` duplicado
- [ ] BAIXO #2: Implementar mudança de cor no DVD ou documentar escolha
- [ ] BAIXO #3: Adicionar navegação por teclado nos ícones
- [ ] BAIXO #4: Adicionar atributos ARIA nos tooltips
- [ ] BAIXO #5: Tornar `border` do DVD dinâmico
- [ ] BAIXO #6: Adicionar meta tags SEO/Open Graph
- [ ] BAIXO #7: Remover ou documentar `sddefault.jpg`

---

## 🔧 WEBAMP — INFORMAÇÕES PRESERVADAS

As informações abaixo foram removidas do `index.html` mas estão preservadas para futura reimplementação do Webamp.

### Playlist (9 músicas)

```javascript
const playlist = [
  { url: 'assets/sounds/iwannafku.mp3',     metaData: { artist: 'Akon feat. Snoop Dogg', title: 'I Wanna F*ck You' }, duration: 244 },
  { url: 'assets/sounds/dangerous.mp3',     metaData: { artist: 'Akon feat. Kardinal Offishall', title: 'Dangerous' }, duration: 234 },
  { url: 'assets/sounds/closer.mp3',        metaData: { artist: 'Ne-Yo', title: 'Closer' }, duration: 239 },
  { url: 'assets/sounds/mmhalfway.mp3',     metaData: { artist: 'Black Eyed Peas', title: 'Meet Me Halfway' }, duration: 286 },
  { url: 'assets/sounds/lastnight.mp3',     metaData: { artist: 'Diddy feat. Keyshia Cole', title: 'Last Night' }, duration: 238 },
  { url: 'assets/sounds/stereolove.mp3',    metaData: { artist: 'Edward Maya & Vika Jigulina', title: 'Stereo Love' }, duration: 261 },
  { url: 'assets/sounds/lady.mp3',          metaData: { artist: 'Modjo', title: 'Lady' }, duration: 287 },
  { url: 'assets/sounds/me_u.mp3',          metaData: { artist: 'Cassie', title: 'Me & U' }, duration: 193 },
  { url: 'assets/sounds/sayitright.mp3',    metaData: { artist: 'Nelly Furtado', title: 'Say It Right' }, duration: 219 },
];
```

### Configuração de Layout

```javascript
windowLayout: {
  main:      { position: { top: 0, left: 0 } },
  equalizer: { position: { top: 116, left: 0 } },
  playlist:  { position: { top: 0, left: 275 }, size: { extraHeight: 4, extraWidth: 0 } },
}
```

### Import

```javascript
import Webamp from "./webamp/built/webamp.bundle.min.mjs";
```

### Z-Index Hierarchy (planejada)

```
Wallpaper (0) < Desktop Icons (5) < Webamp normal (15) < Webamp active (18) < Taskbar (20) < Main Window (100/110)
```

### Referência

Consulte `webamp_constructor.md` para documentação completa da API Webamp.

---

## 📈 MÉTRICAS DO CÓDIGO

| Métrica | Valor |
|---------|-------|
| Linhas totais (index.html) | 994 |
| Linhas de CSS | ~300 |
| Linhas de JavaScript | ~185 |
| Linhas de HTML | ~200 |
| Arquivos de assets | ~30 |
| Bibliotecas externas | 2 (XP.css, 98.css) |
| Funções JavaScript | 7 |
| Event listeners | 8 |
| Elementos `<audio>` dinâmicos | 2 |
| Animações CSS | 2 (@keyframes) |
| Imagens | 7 |
| Ícones | 11 |
| Cursores | 6 |
| Sons | 2 |
| Fontes | 2 |

---

## 📝 NOTAS ADICIONAIS

1. **Código monolítico:** Todo o projeto está em um único arquivo (`index.html`). Para manutenção futura, considere separar CSS e JavaScript em arquivos externos.

2. **Sem sistema de build:** O projeto não utiliza bundlers (webpack, vite), transpiladores (Babel), ou pré-processadores CSS (SASS, LESS). Isso é adequado para um projeto pequeno, mas pode limitar escalabilidade.

3. **Sem testes:** Não há testes automatizados. Qualquer alteração requer teste manual completo.

4. **Dependências via CDN:** XP.css e 98.css são carregados via CDN (unpkg). Se o CDN ficar offline, o layout quebra completamente. Considere fazer download local das bibliotecas.

5. **Webamp removido:** O player Webamp foi removido do código principal, mas a biblioteca permanece em `webamp/built/` e as informações da playlist estão documentadas acima para facilitar a reimplementação.

---

**Fim da Auditoria**