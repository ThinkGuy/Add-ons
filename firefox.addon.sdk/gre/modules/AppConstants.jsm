//@line 2 "c:\builds\moz2_slave\rel-m-rel-w32_bld-000000000000\build\toolkit\modules\AppConstants.jsm"
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * You can obtain one at http://mozilla.org/MPL/2.0/. */

"use strict";

Components.utils.import("resource://gre/modules/XPCOMUtils.jsm");
XPCOMUtils.defineLazyModuleGetter(this, "Services", "resource://gre/modules/Services.jsm");

this.EXPORTED_SYMBOLS = ["AppConstants"];

// Immutable for export.
this.AppConstants = Object.freeze({
  // See this wiki page for more details about channel specific build
  // defines: https://wiki.mozilla.org/Platform/Channel-specific_build_defines
  NIGHTLY_BUILD:
//@line 21 "c:\builds\moz2_slave\rel-m-rel-w32_bld-000000000000\build\toolkit\modules\AppConstants.jsm"
  false,
//@line 23 "c:\builds\moz2_slave\rel-m-rel-w32_bld-000000000000\build\toolkit\modules\AppConstants.jsm"

  RELEASE_BUILD:
//@line 26 "c:\builds\moz2_slave\rel-m-rel-w32_bld-000000000000\build\toolkit\modules\AppConstants.jsm"
  true,
//@line 30 "c:\builds\moz2_slave\rel-m-rel-w32_bld-000000000000\build\toolkit\modules\AppConstants.jsm"

  ACCESSIBILITY:
//@line 33 "c:\builds\moz2_slave\rel-m-rel-w32_bld-000000000000\build\toolkit\modules\AppConstants.jsm"
  true,
//@line 37 "c:\builds\moz2_slave\rel-m-rel-w32_bld-000000000000\build\toolkit\modules\AppConstants.jsm"

  // Official corresponds, roughly, to whether this build is performed
  // on Mozilla's continuous integration infrastructure. You should
  // disable developer-only functionality when this flag is set.
  MOZILLA_OFFICIAL:
//@line 43 "c:\builds\moz2_slave\rel-m-rel-w32_bld-000000000000\build\toolkit\modules\AppConstants.jsm"
  true,
//@line 47 "c:\builds\moz2_slave\rel-m-rel-w32_bld-000000000000\build\toolkit\modules\AppConstants.jsm"

  MOZ_OFFICIAL_BRANDING:
//@line 50 "c:\builds\moz2_slave\rel-m-rel-w32_bld-000000000000\build\toolkit\modules\AppConstants.jsm"
  true,
//@line 54 "c:\builds\moz2_slave\rel-m-rel-w32_bld-000000000000\build\toolkit\modules\AppConstants.jsm"

  MOZ_SERVICES_HEALTHREPORT:
//@line 57 "c:\builds\moz2_slave\rel-m-rel-w32_bld-000000000000\build\toolkit\modules\AppConstants.jsm"
  true,
//@line 61 "c:\builds\moz2_slave\rel-m-rel-w32_bld-000000000000\build\toolkit\modules\AppConstants.jsm"

  MOZ_DATA_REPORTING:
//@line 64 "c:\builds\moz2_slave\rel-m-rel-w32_bld-000000000000\build\toolkit\modules\AppConstants.jsm"
  true,
//@line 68 "c:\builds\moz2_slave\rel-m-rel-w32_bld-000000000000\build\toolkit\modules\AppConstants.jsm"

  MOZ_DEVICES:
//@line 73 "c:\builds\moz2_slave\rel-m-rel-w32_bld-000000000000\build\toolkit\modules\AppConstants.jsm"
  false,
//@line 75 "c:\builds\moz2_slave\rel-m-rel-w32_bld-000000000000\build\toolkit\modules\AppConstants.jsm"

  MOZ_SAFE_BROWSING:
//@line 78 "c:\builds\moz2_slave\rel-m-rel-w32_bld-000000000000\build\toolkit\modules\AppConstants.jsm"
  true,
//@line 82 "c:\builds\moz2_slave\rel-m-rel-w32_bld-000000000000\build\toolkit\modules\AppConstants.jsm"

  MOZ_SANDBOX:
//@line 85 "c:\builds\moz2_slave\rel-m-rel-w32_bld-000000000000\build\toolkit\modules\AppConstants.jsm"
  true,
//@line 89 "c:\builds\moz2_slave\rel-m-rel-w32_bld-000000000000\build\toolkit\modules\AppConstants.jsm"

  MOZ_TELEMETRY_REPORTING:
//@line 92 "c:\builds\moz2_slave\rel-m-rel-w32_bld-000000000000\build\toolkit\modules\AppConstants.jsm"
  true,
//@line 96 "c:\builds\moz2_slave\rel-m-rel-w32_bld-000000000000\build\toolkit\modules\AppConstants.jsm"

  MOZ_TELEMETRY_ON_BY_DEFAULT:
//@line 101 "c:\builds\moz2_slave\rel-m-rel-w32_bld-000000000000\build\toolkit\modules\AppConstants.jsm"
  false,
//@line 103 "c:\builds\moz2_slave\rel-m-rel-w32_bld-000000000000\build\toolkit\modules\AppConstants.jsm"

  MOZ_SERVICES_CLOUDSYNC:
//@line 106 "c:\builds\moz2_slave\rel-m-rel-w32_bld-000000000000\build\toolkit\modules\AppConstants.jsm"
  true,
//@line 110 "c:\builds\moz2_slave\rel-m-rel-w32_bld-000000000000\build\toolkit\modules\AppConstants.jsm"

  MOZ_UPDATER:
//@line 113 "c:\builds\moz2_slave\rel-m-rel-w32_bld-000000000000\build\toolkit\modules\AppConstants.jsm"
  true,
//@line 117 "c:\builds\moz2_slave\rel-m-rel-w32_bld-000000000000\build\toolkit\modules\AppConstants.jsm"

  MOZ_SWITCHBOARD:
//@line 122 "c:\builds\moz2_slave\rel-m-rel-w32_bld-000000000000\build\toolkit\modules\AppConstants.jsm"
  false,
//@line 124 "c:\builds\moz2_slave\rel-m-rel-w32_bld-000000000000\build\toolkit\modules\AppConstants.jsm"

  MOZ_WEBRTC:
//@line 127 "c:\builds\moz2_slave\rel-m-rel-w32_bld-000000000000\build\toolkit\modules\AppConstants.jsm"
  true,
//@line 131 "c:\builds\moz2_slave\rel-m-rel-w32_bld-000000000000\build\toolkit\modules\AppConstants.jsm"

//@line 133 "c:\builds\moz2_slave\rel-m-rel-w32_bld-000000000000\build\toolkit\modules\AppConstants.jsm"
  MOZ_B2G:
//@line 137 "c:\builds\moz2_slave\rel-m-rel-w32_bld-000000000000\build\toolkit\modules\AppConstants.jsm"
  false,
//@line 139 "c:\builds\moz2_slave\rel-m-rel-w32_bld-000000000000\build\toolkit\modules\AppConstants.jsm"

//@line 142 "c:\builds\moz2_slave\rel-m-rel-w32_bld-000000000000\build\toolkit\modules\AppConstants.jsm"
  platform:
//@line 148 "c:\builds\moz2_slave\rel-m-rel-w32_bld-000000000000\build\toolkit\modules\AppConstants.jsm"
  "win",
//@line 160 "c:\builds\moz2_slave\rel-m-rel-w32_bld-000000000000\build\toolkit\modules\AppConstants.jsm"

  isPlatformAndVersionAtLeast(platform, version) {
    let platformVersion = Services.sysinfo.getProperty("version");
    return platform == this.platform &&
           Services.vc.compare(platformVersion, version) >= 0;
  },

  isPlatformAndVersionAtMost(platform, version) {
    let platformVersion = Services.sysinfo.getProperty("version");
    return platform == this.platform &&
           Services.vc.compare(platformVersion, version) <= 0;
  },

  MOZ_CRASHREPORTER:
//@line 175 "c:\builds\moz2_slave\rel-m-rel-w32_bld-000000000000\build\toolkit\modules\AppConstants.jsm"
  true,
//@line 179 "c:\builds\moz2_slave\rel-m-rel-w32_bld-000000000000\build\toolkit\modules\AppConstants.jsm"

  MOZ_VERIFY_MAR_SIGNATURE:
//@line 182 "c:\builds\moz2_slave\rel-m-rel-w32_bld-000000000000\build\toolkit\modules\AppConstants.jsm"
  true,
//@line 186 "c:\builds\moz2_slave\rel-m-rel-w32_bld-000000000000\build\toolkit\modules\AppConstants.jsm"

  MOZ_MAINTENANCE_SERVICE:
//@line 189 "c:\builds\moz2_slave\rel-m-rel-w32_bld-000000000000\build\toolkit\modules\AppConstants.jsm"
  true,
//@line 193 "c:\builds\moz2_slave\rel-m-rel-w32_bld-000000000000\build\toolkit\modules\AppConstants.jsm"

  E10S_TESTING_ONLY:
//@line 198 "c:\builds\moz2_slave\rel-m-rel-w32_bld-000000000000\build\toolkit\modules\AppConstants.jsm"
  false,
//@line 200 "c:\builds\moz2_slave\rel-m-rel-w32_bld-000000000000\build\toolkit\modules\AppConstants.jsm"

  DEBUG:
//@line 205 "c:\builds\moz2_slave\rel-m-rel-w32_bld-000000000000\build\toolkit\modules\AppConstants.jsm"
  false,
//@line 207 "c:\builds\moz2_slave\rel-m-rel-w32_bld-000000000000\build\toolkit\modules\AppConstants.jsm"

  MOZ_B2G_RIL:
//@line 212 "c:\builds\moz2_slave\rel-m-rel-w32_bld-000000000000\build\toolkit\modules\AppConstants.jsm"
  false,
//@line 214 "c:\builds\moz2_slave\rel-m-rel-w32_bld-000000000000\build\toolkit\modules\AppConstants.jsm"

  MOZ_B2GDROID:
//@line 219 "c:\builds\moz2_slave\rel-m-rel-w32_bld-000000000000\build\toolkit\modules\AppConstants.jsm"
  false,
//@line 221 "c:\builds\moz2_slave\rel-m-rel-w32_bld-000000000000\build\toolkit\modules\AppConstants.jsm"

  MOZ_GRAPHENE:
//@line 226 "c:\builds\moz2_slave\rel-m-rel-w32_bld-000000000000\build\toolkit\modules\AppConstants.jsm"
  false,
//@line 228 "c:\builds\moz2_slave\rel-m-rel-w32_bld-000000000000\build\toolkit\modules\AppConstants.jsm"

  MOZ_PLACES:
//@line 231 "c:\builds\moz2_slave\rel-m-rel-w32_bld-000000000000\build\toolkit\modules\AppConstants.jsm"
  true,
//@line 235 "c:\builds\moz2_slave\rel-m-rel-w32_bld-000000000000\build\toolkit\modules\AppConstants.jsm"

  MOZ_ANDROID_HISTORY:
//@line 240 "c:\builds\moz2_slave\rel-m-rel-w32_bld-000000000000\build\toolkit\modules\AppConstants.jsm"
  false,
//@line 242 "c:\builds\moz2_slave\rel-m-rel-w32_bld-000000000000\build\toolkit\modules\AppConstants.jsm"

  DLL_PREFIX: "",
  DLL_SUFFIX: ".dll",

  MOZ_APP_NAME: "firefox",
  MOZ_APP_VERSION: "45.0.1",
  MOZ_APP_VERSION_DISPLAY: "45.0.1",
  MOZ_BUILD_APP: "browser",
  MOZ_MACBUNDLE_NAME: "Firefox.app",
  MOZ_UPDATE_CHANNEL: "release",
  INSTALL_LOCALE: "en-US",
  MOZ_WIDGET_TOOLKIT: "windows",
  ANDROID_PACKAGE_NAME: "",
  MOZ_B2G_VERSION: "1.0.0",
  MOZ_B2G_OS_NAME: "",

  MOZ_ANDROID_APZ:
//@line 262 "c:\builds\moz2_slave\rel-m-rel-w32_bld-000000000000\build\toolkit\modules\AppConstants.jsm"
    false,
//@line 264 "c:\builds\moz2_slave\rel-m-rel-w32_bld-000000000000\build\toolkit\modules\AppConstants.jsm"
  DEBUG_JS_MODULES: "",

  // URL to the hg revision this was built from (e.g.
  // "https://hg.mozilla.org/mozilla-central/rev/6256ec9113c1")
  // On unofficial builds, this is an empty string.
  SOURCE_REVISION_URL: "https://hg.mozilla.org/releases/mozilla-release/rev/e0e51efe7b1521f1b69499490c877e11aa170917"
});
