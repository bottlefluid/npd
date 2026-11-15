// NPD (NewBGI) — Leveling 1..1,000,000, 12,000+ Difficulty-Leveled Race Passages,
// and Season 1 Battlepass (Harvest Drift — Thanksgiving Edition, Ends Dec 1).
(function (global) {
  'use strict';

  const MAX_LEVEL = 1000000;

  // Closed-form cumulative XP required to reach a given level (1..1,000,000).
  // Level 1 = 0 XP, Level 2 = 500 XP, Level 3 = 1,150 XP, ..., Level 1,000,000 = 75,000,275,000,000 XP
  // (well below Number.MAX_SAFE_INTEGER so integer arithmetic remains 100% exact).
  function npdTotalXpForLevel(level) {
    const lv = Math.max(1, Math.min(MAX_LEVEL, Math.floor(Number(level) || 1)));
    const n = lv - 1;
    if (n <= 0) return 0;
    return 425 * n + 75 * n * n;
  }

  function npdLevelXpReq(level) {
    const lv = Math.max(1, Math.min(MAX_LEVEL - 1, Math.floor(Number(level) || 1)));
    return npdTotalXpForLevel(lv + 1) - npdTotalXpForLevel(lv);
  }

  function npdLevelFromXp(xp) {
    const cleanXp = Math.max(0, Math.floor(Number(xp) || 0));
    let lo = 1;
    let hi = MAX_LEVEL;
    while (lo < hi) {
      const mid = Math.floor((lo + hi + 1) / 2);
      if (npdTotalXpForLevel(mid) <= cleanXp) lo = mid;
      else hi = mid - 1;
    }
    return lo;
  }

  function npdCalcLevelInfo(xp) {
    const cleanXp = Math.max(0, Math.floor(Number(xp) || 0));
    const level = npdLevelFromXp(cleanXp);
    const curStart = npdTotalXpForLevel(level);
    const nextStart = level >= MAX_LEVEL ? curStart : npdTotalXpForLevel(level + 1);
    const into = cleanXp - curStart;
    const needed = Math.max(1, nextStart - curStart);
    const pct = level >= MAX_LEVEL ? 100 : Math.max(0, Math.min(100, (into / needed) * 100));
    return {
      level,
      xp: cleanXp,
      into,
      needed,
      pct,
      isMax: level >= MAX_LEVEL
    };
  }

  function npdFormatLevel(lv) {
    return (Math.max(1, Math.floor(Number(lv) || 1))).toLocaleString('en-US');
  }

  // 10 Difficulty Tiers covering Levels 1..1,000,000
  const NPD_TIERS = [
    { tier: 1, minLv: 1, maxLv: 4, name: 'Tier I — Ignition', label: 'Warmup Sprint', desc: 'Short, punchy everyday runs for new drivers.', xpMult: 1.0, capMult: 1.0 },
    { tier: 2, minLv: 5, maxLv: 14, name: 'Tier II — City Grid', label: 'Street Circuit', desc: 'Balanced flow passages with light punctuation.', xpMult: 1.25, capMult: 1.2 },
    { tier: 3, minLv: 15, maxLv: 39, name: 'Tier III — Redline', label: 'Midnight Highway', desc: 'Multi-clause runs with commas, numbers, and rhythm shifts.', xpMult: 1.55, capMult: 1.4 },
    { tier: 4, minLv: 40, maxLv: 99, name: 'Tier IV — Qualifying', label: 'Apex Qualifying', desc: 'Hyphens, numerals, and faster finger transitions.', xpMult: 1.9, capMult: 1.65 },
    { tier: 5, minLv: 100, maxLv: 499, name: 'Tier V — Pro License', label: 'Pro Grid', desc: 'Technical automotive and engineering paragraphs.', xpMult: 2.3, capMult: 1.9 },
    { tier: 6, minLv: 500, maxLv: 2499, name: 'Tier VI — Championship', label: 'Championship Heats', desc: 'Dense punctuation with percentages, colons, and mixed caps.', xpMult: 2.8, capMult: 2.25 },
    { tier: 7, minLv: 2500, maxLv: 14999, name: 'Tier VII — Endurance', label: 'Hypercar Endurance', desc: 'Extended literary and telemetry prose at high pace.', xpMult: 3.4, capMult: 2.6 },
    { tier: 8, minLv: 15000, maxLv: 99999, name: 'Tier VIII — Telemetry', label: 'Telemetry Overload', desc: 'Code, physics, and strategy strings under strict accuracy.', xpMult: 4.1, capMult: 3.0 },
    { tier: 9, minLv: 100000, maxLv: 499999, name: 'Tier IX — Legend', label: 'Apex Legend', desc: 'Elite mixed-symbol passages for six-digit level racers.', xpMult: 5.0, capMult: 3.5 },
    { tier: 10, minLv: 500000, maxLv: 1000000, name: 'Tier X — Sovereign', label: 'Millionaire Sovereign', desc: 'Grandmaster marathons built for Level 500,000+.', xpMult: 6.2, capMult: 4.2 }
  ];

  function getNpdTierMeta(level) {
    const lv = Math.max(1, Math.min(MAX_LEVEL, Math.floor(Number(level) || 1)));
    for (let i = 0; i < NPD_TIERS.length; i++) {
      const t = NPD_TIERS[i];
      if (lv >= t.minLv && lv <= t.maxLv) return t;
    }
    return NPD_TIERS[0];
  }

  function npdRaceRewards(opts) {
    const wpm = Math.max(0, Number(opts && opts.wpm) || 0);
    const acc = Math.max(0, Math.min(100, Number(opts && opts.acc) || 0));
    const place = Math.max(1, Math.min(8, Number(opts && opts.place) || 1));
    const level = Math.max(1, Math.floor(Number(opts && opts.level) || 1));
    const isPrem = !!(opts && opts.isPrem);
    const prevXp = Math.max(0, Math.floor(Number(opts && opts.prevXp) || 0));

    const tier = getNpdTierMeta(level);
    const placeCaps = place === 1 ? 75 : place === 2 ? 48 : place === 3 ? 32 : 18;
    const placeXp = place === 1 ? 155 : place === 2 ? 110 : place === 3 ? 85 : 60;

    const rawCaps = (placeCaps + Math.round(wpm * 0.65) + (acc >= 97 ? 20 : acc >= 92 ? 10 : 0)) * tier.capMult * (isPrem ? 1.35 : 1);
    const rawXp = (placeXp + Math.round(wpm * 1.9) + Math.round(acc * 0.9)) * tier.xpMult * (isPrem ? 1.25 : 1);

    const capsEarned = Math.max(10, Math.round(rawCaps));
    const xpEarned = Math.max(50, Math.round(rawXp));
    const bpXpEarned = Math.max(45, Math.round((place === 1 ? 125 : place === 2 ? 95 : 70) + wpm * 0.55 + (isPrem ? 30 : 0)));

    const oldLv = npdLevelFromXp(prevXp);
    const newLv = npdLevelFromXp(prevXp + xpEarned);
    const levelsGained = Math.max(0, newLv - oldLv);
    const levelUpBonusCaps = levelsGained > 0 ? Math.min(5000, levelsGained * (35 + tier.tier * 15)) : 0;

    return {
      tier: tier.tier,
      tierName: tier.name,
      capsEarned: capsEarned + levelUpBonusCaps,
      raceCaps: capsEarned,
      levelUpBonusCaps,
      xpEarned,
      bpXpEarned,
      oldLv,
      newLv,
      levelsGained
    };
  }

  // Combinatorial + curated passage bank generating 12,000+ unique, fluent passages (1,200+ per Tier 1..10).
  const T1_OPENERS = [
    'Every quick sprint builds real rhythm',
    'Clean keystrokes carry the car down the straight',
    'Smooth hands win more races than wild speed',
    'Warm up your fingers before the green light flashes',
    'Small steady gains stack into fast personal records',
    'Stay calm on short words and glide through spaces',
    'A quiet desk and focused eyes sharpen every lap',
    'Good timing at the start saves energy at the finish',
    'Keep your wrists loose and watch one word ahead',
    'First gear launches hard when every key lands clean',
    'Simple words reward steady breathing and clear sight',
    'Morning sessions set the pace for the whole leaderboard'
  ];
  const T1_MIDDLES = [
    'across the fresh blacktop',
    'around the first wide corner',
    'under crisp stadium floodlights',
    'past the glowing starting gate',
    'along the crimson pit lane',
    'through the cool evening breeze',
    'toward the bright checkered line',
    'inside the quiet practice tunnel',
    'beside the roaring grandstands',
    'without a single wasted motion'
  ];
  const T1_ENDINGS = [
    'while the engine hums at idle.',
    'before the rival lane catches up.',
    'until your best time drops again.',
    'and earns fresh bottlecaps for the garage.',
    'as the tires grip the painted stripe.',
    'and proves consistency beats panic every day.',
    'so every clean lap feels lighter than the last.',
    'with zero hesitation between short bursts.',
    'while the crowd cheers from the upper deck.',
    'and leaves room for a final nitro push.'
  ];

  const T2_OPENERS = [
    'Drivers who look two words ahead rarely stumble on sudden shifts',
    'Down the backstretch, balanced pacing turns average runs into clean victories',
    'Fresh paint catches the streetlights as five engines wait for launch',
    'Every comma marks a gentle breath before accelerating into the next phrase',
    'Steady accuracy builds momentum faster than frantic guessing ever could',
    'Trading the lead at seventy miles per hour demands calm focus',
    'New tracks reward players who read punctuation as carefully as letters',
    'Late braking into the hairpin opens an inside line on the exit',
    'Holding a crisp rhythm across fifty words locks in top placement',
    'Practice laps train muscle memory so tough combinations feel automatic',
    'Sharp eyes spot tricky endings long before the cursor arrives there',
    'Clean exits from tight chicanes carry extra speed all the way home'
  ];
  const T2_MIDDLES = [
    ', while sparks dance under the rear diffuser,',
    ', even when rival taillights flicker ahead,',
    ', as rain clouds gather above the circuit,',
    ', keeping the tachometer pinned near redline,',
    ', without letting a single typo break stride,',
    ', right as the boost gauge reaches full pressure,',
    ', along the sweeping downhill embankment,',
    ', through crisp autumn air and falling leaves,',
    ', while pit radios crackle with split times,',
    ', under amber warning lights along the wall,'
  ];
  const T2_ENDINGS = [
    'and seals a well-earned win on the final meter.',
    'before the pack storms across the timing strip.',
    'making every tenth of a second count on the board.',
    'while the telemetry screen logs a smooth recovery.',
    'turning careful typing into pure mechanical speed.',
    'and setting up a fearless attack into lap two.',
    'proving that control always unlocks top velocity.',
    'as cheers echo down the concrete pit straight.',
    'leaving the competition chasing your exhaust note.',
    'and adding another trophy to the winter shelf.'
  ];

  const T3_OPENERS = [
    'At 11:45 PM, twenty-four calibrated dynos hummed beneath the proving grounds',
    'Three consecutive sectors separated the front-runners by less than 0.14 seconds',
    'Mechanics double-checked lug torque, brake ducts, and cold tire pressures',
    'Every championship driver learns early that smooth inputs preserve front grip',
    'Crossing the timber bridge at 142 mph shook dust from the steel trusses',
    'Between qualifying sessions, engineers trimmed rear wing angles by two degrees',
    'A sudden headwind across Turn 7 tested every team\'s aerodynamic balance',
    'Headlights sliced through coastal fog as the convoy climbed toward Ridge Pass',
    'Clean typing under pressure mirrors trail braking into an off-camber corner',
    'Telemetry traces from Run 18 showed earlier throttle application on exit',
    'Autumn rain cooled the asphalt to 58 degrees, shifting peak traction higher',
    'Switching from compound one to sprint rubber shaved four tenths per sector'
  ];
  const T3_MIDDLES = [
    'while spotters called gaps of 3, 6, and 12 car lengths',
    'as twin turbochargers spooled past 6,400 RPM in third gear',
    'and onboard computers sampled steering angles 250 times per second',
    'despite bumpy curbing along the outer apex of Turn 9',
    'even after the safety pace car peeled into pit entrance',
    'with carbon-ceramic rotors glowing dull orange in the dusk',
    'because crisp transitions between left and right hands save milliseconds',
    'through narrow canyon walls that amplified every downshift bark',
    'under floodlights rated at 1,800 lux across the starting apron',
    'while split-second corrections kept the chassis neutral through traffic'
  ];
  const T3_ENDINGS = [
    'to clinch Session 4 by just two hundredths of a tick.',
    'locking in Pole Position ahead of Sunday\'s endurance finale.',
    'and rewarding patient discipline with effortless mid-corner pace.',
    'before cooling fans kicked in along the quiet paddock row.',
    'while the timing tower flashed a new class track record.',
    'confirming that preparation wins long before green flags wave.',
    'and banking crucial season points toward the top-tier bracket.',
    'until crisp dusk settled over the empty asphalt ribbon.',
    'proving clean keystrokes stay undefeated against reckless bursts.',
    'and pushing average velocity well past the target benchmark.'
  ];

  const T4_OPENERS = [
    'Semi-active suspension updates damping rates every four milliseconds; consequently, mid-corner bumps vanish',
    'When typing hyphenated phrases like "rear-wheel-drive" or "high-revving," rhythm matters far more than force',
    'Race engineers monitor oil temperatures (218-235 F), coolant flow, and exhaust back-pressure simultaneously',
    'Well-tuned gear ratios keep the engine between 5,800 and 8,200 RPM across most technical circuits',
    'First-gear launch control holds exact wheel-slip targets; second gear demands decisive clutch engagement',
    'Data-driven warmups track keystroke intervals across 12-word bursts to eliminate common pinky hesitations',
    'Aero efficiency improves dramatically when underbody venturi tunnels seal cleanly over smooth concrete',
    'A well-balanced braking bias -- roughly 62% front to 38% rear -- prevents rear-axle lockup under load',
    'Veteran typists treat apostrophes, hyphens, and capitals as natural musical accents inside longer clauses',
    'Long-distance grand tourers combine forged aluminum wishbones with whisper-quiet cabin acoustics',
    'Dual-clutch transmissions execute crisp upshifts in under 45 milliseconds without interrupting boost',
    'Qualifying laps allow zero hesitation: one missed apex or misread word costs half a second cleanly'
  ];
  const T4_MIDDLES = [
    '; meanwhile, side-by-side drafting packs gain 9-14 mph at the end of the kilometer straight,',
    '; moreover, cold morning air boosts intake oxygen density by nearly four percent,',
    ' -- a critical edge when three-wide battles develop before the heavy braking marker --',
    '; as a result, driver heart rates climb steadily from 118 to 156 beats per minute,',
    ', balancing knife-edge oversteer against clean keyboard precision at full chat,',
    '; remarkably, zero mechanical failures occurred over the 400-mile reliability stress test,',
    ' (measured across twelve consecutive timed intervals without pausing for breath),',
    '; therefore, crisp left-hand accuracy unlocks faster right-hand sweeps on the keyboard,',
    ' -- proof that steady technique scales gracefully even as sentence complexity climbs --',
    '; at the same time, pit crews staged four fresh tires and calibrated torque wrenches,'
  ];
  const T4_ENDINGS = [
    'leaving little doubt which garage earned top qualifying honors.',
    'and setting a blistering pace that held through twilight.',
    'while analysts verified every millisecond against laser beam traps.',
    'so long-run consistency remains your strongest tactical weapon.',
    'culminating in an unmistakable personal-best graph across all splits.',
    'and proving multi-tasking clarity thrives under high speed.',
    'even as shifting gusts crossed the exposed cliffside sector.',
    'securing a clean sweep across all three qualifying sessions.',
    'with rock-solid accuracy hovering above ninety-eight percent.',
    'before mechanics wheeled the warm machine back under canvas.'
  ];

  const T5_OPENERS = [
    'Engineer K. Takahashi noted, "Peak torque hits at 5,400 RPM, yet transient boost response matters twice as much."',
    'Project NPD-2026 deployed 18.4 kW of thermal cooling upgrades across 14 endurance chassis prior to November testing.',
    'Unlike legacy keyboards with 8ms polling, 1000Hz optical switches register clean actuation in 0.9 milliseconds.',
    'Telemetry Pack v4.2 parses 120 FPS frame timings, WPM rolling windows, and keystroke variance with sub-percent drift.',
    'During Autumn Test #9, prototype #07 lapped Silverstone National in 54.82s on medium-compound test tires.',
    '"Never chase a bad word with anger," advised Team Principal Vance. "Reset cleanly on the spacebar and drive on."',
    'Lightweight carbon-kevlar weave dropped unsprung mass by 4.6 kg per corner, sharpening turn-in response instantly.',
    'In production coding as in racing, concise architecture beats bloated workarounds: clean modules stay fast under load.',
    'Between 1966 and 1991, wind-tunnel ground-effect studies completely rewrote how race teams sculpted underbody floors.',
    'Compression ratios near 13.5:1 require ultra-stable ignition timing maps to prevent detonation at high manifold pressure.',
    'Modern sim-racers calibrate load-cell pedals to 65 kg peak force so braking pressure matches muscle memory cleanly.',
    'High-tier drivers sustain 115+ WPM not by hammering keys harder, but by keeping finger travel below 2.5 millimeters.'
  ];
  const T5_MIDDLES = [
    ' -- translating directly to 0.37 seconds gained per sector on tight street layouts --',
    ' while maintaining 99.1% input fidelity across dense alphanumeric sequences',
    ' despite ambient tarmac temperatures dropping from 74.2 F down to 49.8 F',
    ' according to Pit Box Report #14B released at 06:30 UTC,',
    ' as brushless cooling turbines spun to 14,500 RPM inside the sidepods',
    ' with differential lock maps tuned at 35% power and 50% coast',
    ' combining crisp uppercase shifts with seamless hyphen and colon discipline',
    ' while acoustic engineers tuned titanium headers for zero cabin resonance',
    ' across 280 test laps logged in the central engineering archive',
    ' under strict technical scrutiny from chief stewards in Garage #04'
  ];
  const T5_ENDINGS = [
    ', cementing a benchmark every rival team spent winter scrambling to match.',
    ', raising the championship bar far beyond preseason computer simulations.',
    ', validating hundreds of midnight hours spent refining firmware and chassis geometry.',
    ', delivering razor-sharp repeatability from opening lap through final cooldown.',
    ', proving clean engineering always speaks louder than promotional hype.',
    ', earning unanimous praise throughout the international paddock.',
    ', while live splits surged three tenths green in every single micro-sector.',
    ', leaving spare parts untouched inside the carbon flight cases.',
    ', turning complex punctuation into effortless muscle-memory flow.',
    ', and writing a fresh chapter in the division record books.'
  ];

  const T6_OPENERS = [
    'CFD simulations (240 million hexahedral cells at Re = 5.2x10^6) predicted a 12.8% downforce gain at 165 mph:',
    'Championship standings stood deadlocked at 312.5 points each; consequently, Saturday\'s 95-lap sprint decided 65% of the title:',
    'At 98.6% accuracy, a 130 WPM run beats an erratic 145 WPM burst burdened by repeated Backspace corrections:',
    'Battery management on hybrid hypercars harvests 420 kJ per braking zone via MGU-K, delivering +190 kW over 4.8 seconds:',
    'Archival blueprints from Chassis #019 specify Grade-5 Ti-6Al-4V fasteners torqued to 88 Nm plus 45-degree angle turn:',
    'Notice how capitals, colons, percentages (such as 14.7%), and long Latin roots demand steady finger independence:',
    'Acoustic Doppler arrays measured exhaust pulse frequencies climbing from 142 Hz at idle to 618 Hz past redline:',
    'Pit Wall Command ("Box, box -- fuel target +1.2L") triggered a 2.18-second four-corner wheel swap under floodlights:',
    'Longitudinal tire stiffness follows Pacejka Magic Formula curves: peak slip ratios cluster tightly between 7% and 11%:',
    'When optimizing render loops for 144Hz monitors, keeping frame budgets under 6.94ms avoids dropped inputs mid-race:',
    'Harvest Drift Season 1 celebrates crisp autumn twilight tracks: cranberry sunset tones over slate-gray tarmac:',
    'Laser-scanned circuit meshes capture millimeter elevation shifts, off-camber crown profiles, and concrete seam bumps:'
  ];
  const T6_MIDDLES = [
    ' data verified across 18 instrumentation channels (load cells, Pitot tubes, and IR tire pyrometers)',
    ' even though sudden crosswinds gusted between 22 and 34 knots along the coastal straightaway',
    ' forcing navigators to adjust fuel-mix trim maps on the fly between Sectors 2 and 3',
    ' while distributed telemetry nodes streamed 48 KB/s of encrypted diagnostic frames',
    ' as thermal cameras tracked exhaust headers peaking around 915 C under full boost',
    ' balancing razor-thin drag budgets against mandatory 180 kg cornering downforce',
    ' with multi-stage anti-roll bars calibrated for brisk transitions through fast Esses',
    ' demanding total composure on Shift, number row, and punctuation transitions',
    ' as automated pit boards flashed live deltas of -0.14s, -0.29s, and -0.41s',
    ' proving elite accuracy stays resilient even when sentence density doubles'
  ];
  const T6_ENDINGS = [
    ' -- an extraordinary margin across 5,800 meters of unforgiving asphalt.',
    ' before dark November rain swept dramatically across the grandstand lights.',
    ' confirming that preparation and discipline scale cleanly at championship pace.',
    ' as every split indicator lit vivid purple across the main timing screen.',
    ' locking down the Season Trophy with twelve championship points to spare.',
    ' while analysts archived over 4.2 gigabytes of synchronized lap traces.',
    ' demonstrating precision mechanics under blistering endurance stress.',
    ' and establishing a golden standard for future prototype development.',
    ' turning chaotic corner entry into calm, surgical exit speed.',
    ' leaving zero doubt about who mastered this circuit\'s trickiest sector.'
  ];

  const T7_OPENERS = [
    'Through the predawn mist of Hour 19, Prototype #44 sustained 212 mph down Mulsanne despite 1,450 miles of cumulative wear',
    'Bernoulli\'s principle paired with Venturi underfloor tunnels generates immense vertical load without penalizing straightaway drag',
    'Literary rhythm in extended passages relies on cadence variation: short declarative strikes alternating with sweeping subordinate clauses',
    'Cryogenic heat treatment alters martensitic grain structure in transmission shafts, boosting fatigue endurance by nearly 38.4%',
    'At 3,000+ levels, typing mastery shifts from reactive sight-reading into chunked syllable synthesis across entire clauses',
    'Composite monocoques weigh merely 74 kilograms yet withstand static crush loads exceeding 110 kilonewtons in FIA impact tests',
    'Harmonic balance across flat-plane V8 crankshafts yields feral throttle sharpness, though secondary vibrations demand careful isolation',
    'High-speed cornering blends centripetal physics with human nerve: drivers trust unseen invisible air pressing carbon bodywork tarmac-ward',
    'Precision CNC five-axis billet uprights machine complex caliper mounts within 0.008mm tolerances out of aerospace-grade 7075 aluminum',
    'Night stints force visual acuity onto reflective apex bollards while peripheral memory recalls every crest, dip, and rumble strip',
    'Synchronizing clutch release, heel-toe throttle blips, and steady steering angle builds one fluid kinematic dance through tight switchbacks',
    'Across endurance marathons, hydration, electrolytes, and relaxed grip prevent forearm fatigue long before hardware limits appear'
  ];
  const T7_MIDDLES = [
    ', where marginal gains of 0.02% per lap accumulate into insurmountable multi-lap leads over rival squads',
    '; meanwhile, inertial measurement units integrate 3-axis roll, pitch, and yaw rates for predictive stability modeling',
    ' -- a synthesis of thermodynamics, aerodynamics, and split-second intuition perfected over decades of motorsport',
    ', testing endurance typists across dense multi-syllable technical vocabulary without losing rhythm on complex endings',
    '; consequently, fatigue reveals every flaw in posture, wrist angle, or rushed keystroke transitions',
    ', even as worn rubber beads outside the racing groove penalize anyone straying six inches off-line',
    '; furthermore, digital twin simulators run ten thousand virtual weather permutations overnight before Dawn Practice',
    ', capturing the subtle beauty of kinetic sculpture sliding cleanly at 1.9 lateral G',
    ' (cross-referenced against GPS differential timing accurate to two centimeters horizontally)',
    '; in essence, mastery looks effortless precisely because every error path was engineered away months ago'
  ];
  const T7_ENDINGS = [
    ', underscoring why patience separates legends from temporary contenders.',
    ', illuminating the thin boundary between mechanical failure and timeless triumph.',
    ', proving endurance championships belong to teams who respect every tiny detail.',
    ', delivering spine-tingling velocity balanced on four patches of rubber no wider than postcards.',
    ', and forging unbroken synergy between machine telemetry and human reflex.',
    ', while mechanics quietly prepare fresh rotors for the decisive dawn stint.',
    ', echoing the timeless truth that effortless speed grows from disciplined habits.',
    ', cementing Heroic Run #77 in endurance folklore for generations ahead.',
    ', turning punishing mechanical complexity into pure, intoxicating flow.',
    ', until dawn light breaks gold over the wet finish straight.'
  ];

  const T8_OPENERS = [
    'const clampWpm = (chars, ms) => ms > 250 ? Math.round((chars / 5) / (ms / 60000)) : 0; // Telemetry v8.4',
    'Packet[0x4F]: { rpm: 8420, gear: 5, boost_kPa: 238.6, throttle: 99.4%, brake_bar: 0.0, slip: 0.042 };',
    'Navier-Stokes momentum conservation: rho * (du/dt + u*grad(u)) = -grad(p) + mu * laplacian(u) + f_ext.',
    'SELECT driver_id, MAX(wpm), AVG(acc) FROM race_logs WHERE tier >= 8 AND valid = TRUE GROUP BY driver_id;',
    'FFT spectral plot revealed torsional resonance peaking around 412.5 Hz -> mitigated via dual-mass damper.',
    'HTTP/2 POST /api/race/verify -> 200 OK {"verified":true,"latencyMs":11.4,"capsAwarded":480,"tier":8}.',
    'Kalman filter state update: x_k|k = x_k|k-1 + K_k * (z_k - H * x_k|k-1), stabilizing noisy wheel encoders.',
    'Git diff --stat origin/main: 42 files changed, 8,940 insertions(+), 612 deletions(-) // Build #9042.',
    'Laser interferometry clocked caliper deflection at 0.041mm under 1,250 N pedal effort during Panic Stop #3.',
    'Regex check /^[A-Z0-9._%+-]{3,24}$/ validates pilot tags before writing immutable RTDB race keyframes.',
    'Quaternion slerp(q0, q1, t) smoothly interpolates 3D chassis attitude across steep 18-degree banked ovals.',
    'CAN-bus @ 1Mbps streamed ABS wheel-speed sensors [FL:184.2, FR:184.5, RL:181.9, RR:182.1] without drop.'
  ];
  const T8_MIDDLES = [
    ' | Verify CRC32 checksum [0x9A7E4C12] before committing encrypted race frames to cold storage,',
    ' -- note: floating-point rounding drift below 1e-9 remains negligible across 60Hz tick steps --',
    ' while Kubernetes workers autoscaled from 4 to 28 pods cleanly under midnight tournament load,',
    ' [Delta: -0.084s vs Session Target | Tyre Core: 94.6C | Ambient: 11.2C | Wind: 6.4 m/s NW]',
    ' ; edge-case guards reject NaN, Infinity, or sub-20ms macro intervals cleanly at Layer 1',
    ' && benchmark loops confirmed 0.00% memory leakage across 100,000 consecutive string diffs',
    ' // Switch-case vector dispatch eliminates branching overhead inside critical physics loops',
    ' :: Matrix inversion via Cholesky decomposition executes 3.7x faster than naive Gaussian pass',
    ' -- ensuring deterministic lockstep replay on Windows, Linux, and mobile touch devices alike --',
    ' => alerting pit telemetry consoles whenever oil viscosity deviates +/- 4.5% from baseline'
  ];
  const T8_ENDINGS = [
    ' -> Status: NOMINAL [Build Verified].',
    '; mission parameters remain 100% within tolerance.',
    ' && zero anomalies logged across 4,096 verification vectors.',
    ' // Pipeline complete: ship cleanly to Tier 8 Finals.',
    '; telemetry archive signed and sealed at 23:59:59 UTC.',
    ' -> Next checkpoint: Sector 3 speed trap @ 312.8 km/h.',
    '; diagnostic suite green (248/248 assertions passed).',
    ' && chassis balance rated 9.94/10 by Chief Engineer.',
    ' // Performance headroom verified at 2.4x peak demand.',
    '; ready for launch when Stage Lights drop to green.'
  ];

  const T9_OPENERS = [
    '[TIER-IX TELEMETRY] Mach-0.31 slipstream drag coefficient (Cd=0.284) collided with 1,890 Nm torque curve @ Turn 4;',
    '"Precision isn\'t perfectionism -- it\'s refusing to guess when exact values exist," remarked Chief Analyst Orlov (Run #8841).',
    'Polyphonic key-rollover diagnostics test NKRO matrices under 16-key simultaneous bursts: [Q,W,E,R] + [7,8,9] -> 0 ghosting!',
    'Six-figure level drivers read whole punctuation clusters (" -- ", ": [", "%; ") without breaking finger placement off home row.',
    'Titanium exhaust manifolds shift spectrum from cherry-orange (790C) through straw-gold into incandescent pale white (1,040C).',
    'Differential geometry defines geodesic curves as shortest paths across curved Riemannian manifolds -- essentially cosmic apexes.',
    'Sub-millisecond UDP netcode interpolates opponent sprites 60x/sec while authoritative anti-cheat validates char/time variance.',
    'Aerospace autoclaves cure pre-preg carbon tubs under 7 bar pressure & 180C thermal soak across precise 4-hour ramp profiles.',
    'Cryptographic SHA-256 digests guarantee leaderboard replays haven\'t been tampered with between client race end and vault sync.',
    'Fibonacci spiral gear-tooth micro-relieving cuts bevel whine by 14.3 dBA while sustaining 98.7% mechanical drivetrain efficiency.',
    'Quantum efficiency improvements in solid-state LiDAR sensors now map wet road texture 320 meters ahead in dense fog.',
    'High-velocity accuracy hinges on zero eye-bounce: anchor gaze two tokens ahead and trust proprioceptive finger mapping.'
  ];
  const T9_MIDDLES = [
    ' :: Calibration Vector [#902-K]: { gain: 1.482, bias: -0.0031, damping: 0.914 } --',
    ' (compare 2024 baseline [1.142s] vs 2026 active-aero spec [0.986s], net -13.66%) --',
    ' | Cross-checking Pitot rake #1..#12 reveals zero boundary-layer separation beneath rear strakes |',
    ' ; astonishingly, human reaction deltas dropped from 182ms down to 134ms after deliberate drills',
    ' [Warn: Crosswind Shear +19kt -> Increase Front Flap +1.5 deg / Trim Brake Bias -0.8% Rear]',
    ' & every nested clause tests pinky endurance across Shift, Brackets, Quotes, and Number-Row shifts',
    ' -> validating real-time WPM moving-average smoothing without clipping genuine lightning bursts',
    ' :: Harmonizing 300-word endurance fluency with algorithmic symbol switching cleanly',
    ' (note exact casing sensitivity: Tier-IX, GT3-RS, MGU-H, CFD-77, Apex#900)',
    ' -- compressing ten thousand hours of craft into razor-sharp, unshakeable poise --'
  ];
  const T9_ENDINGS = [
    ' [VERDICT: TOP-0.1% APEX CERTIFIED].',
    '; every split remains etched permanently atop the seasonal pantheon.',
    ' => Lock telemetry & advance toward Level 500,000 Sovereign Tier.',
    ' -- a breathtaking masterclass in controlled, unhurried velocity.',
    '; benchmark shattered by 4.18 standard deviations above circuit mean.',
    ' [STATUS: ZERO CORRECTIONS // PURE UNINTERRUPTED VELOCITY].',
    '; only legend-tier fingers bridge prose, math, and machine syntax this cleanly.',
    ' => Final Sector Cleared: 99.6% Precision Verified.',
    '; telemetry graphs glow solid crimson across all six sectors.',
    ' -- proving speed and stillness are identical at the absolute limit.'
  ];

  const T10_OPENERS = [
    '[SOVEREIGN TIER X // LV 500,000-1,000,000] Telemetry Digest #99,412: { vMax: "388.4 km/h", peakG: 4.18, fuel: "4.72L/lap" } --',
    'Chronos Telemetry Protocol v10.0: "To command 1,000,000 levels, master syntax, cadence, numerals & prose in one breath!"',
    'Integral Sum: sum_{k=1}^{10^6} (425 + 150*k - 75) = 75,000,275,000,000 XP; Proof verified cleanly without floating drift!',
    'At 300+ million meters driven, Sovereign Chassis #001 blends forged tungsten ballast, active plasma aero, and zero-lag optical links.',
    'Benchmark Alert [1000Hz]: 18-chord transition test ("a7_Z! -> K9#m? -> [v3.94]") demands ice-cold composure across every finger!',
    'From November Harvest tracks through crisp December snow & January fireworks, legends never surrender clean mechanical rhythm:',
    'Micro-telemetry [FL:101.8C | FR:102.1C | RL:98.9C | RR:99.4C]: +/-0.4C core balance confirms alien-level throttle discipline.',
    'Deep syntax gauntlet: export const hyperApex = (dx = 0.001, k = 1e6) => Math.hypot(dx * 3.14159, k % 97) > 0 ? "WIN" : "PUSH";',
    'Historically, fewer than 0.01% of drivers conquer Tier X gauntlets cleanly at 100+ WPM without glancing once at the keys:',
    'Supercomputer clusters computed 1.44 trillion aero combinations; human intuition still picked the boldest braking point at Turn 1.',
    'Precision Spec: Tolerance +/-0.002mm | Torque: 112.5 Nm @ 45 deg | Boost: 3.15 Bar | Lambda: 0.84 | EGT: 982.4 C -> OPTIMAL.',
    'When every character -- uppercase, symbol, number, hyphen, or lyrical clause -- lands silently on beat, typing becomes flight.'
  ];
  const T10_MIDDLES = [
    ' :: Synchronizing Phase-A [Alpha/Numeric/Symbol] -> Phase-B [Prose/Telemetry] with < 0.08s word transitions ::',
    ' [Audit: 99.8% Purity | Zero Backspace Crutch | Split-Pace: +24.6 WPM over Sovereign Par | Rank: #1]',
    ' -> Note exact boundary tokens: {Lv:1,000,000}, (99.94%), [T10-SOV], & /api/race/grand-prix?season=S1!',
    ' ; channeling 7.5x10^13 cumulative mastery points into one effortless, hypnotic blast down the main straight',
    ' -- defying crosswinds, tricky capitalization, nested brackets (like [this!]), and unforgiving cadence flips --',
    ' | Real-Time Hash [0xF100_A9E2]: Verified @ 144Hz Display Loop with 0.0ms Dropped Input Frame |',
    ' ; every split second whispers focus: breathe, scan 3 words forward, release tension, strike clean',
    ' :: Across 12,000 calibrated tracks, only Sovereign Tier fuses machine code, championship prose, and math ::',
    ' -> Calibrating boost pressure (294.7 kPa -> 318.2 kPa) as exhaust flames lick gold under floodlights ->',
    ' [Checksum OK | Sector 1: PURPLE | Sector 2: PURPLE | Sector 3: PURPLE | Pit Delta: -1.428s]'
  ];
  const T10_ENDINGS = [
    ' == CHAMPION CROWNED AT THE PINNACLE OF NPD LEVEL 1,000,000 ==',
    '; telemetry immortalized in gold upon the Grand Sovereign Hall.',
    ' -> 100% Verified Mastery: Fuel Empty, Checkered Flag Claimed!',
    ' // Legend Status Confirmed Across All 10 Difficulty Tiers.',
    '; nothing on tarmac -- or QWERTY -- stands faster tonight.',
    ' == FINAL SPRINT LOCKED: SOVEREIGN RECORD SHATTERED ==',
    ' -> Telemetry Complete [10/10 Tiers Conquered Cleanly].',
    '; precision forged from ten thousand disciplined races.',
    ' // End of Line: Sovereign Victory Logged Permanently.',
    ' == ALL RIVAL SPLITS ECLIPSED -- APEX REACHED =='
  ];

  const TIER_TABLES = [
    [T1_OPENERS, T1_MIDDLES, T1_ENDINGS],
    [T2_OPENERS, T2_MIDDLES, T2_ENDINGS],
    [T3_OPENERS, T3_MIDDLES, T3_ENDINGS],
    [T4_OPENERS, T4_MIDDLES, T4_ENDINGS],
    [T5_OPENERS, T5_MIDDLES, T5_ENDINGS],
    [T6_OPENERS, T6_MIDDLES, T6_ENDINGS],
    [T7_OPENERS, T7_MIDDLES, T7_ENDINGS],
    [T8_OPENERS, T8_MIDDLES, T8_ENDINGS],
    [T9_OPENERS, T9_MIDDLES, T9_ENDINGS],
    [T10_OPENERS, T10_MIDDLES, T10_ENDINGS]
  ];

  // Handcrafted bonus flagship quotes woven across tiers
  const CURATED_EXTRAS = [
    'The best drivers do not fight the wheel; they listen to the front tires and let speed flow naturally out of clean exits.',
    'Autumn rain makes every braking marker honest, turning smooth throttle feathering into your greatest advantage on Sunday.',
    'Nothing matches the hush right before five red lights snap out and thirty engines roar down into Turn 1 together.',
    'Fast typing starts with posture, calm breathing, and letting rhythm stay unbroken even when a tricky word shows up ahead.',
    'Inside Garage #01, copper sparks scatter beneath a titanium exhaust header as midnight mechanics chase two more tenths.',
    'Speed without control looks dramatic for three seconds; speed paired with precision quietly wins championships all year.',
    'Across miles of windswept valley asphalt, crisp shifts keep boost alive while rivals fade behind fading red taillights.',
    'Every great skill -- guitar, coding, or triple-digit typing -- grows from clean daily habits practiced without rushing.'
  ];

  // Build 12,000+ distinct passages deterministically (1,200 unique passages per Tier 1..10 = 12,000 + extras)
  const NPD_TEXT_BANKS = [];
  let NPD_TEXT_TOTAL = 0;

  (function buildNpdTextBanks() {
    for (let t = 0; t < 10; t++) {
      const bank = [];
      const tbl = TIER_TABLES[t];
      const openers = tbl[0];
      const middles = tbl[1];
      const endings = tbl[2];
      // 12 * 10 * 10 = 1,200 unique grammatical passages per tier -> 12,000 passages total!
      for (let i = 0; i < openers.length; i++) {
        for (let j = 0; j < middles.length; j++) {
          for (let k = 0; k < endings.length; k++) {
            const joinSep = middles[j].startsWith(',') || middles[j].startsWith(';') || middles[j].startsWith(' ') ? '' : ' ';
            const endSep = endings[k].startsWith(',') || endings[k].startsWith(';') || endings[k].startsWith(' ') ? '' : ' ';
            const raw = (openers[i] + joinSep + middles[j] + endSep + endings[k])
              .replace(/\s+,/g, ',')
              .replace(/\s+;/g, ';')
              .replace(/\s{2,}/g, ' ')
              .trim();
            bank.push({
              id: 't' + (t + 1) + '_' + i + '_' + j + '_' + k,
              tier: t + 1,
              text: raw
            });
          }
        }
      }
      if (t === 0 || t === 1 || t === 2 || t === 3) {
        CURATED_EXTRAS.forEach((txt, idx) => {
          bank.push({ id: 'cur_' + t + '_' + idx, tier: t + 1, text: txt });
        });
      }
      NPD_TEXT_BANKS.push(bank);
      NPD_TEXT_TOTAL += bank.length;
    }
  })();

  function getNpdRaceText(level, avoidId) {
    const meta = getNpdTierMeta(level);
    const bank = NPD_TEXT_BANKS[meta.tier - 1] || NPD_TEXT_BANKS[0];
    if (!bank.length) return { id: 'fallback', tier: 1, text: CURATED_EXTRAS[0] };
    let pick = bank[Math.floor(Math.random() * bank.length)];
    if (avoidId && bank.length > 1 && pick.id === avoidId) {
      pick = bank[(bank.indexOf(pick) + 1) % bank.length];
    }
    return {
      id: pick.id,
      tier: meta.tier,
      tierName: meta.name,
      tierLabel: meta.label,
      text: pick.text,
      bankSize: bank.length,
      totalLibrarySize: NPD_TEXT_TOTAL
    };
  }

  // Deterministic seed lookup for live RTDB multiplayer rooms so all clients can derive or verify shared text
  function getNpdRaceTextById(id, fallbackLevel) {
    if (id && typeof id === 'string') {
      for (let t = 0; t < NPD_TEXT_BANKS.length; t++) {
        const bank = NPD_TEXT_BANKS[t];
        for (let i = 0; i < bank.length; i++) {
          if (bank[i].id === id) {
            const meta = NPD_TIERS[t];
            return {
              id: bank[i].id,
              tier: meta.tier,
              tierName: meta.name,
              tierLabel: meta.label,
              text: bank[i].text,
              bankSize: bank.length,
              totalLibrarySize: NPD_TEXT_TOTAL
            };
          }
        }
      }
    }
    return getNpdRaceText(fallbackLevel || 1);
  }

  // Season 1 Battlepass — Harvest Drift (Thanksgiving Edition, Ends December 1)
  const NPD_BATTLEPASS_S1 = {
    id: 's1_thanksgiving_2026',
    seasonNumber: 1,
    name: 'HARVEST DRIFT',
    subtitle: 'Season 1 Battlepass — Thanksgiving Edition',
    themeLabel: 'THANKSGIVING LIMITED',
    endLabel: '1 Month Left — Ends December 1',
    endDateIso: '2026-12-01T23:59:59Z',
    premiumPriceCaps: 2500,
    totalTiers: 30,
    accentHex: '#ff7a1a',
    secondaryHex: '#c92a2a',
    tiers: [
      { tier: 1, xpReq: 400,
        free: { type: 'caps', amount: 150, label: '150 Bottlecaps' },
        prem: { type: 'paint', id: 'paint_roasted_amber', label: 'Roasted Amber Paint', rarity: 'limited' } },
      { tier: 2, xpReq: 460,
        free: { type: 'xp_boost', amount: 250, label: '+250 Bonus Race XP' },
        prem: { type: 'caps', amount: 300, label: '300 Bottlecaps' } },
      { tier: 3, xpReq: 520,
        free: { type: 'title', id: 'bp_title_autumn_runner', label: 'Title: Autumn Runner', text: 'Autumn Runner', rarity: 'limited' },
        prem: { type: 'frame', id: 'bp_frame_copper_leaf', label: 'Harvest Copper Frame', value: 'conic-gradient(#d97706,#b91c1c,#f59e0b,#92400e,#d97706)', rarity: 'limited' } },
      { tier: 4, xpReq: 580,
        free: { type: 'caps', amount: 200, label: '200 Bottlecaps' },
        prem: { type: 'trail', id: 'bp_trail_ember_spark', label: 'Ember Nitro Trail', color: '#ff7a1a', rarity: 'limited' } },
      { tier: 5, xpReq: 640,
        free: { type: 'car', id: 'car_76', label: 'Autumn Coupe (S1)', rarity: 'limited' },
        prem: { type: 'paint', id: 'paint_cranberry_chrome', label: 'Cranberry Chrome Paint', rarity: 'limited' } },
      { tier: 6, xpReq: 700,
        free: { type: 'caps', amount: 250, label: '250 Bottlecaps' },
        prem: { type: 'caps', amount: 500, label: '500 Bottlecaps' } },
      { tier: 7, xpReq: 760,
        free: { type: 'banner', id: 'bp_banner_nov_dusk', label: 'November Dusk Banner', bg: 'linear-gradient(135deg,#2a0d08,#7c2d12,#c2410c)', rarity: 'limited' },
        prem: { type: 'title', id: 'bp_title_cranberry_king', label: 'Title: Cranberry Crusher', text: 'Cranberry Crusher', rarity: 'limited' } },
      { tier: 8, xpReq: 820,
        free: { type: 'caps', amount: 300, label: '300 Bottlecaps' },
        prem: { type: 'paint', id: 'paint_cinnamon_carbon', label: 'Cinnamon Carbon Paint', rarity: 'limited' } },
      { tier: 9, xpReq: 880,
        free: { type: 'caps', amount: 350, label: '350 Bottlecaps' },
        prem: { type: 'trail', id: 'bp_trail_maple_blaze', label: 'Maple Blaze Exhaust', color: '#f97316', rarity: 'limited' } },
      { tier: 10, xpReq: 940,
        free: { type: 'paint', id: 'paint_autumn_maple', label: 'Autumn Maple Fade', rarity: 'limited' },
        prem: { type: 'car', id: 'car_77', label: 'Pilgrim Interceptor (S1)', rarity: 'limited' } },
      { tier: 11, xpReq: 1000,
        free: { type: 'caps', amount: 400, label: '400 Bottlecaps' },
        prem: { type: 'caps', amount: 700, label: '700 Bottlecaps' } },
      { tier: 12, xpReq: 1060,
        free: { type: 'frame', id: 'bp_frame_wheat_crest', label: 'Wheat Crest Ring', value: 'conic-gradient(#fbbf24,#9a3412,#f59e0b,#7c2d12,#fbbf24)', rarity: 'limited' },
        prem: { type: 'banner', id: 'bp_banner_hearthfire', label: 'Hearthfire Glow Banner', bg: 'linear-gradient(135deg,#180909,#991b1b,#ea580c)', rarity: 'limited' } },
      { tier: 13, xpReq: 1120,
        free: { type: 'caps', amount: 450, label: '450 Bottlecaps' },
        prem: { type: 'caps', amount: 750, label: '750 Bottlecaps' } },
      { tier: 14, xpReq: 1180,
        free: { type: 'title', id: 'bp_title_harvest_ace', label: 'Title: Harvest Ace', text: 'Harvest Ace', rarity: 'limited' },
        prem: { type: 'paint', id: 'paint_spice_pearl', label: 'Spiced Copper Pearl', rarity: 'limited' } },
      { tier: 15, xpReq: 1250,
        free: { type: 'car', id: 'car_78', label: 'Amber Wagon GT (S1)', rarity: 'limited' },
        prem: { type: 'caps', amount: 1000, label: '1,000 Bottlecaps' } },
      { tier: 16, xpReq: 1320,
        free: { type: 'caps', amount: 500, label: '500 Bottlecaps' },
        prem: { type: 'title', id: 'bp_title_midnight_pilgrim', label: 'Title: Midnight Pilgrim', text: 'Midnight Pilgrim', rarity: 'limited' } },
      { tier: 17, xpReq: 1390,
        free: { type: 'caps', amount: 550, label: '550 Bottlecaps' },
        prem: { type: 'frame', id: 'bp_frame_gold_cornucopia', label: 'Golden Harvest Halo', value: 'conic-gradient(#fde68a,#b45309,#dc2626,#f59e0b,#fde68a)', rarity: 'limited' } },
      { tier: 18, xpReq: 1460,
        free: { type: 'paint', id: 'paint_slate_chestnut', label: 'Slate Chestnut Paint', rarity: 'limited' },
        prem: { type: 'trail', id: 'bp_trail_crimson_cider', label: 'Crimson Cider Nitro', color: '#dc2626', rarity: 'limited' } },
      { tier: 19, xpReq: 1540,
        free: { type: 'caps', amount: 650, label: '650 Bottlecaps' },
        prem: { type: 'caps', amount: 1250, label: '1,250 Bottlecaps' } },
      { tier: 20, xpReq: 1620,
        free: { type: 'caps', amount: 800, label: '800 Bottlecaps' },
        prem: { type: 'car', id: 'car_79', label: 'Cornucopia V12 (S1)', rarity: 'limited' } },
      { tier: 21, xpReq: 1700,
        free: { type: 'caps', amount: 700, label: '700 Bottlecaps' },
        prem: { type: 'paint', id: 'paint_pilgrim_gold', label: 'Pilgrim Gold Reserve', rarity: 'limited' } },
      { tier: 22, xpReq: 1780,
        free: { type: 'banner', id: 'bp_banner_sunset_ridge', label: 'Sunset Ridge Banner', bg: 'linear-gradient(135deg,#2b0909,#9a3412,#f59e0b)', rarity: 'limited' },
        prem: { type: 'caps', amount: 1400, label: '1,400 Bottlecaps' } },
      { tier: 23, xpReq: 1860,
        free: { type: 'caps', amount: 750, label: '750 Bottlecaps' },
        prem: { type: 'title', id: 'bp_title_feast_monarch', label: 'Title: Feast Sovereign', text: 'Feast Sovereign', rarity: 'limited' } },
      { tier: 24, xpReq: 1940,
        free: { type: 'caps', amount: 800, label: '800 Bottlecaps' },
        prem: { type: 'banner', id: 'bp_banner_sovereign_feast', label: 'Sovereign Ember Banner', bg: 'linear-gradient(135deg,#0f0303,#7f1d1d,#f97316)', rarity: 'limited' } },
      { tier: 25, xpReq: 2040,
        free: { type: 'caps', amount: 900, label: '900 Bottlecaps' },
        prem: { type: 'paint', id: 'paint_ember_chameleon', label: 'Ember Chameleon Paint', rarity: 'limited' } },
      { tier: 26, xpReq: 2140,
        free: { type: 'caps', amount: 950, label: '950 Bottlecaps' },
        prem: { type: 'caps', amount: 1750, label: '1,750 Bottlecaps' } },
      { tier: 27, xpReq: 2240,
        free: { type: 'title', id: 'bp_title_november_legend', label: 'Title: November Legend', text: 'November Legend', rarity: 'limited' },
        prem: { type: 'frame', id: 'bp_frame_thanksgiving_crown', label: 'Crown of Harvest Ring', value: 'conic-gradient(#ffedd5,#ea580c,#b91c1c,#fbbf24,#ffedd5)', rarity: 'limited' } },
      { tier: 28, xpReq: 2350,
        free: { type: 'caps', amount: 1100, label: '1,100 Bottlecaps' },
        prem: { type: 'trail', id: 'bp_trail_solar_harvest', label: 'Solar Harvest Jet', color: '#fbbf24', rarity: 'limited' } },
      { tier: 29, xpReq: 2480,
        free: { type: 'caps', amount: 1300, label: '1,300 Bottlecaps' },
        prem: { type: 'caps', amount: 2500, label: '2,500 Bottlecaps' } },
      { tier: 30, xpReq: 2650,
        free: { type: 'paint', id: 'paint_harvest_pearl', label: 'Harvest Obsidian Pearl', rarity: 'limited' },
        prem: { type: 'car', id: 'car_80', label: 'Turkey Overdrive X (S1)', rarity: 'limited' } }
    ],
    upcomingSeasons: [
      {
        season: 2,
        month: 'December',
        name: 'FROSTBITE EXPRESS',
        theme: 'Christmas Edition',
        starts: 'December 2',
        desc: 'Candy-cane carbon hypercars, blizzard nitro trails, emerald & frost metallic paints, and winter holiday exclusives.'
      },
      {
        season: 3,
        month: 'January',
        name: 'MIDNIGHT BALL DROP',
        theme: 'New Year\'s Edition',
        starts: 'January 1',
        desc: 'Champagne chrome liveries, firework exhaust plumes, midnight countdown timers, and 2027 Prototype awards.'
      }
    ]
  };

  function calcBattlepassProgress(bpXp) {
    const clean = Math.max(0, Math.floor(Number(bpXp) || 0));
    let rem = clean;
    let tier = 0;
    let nextReq = NPD_BATTLEPASS_S1.tiers[0].xpReq;
    for (let i = 0; i < NPD_BATTLEPASS_S1.tiers.length; i++) {
      const req = NPD_BATTLEPASS_S1.tiers[i].xpReq;
      if (rem >= req) {
        rem -= req;
        tier = i + 1;
        nextReq = (i + 1 < NPD_BATTLEPASS_S1.tiers.length) ? NPD_BATTLEPASS_S1.tiers[i + 1].xpReq : 0;
      } else {
        nextReq = req;
        break;
      }
    }
    const maxTier = NPD_BATTLEPASS_S1.totalTiers;
    if (tier >= maxTier) {
      return { tier: maxTier, into: 0, needed: 1, pct: 100, isMax: true, totalXp: clean };
    }
    return {
      tier,
      into: rem,
      needed: Math.max(1, nextReq),
      pct: Math.max(0, Math.min(100, (rem / Math.max(1, nextReq)) * 100)),
      isMax: false,
      totalXp: clean
    };
  }

  global.NPD_MAX_LEVEL = MAX_LEVEL;
  global.npdTotalXpForLevel = npdTotalXpForLevel;
  global.npdLevelXpReq = npdLevelXpReq;
  global.npdLevelFromXp = npdLevelFromXp;
  global.npdCalcLevelInfo = npdCalcLevelInfo;
  global.npdFormatLevel = npdFormatLevel;
  global.NPD_TIERS = NPD_TIERS;
  global.getNpdTierMeta = getNpdTierMeta;
  global.npdRaceRewards = npdRaceRewards;
  global.NPD_TEXT_BANKS = NPD_TEXT_BANKS;
  global.NPD_TEXT_TOTAL = NPD_TEXT_TOTAL;
  global.getNpdRaceText = getNpdRaceText;
  global.getNpdRaceTextById = getNpdRaceTextById;
  global.NPD_BATTLEPASS_S1 = NPD_BATTLEPASS_S1;
  global.calcBattlepassProgress = calcBattlepassProgress;
})(window);
