# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [0.0.20](https://github.com/ckxng/universityofscouting/compare/v0.0.19...v0.0.20) (2020-09-14)


### Features

* add capabilities ([9ee4ac8](https://github.com/ckxng/universityofscouting/commit/9ee4ac8fa41036eff348814be18ef23a356aef0a))
* adds capabilities check to function ([0175c13](https://github.com/ckxng/universityofscouting/commit/0175c134ca7e68202ed64d23ca0bcc83df038fa1))
* adds council and role to profile output ([55601e8](https://github.com/ckxng/universityofscouting/commit/55601e835f9c5b93baa012fc1f4723fc8cdb4402))
* adds data/council module ([79ac29b](https://github.com/ckxng/universityofscouting/commit/79ac29b216ebcd795789d16e0a53e84d222271d3))
* adds index to members, registrations ([edfbfb4](https://github.com/ckxng/universityofscouting/commit/edfbfb4156c4e6c3a237b565f6a6cc4a3989363d))
* adds member modelhelper and api permissions ([2e298de](https://github.com/ckxng/universityofscouting/commit/2e298de58562296655ed8f9d254a360a90b7272b))
* adds virtuals and capabilities to models ([01cae7a](https://github.com/ckxng/universityofscouting/commit/01cae7af2639169e396112b6dbd34e4b07a52fab))
* filters by earliest date ([5155439](https://github.com/ckxng/universityofscouting/commit/5155439cbf7cce3d926e63694a6ec135d00d84a1))


### Bug Fixes

* adds logging and corrects modelhelper logic ([20097c9](https://github.com/ckxng/universityofscouting/commit/20097c9317bb741d3a44ee654d6f97d735df9e2e))
* adds missing ; ([6f0ed60](https://github.com/ckxng/universityofscouting/commit/6f0ed608c972c94831e0d2b11cdb26ff00a859a5))
* adds new virtuals to exportObject ([9401336](https://github.com/ckxng/universityofscouting/commit/94013365a97444991e3fda9018f56a03f9ce429d))
* adds user data api for popups ([7bf2678](https://github.com/ckxng/universityofscouting/commit/7bf2678e78e383e9a215ca847fcd2b7cf21eb5e1))
* changes Module to module ([97d2bcb](https://github.com/ckxng/universityofscouting/commit/97d2bcb0134fb3fa8afa77068e796baa4cb0a172))
* hides non-functional edit buttons ([4f31463](https://github.com/ckxng/universityofscouting/commit/4f3146336267be77a83da4c0d7eb8cbb5d1e1649))
* member api fixes ([a9bffbe](https://github.com/ckxng/universityofscouting/commit/a9bffbec99af1b4fde066eb61beeed3c659f3b46))
* updates serialization of members into user data ([838fac4](https://github.com/ckxng/universityofscouting/commit/838fac47619c1d17300a945beb1501adb21f5009))
* upgrades bl CVE-2020-8244 ([87f56c7](https://github.com/ckxng/universityofscouting/commit/87f56c766dd05aeae505968b626dbe168a2d6b79))

### [0.0.19](https://github.com/ckxng/universityofscouting/compare/v0.0.18...v0.0.19) (2020-08-27)


### Features

* adds docker container support ([1adab92](https://github.com/ckxng/universityofscouting/commit/1adab92cce815758f7c088295bbe49aff77a368d))

### 0.0.18 (2020-08-23)

- renamed print function to avoid conflict with browser built-in

### 0.0.17 (2020-08-08)

- created a print window for the schedule page
- adjusted the transcript print page
- corrected a filtering issue where the git request would return all schedule records instead of just the logged in member's records

### 0.0.16 (2020-08-08)

- header, footer, and index page cleanup

### 0.0.15 (2020-08-02)

- adds csv middleware back in

### 0.0.14 (2020-08-02)

- copies email address to clipboard
- fixes hover

### 0.0.13 (2020-08-02)

- adds home page content
- minor visual cleanup

### 0.0.12 (2020-07-27)

- adds home page button to login page

### 0.0.11 (2020-07-27)

- css updates
- adds placeholders for editing and deleting transcript/schedule records

### 0.0.10 (2020-07-25)

- npm audit fix

### 0.0.9 (2020-07-25)

- print window is now a dedicated ejs page

### 0.0.8 (2020-06-18)

- update transcript page has been updated with additional profile information
- added a how-to guide via popup from a tooltip
- remove the Download PDF option
- re-add Print to PDF option

### 0.0.7 (2020-06-13)

- remove print PDF option
- add download PDF option
- improve formatting

### 0.0.6 (2020-06-12)

- improvements to the visual appearance of the app
- export as CSV and print button

### 0.0.5 (2020-06-10)

- further improve visual appearance
- login with memberID and lastName

### 0.0.4 (2020-06-09)

- BREAKING CHANGE: removed the TranscriptEntries models
- added members and registrations models
- report user data via. api
- added csv and pdf buttons to transcript
- updated the logo and templates

### 0.0.3 (2020-06-09)

- correct SESSION_SECRET object name

### 0.0.2 (2020-06-09)

- add api to retrieve transcripts for all users
- add csv export of transcripts via. api
- authenticate any user attempting login
- wrap api in login

### 0.0.1 (2020-06-08)

- initial version
