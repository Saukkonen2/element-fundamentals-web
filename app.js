/*
 * Element Fundamentals: a página.
 * Quatro etapas sobre a mesma figura: o problema da mola, a malha, o resultado e a comparação pelo custo.
 * Os dados (data/) são as superfícies das malhas do Ansys, gravadas por prep/build.py; os textos vêm de i18n/.
 */
(() => {
  'use strict';

  const LANGS = [['pt', 'Português', 'pt-BR'], ['en', 'English', 'en'], ['es', 'Español', 'es'], ['it', 'Italiano', 'it']];
  const MESH = ['10', '3', '1'];
  const KEYS = ['HL', 'HQ', 'TL', 'TQ'];
  const SYMBOL = { HL: '□', HQ: '■', TL: '△', TQ: '▲' };
  const SOLID = { HL: 'SOLID185', HQ: 'SOLID186', TL: 'SOLID185', TQ: 'SOLID187' };
  const BANDS = ['#0000FF', '#00B2FF', '#00FFFF', '#00FFB2', '#00FF00', '#B2FF00', '#FFFF00', '#FFB200', '#FF0000'];
  const STRESS_SPAN = 54;
  const QR_LIBRARY = 'https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js';
  const QR_INTEGRITY = 'sha512-CNgIRecGo7nphbeZ04Sc13ka07paqdeTu0WR1IM4kNcpmBAUSHSQX0FslNhTDadL4O5SAGapGt4FodqL8My0mA==';
  const THEMES = {
    dark: { series: { HL: '#4A90E2', HQ: '#00805F', TL: '#C98500', TQ: '#D977A6' }, mesh: '#8A98A8', edge: '#10151C', ghost: '#8A98A8', force: '#EFC75B', ink: '#EDF2F7', muted: '#AAB8C8', grid: '#303B49', panel: '#10151C', bar: '#10151C' },
    light: { series: { HL: '#257DE0', HQ: '#00805F', TL: '#C98500', TQ: '#EE7FAC' }, mesh: '#C3CCD6', edge: '#26313D', ghost: '#7D8996', force: '#8A5A00', ink: '#17202B', muted: '#4F5D6D', grid: '#E3E7EC', panel: '#FFFFFF', bar: '#FFFFFF' }
  };
  const ICON = {
    info: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M12 11v6M12 7.2v.1"/></svg>',
    qr: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" aria-hidden="true"><path d="M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h3v3h-3zM20 14v6h-6"/></svg>',
    sun: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2"/></svg>',
    moon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" aria-hidden="true"><path d="M20 14.5A8.5 8.5 0 1 1 9.5 4a7 7 0 0 0 10.5 10.5z"/></svg>',
    globe: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3.5 3 14.5 0 18M12 3c-3 3.5-3 14.5 0 18"/></svg>',
    caret: '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg>',
    close: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M5 5l14 14M19 5L5 19"/></svg>',
    play: '<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7 4l13 8-13 8z"/></svg>',
    pause: '<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M6 4h4v16H6zM14 4h4v16h-4z"/></svg>',
    HL: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" aria-hidden="true"><path d="M4 8h11v11H4zM4 8l5-4h11l-5 4M20 4v11l-5 4"/><g fill="currentColor"><circle cx="4" cy="8" r="1.4"/><circle cx="15" cy="8" r="1.4"/><circle cx="4" cy="19" r="1.4"/><circle cx="15" cy="19" r="1.4"/><circle cx="20" cy="4" r="1.4"/></g></svg>',
    HQ: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" aria-hidden="true"><path d="M4 8h11v11H4zM4 8l5-4h11l-5 4M20 4v11l-5 4"/><g fill="currentColor"><circle cx="4" cy="8" r="1.4"/><circle cx="15" cy="8" r="1.4"/><circle cx="4" cy="19" r="1.4"/><circle cx="15" cy="19" r="1.4"/><circle cx="9.5" cy="8" r="1.4"/><circle cx="9.5" cy="19" r="1.4"/><circle cx="4" cy="13.5" r="1.4"/><circle cx="15" cy="13.5" r="1.4"/></g></svg>',
    TL: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" aria-hidden="true"><path d="M12 3L3 18l12 3zM12 3l9 12-6 6"/><g fill="currentColor"><circle cx="12" cy="3" r="1.4"/><circle cx="3" cy="18" r="1.4"/><circle cx="15" cy="21" r="1.4"/><circle cx="21" cy="15" r="1.4"/></g></svg>',
    TQ: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" aria-hidden="true"><path d="M12 3L3 18l12 3zM12 3l9 12-6 6"/><g fill="currentColor"><circle cx="12" cy="3" r="1.4"/><circle cx="3" cy="18" r="1.4"/><circle cx="15" cy="21" r="1.4"/><circle cx="21" cy="15" r="1.4"/><circle cx="7.5" cy="10.5" r="1.4"/><circle cx="9" cy="19.5" r="1.4"/><circle cx="13.5" cy="12" r="1.4"/><circle cx="16.5" cy="9" r="1.4"/><circle cx="18" cy="18" r="1.4"/></g></svg>'
  };

  // ---------------------------------------------------------------- estado
  const DEFAULTS = { stage: 3, el: 'HQ', mesh: 1, result: 'u', scale: 10, load: 100, measure: 'F', demo: 'Q4', ratio: 4, bend: 15 };
  const state = Object.assign({ playing: false, panel: null, langOpen: false, share: false, failed: '' }, DEFAULTS);
  const stored = (key) => { try { return localStorage.getItem('ef.' + key); } catch (e) { return null; } };
  const store = (key, value) => { try { localStorage.setItem('ef.' + key, value); } catch (e) { /* sem armazenamento */ } };
  state.theme = stored('theme') === 'light' ? 'light' : 'dark';
  const browser = (navigator.language || 'pt').slice(0, 2).toLowerCase();
  state.lang = LANGS.some((l) => l[0] === stored('lang')) ? stored('lang') : (LANGS.some((l) => l[0] === browser) ? browser : 'en');

  const catalogs = {};
  let study = null;
  const cache = {};
  const view = { yaw: -0.55, pitch: 0.3, zoom: 1 };
  const refs = {};
  let gl = null, glFailed = false, gpu = {}, attrs = null, uniforms = null, helper = null, wideOk = false;
  let points = [], countPoints = [], hovered = null, countHovered = null, frame = 0, pending = 0;

  // ---------------------------------------------------------------- textos e números
  function t(key, vars) {
    const table = catalogs[state.lang] || {};
    let text = key in table ? table[key] : (catalogs.pt && key in catalogs.pt ? catalogs.pt[key] : key);
    if (vars) Object.keys(vars).forEach((k) => { text = text.split('{' + k + '}').join(vars[k]); });
    return text;
  }
  const group = (n) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  const signed = (v, digits) => (v >= 0 ? '+' : '−') + Math.abs(v).toFixed(digits) + ' %';
  const name = (key) => t('element.' + key);
  const look = () => THEMES[state.theme];

  // ---------------------------------------------------------------- DOM
  function h(tag, attrs, ...kids) {
    const e = document.createElement(tag);
    if (attrs) Object.keys(attrs).forEach((k) => {
      const v = attrs[k];
      if (v === null || v === undefined || v === false) return;
      if (k.startsWith('on')) e.addEventListener(k.slice(2), v);
      else if (k === 'html') e.innerHTML = v;
      else if (k === 'style' && typeof v === 'object') Object.assign(e.style, v);
      else e.setAttribute(k, v === true ? '' : v);
    });
    kids.flat(Infinity).forEach((k) => { if (k !== null && k !== undefined && k !== false) e.append(k instanceof Node ? k : document.createTextNode(String(k))); });
    return e;
  }
  const svg = (markup) => { const box = document.createElement('span'); box.innerHTML = markup; box.style.display = 'contents'; return box; };
  const html = (tag, attrs, markup) => h(tag, Object.assign({}, attrs, { html: markup }));

  function set(changes, redraw) {
    Object.assign(state, changes);
    if (redraw === 'light') { light(); return; }
    render();
  }

  // ---------------------------------------------------------------- disposição
  function mode() {
    const w = window.innerWidth, ht = window.innerHeight;
    if (ht < 520 && w < 1100 && w > ht) return 'wide';
    return w < 700 ? 'tall' : 'desk';
  }

  // ---------------------------------------------------------------- dados
  function decode(buffer) {
    const bytes = new Uint8Array(buffer), data = new DataView(buffer), f = (o) => data.getFloat32(4 + o, true);
    const n = data.getUint32(4, true), nt = data.getUint32(8, true), ne = data.getUint32(12, true), wide = data.getUint32(16, true) === 4;
    const lo = [f(16), f(20), f(24)], hi = [f(28), f(32), f(36)], umax = f(40), vmax = f(44);
    let x = 0x5EED2026;
    for (let i = 52; i < bytes.length; i += 4) {
      x = (x ^ (x << 13)) >>> 0; x = (x ^ (x >>> 17)) >>> 0; x = (x ^ (x << 5)) >>> 0;
      bytes[i] ^= x & 255; bytes[i + 1] ^= (x >>> 8) & 255; bytes[i + 2] ^= (x >>> 16) & 255; bytes[i + 3] ^= x >>> 24;
    }
    let at = 52;
    const take = (Type, count) => { const out = new Type(buffer, at, count); at += Math.ceil(count * Type.BYTES_PER_ELEMENT / 4) * 4; return out; };
    const pos = take(Uint16Array, 3 * n), du = take(Int16Array, 3 * n), dv = take(Uint16Array, n);
    const Index = wide ? Uint32Array : Uint16Array;
    const tri = take(Index, 3 * nt), edge = take(Index, 2 * ne);
    const vertex = new Float32Array(7 * n);
    for (let i = 0; i < n; i++) {
      for (let d = 0; d < 3; d++) {
        vertex[7 * i + d] = lo[d] + (hi[d] - lo[d]) * pos[3 * i + d] / 65535;
        vertex[7 * i + 3 + d] = umax * du[3 * i + d] / 32767;
      }
      vertex[7 * i + 6] = vmax * dv[i] / 65535;
    }
    return { ready: true, vertex, tri, edge, wide };
  }

  function run(key, mesh) {
    const id = key + MESH[mesh];
    if (cache[id]) return cache[id].ready ? cache[id] : null;
    cache[id] = { ready: false };
    fetch('data/' + id + '.bin').then((r) => { if (!r.ok) throw new Error(r.status); return r.arrayBuffer(); })
      .then((buffer) => { cache[id] = decode(buffer); render(); })
      .catch(() => { cache[id] = { ready: false, failed: true }; state.failed = 'message.load_failed'; render(); });
    return null;
  }
  const sceneRun = () => (state.stage === 1 ? ['HQ', 1] : [state.el, state.mesh]);

  // ---------------------------------------------------------------- barra
  function renderBar() {
    const bar = document.getElementById('bar');
    const pills = [1, 2, 3, 4].map((n) => h('button', {
      type: 'button', class: 'pill' + (n === state.stage ? ' on' : '') + (n < state.stage ? ' done' : ''), 'aria-current': n === state.stage ? 'step' : null,
      'aria-label': n + ' ' + t('stage.' + n), onclick: () => go(n)
    }, h('span', { class: 'num' }, n), h('span', { class: 'name' }, t('stage.' + n))));
    const langButton = h('button', {
      type: 'button', class: 'tool lang-button', 'aria-haspopup': 'menu', 'aria-expanded': String(state.langOpen), 'aria-label': t('bar.language'),
      title: t('bar.language_tip'), onclick: (e) => { e.stopPropagation(); set({ langOpen: !state.langOpen }); }
    }, svg(ICON.globe), state.lang.toUpperCase(), svg(ICON.caret));
    const menu = state.langOpen ? h('div', { class: 'lang-menu', role: 'menu', 'aria-label': t('bar.language') },
      LANGS.map((l) => h('button', {
        type: 'button', class: 'lang-item', role: 'menuitemradio', 'aria-checked': String(l[0] === state.lang), lang: l[2],
        onclick: () => chooseLanguage(l[0])
      }, h('b', null, l[0].toUpperCase()), l[1]))) : null;
    bar.replaceChildren(
      h('span', { class: 'mark', 'aria-hidden': 'true' }),
      h('strong', { class: 'brand' }, 'Element Fundamentals'),
      h('span', { class: 'case' }, t('case.name')),
      h('nav', { class: 'steps', 'aria-label': t('bar.stages') }, pills),
      h('button', { type: 'button', class: 'tool', 'aria-label': t('bar.share'), title: t('bar.share_tip'), onclick: () => openShare() }, svg(ICON.qr)),
      h('button', {
        type: 'button', class: 'tool', role: 'switch', 'aria-checked': String(state.theme === 'dark'), 'aria-label': t('bar.dark'), title: t('bar.theme_tip'),
        onclick: () => { const theme = state.theme === 'dark' ? 'light' : 'dark'; store('theme', theme); set({ theme }); }
      }, svg(ICON.sun), h('span', { class: 'switch-track', 'aria-hidden': 'true' }, h('span', { class: 'switch-knob' })), svg(ICON.moon)),
      h('span', { class: 'lang' }, langButton, menu)
    );
  }

  function chooseLanguage(code) {
    store('lang', code);
    loadCatalog(code).then(() => set({ lang: code, langOpen: false }));
  }

  // ---------------------------------------------------------------- coluna
  function option(on, label, pick, attrs) {
    return h('button', Object.assign({ type: 'button', class: 'opt', 'aria-pressed': String(on), onclick: pick }, attrs || {}), label);
  }

  function renderColumn() {
    const column = document.getElementById('column'), s = state, stage = s.stage;
    const record = study.cases[s.el][s.mesh], ref = study.ref, isRef = s.el === 'TQ' && s.mesh === 2;
    const kids = [];
    kids.push(h('div', { class: 'title-row' }, h('h1', null, t('stage_title.' + stage)), infoButton('desk')));
    kids.push(h('section', { class: 'card' }, h('div', { class: 'card-title' }, t('problem.title')),
      h('div', { class: 'facts' },
        ['wire', 'coils', 'material', 'supports'].map((k) => [h('span', { class: 'muted' }, t('problem.' + k)), html('span', { class: 'serif' }, t('problem.' + k + '_value'))]),
        h('span', { class: 'muted', title: t('problem.reference_tip') }, t('problem.reference')),
        html('span', { class: 'serif' }, '<i>F</i> = ' + ref.F.toFixed(2) + ' N, <i>σ</i> = ' + ref.s.toFixed(1) + ' MPa'))));
    if (stage !== 1) {
      const element = (key) => h('button', {
        type: 'button', class: 'opt', 'aria-pressed': String(s.el === key), title: t('element_tip.' + key), onclick: () => set({ el: key })
      }, svg(ICON[key]), SOLID[key]);
      kids.push(h('div', { class: 'matrix' },
        h('span', { class: 'label' }, t('matrix.element')), h('span', { class: 'head' }, t('matrix.linear')), h('span', { class: 'head' }, t('matrix.quadratic')),
        h('span', { class: 'row' }, t('matrix.hexahedron')), element('HL'), element('HQ'),
        h('span', { class: 'row' }, t('matrix.tetrahedron')), element('TL'), element('TQ')));
      kids.push(h('div', { style: { display: 'flex', flexDirection: 'column', gap: '5px' } },
        h('span', { class: 'label', title: t('mesh.tip') }, t('mesh.label')),
        h('div', { class: 'seg' }, MESH.map((m, i) => option(s.mesh === i, m + ' mm', () => set({ mesh: i }))))));
    }
    if (stage === 2) {
      kids.push(h('section', { class: 'card stats' },
        h('span', { class: 'muted' }, t('stats.elements')), h('strong', null, group(record.elements)),
        h('span', { class: 'muted' }, t('stats.nodes')), h('strong', null, group(record.nodes)),
        h('span', { class: 'muted', title: t('stats.dof_tip') }, t('stats.dof')), h('strong', null, group(record.dof))));
      const sec = sectionView(record, s.el);
      kids.push(h('section', { class: 'card section-card' },
        html('span', { role: 'img', 'aria-label': t('section.aria') }, '<svg viewBox="-34 -34 68 68" width="96" height="96"><circle cx="0" cy="0" r="25" fill="none" stroke="currentColor" stroke-width="1.2" stroke-dasharray="3 2"/><path d="' + sec.path + '" fill="' + sec.color + '" fill-opacity="0.25" stroke="' + sec.color + '" stroke-width="2" stroke-linejoin="round"/><path d="' + sec.dots + '" fill="currentColor"/></svg>'),
        h('span', { style: { display: 'flex', flexDirection: 'column', gap: '2px' } },
          h('span', { class: 'muted', title: t('section.tip') }, t('section.label')), h('strong', null, (100 * record.area).toFixed(1) + ' %'),
          h('span', { class: 'muted', style: { fontSize: '12px' } }, t('section.of_real')))));
    }
    if (stage === 3) {
      kids.push(h('div', { class: 'seg' }, option(s.result === 'u', t('result.uy'), () => set({ result: 'u' })), option(s.result === 's', t('result.vm'), () => set({ result: 's' }))));
      refs.scaleOut = h('output', null, '×' + s.scale);
      refs.loadOut = h('output', null, (s.load / 100).toFixed(2) + ' mm');
      refs.loadInput = h('input', { type: 'range', min: 0, max: 100, value: s.load, 'aria-label': t('result.top'), oninput: (e) => { cancelAnimationFrame(frame); state.playing = false; set({ load: Number(e.target.value) }, 'light'); refs.play.replaceChildren(svg(ICON.play), t('result.play')); } });
      kids.push(h('label', { class: 'slider', title: t('result.scale_tip') }, t('result.scale'),
        h('input', { type: 'range', min: 0, max: 40, value: s.scale, oninput: (e) => set({ scale: Number(e.target.value) }, 'light') }), refs.scaleOut));
      kids.push(h('label', { class: 'slider', title: t('result.top_tip') }, t('result.top'), refs.loadInput, refs.loadOut));
      refs.play = h('button', { type: 'button', class: 'outline', 'aria-pressed': String(s.playing), onclick: () => play(!state.playing) }, svg(s.playing ? ICON.pause : ICON.play), t(s.playing ? 'result.pause' : 'result.play'));
      kids.push(refs.play);
      kids.push(h('section', { class: 'card results', title: t('result.values_tip') },
        h('span', { class: 'muted' }, t('result.force')), h('strong', null, record.F.toFixed(2) + ' N'), h('span', { class: 'error' }, isRef ? t('common.ref') : signed((record.F / ref.F - 1) * 100, 2)),
        h('span', { class: 'muted', title: t('result.stress_tip') }, t('result.stress')), h('strong', null, record.s.toFixed(1) + ' MPa'), h('span', { class: 'error' }, isRef ? t('common.ref') : signed((record.s / ref.s - 1) * 100, 2))));
    }
    if (stage === 4) {
      kids.push(h('div', { style: { display: 'flex', flexDirection: 'column', gap: '5px' } }, h('span', { class: 'label' }, t('compare.measure')),
        h('div', { class: 'seg' }, option(s.measure === 'F', t('compare.force'), () => set({ measure: 'F' })), option(s.measure === 's', t('compare.stress'), () => set({ measure: 's' })))));
    }
    kids.push(h('div', { class: 'foot' },
      h('button', { type: 'button', class: 'primary', onclick: () => go(stage % 4 + 1) }, t('next.' + stage)),
      h('button', { type: 'button', class: 'link', onclick: restore }, t('common.restore'))));
    column.replaceChildren(...kids);
  }

  function infoButton(where) {
    const m = mode();
    if ((where === 'desk') !== (m === 'desk')) return null;
    return h('button', { type: 'button', class: 'info', 'aria-label': t('info.open'), title: t('info.open'), onclick: () => set({ panel: ['done', 'done', 'spring', 'stiffness'][state.stage - 1] }) }, svg(ICON.info));
  }

  function sectionView(record, key) {
    const p = record.section.map((q) => [q[0] * 10, -q[1] * 10]), m = p.length;
    let path = '', dots = '';
    if (record.quad) {
      path = 'M' + p[0][0].toFixed(2) + ' ' + p[0][1].toFixed(2);
      for (let j = 0; j < m; j += 2) {
        const a = p[j], mid = p[(j + 1) % m], b = p[(j + 2) % m];
        path += 'Q' + (2 * mid[0] - (a[0] + b[0]) / 2).toFixed(2) + ' ' + (2 * mid[1] - (a[1] + b[1]) / 2).toFixed(2) + ' ' + b[0].toFixed(2) + ' ' + b[1].toFixed(2);
      }
    } else path = 'M' + p.map((q) => q[0].toFixed(2) + ' ' + q[1].toFixed(2)).join('L');
    p.forEach((q) => { dots += 'M' + (q[0] - 1.6).toFixed(2) + ' ' + q[1].toFixed(2) + 'a1.6 1.6 0 1 0 3.2 0a1.6 1.6 0 1 0 -3.2 0'; });
    return { path: path + 'Z', dots, color: look().series[key] };
  }

  // ---------------------------------------------------------------- figura
  function renderFigure() {
    const figure = document.getElementById('figure'), s = state, stage = s.stage, mesh = MESH[s.mesh] + ' mm';
    const title = stage === 1 ? t('figure.1') : stage === 2 ? t('figure.2', { element: name(s.el), mesh }) : stage === 3 ? t('figure.3', { field: t(s.result === 'u' ? 'field.uy' : 'field.vm'), element: name(s.el), mesh }) : t('figure.4');
    const head = h('div', { class: 'figure-head' }, h('div', { class: 'title-row', style: { minWidth: 0 } }, h('h2', null, title), infoButton('narrow')),
      stage !== 4 ? h('button', { type: 'button', class: 'quiet', onclick: () => { view.yaw = -0.55; view.pitch = 0.3; view.zoom = 1; schedule(); } }, t('common.recenter')) : null);
    const kids = [head];
    if (stage === 4) kids.push(h('div', { class: 'legend-row' }, KEYS.map((k) => h('span', null, h('span', { class: 'swatch' + (k[1] === 'L' ? ' dash' : ''), style: { borderTopColor: look().series[k] } }), SYMBOL[k] + ' ' + SOLID[k] + ' · ' + name(k)))));
    refs.scene.style.display = stage === 4 ? 'none' : 'block';
    refs.chart.style.display = stage === 4 ? 'block' : 'none';
    refs.scene.setAttribute('aria-label', t('aria.scene'));
    refs.chart.setAttribute('aria-label', t('aria.chart'));
    const which = sceneRun();
    const loading = stage !== 4 && !run(which[0], which[1]);
    const message = state.failed ? t(state.failed) : loading ? t('message.loading') : '';
    refs.status.textContent = message;
    refs.status.hidden = !message;
    kids.push(refs.view);
    if (stage === 2) { refs.counts.setAttribute('aria-label', t('aria.counts')); kids.push(refs.countsBox); }
    if (stage === 3) {
      const ticks = Array.from({ length: 10 }, (q, i) => (i === 9 ? '≥ ' : '') + (s.result === 'u' ? (i / 9).toFixed(2) : String(i * STRESS_SPAN / 9)));
      const shown = mode() === 'desk' ? ticks : ticks.filter((q, i) => i % 3 === 0);
      refs.caption = h('div', { class: 'caption' }, t('result.caption', { mm: (s.load / 100).toFixed(2), scale: s.scale }));
      kids.push(h('div', { class: 'colorbar' },
        h('div', { class: 'bands', 'aria-hidden': 'true' }, BANDS.map((c) => h('span', { style: { background: c } }))),
        h('div', { class: 'ticks' }, shown.map((q) => h('span', null, q))), refs.caption));
    }
    if (stage === 4) {
      const ref = study.ref[s.measure];
      const rows = KEYS.map((k) => [h('strong', null, SYMBOL[k] + ' ' + name(k)), study.cases[k].map((rec, i) => h('span', null, k === 'TQ' && i === 2 ? t('common.ref') : signed((rec[s.measure] / ref - 1) * 100, 2)))]);
      kids.push(h('div', { class: 'table-wrap' }, h('div', { class: 'table' },
        h('span', { class: 'muted' }, t(s.measure === 'F' ? 'compare.table_force' : 'compare.table_stress')), MESH.map((m) => h('span', { class: 'muted' }, m + ' mm')), rows)));
    }
    figure.replaceChildren(...kids);
  }

  function light() {
    if (refs.scaleOut) refs.scaleOut.textContent = '×' + state.scale;
    if (refs.loadOut) refs.loadOut.textContent = (state.load / 100).toFixed(2) + ' mm';
    if (refs.loadInput && document.activeElement !== refs.loadInput) refs.loadInput.value = state.load;
    if (refs.caption) refs.caption.textContent = t('result.caption', { mm: (state.load / 100).toFixed(2), scale: state.scale });
    schedule();
  }

  // ---------------------------------------------------------------- explicação
  function renderPanel() {
    const panel = document.getElementById('panel'), s = state;
    panel.hidden = !s.panel;
    if (!s.panel) { panel.replaceChildren(); return; }
    panel.setAttribute('aria-label', t('info.open'));
    const tab = (key) => option(s.panel === key, t('info.tab_' + key), () => set({ panel: key }));
    const body = h('div', { class: 'panel-body' });
    if (s.panel === 'done') body.append(...panelDone());
    if (s.panel === 'spring') body.append(...panelSpring());
    if (s.panel === 'stiffness') body.append(...panelStiffness());
    const scroll = panel.querySelector('.panel-body');
    const top = scroll ? scroll.scrollTop : 0;
    panel.replaceChildren(h('div', { class: 'panel-head' }, h('div', { class: 'seg' }, tab('done'), tab('spring'), tab('stiffness')),
      h('button', { type: 'button', class: 'close', 'aria-label': t('info.close'), onclick: () => set({ panel: null }) }, svg(ICON.close))), body);
    if (scroll && scroll.dataset.tab === s.panel) body.scrollTop = top;
    body.dataset.tab = s.panel;
  }

  function springPath() {
    let path = '';
    for (let i = 0; i <= 400; i++) { const u = i / 400; path += (i ? 'L' : 'M') + (15 * Math.cos(20 * Math.PI * u)).toFixed(2) + ' ' + (100 - 100 * u).toFixed(2); }
    return path;
  }

  function panelDone() {
    return [
      html('div', { role: 'img', 'aria-label': t('done.aria') }, '<svg viewBox="-30 -16 60 128" width="100%" height="190"><path d="' + springPath() + '" fill="none" stroke="currentColor" stroke-opacity="0.6" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/><path d="M5 103H25M9 103l-3 4M14 103l-3 4M19 103l-3 4M24 103l-3 4M15 -3V-13M12 -9l3 -4 3 4" fill="none" stroke="' + look().force + '" stroke-width="1.4"/></svg>'),
      h('div', { class: 'kv' }, ['spring', 'material', 'supports', 'solution', 'meshes', 'hexahedra', 'tetrahedra', 'measures', 'reference'].map((k) => [h('span', { class: 'muted' }, t('done.' + k)), h('span', null, t('done.' + k + '_value'))])),
      h('span', { class: 'note' }, t('done.note'))
    ];
  }

  function panelSpring() {
    const E = 200000, nu = 0.3, d = 5, D = 30, n = 10, ref = study.ref.F;
    const G = E / (2 * (1 + nu)), k = G * Math.pow(d, 4) / (8 * Math.pow(D, 3) * n), C = D / d;
    const Kw = (4 * C - 1) / (4 * C - 4) + 0.615 / C, tau = Kw * 8 * k * D / (Math.PI * Math.pow(d, 3));
    let shear = '';
    [-40, -30, -20, -10, 10, 20, 30, 40].forEach((x) => { const tip = -0.75 * x, back = x > 0 ? 4 : -4; shear += 'M' + x + ' 0V' + tip + 'M' + (x - 3) + ' ' + (tip + back) + 'L' + x + ' ' + tip + 'L' + (x + 3) + ' ' + (tip + back); });
    const rows = [
      ['torque', '<i>T</i> = <i>F D</i> / 2'],
      ['shear_modulus', '<i>G</i> = <i>E</i> / [2(1 + <i>ν</i>)] = ' + (G / 1000).toFixed(1) + ' GPa'],
      ['stiffness', '<i>k</i> = <i>G d</i><sup>4</sup> / (8 <i>D</i><sup>3</sup> <i>n</i>) = ' + k.toFixed(2) + ' N/mm'],
      ['force', '<i>F</i> = <i>k δ</i> = ' + k.toFixed(2) + ' N (<i>δ</i> = 1 mm)'],
      ['fine', '<i>F</i> = ' + ref.toFixed(2) + ' N (' + signed((ref / k - 1) * 100, 1) + ')'],
      ['stress', '<i>τ</i> = <i>K<sub>w</sub></i> 8<i>FD</i> / (π<i>d</i><sup>3</sup>) = ' + tau.toFixed(1) + ' MPa, <i>K<sub>w</sub></i> = ' + Kw.toFixed(4)],
      ['von_mises', '<i>σ</i> = √3 <i>τ</i> = ' + (Math.sqrt(3) * tau).toFixed(1) + ' MPa']
    ];
    return [
      html('div', { role: 'img', 'aria-label': t('spring.aria') }, '<svg viewBox="-56 -46 112 92" width="100%" height="170"><circle cx="0" cy="0" r="40" fill="none" stroke="currentColor" stroke-opacity="0.6"/><path d="M-40 0H40" stroke="currentColor" stroke-opacity="0.6" stroke-width="0.8"/><path d="M-40 30L40 -30" fill="none" stroke="#DE1423" stroke-width="0.8" stroke-dasharray="3 3"/><path d="' + shear + '" fill="none" stroke="#DE1423" stroke-width="1.6"/></svg>'),
      h('span', null, t('spring.text')),
      h('div', { class: 'kv formulas' }, rows.map((r) => [h('span', { class: 'muted' }, t('spring.' + r[0])), html('span', { class: 'serif' }, r[1])])),
      h('span', { class: 'note' }, t('spring.note'))
    ];
  }

  function panelStiffness() {
    const s = state, ref = study.ref.F;
    const table = KEYS.map((k) => [h('strong', null, SYMBOL[k] + ' ' + name(k)), study.cases[k].map((rec, i) => h('span', null,
      h('b', null, k === 'TQ' && i === 2 ? t('common.ref') : signed((rec.F / ref - 1) * 100, Math.abs(rec.F / ref - 1) < 0.001 ? 2 : 1)), h('br'),
      h('small', null, t('stiffness.section', { area: (100 * rec.area).toFixed(0) }))))]);
    const colors = { Q4: 'HL', Q8: 'HQ', T3: 'TL', T6: 'TQ' };
    const demoBox = h('div', { role: 'img', 'aria-label': t('stiffness.demo_aria') }), barsBox = h('div', { class: 'bars' });
    const fill = () => {
      const demo = demoView();
      demoBox.innerHTML = '<svg class="demo" viewBox="-165 -85 330 170"><path d="' + demo.ghost + '" fill="none" stroke="currentColor" stroke-opacity="0.45"/><path d="' + demo.elem + '" fill="' + demo.color + '" fill-opacity="0.18" stroke="' + demo.color + '" stroke-width="2.5" stroke-linejoin="round"/><path d="' + demo.exact + '" fill="none" stroke="currentColor" stroke-width="1.5" stroke-dasharray="5 4"/><path d="' + demo.nodes + '" fill="currentColor"/></svg>';
      const values = ['Q4', 'Q8', 'T3', 'T6'].map((q) => elementRatio(q, state.ratio, 0.3)), top = Math.max(...values);
      barsBox.replaceChildren(...['Q4', 'Q8', 'T3', 'T6'].flatMap((q, i) => [h('span', null, name(colors[q])),
        h('span', { class: 'bar-track' }, h('span', { class: 'bar-fill', style: { width: (values[i] / top * 100).toFixed(1) + '%', background: look().series[colors[q]] } })),
        h('b', { style: { textAlign: 'right' } }, '× ' + values[i].toFixed(2))]));
    };
    fill();
    const slider = (label, min, max, step, key, show) => {
      const out = h('output', null, show(state[key]));
      return h('label', { class: 'slider' }, label,
        h('input', { type: 'range', min, max, step, value: state[key], oninput: (e) => { state[key] = Number(e.target.value); out.textContent = show(state[key]); fill(); } }), out);
    };
    return [
      h('h3', null, t('stiffness.results')),
      h('span', { class: 'note' }, t('stiffness.results_note')),
      h('div', { class: 'errors' }, h('span'), MESH.map((m) => h('span', { class: 'muted' }, m + ' mm')), table),
      h('div', { class: 'points' }, ['geometry', 'element', 'numbers'].map((k) => html('span', null, '<b>' + t('stiffness.' + k + '_title') + '</b> ' + t('stiffness.' + k)))),
      h('h3', null, t('stiffness.demo')),
      h('div', { class: 'seg', style: { gridAutoFlow: 'row', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))' } },
        ['Q4', 'Q8', 'T3', 'T6'].map((q) => option(s.demo === q, SYMBOL[colors[q]] + ' ' + name(colors[q]), () => set({ demo: q })))),
      demoBox,
      h('span', { class: 'note' }, t('stiffness.demo_caption')),
      slider(t('stiffness.ratio'), 1, 8, 0.5, 'ratio', String),
      slider(t('stiffness.bend'), 5, 30, 1, 'bend', (v) => v + '°'),
      h('span', null, t('stiffness.energy')),
      barsBox,
      html('span', { class: 'serif' }, t('stiffness.formula')),
      h('span', { class: 'note' }, t('stiffness.note'))
    ];
  }

  // Energia de um elemento plano (estado plano de tensão) que tenta seguir a flexão pura exata, sobre a energia exata.
  function elementRatio(type, r, nu) {
    const quad = type[0] === 'Q', high = type === 'Q8' || type === 'T6';
    const exact = (x, y) => [-x * y, (x * x + nu * y * y) / 2];
    const corner = [[-r / 2, -0.5], [r / 2, -0.5], [r / 2, 0.5], [-r / 2, 0.5]];
    const energy = (dN, u) => {
      let ex = 0, ey = 0, g = 0;
      dN.forEach((d, i) => { ex += d[0] * u[i][0]; ey += d[1] * u[i][1]; g += d[1] * u[i][0] + d[0] * u[i][1]; });
      return 0.5 * ((ex * ex + ey * ey + 2 * nu * ex * ey) / (1 - nu * nu) + g * g / (2 * (1 + nu)));
    };
    let total = 0;
    if (quad) {
      const nodes = [[-1, -1], [1, -1], [1, 1], [-1, 1]].concat(high ? [[0, -1], [1, 0], [0, 1], [-1, 0]] : []);
      const u = nodes.map((p) => exact(p[0] * r / 2, p[1] / 2));
      const gauss = [[-Math.sqrt(0.6), 5 / 9], [0, 8 / 9], [Math.sqrt(0.6), 5 / 9]];
      gauss.forEach((a) => gauss.forEach((b) => {
        const s = a[0], q = b[0];
        const dN = nodes.map((p, i) => {
          const m = p[0], n = p[1];
          let ds, dt;
          if (!high) { ds = m * (1 + n * q) / 4; dt = n * (1 + m * s) / 4; }
          else if (i < 4) { ds = m * (1 + n * q) * (2 * m * s + n * q) / 4; dt = n * (1 + m * s) * (m * s + 2 * n * q) / 4; }
          else if (m === 0) { ds = -s * (1 + n * q); dt = n * (1 - s * s) / 2; }
          else { ds = m * (1 - q * q) / 2; dt = -q * (1 + m * s); }
          return [ds * 2 / r, dt * 2];
        });
        total += a[1] * b[1] * (r / 4) * energy(dN, u);
      }));
    } else {
      [[0, 1, 2], [0, 2, 3]].forEach((tri) => {
        const P = tri.map((i) => corner[i]);
        const twice = (P[1][0] - P[0][0]) * (P[2][1] - P[0][1]) - (P[2][0] - P[0][0]) * (P[1][1] - P[0][1]);
        const grad = [0, 1, 2].map((i) => { const j = (i + 1) % 3, k = (i + 2) % 3; return [(P[j][1] - P[k][1]) / twice, (P[k][0] - P[j][0]) / twice]; });
        const pairs = [[0, 1], [1, 2], [2, 0]];
        const nodes = high ? P.concat(pairs.map((q) => [(P[q[0]][0] + P[q[1]][0]) / 2, (P[q[0]][1] + P[q[1]][1]) / 2])) : P;
        const u = nodes.map((p) => exact(p[0], p[1]));
        [[0.5, 0.5, 0], [0, 0.5, 0.5], [0.5, 0, 0.5]].forEach((L) => {
          const dN = !high ? grad : grad.map((d, i) => d.map((c) => (4 * L[i] - 1) * c)).concat(pairs.map((q) => [0, 1].map((c) => 4 * (L[q[0]] * grad[q[1]][c] + L[q[1]] * grad[q[0]][c]))));
          total += Math.abs(twice) / 6 * energy(dN, u);
        });
      });
    }
    return total / (r / 24);
  }

  function demoView() {
    const s = state, nu = 0.3, r = s.ratio, type = s.demo, high = type === 'Q8' || type === 'T6', quad = type[0] === 'Q';
    const kappa = 2 * (s.bend * Math.PI / 180) / r;
    const exact = (x, y) => [-kappa * x * y, kappa * (x * x + nu * y * y) / 2];
    const scale = Math.min(270 / r, 90), lift = kappa * r * r / 16;
    const place = (p, u) => ((p[0] + u[0]) * scale).toFixed(2) + ' ' + (-(p[1] + u[1] - lift) * scale).toFixed(2);
    const corner = [[-r / 2, -0.5], [r / 2, -0.5], [r / 2, 0.5], [-r / 2, 0.5]];
    const edges = [[0, 1], [1, 2], [2, 3], [3, 0]].concat(quad ? [] : [[0, 2]]).map((e) => [corner[e[0]], corner[e[1]]]);
    const middle = (e) => [(e[0][0] + e[1][0]) / 2, (e[0][1] + e[1][1]) / 2];
    const trace = (e, kind) => {
      const A = e[0], B = e[1], a = exact(A[0], A[1]), b = exact(B[0], B[1]), M = middle(e), m = exact(M[0], M[1]), out = [];
      for (let i = 0; i <= 24; i++) {
        const q = i / 24, p = [A[0] + (B[0] - A[0]) * q, A[1] + (B[1] - A[1]) * q];
        let u = [0, 0];
        if (kind === 'exact') u = exact(p[0], p[1]);
        if (kind === 'elem') u = [0, 1].map((c) => high ? (2 * q * q - 3 * q + 1) * a[c] + (4 * q - 4 * q * q) * m[c] + (2 * q * q - q) * b[c] : (1 - q) * a[c] + q * b[c]);
        out.push(place(p, u));
      }
      return out;
    };
    const outline = (kind) => 'M' + edges.slice(0, 4).map((e) => trace(e, kind).slice(0, 24).join('L')).join('L') + 'Z' + edges.slice(4).map((e) => 'M' + trace(e, kind).join('L')).join('');
    const nodes = corner.concat(high ? edges.slice(0, quad ? 4 : 5).map(middle) : []).map((p) => 'M' + place(p, exact(p[0], p[1])) + 'm-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0').join('');
    const key = { Q4: 'HL', Q8: 'HQ', T3: 'TL', T6: 'TQ' }[type];
    return { ghost: outline('flat'), exact: outline('exact'), elem: outline('elem'), nodes, color: look().series[key] };
  }

  // ---------------------------------------------------------------- QR code
  let qrLoading = null;
  function qrLibrary() {
    if (window.QRCode) return Promise.resolve();
    if (!qrLoading) qrLoading = new Promise((resolve, reject) => {
      const script = h('script', { src: QR_LIBRARY, integrity: QR_INTEGRITY, crossorigin: 'anonymous', referrerpolicy: 'no-referrer' });
      script.onload = resolve;
      script.onerror = () => { qrLoading = null; reject(new Error('QR')); };
      document.head.append(script);
    });
    return qrLoading;
  }
  function openShare() { set({ share: true }); }
  function renderShare() {
    const box = document.getElementById('share');
    box.hidden = !state.share;
    if (!state.share) { box.replaceChildren(); return; }
    const address = window.location.href.split('#')[0];
    const code = h('div', { class: 'qr', role: 'img', 'aria-label': t('share.qr_aria') });
    const copy = h('button', { type: 'button', class: 'quiet', onclick: () => { if (navigator.clipboard) navigator.clipboard.writeText(address).then(() => { copy.textContent = t('share.copied'); }, () => {}); } }, t('share.copy'));
    box.replaceChildren(h('div', { class: 'share-card', role: 'dialog', 'aria-modal': 'true', 'aria-label': t('share.title') },
      h('h2', null, t('share.title')), h('p', null, t('share.lead')), code, h('p', { class: 'address' }, address),
      h('div', { class: 'share-row' }, copy, h('button', { type: 'button', class: 'primary', style: { flex: '0 0 auto', padding: '0 24px', fontSize: '14px' }, onclick: () => set({ share: false }) }, t('share.close')))));
    qrLibrary().then(() => { code.replaceChildren(); new window.QRCode(code, { text: address, width: 208, height: 208, colorDark: '#10151C', colorLight: '#FFFFFF', correctLevel: window.QRCode.CorrectLevel.M }); },
      () => { code.textContent = t('share.failed'); });
  }

  // ---------------------------------------------------------------- 3D
  function setupGl(context) {
    const deriv = !!context.getExtension('OES_standard_derivatives');
    wideOk = !!context.getExtension('OES_element_index_uint');
    const compile = (type, source) => { const sh = context.createShader(type); context.shaderSource(sh, source); context.compileShader(sh); return sh; };
    const program = context.createProgram();
    context.attachShader(program, compile(context.VERTEX_SHADER, 'attribute vec3 p;attribute vec3 d;attribute float v;uniform mat4 m;uniform float factor;uniform float share;uniform float mode;uniform float span;varying float vt;varying vec3 wp;void main(){vec3 q=p+factor*d;wp=q;vt=mode<0.5?share*d.y/span:share*v/span;gl_Position=m*vec4(q,1.0);}'));
    context.attachShader(program, compile(context.FRAGMENT_SHADER, (deriv ? '#extension GL_OES_standard_derivatives : enable\n' : '') + '#ifdef GL_FRAGMENT_PRECISION_HIGH\nprecision highp float;\n#else\nprecision mediump float;\n#endif\nvarying float vt;varying vec3 wp;uniform sampler2D bands;uniform float contour;uniform vec3 color;uniform vec3 eye;uniform float low;void main(){vec3 c=color;if(contour>0.5){float b=floor(clamp(vt,0.0,0.999)*9.0);c=texture2D(bands,vec2((b+0.5)/9.0,0.5)).rgb;}float s=1.0;' + (deriv ? 'if(low<0.99){vec3 n=normalize(cross(dFdx(wp),dFdy(wp)));s=low+(1.0-low)*abs(dot(n,eye));}' : '') + 'gl_FragColor=vec4(c*s,1.0);}'));
    context.linkProgram(program);
    if (!context.getProgramParameter(program, context.LINK_STATUS)) return false;
    context.useProgram(program);
    attrs = ['p', 'd', 'v'].map((n) => { const at = context.getAttribLocation(program, n); context.enableVertexAttribArray(at); return at; });
    const colors = new Uint8Array(BANDS.flatMap((c) => [1, 3, 5].map((i) => parseInt(c.slice(i, i + 2), 16))));
    context.bindTexture(context.TEXTURE_2D, context.createTexture());
    context.pixelStorei(context.UNPACK_ALIGNMENT, 1);
    context.texImage2D(context.TEXTURE_2D, 0, context.RGB, 9, 1, 0, context.RGB, context.UNSIGNED_BYTE, colors);
    [[context.TEXTURE_MIN_FILTER, context.NEAREST], [context.TEXTURE_MAG_FILTER, context.NEAREST], [context.TEXTURE_WRAP_S, context.CLAMP_TO_EDGE], [context.TEXTURE_WRAP_T, context.CLAMP_TO_EDGE]].forEach((q) => context.texParameteri(context.TEXTURE_2D, q[0], q[1]));
    uniforms = {};
    ['m', 'factor', 'share', 'mode', 'span', 'contour', 'color', 'eye', 'low'].forEach((n) => { uniforms[n] = context.getUniformLocation(program, n); });
    helper = context.createBuffer();
    gpu = {};
    return true;
  }
  const rgb = (hex) => [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255);
  function bindVertices(buffer) {
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.vertexAttribPointer(attrs[0], 3, gl.FLOAT, false, 28, 0);
    gl.vertexAttribPointer(attrs[1], 3, gl.FLOAT, false, 28, 12);
    gl.vertexAttribPointer(attrs[2], 1, gl.FLOAT, false, 28, 24);
  }
  function upload(id, data) {
    if (gpu[id]) return gpu[id];
    const make = (target, array) => { const b = gl.createBuffer(); gl.bindBuffer(target, b); gl.bufferData(target, array, gl.STATIC_DRAW); return b; };
    gpu[id] = { vertex: make(gl.ARRAY_BUFFER, data.vertex), tri: make(gl.ELEMENT_ARRAY_BUFFER, data.tri), edge: make(gl.ELEMENT_ARRAY_BUFFER, data.edge), nt: data.tri.length, ne: data.edge.length, type: data.wide ? gl.UNSIGNED_INT : gl.UNSIGNED_SHORT };
    return gpu[id];
  }
  function size(cv) {
    const w = cv.clientWidth, ht = cv.clientHeight, ratio = window.devicePixelRatio || 1;
    if (cv.width !== Math.round(w * ratio) || cv.height !== Math.round(ht * ratio)) { cv.width = Math.round(w * ratio); cv.height = Math.round(ht * ratio); }
    return { w, h: ht, ratio };
  }
  function fail(key) { if (state.failed !== key) { state.failed = key; render(); } }

  function drawScene() {
    const cv = refs.scene;
    if (!cv.clientWidth || glFailed) return;
    if (!gl) {
      const context = cv.getContext('webgl', { antialias: true, alpha: true });
      if (!context || !setupGl(context)) { glFailed = true; fail('message.webgl'); return; }
      gl = context;
    }
    const s = state, colors = look(), box = size(cv);
    const which = sceneRun(), data = run(which[0], which[1]);
    gl.viewport(0, 0, cv.width, cv.height);
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    if (!data) return;
    if (data.wide && !wideOk) { fail('message.too_big'); return; }
    const g = upload(which.join('-'), data);
    const third = s.stage === 3, factor = third ? s.scale * s.load / 100 : 0, share = third ? s.load / 100 : 1;
    const cy = Math.cos(view.yaw), sy = Math.sin(view.yaw), cp = Math.cos(view.pitch), sp = Math.sin(view.pitch);
    const r = [[cy, 0, sy], [sp * sy, cp, -sp * cy], [-cp * sy, sp, cp * cy]];
    const k = view.zoom * Math.min(box.w / 52, box.h / 136);
    const scale = [2 * k / box.w, 2 * k / box.h, -1 / 400], center = [0, 56 + factor / 2, 0];
    const matrix = [];
    for (let j = 0; j < 3; j++) matrix.push(scale[0] * r[0][j], scale[1] * r[1][j], scale[2] * r[2][j], 0);
    for (let i = 0; i < 3; i++) matrix.push(-scale[i] * (r[i][0] * center[0] + r[i][1] * center[1] + r[i][2] * center[2]));
    matrix.push(1);
    const u = uniforms;
    gl.enable(gl.DEPTH_TEST);
    gl.uniformMatrix4fv(u.m, false, new Float32Array(matrix));
    gl.uniform1f(u.factor, factor);
    gl.uniform1f(u.share, share);
    gl.uniform1f(u.mode, s.result === 'u' ? 0 : 1);
    gl.uniform1f(u.span, s.result === 'u' ? 1 : STRESS_SPAN);
    gl.uniform3fv(u.eye, r[2]);
    const style = (color, contour, low) => { gl.uniform3fv(u.color, rgb(color)); gl.uniform1f(u.contour, contour ? 1 : 0); gl.uniform1f(u.low, low); };
    bindVertices(g.vertex);
    gl.enable(gl.POLYGON_OFFSET_FILL);
    gl.polygonOffset(1, 1);
    style(colors.mesh, third, third ? 0.78 : 0.5);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, g.tri);
    gl.drawElements(gl.TRIANGLES, g.nt, g.type, 0);
    gl.disable(gl.POLYGON_OFFSET_FILL);
    if (s.stage === 2) {
      style(colors.edge, false, 1);
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, g.edge);
      gl.drawElements(gl.LINES, g.ne, g.type, 0);
    }
    const seg = [];
    const add = (a, b) => seg.push(a[0], a[1], a[2], 0, 0, 0, 0, b[0], b[1], b[2], 0, 0, 0, 0);
    [[11.5, -3.5], [18.5, -3.5], [18.5, 3.5], [11.5, 3.5]].forEach((p, i, all) => { const q = all[(i + 1) % 4]; add([p[0], p[1], 0.2], [q[0], q[1], 0.2]); });
    [-3.5, 0, 3.5].forEach((y) => [11.5, 15, 18.5].forEach((x) => add([x, y, 0.2], [x - 1.2, y - 1.2, 3.4])));
    const tip = 102.5 + factor + 3;
    add([15, tip, 0], [15, tip + 13, 0]);
    [[-2.2, 0], [2.2, 0], [0, -2.2], [0, 2.2]].forEach((o) => add([15, tip + 13, 0], [15 + o[0], tip + 9, o[1]]));
    if (third && factor > 0) add([9, 102.5, 0], [21, 102.5, 0]);
    gl.bindBuffer(gl.ARRAY_BUFFER, helper);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(seg), gl.DYNAMIC_DRAW);
    bindVertices(helper);
    style(colors.force, false, 1);
    gl.drawArrays(gl.LINES, 0, seg.length / 7);
  }

  // ---------------------------------------------------------------- gráficos
  function marker(c, x, y, key, fill) {
    c.beginPath();
    if (key[0] === 'H') c.rect(x - 4.5, y - 4.5, 9, 9); else { c.moveTo(x, y - 6); c.lineTo(x + 5.5, y + 4.5); c.lineTo(x - 5.5, y + 4.5); c.closePath(); }
    c.fillStyle = fill; c.fill(); c.stroke();
  }
  function tooltip(c, box, x, y, lines, colors) {
    c.font = '12px Selawik, "Segoe UI", sans-serif'; c.textAlign = 'left';
    const w = Math.max(...lines.map((q) => c.measureText(q).width)) + 20, ht = 16 * lines.length + 8;
    const bx = Math.max(4, Math.min(x + 14, box.w - w - 4)), by = Math.max(4, Math.min(y - ht - 6, box.h - ht - 4));
    c.fillStyle = colors.panel; c.strokeStyle = colors.muted; c.lineWidth = 1;
    c.beginPath(); c.rect(bx, by, w, ht); c.fill(); c.stroke();
    c.fillStyle = colors.ink;
    lines.forEach((q, i) => c.fillText(q, bx + 10, by + 17 + 16 * i));
  }

  function drawChart() {
    const cv = refs.chart;
    if (!cv.clientWidth) return;
    const box = size(cv), c = cv.getContext('2d'), s = state, colors = look();
    c.setTransform(box.ratio, 0, 0, box.ratio, 0, 0);
    c.clearRect(0, 0, box.w, box.h);
    const small = box.w < 520;
    const left = small ? 42 : 62, right = box.w - (small ? 16 : 130), top = 30, bottom = box.h - 44;
    const px = (v) => left + (Math.log10(v) - 3) / 3 * (right - left);
    const py = (v) => bottom - (Math.log10(v) + 2) / 5 * (bottom - top);
    c.font = '12px Selawik, "Segoe UI", sans-serif';
    c.lineWidth = 1; c.strokeStyle = colors.grid; c.fillStyle = colors.muted;
    [[0.01, '≤0.01'], [0.1, '0.1'], [1, '1'], [10, '10'], [100, '100'], [1000, '1000']].forEach((q) => { c.beginPath(); c.moveTo(left, py(q[0])); c.lineTo(right, py(q[0])); c.stroke(); c.textAlign = 'right'; c.fillText(q[1], left - 8, py(q[0]) + 4); });
    [[1e3, small ? '1k' : '1 000'], [1e4, small ? '10k' : '10 000'], [1e5, small ? '100k' : '100 000'], [1e6, small ? '1M' : '1 000 000']].forEach((q) => { c.beginPath(); c.moveTo(px(q[0]), top); c.lineTo(px(q[0]), bottom); c.stroke(); c.textAlign = 'center'; c.fillText(q[1], px(q[0]), bottom + 18); });
    c.textAlign = 'center'; c.fillText(t('chart.dof'), (left + right) / 2, bottom + 38);
    c.textAlign = 'left'; c.fillText(t(s.measure === 'F' ? 'chart.error_force' : 'chart.error_stress'), 8, 16);
    const reference = study.ref[s.measure], labels = [];
    points = [];
    KEYS.forEach((key) => {
      const linear = key[1] === 'L', color = colors.series[key], pts = [];
      study.cases[key].forEach((rec, i) => {
        if (key === 'TQ' && i === 2) return;
        const error = (rec[s.measure] / reference - 1) * 100;
        pts.push({ x: px(rec.dof), y: py(Math.min(1000, Math.max(0.01, Math.abs(error)))), key, mesh: i, dof: rec.dof, error });
      });
      c.strokeStyle = color; c.lineWidth = key === s.el ? 3.5 : 2; c.setLineDash(linear ? [7, 5] : []);
      c.beginPath(); pts.forEach((p, i) => { if (i) c.lineTo(p.x, p.y); else c.moveTo(p.x, p.y); }); c.stroke(); c.setLineDash([]);
      pts.forEach((p) => {
        c.lineWidth = 2; c.strokeStyle = color;
        marker(c, p.x, p.y, key, linear ? colors.panel : color);
        if (key === s.el && p.mesh === s.mesh) { c.strokeStyle = colors.ink; c.beginPath(); c.arc(p.x, p.y, 11, 0, 7); c.stroke(); }
        points.push(p);
      });
      const last = pts[pts.length - 1];
      labels.push({ x: last.x + 12, y: last.y + 4, text: name(key) });
    });
    const ref = study.cases.TQ[2];
    c.fillStyle = colors.ink; c.textAlign = 'center';
    c.fillText('▲ ' + t('common.ref'), px(ref.dof), bottom - 24);
    labels.sort((a, b) => a.y - b.y);
    if (!small) labels.forEach((l, i) => { labels.slice(0, i).forEach((o) => { if (Math.abs(o.x - l.x) < 110 && l.y - o.y < 15) l.y = o.y + 15; }); c.fillStyle = colors.ink; c.textAlign = 'left'; c.fillText(l.text, l.x, l.y); });
    if (hovered) tooltip(c, box, hovered.x, hovered.y, [name(hovered.key) + ' · ' + MESH[hovered.mesh] + ' mm', t('chart.tip_dof', { n: group(hovered.dof) }), t('chart.tip_error', { e: signed(hovered.error, 2) })], colors);
  }

  function drawCounts() {
    const cv = refs.counts;
    if (!cv.isConnected || !cv.clientWidth) return;
    const box = size(cv), c = cv.getContext('2d'), s = state, colors = look();
    c.setTransform(box.ratio, 0, 0, box.ratio, 0, 0);
    c.clearRect(0, 0, box.w, box.h);
    const side = box.w >= 640, labelW = box.w < 420 ? 104 : 128;
    countPoints = [];
    [['elements', 'counts.elements'], ['nodes', 'counts.nodes']].forEach((panel, pi) => {
      const pw = side ? (box.w - 16) / 2 : box.w, ph = side ? box.h : box.h / 2;
      const x0 = side ? pi * (pw + 16) : 0, y0 = side ? 0 : pi * ph;
      const left = x0 + labelW, right = x0 + pw - 14, top = y0 + 24, bottom = y0 + ph - 22;
      const px = (v) => left + (Math.log10(v) - 2) / 4 * (right - left);
      c.fillStyle = colors.ink; c.textAlign = 'left';
      c.font = '600 13px Selawik, "Segoe UI", sans-serif';
      c.fillText(t(panel[1]), x0, y0 + 14);
      c.font = '12px Selawik, "Segoe UI", sans-serif';
      c.strokeStyle = colors.grid; c.lineWidth = 1; c.fillStyle = colors.muted; c.textAlign = 'center';
      [[100, '100'], [1e3, '1k'], [1e4, '10k'], [1e5, '100k'], [1e6, '1M']].forEach((q) => { c.beginPath(); c.moveTo(px(q[0]), top); c.lineTo(px(q[0]), bottom); c.stroke(); c.fillText(q[1], px(q[0]), bottom + 15); });
      const step = (bottom - top) / KEYS.length;
      KEYS.forEach((key, ri) => {
        const y = top + step * (ri + 0.5), linear = key[1] === 'L', color = colors.series[key];
        c.fillStyle = colors.ink; c.textAlign = 'left';
        c.fillText(SYMBOL[key] + ' ' + name(key), x0, y + 4);
        const pts = study.cases[key].map((rec, mi) => ({ x: px(rec[panel[0]]), y, key, mesh: mi, rec }));
        c.strokeStyle = color; c.lineWidth = key === s.el ? 3 : 1.5; c.setLineDash(linear ? [6, 4] : []);
        c.beginPath(); pts.forEach((p, i) => { if (i) c.lineTo(p.x, p.y); else c.moveTo(p.x, p.y); }); c.stroke(); c.setLineDash([]);
        pts.forEach((p) => {
          c.lineWidth = 2; c.strokeStyle = color;
          marker(c, p.x, p.y, key, linear ? colors.panel : color);
          c.fillStyle = colors.muted; c.textAlign = 'center';
          c.fillText(MESH[p.mesh], p.x, p.y - 9);
          if (key === s.el && p.mesh === s.mesh) {
            c.strokeStyle = colors.ink; c.beginPath(); c.arc(p.x, p.y, 10, 0, 7); c.stroke();
            const end = p.x > right - 60;
            c.fillStyle = colors.ink; c.textAlign = end ? 'right' : 'left';
            c.fillText(group(p.rec[panel[0]]), p.x + (end ? -14 : 14), p.y + 4);
          }
          countPoints.push(p);
        });
      });
    });
    const q = countHovered;
    if (q) tooltip(c, box, q.x, q.y, [name(q.key) + ' · ' + MESH[q.mesh] + ' mm', t('counts.tip_elements', { n: group(q.rec.elements) }), t('counts.tip_nodes', { n: group(q.rec.nodes) }), t('counts.tip_ratio', { r: (q.rec.nodes / q.rec.elements).toFixed(2) })], colors);
  }

  function nearest(list, event, reach) {
    const rect = event.currentTarget.getBoundingClientRect(), x = event.clientX - rect.left, y = event.clientY - rect.top;
    let best = null, distance = reach;
    list.forEach((p) => { const d = Math.hypot(p.x - x, p.y - y); if (d < distance) { best = p; distance = d; } });
    return best;
  }

  function schedule() {
    if (pending) return;
    pending = requestAnimationFrame(() => {
      pending = 0;
      if (!study) return;
      if (state.stage === 4) drawChart(); else drawScene();
      if (state.stage === 2) drawCounts();
    });
  }

  // ---------------------------------------------------------------- ações
  function go(stage) {
    cancelAnimationFrame(frame);
    set({ stage, playing: false, load: stage === 3 ? state.load : 100, panel: state.panel ? ['done', 'done', 'spring', 'stiffness'][stage - 1] : null });
  }
  function play(on) {
    cancelAnimationFrame(frame);
    state.playing = on;
    refs.play.setAttribute('aria-pressed', String(on));
    refs.play.replaceChildren(svg(on ? ICON.pause : ICON.play), t(on ? 'result.pause' : 'result.play'));
    if (!on) return;
    let start = null, last = -1;
    const step = (time) => {
      if (start === null) start = time;
      const load = Math.min(100, Math.round((time - start) % 2600 / 20));
      if (load !== last) { last = load; set({ load }, 'light'); }
      frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
  }
  function restore() {
    cancelAnimationFrame(frame);
    view.yaw = -0.55; view.pitch = 0.3; view.zoom = 1;
    hovered = null; countHovered = null;
    set(Object.assign({ playing: false, panel: null }, DEFAULTS));
  }

  function render() {
    if (!study) return;
    const m = mode();
    document.body.className = m;
    const app = document.getElementById('app');
    app.dataset.theme = state.theme;
    document.documentElement.lang = LANGS.find((l) => l[0] === state.lang)[2];
    document.title = 'Element Fundamentals · ' + t('case.short');
    document.querySelector('meta[name="theme-color"]').setAttribute('content', look().bar);
    renderBar();
    renderColumn();
    renderFigure();
    renderPanel();
    renderShare();
    schedule();
  }

  // ---------------------------------------------------------------- partida
  function persistent() {
    refs.scene = h('canvas', { class: 'scene', tabindex: '0' });
    refs.chart = h('canvas', { class: 'chart', role: 'img' });
    refs.status = h('div', { class: 'status', role: 'status' });
    refs.view = h('div', { class: 'view' }, refs.scene, refs.chart, refs.status);
    refs.counts = h('canvas', { role: 'img' });
    refs.countsBox = h('div', { class: 'counts' }, refs.counts);
    const touches = new Map();
    refs.scene.addEventListener('pointerdown', (e) => { touches.set(e.pointerId, { x: e.clientX, y: e.clientY }); refs.scene.setPointerCapture(e.pointerId); });
    refs.scene.addEventListener('pointermove', (e) => {
      if (!touches.has(e.pointerId)) return;
      const old = touches.get(e.pointerId), next = { x: e.clientX, y: e.clientY };
      if (touches.size === 1) { view.yaw += (next.x - old.x) * 0.008; view.pitch = Math.min(1.55, Math.max(-1.55, view.pitch + (next.y - old.y) * 0.008)); }
      else if (touches.size === 2) {
        const other = [...touches.entries()].find((q) => q[0] !== e.pointerId)[1];
        const before = Math.hypot(old.x - other.x, old.y - other.y), after = Math.hypot(next.x - other.x, next.y - other.y);
        if (before > 0) view.zoom = Math.min(8, Math.max(0.4, view.zoom * after / before));
      }
      touches.set(e.pointerId, next);
      schedule();
    });
    ['pointerup', 'pointercancel'].forEach((type) => refs.scene.addEventListener(type, (e) => touches.delete(e.pointerId)));
    refs.scene.addEventListener('wheel', (e) => { e.preventDefault(); view.zoom = Math.min(8, Math.max(0.4, view.zoom * Math.exp(-e.deltaY * 0.0012))); schedule(); }, { passive: false });
    refs.scene.addEventListener('keydown', (e) => {
      const turn = { ArrowLeft: [-0.1, 0], ArrowRight: [0.1, 0], ArrowUp: [0, -0.1], ArrowDown: [0, 0.1] }[e.key];
      const zoom = { '+': 1.15, '=': 1.15, '-': 1 / 1.15 }[e.key];
      if (!turn && !zoom) return;
      e.preventDefault();
      if (turn) { view.yaw += turn[0]; view.pitch = Math.min(1.55, Math.max(-1.55, view.pitch + turn[1])); }
      if (zoom) view.zoom = Math.min(8, Math.max(0.4, view.zoom * zoom));
      schedule();
    });
    const hover = (e) => { hovered = nearest(points, e, 18); schedule(); };
    refs.chart.addEventListener('pointermove', hover);
    refs.chart.addEventListener('pointerdown', hover);
    refs.chart.addEventListener('pointerleave', (e) => { if (e.pointerType === 'mouse') { hovered = null; schedule(); } });
    refs.chart.addEventListener('click', (e) => { const p = nearest(points, e, 18); if (p) set({ el: p.key, mesh: p.mesh }); });
    const countHover = (e) => { countHovered = nearest(countPoints, e, 16); schedule(); };
    refs.counts.addEventListener('pointermove', countHover);
    refs.counts.addEventListener('pointerdown', countHover);
    refs.counts.addEventListener('pointerleave', (e) => { if (e.pointerType === 'mouse') { countHovered = null; schedule(); } });
    refs.counts.addEventListener('click', (e) => { const p = nearest(countPoints, e, 16); if (p) set({ el: p.key, mesh: p.mesh }); });
    if (window.ResizeObserver) { const observer = new ResizeObserver(() => schedule()); observer.observe(refs.view); observer.observe(refs.countsBox); }
    let last = mode();
    window.addEventListener('resize', () => { const m = mode(); if (m !== last) { last = m; render(); } else schedule(); });
    document.addEventListener('click', (e) => { if (state.langOpen && !e.target.closest('.lang')) set({ langOpen: false }); });
    document.addEventListener('keydown', (e) => {
      if (e.key !== 'Escape') return;
      if (state.share) set({ share: false }); else if (state.langOpen) set({ langOpen: false }); else if (state.panel) set({ panel: null });
    });
    document.getElementById('share').addEventListener('click', (e) => { if (e.target.id === 'share') set({ share: false }); });
  }

  function loadCatalog(code) {
    if (catalogs[code]) return Promise.resolve();
    return fetch('i18n/' + code + '.json').then((r) => r.json()).then((table) => { catalogs[code] = table; });
  }

  persistent();
  Promise.all([fetch('data/summary.json').then((r) => r.json()), loadCatalog('pt'), loadCatalog(state.lang)])
    .then((results) => { study = results[0]; render(); })
    .catch(() => { document.getElementById('figure').textContent = 'Element Fundamentals: os dados não carregaram.'; });
})();
