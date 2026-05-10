/* <bp-glitch> — text that occasionally swaps a char with a schematic glyph
 * ----------------------------------------------------------------------------
 *   <bp-glitch>404</bp-glitch>
 *
 * Reads its initial text content as the canonical string, glitches one
 * character at a time, then restores. Disabled under prefers-reduced-motion.
 */

(() => {
  const GLYPHS = "█▓▒░╳╱╲┼┤├┴┬";
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

  class BPGlitch extends HTMLElement {
    connectedCallback() {
      this._text = this.textContent;
      if (reduced) return;
      this._alive = true;
      const tick = () => {
        if (!this._alive) return;
        if (Math.random() > 0.6) {
          const arr = this._text.split("");
          const i = Math.floor(Math.random() * arr.length);
          if (arr[i] !== " ") arr[i] = GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          this.textContent = arr.join("");
          setTimeout(() => { if (this._alive) this.textContent = this._text; }, 90);
        }
        this._timer = setTimeout(tick, 600 + Math.random() * 1400);
      };
      tick();
    }
    disconnectedCallback() {
      this._alive = false;
      clearTimeout(this._timer);
    }
  }
  if (!customElements.get("bp-glitch")) customElements.define("bp-glitch", BPGlitch);
})();
