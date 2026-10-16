# Chromiumchecker.com
Use feature detection to work out the running version of Chromium. No more UserAgent hackery!

- Uses a known feature list to work out the running version of Chromium
- Doesn't need to use the UserAgent or anything else that could be spoofed
- Provides info on each feature detected for more comprehensive results

![Chromiumchecker.com preview](docs/preview.png?raw=true "Chromiumchecker.com")
## Local development

Use Node.js and npm (the lockfile defines the dependency tree), then:

```sh
npm ci
npm start       # one development build into dist/
npm run watch   # rebuild dist/ when source changes
npm test        # JavaScript style checks
npm run build   # production build into dist/
```

`start` and `watch` compile files; they do not start an HTTP server. To preview,
serve `dist/` with a local static server, for example in another terminal:

```sh
python3 -m http.server 8080 --bind 127.0.0.1 --directory dist
```

Open `http://127.0.0.1:8080` and stop the server with Ctrl+C. Browser detection
runs on the browser viewing the page; local results do not validate every
Chromium version or platform. No Wingman helper or development box is required.

Publishing is handled separately by the site publisher; building locally does
not deploy the site.
