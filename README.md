# Celebrating Sixty

A private, cinematic collection of five beautiful ways to celebrate Diane's sixtieth birthday.

## Local development

Requires Node.js 22.13 or newer.

```sh
npm install
npm run dev
```

Open `http://localhost:3000`.

## Checks

```sh
npm run lint
npm run typecheck
npm run build
```

The regular static export is written to `out/`. The S3-ready, self-contained page is written to `dist/celebrating-sixty.html`; its imagery and styling are embedded so it works through one private S3 URL.

## Private AWS publishing

The deployment uses the same private S3 and presigned-link pattern as the Innovation Tournament checklist and recruiting pages. Public bucket access stays blocked.

```sh
npm run deploy
```

By default this uploads `index.html` to the `60th-birthday` bucket in `us-east-1` and prints a link valid for seven days. Optional environment variables are `S3_BUCKET`, `S3_KEY`, `AWS_REGION`, and `EXPIRES_IN` (maximum 604800 seconds for S3 presigned URLs).
