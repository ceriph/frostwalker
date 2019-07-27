# Frostwalker

## Build

Generate resources:
`ionic cordova resources --force`

Live debug:
`ionic cordova run android --device -c -l --ssl --debug`

Build:
`ionic cordova build --release android`

Sign apk:
"C:/Program Files/Java/jdk1.8.0_171/bin/jarsigner" -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore app-release.keystore ./platforms/android/app/build/outputs/apk/release/app-release-unsigned.apk app-release


## TODO

### Story

* Prologue - battle, frost, ultimate enemy? - review
* Chapter 1 - waking up, intuition to dreamer, tonic, protectors, shifters, argus, vara, twins - review
* Chapter 2 - travel, vara, jimmy, tasha, stories - review
* Chapter 3 - wellspring, fire 
* Chapter 4
* Chapter 5
* Chapter 6
* Chapter 7
* Chapter 8
* Chapter 9
* Chapter 10

### Features

* Premium choices (tonic) / 'energy'
* Themes
  * Angry?
  * Fully dynamic?

### Bugs

* MAJOR - Reward events don't verify

### Nice to haves (func)

* Display theme preview
* Logo design

### Nice to haves (tech)

* Sound service for easier web debugging
* prod/test flags for ad testing
