# Decision Lego Simple

Installable package for the `simple` Decision Lego web app.

## Install

From a local checkout:

```bash
npm install -g .
```

From GitHub after this folder is pushed:

```bash
npm install -g git+https://github.com/<your-user>/<your-repo>.git
```

## Run

Without AI image generation:

```bash
decision-lego-simple
```

With Gemini image generation enabled:

```bash
GEMINI_API_KEY=your_key decision-lego-simple
```

On Windows PowerShell:

```powershell
$env:GEMINI_API_KEY = "your_key"
decision-lego-simple
```

## Options

```bash
decision-lego-simple --port 4173 --host 127.0.0.1
decision-lego-simple --api-key your_key
```

## Notes

- The package serves the bundled `simple` app locally.
- The browser bundle no longer contains a hardcoded Gemini API key.
- If no Gemini key is configured, the app still works and shows a generated placeholder image instead of AI box art.
