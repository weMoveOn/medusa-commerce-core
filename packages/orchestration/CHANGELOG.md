# @medusajs/orchestration

## 0.4.0

### Minor Changes

- [#4974](https://github.com/medusajs/medusa/pull/4974) [`d8649baca`](https://github.com/medusajs/medusa/commit/d8649bacaa2ed784b9e7b2b0e1f1194d3697bb92) Thanks [@carlos-r-l-rodrigues](https://github.com/carlos-r-l-rodrigues)! - object to remote joiner query

### Patch Changes

- [#4969](https://github.com/medusajs/medusa/pull/4969) [`30863fee5`](https://github.com/medusajs/medusa/commit/30863fee529ed035f161c749fda3cd64fa48efb1) Thanks [@adrien2p](https://github.com/adrien2p)! - feat: store List products remote query with product isolation

- [#5025](https://github.com/medusajs/medusa/pull/5025) [`3d68be2b6`](https://github.com/medusajs/medusa/commit/3d68be2b6b93ae928f5c955e102ebdf2c34fb364) Thanks [@riqwan](https://github.com/riqwan)! - fix(orchestration,link-modules,pricing,types): fix shippingprofile error outside of core + change link alias name

- [#5023](https://github.com/medusajs/medusa/pull/5023) [`107aaa371`](https://github.com/medusajs/medusa/commit/107aaa371c444843874d125bf8bd493ef89f5756) Thanks [@adrien2p](https://github.com/adrien2p)! - fix(orchestration, types): Improve fieldAlias and prevent infinite loop by validating at development time

- Updated dependencies [[`4fa675ec2`](https://github.com/medusajs/medusa/commit/4fa675ec25b3d6fccd881c4f5a5b91f0e9e13e82), [`6273b4b16`](https://github.com/medusajs/medusa/commit/6273b4b160493463e1199e5db4e9cfa4cff6fbe4), [`30863fee5`](https://github.com/medusajs/medusa/commit/30863fee529ed035f161c749fda3cd64fa48efb1), [`3d68be2b6`](https://github.com/medusajs/medusa/commit/3d68be2b6b93ae928f5c955e102ebdf2c34fb364), [`a87d07655`](https://github.com/medusajs/medusa/commit/a87d07655bd8a1da8b90feb739daddd09295f724), [`edf90eecb`](https://github.com/medusajs/medusa/commit/edf90eecb487f6e031f2e2d0899de5ca2504cb12), [`107aaa371`](https://github.com/medusajs/medusa/commit/107aaa371c444843874d125bf8bd493ef89f5756), [`834da5c41`](https://github.com/medusajs/medusa/commit/834da5c41a7c043373f72239b6fdbf7815d9b4aa)]:
  - @medusajs/types@1.11.1
  - @medusajs/utils@1.10.1

## 0.3.0

### Minor Changes

- [#4695](https://github.com/medusajs/medusa/pull/4695) [`4d16acf5f`](https://github.com/medusajs/medusa/commit/4d16acf5f096b5656b645f510f9c971e7c2dc9ef) Thanks [@carlos-r-l-rodrigues](https://github.com/carlos-r-l-rodrigues)! - Medusa App Loader

- [#4695](https://github.com/medusajs/medusa/pull/4695) [`4d16acf5f`](https://github.com/medusajs/medusa/commit/4d16acf5f096b5656b645f510f9c971e7c2dc9ef) Thanks [@carlos-r-l-rodrigues](https://github.com/carlos-r-l-rodrigues)! - introduce @medusajs/link-modules

- [#4925](https://github.com/medusajs/medusa/pull/4925) [`a4906d0ac`](https://github.com/medusajs/medusa/commit/a4906d0ac0af36b1382d3befe64281b404387bd7) Thanks [@carlos-r-l-rodrigues](https://github.com/carlos-r-l-rodrigues)! - Use MedusaApp on core and initial JoinerConfig for internal services

### Patch Changes

- [#4930](https://github.com/medusajs/medusa/pull/4930) [`c3dba0694`](https://github.com/medusajs/medusa/commit/c3dba069488952945150117a30b1306a2e0bb3ce) Thanks [@riqwan](https://github.com/riqwan)! - fix(modules-sdk, orchestration): add missing dependencies

- Updated dependencies [[`460161a69`](https://github.com/medusajs/medusa/commit/460161a69f22cf6d561952e92e7d9b56912113e6), [`fcb6b4f51`](https://github.com/medusajs/medusa/commit/fcb6b4f510dba2757570625acb5da9476b7544fd), [`66bd9a835`](https://github.com/medusajs/medusa/commit/66bd9a835c61b139af7051e5faf6c9de3c7134bb), [`4d16acf5f`](https://github.com/medusajs/medusa/commit/4d16acf5f096b5656b645f510f9c971e7c2dc9ef), [`4d16acf5f`](https://github.com/medusajs/medusa/commit/4d16acf5f096b5656b645f510f9c971e7c2dc9ef), [`87bade096`](https://github.com/medusajs/medusa/commit/87bade096e3d536f29ddc57dbc4c04e5d7a46e4b), [`4d16acf5f`](https://github.com/medusajs/medusa/commit/4d16acf5f096b5656b645f510f9c971e7c2dc9ef)]:
  - @medusajs/types@1.11.0
  - @medusajs/utils@1.10.0

## 0.2.0

### Minor Changes

- [#4697](https://github.com/medusajs/medusa/pull/4697) [`c0ca00290`](https://github.com/medusajs/medusa/commit/c0ca00290106fbdc8e15077bc8d1c3eafbef59f2) Thanks [@carlos-r-l-rodrigues](https://github.com/carlos-r-l-rodrigues)! - Add pipe onComplete callback and preparation function to exportsWorkflow

### Patch Changes

- [#4716](https://github.com/medusajs/medusa/pull/4716) [`ac866ebb5`](https://github.com/medusajs/medusa/commit/ac866ebb5197ee694dda91824b501109012a3dd1) Thanks [@adrien2p](https://github.com/adrien2p)! - test(): Test the create product workflow compensation
  fix(orchestration): Fix the transaction state after compensating with no compensation steps in the middle
  chore(workflows): Export and naming
  feat(types): Update product workflow input types
  feat(medusa): Update product workflow usage and cleanup endpoint
- Updated dependencies [[`3f3a84262`](https://github.com/medusajs/medusa/commit/3f3a84262ce9cbd911923278a54e301fbe9a4634), [`30ce35b16`](https://github.com/medusajs/medusa/commit/30ce35b163afa25f4e1d8d1bd392f401a3b413df)]:
  - @medusajs/utils@1.9.6

## 0.1.0

### Minor Changes

- [#4553](https://github.com/medusajs/medusa/pull/4553) [`f12299deb`](https://github.com/medusajs/medusa/commit/f12299deb10baadab1505cd4ac353dd5d1c8fa7c) Thanks [@carlos-r-l-rodrigues](https://github.com/carlos-r-l-rodrigues)! - Medusa workflows package

### Patch Changes

- Updated dependencies [[`131477faf`](https://github.com/medusajs/medusa/commit/131477faf0409c49d4aacf26ea591e33b2fa22fd)]:
  - @medusajs/utils@1.9.3

## 0.0.2

### Patch Changes

- [#4098](https://github.com/medusajs/medusa/pull/4098) [`499c3478c`](https://github.com/medusajs/medusa/commit/499c3478c910c8b922a15cc6f4d9fbad122a347f) Thanks [@carlos-r-l-rodrigues](https://github.com/carlos-r-l-rodrigues)! - feat: Remote Joiner

- Updated dependencies [[`499c3478c`](https://github.com/medusajs/medusa/commit/499c3478c910c8b922a15cc6f4d9fbad122a347f), [`9dcdc0041`](https://github.com/medusajs/medusa/commit/9dcdc0041a2b08cc0723343dd8d9127d9977b086), [`9760d4a96`](https://github.com/medusajs/medusa/commit/9760d4a96c27f6f89a8c3f3b6e73b17547f97f2a)]:
  - @medusajs/utils@1.9.2
