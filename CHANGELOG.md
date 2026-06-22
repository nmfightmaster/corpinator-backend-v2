# [1.21.0](https://github.com/nmfightmaster/corpinator-backend/compare/v1.20.0...v1.21.0) (2026-06-21)


### Features

* add SDE schema for blueprint and type data ([b891b0f](https://github.com/nmfightmaster/corpinator-backend/commit/b891b0f48f67f8fd4a8bde08042636a17a7c622c))

# [1.20.0](https://github.com/nmfightmaster/corpinator-backend/compare/v1.19.0...v1.20.0) (2026-06-19)


### Features

* add character asset endpoint ([a356f34](https://github.com/nmfightmaster/corpinator-backend/commit/a356f347749775b688ac6cea9ce294b36b9dba1a))

# [1.19.0](https://github.com/nmfightmaster/corpinator-backend/compare/v1.18.1...v1.19.0) (2026-06-18)

### Features

- separate logout from logoutAll, properly type characterId, properly validate aud ([2d2e203](https://github.com/nmfightmaster/corpinator-backend/commit/2d2e203830fc36a8409d71934173246f8eae5667))

## [1.18.1](https://github.com/nmfightmaster/corpinator-backend/compare/v1.18.0...v1.18.1) (2026-06-18)

### Bug Fixes

- harden auth claim ([602c589](https://github.com/nmfightmaster/corpinator-backend/commit/602c5897f00e43ace371ff49370c2bf355e1a84c))

# [1.18.0](https://github.com/nmfightmaster/corpinator-backend/compare/v1.17.2...v1.18.0) (2026-06-18)

### Features

- implement rate limiting ([c663535](https://github.com/nmfightmaster/corpinator-backend/commit/c663535e05f03be803e0afa5170c69224ba634be))

## [1.17.2](https://github.com/nmfightmaster/corpinator-backend/compare/v1.17.1...v1.17.2) (2026-06-15)

### Bug Fixes

- implement auth rate limiting ([f209fbc](https://github.com/nmfightmaster/corpinator-backend/commit/f209fbc1bbb162b4eccb734ffbfdaf076766dca6))

## [1.17.1](https://github.com/nmfightmaster/corpinator-backend/compare/v1.17.0...v1.17.1) (2026-06-15)

### Bug Fixes

- implement helmet ([9c9f5e1](https://github.com/nmfightmaster/corpinator-backend/commit/9c9f5e1aca1491e66adfc24f0f2830c3075af5a6))

# [1.17.0](https://github.com/nmfightmaster/corpinator-backend/compare/v1.16.1...v1.17.0) (2026-06-15)

### Features

- validate secret strength at boot ([032a34a](https://github.com/nmfightmaster/corpinator-backend/commit/032a34ae2fc21fecf041edfc3289cb71d33f6481))

## [1.16.1](https://github.com/nmfightmaster/corpinator-backend/compare/v1.16.0...v1.16.1) (2026-06-15)

### Bug Fixes

- harden trust proxy ([390bf5e](https://github.com/nmfightmaster/corpinator-backend/commit/390bf5e58bc7f9e1c342e3e184d8bab7a60e9e18))

# [1.16.0](https://github.com/nmfightmaster/corpinator-backend/compare/v1.15.0...v1.16.0) (2026-06-15)

### Features

- revoke refresh token on logout ([7ee2df5](https://github.com/nmfightmaster/corpinator-backend/commit/7ee2df5b84338f012d012841518013b0062c9738))

# [1.15.0](https://github.com/nmfightmaster/corpinator-backend/compare/v1.14.0...v1.15.0) (2026-06-15)

### Features

- implement default headers and create x-user-agent header ([ac3d07f](https://github.com/nmfightmaster/corpinator-backend/commit/ac3d07f94bc8335f452adac4391781e3c547132a))

# [1.14.0](https://github.com/nmfightmaster/corpinator-backend-v2/compare/v1.13.0...v1.14.0) (2026-06-15)

### Features

- move stale session cleanup to cron ([f342ab1](https://github.com/nmfightmaster/corpinator-backend-v2/commit/f342ab19549e3d2d38fd469ba5bfb2580db16f8c))

# [1.13.0](https://github.com/nmfightmaster/corpinator-backend-v2/compare/v1.12.0...v1.13.0) (2026-06-15)

### Features

- address production secure cookies footgun ([c426db3](https://github.com/nmfightmaster/corpinator-backend-v2/commit/c426db387a33dcc1c4dcc6c0127e74e25de4d880))

# [1.12.0](https://github.com/nmfightmaster/corpinator-backend-v2/compare/v1.11.0...v1.12.0) (2026-06-15)

### Features

- establish robust error handling ([f8c6fba](https://github.com/nmfightmaster/corpinator-backend-v2/commit/f8c6fba1c77002a021b91269e40bcd23ae29b37b))

# [1.11.0](https://github.com/nmfightmaster/corpinator-backend-v2/compare/v1.10.0...v1.11.0) (2026-06-15)

### Features

- prevent lockout due to token refresh race ([2f149da](https://github.com/nmfightmaster/corpinator-backend-v2/commit/2f149da3427a7752716e7af511ca542c8e345086))

# [1.10.0](https://github.com/nmfightmaster/corpinator-backend-v2/compare/v1.9.1...v1.10.0) (2026-06-15)

### Features

- implement jwks verification of tokens ([ce4c616](https://github.com/nmfightmaster/corpinator-backend-v2/commit/ce4c616219bab4bf0ede7dfd22f18830d1d9ab85))

## [1.9.1](https://github.com/nmfightmaster/corpinator-backend-v2/compare/v1.9.0...v1.9.1) (2026-06-14)

### Bug Fixes

- add sameSite to cookies in authController ([12f5f9e](https://github.com/nmfightmaster/corpinator-backend-v2/commit/12f5f9e7054277e757e23d5b7605e9ff6837868e))

# [1.9.0](https://github.com/nmfightmaster/corpinator-backend-v2/compare/v1.8.0...v1.9.0) (2026-06-14)

### Bug Fixes

- add compatibilityDate to config ([398f5c2](https://github.com/nmfightmaster/corpinator-backend-v2/commit/398f5c2729638eeca0c8ec46c700cc15b0a4a330))
- add eve base url to config ([740d70f](https://github.com/nmfightmaster/corpinator-backend-v2/commit/740d70fcdd2e92139c4f59d6531ae9ea66489e6d))

### Features

- create ESI router and /me endpoint ([20825fc](https://github.com/nmfightmaster/corpinator-backend-v2/commit/20825fcce8c14e063cc64bc8f25a6b87e9e96ded))

# [1.8.0](https://github.com/nmfightmaster/corpinator-backend-v2/compare/v1.7.0...v1.8.0) (2026-06-14)

### Features

- implement EVE access token refresh ([3996b4d](https://github.com/nmfightmaster/corpinator-backend-v2/commit/3996b4d35dedcd80d887cba369436b0cc35f57ea))

# [1.7.0](https://github.com/nmfightmaster/corpinator-backend-v2/compare/v1.6.1...v1.7.0) (2026-06-14)

### Bug Fixes

- wire access_token into upsertCharacter ([e4fd752](https://github.com/nmfightmaster/corpinator-backend-v2/commit/e4fd752fc1b9845b0c120e71abc5e6c73cddf649))

### Features

- create/wire crypto util ([d87ac71](https://github.com/nmfightmaster/corpinator-backend-v2/commit/d87ac71050e1ddf43b5ee3dc27d4e662709c3923))

## [1.6.1](https://github.com/nmfightmaster/corpinator-backend-v2/compare/v1.6.0...v1.6.1) (2026-06-14)

### Bug Fixes

- add access_token column to characters table ([2d71734](https://github.com/nmfightmaster/corpinator-backend-v2/commit/2d71734c8ff0e9cc81f2d694a3cf54c49b33339c))

# [1.6.0](https://github.com/nmfightmaster/corpinator-backend-v2/compare/v1.5.0...v1.6.0) (2026-06-14)

### Features

- implement expired session cleanup ([76a9202](https://github.com/nmfightmaster/corpinator-backend-v2/commit/76a92029d4d6492acfb0f5d9dd2c0fecd28fa18f))

# [1.5.0](https://github.com/nmfightmaster/corpinator-backend-v2/compare/v1.4.0...v1.5.0) (2026-06-14)

### Features

- implement logout ([89e3d21](https://github.com/nmfightmaster/corpinator-backend-v2/commit/89e3d2100b1e91b7c8806c8bd59d6c2fc89a90ce))

# [1.4.0](https://github.com/nmfightmaster/corpinator-backend-v2/compare/v1.3.0...v1.4.0) (2026-06-14)

### Features

- implement auth middleware ([93196a5](https://github.com/nmfightmaster/corpinator-backend-v2/commit/93196a552303e01dc0d978d071c6ce69ed79de24))

# [1.3.0](https://github.com/nmfightmaster/corpinator-backend-v2/compare/v1.2.0...v1.3.0) (2026-06-13)

### Features

- create and wire auth controller ([0a1b5ef](https://github.com/nmfightmaster/corpinator-backend-v2/commit/0a1b5ef72d4cdefc20cf3d293567b107c5bdf339))

# [1.2.0](https://github.com/nmfightmaster/corpinator-backend-v2/compare/v1.1.0...v1.2.0) (2026-06-13)

### Bug Fixes

- create evejwtpayload model ([151770d](https://github.com/nmfightmaster/corpinator-backend-v2/commit/151770d83c15e578eb48d78392ed48b7389e5549))
- create ssoexception ([9547fbe](https://github.com/nmfightmaster/corpinator-backend-v2/commit/9547fbe85f43366dd24faffe47da1dbb119d6e7d))
- initial prisma migrations, downgrade to 6.19.3 ([0f66b01](https://github.com/nmfightmaster/corpinator-backend-v2/commit/0f66b013b908f06601add10ac5a0db5c31d97902))
- load auth urls directly from EVE ([27b1e13](https://github.com/nmfightmaster/corpinator-backend-v2/commit/27b1e1342cccda1a4da75e041dfb87da977dbcdc))
- scaffold db ([04cac4d](https://github.com/nmfightmaster/corpinator-backend-v2/commit/04cac4d3fe6b09af1f82c628430de92d4c3aabe5))
- throw ssoexception ([9d97645](https://github.com/nmfightmaster/corpinator-backend-v2/commit/9d97645a087da99c3c0d783aa92e01281440429b))

### Features

- create prisma client ([1f0d67d](https://github.com/nmfightmaster/corpinator-backend-v2/commit/1f0d67d640f66ab309bc595ea25e7c20d263e0a2))
- implement sso service ([7341932](https://github.com/nmfightmaster/corpinator-backend-v2/commit/7341932cc05f5c30017ed21bf906071f994ee023))

# [1.1.0](https://github.com/nmfightmaster/corpinator-backend-v2/compare/v1.0.1...v1.1.0) (2026-06-13)

### Features

- create eve scope storage/retrieval ([f7ecb01](https://github.com/nmfightmaster/corpinator-backend-v2/commit/f7ecb01bc734f6a84a8ebd8c3318133721376a61))

## [1.0.1](https://github.com/nmfightmaster/corpinator-backend-v2/compare/v1.0.0...v1.0.1) (2026-06-02)

### Bug Fixes

- update deployment ([8f36111](https://github.com/nmfightmaster/corpinator-backend-v2/commit/8f36111050366adefd39e6c27bfda66ae411f5ac))

# 1.0.0 (2026-06-02)

### Features

- scaffold project ([cb1dae4](https://github.com/nmfightmaster/corpinator-backend-v2/commit/cb1dae4f9619e537fa9785eebf75c78fbcde955d))
