// KB Builder — movement library: search, filter by category, and open a move's full form guide.
// A link like library.html#kettlebell-goblet-squat opens that move directly.
(function(){
  "use strict";
  var KB = window.KB;
  var FILTERS = ['All'].concat(KB.CATEGORIES);

  var state = { filter: 'All', search: '', openName: null };

  var el = {
    search: document.getElementById('search'),
    filterRow: document.getElementById('filter-row'),
    list: document.getElementById('library-list'),
    title: document.getElementById('list-title'),
    count: document.getElementById('list-count')
  };

  function renderFilters(){
    el.filterRow.innerHTML = '';
    FILTERS.forEach(function(cat){
      var btn = document.createElement('button');
      btn.className = 'chip' + (state.filter === cat ? ' selected' : '');
      btn.setAttribute('aria-pressed', state.filter === cat ? 'true' : 'false');
      btn.textContent = cat;
      btn.addEventListener('click', function(){
        state.filter = cat;
        renderFilters();
        renderList();
      });
      el.filterRow.appendChild(btn);
    });
  }

  function matches(){
    var q = state.search.trim().toLowerCase();
    return KB.EXERCISES.filter(function(ex){
      if (state.filter !== 'All' && ex.category !== state.filter) return false;
      if (q && ex.name.toLowerCase().indexOf(q) === -1) return false;
      return true;
    });
  }

  function listHtml(items, className){
    return '<' + (className === 'mistakes' ? 'ul' : 'ol') + '>' +
      items.map(function(s){ return '<li>' + KB.escapeHtml(s) + '</li>'; }).join('') +
      '</' + (className === 'mistakes' ? 'ul' : 'ol') + '>';
  }

  function renderList(){
    var found = matches();
    el.title.textContent = state.filter === 'All' ? 'All Moves' : state.filter;
    el.count.textContent = found.length + (found.length === 1 ? ' move' : ' moves');
    if (found.length === 0){
      el.list.innerHTML = '<div class="empty">No moves match your search.</div>';
      return;
    }
    el.list.innerHTML = '';
    found.forEach(function(ex){
      var open = state.openName === ex.name;
      var item = document.createElement('div');
      item.className = 'ex' + (open ? ' open' : '');
      item.id = KB.slugify(ex.name);
      item.innerHTML =
        '<button class="ex-head" aria-expanded="' + open + '">' +
          KB.thumbHtml(ex) +
          '<span class="ex-text">' +
            '<span class="ex-name">' + KB.escapeHtml(ex.name) + '</span>' +
            '<span class="ex-meta" style="display:block">' + KB.escapeHtml(KB.metaText(ex)) + '</span>' +
          '</span>' +
          KB.CHEVRON +
        '</button>' +
        '<div class="ex-body">' +
          '<p class="ex-desc">' + KB.escapeHtml(ex.description) + '</p>' +
          KB.videoHtml(ex) +
          '<div class="cue"><div class="cue-label">Setup</div><p>' + KB.escapeHtml(ex.setup) + '</p></div>' +
          '<div class="cue"><div class="cue-label">How to do it</div>' + listHtml(ex.steps) + '</div>' +
          '<div class="cue mistakes"><div class="cue-label">Common mistakes</div>' + listHtml(ex.mistakes, 'mistakes') + '</div>' +
          '<div class="link-row">' + KB.videoLinkHtml(ex) + '</div>' +
        '</div>';
      item.querySelector('.ex-head').addEventListener('click', function(){
        state.openName = open ? null : ex.name;
        renderList();
        if (!open) history.replaceState(null, '', '#' + KB.slugify(ex.name));
      });
      el.list.appendChild(item);
    });
  }

  function openFromHash(){
    var slug = decodeURIComponent(location.hash.slice(1));
    if (!slug) return;
    var ex = KB.EXERCISES.filter(function(e){ return KB.slugify(e.name) === slug; })[0];
    if (!ex) return;
    state.filter = 'All';
    state.search = '';
    el.search.value = '';
    state.openName = ex.name;
    renderFilters();
    renderList();
    var row = document.getElementById(slug);
    if (row) setTimeout(function(){ row.scrollIntoView({ behavior: 'smooth', block: 'start' }); }, 50);
  }

  el.search.addEventListener('input', function(){
    state.search = el.search.value;
    renderList();
  });
  window.addEventListener('hashchange', openFromHash);

  renderFilters();
  renderList();
  openFromHash();
})();
