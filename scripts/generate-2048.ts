// Generador TypeScript del 2048 DVD Screensaver Infinito
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { renderDVD2048 } from './render.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const svg = renderDVD2048();

const outPath = path.join(__dirname, '..', '2048-terminal.svg');
fs.writeFileSync(outPath, svg, 'utf8');

console.log('[TS] Generado 2048-terminal.svg — ¡Modo DVD Screensaver Infinito limpio (sin textos, sin explosiones, cubo sólido) activado!');
