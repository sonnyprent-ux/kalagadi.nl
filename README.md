# Kgalagadi.nl website

A single-page, Dutch-language website for Kgalagadi.nl. It is plain HTML, CSS and a little JavaScript. There is no build step and nothing to install, so GitHub Pages can serve it as it is.

```
index.html          the homepage
404.html            "page not found" page
css/style.css       all styling
js/main.js          route map interaction + sign-up form
img/                photos (WebP, already resized) + og.jpg for link previews
favicon.svg         the roundel logo mark
logo/               logo files (colour + one-colour) for print, mug, social media
robots.txt, sitemap.xml
.nojekyll           tells GitHub Pages to serve the files exactly as they are
```

## Publish on GitHub Pages

1. Create a free account at github.com and click **New repository**. Name it, for example, `kgalagadi-website`. Public is fine. Do not add a README (this folder already has one).
2. On the empty repository page click **uploading an existing file**. Drag **the contents of this folder** in (the `index.html` file, the `css`, `js`, `img` and `logo` folders, and the other files), not the folder itself. Make sure `.nojekyll` is included (hidden files are easy to miss when dragging; if it is missing, click **Add file > Create new file**, name it `.nojekyll`, and commit it).
3. Click **Commit changes**.
4. Go to **Settings > Pages**. Under **Build and deployment** choose **Deploy from a branch**, branch **main**, folder **/ (root)**, and click **Save**.
5. After one or two minutes the site is live at `https://<your-username>.github.io/kgalagadi-website/`. The address is shown at the top of the Pages settings.

### Use kgalagadi.nl as the address

1. In **Settings > Pages > Custom domain** enter `kgalagadi.nl` and save. GitHub adds a `CNAME` file for you.
2. At the place where you registered the domain, add these DNS records: four `A` records for `@` pointing to `185.199.108.153`, `185.199.109.153`, `185.199.110.153` and `185.199.111.153`, and a `CNAME` record for `www` pointing to `<your-username>.github.io`. (Check GitHub's current IP list in their "Managing a custom domain" documentation before you set this up.)
3. When GitHub has verified the domain, tick **Enforce HTTPS**.

If you do **not** use a custom domain, the site is served from a sub-path (`/kgalagadi-website/`). Everything on the homepage uses relative links, so it still works. Only these two things assume the domain `kgalagadi.nl`: the `canonical` and `og:` tags in `index.html`, and `sitemap.xml` / `robots.txt`. Change them if you stay on github.io. The `404.html` page links back to `/`, which also assumes the root of a domain.

## Things to fill in before you announce the site

- **Contact address.** `hallo@kgalagadi.nl` appears in the footer (`index.html`) and in `js/main.js` (`MAIL_TO`). Replace it with a real mailbox.
- **Sign-up form.** GitHub Pages has no server, so by default the form opens the visitor's own e-mail app with the request filled in. Some visitors (webmail users, phones without a mail app) will not get further. A more reliable option is a free form service such as Formspree: create a form there, paste its URL into `FORM_ENDPOINT` at the top of the form section in `js/main.js`, and requests then arrive in your inbox directly.
- **Trip details** that were still open when the site was written: the group size (the page says maximum 10 travellers, 5 cars, going ahead from 6), the price of 4.500 euro per person sharing, exactly what the price includes (fuel, park fees, meals and insurance are not mentioned on the page), and the travel dates.
- **Legal and trust pages.** For a Dutch travel company you will need terms and conditions, a privacy statement, your KvK number and the travel guarantee information (SGR or equivalent) in the footer before you take bookings.

## About the photos

- All photos are your own; they have been resized and converted to WebP so the page loads quickly. The originals are not included, so keep them safe.
- **Privacy edits.** The car number plates and the name printed on a child's shirt were blurred in the published copies. Please look through every photo that shows people and make sure everyone pictured (or their parents, for children) is happy to appear on a public website.
- **Swapping or adding photos.** Put a new image in `img/` (WebP or JPG, about 1200 to 1600 px wide is plenty) and change the `src` in `index.html`. Always update the `alt` text as well: it describes the photo for screen readers and search engines.
- **Stock photos.** If you add stock photos of the Kgalagadi later, use a source whose licence allows commercial use (for example Unsplash, Pexels, or Wikimedia Commons images with a CC BY or CC0 licence) and give credit where the licence asks for it. A short "Fotocredits" line in the footer is enough.

## Fonts and privacy (AVG/GDPR)

The page loads its fonts (Archivo, IBM Plex Mono, Source Sans 3) from Google Fonts. That sends visitors' IP addresses to Google, which some privacy authorities consider problematic without consent. If you want to avoid that, download the three font families (for example via google-webfonts-helper), place the files in a `fonts/` folder and replace the Google Fonts `<link>` in `index.html` with `@font-face` rules in `css/style.css`.

## Editing tips

- All colours and fonts are CSS variables at the top of `css/style.css` (`--night`, `--dune`, `--ember`, ...).
- Texts are normal HTML in `index.html`. The 15 days of the route are the `<article class="day">` blocks; the map highlights the place named in `data-place`.
- The logo files in `logo/` are SVG: they scale to any size, so they can go on the mug and on printed material as they are.
