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

* Prologue - Setup enemy and innkeeper, set expectations for town and allow exposition for dreaming - review
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

* Energy
* Themes
  * Angry?
* More text 'history' before screen change
* Prevent over-tapping


### Bugs

* MAJOR - Reward events don't verify

### Nice to haves (func)

*
* Display theme preview
* Logo design

### Nice to haves (tech)

* Tidy theme service

