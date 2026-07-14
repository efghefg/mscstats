# Редактор отчёта по СИМ — версия для GitHub Pages

Эта версия исправляет ошибку:

`Module name, '@supabase/supabase-js' does not resolve to a valid URL`

Причина ошибки: GitHub Pages открывал исходный `src/main.js`, где npm-пакеты были указаны как bare imports. В этой сборке в корне лежат уже собранные браузерные файлы, поэтому `@supabase/supabase-js`, `html-to-image` и `jszip` встроены в итоговый JavaScript.

## Что загружать в GitHub

Загрузите **всё содержимое этой папки в корень репозитория**. В корне репозитория должны лежать:

- `index.html`
- `assets/`
- `.nojekyll`
- `.github/`
- `source-project/`

Не загружайте внешнюю папку целиком как дополнительный уровень вложенности.

## GitHub Pages

Рекомендуемый вариант:

1. `Settings → Pages`
2. `Source → GitHub Actions`
3. Сделайте commit/push.
4. Откройте `Actions` и дождитесь зелёной галочки у `Deploy to GitHub Pages`.

Даже если случайно включён режим `Deploy from a branch / root`, сайт всё равно откроется: готовая production-сборка уже находится в корне.

## Supabase

В `Settings → Secrets and variables → Actions` добавьте:

Secrets:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

Variable:
- `VITE_SUPABASE_TABLE` — необязательно, по умолчанию `sim_report_slides`.

Без Supabase редактор всё равно запускается и сохраняет данные локально в браузере.

## Moscow Sans

Шрифт не включён в архив. Добавьте свой лицензированный файл в:

`source-project/src/fonts/MoscowSans.ttf`

или

`source-project/src/fonts/MoscowSans.woff2`

После commit/push GitHub Actions пересоберёт сайт. Для режима публикации прямо из ветки также скопируйте файл в `assets/fonts/` и пересоберите production-версию локально.

## Локальная разработка

```bash
cd source-project
npm install
npm run dev
```

## Локальная production-сборка

```bash
cd source-project
npm install
npm run build
```
