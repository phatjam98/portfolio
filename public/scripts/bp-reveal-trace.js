/* <bp-reveal-trace> — schematic line that draws itself on parent .bp-card hover
 * ----------------------------------------------------------------------------
 * Drop INSIDE a .bp-card; appears (and animates) only while hovering the card.
 *
 *   <article class="bp-card">
 *     <bp-reveal-trace variant="0"></bp-reveal-trace>
 *     ...card content...
 *   </article>
 *
 * Optional attribute: variant="0|1|2"  picks one of three path shapes.
 */

(() => {
  const PATHS = [
    "M 8 180 L 60 180 L 60 120 L 130 120 L 130 60 L 220 60 L 220 30 L 272 30",
    "M 8 30 C 80 30, 120 90, 200 90 S 260 170, 272 170",
    "M 8 100 L 50 100 L 70 70 L 130 70 L 150 130 L 220 130 L 240 100 L 272 100",
  ];

  class BPRevealTrace extends HTMLElement {
    connectedCallback() {
      const variant = (parseInt(this.getAttribute("variant") || "0", 10)) % PATHS.length;
      this.style.cssText = `
        position:absolute; inset:0; pointer-events:none; opacity:0;
        transition: opacity 220ms;
      `;
      this.innerHTML = `
        <svg viewBox="0 0 280 200" preserveAspectRatio="none"
             style="width:100%; height:100%; display:block;">
          <path d="${PATHS[variant]}"
                stroke="var(--bp-accent)" stroke-width="1" fill="none"
                stroke-dasharray="240" opacity="0.35"
                style="animation:bp-trace 1.4s ease-out forwards;" />
        </svg>
      `;

      // Show on parent card hover
      const card = this.closest(".bp-card");
      if (!card) return;
      this._on  = () => { this.style.opacity = "1"; };
      this._off = () => { this.style.opacity = "0"; };
      card.addEventListener("mouseenter", this._on);
      card.addEventListener("mouseleave", this._off);
      card.addEventListener("focusin",  this._on);
      card.addEventListener("focusout", this._off);
    }
    disconnectedCallback() {
      const card = this.closest(".bp-card");
      if (!card) return;
      card.removeEventListener("mouseenter", this._on);
      card.removeEventListener("mouseleave", this._off);
      card.removeEventListener("focusin", this._on);
      card.removeEventListener("focusout", this._off);
    }
  }
  if (!customElements.get("bp-reveal-trace"))
    customElements.define("bp-reveal-trace", BPRevealTrace);
})();
