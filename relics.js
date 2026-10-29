// Source: https://hsr.nanoka.cc/relic/124 | data 4.6.54 | icons saved locally from Nanoka
const RELIC_SETS = [
  {
    "id": "101",
    "name": "Passerby of Wandering Cloud",
    "parts": [
      {
        "id": "31011",
        "name": "Passerby's Rejuvenated Wooden Hairstick",
        "slot": 1,
        "icon": "assets/relics/parts/31011.webp"
      },
      {
        "id": "31012",
        "name": "Passerby's Roaming Dragon Bracer",
        "slot": 2,
        "icon": "assets/relics/parts/31012.webp"
      },
      {
        "id": "31013",
        "name": "Passerby's Ragged Embroidered Coat",
        "slot": 3,
        "icon": "assets/relics/parts/31013.webp"
      },
      {
        "id": "31014",
        "name": "Passerby's Stygian Hiking Boots",
        "slot": 4,
        "icon": "assets/relics/parts/31014.webp"
      }
    ],
    "bonuses": [
      {
        "count": 2,
        "description": "Increases Outgoing Healing by 10%."
      },
      {
        "count": 4,
        "description": "At the start of the battle, immediately regenerates 1 Skill Point."
      }
    ],
    "icon": "assets/relics/sets/101.webp"
  },
  {
    "id": "102",
    "name": "Musketeer of Wild Wheat",
    "parts": [
      {
        "id": "31021",
        "name": "Musketeer's Wild Wheat Felt Hat",
        "slot": 1,
        "icon": "assets/relics/parts/31021.webp"
      },
      {
        "id": "31022",
        "name": "Musketeer's Coarse Leather Gloves",
        "slot": 2,
        "icon": "assets/relics/parts/31022.webp"
      },
      {
        "id": "31023",
        "name": "Musketeer's Wind-Hunting Shawl",
        "slot": 3,
        "icon": "assets/relics/parts/31023.webp"
      },
      {
        "id": "31024",
        "name": "Musketeer's Rivets Riding Boots",
        "slot": 4,
        "icon": "assets/relics/parts/31024.webp"
      }
    ],
    "bonuses": [
      {
        "count": 2,
        "description": "Increases ATK by 12%."
      },
      {
        "count": 4,
        "description": "The wearer's SPD increases by 6% and DMG dealt by Basic ATK increases by 10%."
      }
    ],
    "icon": "assets/relics/sets/102.webp"
  },
  {
    "id": "103",
    "name": "Knight of Purity Palace",
    "parts": [
      {
        "id": "31031",
        "name": "Knight's Forgiving Casque",
        "slot": 1,
        "icon": "assets/relics/parts/31031.webp"
      },
      {
        "id": "31032",
        "name": "Knight's Silent Oath Ring",
        "slot": 2,
        "icon": "assets/relics/parts/31032.webp"
      },
      {
        "id": "31033",
        "name": "Knight's Solemn Breastplate",
        "slot": 3,
        "icon": "assets/relics/parts/31033.webp"
      },
      {
        "id": "31034",
        "name": "Knight's Iron Boots of Order",
        "slot": 4,
        "icon": "assets/relics/parts/31034.webp"
      }
    ],
    "bonuses": [
      {
        "count": 2,
        "description": "Increases DEF by 15%."
      },
      {
        "count": 4,
        "description": "Increases the max DMG that can be absorbed by the Shield created by the wearer by 20%."
      }
    ],
    "icon": "assets/relics/sets/103.webp"
  },
  {
    "id": "104",
    "name": "Hunter of Glacial Forest",
    "parts": [
      {
        "id": "31041",
        "name": "Hunter's Artaius Hood",
        "slot": 1,
        "icon": "assets/relics/parts/31041.webp"
      },
      {
        "id": "31042",
        "name": "Hunter's Lizard Gloves",
        "slot": 2,
        "icon": "assets/relics/parts/31042.webp"
      },
      {
        "id": "31043",
        "name": "Hunter's Ice Dragon Cloak",
        "slot": 3,
        "icon": "assets/relics/parts/31043.webp"
      },
      {
        "id": "31044",
        "name": "Hunter's Soft Elkskin Boots",
        "slot": 4,
        "icon": "assets/relics/parts/31044.webp"
      }
    ],
    "bonuses": [
      {
        "count": 2,
        "description": "Increases Ice DMG by 10%."
      },
      {
        "count": 4,
        "description": "After the wearer uses their Ultimate, their CRIT DMG increases by 25% for 2 turn(s)."
      }
    ],
    "icon": "assets/relics/sets/104.webp"
  },
  {
    "id": "105",
    "name": "Champion of Streetwise Boxing",
    "parts": [
      {
        "id": "31051",
        "name": "Champion's Headgear",
        "slot": 1,
        "icon": "assets/relics/parts/31051.webp"
      },
      {
        "id": "31052",
        "name": "Champion's Heavy Gloves",
        "slot": 2,
        "icon": "assets/relics/parts/31052.webp"
      },
      {
        "id": "31053",
        "name": "Champion's Chest Guard",
        "slot": 3,
        "icon": "assets/relics/parts/31053.webp"
      },
      {
        "id": "31054",
        "name": "Champion's Fleetfoot Boots",
        "slot": 4,
        "icon": "assets/relics/parts/31054.webp"
      }
    ],
    "bonuses": [
      {
        "count": 2,
        "description": "Increases Physical DMG by 10%."
      },
      {
        "count": 4,
        "description": "After the wearer attacks or is hit, their ATK increases by 5% for the rest of the battle. This effect can stack up to 5 time(s)."
      }
    ],
    "icon": "assets/relics/sets/105.webp"
  },
  {
    "id": "106",
    "name": "Guard of Wuthering Snow",
    "parts": [
      {
        "id": "31061",
        "name": "Guard's Cast Iron Helmet",
        "slot": 1,
        "icon": "assets/relics/parts/31061.webp"
      },
      {
        "id": "31062",
        "name": "Guard's Shining Gauntlets",
        "slot": 2,
        "icon": "assets/relics/parts/31062.webp"
      },
      {
        "id": "31063",
        "name": "Guard's Uniform of Old",
        "slot": 3,
        "icon": "assets/relics/parts/31063.webp"
      },
      {
        "id": "31064",
        "name": "Guard's Silver Greaves",
        "slot": 4,
        "icon": "assets/relics/parts/31064.webp"
      }
    ],
    "bonuses": [
      {
        "count": 2,
        "description": "Reduces DMG taken by 8%."
      },
      {
        "count": 4,
        "description": "At the beginning of the turn, if the wearer's HP percentage is equal to or less than 50%, restores HP equal to 8% of their Max HP and regenerates 5 Energy."
      }
    ],
    "icon": "assets/relics/sets/106.webp"
  },
  {
    "id": "107",
    "name": "Firesmith of Lava-Forging",
    "parts": [
      {
        "id": "31071",
        "name": "Firesmith's Obsidian Goggles",
        "slot": 1,
        "icon": "assets/relics/parts/31071.webp"
      },
      {
        "id": "31072",
        "name": "Firesmith's Ring of Flame-Mastery",
        "slot": 2,
        "icon": "assets/relics/parts/31072.webp"
      },
      {
        "id": "31073",
        "name": "Firesmith's Fireproof Apron",
        "slot": 3,
        "icon": "assets/relics/parts/31073.webp"
      },
      {
        "id": "31074",
        "name": "Firesmith's Alloy Leg",
        "slot": 4,
        "icon": "assets/relics/parts/31074.webp"
      }
    ],
    "bonuses": [
      {
        "count": 2,
        "description": "Increases Fire DMG by 10%."
      },
      {
        "count": 4,
        "description": "Increases DMG by the wearer's Skill by 12%. After unleashing Ultimate, increases the wearer's Fire DMG by 12% for the next attack."
      }
    ],
    "icon": "assets/relics/sets/107.webp"
  },
  {
    "id": "108",
    "name": "Genius of Brilliant Stars",
    "parts": [
      {
        "id": "31081",
        "name": "Genius's Ultraremote Sensing Visor",
        "slot": 1,
        "icon": "assets/relics/parts/31081.webp"
      },
      {
        "id": "31082",
        "name": "Genius's Frequency Catcher",
        "slot": 2,
        "icon": "assets/relics/parts/31082.webp"
      },
      {
        "id": "31083",
        "name": "Genius's Metafield Suit",
        "slot": 3,
        "icon": "assets/relics/parts/31083.webp"
      },
      {
        "id": "31084",
        "name": "Genius's Gravity Walker",
        "slot": 4,
        "icon": "assets/relics/parts/31084.webp"
      }
    ],
    "bonuses": [
      {
        "count": 2,
        "description": "Increases Quantum DMG by 10%."
      },
      {
        "count": 4,
        "description": "When the wearer deals DMG to the target enemy, ignores 10% DEF. If the target enemy has Quantum Weakness, the wearer additionally ignores 10% DEF."
      }
    ],
    "icon": "assets/relics/sets/108.webp"
  },
  {
    "id": "109",
    "name": "Band of Sizzling Thunder",
    "parts": [
      {
        "id": "31091",
        "name": "Band's Polarized Sunglasses",
        "slot": 1,
        "icon": "assets/relics/parts/31091.webp"
      },
      {
        "id": "31092",
        "name": "Band's Touring Bracelet",
        "slot": 2,
        "icon": "assets/relics/parts/31092.webp"
      },
      {
        "id": "31093",
        "name": "Band's Leather Jacket With Studs",
        "slot": 3,
        "icon": "assets/relics/parts/31093.webp"
      },
      {
        "id": "31094",
        "name": "Band's Ankle Boots With Rivets",
        "slot": 4,
        "icon": "assets/relics/parts/31094.webp"
      }
    ],
    "bonuses": [
      {
        "count": 2,
        "description": "Increases Lightning DMG by 10%."
      },
      {
        "count": 4,
        "description": "When the wearer uses their Skill, increases the wearer's ATK by 20% for 1 turn(s)."
      }
    ],
    "icon": "assets/relics/sets/109.webp"
  },
  {
    "id": "110",
    "name": "Eagle of Twilight Line",
    "parts": [
      {
        "id": "31101",
        "name": "Eagle's Beaked Helmet",
        "slot": 1,
        "icon": "assets/relics/parts/31101.webp"
      },
      {
        "id": "31102",
        "name": "Eagle's Soaring Ring",
        "slot": 2,
        "icon": "assets/relics/parts/31102.webp"
      },
      {
        "id": "31103",
        "name": "Eagle's Winged Suit Harness",
        "slot": 3,
        "icon": "assets/relics/parts/31103.webp"
      },
      {
        "id": "31104",
        "name": "Eagle's Quilted Puttees",
        "slot": 4,
        "icon": "assets/relics/parts/31104.webp"
      }
    ],
    "bonuses": [
      {
        "count": 2,
        "description": "Increases Wind DMG by 10%."
      },
      {
        "count": 4,
        "description": "After the wearer uses their Ultimate, their action is Advanced Forward by 25%."
      }
    ],
    "icon": "assets/relics/sets/110.webp"
  },
  {
    "id": "111",
    "name": "Thief of Shooting Meteor",
    "parts": [
      {
        "id": "31111",
        "name": "Thief's Myriad-Faced Mask",
        "slot": 1,
        "icon": "assets/relics/parts/31111.webp"
      },
      {
        "id": "31112",
        "name": "Thief's Gloves With Prints",
        "slot": 2,
        "icon": "assets/relics/parts/31112.webp"
      },
      {
        "id": "31113",
        "name": "Thief's Steel Grappling Hook",
        "slot": 3,
        "icon": "assets/relics/parts/31113.webp"
      },
      {
        "id": "31114",
        "name": "Thief's Meteor Boots",
        "slot": 4,
        "icon": "assets/relics/parts/31114.webp"
      }
    ],
    "bonuses": [
      {
        "count": 2,
        "description": "Increases Break Effect by 16%."
      },
      {
        "count": 4,
        "description": "Increases the wearer's Break Effect by 16%. After the wearer inflicts Weakness Break on an enemy, regenerates 3 Energy."
      }
    ],
    "icon": "assets/relics/sets/111.webp"
  },
  {
    "id": "112",
    "name": "Wastelander of Banditry Desert",
    "parts": [
      {
        "id": "31121",
        "name": "Wastelander's Breathing Mask",
        "slot": 1,
        "icon": "assets/relics/parts/31121.webp"
      },
      {
        "id": "31122",
        "name": "Wastelander's Desert Terminal",
        "slot": 2,
        "icon": "assets/relics/parts/31122.webp"
      },
      {
        "id": "31123",
        "name": "Wastelander's Friar Robe",
        "slot": 3,
        "icon": "assets/relics/parts/31123.webp"
      },
      {
        "id": "31124",
        "name": "Wastelander's Powered Greaves",
        "slot": 4,
        "icon": "assets/relics/parts/31124.webp"
      }
    ],
    "bonuses": [
      {
        "count": 2,
        "description": "Increases Imaginary DMG by 10%."
      },
      {
        "count": 4,
        "description": "When dealing DMG to debuffed enemy targets, the wearer has their CRIT Rate increased by 10%. And when they deal DMG to Imprisoned enemy targets, their CRIT DMG increases by 20%."
      }
    ],
    "icon": "assets/relics/sets/112.webp"
  },
  {
    "id": "113",
    "name": "Longevous Disciple",
    "parts": [
      {
        "id": "31131",
        "name": "Disciple's Prosthetic Eye",
        "slot": 1,
        "icon": "assets/relics/parts/31131.webp"
      },
      {
        "id": "31132",
        "name": "Disciple's Ingenium Hand",
        "slot": 2,
        "icon": "assets/relics/parts/31132.webp"
      },
      {
        "id": "31133",
        "name": "Disciple's Dewy Feather Garb",
        "slot": 3,
        "icon": "assets/relics/parts/31133.webp"
      },
      {
        "id": "31134",
        "name": "Disciple's Celestial Silk Sandals",
        "slot": 4,
        "icon": "assets/relics/parts/31134.webp"
      }
    ],
    "bonuses": [
      {
        "count": 2,
        "description": "Increases Max HP by 12%."
      },
      {
        "count": 4,
        "description": "When the wearer is hit or has their HP consumed by an ally or themselves, their CRIT Rate increases by 8% for 2 turn(s) and up to 2 stacks."
      }
    ],
    "icon": "assets/relics/sets/113.webp"
  },
  {
    "id": "114",
    "name": "Messenger Traversing Hackerspace",
    "parts": [
      {
        "id": "31141",
        "name": "Messenger's Holovisor",
        "slot": 1,
        "icon": "assets/relics/parts/31141.webp"
      },
      {
        "id": "31142",
        "name": "Messenger's Transformative Arm",
        "slot": 2,
        "icon": "assets/relics/parts/31142.webp"
      },
      {
        "id": "31143",
        "name": "Messenger's Secret Satchel",
        "slot": 3,
        "icon": "assets/relics/parts/31143.webp"
      },
      {
        "id": "31144",
        "name": "Messenger's Par-kool Sneakers",
        "slot": 4,
        "icon": "assets/relics/parts/31144.webp"
      }
    ],
    "bonuses": [
      {
        "count": 2,
        "description": "Increases SPD by 6%."
      },
      {
        "count": 4,
        "description": "When the wearer uses their Ultimate on an ally, SPD for all allies increases by 12% for 1 turn(s). This effect cannot be stacked."
      }
    ],
    "icon": "assets/relics/sets/114.webp"
  },
  {
    "id": "115",
    "name": "The Ashblazing Grand Duke",
    "parts": [
      {
        "id": "31151",
        "name": "Grand Duke's Crown of Netherflame",
        "slot": 1,
        "icon": "assets/relics/parts/31151.webp"
      },
      {
        "id": "31152",
        "name": "Grand Duke's Gloves of Fieryfur",
        "slot": 2,
        "icon": "assets/relics/parts/31152.webp"
      },
      {
        "id": "31153",
        "name": "Grand Duke's Robe of Grace",
        "slot": 3,
        "icon": "assets/relics/parts/31153.webp"
      },
      {
        "id": "31154",
        "name": "Grand Duke's Ceremonial Boots",
        "slot": 4,
        "icon": "assets/relics/parts/31154.webp"
      }
    ],
    "bonuses": [
      {
        "count": 2,
        "description": "Increases the DMG dealt by Follow-Up ATK by 20%."
      },
      {
        "count": 4,
        "description": "When the wearer uses a Follow-Up ATK, increases the wearer's ATK by 6% for every time the Follow-Up ATK deals DMG. This effect can stack up to 8 time(s) and lasts for 3 turn(s). This effect is removed the next time the wearer uses a Follow-Up ATK."
      }
    ],
    "icon": "assets/relics/sets/115.webp"
  },
  {
    "id": "116",
    "name": "Prisoner in Deep Confinement",
    "parts": [
      {
        "id": "31161",
        "name": "Prisoner's Sealed Muzzle",
        "slot": 1,
        "icon": "assets/relics/parts/31161.webp"
      },
      {
        "id": "31162",
        "name": "Prisoner's Leadstone Shackles",
        "slot": 2,
        "icon": "assets/relics/parts/31162.webp"
      },
      {
        "id": "31163",
        "name": "Prisoner's Repressive Straitjacket",
        "slot": 3,
        "icon": "assets/relics/parts/31163.webp"
      },
      {
        "id": "31164",
        "name": "Prisoner's Restrictive Fetters",
        "slot": 4,
        "icon": "assets/relics/parts/31164.webp"
      }
    ],
    "bonuses": [
      {
        "count": 2,
        "description": "Increases ATK by 12%."
      },
      {
        "count": 4,
        "description": "For every DoT the enemy target is afflicted with, the wearer will ignore 6% of its DEF when dealing DMG to it. This effect is valid for a max of 3 DoTs."
      }
    ],
    "icon": "assets/relics/sets/116.webp"
  },
  {
    "id": "117",
    "name": "Pioneer Diver of Dead Waters",
    "parts": [
      {
        "id": "31171",
        "name": "Pioneer's Heatproof Shell",
        "slot": 1,
        "icon": "assets/relics/parts/31171.webp"
      },
      {
        "id": "31172",
        "name": "Pioneer's Lacuna Compass",
        "slot": 2,
        "icon": "assets/relics/parts/31172.webp"
      },
      {
        "id": "31173",
        "name": "Pioneer's Sealed Lead Apron",
        "slot": 3,
        "icon": "assets/relics/parts/31173.webp"
      },
      {
        "id": "31174",
        "name": "Pioneer's Starfaring Anchor",
        "slot": 4,
        "icon": "assets/relics/parts/31174.webp"
      }
    ],
    "bonuses": [
      {
        "count": 2,
        "description": "Increases DMG dealt to enemies with debuffs by 12%."
      },
      {
        "count": 4,
        "description": "Increases CRIT Rate by 4%. The wearer deals 8%/12% increased CRIT DMG to enemies with at least 2/3 debuffs. After the wearer inflicts a debuff on enemy targets, the aforementioned effects increase by 100%, lasting for 1 turn(s)."
      }
    ],
    "icon": "assets/relics/sets/117.webp"
  },
  {
    "id": "118",
    "name": "Watchmaker, Master of Dream Machinations",
    "parts": [
      {
        "id": "31181",
        "name": "Watchmaker's Telescoping Lens",
        "slot": 1,
        "icon": "assets/relics/parts/31181.webp"
      },
      {
        "id": "31182",
        "name": "Watchmaker's Fortuitous Wristwatch",
        "slot": 2,
        "icon": "assets/relics/parts/31182.webp"
      },
      {
        "id": "31183",
        "name": "Watchmaker's Illusory Formal Suit",
        "slot": 3,
        "icon": "assets/relics/parts/31183.webp"
      },
      {
        "id": "31184",
        "name": "Watchmaker's Dream-Concealing Dress Shoes",
        "slot": 4,
        "icon": "assets/relics/parts/31184.webp"
      }
    ],
    "bonuses": [
      {
        "count": 2,
        "description": "Increases Break Effect by 16%."
      },
      {
        "count": 4,
        "description": "When the wearer uses their Ultimate on an ally, all allies' Break Effect increases by 30% for 2 turn(s). This effect cannot be stacked."
      }
    ],
    "icon": "assets/relics/sets/118.webp"
  },
  {
    "id": "119",
    "name": "Iron Cavalry Against the Scourge",
    "parts": [
      {
        "id": "31191",
        "name": "Iron Cavalry's Homing Helm",
        "slot": 1,
        "icon": "assets/relics/parts/31191.webp"
      },
      {
        "id": "31192",
        "name": "Iron Cavalry's Crushing Wristguard",
        "slot": 2,
        "icon": "assets/relics/parts/31192.webp"
      },
      {
        "id": "31193",
        "name": "Iron Cavalry's Silvery Armor",
        "slot": 3,
        "icon": "assets/relics/parts/31193.webp"
      },
      {
        "id": "31194",
        "name": "Iron Cavalry's Skywalk Greaves",
        "slot": 4,
        "icon": "assets/relics/parts/31194.webp"
      }
    ],
    "bonuses": [
      {
        "count": 2,
        "description": "Increases Break Effect by 16%."
      },
      {
        "count": 4,
        "description": "If the wearer's Break Effect is 150% or higher, the Break DMG dealt to the enemy target ignores 10% of their DEF. If the wearer's Break Effect is 250% or higher, the Super Break DMG dealt to the enemy target additionally ignores 15% of their DEF."
      }
    ],
    "icon": "assets/relics/sets/119.webp"
  },
  {
    "id": "120",
    "name": "The Wind-Soaring Valorous",
    "parts": [
      {
        "id": "31201",
        "name": "Valorous Mask of Northern Skies",
        "slot": 1,
        "icon": "assets/relics/parts/31201.webp"
      },
      {
        "id": "31202",
        "name": "Valorous Bracelet of Grappling Hooks",
        "slot": 2,
        "icon": "assets/relics/parts/31202.webp"
      },
      {
        "id": "31203",
        "name": "Valorous Plate of Soaring Flight",
        "slot": 3,
        "icon": "assets/relics/parts/31203.webp"
      },
      {
        "id": "31204",
        "name": "Valorous Greaves of Pursuing Hunt",
        "slot": 4,
        "icon": "assets/relics/parts/31204.webp"
      }
    ],
    "bonuses": [
      {
        "count": 2,
        "description": "Increases ATK by 12%."
      },
      {
        "count": 4,
        "description": "Increases the wearer's CRIT Rate by 6%. After the wearer uses a Follow-Up ATK, increases DMG dealt by Ultimate by 36%, lasting for 1 turn(s)."
      }
    ],
    "icon": "assets/relics/sets/120.webp"
  },
  {
    "id": "121",
    "name": "Sacerdos' Relived Ordeal",
    "parts": [
      {
        "id": "31211",
        "name": "Sacerdos' Melodic Earrings",
        "slot": 1,
        "icon": "assets/relics/parts/31211.webp"
      },
      {
        "id": "31212",
        "name": "Sacerdos' Welcoming Gloves",
        "slot": 2,
        "icon": "assets/relics/parts/31212.webp"
      },
      {
        "id": "31213",
        "name": "Sacerdos' Ceremonial Garb",
        "slot": 3,
        "icon": "assets/relics/parts/31213.webp"
      },
      {
        "id": "31214",
        "name": "Sacerdos' Arduous Boots",
        "slot": 4,
        "icon": "assets/relics/parts/31214.webp"
      }
    ],
    "bonuses": [
      {
        "count": 2,
        "description": "Increases SPD by 6%."
      },
      {
        "count": 4,
        "description": "When using Skill or Ultimate on one ally target, increases the ability target's CRIT DMG by 18%, lasting for 2 turn(s). This effect can stack up to 2 time(s)."
      }
    ],
    "icon": "assets/relics/sets/121.webp"
  },
  {
    "id": "122",
    "name": "Scholar Lost in Erudition",
    "parts": [
      {
        "id": "31221",
        "name": "Scholar's Silver-Rimmed Monocle",
        "slot": 1,
        "icon": "assets/relics/parts/31221.webp"
      },
      {
        "id": "31222",
        "name": "Scholar's Auxiliary Knuckle",
        "slot": 2,
        "icon": "assets/relics/parts/31222.webp"
      },
      {
        "id": "31223",
        "name": "Scholar's Tweed Jacket",
        "slot": 3,
        "icon": "assets/relics/parts/31223.webp"
      },
      {
        "id": "31224",
        "name": "Scholar's Felt Snowboots",
        "slot": 4,
        "icon": "assets/relics/parts/31224.webp"
      }
    ],
    "bonuses": [
      {
        "count": 2,
        "description": "Increases CRIT Rate by 8%."
      },
      {
        "count": 4,
        "description": "Increases DMG dealt by Skill and Ultimate by 20%. After using Ultimate, additionally increases the DMG dealt by the next Skill by 25%."
      }
    ],
    "icon": "assets/relics/sets/122.webp"
  },
  {
    "id": "123",
    "name": "Hero of Triumphant Song",
    "parts": [
      {
        "id": "31231",
        "name": "Hero's Wreath of Championship",
        "slot": 1,
        "icon": "assets/relics/parts/31231.webp"
      },
      {
        "id": "31232",
        "name": "Hero's Gilded Bracers",
        "slot": 2,
        "icon": "assets/relics/parts/31232.webp"
      },
      {
        "id": "31233",
        "name": "Hero's Gallant Golden Armor",
        "slot": 3,
        "icon": "assets/relics/parts/31233.webp"
      },
      {
        "id": "31234",
        "name": "Hero's Firechasing Shinguard",
        "slot": 4,
        "icon": "assets/relics/parts/31234.webp"
      }
    ],
    "bonuses": [
      {
        "count": 2,
        "description": "Increases ATK by 12%."
      },
      {
        "count": 4,
        "description": "While the wearer's memosprite is on the field, increases the wearer's SPD by 6%. When the wearer's memosprite attacks, increases the wearer's and memosprite's CRIT DMG by 30%, lasting for 2 turn(s)."
      }
    ],
    "icon": "assets/relics/sets/123.webp"
  },
  {
    "id": "124",
    "name": "Poet of Mourning Collapse",
    "parts": [
      {
        "id": "31241",
        "name": "Poet's Dill Wreath",
        "slot": 1,
        "icon": "assets/relics/parts/31241.webp"
      },
      {
        "id": "31242",
        "name": "Poet's Gilded Bracelet",
        "slot": 2,
        "icon": "assets/relics/parts/31242.webp"
      },
      {
        "id": "31243",
        "name": "Poet's Star-Studded Skirt",
        "slot": 3,
        "icon": "assets/relics/parts/31243.webp"
      },
      {
        "id": "31244",
        "name": "Poet's Silver-Studded Shoes",
        "slot": 4,
        "icon": "assets/relics/parts/31244.webp"
      }
    ],
    "bonuses": [
      {
        "count": 2,
        "description": "Increases Quantum DMG by 10%."
      },
      {
        "count": 4,
        "description": "Decreases the wearer's SPD by 8%. Before entering battle, if the wearer's SPD is lower than 110/95, increases the wearer's CRIT Rate by 20%/32%. This effect applies to the wearer's memosprite at the same time."
      }
    ],
    "icon": "assets/relics/sets/124.webp"
  },
  {
    "id": "125",
    "name": "Warrior Goddess of Sun and Thunder",
    "parts": [
      {
        "id": "31251",
        "name": "Warrior Goddess's Winged Helm",
        "slot": 1,
        "icon": "assets/relics/parts/31251.webp"
      },
      {
        "id": "31252",
        "name": "Warrior Goddess's Cavalry Gauntlets",
        "slot": 2,
        "icon": "assets/relics/parts/31252.webp"
      },
      {
        "id": "31253",
        "name": "Warrior Goddess's Dawn Cape",
        "slot": 3,
        "icon": "assets/relics/parts/31253.webp"
      },
      {
        "id": "31254",
        "name": "Warrior Goddess's Honor Spurs",
        "slot": 4,
        "icon": "assets/relics/parts/31254.webp"
      }
    ],
    "bonuses": [
      {
        "count": 2,
        "description": "Increases SPD by 6%."
      },
      {
        "count": 4,
        "description": "When the wearer or their memosprite provides healing to ally targets other than themselves, the wearer gains \"Gentle Rain,\" which lasts for 2 turn(s) and can only trigger once per turn. While the wearer has \"Gentle Rain,\" SPD increases by 6% and all allies' CRIT DMG increases by 15%. This effect cannot stack."
      }
    ],
    "icon": "assets/relics/sets/125.webp"
  },
  {
    "id": "126",
    "name": "Wavestrider Captain",
    "parts": [
      {
        "id": "31261",
        "name": "Captain's Navigator Hat",
        "slot": 1,
        "icon": "assets/relics/parts/31261.webp"
      },
      {
        "id": "31262",
        "name": "Captain's Lightcatcher Astrolabe",
        "slot": 2,
        "icon": "assets/relics/parts/31262.webp"
      },
      {
        "id": "31263",
        "name": "Captain's Wind Mantle",
        "slot": 3,
        "icon": "assets/relics/parts/31263.webp"
      },
      {
        "id": "31264",
        "name": "Captain's Tidal Boots",
        "slot": 4,
        "icon": "assets/relics/parts/31264.webp"
      }
    ],
    "bonuses": [
      {
        "count": 2,
        "description": "Increases CRIT DMG by 16%."
      },
      {
        "count": 4,
        "description": "When the wearer becomes the target of another ally target's ability, gains 1 stack of \"Help,\" stacking up to 2 time(s). If there are 2 stack(s) of \"Help\" when the wearer uses their Ultimate, consumes all \"Help\" to increase the wearer's ATK by 48% for 1 turn(s)."
      }
    ],
    "icon": "assets/relics/sets/126.webp"
  },
  {
    "id": "127",
    "name": "World-Remaking Deliverer",
    "parts": [
      {
        "id": "31271",
        "name": "Deliverer's Hood",
        "slot": 1,
        "icon": "assets/relics/parts/31271.webp"
      },
      {
        "id": "31272",
        "name": "Deliverer's Sword Gauntlet",
        "slot": 2,
        "icon": "assets/relics/parts/31272.webp"
      },
      {
        "id": "31273",
        "name": "Deliverer's Robe of Legacy",
        "slot": 3,
        "icon": "assets/relics/parts/31273.webp"
      },
      {
        "id": "31274",
        "name": "Deliverer's Boots of Pioneering",
        "slot": 4,
        "icon": "assets/relics/parts/31274.webp"
      }
    ],
    "bonuses": [
      {
        "count": 2,
        "description": "Increases CRIT Rate by 8%."
      },
      {
        "count": 4,
        "description": "After the wearer uses Basic ATK or Skill, if the wearer's memosprite is on the field, increases Max HP of the wearer and their memosprite by 24%, and increases all allies' DMG dealt by 15%, lasting until after the wearer's next use of Basic ATK or Skill."
      }
    ],
    "icon": "assets/relics/sets/127.webp"
  },
  {
    "id": "128",
    "name": "Self-Enshrouded Recluse",
    "parts": [
      {
        "id": "31281",
        "name": "Recluse's Wide-Brimmed Fedora",
        "slot": 1,
        "icon": "assets/relics/parts/31281.webp"
      },
      {
        "id": "31282",
        "name": "Recluse's Refined Timepiece",
        "slot": 2,
        "icon": "assets/relics/parts/31282.webp"
      },
      {
        "id": "31283",
        "name": "Recluse's Camel-Colored Coat",
        "slot": 3,
        "icon": "assets/relics/parts/31283.webp"
      },
      {
        "id": "31284",
        "name": "Recluse's Soft Suede Boots",
        "slot": 4,
        "icon": "assets/relics/parts/31284.webp"
      }
    ],
    "bonuses": [
      {
        "count": 2,
        "description": "The provided Shield Effect increases by 10%."
      },
      {
        "count": 4,
        "description": "Increases the Shield Effect provided by the wearer by 12%. When an ally target holds a Shield provided by the wearer, the ally target's CRIT DMG increases by 15%."
      }
    ],
    "icon": "assets/relics/sets/128.webp"
  },
  {
    "id": "129",
    "name": "Ever-Glorious Magical Girl",
    "parts": [
      {
        "id": "31291",
        "name": "Magical Girl's Shining Medal",
        "slot": 1,
        "icon": "assets/relics/parts/31291.webp"
      },
      {
        "id": "31292",
        "name": "Magical Girl's Protective Gloves",
        "slot": 2,
        "icon": "assets/relics/parts/31292.webp"
      },
      {
        "id": "31293",
        "name": "Magical Girl's Everdance Battle Skirt",
        "slot": 3,
        "icon": "assets/relics/parts/31293.webp"
      },
      {
        "id": "31294",
        "name": "Magical Girl's Contract Boots",
        "slot": 4,
        "icon": "assets/relics/parts/31294.webp"
      }
    ],
    "bonuses": [
      {
        "count": 2,
        "description": "Increases CRIT DMG by 16%."
      },
      {
        "count": 4,
        "description": "The Elation DMG dealt by the wearer and their memosprites ignores 10% of targets' DEF. For every 5 accumulated Punchline allies gain, the Elation DMG dealt additionally ignores 1% of targets' DEF, stacking up to 10 time(s)."
      }
    ],
    "icon": "assets/relics/sets/129.webp"
  },
  {
    "id": "130",
    "name": "Diviner of Distant Reach",
    "parts": [
      {
        "id": "31301",
        "name": "Diviner's Extrapolation Jade Abacus",
        "slot": 1,
        "icon": "assets/relics/parts/31301.webp"
      },
      {
        "id": "31302",
        "name": "Diviner's Ingenium Prosthetic Hand",
        "slot": 2,
        "icon": "assets/relics/parts/31302.webp"
      },
      {
        "id": "31303",
        "name": "Diviner's Astral Robe",
        "slot": 3,
        "icon": "assets/relics/parts/31303.webp"
      },
      {
        "id": "31304",
        "name": "Diviner's Cloud-Soaring Boots",
        "slot": 4,
        "icon": "assets/relics/parts/31304.webp"
      }
    ],
    "bonuses": [
      {
        "count": 2,
        "description": "Increases SPD by 6%."
      },
      {
        "count": 4,
        "description": "Before entering combat, if the wearer's SPD is greater than or equal to 120/160, increases the wearer's CRIT Rate by 10%/18%. When the wearer uses Elation Skill for the first time in each battle, increases all allies' Elation by 10%. This effect cannot stack."
      }
    ],
    "icon": "assets/relics/sets/130.webp"
  },
  {
    "id": "131",
    "name": "As Navigator Isee Sees It",
    "parts": [
      {
        "id": "31311",
        "name": "Navigator's Deep Space Mirror",
        "slot": 1,
        "icon": "assets/relics/parts/31311.webp"
      },
      {
        "id": "31312",
        "name": "Navigator's Game Die",
        "slot": 2,
        "icon": "assets/relics/parts/31312.webp"
      },
      {
        "id": "31313",
        "name": "Navigator's Astral Chart Uniform",
        "slot": 3,
        "icon": "assets/relics/parts/31313.webp"
      },
      {
        "id": "31314",
        "name": "Navigator's Everstride Boots",
        "slot": 4,
        "icon": "assets/relics/parts/31314.webp"
      }
    ],
    "bonuses": [
      {
        "count": 2,
        "description": "Increases ATK by 12%."
      },
      {
        "count": 4,
        "description": "When the wearer enters combat or uses Skill, the DMG dealt by their Skill and Ultimate increases by 18%, stacking up to 3 time(s). At the start of the wearer's turn or after using Ultimate, removes 1 stack(s) of this effect."
      }
    ],
    "icon": "assets/relics/sets/131.webp"
  },
  {
    "id": "132",
    "name": "Divine-Querying Master Smith",
    "parts": [
      {
        "id": "31321",
        "name": "Smith's Fire Beast Mask",
        "slot": 1,
        "icon": "assets/relics/parts/31321.webp"
      },
      {
        "id": "31322",
        "name": "Smith's Damascus Steel Gauntlets",
        "slot": 2,
        "icon": "assets/relics/parts/31322.webp"
      },
      {
        "id": "31323",
        "name": "Smith's Fireproof Garment",
        "slot": 3,
        "icon": "assets/relics/parts/31323.webp"
      },
      {
        "id": "31324",
        "name": "Smith's Unbridled Boots",
        "slot": 4,
        "icon": "assets/relics/parts/31324.webp"
      }
    ],
    "bonuses": [
      {
        "count": 2,
        "description": "Increases Max HP by 12%."
      },
      {
        "count": 4,
        "description": "Increases the wearer's CRIT DMG dealt to enemy targets in the DEF reduction state by 28%. After the wearer inflicts the DEF reduction state on an enemy target, all allies gain \"Comburent\" for 2 turn(s). This effect cannot be stacked. The DMG dealt by ally targets with \"Comburent\" increases by 15%. This effect can be triggered again after the wearer uses an attack."
      }
    ],
    "icon": "assets/relics/sets/132.webp"
  },
  {
    "id": "133",
    "name": "Dreamlit Actor",
    "parts": [
      {
        "id": "31331",
        "name": "Actor's Weeping Masque",
        "slot": 1,
        "icon": "assets/relics/parts/31331.webp"
      },
      {
        "id": "31332",
        "name": "Actor's Vibrant Handfan",
        "slot": 2,
        "icon": "assets/relics/parts/31332.webp"
      },
      {
        "id": "31333",
        "name": "Actor's Jester Garb",
        "slot": 3,
        "icon": "assets/relics/parts/31333.webp"
      },
      {
        "id": "31334",
        "name": "Actor's Crescent Dance Boots",
        "slot": 4,
        "icon": "assets/relics/parts/31334.webp"
      }
    ],
    "bonuses": [
      {
        "count": 2,
        "description": "Increases SPD by 6%."
      },
      {
        "count": 4,
        "description": "When the wearer uses their Skill or Ultimate on one other ally target, increases the ability target's Elation by 16%, lasting for 3 turn(s). If the wearer has 10 or more points of Certified Banger, additionally increases all ally targets' CRIT DMG by 12%, lasting for 3 turn(s)."
      }
    ],
    "icon": "assets/relics/sets/133.webp"
  },
  {
    "id": "134",
    "name": "The Edacious Heretic",
    "parts": [
      {
        "id": "31341",
        "name": "Heretic's Cranial Apparatus",
        "slot": 1,
        "icon": "assets/relics/parts/31341.webp"
      },
      {
        "id": "31342",
        "name": "Heretic's Injection Gloves",
        "slot": 2,
        "icon": "assets/relics/parts/31342.webp"
      },
      {
        "id": "31343",
        "name": "Heretic's Straitjacket of Reason",
        "slot": 3,
        "icon": "assets/relics/parts/31343.webp"
      },
      {
        "id": "31344",
        "name": "Heretic's Ravenous Ankle-Boots",
        "slot": 4,
        "icon": "assets/relics/parts/31344.webp"
      }
    ],
    "bonuses": [
      {
        "count": 2,
        "description": "Increases CRIT DMG by 16%."
      },
      {
        "count": 4,
        "description": "Increases DMG dealt by the wearer's Basic ATK by 36%. When the wearer uses Basic ATK, increases the wearer's ATK by 20%, lasting for 2 turn(s)."
      }
    ],
    "icon": "assets/relics/sets/134.webp"
  },
  {
    "id": "301",
    "name": "Space Sealing Station",
    "parts": [
      {
        "id": "33015",
        "name": "Herta's Space Station",
        "slot": 5,
        "icon": "assets/relics/parts/33015.webp"
      },
      {
        "id": "33016",
        "name": "Herta's Wandering Trek",
        "slot": 6,
        "icon": "assets/relics/parts/33016.webp"
      }
    ],
    "bonuses": [
      {
        "count": 2,
        "description": "Increases the wearer's ATK by 12%. When the wearer's SPD reaches 120 or higher, the wearer's ATK increases by an extra 12%."
      }
    ],
    "icon": "assets/relics/sets/301.webp"
  },
  {
    "id": "302",
    "name": "Fleet of the Ageless",
    "parts": [
      {
        "id": "33025",
        "name": "The Xianzhou Luofu's Celestial Ark",
        "slot": 5,
        "icon": "assets/relics/parts/33025.webp"
      },
      {
        "id": "33026",
        "name": "The Xianzhou Luofu's Ambrosial Arbor Vines",
        "slot": 6,
        "icon": "assets/relics/parts/33026.webp"
      }
    ],
    "bonuses": [
      {
        "count": 2,
        "description": "Increases the wearer's Max HP by 12%. When the wearer's SPD reaches 120 or higher, all allies' ATK increases by 8%."
      }
    ],
    "icon": "assets/relics/sets/302.webp"
  },
  {
    "id": "303",
    "name": "Pan-Cosmic Commercial Enterprise",
    "parts": [
      {
        "id": "33035",
        "name": "The IPC's Mega HQ",
        "slot": 5,
        "icon": "assets/relics/parts/33035.webp"
      },
      {
        "id": "33036",
        "name": "The IPC's Trade Route",
        "slot": 6,
        "icon": "assets/relics/parts/33036.webp"
      }
    ],
    "bonuses": [
      {
        "count": 2,
        "description": "Increases the wearer's Effect Hit Rate by 10%. Meanwhile, the wearer's ATK increases by an amount that is equal to 25% of the current Effect Hit Rate, up to a maximum increase of 25%."
      }
    ],
    "icon": "assets/relics/sets/303.webp"
  },
  {
    "id": "304",
    "name": "Belobog of the Architects",
    "parts": [
      {
        "id": "33045",
        "name": "Belobog's Fortress of Preservation",
        "slot": 5,
        "icon": "assets/relics/parts/33045.webp"
      },
      {
        "id": "33046",
        "name": "Belobog's Iron Defense",
        "slot": 6,
        "icon": "assets/relics/parts/33046.webp"
      }
    ],
    "bonuses": [
      {
        "count": 2,
        "description": "Increases the wearer's DEF by 15%. When the wearer's Effect Hit Rate is 50% or higher, the wearer gains an extra 15% DEF."
      }
    ],
    "icon": "assets/relics/sets/304.webp"
  },
  {
    "id": "305",
    "name": "Celestial Differentiator",
    "parts": [
      {
        "id": "33055",
        "name": "Planet Screwllum's Mechanical Sun",
        "slot": 5,
        "icon": "assets/relics/parts/33055.webp"
      },
      {
        "id": "33056",
        "name": "Planet Screwllum's Ring System",
        "slot": 6,
        "icon": "assets/relics/parts/33056.webp"
      }
    ],
    "bonuses": [
      {
        "count": 2,
        "description": "Increases the wearer's CRIT DMG by 16%. When the wearer's current CRIT DMG reaches 120% or higher, after entering battle, the wearer's CRIT Rate increases by 60% until the end of their first attack."
      }
    ],
    "icon": "assets/relics/sets/305.webp"
  },
  {
    "id": "306",
    "name": "Inert Salsotto",
    "parts": [
      {
        "id": "33065",
        "name": "Salsotto's Moving City",
        "slot": 5,
        "icon": "assets/relics/parts/33065.webp"
      },
      {
        "id": "33066",
        "name": "Salsotto's Terminator Line",
        "slot": 6,
        "icon": "assets/relics/parts/33066.webp"
      }
    ],
    "bonuses": [
      {
        "count": 2,
        "description": "Increases the wearer's CRIT Rate by 8%. When the wearer's current CRIT Rate reaches 50% or higher, the DMG dealt by the wearer's Ultimate and Follow-Up ATK increases by 15%."
      }
    ],
    "icon": "assets/relics/sets/306.webp"
  },
  {
    "id": "307",
    "name": "Talia: Kingdom of Banditry",
    "parts": [
      {
        "id": "33075",
        "name": "Talia's Nailscrap Town",
        "slot": 5,
        "icon": "assets/relics/parts/33075.webp"
      },
      {
        "id": "33076",
        "name": "Talia's Exposed Electric Wire",
        "slot": 6,
        "icon": "assets/relics/parts/33076.webp"
      }
    ],
    "bonuses": [
      {
        "count": 2,
        "description": "Increases the wearer's Break Effect by 16%. When the wearer's SPD reaches 145 or higher, the wearer's Break Effect increases by an extra 20%."
      }
    ],
    "icon": "assets/relics/sets/307.webp"
  },
  {
    "id": "308",
    "name": "Sprightly Vonwacq",
    "parts": [
      {
        "id": "33085",
        "name": "Vonwacq's Island of Birth",
        "slot": 5,
        "icon": "assets/relics/parts/33085.webp"
      },
      {
        "id": "33086",
        "name": "Vonwacq's Islandic Coast",
        "slot": 6,
        "icon": "assets/relics/parts/33086.webp"
      }
    ],
    "bonuses": [
      {
        "count": 2,
        "description": "Increases the wearer's Energy Regeneration Rate by 5%. When the wearer's SPD reaches 120 or higher, the wearer's action is Advanced Forward by 40% immediately upon entering battle."
      }
    ],
    "icon": "assets/relics/sets/308.webp"
  },
  {
    "id": "309",
    "name": "Rutilant Arena",
    "parts": [
      {
        "id": "33095",
        "name": "Taikiyan Laser Stadium",
        "slot": 5,
        "icon": "assets/relics/parts/33095.webp"
      },
      {
        "id": "33096",
        "name": "Taikiyan's Arclight Race Track",
        "slot": 6,
        "icon": "assets/relics/parts/33096.webp"
      }
    ],
    "bonuses": [
      {
        "count": 2,
        "description": "Increases the wearer's CRIT Rate by 8%. When the wearer's current CRIT Rate reaches 70% or higher, DMG dealt by Basic ATK and Skill increases by 20%."
      }
    ],
    "icon": "assets/relics/sets/309.webp"
  },
  {
    "id": "310",
    "name": "Broken Keel",
    "parts": [
      {
        "id": "33105",
        "name": "Insumousu's Whalefall Ship",
        "slot": 5,
        "icon": "assets/relics/parts/33105.webp"
      },
      {
        "id": "33106",
        "name": "Insumousu's Frayed Hawser",
        "slot": 6,
        "icon": "assets/relics/parts/33106.webp"
      }
    ],
    "bonuses": [
      {
        "count": 2,
        "description": "Increases the wearer's Effect RES by 10%. When the wearer's Effect RES is at 30% or higher, all allies' CRIT DMG increases by 10%."
      }
    ],
    "icon": "assets/relics/sets/310.webp"
  },
  {
    "id": "311",
    "name": "Firmament Frontline: Glamoth",
    "parts": [
      {
        "id": "33115",
        "name": "Glamoth's Iron Cavalry Regiment",
        "slot": 5,
        "icon": "assets/relics/parts/33115.webp"
      },
      {
        "id": "33116",
        "name": "Glamoth's Silent Tombstone",
        "slot": 6,
        "icon": "assets/relics/parts/33116.webp"
      }
    ],
    "bonuses": [
      {
        "count": 2,
        "description": "Increases the wearer's ATK by 12%. When the wearer's SPD is equal to or higher than 135/160, the wearer deals 12%/18% more DMG."
      }
    ],
    "icon": "assets/relics/sets/311.webp"
  },
  {
    "id": "312",
    "name": "Penacony, Land of the Dreams",
    "parts": [
      {
        "id": "33125",
        "name": "Penacony's Grand Hotel",
        "slot": 5,
        "icon": "assets/relics/parts/33125.webp"
      },
      {
        "id": "33126",
        "name": "Penacony's Dream-Seeking Tracks",
        "slot": 6,
        "icon": "assets/relics/parts/33126.webp"
      }
    ],
    "bonuses": [
      {
        "count": 2,
        "description": "Increases wearer's Energy Regeneration Rate by 5%. Increases DMG by 10% for all other allies that are of the same Type as the wearer."
      }
    ],
    "icon": "assets/relics/sets/312.webp"
  },
  {
    "id": "313",
    "name": "Sigonia, the Unclaimed Desolation",
    "parts": [
      {
        "id": "33135",
        "name": "Sigonia's Gaiathra Berth",
        "slot": 5,
        "icon": "assets/relics/parts/33135.webp"
      },
      {
        "id": "33136",
        "name": "Sigonia's Knot of Cyclicality",
        "slot": 6,
        "icon": "assets/relics/parts/33136.webp"
      }
    ],
    "bonuses": [
      {
        "count": 2,
        "description": "Increases the wearer's CRIT Rate by 4%. When an enemy target gets defeated, the wearer's CRIT DMG increases by 4%, stacking up to 10 time(s)."
      }
    ],
    "icon": "assets/relics/sets/313.webp"
  },
  {
    "id": "314",
    "name": "Izumo Gensei and Takama Divine Realm",
    "parts": [
      {
        "id": "33145",
        "name": "Izumo's Magatsu no Morokami",
        "slot": 5,
        "icon": "assets/relics/parts/33145.webp"
      },
      {
        "id": "33146",
        "name": "Izumo's Blades of Origin and End",
        "slot": 6,
        "icon": "assets/relics/parts/33146.webp"
      }
    ],
    "bonuses": [
      {
        "count": 2,
        "description": "Increases the wearer's ATK by 12%. When entering battle, if at least one teammate follows the same Path as the wearer, then the wearer's CRIT Rate increases by 12%."
      }
    ],
    "icon": "assets/relics/sets/314.webp"
  },
  {
    "id": "315",
    "name": "Duran, Dynasty of Running Wolves",
    "parts": [
      {
        "id": "33155",
        "name": "Duran's Tent of Golden Sky",
        "slot": 5,
        "icon": "assets/relics/parts/33155.webp"
      },
      {
        "id": "33156",
        "name": "Duran's Mechabeast Bridle",
        "slot": 6,
        "icon": "assets/relics/parts/33156.webp"
      }
    ],
    "bonuses": [
      {
        "count": 2,
        "description": "When an ally character uses a Follow-Up ATK, the wearer gains 1 stack of \"Merit,\" stacking up to 5 time(s). Each stack of \"Merit\" increases the DMG dealt by the wearer's Follow-Up ATKs by 5%. When there are 5 stacks, additionally increases the wearer's CRIT DMG by 25%."
      }
    ],
    "icon": "assets/relics/sets/315.webp"
  },
  {
    "id": "316",
    "name": "Forge of the Kalpagni Lantern",
    "parts": [
      {
        "id": "33165",
        "name": "Forge's Lotus Lantern Wick",
        "slot": 5,
        "icon": "assets/relics/parts/33165.webp"
      },
      {
        "id": "33166",
        "name": "Forge's Heavenly Flamewheel Silk",
        "slot": 6,
        "icon": "assets/relics/parts/33166.webp"
      }
    ],
    "bonuses": [
      {
        "count": 2,
        "description": "Increases the wearer's SPD by 6%. When the wearer hits an enemy target that has Fire Weakness, the wearer's Break Effect increases by 40%, lasting for 1 turn(s)."
      }
    ],
    "icon": "assets/relics/sets/316.webp"
  },
  {
    "id": "317",
    "name": "Lushaka, the Sunken Seas",
    "parts": [
      {
        "id": "33175",
        "name": "Lushaka's Waterscape",
        "slot": 5,
        "icon": "assets/relics/parts/33175.webp"
      },
      {
        "id": "33176",
        "name": "Lushaka's Twinlanes",
        "slot": 6,
        "icon": "assets/relics/parts/33176.webp"
      }
    ],
    "bonuses": [
      {
        "count": 2,
        "description": "Increases the wearer's Energy Regeneration Rate by 5%. If the wearer is not the first character in the team lineup, then increases the ATK of the first character in the team lineup by 12%."
      }
    ],
    "icon": "assets/relics/sets/317.webp"
  },
  {
    "id": "318",
    "name": "The Wondrous BananAmusement Park",
    "parts": [
      {
        "id": "33185",
        "name": "BananAmusement Park's BananAxis Plaza",
        "slot": 5,
        "icon": "assets/relics/parts/33185.webp"
      },
      {
        "id": "33186",
        "name": "BananAmusement Park's Memetic Cables",
        "slot": 6,
        "icon": "assets/relics/parts/33186.webp"
      }
    ],
    "bonuses": [
      {
        "count": 2,
        "description": "Increases the wearer's CRIT DMG by 16%. When a target summoned by the wearer is on the field, CRIT DMG additionally increases by 32%."
      }
    ],
    "icon": "assets/relics/sets/318.webp"
  },
  {
    "id": "319",
    "name": "Bone Collection's Serene Demesne",
    "parts": [
      {
        "id": "33195",
        "name": "Aidonia's Deceased Gravestones",
        "slot": 5,
        "icon": "assets/relics/parts/33195.webp"
      },
      {
        "id": "33196",
        "name": "Aidonia's Deathward Bone Chains",
        "slot": 6,
        "icon": "assets/relics/parts/33196.webp"
      }
    ],
    "bonuses": [
      {
        "count": 2,
        "description": "Increases the wearer's Max HP by 12%. When the wearer's Max HP is 5,000 or higher, increases the wearer's and their memosprite's CRIT DMG by 28%."
      }
    ],
    "icon": "assets/relics/sets/319.webp"
  },
  {
    "id": "320",
    "name": "Giant Tree of Rapt Brooding",
    "parts": [
      {
        "id": "33205",
        "name": "Grove of Epiphany's Pondering Colossus",
        "slot": 5,
        "icon": "assets/relics/parts/33205.webp"
      },
      {
        "id": "33206",
        "name": "Grove of Epiphany's Interwoven Veins",
        "slot": 6,
        "icon": "assets/relics/parts/33206.webp"
      }
    ],
    "bonuses": [
      {
        "count": 2,
        "description": "Increases the wearer's SPD by 6%. When the wearer's SPD is 135/180 or higher, the wearer and their memosprite's Outgoing Healing increases by 12%/20%."
      }
    ],
    "icon": "assets/relics/sets/320.webp"
  },
  {
    "id": "321",
    "name": "Arcadia of Woven Dreams",
    "parts": [
      {
        "id": "33215",
        "name": "Membrance Maze's Serene Treehouse",
        "slot": 5,
        "icon": "assets/relics/parts/33215.webp"
      },
      {
        "id": "33216",
        "name": "Membrance Maze's Wishing Whistle",
        "slot": 6,
        "icon": "assets/relics/parts/33216.webp"
      }
    ],
    "bonuses": [
      {
        "count": 2,
        "description": "When the number of ally targets on the field is not equal to 4, for every 1 additional/missing ally target, increases the DMG dealt by the wearer and their memosprite by 9%/12%, stacking up to 4/3 time(s)."
      }
    ],
    "icon": "assets/relics/sets/321.webp"
  },
  {
    "id": "322",
    "name": "Revelry by the Sea",
    "parts": [
      {
        "id": "33225",
        "name": "Warbling Shores' Blazing Beacon",
        "slot": 5,
        "icon": "assets/relics/parts/33225.webp"
      },
      {
        "id": "33226",
        "name": "Warbling Shores' Cantillation Trail",
        "slot": 6,
        "icon": "assets/relics/parts/33226.webp"
      }
    ],
    "bonuses": [
      {
        "count": 2,
        "description": "Increases the wearer's ATK by 12%. When the wearer's ATK is higher than or equal to 2,400/3,600, increases the DoT DMG dealt by 12%/24% respectively."
      }
    ],
    "icon": "assets/relics/sets/322.webp"
  },
  {
    "id": "323",
    "name": "Amphoreus, The Eternal Land",
    "parts": [
      {
        "id": "33235",
        "name": "Last West Wind of Amphoreus",
        "slot": 5,
        "icon": "assets/relics/parts/33235.webp"
      },
      {
        "id": "33236",
        "name": "Eternal Verses of Amphoreus",
        "slot": 6,
        "icon": "assets/relics/parts/33236.webp"
      }
    ],
    "bonuses": [
      {
        "count": 2,
        "description": "Increases the wearer's CRIT Rate by 8%. While the wearer's memosprite is on the field, increases all allies' SPD by 8%. This effect cannot be stacked."
      }
    ],
    "icon": "assets/relics/sets/323.webp"
  },
  {
    "id": "324",
    "name": "Tengoku@Livestream",
    "parts": [
      {
        "id": "33245",
        "name": "Livestream's Protean Vistas",
        "slot": 5,
        "icon": "assets/relics/parts/33245.webp"
      },
      {
        "id": "33246",
        "name": "Livestream's Chatter Banter",
        "slot": 6,
        "icon": "assets/relics/parts/33246.webp"
      }
    ],
    "bonuses": [
      {
        "count": 2,
        "description": "Increases the wearer's CRIT DMG by 16%. If 3 or more Skill Points are consumed in the same turn, additionally increases the wearer's CRIT DMG by 32%, lasting for 3 turns."
      }
    ],
    "icon": "assets/relics/sets/324.webp"
  },
  {
    "id": "325",
    "name": "Punklorde Stage Zero",
    "parts": [
      {
        "id": "33255",
        "name": "Punklorde's Rainbow City",
        "slot": 5,
        "icon": "assets/relics/parts/33255.webp"
      },
      {
        "id": "33256",
        "name": "Punklorde's Data Deluge",
        "slot": 6,
        "icon": "assets/relics/parts/33256.webp"
      }
    ],
    "bonuses": [
      {
        "count": 2,
        "description": "Increases the wearer's Elation by 8%. When Elation reaches 40%/80% for the first time in combat, increases the wearer's CRIT DMG by 20%/32%."
      }
    ],
    "icon": "assets/relics/sets/325.webp"
  },
  {
    "id": "326",
    "name": "City of Converging Stars",
    "parts": [
      {
        "id": "33265",
        "name": "Astropolis Media Headquarters",
        "slot": 5,
        "icon": "assets/relics/parts/33265.webp"
      },
      {
        "id": "33266",
        "name": "Astropolis Employee Credentials",
        "slot": 6,
        "icon": "assets/relics/parts/33266.webp"
      }
    ],
    "bonuses": [
      {
        "count": 2,
        "description": "When the wearer uses Follow-Up ATK, increases ATK by 24% for 2 turn(s). When an enemy target gets defeated, increases CRIT DMG for all allies by 12% in the current battle. This effect cannot stack."
      }
    ],
    "icon": "assets/relics/sets/326.webp"
  },
  {
    "id": "327",
    "name": "Fallen Star Anchorage",
    "parts": [
      {
        "id": "33275",
        "name": "Stranded Express at the Anchorage",
        "slot": 5,
        "icon": "assets/relics/parts/33275.webp"
      },
      {
        "id": "33276",
        "name": "Silver Rails of the Anchorage",
        "slot": 6,
        "icon": "assets/relics/parts/33276.webp"
      }
    ],
    "bonuses": [
      {
        "count": 2,
        "description": "Increases the wearer's CRIT Rate by 8%. When entering combat, if the wearer and another teammate are both Trailblaze Companions characters, increases the wearer's CRIT DMG by 32%."
      }
    ],
    "icon": "assets/relics/sets/327.webp"
  },
  {
    "id": "328",
    "name": "Cosmic Life Sciences Institute",
    "parts": [
      {
        "id": "33285",
        "name": "Central Synapse of the Life Sciences Institute",
        "slot": 5,
        "icon": "assets/relics/parts/33285.webp"
      },
      {
        "id": "33286",
        "name": "Peripheral Conduits of the Life Sciences Institute",
        "slot": 6,
        "icon": "assets/relics/parts/33286.webp"
      }
    ],
    "bonuses": [
      {
        "count": 2,
        "description": "When entering combat, if the wearer's Max Energy is greater than or equal to 200, for every 1 excess point, increases the wearer's DMG dealt by 0.2%, up to a max increase of 32%."
      }
    ],
    "icon": "assets/relics/sets/328.webp"
  },
  {
    "id": "329",
    "name": "God's Moment of Joy",
    "parts": [
      {
        "id": "33295",
        "name": "Moment of Joy's Eternal Stage",
        "slot": 5,
        "icon": "assets/relics/parts/33295.webp"
      },
      {
        "id": "33296",
        "name": "Moment of Joy's Magic Prop",
        "slot": 6,
        "icon": "assets/relics/parts/33296.webp"
      }
    ],
    "bonuses": [
      {
        "count": 2,
        "description": "Increases the wearer's SPD by 6%. When the wearer's Elation reaches 40% or higher, the wearer's action advances by 40% immediately when entering combat."
      }
    ],
    "icon": "assets/relics/sets/329.webp"
  },
  {
    "id": "330",
    "name": "Subspace ASC Center",
    "parts": [
      {
        "id": "33305",
        "name": "ASC Dark Fissure",
        "slot": 5,
        "icon": "assets/relics/parts/33305.webp"
      },
      {
        "id": "33306",
        "name": "ASC Negative Film",
        "slot": 6,
        "icon": "assets/relics/parts/33306.webp"
      }
    ],
    "bonuses": [
      {
        "count": 2,
        "description": "Increases the wearer's SPD by 6%. When the wearer's SPD reaches 145 or higher, increases all allies' Break Effect by 18% after entering combat. This effect cannot stack."
      }
    ],
    "icon": "assets/relics/sets/330.webp"
  }
];
