/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

"use strict";

this.EXPORTED_SYMBOLS = [ "ADDON_SIGNING", "REQUIRE_SIGNING" ];

// Make these non-changable properties so they can't be manipulated from other
// code in the app.
Object.defineProperty(this, "ADDON_SIGNING", {
  configurable: false,
  enumerable: false,
  writable: false,
//@line 16 "c:\builds\moz2_slave\rel-m-rel-w32_bld-000000000000\build\toolkit\mozapps\extensions\internal\AddonConstants.jsm"
  value: true,
//@line 20 "c:\builds\moz2_slave\rel-m-rel-w32_bld-000000000000\build\toolkit\mozapps\extensions\internal\AddonConstants.jsm"
});

Object.defineProperty(this, "REQUIRE_SIGNING", {
  configurable: false,
  enumerable: false,
  writable: false,
//@line 29 "c:\builds\moz2_slave\rel-m-rel-w32_bld-000000000000\build\toolkit\mozapps\extensions\internal\AddonConstants.jsm"
  value: false,
//@line 31 "c:\builds\moz2_slave\rel-m-rel-w32_bld-000000000000\build\toolkit\mozapps\extensions\internal\AddonConstants.jsm"
});
