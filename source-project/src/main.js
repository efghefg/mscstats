import './styles.css';
import { createClient } from '@supabase/supabase-js';
import { toPng } from 'html-to-image';
import JSZip from 'jszip';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || '';
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || '';
const SUPABASE_TABLE = import.meta.env.VITE_SUPABASE_TABLE || 'sim_report_slides';
const supabase = SUPABASE_URL && SUPABASE_ANON_KEY
  ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
  : null;

const assetUrl = (filename) => `${import.meta.env.BASE_URL}assets/${filename}`;

const COLORS = {
  ink: '#2d3440',
  ink2: '#5d687c',
  panel: '#ffffff',
  light: '#e7eaf0',
  light2: '#dfe3ea',
  dark: '#4d5565',
  blue: '#8b9db6',
  green: '#00aa55',
  red: '#ef4d5d',
  pillGreen: '#e6faec',
  pillRed: '#fde7e9',
  yellow: '#fff8d8',
  gray: '#f1f2f5',
  violet: '#f3ddfb',
};

const f = (id, label, value, x, y, w, h, opts = {}) => ({
  id, label, value, x, y, w, h,
  fontSize: opts.fontSize ?? 34,
  fontWeight: opts.fontWeight ?? 600,
  color: opts.color ?? COLORS.ink,
  background: opts.background ?? 'transparent',
  borderRadius: opts.borderRadius ?? 0,
  align: opts.align ?? 'center',
  justify: opts.justify ?? 'center',
  padding: opts.padding ?? 0,
  lineHeight: opts.lineHeight ?? 1,
  group: opts.group ?? 'Данные',
  multiline: opts.multiline ?? false,
  editableOnStage: opts.editableOnStage ?? true,
  metricSuffix: opts.metricSuffix,
  suffixSize: opts.suffixSize,
  suffixWeight: opts.suffixWeight,
  suffixGap: opts.suffixGap,
});

const slides = [
  {
    id: 1,
    name: 'Основные показатели',
    background: assetUrl('slide-1.png'),
    fields: [
      f('date_range', 'Период', 'дата 1– дата 2 (1 неделя)', 46, 20, 584, 61, { fontSize: 38, fontWeight: 700, color: '#fff', background: COLORS.dark, borderRadius: 22, group: 'Шапка' }),
      f('total_trips', 'Общее количество поездок', '2,8', 120, 216, 198, 75, { fontSize: 64, fontWeight: 700, background: '#fff', justify: 'flex-start', metricSuffix: 'млн', suffixSize: 31, suffixWeight: 700, suffixGap: 14, group: 'Поездки' }),
      f('prev_period', 'Период АППН', 'дата 1 – дата 2', 416, 251, 218, 36, { fontSize: 26, color: '#8491a6', background: COLORS.light, group: 'Поездки' }),
      f('prev_total', 'Поездки в АППН', 'X млн', 706, 249, 112, 38, { fontSize: 35, color: '#617087', background: COLORS.light, group: 'Поездки' }),
      f('prev_delta', 'Изменение к АППН', '▲ XX,X%', 837, 249, 127, 38, { fontSize: 25, color: COLORS.green, background: COLORS.light, group: 'Поездки' }),

      f('yandex_trips', 'Яндекс — поездки', 'X,X тыс.', 143, 397, 185, 62, { fontSize: 43, background: '#fff', group: 'Операторы' }),
      f('yandex_prev', 'Яндекс — АППН', 'АППН X тыс. ▲ XX,X%', 96, 475, 263, 38, { fontSize: 21, color: COLORS.green, background: COLORS.pillGreen, borderRadius: 18, group: 'Операторы' }),
      f('whoosh_trips', 'Whoosh — поездки', 'X,X тыс.', 444, 397, 185, 62, { fontSize: 43, background: '#fff', group: 'Операторы' }),
      f('whoosh_prev', 'Whoosh — АППН', 'АППН X тыс. ▲ XX,X%', 397, 475, 271, 38, { fontSize: 21, color: COLORS.green, background: COLORS.pillGreen, borderRadius: 18, group: 'Операторы' }),
      f('urent_trips', 'Юрент — поездки', 'X,X тыс.', 745, 397, 185, 62, { fontSize: 43, background: '#fff', group: 'Операторы' }),
      f('urent_prev', 'Юрент — АППН', 'АППН X тыс. ▼ XX,X%', 701, 475, 267, 38, { fontSize: 21, color: COLORS.red, background: COLORS.pillRed, borderRadius: 18, group: 'Операторы' }),

      f('yandex_mos_pct', 'Яндекс — с Mos ID, %', 'XX%', 1042, 241, 67, 30, { fontSize: 24, color: '#657086', background: '#fff', justify: 'flex-start', group: 'Mos ID' }),
      f('yandex_no_pct', 'Яндекс — без Mos ID, %', 'XX%', 1781, 241, 66, 30, { fontSize: 24, color: '#b9c0cd', background: '#fff', justify: 'flex-end', group: 'Mos ID' }),
      f('yandex_mos_count', 'Яндекс — с Mos ID, тыс.', 'XX,X', 1041, 274, 95, 33, { fontSize: 24, color: '#fff', background: COLORS.blue, justify: 'flex-start', padding: '0 8px', group: 'Mos ID' }),
      f('yandex_no_count', 'Яндекс — без Mos ID, тыс.', 'XX,X', 1437, 274, 95, 33, { fontSize: 24, color: '#8490a3', background: COLORS.light2, justify: 'flex-start', padding: '0 8px', group: 'Mos ID' }),
      f('whoosh_mos_pct', 'Whoosh — с Mos ID, %', 'XX%', 1042, 340, 67, 30, { fontSize: 24, color: '#657086', background: '#fff', justify: 'flex-start', group: 'Mos ID' }),
      f('whoosh_no_pct', 'Whoosh — без Mos ID, %', 'XX%', 1781, 340, 66, 30, { fontSize: 24, color: '#b9c0cd', background: '#fff', justify: 'flex-end', group: 'Mos ID' }),
      f('whoosh_mos_count', 'Whoosh — с Mos ID, тыс.', 'XX,X', 1041, 373, 95, 33, { fontSize: 24, color: '#fff', background: COLORS.blue, justify: 'flex-start', padding: '0 8px', group: 'Mos ID' }),
      f('whoosh_no_count', 'Whoosh — без Mos ID, тыс.', 'XX,X', 1437, 373, 95, 33, { fontSize: 24, color: '#8490a3', background: COLORS.light2, justify: 'flex-start', padding: '0 8px', group: 'Mos ID' }),
      f('urent_mos_pct', 'Юрент — с Mos ID, %', 'XX%', 1042, 438, 67, 30, { fontSize: 24, color: '#657086', background: '#fff', justify: 'flex-start', group: 'Mos ID' }),
      f('urent_no_pct', 'Юрент — без Mos ID, %', 'XX%', 1781, 438, 66, 30, { fontSize: 24, color: '#b9c0cd', background: '#fff', justify: 'flex-end', group: 'Mos ID' }),
      f('urent_mos_count', 'Юрент — с Mos ID, тыс.', 'XX,X', 1041, 471, 95, 33, { fontSize: 24, color: '#fff', background: COLORS.blue, justify: 'flex-start', padding: '0 8px', group: 'Mos ID' }),
      f('urent_no_count', 'Юрент — без Mos ID, тыс.', 'XX,X', 1437, 471, 95, 33, { fontSize: 24, color: '#8490a3', background: COLORS.light2, justify: 'flex-start', padding: '0 8px', group: 'Mos ID' }),

      f('season_start', 'Парк в начале сезона', '60', 138, 790, 105, 72, { fontSize: 61, fontWeight: 700, background: '#fff', justify: 'flex-start', metricSuffix: 'тыс. самокатов', suffixSize: 29, suffixWeight: 700, suffixGap: 14, group: 'Квота' }),
      f('quota_total', 'Согласованная квота — всего', 'XX', 1017, 617, 122, 68, { fontSize: 60, fontWeight: 700, background: '#fff', metricSuffix: 'тыс.', suffixSize: 29, suffixWeight: 700, suffixGap: 12, group: 'Квота' }),
      f('quota_yandex', 'Согласованная квота — Яндекс', 'XX тыс.', 1291, 617, 171, 68, { fontSize: 35, color: '#5d6678', background: COLORS.yellow, borderRadius: 17, group: 'Квота' }),
      f('quota_whoosh', 'Согласованная квота — Whoosh', 'XX тыс.', 1480, 617, 171, 68, { fontSize: 35, color: '#5d6678', background: COLORS.gray, borderRadius: 17, group: 'Квота' }),
      f('quota_urent', 'Согласованная квота — Юрент', 'XX тыс.', 1667, 617, 171, 68, { fontSize: 35, color: '#5d6678', background: COLORS.violet, borderRadius: 17, group: 'Квота' }),
      f('actual_total', 'Фактический парк — всего', 'XX', 1017, 740, 122, 68, { fontSize: 60, fontWeight: 700, background: '#fff', metricSuffix: 'тыс.', suffixSize: 29, suffixWeight: 700, suffixGap: 12, group: 'Квота' }),
      f('actual_yandex', 'Фактический парк — Яндекс', 'XX тыс.', 1291, 740, 171, 68, { fontSize: 35, color: '#5d6678', background: COLORS.yellow, borderRadius: 17, group: 'Квота' }),
      f('actual_whoosh', 'Фактический парк — Whoosh', 'XX тыс.', 1480, 740, 171, 68, { fontSize: 35, color: '#5d6678', background: COLORS.gray, borderRadius: 17, group: 'Квота' }),
      f('actual_urent', 'Фактический парк — Юрент', 'XX тыс.', 1667, 740, 171, 68, { fontSize: 35, color: '#5d6678', background: COLORS.violet, borderRadius: 17, group: 'Квота' }),
      f('excluded_total', 'Исключённый парк — всего', 'XX', 1017, 864, 122, 68, { fontSize: 60, fontWeight: 700, background: '#fff', metricSuffix: 'тыс.', suffixSize: 29, suffixWeight: 700, suffixGap: 12, group: 'Квота' }),
      f('excluded_yandex', 'Исключённый парк — Яндекс', 'XX тыс.', 1291, 864, 171, 68, { fontSize: 35, color: '#5d6678', background: COLORS.yellow, borderRadius: 17, group: 'Квота' }),
      f('excluded_whoosh', 'Исключённый парк — Whoosh', 'XX тыс.', 1480, 864, 171, 68, { fontSize: 35, color: '#5d6678', background: COLORS.gray, borderRadius: 17, group: 'Квота' }),
      f('excluded_urent', 'Исключённый парк — Юрент', 'XX тыс.', 1667, 864, 171, 68, { fontSize: 35, color: '#5d6678', background: COLORS.violet, borderRadius: 17, group: 'Квота' }),
    ],
    dynamicBars: [
      { id: 'bar-yandex', x: 1041, y: 274, w: 795, h: 33, percentField: 'yandex_mos_pct' },
      { id: 'bar-whoosh', x: 1041, y: 373, w: 795, h: 33, percentField: 'whoosh_mos_pct' },
      { id: 'bar-urent', x: 1041, y: 471, w: 795, h: 33, percentField: 'urent_mos_pct' },
    ],
  },
  {
    id: 2,
    name: 'Показатели аварийности',
    background: assetUrl('slide-2.png'),
    fields: [
      f('date_range', 'Период', 'дата 1 – дата 2 (2 недели)', 46, 20, 575, 61, { fontSize: 37, fontWeight: 700, color: '#fff', background: COLORS.dark, borderRadius: 22, group: 'Шапка' }),
      f('accidents_total', 'ДТП за 2 недели', 'XX', 140, 229, 120, 85, { fontSize: 67, color: '#5d687c', background: COLORS.light, group: 'ДТП' }),
      f('accidents_delta', 'Изменение к АППН', '+X%', 420, 229, 120, 85, { fontSize: 58, fontWeight: 700, background: '#fff', group: 'ДТП' }),
      f('accidents_prev', 'ДТП в АППН', 'X ДТП', 395, 354, 200, 40, { fontSize: 23, color: '#667389', background: COLORS.light, borderRadius: 13, group: 'ДТП' }),
      f('yandex_accidents', 'Яндекс — ДТП', 'XX', 88, 547, 76, 48, { fontSize: 39, background: '#fff', group: 'ДТП' }),
      f('yandex_share', 'Яндекс — доля', 'XX%', 176, 548, 73, 40, { fontSize: 22, background: COLORS.light, borderRadius: 19, color: '#5d687c', group: 'ДТП' }),
      f('whoosh_accidents', 'Whoosh — ДТП', 'XX', 275, 547, 76, 48, { fontSize: 39, background: '#fff', group: 'ДТП' }),
      f('whoosh_share', 'Whoosh — доля', 'XX%', 365, 548, 73, 40, { fontSize: 22, background: COLORS.light, borderRadius: 19, color: '#5d687c', group: 'ДТП' }),
      f('urent_accidents', 'Юрент — ДТП', 'XX', 465, 547, 76, 48, { fontSize: 39, background: '#fff', group: 'ДТП' }),
      f('urent_share', 'Юрент — доля', 'XX%', 553, 548, 73, 40, { fontSize: 22, background: COLORS.light, borderRadius: 19, color: '#5d687c', group: 'ДТП' }),

      f('rate_total', 'ДТП на 100 тыс. поездок', '1,63 ДТП на 100. тыс. поездок', 82, 730, 505, 46, { fontSize: 31, fontWeight: 700, background: '#fff', justify: 'flex-start', group: 'ДТП на 100 тыс.' }),
      f('rate_prev', 'АППН — ДТП на 100 тыс.', 'АППН (29 июня – 5 июля) – 0,81 ДТП', 84, 789, 451, 35, { fontSize: 23, color: '#778398', background: COLORS.light, borderRadius: 13, group: 'ДТП на 100 тыс.' }),
      f('rate_yandex', 'Яндекс — показатель', '1,21', 163, 842, 83, 44, { fontSize: 31, color: '#5f6a7e', background: COLORS.light, group: 'ДТП на 100 тыс.' }),
      f('rate_yandex_prev', 'Яндекс — АППН', 'АППН – X,XX', 95, 888, 160, 28, { fontSize: 18, color: '#778398', background: COLORS.light, group: 'ДТП на 100 тыс.' }),
      f('rate_whoosh', 'Whoosh — показатель', 'X,XX', 352, 842, 83, 44, { fontSize: 31, color: '#5f6a7e', background: COLORS.light, group: 'ДТП на 100 тыс.' }),
      f('rate_whoosh_prev', 'Whoosh — АППН', 'АППН – X,XX', 285, 888, 160, 28, { fontSize: 18, color: '#778398', background: COLORS.light, group: 'ДТП на 100 тыс.' }),
      f('rate_urent', 'Юрент — показатель', 'X,XX', 512, 842, 83, 44, { fontSize: 31, color: '#5f6a7e', background: COLORS.light, group: 'ДТП на 100 тыс.' }),
      f('rate_urent_prev', 'Юрент — АППН', 'АППН – X,XX', 456, 888, 160, 28, { fontSize: 18, color: '#778398', background: COLORS.light, group: 'ДТП на 100 тыс.' }),

      ...[
        ['minor','Несовершеннолетние'], ['double','Вдвоём'], ['dismount','Неспешивание'], ['parking','Неправильная парковка'], ['all','Всего нарушений']
      ].flatMap(([key, label], row) => {
        const y = [263, 356, 446, 536, 634][row];
        const bg = row === 4 ? '#e1e5eb' : '#e7eaf0';
        return [
          f(`${key}_yandex`, `${label} — Яндекс`, 'XX', 1083, y, 90, 39, { fontSize: row === 4 ? 30 : 34, background: bg, group: 'Нарушения' }),
          f(`${key}_whoosh`, `${label} — Whoosh`, 'XX', 1277, y, 90, 39, { fontSize: row === 4 ? 30 : 34, background: bg, group: 'Нарушения' }),
          f(`${key}_urent`, `${label} — Юрент`, 'XX', 1457, y, 90, 39, { fontSize: row === 4 ? 30 : 34, background: bg, group: 'Нарушения' }),
          f(`${key}_total`, `${label} — всего`, 'XX', 1658, y, 90, 39, { fontSize: row === 4 ? 30 : 34, background: '#d3d9e3', group: 'Нарушения' }),
        ];
      }),

      f('raids_season', 'Рейды с начала сезона', 'XX', 705, 795, 150, 79, { fontSize: 66, color: '#5d687c', background: COLORS.light, metricSuffix: 'ед.', suffixSize: 38, suffixWeight: 700, suffixGap: 14, group: 'Рейды' }),
      f('raids_period', 'Рейды за 2 недели', 'X', 1014, 795, 120, 79, { fontSize: 66, fontWeight: 700, background: '#fff', metricSuffix: 'ед.', suffixSize: 38, suffixWeight: 700, suffixGap: 14, group: 'Рейды' }),
      f('blocked', 'Заблокировано пользователей', 'XX (+XX)', 1270, 793, 240, 82, { fontSize: 39, color: '#5d687c', background: '#fff', justify: 'flex-start', group: 'Рейды' }),
      f('fines', 'Выставлено штрафов', 'XX (+XX)', 1270, 895, 240, 82, { fontSize: 39, color: '#5d687c', background: '#fff', justify: 'flex-start', group: 'Рейды' }),
    ],
  },
  {
    id: 3,
    name: 'Суды операторов',
    background: assetUrl('slide-3.png'),
    fields: [
      f('cases_total', 'Всего судебных дел', 'X', 196, 222, 120, 82, { fontSize: 68, background: '#fff', group: 'Основные показатели' }),
      f('recovered', 'Взыскано с пользователей, тыс. руб.', 'X', 196, 451, 120, 82, { fontSize: 58, background: '#fff', metricSuffix: 'тыс. рублей', suffixSize: 23, suffixWeight: 700, suffixGap: 10, group: 'Основные показатели' }),
      f('won', 'Выиграно со взысканием', 'X', 103, 704, 125, 58, { fontSize: 47, color: '#657187', background: COLORS.light, borderRadius: 10, group: 'Основные показатели' }),
      f('lost', 'Проиграно сервисами', 'X', 103, 781, 125, 58, { fontSize: 47, color: '#657187', background: COLORS.light, borderRadius: 10, group: 'Основные показатели' }),
      f('pending', 'На рассмотрении', 'X', 103, 858, 125, 58, { fontSize: 47, color: '#657187', background: COLORS.light, borderRadius: 10, group: 'Основные показатели' }),
      f('yandex_cases', 'Яндекс — судебные дела', 'X', 1008, 268, 110, 75, { fontSize: 55, background: '#fff', group: 'Операторы' }),
      f('whoosh_cases', 'Whoosh — судебные дела', 'X', 1307, 268, 110, 75, { fontSize: 55, background: '#fff', group: 'Операторы' }),
      f('urent_cases', 'Юрент — судебные дела', 'X', 1608, 268, 110, 75, { fontSize: 55, background: '#fff', group: 'Операторы' }),
      f('claims_may', 'Иски — май', '10', 870, 745, 86, 46, { fontSize: 31, color: '#657187', background: '#fff', group: 'Графики' }),
      f('claims_june', 'Иски — июнь', '28', 1018, 518, 86, 46, { fontSize: 31, color: '#657187', background: '#fff', group: 'Графики' }),
      f('claims_july', 'Иски — июль', '6', 1168, 794, 86, 46, { fontSize: 31, color: '#657187', background: '#fff', group: 'Графики' }),
      f('wins_may', 'Выиграно — май', '0', 1425, 884, 86, 46, { fontSize: 31, color: '#657187', background: '#fff', group: 'Графики' }),
      f('wins_june', 'Выиграно — июнь', '5', 1571, 596, 86, 46, { fontSize: 31, color: '#657187', background: '#fff', group: 'Графики' }),
      f('wins_july', 'Выиграно — июль', '3', 1720, 715, 86, 46, { fontSize: 31, color: '#657187', background: '#fff', group: 'Графики' }),
    ],
    charts: [
      { id: 'claims', x: 831, y: 512, w: 445, h: 410, valueFields: ['claims_may', 'claims_june', 'claims_july'], months: ['май', 'июнь', 'июль'] },
      { id: 'wins', x: 1386, y: 512, w: 445, h: 410, valueFields: ['wins_may', 'wins_june', 'wins_july'], months: ['май', 'июнь', 'июль'] },
    ],
  },
];

const safeStorage = {
  get(key) {
    try { return window.localStorage.getItem(key); } catch { return null; }
  },
  set(key, value) {
    try { window.localStorage.setItem(key, value); } catch { /* storage may be blocked */ }
  },
};

const state = {
  activeSlideId: 1,
  reportId: safeStorage.get('sim-report-id') || 'report-2026-01',
  data: Object.fromEntries(slides.map(slide => [slide.id, Object.fromEntries(slide.fields.map(field => [field.id, field.value]))])),
  exporting: false,
};

function storageKey(slideId) {
  return `sim-report:${state.reportId}:slide:${slideId}`;
}

function escapeHtml(value) {
  return String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function parsePercent(value) {
  const match = String(value ?? '').replace(',', '.').match(/-?\d+(?:\.\d+)?/);
  const number = match ? Number(match[0]) : 50;
  return Math.max(3, Math.min(97, number));
}

function numericValue(value) {
  const match = String(value ?? '').replace(',', '.').match(/-?\d+(?:\.\d+)?/);
  return match ? Number(match[0]) : 0;
}

function currentSlide() {
  return slides.find(slide => slide.id === state.activeSlideId);
}

function showStatus(message, type = 'success') {
  const el = document.querySelector('.status-bar');
  if (!el) return;
  el.textContent = message;
  el.className = `status-bar visible ${type}`;
  clearTimeout(showStatus.timer);
  showStatus.timer = setTimeout(() => { el.className = 'status-bar'; }, 2600);
}

function renderMetric(field, value) {
  if (!field.metricSuffix) return escapeHtml(value);
  return `<span>${escapeHtml(value)}</span><span style="font-size:${field.suffixSize}px;font-weight:${field.suffixWeight};margin-left:${field.suffixGap}px;white-space:nowrap">${escapeHtml(field.metricSuffix)}</span>`;
}

function fieldStyle(field) {
  const justifyMap = { left: 'flex-start', right: 'flex-end', center: 'center' };
  return [
    `left:${field.x}px`, `top:${field.y}px`, `width:${field.w}px`, `height:${field.h}px`,
    `font-size:${field.fontSize}px`, `font-weight:${field.fontWeight}`, `color:${field.color}`,
    `background:${field.background}`, `border-radius:${field.borderRadius}px`,
    `justify-content:${justifyMap[field.justify] || field.justify}`, `text-align:${field.align}`,
    `padding:${typeof field.padding === 'number' ? `${field.padding}px` : field.padding}`,
    `line-height:${field.lineHeight}`,
  ].join(';');
}

function renderDynamicBars(slide) {
  if (!slide.dynamicBars) return '';
  return slide.dynamicBars.map(bar => {
    const pct = parsePercent(state.data[slide.id][bar.percentField]);
    return `<div class="dynamic-bar" data-percent-field="${bar.percentField}" style="left:${bar.x}px;top:${bar.y}px;width:${bar.w}px;height:${bar.h}px">
      <div class="dynamic-bar__fill" style="width:${pct}%"></div>
    </div>`;
  }).join('');
}

function renderCharts(slide) {
  if (!slide.charts) return '';
  return slide.charts.map(chart => {
    const values = chart.valueFields.map(id => numericValue(state.data[slide.id][id]));
    const max = Math.max(...values, 1);
    const cols = values.map((value, i) => {
      const h = Math.max(2, (value / max) * 340);
      return `<div class="chart-col">
        <div class="chart-bar" data-chart-id="${chart.id}" data-value-field="${chart.valueFields[i]}" style="height:${h}px"></div>
        <div class="chart-month">${chart.months[i]}</div>
      </div>`;
    }).join('');
    return `<div class="chart-layer" style="left:${chart.x}px;top:${chart.y}px;width:${chart.w}px;height:${chart.h}px">${cols}</div>`;
  }).join('');
}

function renderStage(slide) {
  return `<div class="stage-viewport"><div class="stage-scale"><div class="slide-stage" id="slide-stage-${slide.id}" style="background-image:url('${slide.background}')">
    ${renderDynamicBars(slide)}
    ${renderCharts(slide)}
    ${slide.fields.map(field => {
      const value = state.data[slide.id][field.id];
      return `<div
        class="editable-field"
        data-slide-id="${slide.id}"
        data-field-id="${field.id}"
        data-placeholder="${escapeHtml(field.label)}"
        contenteditable="${field.editableOnStage ? 'true' : 'false'}"
        spellcheck="false"
        style="${fieldStyle(field)}"
      >${renderMetric(field, value)}</div>`;
    }).join('')}
  </div></div></div>`;
}

function groupFields(fields) {
  return fields.reduce((acc, field) => {
    (acc[field.group] ||= []).push(field);
    return acc;
  }, {});
}

function renderEditor(slide) {
  const groups = groupFields(slide.fields);
  return `<aside class="editor-panel">
    <h2>Данные слайда ${slide.id}</h2>
    ${Object.entries(groups).map(([group, fields]) => `<section class="form-group">
      <h3 class="form-group__title">${escapeHtml(group)}</h3>
      ${fields.map(field => `<div class="field-row ${field.multiline ? 'field-row-wide' : ''}">
        <label for="input-${slide.id}-${field.id}">${escapeHtml(field.label)}</label>
        <input id="input-${slide.id}-${field.id}" type="text" data-editor-field="${field.id}" value="${escapeHtml(state.data[slide.id][field.id])}" />
      </div>`).join('')}
    </section>`).join('')}
  </aside>`;
}

function renderApp() {
  const slide = currentSlide();
  document.querySelector('#app').innerHTML = `<div class="app-shell">
    <header class="app-header">
      <div><h1 class="app-title">Редактор отчёта по СИМ</h1><p class="app-subtitle">Формат 1920×1080. Экспортируется ровно тот макет, который виден в превью.</p></div>
      <div class="header-actions">
        <button class="btn" id="export-all">Скачать все слайды ZIP</button>
      </div>
    </header>

    <div class="report-bar">
      <input class="report-id" id="report-id" value="${escapeHtml(state.reportId)}" aria-label="ID отчёта" />
      <button class="btn btn-primary" id="save-slide">Сохранить слайд ${slide.id}</button>
      <button class="btn" id="reload-slide">Обновить данные слайда ${slide.id}</button>
      <button class="btn btn-dark" id="export-slide">Скачать PNG слайда ${slide.id}</button>
    </div>

    <nav class="slide-tabs">
      ${slides.map(s => `<button class="slide-tab ${s.id === slide.id ? 'active' : ''}" data-slide-tab="${s.id}">Слайд ${s.id}</button>`).join('')}
    </nav>

    <main class="workspace">
      <section class="preview-card">
        <div class="preview-toolbar"><div class="preview-title">${escapeHtml(slide.name)}</div><div class="preview-actions"><span>${supabase ? 'Supabase подключён' : 'Локальный режим — Supabase не настроен'}</span></div></div>
        ${renderStage(slide)}
      </section>
      ${renderEditor(slide)}
    </main>
    <div class="status-bar"></div>
  </div>`;

  bindEvents();
  fitStage();
}

function fitStage() {
  const viewport = document.querySelector('.stage-viewport');
  const scale = document.querySelector('.stage-scale');
  if (!viewport || !scale) return;
  const factor = viewport.clientWidth / 1920;
  scale.style.transform = `scale(${factor})`;
}

function updateField(slideId, fieldId, value, source = 'editor') {
  state.data[slideId][fieldId] = value;
  const editor = document.querySelector(`[data-editor-field="${CSS.escape(fieldId)}"]`);
  const stage = document.querySelector(`[data-field-id="${CSS.escape(fieldId)}"]`);
  const slide = slides.find(s => s.id === slideId);
  const field = slide.fields.find(fld => fld.id === fieldId);

  if (source !== 'editor' && editor) editor.value = value;
  if (source !== 'stage' && stage) stage.innerHTML = renderMetric(field, value);

  const dynamicBar = slide.dynamicBars?.find(bar => bar.percentField === fieldId);
  if (dynamicBar) {
    const fill = document.querySelector(`[data-percent-field="${CSS.escape(fieldId)}"] .dynamic-bar__fill`);
    if (fill) fill.style.width = `${parsePercent(value)}%`;
  }

  const chart = slide.charts?.find(item => item.valueFields.includes(fieldId));
  if (chart) updateChartInDom(slide, chart);

  safeStorage.set(storageKey(slideId), JSON.stringify(state.data[slideId]));
}


function updateChartInDom(slide, chart) {
  const values = chart.valueFields.map(id => numericValue(state.data[slide.id][id]));
  const max = Math.max(...values, 1);
  chart.valueFields.forEach((fieldId, index) => {
    const bar = document.querySelector(`[data-chart-id="${CSS.escape(chart.id)}"][data-value-field="${CSS.escape(fieldId)}"]`);
    if (bar) bar.style.height = `${Math.max(2, (values[index] / max) * 340)}px`;
  });
}

function bindEvents() {
  window.onresize = fitStage;

  document.querySelectorAll('[data-slide-tab]').forEach(button => {
    button.addEventListener('click', () => {
      state.activeSlideId = Number(button.dataset.slideTab);
      loadLocalSlide(state.activeSlideId);
      renderApp();
    });
  });

  document.querySelectorAll('[data-editor-field]').forEach(input => {
    input.addEventListener('input', event => updateField(state.activeSlideId, input.dataset.editorField, event.target.value, 'editor'));
  });

  document.querySelectorAll('.editable-field').forEach(el => {
    el.addEventListener('input', () => {
      const field = currentSlide().fields.find(fld => fld.id === el.dataset.fieldId);
      const value = field.metricSuffix ? (el.querySelector('span')?.textContent ?? el.textContent) : el.textContent;
      updateField(state.activeSlideId, el.dataset.fieldId, value.trim(), 'stage');
    });
    el.addEventListener('keydown', event => {
      if (event.key === 'Enter') { event.preventDefault(); el.blur(); }
    });
  });

  document.querySelector('#report-id').addEventListener('change', event => {
    state.reportId = event.target.value.trim() || 'report-2026-01';
    safeStorage.set('sim-report-id', state.reportId);
    slides.forEach(slide => loadLocalSlide(slide.id));
    renderApp();
  });

  document.querySelector('#save-slide').addEventListener('click', () => saveSlide(state.activeSlideId));
  document.querySelector('#reload-slide').addEventListener('click', () => loadSlide(state.activeSlideId));
  document.querySelector('#export-slide').addEventListener('click', () => exportSlide(state.activeSlideId));
  document.querySelector('#export-all').addEventListener('click', exportAllSlides);
}

function loadLocalSlide(slideId) {
  try {
    const raw = safeStorage.get(storageKey(slideId));
    if (!raw) return;
    state.data[slideId] = { ...state.data[slideId], ...JSON.parse(raw) };
  } catch (error) {
    console.warn('Не удалось прочитать локальные данные', error);
  }
}

async function saveSlide(slideId) {
  safeStorage.set(storageKey(slideId), JSON.stringify(state.data[slideId]));
  if (!supabase) {
    showStatus(`Слайд ${slideId} сохранён локально. Добавьте ключи Supabase для облачного сохранения.`);
    return;
  }

  const { error } = await supabase.from(SUPABASE_TABLE).upsert({
    report_id: state.reportId,
    slide_no: slideId,
    payload: state.data[slideId],
    updated_at: new Date().toISOString(),
  }, { onConflict: 'report_id,slide_no' });

  if (error) {
    console.error(error);
    showStatus(`Ошибка Supabase: ${error.message}`, 'error');
    return;
  }
  showStatus(`Слайд ${slideId} сохранён в Supabase`);
}

async function loadSlide(slideId) {
  if (!supabase) {
    loadLocalSlide(slideId);
    renderApp();
    showStatus(`Данные слайда ${slideId} обновлены из локального хранилища`);
    return;
  }

  const { data, error } = await supabase
    .from(SUPABASE_TABLE)
    .select('payload')
    .eq('report_id', state.reportId)
    .eq('slide_no', slideId)
    .maybeSingle();

  if (error) {
    console.error(error);
    showStatus(`Ошибка загрузки: ${error.message}`, 'error');
    return;
  }
  if (!data?.payload) {
    showStatus(`В Supabase пока нет данных для слайда ${slideId}`, 'error');
    return;
  }
  state.data[slideId] = { ...state.data[slideId], ...data.payload };
  safeStorage.set(storageKey(slideId), JSON.stringify(state.data[slideId]));
  renderApp();
  showStatus(`Данные слайда ${slideId} обновлены из Supabase`);
}

async function makeSlidePng(slideId) {
  const previous = state.activeSlideId;
  if (previous !== slideId) {
    state.activeSlideId = slideId;
    renderApp();
    await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)));
  }

  await document.fonts.ready;
  const node = document.querySelector(`#slide-stage-${slideId}`);
  node.classList.add('exporting');
  const dataUrl = await toPng(node, {
    width: 1920,
    height: 1080,
    pixelRatio: 1,
    cacheBust: true,
    backgroundColor: '#eef1f6',
  });
  node.classList.remove('exporting');

  if (previous !== slideId) {
    state.activeSlideId = previous;
    renderApp();
  }
  return dataUrl;
}

async function exportSlide(slideId) {
  try {
    showStatus(`Формируется PNG слайда ${slideId}…`);
    const dataUrl = await makeSlidePng(slideId);
    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = `${state.reportId}-slide-${slideId}.png`;
    a.click();
    showStatus(`PNG слайда ${slideId} готов`);
  } catch (error) {
    console.error(error);
    showStatus(`Не удалось сформировать PNG: ${error.message}`, 'error');
  }
}

async function exportAllSlides() {
  try {
    showStatus('Формируются три PNG…');
    const zip = new JSZip();
    for (const slide of slides) {
      const dataUrl = await makeSlidePng(slide.id);
      zip.file(`${state.reportId}-slide-${slide.id}.png`, dataUrl.split(',')[1], { base64: true });
    }
    const blob = await zip.generateAsync({ type: 'blob' });
    const href = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = href;
    a.download = `${state.reportId}-slides.zip`;
    a.click();
    URL.revokeObjectURL(href);
    showStatus('ZIP со всеми слайдами готов');
  } catch (error) {
    console.error(error);
    showStatus(`Не удалось сформировать ZIP: ${error.message}`, 'error');
  }
}

try {
  slides.forEach(slide => loadLocalSlide(slide.id));
  renderApp();
} catch (error) {
  console.error(error);
  const app = document.querySelector('#app');
  if (app) {
    app.innerHTML = `<div class="boot-screen"><div class="boot-card" data-error="true"><h1>Не удалось запустить редактор</h1><p>${escapeHtml(error?.message || String(error))}</p></div></div>`;
  }
}
