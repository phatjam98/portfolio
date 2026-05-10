/* <bp-count-up> — count from 0 to a target when scrolled into view
 * ----------------------------------------------------------------------------
 *   <bp-count-up to="83" prefix="−" suffix="%"></bp-count-up>
 *   <bp-count-up to="2.4" prefix="$" suffix="M" decimals="1"></bp-count-up>
 *   <bp-count-up to="340" prefix="+" suffix="%"></bp-count-up>
 *
 * Attributes:
 *   to        — required, the target number
 *   prefix    — optional, prepended literally
 *   suffix    — optional, appended literally
 *   decimals  — optional, default 0
 *   duration  — optional ms, default 1400
 *
 * Falls back to the final value immediately if prefers-reduced-motion is set.
 */

(() => {
  class BPCountUp extends HTMLElement {
    connectedCallback() {
      const target = parseFloat(this.getAttribute("to") || "0");
      const prefix = this.getAttribute("prefix") || "";
      const suffix = this.getAttribute("suffix") || "";
      const decimals = parseInt(this.getAttribute("decimals") || "0", 10);
      const duration = parseInt(this.getAttribute("duration") || "1400", 10);

      this.classList.add("bp-num");

      const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
      const finalText = prefix + target.toFixed(decimals) + suffix;

      if (reduced) { this.textContent = finalText; return; }

      this.textContent = prefix + (0).toFixed(decimals) + suffix;

      const run = () => {
        const start = performance.now();
        const tick = (now) => {
          const t = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - t, 3);
          this.textContent = prefix + (target * eased).toFixed(decimals) + suffix;
          if (t < 1) this._raf = requestAnimationFrame(tick);
          else this.textContent = finalText;
        };
        this._raf = requestAnimationFrame(tick);
      };

      this._io = new IntersectionObserver((entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            run();
            this._io.disconnect();
            break;
          }
        }
      }, { threshold: 0.2 });
      this._io.observe(this);
    }
    disconnectedCallback() {
      cancelAnimationFrame(this._raf);
      this._io && this._io.disconnect();
    }
  }
  if (!customElements.get("bp-count-up")) customElements.define("bp-count-up", BPCountUp);
})();
