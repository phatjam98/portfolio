/* <bp-now-reading> — pulsing-dot widget for the Writing sidebar
 * ----------------------------------------------------------------------------
 *   <bp-now-reading
 *     title="Designing Data-Intensive Applications"
 *     author="Kleppmann · re-read #4"
 *     chapter="8"
 *     of="12">
 *   </bp-now-reading>
 *
 * Pure-display component; styling pulls from --bp-* tokens.
 */

(() => {
  class BPNowReading extends HTMLElement {
    connectedCallback() {
      const t = this.getAttribute("title") || "";
      const a = this.getAttribute("author") || "";
      const ch = parseInt(this.getAttribute("chapter") || "0", 10);
      const of = parseInt(this.getAttribute("of") || "0", 10);
      const pct = of > 0 ? Math.round((ch / of) * 100) : 0;

      this.innerHTML = `
        <div style="
          padding:20px; border:1px solid var(--bp-line); background:var(--bp-panel);
          position:relative; overflow:hidden;
        ">
          <div style="display:flex; align-items:center; gap:8px; margin-bottom:14px;">
            <span class="bp-now-pulse"></span>
            <div class="bp-mono" style="font-size:9px; color:var(--bp-soft); letter-spacing:.18em;">NOW READING</div>
          </div>
          <p style="font-size:13px; color:var(--bp-text); margin:0 0 4px; font-weight:600;">${escapeHTML(t)}</p>
          <p style="font-size:11px; color:var(--bp-muted); margin:0 0 12px;">${escapeHTML(a)}</p>
          <div style="height:3px; background:var(--bp-line);">
            <div style="height:100%; width:${pct}%; background:var(--bp-accent); box-shadow:0 0 8px var(--bp-glow);"></div>
          </div>
          <div class="bp-mono" style="font-size:9px; color:var(--bp-soft); letter-spacing:.12em; margin-top:6px;">
            CH ${ch} / ${of} · ${pct}%
          </div>
        </div>
      `;
    }
  }
  function escapeHTML(s) {
    return String(s).replace(/[&<>"']/g, (c) => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
    }[c]));
  }
  if (!customElements.get("bp-now-reading"))
    customElements.define("bp-now-reading", BPNowReading);
})();
