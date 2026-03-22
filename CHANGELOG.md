# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).
This file is based on the Semver-Model ('Added', 'Changed', 'Removed')

## [1.0.4] - add Windows quick install script instructions

📦 build(utils): add PowerShell install script for Windows configuration

### Added

- create a new script to automate the installation of config files
- script copies files to appropriate directories and sets them to read-only
- include the install script path when creating the release ZIP package
- explain how to run the script for automatic file copying and locking

## [1.0.3] - fix for audio bugs

✨ feat(audio): increase audio channels and speakers

### Changed

- update miles_channels and sound_num_speakers to support 8 channels
- enhance audio experience with virtual 7.1 to fix sound direction bug that appears for some

## [1.0.2] - tidy up and rework repo

just wording and making things useable for you

## [1.0.1] - unitize Zip

♻️ refactor(zipUtils): normalize zip filenames

### Changed

- implement filename normalization for autoexec and videoconfig
- ensure consistent naming when adding files to the zip

## [1.0.0] - hello Champion

📦 build: initialize Apex Legends configuration project

### Added

- create initial project structure with GitHub workflows
- add package.json for dependency management
- set up Rollup for building configuration presets
- implement scripts for generating video and autoexec configurations
- add basic README and changelog files for documentation
- include .gitignore to exclude unnecessary files