# Nuxt Minimal Starter

Look at the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

## Deploy to Hostinger with GitHub Actions

This project can be deployed as a static Nuxt site to Hostinger.

1. In GitHub, open `Settings > Secrets and variables > Actions`.
2. Add these repository secrets:
   - `FTP_HOST`: hostname only, for example `ftp.your-domain.com`
   - `FTP_USERNAME`: your Hostinger FTP username
   - `FTP_PASSWORD`: your Hostinger FTP password
   - `REMOTE_DIR`: usually `/public_html`
3. Optionally add:
   - `FTP_PROTOCOL`: `ftp` or `ftps`
   - `FTP_PORT`: custom port if your Hostinger account uses one
4. Push to `main` to trigger the workflow in `.github/workflows/deploy-hostinger.yml`.

Important:

- Do not put `ftp://` in `FTP_HOST`
- Do not put a path like `/public_html` in `FTP_HOST`
- The workflow builds the site with `npm run generate` and uploads `.output/public/`
