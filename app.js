(function () {
  const data = window.MA_DASHBOARD_DATA || { meta: {}, kpis: [], campus: [], starts: [] };

  const elements = {
    cycle: document.getElementById('meta-cycle'),
    scope: document.getElementById('meta-scope'),
    updated: document.getElementById('meta-updated'),
    temarioFilter: document.getElementById('temario-filter'),
    kpiGrid: document.getElementById('kpi-grid'),
    campusCount: document.getElementById('campus-count'),
    startsCount: document.getElementById('starts-count'),
    campusBody: document.getElementById('campus-table-body'),
    startsBody: document.getElementById('starts-table-body')
  };

  function formatNumber(value) {
    return new Intl.NumberFormat('es-MX').format(value);
  }

  function formatPercent(value) {
    return new Intl.NumberFormat('es-MX', {
      style: 'percent',
      minimumFractionDigits: 1,
      maximumFractionDigits: 1
    }).format(value || 0);
  }

  function formatValue(value, format) {
    if (format === 'percent') return formatPercent(value);
    return formatNumber(value);
  }

  function uniqueTemarios() {
    const temarios = new Set();
    [...data.campus, ...data.starts].forEach((item) => {
      if (item.temario) temarios.add(item.temario);
    });
    return ['Todos', ...Array.from(temarios).sort()];
  }

  function populateHeader() {
    elements.cycle.textContent = data.meta.cycle || '—';
    elements.scope.textContent = data.meta.scope || '—';
    elements.updated.textContent = data.meta.updatedAt || '—';
  }

  function populateFilter() {
    const options = uniqueTemarios();
    elements.temarioFilter.innerHTML = options
      .map((value) => `<option value="${value}">${value}</option>`)
      .join('');
  }

  function renderKpis() {
    elements.kpiGrid.innerHTML = data.kpis
      .map(
        (item) => `
          <article class="kpi-card">
            <p class="kpi-label">${item.label}</p>
            <p class="kpi-value">${formatValue(item.value, item.format)}</p>
            <p class="kpi-helper">${item.helper || ''}</p>
          </article>
        `
      )
      .join('');
  }

  function buildBadge(value) {
    return `<span class="badge ${value}">${value}</span>`;
  }

  function filteredRows(rows, temario) {
    if (temario === 'Todos') return rows;
    return rows.filter((row) => row.temario === temario);
  }

  function sortCampus(rows) {
    return [...rows].sort((a, b) => {
      if (a.temario !== b.temario) return a.temario.localeCompare(b.temario);
      return b.goal - a.goal;
    });
  }

  function sortStarts(rows) {
    return [...rows].sort((a, b) => {
      if (a.startMonth !== b.startMonth) return a.startMonth.localeCompare(b.startMonth);
      if (a.temario !== b.temario) return a.temario.localeCompare(b.temario);
      return a.campus.localeCompare(b.campus);
    });
  }

  function renderCampusTable(temario) {
    const rows = sortCampus(filteredRows(data.campus, temario));
    elements.campusCount.textContent = `${rows.length} registros`;
    elements.campusBody.innerHTML = rows
      .map(
        (row) => `
          <tr>
            <td>${row.campus}</td>
            <td>${row.temario}</td>
            <td class="align-right">${formatNumber(row.goal)}</td>
            <td class="align-right">${formatNumber(row.real)}</td>
            <td class="align-right">${formatNumber(row.gap)}</td>
            <td class="align-right">${formatPercent(row.compliance)}</td>
            <td>${buildBadge(row.semaphore)}</td>
          </tr>
        `
      )
      .join('');
  }

  function renderStartsTable(temario) {
    const rows = sortStarts(filteredRows(data.starts, temario));
    elements.startsCount.textContent = `${rows.length} registros`;
    elements.startsBody.innerHTML = rows
      .map(
        (row) => `
          <tr>
            <td>${row.startMonth}</td>
            <td>${row.campus}</td>
            <td>${row.temario}</td>
            <td class="align-right">${formatNumber(row.goal)}</td>
            <td class="align-right">${formatNumber(row.real)}</td>
            <td class="align-right">${formatNumber(row.gap)}</td>
            <td class="align-right">${formatPercent(row.compliance)}</td>
            <td>${buildBadge(row.semaphore)}</td>
          </tr>
        `
      )
      .join('');
  }

  function renderAll() {
    const selectedTemario = elements.temarioFilter.value || 'Todos';
    renderKpis();
    renderCampusTable(selectedTemario);
    renderStartsTable(selectedTemario);
  }

  populateHeader();
  populateFilter();
  renderAll();
  elements.temarioFilter.addEventListener('change', renderAll);
})();
