# Webamp Constructor - Guia de Referência

## Inicialização Básica

```typescript
import Webamp from "webamp";

const webamp = new Webamp({
  // ...opções do construtor
});

webamp.renderWhenReady(...);
```

## Opções do Construtor

### `initialTracks`
Array de tracks para pré-popular a playlist. URLs devem ter CORS correto.

**Recomendação:** Fornecer `metaData` e `duration` para evitar fetch de ID3 tags.

```typescript
initialTracks: [
  {
    url: "./path/to/track.mp3",
    metaData: {
      artist: "Artist Name",
      title: "Track Title",
    },
    duration: 120, // em segundos
  },
]
```

### `initialSkin`
Objeto representando a skin inicial. Se omitido, usa a skin padrão.

```typescript
initialSkin: {
  url: "./path/to/skin.wsz",
}
```

### `availableSkins`
Array de skins que aparecem no menu "Options" > "Skins".

```typescript
availableSkins: [
  { url: "./green.wsz", name: "Green Dimension V2" },
  { url: "./osx.wsz", name: "Mac OSX v1.5 (Aqua)" },
]
```

### `windowLayout`
**Desde:** v2.0.0

Objeto representando o layout inicial das janelas. Janelas omitidas iniciam ocultas.

Propriedades válidas: `main`, `equalizer`, `playlist`, `milkdrop`

Cada janela pode ter:
- `position`: `{ top: 0, left: 0 }` (obrigatório)
- `shadeMode`: boolean (exceto milkdrop)
- `closed`: boolean
- `size`: `{ extraHeight: 1, extraWidth: 10 }` (apenas playlist e milkdrop)

```typescript
windowLayout: {
  main: {
    position: { top: 0, left: 0 },
    shadeMode: true,
    closed: false,
  },
  equalizer: {
    position: { top: 0, left: 0 },
    shadeMode: true,
    closed: false,
  },
  playlist: {
    position: { top: 0, left: 0 },
    shadeMode: true,
    size: { extraHeight: 1, extraWidth: 10 },
    closed: false,
  },
}
```

**Nota:** Após posicionamento, janelas são centralizadas como grupo no container DOM.

### `enableDoubleSizeMode`
**Desde:** v2.0.0  
**Padrão:** `false`

Habilita modo de tamanho duplo.

```typescript
enableDoubleSizeMode: true
```

**Nota:** Não se aplica a janelas redimensionáveis (equalizer, Milkdrop).

### `enableHotkeys`
**Padrão:** `false`

Habilita atalhos globais de teclado.

```typescript
enableHotkeys: true
```

### `zIndex`
**Padrão:** `99999`

Define o z-index que o Webamp deve usar.

```typescript
zIndex: 99999
```

### `filePickers`
Array de file pickers adicionais que aparecem no menu "Options" > "Play".

Cada picker deve ter:
- `contextMenuName`: string
- `filePicker`: função que retorna Promise<Track[]>
- `requiresNetwork`: boolean

```typescript
filePickers: [
  {
    contextMenuName: "My File Picker...",
    filePicker: () => Promise.resolve([
      { url: "./rick_roll.mp3" },
    ]),
    requiresNetwork: true,
  },
]
```

### `handleTrackDropEvent`
Função customizada para derivar objetos Track de eventos de drop.

Retorna: Array de Tracks ou `null` para comportamento padrão.

```typescript
handleTrackDropEvent: async (e) => {
  return [/* array of Tracks */];
}
```

### `handleAddUrlEvent`
**Desde:** v1.4.1

Estende comportamento do botão "ADD URL".

Retorna: Array opcional de Tracks ou `null`.

```typescript
handleAddUrlEvent: async () => {
  return [/* array of Tracks */];
}
```

### `handleLoadListEvent`
**Desde:** v1.4.1

Estende comportamento do botão "LOAD LIST" da playlist.

Retorna: Array opcional de Tracks ou `null`.

```typescript
handleLoadListEvent: async () => {
  return [/* array of Tracks */];
}
```

### `handleSaveListEvent`
**Desde:** v1.4.1

Estende comportamento do botão "SAVE LIST" da playlist.

```typescript
handleSaveListEvent: (tracks) => {
  // Lógica customizada para salvar tracks
}
```

### `enableMediaSession`
**Desde:** v2.2.0  
**Padrão:** `false`

Conecta ao Media Session API do navegador (se suportado).

Permite controles de mídia no nível do OS/hardware e informações de "current track" na tela de bloqueio.

```typescript
enableMediaSession: true
```

### `requireButterchurnPresets`
**Desde:** v2.3.0

Define presets do Milkdrop (Butterchurn). Se não especificado, usa presets padrão do bundle.

Presets devem estar no formato JSON do Butterchurn.

Fontes:
- [Milkdrop Presets Collection](https://archive.org/details/milkdrops)
- [butterchurn-presets@3.0.0-beta.4 NPM](https://www.npmjs.com/package/butterchurn-presets/v/3.0.0-beta.4)

```typescript
requireButterchurnPresets: () => Promise<Preset[]>
```

## Notas Importantes

- **Todas as propriedades são opcionais**
- URLs de tracks e skins devem ter **CORS headers corretos**
- Para lista de hotkeys, consulte a documentação de hotkeys
- Para mais informações sobre inicialização, veja o Guia de Inicialização
