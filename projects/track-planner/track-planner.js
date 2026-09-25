(function () {
  'use strict';

  const mile = 1609;
  const sessions = [
    { name: 'The Pyramid', focus: 'Build stamina through a controlled climb, then finish with one confident mile.', blocks: [{ label: 'Build', reps: [{ count: 3, distance: 300 }, { count: 1, distance: 600 }, { count: 3, distance: 300 }] }, { label: 'Finish', reps: [{ count: 1, distance: mile }] }] },
    { name: 'The Broken Mile', focus: 'Change gears without losing your rhythm, then hold your form for the final mile.', blocks: [{ label: 'Ladder', reps: [{ count: 2, distance: 400 }, { count: 2, distance: 800 }, { count: 1, distance: 1200 }, { count: 2, distance: 800 }, { count: 2, distance: 400 }] }, { label: 'Finish', reps: [{ count: 1, distance: mile }] }] },
    { name: 'The Sandwich', focus: 'Put a strong sustained effort between two familiar blocks, then close with a mile.', blocks: [{ label: 'Outside', reps: [{ count: 4, distance: 400 }] }, { label: 'Middle', reps: [{ count: 1, distance: 1000 }] }, { label: 'Outside', reps: [{ count: 4, distance: 400 }] }, { label: 'Finish', reps: [{ count: 1, distance: mile }] }] },
    { name: 'The Descender', focus: 'Stay relaxed as the reps get shorter and quicker before the final mile.', blocks: [{ label: 'Descend', reps: [{ count: 1, distance: 1200 }, { count: 1, distance: 1000 }, { count: 1, distance: 800 }, { count: 1, distance: 600 }, { count: 1, distance: 400 }] }, { label: 'Finish', reps: [{ count: 1, distance: mile }] }] },
    { name: 'The Triple Stack', focus: 'Stack three kinds of effort and save your smoothest running for the final mile.', blocks: [{ label: 'Short', reps: [{ count: 3, distance: 400 }] }, { label: 'Medium', reps: [{ count: 3, distance: 600 }] }, { label: 'Long', reps: [{ count: 2, distance: 800 }] }, { label: 'Finish', reps: [{ count: 1, distance: mile }] }] },
    { name: 'The Wave', focus: 'Switch between short and medium reps while keeping the overall effort lively.', blocks: [{ label: 'Wave out', reps: [{ count: 5, distance: 200 }, { count: 4, distance: 300 }] }, { label: 'Wave back', reps: [{ count: 4, distance: 200 }, { count: 2, distance: 300 }, { count: 1, distance: 400 }] }, { label: 'Finish', reps: [{ count: 1, distance: mile }] }] },
    { name: 'The Long Tail', focus: 'Start with quick rhythm work and finish the session with a longer aerobic push.', blocks: [{ label: 'Rhythm', reps: [{ count: 8, distance: 200 }] }, { label: 'Build', reps: [{ count: 1, distance: 400 }, { count: 1, distance: 800 }] }, { label: 'Reset', reps: [{ count: 4, distance: 200 }, { count: 1, distance: 400 }] }, { label: 'Finish', reps: [{ count: 1, distance: mile }] }] },
    { name: 'The Steps', focus: 'Build aerobic stamina in measured steps, then see what you have left over a mile.', blocks: [{ label: 'Steps', reps: [{ count: 1, distance: 400 }, { count: 1, distance: 800 }, { count: 1, distance: 1200 }, { count: 1, distance: 800 }, { count: 1, distance: 400 }] }, { label: 'Finish', reps: [{ count: 1, distance: mile }] }] },
    { name: 'The Echo', focus: 'Repeat a rhythm block after two longer reps to practise coming back to pace.', blocks: [{ label: 'Out', reps: [{ count: 8, distance: 200 }, { count: 1, distance: 300 }, { count: 1, distance: 400 }] }, { label: 'Back', reps: [{ count: 8, distance: 200 }, { count: 1, distance: 300 }] }, { label: 'Finish', reps: [{ count: 1, distance: mile }] }] },
    { name: 'The Alternator', focus: 'Keep short reps tidy around two longer efforts, building stamina without one long slog.', blocks: [{ label: 'Frame one', reps: [{ count: 4, distance: 200 }, { count: 1, distance: 800 }, { count: 4, distance: 200 }] }, { label: 'Frame two', reps: [{ count: 1, distance: 1000 }, { count: 4, distance: 200 }] }, { label: 'Finish', reps: [{ count: 1, distance: mile }] }] },
    { name: 'The Woven Ladder', focus: 'Blend 400s, 300s and one 800m effort into a steady, repeatable pattern.', blocks: [{ label: 'Open', reps: [{ count: 3, distance: 400 }, { count: 4, distance: 300 }] }, { label: 'Turn', reps: [{ count: 1, distance: 800 }, { count: 4, distance: 300 }] }, { label: 'Finish', reps: [{ count: 1, distance: mile }] }] },
    { name: 'The Compass', focus: 'Move from short rhythm to long strength, then finish the session with a mile.', blocks: [{ label: 'North', reps: [{ count: 6, distance: 200 }, { count: 3, distance: 400 }] }, { label: 'South', reps: [{ count: 2, distance: 600 }, { count: 1, distance: 1000 }] }, { label: 'Finish', reps: [{ count: 1, distance: mile }] }] }
  ];

  const generateButton = document.getElementById('generate-button');
  const sessionName = document.getElementById('session-name');
  const sessionFocus = document.getElementById('session-focus');
  const blockList = document.getElementById('block-list');
  const totalDistance = document.getElementById('total-distance');
  const distanceMile = document.getElementById('distance-mile');
  let sessionIndex = 0;

  function formatRep(rep) {
    return rep.count === 1 ? rep.distance + 'm' : rep.count + ' x ' + rep.distance + 'm';
  }

  function blockDistance(block) {
    return block.reps.reduce((total, rep) => total + (rep.count * rep.distance), 0);
  }

  function totalFor(session) {
    return session.blocks.reduce((total, block) => total + blockDistance(block), 0);
  }

  function renderBlock(block, blockIndex, total) {
    const isFinish = blockIndex === total - 1;
    return block.reps.map((rep) => {
      const distance = rep.count * rep.distance;
      const repLabel = isFinish ? '1 mile' : formatRep(rep);
      const fill = Math.min(100, (distance / mile) * 100).toFixed(1) + '%';
      return '<div class="rep-row' + (isFinish ? ' rep-row--finish' : '') + '" style="--block-fill:' + fill + '"><span>' + repLabel + '</span><strong>' + distance.toLocaleString('en-GB') + 'm</strong></div>';
    }).join('');
  }

  function renderSession() {
    const session = sessions[sessionIndex];
    const distance = totalFor(session);
    const miles = distance / 1609;
    sessionName.textContent = session.name;
    sessionFocus.textContent = session.focus;
    totalDistance.textContent = distance.toLocaleString('en-GB') + 'm';
    distanceMile.textContent = 'about ' + miles.toFixed(1) + ' miles';
    blockList.innerHTML = session.blocks.map((block, index) => renderBlock(block, index, session.blocks.length)).join('');
  }

  generateButton.addEventListener('click', function () {
    sessionIndex = (sessionIndex + 1) % sessions.length;
    renderSession();
  });

  renderSession();
}());
