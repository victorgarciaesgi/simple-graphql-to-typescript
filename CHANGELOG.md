# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased]

## [0.6.4] - 2020-02-12

### Added

- Support for subscribtion for `codegen-react-hooks`, `codegen-vue-hooks` and `codegen-template`
- Added `init` command to create a configuration file

### Changed

- Changed structure of `codegen-template`, from global object to separeted individual templates exports
- Fixed types

## [0.6.0] - 2020-02-07

### Added

- New `codegen-vue-hooks` options: generate Vue 3 hooks

### Changed

- Renamed `codegen-hooks` to `codegen-react-hooks` to avoid confusion with `codegen-vue-hooks`
- Cleaned up the code base a bit, simpler typed, less overhead
