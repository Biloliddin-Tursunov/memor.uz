# memor.uz

Monorepo for the Me'mor web projects.

## Modules

- `memor-site` - public Me'mor website.
- `memor-cms` - content management dashboard.
- `memor-jamoa` - team and task workspace.
- `memor-ai` - architecture AI assistant.
- `memor-biloliddin` - Biloliddin personal blog module.

## Setup

Copy each module's `.env.example` to `.env` and fill in real local credentials. Do not commit `.env` files.

```bash
npm install
```

## Development

```bash
npm run dev:site
npm run dev:cms
npm run dev:jamoa
npm run dev:ai
npm run dev:biloliddin
```

## Build

```bash
npm run build
```
