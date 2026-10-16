// KB Builder — workout page: build a session, swap moves, track rounds.
(function(){
  "use strict";
  var KB = window.KB;
  var LEVELS = KB.LEVELS, CATEGORIES = KB.CATEGORIES;

  var SESSION_KEY = 'kbBuilderSession_v1';
  var TARGET_ROUNDS_OPTIONS = [3, 4, 5];
  var DEFAULT_TARGET_ROUNDS = 4;

  // ---------- State ----------
  var state = restoreSession() || {
    equipment: 1,
    selectedLevels: LEVELS.slice(),
    selectedCategories: CATEGORIES.slice(),
    exercises: [],
    recentFlows: [], // last 1-2 generated workouts' exercise names, used to avoid back-to-back repeats
    targetRounds: DEFAULT_TARGET_ROUNDS,
    roundsCompleted: 0
  };
  state.expandedIndex = null;

  function saveSessionState(){
    try {
      localStorage.setItem(SESSION_KEY, JSON.stringify({
        equipment: state.equipment,
        selectedLevels: state.selectedLevels,
        selectedCategories: state.selectedCategories,
        exercises: state.exercises.map(function(e){ return e.name; }),
        recentFlows: state.recentFlows,
        targetRounds: state.targetRounds,
        roundsCompleted: state.roundsCompleted
      }));
    } catch (e) { /* storage unavailable; the app still works for this visit */ }
  }

  function restoreSession(){
    try {
      var parsed = JSON.parse(localStorage.getItem(SESSION_KEY) || 'null');
      if (!parsed) return null;
      var onlyKnown = function(list, allowed){
        return Array.isArray(list) ? list.filter(function(x){ return allowed.indexOf(x) !== -1; }) : [];
      };
      var levels = onlyKnown(parsed.selectedLevels, LEVELS);
      var categories = onlyKnown(parsed.selectedCategories, CATEGORIES);
      var exercises = (parsed.exercises || []).map(KB.findExerciseByName).filter(Boolean);
      var target = TARGET_ROUNDS_OPTIONS.indexOf(parsed.targetRounds) !== -1 ? parsed.targetRounds : DEFAULT_TARGET_ROUNDS;
      return {
        equipment: parsed.equipment === 2 ? 2 : 1,
        selectedLevels: levels.length ? levels : LEVELS.slice(),
        selectedCategories: categories.length ? categories : CATEGORIES.slice(),
        exercises: exercises,
        recentFlows: Array.isArray(parsed.recentFlows) ? parsed.recentFlows.slice(-2) : [],
        targetRounds: target,
        roundsCompleted: Math.max(0, Math.min(target, parseInt(parsed.roundsCompleted, 10) || 0))
      };
    } catch (e) { return null; }
  }

  function vibrate(pattern){
    try { if (navigator.vibrate) navigator.vibrate(pattern); } catch (e) { /* not supported */ }
  }

  // ---------- Elements ----------
  function $(id){ return document.getElementById(id); }
  var el = {
    equipmentRow: $('equipment-row'), levelRow: $('level-row'), categoryRow: $('category-row'),
    generateBtn: $('generate-btn'), exerciseList: $('exercise-list'), workoutCount: $('workout-count'),
    targetRow: $('target-row'), rtActive: $('rt-active'), rtDone: $('rt-done'),
    rtCount: $('rt-count'), rtNum: $('rt-num'), rtOf: $('rt-of'), rtDots: $('rt-dots'), rtUndo: $('rt-undo'),
    rtFinishBtn: $('rt-finish-btn'), rtFinishText: $('rt-finish-text'), rtDoneLabel: $('rt-done-label'),
    rtRestartBtn: $('rt-restart-btn'), rtNewBtn: $('rt-new-btn')
  };

  // ---------- Builder controls ----------
  function chip(label, selected, onClick){
    var btn = document.createElement('button');
    btn.className = 'chip' + (selected ? ' selected' : '');
    btn.setAttribute('aria-pressed', selected ? 'true' : 'false');
    btn.textContent = label;
    btn.addEventListener('click', onClick);
    return btn;
  }

  function renderEquipmentRow(){
    el.equipmentRow.innerHTML = '';
    [[1, '1 Kettlebell'], [2, '2 Kettlebells']].forEach(function(pair){
      el.equipmentRow.appendChild(chip(pair[1], state.equipment === pair[0], function(){
        state.equipment = pair[0];
        renderEquipmentRow();
        saveSessionState();
        vibrate(15);
      }));
    });
  }

  // Multi-select rows always keep at least one option selected.
  function toggleIn(list, value){
    var idx = list.indexOf(value);
    if (idx === -1) list.push(value);
    else if (list.length > 1) list.splice(idx, 1);
  }

  function renderLevelRow(){
    el.levelRow.innerHTML = '';
    LEVELS.forEach(function(level){
      el.levelRow.appendChild(chip(level, state.selectedLevels.indexOf(level) !== -1, function(){
        toggleIn(state.selectedLevels, level);
        renderLevelRow();
        saveSessionState();
        vibrate(15);
      }));
    });
  }

  function renderCategoryRow(){
    el.categoryRow.innerHTML = '';
    CATEGORIES.forEach(function(category){
      el.categoryRow.appendChild(chip(category, state.selectedCategories.indexOf(category) !== -1, function(){
        toggleIn(state.selectedCategories, category);
        renderCategoryRow();
        saveSessionState();
        vibrate(15);
      }));
    });
  }

  // ---------- Workout list ----------
  var SWAP_SVG = '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M20 12a8 8 0 1 1-2.34-5.66M20 4v5h-5" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round"/></svg>';

  function renderExercises(flashIndex){
    el.exerciseList.innerHTML = '';
    el.workoutCount.textContent = state.exercises.length ? state.exercises.length + ' moves' : '';
    state.exercises.forEach(function(ex, index){
      var open = state.expandedIndex === index;
      var item = document.createElement('div');
      item.className = 'ex' + (open ? ' open' : '') + (flashIndex === index ? ' flash' : '');
      item.innerHTML =
        '<div class="ex-row">' +
          '<button class="ex-head" aria-expanded="' + open + '">' +
            KB.thumbHtml(ex, index + 1) +
            '<span class="ex-text">' +
              '<span class="ex-name">' + KB.escapeHtml(ex.name) + '</span>' +
              '<span class="ex-meta" style="display:block">' + KB.escapeHtml(KB.metaText(ex)) + '</span>' +
              '<span class="ex-reps">' + KB.escapeHtml(KB.repetitionTarget(ex)) + '</span>' +
            '</span>' +
            KB.CHEVRON +
          '</button>' +
          '<button class="swap-icon" aria-label="Swap for a different ' + KB.escapeHtml(ex.category) + ' move" title="Swap">' + SWAP_SVG + '</button>' +
        '</div>' +
        '<div class="ex-body">' +
          '<p class="ex-desc">' + KB.escapeHtml(ex.description) + '</p>' +
          KB.videoHtml(ex) +
          '<div class="link-row">' +
            KB.videoLinkHtml(ex) +
            '<a class="link-btn guide-link" href="library.html#' + KB.slugify(ex.name) + '">Full form guide →</a>' +
          '</div>' +
        '</div>';
      item.querySelector('.ex-head').addEventListener('click', function(){
        state.expandedIndex = open ? null : index;
        renderExercises();
      });
      item.querySelector('.swap-icon').addEventListener('click', function(){ swapExercise(index); });
      el.exerciseList.appendChild(item);
    });
  }

  function generateWorkout(){
    var avoidNames = state.recentFlows.reduce(function(acc, flow){ return acc.concat(flow); }, []);
    state.exercises = KB.pickExercises(state.selectedLevels, state.equipment, state.selectedCategories, avoidNames);
    state.recentFlows.push(state.exercises.map(function(e){ return e.name; }));
    state.recentFlows = state.recentFlows.slice(-2);
    state.expandedIndex = null;
    state.roundsCompleted = 0;
    renderExercises();
    renderRoundTracker();
    saveSessionState();
    vibrate(30);
  }

  function swapExercise(index){
    var current = state.exercises[index];
    var avoidNames = state.recentFlows.reduce(function(acc, flow){ return acc.concat(flow); }, []).concat([current.name]);
    // Balance against the REST of the current workout (not the move being replaced), so
    // swapping away from a shoulder-heavy/Advanced/ballistic move doesn't just get
    // replaced by another one when the rest of the workout already carries that load.
    var muscleCounts = {}, difficultyCounts = {}, ballisticCount = 0;
    state.exercises.forEach(function(e, i){
      if (i === index) return;
      (e.muscles || []).forEach(function(m){ muscleCounts[m] = (muscleCounts[m] || 0) + 1; });
      difficultyCounts[e.difficulty] = (difficultyCounts[e.difficulty] || 0) + 1;
      if (KB.isBallistic(e)) ballisticCount += 1;
    });
    var replacement = KB.pickForCategory(current.category, state.selectedLevels, state.equipment, avoidNames, current.name, muscleCounts, difficultyCounts, ballisticCount);
    if (replacement.name === current.name){
      // Nothing else fits this category/equipment/level combo.
      vibrate([30, 60, 30]);
      return;
    }
    state.exercises[index] = replacement;
    if (state.expandedIndex === index) state.expandedIndex = null;
    renderExercises(index);
    saveSessionState();
    vibrate(20);
  }

  // ---------- Round tracker ----------
  function renderTargetRow(){
    // The target locks in once the first round is logged, so it can't change mid-workout.
    var locked = state.roundsCompleted > 0;
    el.targetRow.hidden = locked;
    el.targetRow.innerHTML = '';
    if (locked) return;
    TARGET_ROUNDS_OPTIONS.forEach(function(option){
      var btn = document.createElement('button');
      btn.className = 'target-btn' + (state.targetRounds === option ? ' selected' : '');
      btn.textContent = option;
      btn.setAttribute('aria-label', option + ' rounds');
      btn.addEventListener('click', function(){
        state.targetRounds = option;
        renderRoundTracker();
        saveSessionState();
        vibrate(15);
      });
      el.targetRow.appendChild(btn);
    });
  }

  function renderRoundTracker(){
    renderTargetRow();
    var complete = state.roundsCompleted >= state.targetRounds;
    el.rtActive.hidden = complete;
    el.rtDone.hidden = !complete;
    el.rtDoneLabel.textContent = state.targetRounds + ' / ' + state.targetRounds + ' rounds complete';
    if (complete) return;
    el.rtNum.textContent = state.roundsCompleted;
    el.rtOf.textContent = '/ ' + state.targetRounds;
    el.rtDots.innerHTML = '';
    for (var i = 0; i < state.targetRounds; i++){
      var dot = document.createElement('span');
      dot.className = 'rt-dot' + (i < state.roundsCompleted ? ' done' : '');
      el.rtDots.appendChild(dot);
    }
    el.rtUndo.hidden = state.roundsCompleted === 0;
    var remaining = state.targetRounds - state.roundsCompleted;
    el.rtFinishText.textContent = remaining === 1 ? 'Finish Workout' : 'Round ' + (state.roundsCompleted + 1) + ' Finished';
  }

  function finishRound(){
    if (state.roundsCompleted >= state.targetRounds) return;
    state.roundsCompleted += 1;
    vibrate(state.roundsCompleted >= state.targetRounds ? [0, 60, 60, 60, 60, 60] : 20);
    renderRoundTracker();
    saveSessionState();
  }

  function undoRound(){
    if (state.roundsCompleted <= 0) return;
    state.roundsCompleted -= 1;
    vibrate(15);
    renderRoundTracker();
    saveSessionState();
  }

  // ---------- Wire up ----------
  el.generateBtn.addEventListener('click', generateWorkout);
  el.rtFinishBtn.addEventListener('click', finishRound);
  el.rtCount.addEventListener('click', undoRound);
  el.rtUndo.addEventListener('click', undoRound);
  el.rtRestartBtn.addEventListener('click', function(){
    state.roundsCompleted = 0;
    renderRoundTracker();
    saveSessionState();
    vibrate(15);
  });
  el.rtNewBtn.addEventListener('click', function(){
    generateWorkout();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  renderEquipmentRow();
  renderLevelRow();
  renderCategoryRow();
  if (state.exercises.length === 0) generateWorkout();
  else { renderExercises(); renderRoundTracker(); }
})();
