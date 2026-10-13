(function () {
  "use strict";

  const app = window.BusinessWave;
  if (!app) return;

  function initSectorCards() {
    app.qsa("[data-sector-grid]").forEach((grid) => {
      const cards = app.qsa("[data-sector-card]", grid);
      const explorer = grid.closest(".sector-explorer");
      const panels = explorer ? app.qsa("[data-sector-panel]", explorer) : [];
      if (!cards.length) return;

      const getColumnCount = () => {
        const width = grid.getBoundingClientRect().width;
        if (width >= 1080) return 3;
        if (width >= 680) return 2;
        return 1;
      };

      const layoutCards = () => {
        const columnCount = getColumnCount();
        if (Number(grid.dataset.columns || 0) === columnCount) return;

        grid.dataset.columns = String(columnCount);
        const columns = Array.from({ length: columnCount }, () => {
          const column = document.createElement("div");
          column.className = "sector-column";
          return column;
        });

        cards.forEach((card, index) => {
          columns[index % columnCount].appendChild(card);
        });

        grid.replaceChildren(...columns);
      };

      const activatePanel = (key) => {
        panels.forEach((panel) => {
          panel.classList.toggle("is-active", panel.dataset.sectorPanel === key);
        });
      };

      layoutCards();
      window.addEventListener("resize", layoutCards);

      cards.forEach((card, index) => {
        const button = card.querySelector(".sector-card-toggle");
        const panel = card.querySelector(".sector-details");
        if (!button || !panel) return;

        const panelId = panel.id || `sector-details-${index + 1}`;
        panel.id = panelId;
        button.setAttribute("aria-controls", panelId);

        const sync = () => {
          const open = card.classList.contains("is-open");
          button.setAttribute("aria-expanded", String(open));
        };

        sync();

        button.addEventListener("click", () => {
          const wasOpen = card.classList.contains("is-open");

          cards.forEach((item) => {
            item.classList.remove("is-open");
            const itemButton = item.querySelector(".sector-card-toggle");
            if (itemButton) itemButton.setAttribute("aria-expanded", "false");
          });

          if (!wasOpen) {
            card.classList.add("is-open");
            button.setAttribute("aria-expanded", "true");
            activatePanel(card.dataset.sectorKey);
          }
        });
      });
    });
  }

  app.ready(initSectorCards);
})();
