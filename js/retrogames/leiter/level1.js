var leiter_level_1 = {
    map : [
        "               V        V        V                  V @                      ",
        "                                                      H                      ",
        "        H                    &      &                 H                      ",
        "========H=---======---======---====---=============---======                 ",
        "        H                                                                    ",
        "        H                                                                    ",
        "        H           H                                  H                     ",
        "========H===========H===================== =========&&=H=====================",
        "        &           H                                  H       |        |    ",
        "                                                       H      Irrweg         ",
        "        H                                              H                     ",
        "     ===H=====---===H==---========  ======================                   ",
        "        H                                                                    ",
        "        H                                                                    ",
        "        H                                              H                     ",
        "==================== ===================== ============H=========            ",
        "                                                       H                     ",
        "                                                       H                     ",
        "*                                                      H                    *",
        "=============================================================================",
        "Omas   4   Stufe   1            Stand        0              Bonus Zeit       0"
    ],
    sources: [
        {y : 0, x: 15},
        {y : 0, x: 24},
        {y : 0, x: 33},
        {y : 0, x: 53}
    ],
    start: { y: 18, x: 5},
    goal: { y: 0, x: 54},
    lives: 4,
    status: {
        y: 20,
        omas: 7,
        stand: 45
    }

};