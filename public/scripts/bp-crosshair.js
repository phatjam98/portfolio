/* <bp-crosshair> — cursor-tracking crosshair with X/Y coords overlay
 * ----------------------------------------------------------------------------
 * Wrap any block-level element you want to instrument:
 *
 *   <bp-crosshair>
 *     <svg> ...your hero diagram... </svg>
 *   </bp-crosshair>
 *
 * The host gets cursor:crosshair and position:relative. Two thin accent lines
 * follow the pointer, with a small mono coord readout. Disabled on touch and
 * on prefers-reduced-motion.
 */

(() => {
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const touchOnly = matchMedia("(hover: none)").matches;

  class BPCrosshair extends HTMLElement {
    connectedCallback() {
      this.style.position = "relative";
      this.style.display = this.style.display || "block";
      if (reduced || touchOnly) return; // bail; just render children plainly

      this.style.cursor = "crosshair";

      const h = document.createElement("div");
      const v = document.createElement("div");
      const tag = document.createElement("div");

      const baseLine = "position:absolute; background:var(--bp-accent); opacity:0.35; pointer-events:none;";
      h.style.cssText = baseLine + "left:0; right:0; height:1px; display:none;";
      v.style.cssText = baseLine + "top:0; bottom:0; width:1px; display:none;";
      tag.className = "bp-mono";
      tag.style.cssText = `
        position:absolute; font-size:9px; color:var(--bp-accent);
        background:var(--bp-bg); padding:2px 6px;
        border:1px solid var(--bp-accent); letter-spacing:0.1em;
        pointer-events:none; white-space:nowrap; display:none;
      `;
      this.append(h, v, tag);

      const pad = (n) => Math.round(n).toString().padStart(4, "0");

      this._onMove = (e) => {
        const r = this.getBoundingClientRect();
        const x = e.clientX - r.left;
        const y = e.clientY - r.top;
        h.style.top = y + "px"; h.style.display = "block";
        v.style.left = x + "px"; v.style.display = "block";
        tag.style.left = (x + 8) + "px";
        tag.style.top  = (y + 8) + "px";
        tag.style.display = "block";
        tag.textContent = `X${pad(x)} · Y${pad(y)}`;
      };
      this._onLeave = () => {
        h.style.display = v.style.display = tag.style.display = "none";
      };
      this.addEventListener("mousemove", this._onMove);
      this.addEventListener("mouseleave", this._onLeave);
    }
    disconnectedCallback() {
      this.removeEventListener("mousemove", this._onMove);
      this.removeEventListener("mouseleave", this._onLeave);
    }
  }
  if (!customElements.get("bp-crosshair")) customElements.define("bp-crosshair", BPCrosshair);
})();
