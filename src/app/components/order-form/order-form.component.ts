import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.css']
})
export class OrderFormComponent implements OnInit {

  progress = {
    aria: 25,
    style: {'width': '25%'},
    stage: 1
  };

  thickness = [
    {text: '3/4" (~2cm)', value: .75},
    {text: '1" (~2.5cm)', value: 1.0},
    {text: '1 1/4" (~3.2cm)', value: 1.25},
    {text: '1 1/2" (~3.75cm)', value: 1.5}
  ];

  stpp = [
    {text: '1 (recommended)', value: 1},
    {text: '2', value: 2}
  ];

  roastSizes = [
    {text: '3-4 lbs', value: 1},
    {text: '4-5 lbs', value: 2},
    {text: '5-6 lbs', value: 3},
    {text: 'Other (Detail in special instructions on last page)', value: 4}
  ];

  offals = [
    {
      text: 'Bones (appropriate for sout/pets)',
      value: 'bones'
    },
    {
      text: 'Tail',
      value: 'tail'
    },
    {
      text: 'Heart',
      value: 'heart'
    },
    {
      text: 'Liver (1 pound packages - slices)',
      value: 'liver'
    },
    {
      text: 'Tongue',
      value: 'tongue'
    },
    {
      text: 'Braising ribs (if not checked will be used for mince)',
      value: 'ribs'
    },
  ];

  genericOptions = [
    {
      text: '50% mince/50% stew',
      value: 'mince/stew'
    },
    {
      text: 'all stew',
      value: 'stew'
    },
    {
      text: 'all mince',
      value: 'mince'
    }
  ];

  roastOptions = [
    {
      text: 'all roasts (size as per general instructions)',
      value: 'roasts'
    },
    {
      text: '50% roast/50% mince',
      value: 'roast/mince'
    },
    {
      text: '50% roast/50% stew',
      value: 'roast/stew'
    }
  ];

  shankOptions = [
    {
      text: 'all steaks 2 lbs/package (for osso bucco & similar dishes)',
      value: 'steaks'
    },
    ...this.genericOptions,
    {
      text: '50% steaks/50% mince',
      value: 'steaks/mince'
    }
  ];

  brisketOptions = [
    {
      text: 'single roast (one piece ~7-9 lbs for smoked meat, corned beef, BBQ brisket)',
      value: 'single roast'
    },
    ...this.genericOptions,
    ...this.roastOptions
  ];

  bladeOptions = [
    ...this.roastOptions,
    ...this.genericOptions,
    {
      text: 'All steaks',
      value: 'steaks'
    },
    {
      text: '50% roasts/50% steaks',
      value: 'roasts/steaks'
    }
  ];

  crossRibOptions = [
    ...this.roastOptions,
    ...this.genericOptions,
    {
      text: 'All steaks',
      value: 'steaks'
    },
    {
      text: '50% roasts/50% steaks',
      value: 'roasts/steaks'
    },
    {
      text: '50% steaks/50% stew',
      value: 'steaks/stew'
    },
    {
      text: '50% steaks/50% mince',
      value: 'steaks/mince'
    }
  ];

  ribOptions = [
    {
      text: 'All roasts',
      value: 'roasts'
    },
    {
      text: 'All steaks',
      value: 'steaks'
    },
    {
      text: '50% roasts/50% steaks',
      value: 'roasts/steaks'
    }
  ];

  loinOptions = [
    {
      text: 'All roasts',
      value: 'roasts'
    },
    {
      text: 'All steaks (t-bones, wing)',
      value: 'steaks'
    },
    {
      text: 'All boneless steaks (strip loin, tenderloin)*',
      value: 'boneless steaks'
    },
    {
      text: '50% roasts/50% steaks',
      value: 'roasts/steaks'
    }
  ];

  sirloinOptions = [
    {
      text: 'Top sirloin steaks/bottom sirloin stew',
      value: 'top steaks/bottom stew'
    },
    {
      text: 'Top sirloin roast/bottom sirloin stew',
      value: 'top roast/bottom stew'
    },
    {
      text: 'Top sirloin steaks/bottom sirloin mince',
      value: 'top steaks/bottom mince'
    },
    {
      text: 'Top sirloin roast/bottom sirloin mince',
      value: 'top roast/bottom mince'
    },
    {
      text: 'All roasts',
      value: 'roasts'
    },
    {
      text: 'All steaks',
      value: 'steaks'
    }
  ]

  topRoundOptions = [
    {
      text: 'All roasts',
      value: 'roasts'
    },
    {
      text: 'All steaks',
      value: 'steaks'
    },
    {
      text: '50% roasts/50% steaks',
      value: 'roasts/steaks'
    }
  ]

  bottomRoundOptions = [
    {
      text: 'All roasts',
      value: 'roasts'
    },
    {
      text: 'All stew',
      value: 'stew'
    },
    {
      text: '50% roasts/50% stew',
      value: 'roasts/stew'
    },
    {
      text: '50% roasts/50% steaks',
      value: 'roasts/steaks'
    }
  ]

  sirloinTipOptions = [
    {
      text: 'All roasts (slow cook/pot roast)',
      value: 'roasts'
    },
    {
      text: 'All steaks (marinate for 2 hours before grilling)',
      value: 'steaks'
    },
    {
      text: '50% roasts/50% stew',
      value: 'roasts/stew'
    },
    {
      text: '50% roasts/50% steaks',
      value: 'roasts/steaks'
    }
  ]

  generalPreferences = this.formBuilder.group({

    steakThickness: ['', Validators.required],

    steaksPerPackage: ['', [Validators.required]],

    stewMeatPerPackage: ['', Validators.required],

    mincePerPackage: ['', Validators.required],

    approximateRoastSize: ['', Validators.required],

    offalsAndMiscellaneous: this.formBuilder.group({

      bones: [''],

      tail: [''],

      heart: [''],

      liver: [''],

      tongue: [''],

      ribs: ['']

    })

  });

  detailedCut = this.formBuilder.group({

    cutsFromFront: this.formBuilder.group({

      shank: ['', Validators.required],

      brisket: ['', Validators.required],

      blade: ['', Validators.required],

      crossRib: ['', Validators.required]

    }),

    cutsFromLoin: this.formBuilder.group({

      rib: ['', Validators.required],

      loin: ['', Validators.required],

      sirloin: ['', Validators.required]

    }),

    cutsFromHip: this.formBuilder.group({

      topRound: ['', Validators.required],

      bottomRound: ['', Validators.required],

      sirloinTip: ['', Validators.required]

    })

  });

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.progress.aria += 25;
    this.progress.style.width = `${this.progress.aria}%`;
    this.progress.stage++;
  }
}
