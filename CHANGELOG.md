# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [1.0.0](https://github.com/fugle-dev/fugle-trade-node/compare/v0.5.0...v1.0.0) (2023-08-01)


### Features

* upgrade @fugle/trade-core to v1.0 ([84f2289](https://github.com/fugle-dev/fugle-trade-node/commit/84f2289048e0113e15e6cd39d191a48926e9a460))

## [0.5.0](https://github.com/fugle-dev/fugle-trade-node/compare/v0.4.1...v0.5.0) (2023-02-24)


### Features

* add support for querying transactions by given start date and end date ([87938fc](https://github.com/fugle-dev/fugle-trade-node/commit/87938fc8f0760969c903d426ad500c8c0e4e983d))

### [0.4.1](https://github.com/fugle-dev/fugle-trade-node/compare/v0.4.0...v0.4.1) (2023-02-24)

## [0.4.0](https://github.com/fugle-dev/fugle-trade-node/compare/v0.3.1...v0.4.0) (2022-11-04)


### Features

* support for getting available balance of the logged in account ([6e1fedf](https://github.com/fugle-dev/fugle-trade-node/commit/6e1fedf3b2e0de1319169ca5b7cfca5a6b7f6939))
* support for getting stock market status ([9f0dfc2](https://github.com/fugle-dev/fugle-trade-node/commit/9f0dfc20daebe7c432b5b2f668cab0f35ef87b76))
* support for getting trade status of the logged in account ([085b3e7](https://github.com/fugle-dev/fugle-trade-node/commit/085b3e72a6e946474b0011cab23b237397a81771))
* support for replacing price by PriceFlag ([acb819b](https://github.com/fugle-dev/fugle-trade-node/commit/acb819b5fa6d13a7e51be78870b7490f7a4e39a5))


### Bug Fixes

* remove the trade type of DayTradeSell as it is not useful ([3abcaa7](https://github.com/fugle-dev/fugle-trade-node/commit/3abcaa7e72a17b71f3e6543ff1192347fbdbf80d))

### [0.3.1](https://github.com/fugle-dev/fugle-trade-node/compare/v0.3.0...v0.3.1) (2022-08-03)

## [0.3.0](https://github.com/fugle-dev/fugle-trade-node/compare/v0.2.1...v0.3.0) (2022-08-01)


### Features

* parse order and trade event messages from the streamer ([2963a64](https://github.com/fugle-dev/fugle-trade-node/commit/2963a6464c304c2f8367ca3cd9772d6e3b088ce2))

### [0.2.1](https://github.com/fugle-dev/fugle-trade-node/compare/v0.2.0...v0.2.1) (2022-07-09)

## [0.2.0](https://github.com/fugle-dev/fugle-trade-node/compare/v0.1.4...v0.2.0) (2022-07-07)


### Features

* make Streamer inherit from EventEmitter ([e520ff0](https://github.com/fugle-dev/fugle-trade-node/commit/e520ff0b519b79a211555e6c138f3c06078ccdb0))


### Bug Fixes

* set price to empty string when price is not set ([61d6b95](https://github.com/fugle-dev/fugle-trade-node/commit/61d6b95d9fe3f61b95f95c76a3e757259582ecbe))

### [0.1.4](https://github.com/fugle-dev/fugle-trade-node/compare/v0.1.3...v0.1.4) (2022-07-06)

### [0.1.3](https://github.com/fugle-dev/fugle-trade-node/compare/v0.1.2...v0.1.3) (2022-07-06)

### [0.1.2](https://github.com/fugle-dev/fugle-trade-node/compare/v0.1.1...v0.1.2) (2022-06-27)

### [0.1.1](https://github.com/fugle-dev/fugle-trade-node/compare/v0.1.0...v0.1.1) (2022-05-17)


### Bug Fixes

* rebuild dist to update core version ([6011e7f](https://github.com/fugle-dev/fugle-trade-node/commit/6011e7f9ed51726b4b0aab957b73bf7fc34991f0))

## [0.1.0](https://github.com/fugle-dev/fugle-trade-node/compare/v0.1.0-beta.1...v0.1.0) (2022-04-25)

## [0.1.0-beta.1](https://github.com/fugle-dev/fugle-trade-node/compare/v0.1.0-beta.0...v0.1.0-beta.1) (2022-04-16)

## [0.1.0-beta.0](https://github.com/fugle-dev/fugle-trade-node/compare/v0.1.0-alpha.2...v0.1.0-beta.0) (2022-03-25)


### Features

* logout to remove credentials ([e61ea0d](https://github.com/fugle-dev/fugle-trade-node/commit/e61ea0d66526b9f3cc0bc2dd188c81f5bc20ce03))
* store account and certificate password with keytar ([411fab6](https://github.com/fugle-dev/fugle-trade-node/commit/411fab65be33ad74ce52f4bf6f5d8fb4f76ea6af))

## [0.1.0-alpha.2](https://github.com/fugle-dev/fugle-trade-node/compare/v0.1.0-alpha.1...v0.1.0-alpha.2) (2022-03-17)

## [0.1.0-alpha.1](https://github.com/fugle-dev/fugle-trade-node/compare/v0.1.0-alpha.0...v0.1.0-alpha.1) (2022-03-11)

## 0.1.0-alpha.0 (2022-03-11)


### Features

* add client that uses remote services from the server ([c3f45c9](https://github.com/fugle-dev/fugle-trade-node/commit/c3f45c9dcada9b8e3251182fe1111827b859d92e))
* add order model ([fd7b065](https://github.com/fugle-dev/fugle-trade-node/commit/fd7b065f62e604b107d33f4afd3b759dd8c53991))
* add placed order model ([dc9b359](https://github.com/fugle-dev/fugle-trade-node/commit/dc9b3599a3eadce96ddbb15add313375e59596bf))
* add streamer to handle ws connection ([77261a7](https://github.com/fugle-dev/fugle-trade-node/commit/77261a794a439f37846aac2b1c2b6e4ccfe0eed0))
* read config file ([fa0209e](https://github.com/fugle-dev/fugle-trade-node/commit/fa0209e2d45e27bcf6e15c36edfb328dabbb3ebf))
