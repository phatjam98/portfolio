/* <bp-scroll-progress> — thin accent line tracking page scroll
 * ----------------------------------------------------------------------------
 * Place once at the top of the page (after the nav, or sticky to viewport top):
 *
 *   <bp-scroll-progress></bp-scroll-progress>
 *
 * Optional attribute: target="#main"   (CSS selector of scroll container)
 *                                       default = window
 */

(() => {
  class BPScrollProgress extends HTMLElement {
    connectedCallback() {
      this.style.cssText = `
        display:block; position:sticky; top:0;
        height:2px; background:var(--bp-line); z-index:20;
      `;
      this.innerHTML = `<div style="
        height:100%; width:0%;
        background:var(--bp-accent);
        box-shadow: 0 0 8px var(--bp-glow);
        transition: width 80ms linear;
      "></div>`;
      this._bar = this.firstElementChild;

      const sel = this.getAttribute("target");
      this._scroller = sel ? document.querySelector(sel) : null;

      this._onScroll = () => {
        let pct;
        if (this._scroller) {
          const max = this._scroller.scrollHeight - this._scroller.clientHeight;
          pct = max > 0 ? (this._scroller.scrollTop / max) * 100 : 0;
        } else {
          const doc = document.documentElement;
          const max = doc.scrollHeight - doc.clientHeight;
          pct = max > 0 ? (window.scrollY / max) * 100 : 0;
        }
        this._bar.style.width = pct + "%";
      };

      (this._scroller || window).addEventListener("scroll", this._onScroll, { passive: true });
      this._onScroll();
    }
    disconnectedCallback() {
      (this._scroller || window).removeEventListener("scroll", this._onScroll);
    }
  }
  if (!customElements.get("bp-scroll-progress"))
    customElements.define("bp-scroll-progress", BPScrollProgress);
})();
