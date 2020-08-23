# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

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
