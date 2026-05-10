/* <bp-clock> — live MDT clock with blinking colon
 * ----------------------------------------------------------------------------
 *   <bp-clock></bp-clock>
 *
 * Optional attribute: tz-offset="-7"  (hours from UTC, default -7 for MDT)
 *
 * Updates once per second. Cleans up its interval on disconnect.
 */

(() => {
  class BPClock extends HTMLElement {
    connectedCallback() {
      const tz = parseFloat(this.getAttribute("tz-offset") || "-7");
      this.classList.add("bp-mono");
      this.style.fontSize = this.style.fontSize || "10px";
      this.style.color = this.style.color || "var(--bp-soft)";
      this.style.letterSpacing = this.style.letterSpacing || "0.1em";

      this._render = () => {
        const now = new Date();
        const utcMs = now.getTime() + now.getTimezoneOffset() * 60000;
        const local = new Date(utcMs + tz * 3600000);
        const hh = String(local.getHours()).padStart(2, "0");
        const mm = String(local.getMinutes()).padStart(2, "0");
        const ss = String(local.getSeconds()).padStart(2, "0");
        this.innerHTML = `
          <span style="color:var(--bp-accent); display:inline-block; animation:bp-pulse-dot 1.6s ease-in-out infinite;">●</span>
          ${hh}:${mm}<span style="animation:bp-blink 1s step-end infinite;">:</span>${ss} MDT
        `;
      };
      this._render();
      this._id = setInterval(this._render, 1000);
    }
    disconnectedCallback() { clearInterval(this._id); }
  }
  if (!customElements.get("bp-clock")) customElements.define("bp-clock", BPClock);
})();
