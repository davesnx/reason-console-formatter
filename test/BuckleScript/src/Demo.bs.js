// Generated by BUCKLESCRIPT VERSION 5.0.6, PLEASE EDIT WITH CARE

import * as IndexJs from "./../../../src/index.js";

function install(prim) {
  IndexJs.default();
  return /* () */0;
}

IndexJs.default();

var listA = /* :: */[
  1,
  /* :: */[
    2,
    /* :: */[
      3,
      /* :: */[
        4,
        /* :: */[
          5,
          /* [] */0
        ]
      ]
    ]
  ]
];

var listB = /* :: */[
  1,
  /* :: */[
    2,
    /* :: */[
      3,
      /* :: */[
        4,
        /* :: */[
          5,
          /* [] */0
        ]
      ]
    ]
  ]
];

var listC = /* :: */[
  "Lets",
  /* :: */[
    "get",
    /* :: */[
      "ready",
      /* :: */[
        "to",
        /* :: */[
          "rumble!",
          /* [] */0
        ]
      ]
    ]
  ]
];

console.log("list(int)      ", listA);

console.log("list(string)   ", listC);

var nestedList_001 = /* :: */[
  listB,
  /* [] */0
];

var nestedList = /* :: */[
  listA,
  nestedList_001
];

console.log("list(list(int))", nestedList);

export {
  install ,
  listA ,
  listB ,
  listC ,
  nestedList ,
  
}
/*  Not a pure module */
