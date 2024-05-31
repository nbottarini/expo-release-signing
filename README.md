[![npm](https://img.shields.io/npm/v/expo-release-signing.svg)](https://www.npmjs.com/package/expo-release-signing)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![CI Status](https://github.com/nbottarini/expo-release-signing/actions/workflows/main.yml/badge.svg?branch=main)](https://github.com/nbottarini/expo-release-signing/actions)

# expo-release-signing
Expo plugin for adding release android upload key signing config

## Installation

Npm:
```
$ npm install --save expo-release-signing 
```

Yarn:
```
$ yarn add expo-release-signing
```

Add plugins to your app.json:

```json
{
  "expo": {
    "plugins": [
      [
        "expo-release-signing",
        {
          "prefix": "EXPO"
        }
      ]
    ]
  }
}
```
