// NPD (NewBGI) — 80 Distinct Car Models, Universal Paint System (36 Finishes),
// Parametric Multi-Geometry SVG Renderer, and Real-Time 3D Interactive Car Studio.
(function (global) {
  'use strict';

  function escHtml(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function hexToRgb(hex) {
    const clean = String(hex || '#ff1a1a').replace('#', '');
    const full = clean.length === 3 ? clean.split('').map(c => c + c).join('') : clean;
    const n = parseInt(full.slice(0, 6), 16) || 0xff1a1a;
    return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
  }

  function mixHex(h1, h2, t) {
    const a = hexToRgb(h1);
    const b = hexToRgb(h2);
    const k = Math.max(0, Math.min(1, t));
    const r = Math.round(a.r + (b.r - a.r) * k);
    const g = Math.round(a.g + (b.g - a.g) * k);
    const bl = Math.round(a.b + (b.b - a.b) * k);
    return `rgb(${r},${g},${bl})`;
  }

  function shadeHex(hex, factor) {
    const c = hexToRgb(hex);
    const clamp = v => Math.max(0, Math.min(255, Math.round(v)));
    return `rgb(${clamp(c.r * factor)},${clamp(c.g * factor)},${clamp(c.b * factor)})`;
  }

  // ============================================================
  // 36 UNIVERSAL PAINT FINISHES (Applicable to ALL 80 Models)
  // ============================================================
  const NPD_PAINTS = [
    { id: 'paint_stock', name: 'Factory Stock', type: 'stock', price: 0, primary: null, secondary: null, sheen: '#ffffff', desc: 'Original factory colorway engineered for this chassis.' },
    { id: 'paint_crimson_gloss', name: 'Crimson Velocity', type: 'gloss', price: 150, primary: '#e11d48', secondary: '#7f1d1d', sheen: '#ffe4e6', desc: 'Deep mirror-polished blood red finish.' },
    { id: 'paint_obsidian_matte', name: 'Stealth Matte Black', type: 'matte', price: 250, primary: '#1e2028', secondary: '#090a0d', sheen: '#64748b', desc: 'Satin-flat stealth coat with subtle graphite highlights.' },
    { id: 'paint_pearl_white', name: 'Glacier Pearl', type: 'pearl', price: 250, primary: '#f1f5f9', secondary: '#94a3b8', sheen: '#ffffff', desc: 'Triple-coat ceramic pearl white.' },
    { id: 'paint_cobalt_metallic', name: 'Cobalt Sapphire', type: 'metallic', price: 320, primary: '#2563eb', secondary: '#1e3a8a', sheen: '#93c5fd', desc: 'Fine-flake metallic sapphire lacquer.' },
    { id: 'paint_viper_emerald', name: 'Viper Emerald', type: 'metallic', price: 350, primary: '#10b981', secondary: '#064e3b', sheen: '#a7f3d0', desc: 'Rich racing British green flake.' },
    { id: 'paint_sunburst_yellow', name: 'Pitlane Yellow', type: 'gloss', price: 320, primary: '#eab308', secondary: '#854d0e', sheen: '#fef9c3', desc: 'High-visibility competition chrome yellow.' },
    { id: 'paint_tangerine_pulse', name: 'Apex Tangerine', type: 'gloss', price: 360, primary: '#f97316', secondary: '#9a3412', sheen: '#ffedd5', desc: 'Circuit-bright citrus orange coat.' },
    { id: 'paint_amethyst_pearl', name: 'Midnight Amethyst', type: 'pearl', price: 450, primary: '#9333ea', secondary: '#3b0764', sheen: '#e9d5ff', desc: 'Color-shifting plum to electric violet pearl.' },
    { id: 'paint_cyan_volt', name: 'Hyper Cyan', type: 'metallic', price: 480, primary: '#06b6d4', secondary: '#164e63', sheen: '#cffafe', desc: 'High-voltage electric aqua flake.' },
    { id: 'paint_rose_magenta', name: 'Neon Magenta', type: 'pearl', price: 520, primary: '#ec4899', secondary: '#831843', sheen: '#fbcfe8', desc: 'Synthwave pink satin finish.' },
    { id: 'paint_silver_alloy', name: 'Brushed Titanium', type: 'chrome', price: 600, primary: '#cbd5e1', secondary: '#475569', sheen: '#ffffff', desc: 'Machined aerospace alloy gleam.' },
    { id: 'paint_gunmetal_steel', name: 'Graphite Forged', type: 'metallic', price: 550, primary: '#52525b', secondary: '#18181b', sheen: '#d4d4d8', desc: 'Heavy industrial tungsten sheen.' },
    { id: 'paint_gulf_heritage', name: 'Heritage Azure/Orange', type: 'twotone', price: 750, primary: '#38bdf8', secondary: '#ea580c', sheen: '#ffffff', desc: 'Iconic endurance two-tone livery.' },
    { id: 'paint_martini_stripe', name: 'Apex White Stripe', type: 'stripe', price: 780, primary: '#f8fafc', secondary: '#ef4444', sheen: '#38bdf8', desc: 'Crisp snow body with bold red center stripe.' },
    { id: 'paint_shadow_crimson', name: 'Shadow Redline', type: 'stripe', price: 820, primary: '#18181b', secondary: '#dc2626', sheen: '#fca5a5', desc: 'Charcoal stealth armor sliced with scarlet stripe.' },
    { id: 'paint_copper_bronze', name: 'Molten Copper', type: 'metallic', price: 850, primary: '#d97706', secondary: '#451a03', sheen: '#fde68a', desc: 'Burnished penny bronze flake.' },
    { id: 'paint_carbon_weave', name: 'Exposed Carbon Weave', type: 'carbon', price: 1100, primary: '#27272a', secondary: '#09090b', sheen: '#71717a', desc: 'Raw 2x2 twill pre-preg carbon fiber shell.' },
    { id: 'paint_red_carbon', name: 'Crimson Carbon Kevlar', type: 'carbon', price: 1350, primary: '#7f1d1d', secondary: '#1c0505', sheen: '#f87171', desc: 'Tinted ruby carbon weave finish.' },
    { id: 'paint_blue_carbon', name: 'Cobalt Carbon Weave', type: 'carbon', price: 1350, primary: '#1e3a8a', secondary: '#060c21', sheen: '#60a5fa', desc: 'Deep blue structural weave finish.' },
    { id: 'paint_gold_chrome', name: '24K Bullion Chrome', type: 'chrome', price: 1800, primary: '#facc15', secondary: '#854d0e', sheen: '#fef9c3', desc: 'Mirror-reflective pure bullion gold.' },
    { id: 'paint_chrome_mirror', name: 'Liquid Mercury Chrome', type: 'chrome', price: 1650, primary: '#f1f5f9', secondary: '#334155', sheen: '#ffffff', desc: 'Near-zero diffusion mirror wrap.' },
    { id: 'paint_chameleon_oil', name: 'Chameleon Oil-Slick', type: 'iridescent', price: 2200, primary: '#10b981', secondary: '#8b5cf6', sheen: '#f43f5e', desc: 'Prismatic flip shifting teal, violet, and rose.' },
    { id: 'paint_solar_flare', name: 'Solar Flare Fade', type: 'iridescent', price: 2100, primary: '#ef4444', secondary: '#facc15', sheen: '#ffffff', desc: 'Molten red-to-gold gradient heat coat.' },
    { id: 'paint_aurora_borealis', name: 'Aurora Mist', type: 'iridescent', price: 2400, primary: '#06b6d4', secondary: '#10b981', sheen: '#a855f7', desc: 'Polar sky cyan to emerald shift.' },
    { id: 'paint_arctic_camo', name: 'Arctic Digital', type: 'twotone', price: 1200, primary: '#e2e8f0', secondary: '#475569', sheen: '#ffffff', desc: 'Winter tactical two-tone finish.' },
    { id: 'paint_blood_moon', name: 'Blood Moon Void', type: 'iridescent', price: 2600, primary: '#991b1b', secondary: '#09090b', sheen: '#ff4545', desc: 'Eclipse ruby with glowing crimson speculars.' },
    { id: 'paint_toxic_lime', name: 'Radioactive Acid', type: 'gloss', price: 900, primary: '#84cc16', secondary: '#365314', sheen: '#ecfccb', desc: 'High-contrast neon lime hyper-lacquer.' },
    { id: 'paint_royal_indigo', name: 'Imperial Indigo', type: 'pearl', price: 950, primary: '#4f46e5', secondary: '#1e1b4b', sheen: '#c7d2fe', desc: 'Velvet indigo pearl with violet highlight.' },
    // Battlepass Season 1 Harvest Limited Paints
    { id: 'paint_roasted_amber', name: 'Roasted Amber Pearl', type: 'pearl', price: 0, bpLimited: true, primary: '#d97706', secondary: '#431407', sheen: '#fde68a', desc: 'Season 1 Exclusive — warm toasted amber glaze.' },
    { id: 'paint_cranberry_chrome', name: 'Cranberry Chrome', type: 'chrome', price: 0, bpLimited: true, primary: '#be123c', secondary: '#4c0519', sheen: '#fda4af', desc: 'Season 1 Exclusive — mirror crimson cranberry finish.' },
    { id: 'paint_cinnamon_carbon', name: 'Cinnamon Weave Carbon', type: 'carbon', price: 0, bpLimited: true, primary: '#9a3412', secondary: '#1c0a03', sheen: '#fdba74', desc: 'Season 1 Exclusive — spiced bronze carbon weave.' },
    { id: 'paint_autumn_maple', name: 'Autumn Maple Fade', type: 'iridescent', price: 0, bpLimited: true, primary: '#ea580c', secondary: '#991b1b', sheen: '#fde047', desc: 'Season 1 Exclusive — maple crimson to golden orange.' },
    { id: 'paint_spice_pearl', name: 'Spiced Copper Pearl', type: 'pearl', price: 0, bpLimited: true, primary: '#c2410c', secondary: '#290d04', sheen: '#fed7aa', desc: 'Season 1 Exclusive — deep harvest copper metallic.' },
    { id: 'paint_slate_chestnut', name: 'Slate Chestnut', type: 'twotone', price: 0, bpLimited: true, primary: '#78350f', secondary: '#334155', sheen: '#fed7aa', desc: 'Season 1 Exclusive — chestnut bronze & storm slate.' },
    { id: 'paint_pilgrim_gold', name: 'Pilgrim Gold Reserve', type: 'chrome', price: 0, bpLimited: true, primary: '#eab308', secondary: '#713f12', sheen: '#fef08a', desc: 'Season 1 Exclusive — heirloom brass-gold mirror.' },
    { id: 'paint_ember_chameleon', name: 'Ember Chameleon', type: 'iridescent', price: 0, bpLimited: true, primary: '#dc2626', secondary: '#f97316', sheen: '#fef08a', desc: 'Season 1 Exclusive — shifting hearthfire ember spectrum.' },
    { id: 'paint_harvest_pearl', name: 'Harvest Obsidian Pearl', type: 'iridescent', price: 0, bpLimited: true, primary: '#29150b', secondary: '#ea580c', sheen: '#fbbf24', desc: 'Season 1 Tier 30 Master Paint — black obsidian burning orange.' }
  ];

  function getPaintMeta(paintId) {
    return NPD_PAINTS.find(p => p.id === paintId) || NPD_PAINTS[0];
  }

  // ============================================================
  // 80 DISTINCT CAR MODELS ACROSS 10 ARCHITECTURAL FAMILIES
  // Every model has unique body geometry, roofline, nose, wing, vents, wheels, and 3D shape.
  // ============================================================
  const NPD_CARS = [
    // --- CLASS: STARTERS & STREET (1-9, preserving original account IDs!) ---
    { id: 'car-apex', num: 1, name: 'Apex GT', cls: 'Street', body: 'gt_coupe', color: '#ff2020', accent: '#ffffff', price: 0, wing: 'swan', hood: 'vented', roof: 'fastback', rim: 'twin5', lights: 'blade', desc: 'Factory twin-turbo GT coupe with split swan wing and vented hood.' },
    { id: 'car-interceptor', num: 2, name: 'Interceptor', cls: 'Street', body: 'pursuit_sedan', color: '#2563eb', accent: '#93c5fd', price: 0, wing: 'lip', hood: 'bulge', roof: 'lightbar', rim: 'steelie', lights: 'quad', desc: 'Pursuit sedan fitted with front push-ram, roof beacon, and heavy armor.' },
    { id: 'car-metro', num: 3, name: 'Metro Spec', cls: 'Street', body: 'hot_hatch', color: '#f59e0b', accent: '#fde68a', price: 0, wing: 'hatch_rally', hood: 'clean', roof: 'hatch', rim: 'turbofan', lights: 'round_rally', desc: 'Wide-fender hot hatchback with roof rally wing and short wheel arches.' },
    { id: 'car-classic', num: 4, name: 'Street Classic', cls: 'Classic', body: 'fastback_70', color: '#94a3b8', accent: '#e2e8f0', price: 0, wing: 'louver', hood: 'chrome_trim', roof: 'louvers', rim: 'dish', lights: 'chrome_round', desc: '1970s fastback icon featuring rear window louvers and chrome bumpers.' },
    { id: 'car-rocket', num: 5, name: 'Starlight V12', cls: 'Sci-Fi', body: 'salt_rocket', color: '#a855f7', accent: '#e9d5ff', price: 500, wing: 'tailfin', hood: 'needle', roof: 'bubble', rim: 'aero_disc', lights: 'laser', desc: 'Landspeed needle-nose thruster fuselage with towering delta stabilizer fin.' },
    { id: 'car-saucer', num: 6, name: 'Nebula X', cls: 'Sci-Fi', body: 'hover_saucer', color: '#10b981', accent: '#a7f3d0', price: 1200, wing: 'none', hood: 'dish_rim', roof: 'glass_dome', rim: 'hover_pad', lights: 'plasma_ring', desc: 'Antigravity saucer disk with panoramic dome canopy and plasma hover rings.' },
    { id: 'car-volt', num: 7, name: 'Volt Hypercar', cls: 'Hypercar', body: 'hyper_wedge', color: '#06b6d4', accent: '#cffafe', price: 2500, wing: 'kamm', hood: 'aero_slot', roof: 'teardrop', rim: 'turbine', lights: 'visor', desc: 'Quad-motor electric wedge with full-width lightblade and Kamm tail.' },
    { id: 'car-dragon', num: 8, name: 'Crimson Wraith', cls: 'Track', body: 'lmp_proto', color: '#e11d48', accent: '#fecdd3', price: 5000, wing: 'endplate_gt', hood: 'lmp_arch', roof: 'shark_fin', rim: 'centerlock', lights: 'fang', desc: 'Endurance LMP prototype with high arched fenders and vertical dorsal shark fin.' },
    { id: 'car-sovereign', num: 9, name: 'Sovereign Gold', cls: 'Hypercar', body: 'luxury_gt16', color: '#eab308', accent: '#fef08a', price: 0, premiumOnly: true, wing: 'active_flush', hood: 'long_v16', roof: 'landau', rim: 'multi_spoke', lights: 'crystal', desc: 'Extended V16 sovereign flagship reserved for NPD Premium & Staff.' },

    // --- CLASS: MUSCLE & DRAG (10-17) ---
    { id: 'car_10', num: 10, name: 'Hellhound Shaker', cls: 'Muscle', body: 'muscle_box', color: '#dc2626', accent: '#fca5a5', price: 420, wing: 'ducktail', hood: 'shaker', roof: 'notchback', rim: 'mag5', lights: 'recessed', desc: 'Box-flared American muscle coupe sporting a hood-mounted shaker intake.' },
    { id: 'car_11', num: 11, name: 'Iron Blower 69', cls: 'Muscle', body: 'muscle_fastback', color: '#1e293b', accent: '#fb923c', price: 680, wing: 'drag_wing', hood: 'supercharger', roof: 'fastback', rim: 'drag_slick', lights: 'halo', desc: 'Exposed chrome supercharger bug-catcher towering out of a steel fastback.' },
    { id: 'car_12', num: 12, name: 'Daytona Spear', cls: 'Muscle', body: 'aero_muscle', color: '#2563eb', accent: '#ffffff', price: 950, wing: 'superbird', hood: 'pointed_nose', roof: 'notchback', rim: 'steel_wide', lights: 'popup_shut', desc: 'Coned NASCAR aero nose paired with an iconic towering basket-handle wing.' },
    { id: 'car_13', num: 13, name: 'Nitro Funny Car', cls: 'Muscle', body: 'dragster', color: '#f97316', accent: '#fef08a', price: 1400, wing: 'chute_rack', hood: 'long_drag', roof: 'low_chop', rim: 'skinny_front', lights: 'none', desc: 'Long-nose quarter-mile funny car with rear wheelie bar and parachute pack.' },
    { id: 'car_14', num: 14, name: 'El Camino Boss', cls: 'Muscle', body: 'ute_coupe', color: '#16a34a', accent: '#bbf7d0', price: 780, wing: 'bed_rail', hood: 'cowl', roof: 'ute_cab', rim: 'rally_chrome', lights: 'quad', desc: 'Two-door V8 coupe pickup ute with cowl induction hood and open bed.' },
    { id: 'car_15', num: 15, name: 'Tarmac Bull', cls: 'Muscle', body: 'wide_muscle', color: '#7c2d12', accent: '#fed7aa', price: 1150, wing: 'gurney', hood: 'dual_scoop', roof: 'slammed', rim: 'deep_dish', lights: 'angry_slit', desc: 'Slammed widebody pony car with twin nostril hood scoops.' },
    { id: 'car_16', num: 16, name: 'Rumble Rat', cls: 'Muscle', body: 'rat_rod', color: '#57534e', accent: '#ef4444', price: 890, wing: 'wheelie_bar', hood: 'exposed_v8', roof: 'chopped_rod', rim: 'whitewall', lights: 'round_pod', desc: 'Roof-chopped open-engine street rod showing raw chrome headers.' },
    { id: 'car_17', num: 17, name: 'Bandit Trans', cls: 'Muscle', body: 'targa_muscle', color: '#18181b', accent: '#eab308', price: 1280, wing: 'ducktail', hood: 'shaker', roof: 'targa', rim: 'snowflake', lights: 'split_grille', desc: 'T-top highway runner featuring gold snowflake wheels and flared spats.' },

    // --- CLASS: JDM & TUNER (18-26) ---
    { id: 'car_18', num: 18, name: 'Touge Eight-Six', cls: 'Tuner', body: 'wedge_hatch', color: '#f8fafc', accent: '#18181b', price: 380, wing: 'lip', hood: 'clean', roof: 'hatch', rim: 'watanabe', lights: 'popup_open', desc: 'Featherweight twin-cam mountain drift hatch with pop-up headlamps.' },
    { id: 'car_19', num: 19, name: 'Rotor RX-Apex', cls: 'Tuner', body: 'curvy_coupe', color: '#ef4444', accent: '#fde047', price: 740, wing: 'arch_wing', hood: 'vented', roof: 'double_bubble', rim: 'mesh6', lights: 'sleek_almond', desc: 'Twin-rotor streamlined sports coupe with double-bubble roof contour.' },
    { id: 'car_20', num: 20, name: 'Kanjo Box', cls: 'Tuner', body: 'civic_box', color: '#eab308', accent: '#18181b', price: 340, wing: 'tilt_roof', hood: 'carbon_vent', roof: 'tall_hatch', rim: 'te37', lights: 'amber_corner', desc: 'Midnight loop highway hatch with upward-tilted billet roof wing.' },
    { id: 'car_21', num: 21, name: 'Bosozoku Demon', cls: 'Tuner', body: 'boso_coupe', color: '#ec4899', accent: '#fef08a', price: 1450, wing: 'giant_boso', hood: 'extended_lip', roof: 'notchback', rim: 'tiny_deep', lights: 'shark_grille', desc: 'Outrageous giantchin splitter and sky-high twin bamboo exhaust pipes.' },
    { id: 'car_22', num: 22, name: 'Tsukuba TimeAttack', cls: 'Tuner', body: 'aero_tuner', color: '#18181b', accent: '#22d3ee', price: 2100, wing: 'chassis_gt', hood: 'triple_vent', roof: 'scoop_roof', rim: 'aero_turbo', lights: 'duct_inlet', desc: 'Chassis-mounted monster GT wing and massive front aero dive planes.' },
    { id: 'car_23', num: 23, name: 'Skyline R-Spec', cls: 'Tuner', body: 'box_coupe_r', color: '#1d4ed8', accent: '#e2e8f0', price: 1120, wing: 'dual_blade', hood: 'naca', roof: 'notchback', rim: 'twin6', lights: 'bar_slit', desc: 'All-wheel-drive twin-turbo icon with box flares and quad round tails.' },
    { id: 'car_24', num: 24, name: 'Kei Flatbed Rocket', cls: 'Tuner', body: 'kei_truck', color: '#ffffff', accent: '#ef4444', price: 540, wing: 'cab_spoiler', hood: 'cabover', roof: 'cab_box', rim: 'small_alloy', lights: 'square_kei', desc: 'Cab-over micro kei pickup converted with a turbo rear-mid engine bay.' },
    { id: 'car_25', num: 25, name: 'Drift Z-Fairlady', cls: 'Tuner', body: 'long_hood_z', color: '#f97316', accent: '#18181b', price: 880, wing: 'ducktail', hood: 'g_nose', roof: 'fastback', rim: 'watanabe', lights: 'sugar_scoop', desc: 'Long-bonnet G-nose coupe riding on bronze four-spoke drift wheels.' },
    { id: 'car_26', num: 26, name: 'Rally Evo IX', cls: 'Tuner', body: 'rally_sedan', color: '#dc2626', accent: '#ffffff', price: 1050, wing: 'box_wing', hood: 'evo_vent', roof: 'vortex_gen', rim: 'enkei', lights: 'fog_bumper', desc: 'Homologation turbo sedan with roof vortex fins and wide mudflaps.' },

    // --- CLASS: EXOTIC SUPERCAR & ROADSTER (27-35) ---
    { id: 'car_27', num: 27, name: 'Barchetta Monza', cls: 'Supercar', body: 'speedster', color: '#b91c1c', accent: '#fef3c7', price: 2200, wing: 'twin_hump', hood: 'low_curve', roof: 'open_speedster', rim: 'wire_spoke', lights: 'teardrop', desc: 'Zero-windshield open speedster with twin aerodynamic leather head fairings.' },
    { id: 'car_28', num: 28, name: 'Countach Wedge', cls: 'Supercar', body: 'razor_wedge', color: '#ffffff', accent: '#ef4444', price: 2450, wing: 'v_wing', hood: 'flat_blade', roof: 'periscope', rim: 'phone_dial', lights: 'slat_vent', desc: 'Razor-edged 1980s Italian wedge with giant box intakes and V-wing.' },
    { id: 'car_29', num: 29, name: 'Gullwing 300', cls: 'Supercar', body: 'gullwing', color: '#cbd5e1', accent: '#991b1b', price: 1950, wing: 'none', hood: 'fender_gill', roof: 'bubble_coupe', rim: 'hubcap_retro', lights: 'round_euro', desc: 'Iconic silver alloy coupe defined by smooth fenders and side gills.' },
    { id: 'car_30', num: 30, name: 'Valkyrie Venturi', cls: 'Supercar', body: 'hollow_aero', color: '#065f46', accent: '#34d399', price: 3600, wing: 'swan', hood: 'open_tunnel', roof: 'fighter_canopy', rim: 'turbofan', lights: 'micro_led', desc: 'Hollowed-out underfloor Venturi tunnels leave daylight visible under the cabin.' },
    { id: 'car_31', num: 31, name: 'Twin-Snorkel Targa', cls: 'Supercar', body: 'snorkel_spyder', color: '#facc15', accent: '#18181b', price: 2750, wing: 'active_split', hood: 'short_mid', roof: 'roll_snorkel', rim: 'y_spoke', lights: 'fang', desc: 'Dual overhead air snorkels feeding an exposed naturally aspirated V12.' },
    { id: 'car_32', num: 32, name: 'Longtail M88', cls: 'Supercar', body: 'longtail', color: '#3b82f6', accent: '#93c5fd', price: 3200, wing: 'tail_extension', hood: 'low_nose', roof: 'roof_scoop', rim: 'star5', lights: 'vertical_slit', desc: 'Stretched low-drag Le Mans longtail bodywork built for 240 mph traps.' },
    { id: 'car_33', num: 33, name: 'Batwing Nocturne', cls: 'Supercar', body: 'stealth_stealth', color: '#0f172a', accent: '#38bdf8', price: 3400, wing: 'split_bat', hood: 'faceted', roof: 'faceted_glass', rim: 'sawblade', lights: 'y_beam', desc: 'Radar-stealth faceted stealth supercar with serrated side blades.' },
    { id: 'car_34', num: 34, name: 'Centenario Track', cls: 'Supercar', body: 'diffuser_pro', color: '#52525b', accent: '#eab308', price: 3900, wing: 'active_wide', hood: 'dual_nostril', roof: 'low_cab', rim: 'centerlock', lights: 'claw', desc: 'Giant exposed rear carbon diffuser fins paired with bright yellow trim.' },
    { id: 'car_35', num: 35, name: 'Stradale Spyder', cls: 'Supercar', body: 'open_gt', color: '#be123c', accent: '#fda4af', price: 2300, wing: 'lip', hood: 'pinched', roof: 'open_windshield', rim: 'petal5', lights: 'sweep', desc: 'Open-cockpit Italian grand tourer with swept windshield.' },

    // --- CLASS: OPEN-WHEEL & TRACK (36-43) ---
    { id: 'car_36', num: 36, name: 'Formula Zero', cls: 'Open-Wheel', body: 'f1_modern', color: '#dc2626', accent: '#ffffff', price: 2900, wing: 'f1_drs', hood: 'f1_nose', roof: 'f1_halo', rim: 'slick_wide', lights: 'rain_led', desc: 'Ground-effect Formula racer featuring exposed front wishbones and Halo.' },
    { id: 'car_37', num: 37, name: 'Cigar GP 1966', cls: 'Open-Wheel', body: 'f1_cigar', color: '#15803d', accent: '#fde047', price: 1550, wing: 'none', hood: 'cigar_grille', roof: 'open_helmet', rim: 'skinny_wire', lights: 'none', desc: 'Wingless 1960s cigar-tube Grand Prix chassis on narrow spoked tires.' },
    { id: 'car_38', num: 38, name: 'Outlaw Dirt Wing', cls: 'Open-Wheel', body: 'sprint_dirt', color: '#f97316', accent: '#18181b', price: 1750, wing: 'sprint_top', hood: 'short_stub', roof: 'cage_wing', rim: 'mud_bead', lights: 'none', desc: 'Short-wheelbase dirt oval sprint racer with an enormous rooftop billboard wing.' },
    { id: 'car_39', num: 39, name: 'Apex Shifter Kart', cls: 'Open-Wheel', body: 'kart', color: '#ef4444', accent: '#e2e8f0', price: 490, wing: 'mini_bumper', hood: 'kart_nassau', roof: 'open_helmet', rim: 'tiny_slick', lights: 'none', desc: 'Six-speed sequential 125cc shifter kart sitting one inch off the asphalt.' },
    { id: 'car_40', num: 40, name: 'Can-Am Wedge 917', cls: 'Open-Wheel', body: 'canam_open', color: '#38bdf8', accent: '#f97316', price: 2650, wing: 'wide_plank', hood: 'flat_shovel', roof: 'low_screen', rim: 'gold_bbs', lights: 'quad', desc: 'Turbocharged 1,100hp open-top Can-Am monster with towering velocity stacks.' },
    { id: 'car_41', num: 41, name: 'Indy Oval Missile', cls: 'Open-Wheel', body: 'indy_lowdrag', color: '#1e40af', accent: '#facc15', price: 2800, wing: 'superspeedway', hood: 'needle', roof: 'aeroscreen', rim: 'slick_wide', lights: 'none', desc: 'Ultra-low-drag superspeedway single-seater with polycarbonate aeroscreen.' },
    { id: 'car_42', num: 42, name: 'Exo Tub Buggy', cls: 'Open-Wheel', body: 'ariel_exo', color: '#84cc16', accent: '#18181b', price: 1480, wing: 'track_rack', hood: 'tube_frame', roof: 'exposed_cage', rim: 'twin5', lights: 'twin_pod', desc: 'Body-less tubular exoskeleton chassis exposing springs and roll bars.' },
    { id: 'car_43', num: 43, name: 'Pikes Peak Unlimited', cls: 'Open-Wheel', body: 'hillclimb', color: '#f43f5e', accent: '#ffffff', price: 3300, wing: 'double_biplane', hood: 'giant_plow', roof: 'scoop_roof', rim: 'turbofan', lights: 'none', desc: 'Biplane rear wing and snowplow splitter engineered for thin mountain air.' },

    // --- CLASS: CLASSIC & VINTAGE (44-51) ---
    { id: 'car_44', num: 44, name: 'Deuce Hi-Boy 32', cls: 'Classic', body: 'hotrod_32', color: '#b91c1c', accent: '#fbbf24', price: 720, wing: 'none', hood: 'long_chrome', roof: 'high_box', rim: 'red_steelie', lights: 'bug_eye', desc: '1932 open-wheel hot rod with detached headlights and louver grille.' },
    { id: 'car_45', num: 45, name: 'Cadillac Tailfin 59', cls: 'Classic', body: 'fifties_fin', color: '#ec4899', accent: '#ffffff', price: 1080, wing: 'jet_fins', hood: 'chrome_bar', roof: 'panoramic', rim: 'whitewall', lights: 'quad_chrome', desc: 'Enormous rocket-age twin tailfins and chrome bullet bumpers.' },
    { id: 'car_46', num: 46, name: 'Group B Quattro', cls: 'Classic', body: 'group_b', color: '#f8fafc', accent: '#eab308', price: 1380, wing: 'box_wing', hood: 'light_pod', roof: 'box_rally', rim: 'white_comp', lights: 'quad_pod', desc: 'Box-fendered 1980s snow rally monster fitted with four hood rally spotlights.' },
    { id: 'car_47', num: 47, name: 'Boattail Speedster', cls: 'Classic', body: 'boattail', color: '#0f766e', accent: '#fde68a', price: 1620, wing: 'taper_tail', hood: 'belt_strap', roof: 'cut_screen', rim: 'wire_spoke', lights: 'chrome_round', desc: '1920s mahogany-tailed brass tourer with leather hood straps.' },
    { id: 'car_48', num: 48, name: 'Beetle Baja Bug', cls: 'Classic', body: 'bug_baja', color: '#facc15', accent: '#18181b', price: 620, wing: 'stinger_pipe', hood: 'stub_beetle', roof: 'round_beetle', rim: 'offroad_bead', lights: 'bug_eye', desc: 'Cut-fender desert Bug showing its exposed rear flat-four stinger exhaust.' },
    { id: 'car_49', num: 49, name: 'Samba Safari Bus', cls: 'Classic', body: 'safari_van', color: '#0284c7', accent: '#f8fafc', price: 940, wing: 'roof_rack', hood: 'flat_bus', roof: 'skylight_bus', rim: 'hubcap_retro', lights: 'round_euro', desc: '23-window split-screen microbus outfitted with a wooden luggage rack.' },
    { id: 'car_50', num: 50, name: 'Le Mans 1967 GT', cls: 'Classic', body: 'gt40_low', color: '#0ea5e9', accent: '#f97316', price: 2150, wing: 'ducktail', hood: 'nostril_cut', roof: 'ultra_low', rim: 'halibrand', lights: 'covered_lens', desc: 'Forty-inch tall endurance giant-killer in Gulf sky and orange.' },
    { id: 'car_51', num: 51, name: 'London Black Cab GT', cls: 'Classic', body: 'tall_taxi', color: '#18181b', accent: '#facc15', price: 580, wing: 'roof_sign', hood: 'upright_grille', roof: 'tall_cab', rim: 'multi_spoke', lights: 'round_euro', desc: 'Sleeper British upright saloon swapped with an armored V10 crate motor.' },

    // --- CLASS: OFFROAD, TRUCKS & RIGS (52-59) ---
    { id: 'car_52', num: 52, name: 'Baja Trophy Pro', cls: 'Offroad', body: 'baja_truck', color: '#ef4444', accent: '#ffffff', price: 1420, wing: 'spare_bed', hood: 'bulge', roof: 'led_bar', rim: 'beadlock', lights: 'led_bumper', desc: 'Long-travel desert trophy truck carrying tilted twin spares in the bed.' },
    { id: 'car_53', num: 53, name: 'Titan 6x6 Brute', cls: 'Offroad', body: 'six_wheeler', color: '#334155', accent: '#f97316', price: 2700, wing: 'bed_cage', hood: 'armored_flat', roof: 'crew_cab', rim: 'beadlock', lights: 'quad_pod', desc: 'Three-axle six-wheel-drive tactical expedition pickup.' },
    { id: 'car_54', num: 54, name: 'Freightliner Drift', cls: 'Offroad', body: 'semi_rig', color: '#b91c1c', accent: '#e2e8f0', price: 2950, wing: 'aero_sleeper', hood: 'giant_nose', roof: 'stacks_tall', rim: 'semi_alcoa', lights: 'rig_marker', desc: 'Race-tuned Class 8 tractor rig belching flame from twin chrome stacks.' },
    { id: 'car_55', num: 55, name: 'Crusher Monster', cls: 'Offroad', body: 'monster_truck', color: '#16a34a', accent: '#fde047', price: 3100, wing: 'chassis_tube', hood: 'high_pickup', roof: 'rollbar', rim: 'giant_chevron', lights: 'round_pod', desc: 'Lifted tube-chassis stadium crusher riding on colossal chevron tires.' },
    { id: 'car_56', num: 56, name: 'Dakar Raid Runner', cls: 'Offroad', body: 'dakar_buggy', color: '#2563eb', accent: '#fde047', price: 1650, wing: 'spare_roof', hood: 'short_ram', roof: 'dune_cage', rim: 'beadlock', lights: 'led_bar', desc: 'Tall desert raid machine engineered to swallow six-foot whoops flat-out.' },
    { id: 'car_57', num: 57, name: 'Arctic Track Tank', cls: 'Offroad', body: 'halftrack', color: '#e2e8f0', accent: '#ef4444', price: 2850, wing: 'snorkel_tall', hood: 'box_4x4', roof: 'expedition_rack', rim: 'snow_tread', lights: 'quad_pod', desc: 'Polar expedition utility machine equipped with rear tank caterpillar tracks.' },
    { id: 'car_58', num: 58, name: 'Dune Sandrail V8', cls: 'Offroad', body: 'sandrail', color: '#f97316', accent: '#18181b', price: 1180, wing: 'whip_flag', hood: 'open_buggy', roof: 'exposed_cage', rim: 'paddle_tire', lights: 'twin_pod', desc: 'Ultra-light sandrail dune buggy with rear paddle tires and orange whip mast.' },
    { id: 'car_59', num: 59, name: 'Ambulance Interceptor', cls: 'Offroad', body: 'rescue_box', color: '#f8fafc', accent: '#dc2626', price: 1240, wing: 'box_ambulance', hood: 'van_nose', roof: 'lightbar', rim: 'steelie', lights: 'emergency', desc: 'Armored rapid-response medical box van equipped with twin-turbo power.' },

    // --- CLASS: WAGONS & SLEEPERS (60-66) ---
    { id: 'car_60', num: 60, name: 'Avant RS Estate', cls: 'Wagon', body: 'sport_wagon', color: '#475569', accent: '#ef4444', price: 860, wing: 'hatch_rally', hood: 'vented', roof: 'estate_long', rim: 'y_spoke', lights: 'blade', desc: 'Flared five-door performance estate blending family length with twin-turbo bite.' },
    { id: 'car_61', num: 61, name: 'Alpine Ski Box', cls: 'Wagon', body: 'ski_wagon', color: '#f8fafc', accent: '#06b6d4', price: 1090, wing: 'ski_pod', hood: 'vented', roof: 'roof_cargo', rim: 'turbofan', lights: 'blade', desc: 'Color-matched aerodynamic carbon ski pod bolted over a widebody touring shell.' },
    { id: 'car_62', num: 62, name: 'Shooting Brake GT', cls: 'Wagon', body: 'shooting_brake', color: '#065f46', accent: '#fde68a', price: 1440, wing: 'lip', hood: 'long_v16', roof: 'glass_estate', rim: 'multi_spoke', lights: 'crystal', desc: 'Exotic two-door V12 coachbuilt shooting brake with stretched greenhouse.' },
    { id: 'car_63', num: 63, name: 'Midnight Hearse V8', cls: 'Wagon', body: 'hearse', color: '#09090b', accent: '#a855f7', price: 1520, wing: 'landau_fin', hood: 'long_nose', roof: 'extra_long', rim: 'dish', lights: 'halo', desc: 'Extra-long stretched midnight coach fitted with drag radial rear rubber.' },
    { id: 'car_64', num: 64, name: 'F1-Engine Minivan', cls: 'Wagon', body: 'race_minivan', color: '#9333ea', accent: '#fde047', price: 1320, wing: 'roof_wing_van', hood: 'short_van', roof: 'tall_van', rim: 'slick_wide', lights: 'blade', desc: 'Family people-carrier mid-mounted with a 12,000 RPM V10 racing powertrain.' },
    { id: 'car_65', num: 65, name: 'Courier Sprinter', cls: 'Wagon', body: 'panel_van', color: '#2563eb', accent: '#ffffff', price: 660, wing: 'rear_step', hood: 'van_nose', roof: 'tall_box', rim: 'steelie', lights: 'quad', desc: 'Drift-tuned armored delivery panel van with solid side graphics.' },
    { id: 'car_66', num: 66, name: 'Cyber Limo Armored', cls: 'Wagon', body: 'stretch_limo', color: '#1e293b', accent: '#38bdf8', price: 2400, wing: 'antenna_array', hood: 'bulletproof', roof: 'limo_long', rim: 'aero_disc', lights: 'visor', desc: 'Stretched six-window executive limo with active cyan perimeter armor.' },

    // --- CLASS: SCI-FI & PROTOTYPE HYPERCARS (67-75) ---
    { id: 'car_67', num: 67, name: 'Split-Prong Zero', cls: 'Hypercar', body: 'twin_prong', color: '#dc2626', accent: '#f8fafc', price: 3750, wing: 'twin_tail', hood: 'catamaran', roof: 'center_pod', rim: 'turbine', lights: 'laser', desc: 'Catamaran twin-hull nose separating left and right front wheel pods cleanly.' },
    { id: 'car_68', num: 68, name: 'Gyro Monowheel', cls: 'Sci-Fi', body: 'monowheel', color: '#0ea5e9', accent: '#e0f2fe', price: 3100, wing: 'stabilizer', hood: 'ring_outer', roof: 'pod_inside', rim: 'orbital_giant', lights: 'plasma_ring', desc: 'Futuristic inside-the-wheel gyroscopic racer rolling inside a giant ring tire.' },
    { id: 'car_69', num: 69, name: 'Supersonic Thrust SSC', cls: 'Sci-Fi', body: 'jet_car', color: '#18181b', accent: '#ef4444', price: 4600, wing: 'tail_rudder', hood: 'twin_jet_pods', roof: 'jet_cockpit', rim: 'titanium_disc', lights: 'afterburner', desc: 'Twin afterburning turbofan nacelles pushing past Mach 1 across dry lakebeds.' },
    { id: 'car_70', num: 70, name: 'Mag-Lev Sled X9', cls: 'Sci-Fi', body: 'hover_sled', color: '#6366f1', accent: '#c7d2fe', price: 4100, wing: 'split_fins', hood: 'wedge_hover', roof: 'glass_canopy', rim: 'hover_pad', lights: 'visor', desc: 'Wheel-less magnetic levitation interceptor riding on glowing induction skids.' },
    { id: 'car_71', num: 71, name: 'Bubble 2099 Concept', cls: 'Sci-Fi', body: 'bubble_concept', color: '#f8fafc', accent: '#38bdf8', price: 3500, wing: 'clear_fin', hood: 'organic_pod', roof: 'full_glass', rim: 'ring_glow', lights: 'visor', desc: 'Seamless glass-capsule aerodynamic teardrop rolling on hollow hubless rims.' },
    { id: 'car_72', num: 72, name: 'Deora Twin-Deck', cls: 'Sci-Fi', body: 'deora_pod', color: '#06b6d4', accent: '#facc15', price: 2250, wing: 'surf_tail', hood: 'front_door', roof: 'low_bubble', rim: 'ring_glow', lights: 'bar_slit', desc: 'Forward-cab futuristic surfboard concept featuring twin rear fins.' },
    { id: 'car_73', num: 73, name: 'Railgun Kinetic', cls: 'Hypercar', body: 'long_rail', color: '#4f46e5', accent: '#a5b4fc', price: 4400, wing: 'active_split', hood: 'split_rail', roof: 'fighter_canopy', rim: 'aero_disc', lights: 'laser', desc: 'Electromagnetic accelerator rails integrated smoothly along the front fenders.' },
    { id: 'car_74', num: 74, name: 'Obsidian Apex 00', cls: 'Hypercar', body: 'obsidian_v12', color: '#09090b', accent: '#ff1a1a', price: 6500, wing: 'swan_huge', hood: 'vent_trident', roof: 'roof_scoop', rim: 'centerlock', lights: 'fang', desc: 'Track-only V12 carbon apex prototype crowned with glowing crimson blades.' },
    { id: 'car_75', num: 75, name: 'Omega Sovereign GT', cls: 'Hypercar', body: 'omega_prototype', color: '#eab308', accent: '#ffffff', price: 9000, wing: 'tri_plane', hood: 'aero_tunnel', roof: 'shark_fin', rim: 'titanium_disc', lights: 'crystal', desc: 'Peak 2026 championship hypercar blending tri-plane aero with Venturi channels.' },

    // --- CLASS: SEASON 1 THANKSGIVING BATTLEPASS LIMITED (76-80) ---
    { id: 'car_76', num: 76, name: 'Autumn Coupe', cls: 'Season 1 Limited', body: 'harvest_coupe', color: '#c2410c', accent: '#fde68a', price: 0, bpLimited: true, wing: 'ducktail', hood: 'vented', roof: 'fastback', rim: 'mesh6', lights: 'amber_corner', desc: 'S1 Tier 5 Reward — Burly autumn coupe trimmed with copper splitters.' },
    { id: 'car_77', num: 77, name: 'Pilgrim Interceptor', cls: 'Season 1 Limited', body: 'coach_interceptor', color: '#78350f', accent: '#fbbf24', price: 0, bpLimited: true, wing: 'lantern_rack', hood: 'supercharger', roof: 'tall_cab', rim: 'wire_spoke', lights: 'brass_lantern', desc: 'S1 Tier 10 Premium — Armored coach-coupe with brass lanterns and chrome blower.' },
    { id: 'car_78', num: 78, name: 'Amber Wagon GT', cls: 'Season 1 Limited', body: 'harvest_wagon', color: '#b45309', accent: '#fecaca', price: 0, bpLimited: true, wing: 'hatch_rally', hood: 'twin_hood_straps', roof: 'roof_cargo', rim: 'watanabe', lights: 'quad', desc: 'S1 Tier 15 Reward — Widebody timber-trimmed touring wagon carrying a harvest pod.' },
    { id: 'car_79', num: 79, name: 'Cornucopia V12', cls: 'Season 1 Limited', body: 'horn_hypercar', color: '#991b1b', accent: '#fbbf24', price: 0, bpLimited: true, wing: 'crescent_wing', hood: 'horn_scoops', roof: 'double_bubble', rim: 'multi_spoke', lights: 'crystal', desc: 'S1 Tier 20 Premium — Horn-swept gilded V12 tourer crafted for Harvest Drift.' },
    { id: 'car_80', num: 80, name: 'Turkey Overdrive X', cls: 'Season 1 Limited', body: 'feather_hyper', color: '#dc2626', accent: '#f59e0b', price: 0, bpLimited: true, wing: 'feather_fan5', hood: 'molten_core', roof: 'shark_fin', rim: 'turbine', lights: 'fang', desc: 'S1 Tier 30 Ultimate — Active 5-feather DRS fan wing hypercar with molten amber core.' }
  ];

  const LEGACY_CAR_MAP = {
    '\uD83C\uDFCE\uFE0F': 'car-apex',
    '\uD83C\uDFCE': 'car-apex',
    '\uD83D\uDE93': 'car-interceptor',
    '\uD83D\uDE95': 'car-metro',
    '\uD83D\uDE97': 'car-classic',
    '\uD83D\uDE80': 'car-rocket',
    '\uD83D\uDEF8': 'car-saucer',
    '\u26A1': 'car-volt',
    '\uD83D\uDC09': 'car-dragon',
    '\uD83D\uDC51': 'car-sovereign'
  };

  function normalizeCarId(raw) {
    if (!raw) return 'car-apex';
    if (LEGACY_CAR_MAP[raw]) return LEGACY_CAR_MAP[raw];
    if (NPD_CARS.some(c => c.id === raw)) return raw;
    return 'car-apex';
  }

  function getCarMeta(raw) {
    const id = normalizeCarId(raw);
    return NPD_CARS.find(c => c.id === id) || NPD_CARS[0];
  }

  // Resolve effective color palette when combining any of the 80 Car Models + any of the 36 Universal Paints
  function resolveCarColors(car, paintId) {
    const p = getPaintMeta(paintId);
    if (!p || p.id === 'paint_stock' || !p.primary) {
      return {
        main: car.color,
        sec: shadeHex(car.color, 0.45),
        accent: car.accent || '#ffffff',
        sheen: '#ffffff',
        type: 'gloss',
        paintName: 'Factory Stock'
      };
    }
    return {
      main: p.primary,
      sec: p.secondary || shadeHex(p.primary, 0.45),
      accent: p.type === 'stripe' || p.type === 'twotone' ? (p.secondary || '#ffffff') : (p.sheen || '#ffffff'),
      sheen: p.sheen || '#ffffff',
      type: p.type,
      paintName: p.name
    };
  }

  // Deterministic unique gradient ID counter so multiple SVGs on the same DOM never collide
  let _svgUid = 0;

  // Parametric Multi-Body SVG Renderer (viewBox 0 0 96 44) — renders distinctly different car geometry per model!
  function renderNpdCarSvg(rawCar, widthPx = 56, paintId = 'paint_stock', opts = {}) {
    const car = getCarMeta(rawCar);
    const cols = resolveCarColors(car, paintId);
    const h = Math.round(widthPx * (44 / 96));
    const gid = 'npdg_' + (++_svgUid);
    const showFlame = !!opts.nitroFlame;

    const gradType = cols.type;
    let bodyFill = `url(#${gid}_body)`;
    let extraDefs = '';
    if (gradType === 'carbon') {
      extraDefs = `<pattern id="${gid}_carb" width="4" height="4" patternUnits="userSpaceOnUse"><rect width="4" height="4" fill="${cols.sec}"/><rect width="2" height="2" fill="${cols.main}" opacity="0.65"/><rect x="2" y="2" width="2" height="2" fill="${cols.main}" opacity="0.5"/></pattern>`;
      bodyFill = `url(#${gid}_carb)`;
    }

    const defs = `<defs>
      <linearGradient id="${gid}_body" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${cols.sheen}" stop-opacity="0.35"/>
        <stop offset="18%" stop-color="${cols.main}"/>
        <stop offset="70%" stop-color="${cols.main}"/>
        <stop offset="100%" stop-color="${cols.sec}"/>
      </linearGradient>
      <linearGradient id="${gid}_glass" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#38bdf8" stop-opacity="0.45"/>
        <stop offset="100%" stop-color="#050811"/>
      </linearGradient>
      <linearGradient id="${gid}_irid" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="${cols.main}"/>
        <stop offset="50%" stop-color="${cols.sec}"/>
        <stop offset="100%" stop-color="${cols.sheen}"/>
      </linearGradient>
      ${extraDefs}
    </defs>`;

    if (gradType === 'iridescent' || gradType === 'chrome') {
      bodyFill = `url(#${gid}_irid)`;
    }

    const b = car.body;
    let parts = '';
    let wx1 = 24, wx2 = 72, wy = 32, wr1 = 7, wr2 = 7;

    // 1. CHASSIS + ROOFLINE GEOMETRY BY BODY TYPE
    if (b === 'salt_rocket' || b === 'jet_car') {
      // Needle landspeed rocket / jet car
      parts += `<path d="M8 22L28 18H68L92 24L84 28H12L8 22Z" fill="${bodyFill}" stroke="${cols.accent}" stroke-width="1.2"/>`;
      parts += `<path d="M12 10L24 19H12V10Z" fill="${cols.accent}" opacity="0.9"/>`;
      parts += `<path d="M44 14H60L67 19H39L44 14Z" fill="url(#${gid}_glass)" stroke="${cols.sheen}" stroke-width="0.9"/>`;
      if (b === 'jet_car') {
        parts += `<rect x="6" y="20" width="8" height="8" rx="1" fill="#334155" stroke="${cols.accent}" stroke-width="0.9"/>`;
        parts += `<path d="M3 22L7 24L3 26Z" fill="#f97316"/>`;
      }
      wx1 = 26; wx2 = 75; wy = 29; wr1 = 5.5; wr2 = 5.5;
    } else if (b === 'hover_saucer' || b === 'hover_sled' || b === 'deora_pod') {
      // Hover saucer / mag-lev / concept pod (no traditional wheels or hidden hover pads)
      if (b === 'hover_saucer') {
        parts += `<ellipse cx="48" cy="25" rx="38" ry="8.5" fill="${bodyFill}" stroke="${cols.accent}" stroke-width="1.3"/>`;
        parts += `<path d="M30 20C32 10 64 10 66 20Z" fill="url(#${gid}_glass)" stroke="${cols.sheen}" stroke-width="1"/>`;
        parts += `<ellipse cx="48" cy="34" rx="22" ry="2.2" fill="${cols.sheen}" opacity="0.65"/>`;
        parts += `<circle cx="24" cy="25" r="1.8" fill="${cols.sheen}"/><circle cx="48" cy="26" r="2" fill="${cols.sheen}"/><circle cx="72" cy="25" r="1.8" fill="${cols.sheen}"/>`;
        wr1 = 0; wr2 = 0;
      } else if (b === 'hover_sled') {
        parts += `<path d="M10 23L34 15H64L89 24L84 28H12L10 23Z" fill="${bodyFill}" stroke="${cols.accent}" stroke-width="1.2"/>`;
        parts += `<path d="M34 16H60L68 21H28L34 16Z" fill="url(#${gid}_glass)" stroke="${cols.sheen}" stroke-width="0.9"/>`;
        parts += `<rect x="14" y="31" width="22" height="3" rx="1.5" fill="${cols.sheen}" opacity="0.8"/>`;
        parts += `<rect x="58" y="31" width="22" height="3" rx="1.5" fill="${cols.sheen}" opacity="0.8"/>`;
        wr1 = 0; wr2 = 0;
      } else {
        parts += `<path d="M12 24L20 15H62L84 22L86 30H14L12 24Z" fill="${bodyFill}" stroke="${cols.accent}" stroke-width="1.2"/>`;
        parts += `<path d="M52 16H70L79 22H52V16Z" fill="url(#${gid}_glass)" stroke="${cols.sheen}" stroke-width="0.9"/>`;
        wx1 = 27; wx2 = 71; wy = 31; wr1 = 6.5; wr2 = 6.5;
      }
    } else if (b === 'monowheel') {
      // Giant gyro ring wheel with interior capsule!
      parts += `<circle cx="48" cy="22" r="18" fill="none" stroke="#18181b" stroke-width="5.5"/>`;
      parts += `<circle cx="48" cy="22" r="16" fill="none" stroke="${cols.accent}" stroke-width="1.5"/>`;
      parts += `<path d="M33 22L40 14H56L63 22L58 29H38Z" fill="${bodyFill}" stroke="${cols.sheen}" stroke-width="1.2"/>`;
      parts += `<path d="M42 15H55L59 20H40Z" fill="url(#${gid}_glass)"/>`;
      wr1 = 0; wr2 = 0;
    } else if (b === 'f1_modern' || b === 'f1_cigar' || b === 'indy_lowdrag' || b === 'canam_open' || b === 'hillclimb' || b === 'kart' || b === 'sprint_dirt' || b === 'ariel_exo') {
      // Open-wheel family
      wx1 = 24; wx2 = 74; wy = 31; wr1 = 8; wr2 = 7;
      if (b === 'kart') {
        wx1 = 27; wx2 = 69; wy = 33; wr1 = 5.2; wr2 = 4.6;
        parts += `<path d="M22 28H72L75 31H20Z" fill="${bodyFill}" stroke="${cols.accent}" stroke-width="1"/>`;
        parts += `<rect x="44" y="20" width="8" height="8" rx="2" fill="#1e293b" stroke="${cols.accent}"/>`;
        parts += `<path d="M58 22L68 27H56Z" fill="${bodyFill}" stroke="${cols.accent}"/>`;
      } else if (b === 'sprint_dirt') {
        wx1 = 28; wx2 = 68; wy = 32; wr1 = 8.5; wr2 = 6.5;
        parts += `<path d="M26 24L40 20H66L72 28H26Z" fill="${bodyFill}" stroke="${cols.accent}" stroke-width="1.2"/>`;
        // Giant rooftop sprint wing
        parts += `<path d="M22 7L64 9L61 15H24Z" fill="${bodyFill}" stroke="${cols.accent}" stroke-width="1.2"/>`;
        parts += `<line x1="34" y1="15" x2="36" y2="21" stroke="${cols.accent}" stroke-width="1.5"/>`;
        parts += `<line x1="56" y1="15" x2="54" y2="21" stroke="${cols.accent}" stroke-width="1.5"/>`;
      } else if (b === 'ariel_exo' || b === 'sandrail') {
        wx1 = 24; wx2 = 72; wy = 32; wr1 = 7.5; wr2 = 7;
        parts += `<path d="M24 27L38 16H58L74 26L68 30H24Z" fill="none" stroke="${bodyFill}" stroke-width="2.4" stroke-linejoin="round"/>`;
        parts += `<line x1="38" y1="16" x2="48" y2="28" stroke="${cols.accent}" stroke-width="1.6"/>`;
        parts += `<line x1="58" y1="16" x2="48" y2="28" stroke="${cols.accent}" stroke-width="1.6"/>`;
        if (b === 'sandrail') {
          parts += `<line x1="20" y1="26" x2="14" y2="6" stroke="${cols.accent}" stroke-width="1.2"/>`;
          parts += `<polygon points="14,6 6,8 14,11" fill="#f97316"/>`;
        }
      } else if (b === 'f1_cigar') {
        wx1 = 22; wx2 = 75; wy = 32; wr1 = 7; wr2 = 6.5;
        parts += `<path d="M12 24C20 20 68 20 84 26L82 30H14Z" fill="${bodyFill}" stroke="${cols.accent}" stroke-width="1.1"/>`;
        parts += `<circle cx="48" cy="21" r="3" fill="${cols.accent}"/>`;
      } else {
        // Modern F1 / Indy / Can-Am / Hillclimb
        parts += `<path d="M16 25L34 21H64L87 28L85 31H16Z" fill="${bodyFill}" stroke="${cols.accent}" stroke-width="1.1"/>`;
        // Front wing
        parts += `<path d="M77 27L92 29V32H76Z" fill="${cols.accent}" stroke="${cols.main}" stroke-width="0.7"/>`;
        // Rear DRS wing
        parts += `<path d="M8 12H20L22 18H10Z" fill="${bodyFill}" stroke="${cols.accent}" stroke-width="1"/>`;
        parts += `<line x1="15" y1="18" x2="18" y2="24" stroke="${cols.accent}" stroke-width="1.6"/>`;
        // Halo / airbox
        parts += `<path d="M36 16H46L50 21H34Z" fill="${bodyFill}" stroke="${cols.accent}" stroke-width="0.9"/>`;
        parts += `<path d="M46 19C53 16 61 19 64 23" fill="none" stroke="${cols.sheen}" stroke-width="1.6"/>`;
      }
    } else if (b === 'monster_truck' || b === 'baja_truck' || b === 'six_wheeler' || b === 'semi_rig' || b === 'dakar_buggy' || b === 'halftrack') {
      // Heavy Offroad / Trucks / Rigs
      if (b === 'monster_truck') {
        wx1 = 26; wx2 = 70; wy = 31; wr1 = 10.5; wr2 = 10.5;
        parts += `<path d="M16 14H48V9H66L72 15H84V21H16Z" fill="${bodyFill}" stroke="${cols.accent}" stroke-width="1.2"/>`;
        parts += `<rect x="49" y="10.5" width="15" height="5.5" fill="url(#${gid}_glass)"/>`;
        parts += `<path d="M24 22L48 27L72 22" fill="none" stroke="${cols.accent}" stroke-width="2"/>`;
      } else if (b === 'semi_rig') {
        wx1 = 22; wx2 = 74; wy = 33; wr1 = 7; wr2 = 7.2;
        // Sleeper + towering nose + chrome stacks
        parts += `<path d="M14 10H54V16H78L85 21V29H12V24L14 10Z" fill="${bodyFill}" stroke="${cols.accent}" stroke-width="1.2"/>`;
        parts += `<rect x="40" y="12" width="12" height="7" fill="url(#${gid}_glass)"/>`;
        parts += `<rect x="33" y="4" width="2.4" height="14" fill="#cbd5e1"/>`;
        parts += `<rect x="37" y="4" width="2.4" height="14" fill="#cbd5e1"/>`;
        parts += `<circle cx="31" cy="33" r="6.8" fill="#0b0c10" stroke="${cols.accent}" stroke-width="1.5"/>`;
      } else if (b === 'six_wheeler') {
        wx1 = 20; wx2 = 74; wy = 32; wr1 = 7.5; wr2 = 7.5;
        parts += `<path d="M10 19H46L50 12H68L74 19H87V28H10Z" fill="${bodyFill}" stroke="${cols.accent}" stroke-width="1.2"/>`;
        parts += `<rect x="51" y="13.5" width="16" height="6" fill="url(#${gid}_glass)"/>`;
        // Extra 3rd middle axle wheel
        parts += `<circle cx="36" cy="32" r="7.5" fill="#0b0c10" stroke="${cols.accent}" stroke-width="1.6"/>`;
        parts += `<circle cx="36" cy="32" r="3" fill="${cols.main}"/>`;
      } else if (b === 'halftrack') {
        wx1 = 72; wx2 = 72; wy = 32; wr1 = 0; wr2 = 7.5;
        parts += `<path d="M12 13H62L69 19H85V27H12Z" fill="${bodyFill}" stroke="${cols.accent}" stroke-width="1.2"/>`;
        parts += `<rect x="44" y="14.5" width="16" height="5.5" fill="url(#${gid}_glass)"/>`;
        // Rear tank caterpillar track
        parts += `<rect x="13" y="27" width="32" height="10" rx="5" fill="#18181b" stroke="${cols.accent}" stroke-width="1.6"/>`;
        parts += `<circle cx="19" cy="32" r="2.8" fill="${cols.main}"/><circle cx="29" cy="32" r="2.8" fill="${cols.main}"/><circle cx="39" cy="32" r="2.8" fill="${cols.main}"/>`;
      } else {
        // Baja Trophy Truck / Dakar
        wx1 = 24; wx2 = 74; wy = 32; wr1 = 8; wr2 = 8;
        parts += `<path d="M11 20L36 20L44 12H65L74 19H87V26H11Z" fill="${bodyFill}" stroke="${cols.accent}" stroke-width="1.2"/>`;
        parts += `<path d="M46 13.5H63L70 19H42Z" fill="url(#${gid}_glass)"/>`;
        // Tilted spare wheel in truck bed
        parts += `<ellipse cx="22" cy="18" rx="6" ry="3.5" transform="rotate(-22 22 18)" fill="#0b0c10" stroke="${cols.accent}" stroke-width="1.4"/>`;
      }
    } else if (b === 'safari_van' || b === 'tall_taxi' || b === 'rescue_box' || b === 'race_minivan' || b === 'panel_van' || b === 'sport_wagon' || b === 'ski_wagon' || b === 'shooting_brake' || b === 'hearse' || b === 'stretch_limo' || b === 'harvest_wagon') {
      // Vans, Wagons, Shooting Brakes, Hearse, Limo
      wx1 = 24; wx2 = 74; wy = 32; wr1 = 6.8; wr2 = 6.8;
      if (b === 'safari_van' || b === 'rescue_box' || b === 'panel_van' || b === 'race_minivan') {
        parts += `<path d="M13 11H68L78 19L83 22V30H13Z" fill="${bodyFill}" stroke="${cols.accent}" stroke-width="1.2"/>`;
        parts += `<rect x="52" y="13" width="16" height="8" rx="1" fill="url(#${gid}_glass)"/>`;
        if (b === 'safari_van') {
          parts += `<rect x="20" y="13" width="10" height="7" rx="1" fill="url(#${gid}_glass)"/><rect x="33" y="13" width="14" height="7" rx="1" fill="url(#${gid}_glass)"/>`;
          parts += `<line x1="20" y1="8" x2="54" y2="8" stroke="${cols.accent}" stroke-width="1.5"/>`;
        }
        if (b === 'rescue_box') {
          parts += `<rect x="44" y="8" width="9" height="3" rx="1" fill="#ef4444"/><rect x="28" y="18" width="8" height="2.4" fill="#ef4444"/><rect x="30.8" y="15.2" width="2.4" height="8" fill="#ef4444"/>`;
        }
        if (b === 'race_minivan') {
          parts += `<path d="M7 9H17L19 14H9Z" fill="${cols.accent}"/>`;
        }
      } else if (b === 'hearse' || b === 'stretch_limo') {
        wx1 = 20; wx2 = 78; wy = 32; wr1 = 6.2; wr2 = 6.2;
        parts += `<path d="M7 14H58L66 21H89L91 29H7Z" fill="${bodyFill}" stroke="${cols.accent}" stroke-width="1.2"/>`;
        parts += `<rect x="20" y="16" width="12" height="5" fill="url(#${gid}_glass)"/><rect x="35" y="16" width="12" height="5" fill="url(#${gid}_glass)"/><path d="M50 16H57L63 21H50Z" fill="url(#${gid}_glass)"/>`;
      } else {
        // Sport Wagon / Ski Wagon / Harvest Wagon / Shooting Brake
        parts += `<path d="M11 16H54L64 22H85L87 30H11Z" fill="${bodyFill}" stroke="${cols.accent}" stroke-width="1.2"/>`;
        parts += `<path d="M17 17.5H53L61 22H17Z" fill="url(#${gid}_glass)" stroke="${cols.sheen}" stroke-width="0.6"/>`;
        if (b === 'ski_wagon' || b === 'harvest_wagon') {
          parts += `<path d="M20 12H54L56 15H19Z" fill="${cols.accent}" stroke="${cols.main}" stroke-width="0.8"/>`;
        }
      }
    } else if (b === 'hotrod_32' || b === 'boattail' || b === 'fifties_fin' || b === 'bug_baja' || b === 'rat_rod') {
      // Classic 1920s-50s silhouettes + Baja Bug
      wx1 = 22; wx2 = 74; wy = 32; wr1 = 7.4; wr2 = 7;
      if (b === 'bug_baja') {
        wx1 = 27; wx2 = 68; wy = 32; wr1 = 7.8; wr2 = 7.2;
        parts += `<path d="M21 26C21 12 58 10 68 23L75 26L73 30H21Z" fill="${bodyFill}" stroke="${cols.accent}" stroke-width="1.2"/>`;
        parts += `<path d="M35 15C44 13 56 15 62 21H34Z" fill="url(#${gid}_glass)"/>`;
        parts += `<path d="M14 23L22 25" stroke="#cbd5e1" stroke-width="2.5" stroke-linecap="round"/>`;
      } else if (b === 'fifties_fin') {
        parts += `<path d="M6 12L26 20H40L47 13H63L71 20H88V28H8Z" fill="${bodyFill}" stroke="${cols.accent}" stroke-width="1.2"/>`;
        parts += `<path d="M46 14.5H61L68 20H42Z" fill="url(#${gid}_glass)"/>`;
        parts += `<line x1="14" y1="24" x2="86" y2="24" stroke="#f8fafc" stroke-width="1.3"/>`;
      } else {
        // 32 Hot Rod / Rat Rod / Boattail
        const rodTail = b === 'boattail' ? 'M8 23L28 18' : 'M15 13H44V20';
        parts += `<path d="${rodTail}H74L80 26L78 29H15Z" fill="${bodyFill}" stroke="${cols.accent}" stroke-width="1.2"/>`;
        if (b !== 'boattail') parts += `<rect x="26" y="15" width="16" height="5" fill="url(#${gid}_glass)"/>`;
        // Exposed V8 radiator & engine block
        parts += `<rect x="52" y="17" width="15" height="6" rx="1" fill="#475569" stroke="${cols.sheen}" stroke-width="0.9"/>`;
      }
    } else if (b === 'twin_prong' || b === 'hollow_aero') {
      // Sculpted exotic prototypes (Hollow Venturi tunnels / Twin-Prong nose)
      wx1 = 23; wx2 = 73; wy = 32; wr1 = 7; wr2 = 7;
      if (b === 'twin_prong') {
        parts += `<path d="M10 21L28 19L41 13H58L69 19L89 23L85 28H62L67 24H30L10 27Z" fill="${bodyFill}" stroke="${cols.accent}" stroke-width="1.2"/>`;
        parts += `<path d="M42 14.5H57L64 19H36Z" fill="url(#${gid}_glass)"/>`;
      } else {
        parts += `<path d="M10 22L28 18L40 13H60L72 19L88 24V28H64C64 21 34 21 34 28H10Z" fill="${bodyFill}" stroke="${cols.accent}" stroke-width="1.2"/>`;
        parts += `<path d="M42 14.5H58L66 19.5H36Z" fill="url(#${gid}_glass)"/>`;
      }
    } else {
      // Modern & Classic Coupe / Sedan / Hatchback / Supercar / Muscle / Coach families
      const isHatch = b === 'hot_hatch' || b === 'wedge_hatch' || b === 'civic_box' || b === 'group_b';
      const isBoxy = b === 'muscle_box' || b === 'pursuit_sedan' || b === 'box_coupe_r' || b === 'ute_coupe' || b === 'coach_interceptor';
      const isWedge = b === 'hyper_wedge' || b === 'razor_wedge' || b === 'stealth_stealth' || b === 'longtail' || b === 'lmp_proto' || b === 'obsidian_v12' || b === 'omega_prototype' || b === 'feather_hyper' || b === 'horn_hypercar';
      const isOpen = b === 'speedster' || b === 'open_gt' || b === 'snorkel_spyder';

      if (isHatch) {
        parts += `<path d="M14 14H48L62 21H82L85 30H14Z" fill="${bodyFill}" stroke="${cols.accent}" stroke-width="1.2" stroke-linejoin="round"/>`;
        parts += `<path d="M22 15.5H47L58 21H20Z" fill="url(#${gid}_glass)" stroke="${cols.sheen}" stroke-width="0.7"/>`;
      } else if (isOpen) {
        parts += `<path d="M10 23L28 21L38 17H45L54 21H86L88 30H12Z" fill="${bodyFill}" stroke="${cols.accent}" stroke-width="1.2" stroke-linejoin="round"/>`;
        if (b === 'snorkel_spyder') {
          parts += `<path d="M36 13H49L53 20H34Z" fill="${cols.accent}" stroke="${cols.main}" stroke-width="0.8"/>`;
        } else if (b === 'speedster') {
          parts += `<path d="M26 17C30 15 36 16 39 20H24Z" fill="${cols.accent}"/>`;
        }
      } else if (isWedge) {
        const tailX = b === 'longtail' ? 6 : 10;
        const noseX = 89;
        parts += `<path d="M${tailX} 24L28 19L40 13H59L73 20L${noseX} 25V31H${tailX}Z" fill="${bodyFill}" stroke="${cols.accent}" stroke-width="1.2" stroke-linejoin="round"/>`;
        parts += `<path d="M41 14.5H57L68 20H34Z" fill="url(#${gid}_glass)" stroke="${cols.sheen}" stroke-width="0.7"/>`;
        if (b === 'lmp_proto' || b === 'omega_prototype' || b === 'feather_hyper') {
          parts += `<path d="M20 19L39 14V20H20Z" fill="${cols.accent}" opacity="0.85"/>`;
        }
      } else if (isBoxy) {
        const trunkDrop = b === 'ute_coupe' ? 'M11 22H42L45 14H63L70 21' : b === 'coach_interceptor' ? 'M12 12H58L65 20' : 'M11 20L27 20L35 13H59L68 20';
        parts += `<path d="${trunkDrop}H85L87 30H11Z" fill="${bodyFill}" stroke="${cols.accent}" stroke-width="1.2" stroke-linejoin="round"/>`;
        if (b === 'coach_interceptor') {
          parts += `<rect x="20" y="14" width="14" height="6" fill="url(#${gid}_glass)"/><rect x="38" y="14" width="16" height="6" fill="url(#${gid}_glass)"/>`;
        } else {
          parts += `<path d="M46 15H61L67 20H43Z" fill="url(#${gid}_glass)" stroke="${cols.sheen}" stroke-width="0.7"/>`;
        }
      } else {
        // GT Coupes / Fastbacks / Muscle Fastbacks / Harvest Coupe / Sovereign
        const longNose = (car.hood === 'long_v16' || car.hood === 'long_hood_z') ? 90 : 87;
        parts += `<path d="M10 21L26 19L37 13H56L68 20L${longNose} 24V30H10Z" fill="${bodyFill}" stroke="${cols.accent}" stroke-width="1.2" stroke-linejoin="round"/>`;
        parts += `<path d="M38 14.5H54L64 20H31Z" fill="url(#${gid}_glass)" stroke="${cols.sheen}" stroke-width="0.7"/>`;
      }
    }

    // 2. DISTINCT MODEL MODIFIERS: WINGS, HOOD SCOOPS, BUMPERS, RACING STRIPES, LOUVERS
    if (car.wing === 'swan' || car.wing === 'swan_huge' || car.wing === 'endplate_gt' || car.wing === 'chassis_gt') {
      const topY = car.wing === 'swan_huge' ? 8 : 10;
      parts += `<path d="M6 ${topY}L20 ${topY + 2}V${topY + 5}H7Z" fill="${cols.accent}"/>`;
      parts += `<line x1="14" y1="${topY + 4}" x2="17" y2="21" stroke="${cols.accent}" stroke-width="1.8"/>`;
    } else if (car.wing === 'superbird') {
      parts += `<path d="M6 6H19L21 9H8Z" fill="${cols.accent}"/>`;
      parts += `<line x1="12" y1="9" x2="16" y2="21" stroke="${cols.accent}" stroke-width="2"/>`;
    } else if (car.wing === 'giant_boso') {
      parts += `<path d="M4 5L14 19" stroke="#e2e8f0" stroke-width="2.4" stroke-linecap="round"/>`;
      parts += `<path d="M74 28L95 30L94 33H72Z" fill="${cols.accent}"/>`;
    } else if (car.wing === 'feather_fan5') {
      // Thanksgiving Ultimate 5-Feather Active DRS Plume Wing!
      parts += `<path d="M4 10L19 19M6 6L20 18M10 3L21 17M15 4L22 17M19 8L23 18" stroke="#f59e0b" stroke-width="2" stroke-linecap="round"/>`;
      parts += `<circle cx="19" cy="18" r="2.6" fill="#fef08a"/>`;
    } else if (car.wing === 'crescent_wing') {
      parts += `<path d="M7 11C12 7 18 11 20 18L15 20Z" fill="#fbbf24" stroke="#991b1b" stroke-width="0.8"/>`;
    } else if (car.wing === 'hatch_rally' || car.wing === 'tilt_roof') {
      parts += `<path d="M9 10L20 14L18 16H11Z" fill="${cols.accent}"/>`;
    } else if (car.wing === 'ducktail' || car.wing === 'lip') {
      parts += `<path d="M8 17L16 20H10Z" fill="${cols.accent}"/>`;
    } else if (car.wing === 'tri_plane') {
      parts += `<path d="M6 8H19V10H6ZM7 12H19V14H7Z" fill="${cols.accent}"/><line x1="15" y1="14" x2="17" y2="21" stroke="${cols.accent}" stroke-width="1.6"/>`;
    }

    if (car.hood === 'supercharger' || car.hood === 'shaker' || car.hood === 'exposed_v8') {
      parts += `<rect x="66" y="15" width="11" height="6" rx="1.2" fill="#cbd5e1" stroke="#18181b" stroke-width="0.9"/>`;
      parts += `<path d="M77 16L81 17V20H77Z" fill="#ef4444"/>`;
    } else if (car.hood === 'molten_core') {
      parts += `<ellipse cx="72" cy="21" rx="7" ry="1.8" fill="#fbbf24" opacity="0.9"/>`;
    }

    if (car.roof === 'lightbar') {
      parts += `<rect x="44" y="10" width="9" height="3" rx="1" fill="#38bdf8"/>`;
      parts += `<rect x="44" y="10" width="4.5" height="3" rx="1" fill="#ef4444"/>`;
      // Push bumper
      parts += `<rect x="85" y="23" width="4" height="7" rx="1" fill="#cbd5e1"/>`;
    }

    // Stripe / Two-Tone Paint overlay when equipped
    if (cols.type === 'stripe' || cols.type === 'twotone') {
      parts += `<path d="M18 24H82" stroke="${cols.accent}" stroke-width="2.6" stroke-linecap="round" opacity="0.92"/>`;
    }

    // Headlight detail
    if (car.lights && car.lights !== 'none' && wr1 > 0) {
      const beamColor = car.lights === 'brass_lantern' || car.lights === 'amber_corner' ? '#fbbf24' : '#ffffff';
      parts += `<path d="M81 22L88 23.5V26L81 25Z" fill="${beamColor}" opacity="0.95"/>`;
    }

    // Nitro exhaust flame during race boost
    if (showFlame) {
      parts += `<path d="M1 24L11 21V27L1 24Z" fill="#f97316"/><path d="M4 24L11 22.3V25.7L4 24Z" fill="#fef08a"/>`;
    }

    // 3. WHEELS (cut out dark arch wells + draw bespoke rim designs!)
    function drawWheel(cx, cy, r) {
      if (r <= 0) return '';
      const rimR = r * 0.56;
      return `
        <circle cx="${cx}" cy="${cy}" r="${r + 1.2}" fill="#050608"/>
        <circle cx="${cx}" cy="${cy}" r="${r}" fill="#14161d" stroke="#2c303d" stroke-width="1"/>
        <circle cx="${cx}" cy="${cy}" r="${rimR}" fill="none" stroke="${cols.accent}" stroke-width="1.5"/>
        <line x1="${cx - rimR}" y1="${cy}" x2="${cx + rimR}" y2="${cy}" stroke="${cols.accent}" stroke-width="1"/>
        <line x1="${cx}" y1="${cy - rimR}" x2="${cx}" y2="${cy + rimR}" stroke="${cols.accent}" stroke-width="1"/>
        <circle cx="${cx}" cy="${cy}" r="${Math.max(1.3, r * 0.22)}" fill="${cols.main}"/>
      `;
    }
    parts += drawWheel(wx1, wy, wr1) + drawWheel(wx2, wy, wr2);

    return `<span class="npd-car-svg-wrap" title="${escHtml(car.name)}${cols.paintName !== 'Factory Stock' ? ' · ' + escHtml(cols.paintName) : ''}">
      <svg viewBox="0 0 96 44" width="${widthPx}" height="${h}" fill="none" xmlns="http://www.w3.org/2000/svg">${defs}${parts}</svg>
    </span>`;
  }

  // ============================================================
  // INTERACTIVE 3D CAR STUDIO ENGINE (Canvas 3D Orbit + Paint + Lights)
  // ============================================================
  function buildCar3DMeshSpec(car) {
    const b = car.body;
    const isTruck = b === 'monster_truck' || b === 'baja_truck' || b === 'six_wheeler' || b === 'semi_rig' || b === 'dakar_buggy' || b === 'halftrack';
    const isWagon = b === 'sport_wagon' || b === 'ski_wagon' || b === 'harvest_wagon' || b === 'safari_van' || b === 'rescue_box' || b === 'panel_van' || b === 'hearse' || b === 'stretch_limo' || b === 'race_minivan' || b === 'shooting_brake';
    const isF1 = b === 'f1_modern' || b === 'f1_cigar' || b === 'indy_lowdrag' || b === 'sprint_dirt' || b === 'kart' || b === 'ariel_exo' || b === 'sandrail';
    const isSaucer = b === 'hover_saucer';
    const isRocket = b === 'salt_rocket' || b === 'jet_car';
    const isMono = b === 'monowheel';

    return {
      isTruck,
      isWagon,
      isF1,
      isSaucer,
      isRocket,
      isMono,
      rideHeight: b === 'monster_truck' ? 0.65 : isTruck ? 0.42 : isSaucer ? 0.5 : 0.2,
      bodyLen: (b === 'hearse' || b === 'stretch_limo') ? 2.65 : isRocket ? 2.6 : b === 'kart' ? 1.5 : 2.15,
      bodyWid: isF1 ? 0.52 : b === 'semi_rig' ? 1.05 : 0.94,
      deckH: isTruck ? 0.72 : b === 'semi_rig' ? 0.95 : isWagon ? 0.58 : 0.48,
      cabH: isF1 ? 0.25 : b === 'safari_van' || b === 'rescue_box' || b === 'tall_taxi' || b === 'semi_rig' ? 0.62 : (b === 'speedster' || b === 'open_gt' ? 0.16 : 0.42),
      cabStart: isWagon ? -1.45 : isRocket ? -0.3 : -0.75,
      cabEnd: b === 'safari_van' ? 1.35 : isTruck ? 0.75 : 0.55,
      wheelR: b === 'monster_truck' ? 0.55 : isTruck ? 0.4 : b === 'kart' ? 0.24 : 0.34,
      wheelOffX: isF1 ? 0.92 : 0.88,
      wheelOffZ: b === 'hearse' || b === 'stretch_limo' ? 1.7 : 1.35,
      hasSupercharger: car.hood === 'supercharger' || car.hood === 'shaker' || car.hood === 'exposed_v8',
      hasWing: car.wing !== 'none' && car.wing !== 'lip',
      isFeatherWing: car.wing === 'feather_fan5',
      isTallWing: car.wing === 'superbird' || car.wing === 'sprint_top' || car.wing === 'swan_huge' || car.wing === 'giant_boso',
      isSixWheel: b === 'six_wheeler',
      hasLightbar: car.roof === 'lightbar'
    };
  }

  function mountCar3DViewer(canvas, initialOpts = {}) {
    if (!canvas) return null;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    let state = {
      carId: initialOpts.carId || 'car-apex',
      paintId: initialOpts.paintId || 'paint_stock',
      yaw: typeof initialOpts.yaw === 'number' ? initialOpts.yaw : 0.65,
      pitch: typeof initialOpts.pitch === 'number' ? initialOpts.pitch : 0.28,
      zoom: typeof initialOpts.zoom === 'number' ? initialOpts.zoom : 1.0,
      autoSpin: initialOpts.autoSpin !== false,
      headlights: initialOpts.headlights !== false,
      underglow: !!initialOpts.underglow
    };

    let dragging = false;
    let lastX = 0;
    let lastY = 0;
    let rafId = 0;
    let destroyed = false;

    const project = (x, y, z, w, h, scale) => {
      const cy = Math.cos(state.yaw), sy = Math.sin(state.yaw);
      const cp = Math.cos(state.pitch), sp = Math.sin(state.pitch);
      const rx = x * cy - z * sy;
      const rz = x * sy + z * cy;
      const ry2 = y * cp - rz * sp;
      const rz2 = y * sp + rz * cp;
      const dist = 6.2;
      const f = (dist / Math.max(1.2, dist - rz2)) * scale * state.zoom;
      return {
        sx: w * 0.5 + rx * f,
        sy: h * 0.57 - ry2 * f,
        z: rz2,
        f
      };
    };

    const addBoxFaces = (faces, cx, cy, cz, sx, sy, sz, color, isGlass) => {
      const hx = sx * 0.5, hy = sy * 0.5, hz = sz * 0.5;
      const v = [
        [cx - hx, cy - hy, cz - hz], [cx + hx, cy - hy, cz - hz],
        [cx + hx, cy + hy, cz - hz], [cx - hx, cy + hy, cz - hz],
        [cx - hx, cy - hy, cz + hz], [cx + hx, cy - hy, cz + hz],
        [cx + hx, cy + hy, cz + hz], [cx - hx, cy + hy, cz + hz]
      ];
      const defs = [
        { idx: [3, 2, 6, 7], shade: 1.15 }, // top
        { idx: [0, 1, 5, 4], shade: 0.48 }, // bottom
        { idx: [4, 5, 6, 7], shade: 0.96 }, // front (+z)
        { idx: [1, 0, 3, 2], shade: 0.72 }, // back (-z)
        { idx: [1, 2, 6, 5], shade: 0.85 }, // right
        { idx: [0, 4, 7, 3], shade: 0.85 }  // left
      ];
      defs.forEach(d => {
        faces.push({
          pts: d.idx.map(i => v[i]),
          color: isGlass ? mixHex('#0c192c', '#38bdf8', d.shade > 1 ? 0.28 : 0.14) : shadeHex(color, d.shade),
          stroke: isGlass ? 'rgba(148,163,184,0.45)' : 'rgba(255,255,255,0.12)'
        });
      });
    };

    const drawWheel3D = (faces, wx, wy, wz, rad, width, rimColor) => {
      const segs = 10;
      const hx = width * 0.5;
      const outer = [];
      const inner = [];
      for (let i = 0; i < segs; i++) {
        const a = (i / segs) * Math.PI * 2;
        const y = wy + Math.sin(a) * rad;
        const z = wz + Math.cos(a) * rad;
        outer.push([wx + (wx >= 0 ? hx : -hx), y, z]);
        inner.push([wx - (wx >= 0 ? hx : -hx), y, z]);
      }
      // Sidewall discs
      faces.push({ pts: outer, color: '#14161e', stroke: rimColor, wheelHub: [wx + (wx >= 0 ? hx : -hx), wy, wz, rad * 0.54, rimColor] });
      for (let i = 0; i < segs; i++) {
        const n = (i + 1) % segs;
        faces.push({ pts: [outer[i], outer[n], inner[n], inner[i]], color: '#0d0e13', stroke: 'rgba(255,255,255,0.06)' });
      }
    };

    const drawFrame = () => {
      if (destroyed) return;
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      const targetW = Math.max(260, Math.floor((rect.width || canvas.width || 480) * dpr));
      const targetH = Math.max(180, Math.floor((rect.height || canvas.height || 300) * dpr));
      if (canvas.width !== targetW || canvas.height !== targetH) {
        canvas.width = targetW;
        canvas.height = targetH;
      }
      const w = canvas.width;
      const h = canvas.height;
      const scale = Math.min(w, h) * 0.24;

      ctx.clearRect(0, 0, w, h);

      const car = getCarMeta(state.carId);
      const cols = resolveCarColors(car, state.paintId);
      const spec = buildCar3DMeshSpec(car);

      // Studio radial backdrop
      const bgGrad = ctx.createRadialGradient(w * 0.5, h * 0.56, 10, w * 0.5, h * 0.55, w * 0.65);
      bgGrad.addColorStop(0, mixHex('#18080a', cols.main, 0.2));
      bgGrad.addColorStop(1, '#070406');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, w, h);

      // Rotating turntable rings on floor (y = 0)
      const floorPts = [];
      for (let i = 0; i < 32; i++) {
        const a = (i / 32) * Math.PI * 2;
        floorPts.push(project(Math.cos(a) * 2.55, 0, Math.sin(a) * 2.55, w, h, scale));
      }
      ctx.beginPath();
      floorPts.forEach((p, idx) => idx === 0 ? ctx.moveTo(p.sx, p.sy) : ctx.lineTo(p.sx, p.sy));
      ctx.closePath();
      ctx.fillStyle = 'rgba(255,255,255,0.03)';
      ctx.fill();
      ctx.strokeStyle = mixHex('#ff2a2a', cols.main, 0.55);
      ctx.lineWidth = Math.max(1.2, dpr);
      ctx.stroke();

      // Underglow Neon
      if (state.underglow) {
        const ug = project(0, 0.02, 0, w, h, scale);
        const rad = scale * state.zoom * 1.45;
        const ugGrad = ctx.createRadialGradient(ug.sx, ug.sy, 4, ug.sx, ug.sy, rad);
        ugGrad.addColorStop(0, cols.main);
        ugGrad.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.save();
        ctx.globalAlpha = 0.5;
        ctx.fillStyle = ugGrad;
        ctx.beginPath();
        ctx.ellipse(ug.sx, ug.sy, rad * 1.25, rad * 0.55, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      const faces = [];

      if (spec.isSaucer) {
        // Multi-ring 3D saucer
        const segs = 16;
        const topRim = [], botRim = [];
        for (let i = 0; i < segs; i++) {
          const a = (i / segs) * Math.PI * 2;
          topRim.push([Math.cos(a) * 1.55, spec.rideHeight + 0.25, Math.sin(a) * 1.55]);
          botRim.push([Math.cos(a) * 1.45, spec.rideHeight, Math.sin(a) * 1.45]);
        }
        for (let i = 0; i < segs; i++) {
          const n = (i + 1) % segs;
          faces.push({ pts: [topRim[i], topRim[n], botRim[n], botRim[i]], color: shadeHex(cols.main, 0.78 + 0.25 * Math.sin(i)), stroke: cols.accent });
        }
        faces.push({ pts: topRim, color: cols.main, stroke: cols.accent });
        addBoxFaces(faces, 0, spec.rideHeight + 0.45, 0, 1.1, 0.4, 1.1, cols.main, true);
      } else if (spec.isMono) {
        // 3D Gyro Ring + interior pod
        const segs = 14;
        for (let i = 0; i < segs; i++) {
          const a1 = (i / segs) * Math.PI * 2;
          const a2 = ((i + 1) / segs) * Math.PI * 2;
          const R = 1.05, y0 = 1.08;
          faces.push({
            pts: [
              [-0.22, y0 + Math.sin(a1) * R, Math.cos(a1) * R],
              [0.22, y0 + Math.sin(a1) * R, Math.cos(a1) * R],
              [0.22, y0 + Math.sin(a2) * R, Math.cos(a2) * R],
              [-0.22, y0 + Math.sin(a2) * R, Math.cos(a2) * R]
            ],
            color: i % 2 === 0 ? '#18181b' : '#27272a',
            stroke: cols.accent
          });
        }
        addBoxFaces(faces, 0, 1.05, 0, 0.72, 0.65, 1.15, cols.main, false);
        addBoxFaces(faces, 0, 1.25, 0.1, 0.62, 0.35, 0.68, cols.main, true);
      } else {
        // Main Chassis Box
        const baseCy = spec.rideHeight + spec.deckH * 0.5;
        addBoxFaces(faces, 0, baseCy, 0, spec.bodyWid * 2, spec.deckH, spec.bodyLen * 2, cols.main, false);

        // Racing Stripe on top if applicable
        if (cols.type === 'stripe' || cols.type === 'twotone') {
          addBoxFaces(faces, 0, spec.rideHeight + spec.deckH + 0.015, 0, 0.36, 0.02, spec.bodyLen * 1.98, cols.accent, false);
        }

        // Tapered Front Hood Slope
        addBoxFaces(faces, 0, spec.rideHeight + spec.deckH * 0.85, spec.bodyLen * 0.62, spec.bodyWid * 1.9, spec.deckH * 0.45, spec.bodyLen * 0.72, mixHex(cols.main, cols.sec, 0.25), false);

        // Cabin / Canopy
        if (spec.cabH > 0.1) {
          const cabLen = Math.max(0.7, spec.cabEnd - spec.cabStart);
          const cabCz = (spec.cabStart + spec.cabEnd) * 0.5;
          const cabY = spec.rideHeight + spec.deckH + spec.cabH * 0.5;
          addBoxFaces(faces, 0, cabY, cabCz, spec.bodyWid * (spec.isWagon ? 1.72 : 1.5), spec.cabH, cabLen, cols.main, true);
          // Roof panel cap
          addBoxFaces(faces, 0, spec.rideHeight + spec.deckH + spec.cabH + 0.02, cabCz - 0.05, spec.bodyWid * (spec.isWagon ? 1.66 : 1.42), 0.05, cabLen * 0.86, cols.main, false);
        }

        // Open-wheel Front & Rear Wings
        if (spec.isF1) {
          addBoxFaces(faces, 0, spec.rideHeight + 0.08, spec.bodyLen * 1.05, 1.95, 0.08, 0.38, cols.accent, false);
        }
        if (spec.hasWing) {
          const wyH = spec.isTallWing ? 0.55 : 0.28;
          const wingY = spec.rideHeight + spec.deckH + wyH;
          if (spec.isFeatherWing) {
            for (let fi = -2; fi <= 2; fi++) {
              addBoxFaces(faces, fi * 0.32, wingY + 0.14 - Math.abs(fi) * 0.04, -spec.bodyLen * 0.92, 0.22, 0.45, 0.12, fi % 2 === 0 ? '#f59e0b' : '#dc2626', false);
            }
          } else {
            addBoxFaces(faces, 0, wingY, -spec.bodyLen * 0.88, spec.bodyWid * 2.02, 0.08, 0.34, cols.accent, false);
            addBoxFaces(faces, -0.45, spec.rideHeight + spec.deckH + wyH * 0.5, -spec.bodyLen * 0.86, 0.07, wyH, 0.14, cols.sec, false);
            addBoxFaces(faces, 0.45, spec.rideHeight + spec.deckH + wyH * 0.5, -spec.bodyLen * 0.86, 0.07, wyH, 0.14, cols.sec, false);
          }
        }
        if (spec.hasSupercharger) {
          addBoxFaces(faces, 0, spec.rideHeight + spec.deckH + 0.16, 0.95, 0.44, 0.28, 0.52, '#cbd5e1', false);
        }
        if (spec.hasLightbar) {
          addBoxFaces(faces, -0.25, spec.rideHeight + spec.deckH + spec.cabH + 0.1, 0.05, 0.48, 0.12, 0.24, '#ef4444', false);
          addBoxFaces(faces, 0.25, spec.rideHeight + spec.deckH + spec.cabH + 0.1, 0.05, 0.48, 0.12, 0.24, '#3b82f6', false);
        }

        // Headlights glow on nose (+z)
        if (state.headlights) {
          addBoxFaces(faces, -spec.bodyWid * 0.65, spec.rideHeight + spec.deckH * 0.6, spec.bodyLen + 0.03, 0.35, 0.12, 0.04, '#fef08a', false);
          addBoxFaces(faces, spec.bodyWid * 0.65, spec.rideHeight + spec.deckH * 0.6, spec.bodyLen + 0.03, 0.35, 0.12, 0.04, '#fef08a', false);
        }

        // Wheels
        drawWheel3D(faces, -spec.wheelOffX, spec.wheelR, spec.wheelOffZ, spec.wheelR, 0.28, cols.accent);
        drawWheel3D(faces, spec.wheelOffX, spec.wheelR, spec.wheelOffZ, spec.wheelR, 0.28, cols.accent);
        drawWheel3D(faces, -spec.wheelOffX, spec.wheelR, -spec.wheelOffZ, spec.wheelR, 0.3, cols.accent);
        drawWheel3D(faces, spec.wheelOffX, spec.wheelR, -spec.wheelOffZ, spec.wheelR, 0.3, cols.accent);
        if (spec.isSixWheel) {
          drawWheel3D(faces, -spec.wheelOffX, spec.wheelR, -0.1, spec.wheelR, 0.3, cols.accent);
          drawWheel3D(faces, spec.wheelOffX, spec.wheelR, -0.1, spec.wheelR, 0.3, cols.accent);
        }
      }

      // Depth-sort faces (Painter's algorithm by average projected Z)
      const projected = faces.map(f => {
        const pts2 = f.pts.map(p => project(p[0], p[1], p[2], w, h, scale));
        const avgZ = pts2.reduce((s, p) => s + p.z, 0) / pts2.length;
        return { f, pts2, avgZ };
      }).sort((a, b) => a.avgZ - b.avgZ);

      projected.forEach(({ f, pts2 }) => {
        ctx.beginPath();
        pts2.forEach((p, i) => i === 0 ? ctx.moveTo(p.sx, p.sy) : ctx.lineTo(p.sx, p.sy));
        ctx.closePath();
        ctx.fillStyle = f.color;
        ctx.fill();
        if (f.stroke) {
          ctx.strokeStyle = f.stroke;
          ctx.lineWidth = Math.max(0.8, 0.9 * dpr);
          ctx.stroke();
        }
        if (f.wheelHub) {
          const hp = project(f.wheelHub[0], f.wheelHub[1], f.wheelHub[2], w, h, scale);
          ctx.beginPath();
          ctx.arc(hp.sx, hp.sy, Math.max(2, f.wheelHub[3] * hp.f * 0.7), 0, Math.PI * 2);
          ctx.fillStyle = f.wheelHub[4];
          ctx.fill();
        }
      });

      // Subtle HUD caption in canvas corner
      ctx.fillStyle = 'rgba(255,255,255,0.6)';
      ctx.font = `700 ${Math.round(10 * dpr)}px Inter, sans-serif`;
      ctx.fillText(`3D STUDIO · DRAG TO ORBIT · SCROLL TO ZOOM`, Math.round(12 * dpr), Math.round(18 * dpr));

      if (state.autoSpin && !dragging) state.yaw += 0.008;
    };

    const tickLoop = () => {
      if (destroyed) return;
      drawFrame();
      rafId = requestAnimationFrame(tickLoop);
    };

    const onDown = e => {
      dragging = true;
      const pt = e.touches ? e.touches[0] : e;
      lastX = pt.clientX;
      lastY = pt.clientY;
    };
    const onMove = e => {
      if (!dragging) return;
      const pt = e.touches ? e.touches[0] : e;
      const dx = pt.clientX - lastX;
      const dy = pt.clientY - lastY;
      lastX = pt.clientX;
      lastY = pt.clientY;
      state.yaw += dx * 0.012;
      state.pitch = Math.max(0.05, Math.min(1.15, state.pitch + dy * 0.008));
    };
    const onUp = () => { dragging = false; };
    const onWheel = e => {
      e.preventDefault();
      state.zoom = Math.max(0.65, Math.min(1.75, state.zoom - e.deltaY * 0.001));
    };

    canvas.addEventListener('mousedown', onDown);
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    canvas.addEventListener('touchstart', onDown, { passive: true });
    window.addEventListener('touchmove', onMove, { passive: true });
    window.addEventListener('touchend', onUp);
    canvas.addEventListener('wheel', onWheel, { passive: false });

    drawFrame();
    rafId = requestAnimationFrame(tickLoop);

    return {
      update(next) {
        Object.assign(state, next || {});
        drawFrame();
      },
      getState() {
        return { ...state };
      },
      destroy() {
        destroyed = true;
        if (rafId) cancelAnimationFrame(rafId);
        canvas.removeEventListener('mousedown', onDown);
        window.removeEventListener('mousemove', onMove);
        window.removeEventListener('mouseup', onUp);
        canvas.removeEventListener('touchstart', onDown);
        window.removeEventListener('touchmove', onMove);
        window.removeEventListener('touchend', onUp);
        canvas.removeEventListener('wheel', onWheel);
      }
    };
  }

  global.NPD_CARS = NPD_CARS;
  global.NPD_PAINTS = NPD_PAINTS;
  global.LEGACY_CAR_MAP = LEGACY_CAR_MAP;
  global.normalizeCarId = normalizeCarId;
  global.getCarMeta = getCarMeta;
  global.getPaintMeta = getPaintMeta;
  global.resolveCarColors = resolveCarColors;
  global.renderNpdCarSvg = renderNpdCarSvg;
  global.mountCar3DViewer = mountCar3DViewer;
})(window);
