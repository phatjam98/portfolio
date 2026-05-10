/* <bp-theme> — accent palette switcher
 * ----------------------------------------------------------------------------
 * Sets data-bp-theme on <html> so the CSS palette swap takes effect.
 * Persists choice in localStorage. Renders three small swatch buttons.
 *
 *   <bp-theme></bp-theme>
 *
 * Optional attribute: default-theme="cyan|amber|lime"  (default: cyan)
 *
 * The component is render-on-demand and uses light DOM intentionally so the
 * site CSS reaches it. Colour swatches are inline so it works zero-config.
 */

(() => {
  const STORAGE_KEY = "bp:theme";
  const THEMES = [
    { id: "cyan",  label: "Cyan",  swatch: "#22d3ee" },
    { id: "amber", label: "Amber", swatch: "#f59e0b" },
    { id: "lime",  label: "Lime",  swatch: "#a3e635" },
  ];

  const apply = (id) => {
    document.documentElement.setAttribute("data-bp-theme", id);
    try { localStorage.setItem(STORAGE_KEY, id); } catch {}
    window.dispatchEvent(new CustomEvent("bp-theme-change", { detail: { theme: id } }));
  };

  // Apply persisted theme as early as possible
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) document.documentElement.setAttribute("data-bp-theme", saved);
  } catch {}

  class BPTheme extends HTMLElement {
    connectedCallback() {
      const current =
        document.documentElement.getAttribute("data-bp-theme") ||
        this.getAttribute("default-theme") ||
        "cyan";
      apply(current);

      this.innerHTML = `
        <div role="radiogroup" aria-label="Accent theme" style="
          display:inline-flex; gap:6px; align-items:center;
          padding:4px 8px; border:1px solid var(--bp-line);
          background:var(--bp-panel);
        ">
          <span class="bp-mono" style="font-size:9px; color:var(--bp-soft); letter-spacing:.15em;">PALETTE</span>
          ${THEMES.map(t => `
            <button type="button" role="radio" data-theme="${t.id}"
              aria-checked="${t.id === current}"
              aria-label="${t.label} accent"
              style="
                width:18px; height:18px; padding:0;
                background:${t.swatch};
                border:1px solid ${t.id === current ? "var(--bp-text)" : "transparent"};
                outline:1px solid var(--bp-line);
                cursor:pointer; transition:border-color 150ms, transform 150ms;
              "
            ></button>
          `).join("")}
        </div>
      `;

      this.addEventListener("click", (e) => {
        const btn = e.target.closest("button[data-theme]");
        if (!btn) return;
        const id = btn.dataset.theme;
        apply(id);
        this.querySelectorAll("button[data-theme]").forEach(b => {
          const on = b.dataset.theme === id;
          b.setAttribute("aria-checked", String(on));
          b.style.borderColor = on ? "var(--bp-text)" : "transparent";
        });
      });
    }
  }

  if (!customElements.get("bp-theme")) customElements.define("bp-theme", BPTheme);
})();
