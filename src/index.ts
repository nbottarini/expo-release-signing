import { ConfigPlugin, createRunOncePlugin } from '@expo/config-plugins'
import { WarningAggregator, withAppBuildGradle } from 'expo/config-plugins'

export function applyPlugin(appBuildGradle: string, prefix: string) {
    const releasePattern = new RegExp(/signingConfigs\s*\{\s*release\s*\{/)
    if (!appBuildGradle.match(releasePattern)) {
        const releaseContent = 'signingConfigs {\n' +
            '       release {\n' +
            `           if (project.hasProperty('${prefix}_UPLOAD_STORE_FILE')) {\n` +
            `               storeFile file(${prefix}_UPLOAD_STORE_FILE)\n` +
            `               storePassword ${prefix}_UPLOAD_STORE_PASSWORD\n` +
            `               keyAlias ${prefix}_UPLOAD_KEY_ALIAS\n` +
            `               keyPassword ${prefix}_UPLOAD_KEY_PASSWORD\n` +
            '           }\n' +
            '       }\n' +
            '       debug {'
        appBuildGradle = appBuildGradle.replace(/signingConfigs\s*\{\s*debug\s*\{/, releaseContent)
        appBuildGradle = appBuildGradle.replace(/signed-apk-android\.\s*signingConfig signingConfigs\.debug/, 'signed-apk-android.\n            signingConfig signingConfigs.release')
    }
    return appBuildGradle
}

const withReleaseSigning: ConfigPlugin = (config, props) => {
    return withAppBuildGradle(config, config => {
        if (config.modResults.language === 'groovy') {
            config.modResults.contents = applyPlugin(config.modResults.contents, props['prefix'] ?? 'EXPO')
        } else {
            WarningAggregator.addWarningAndroid(
                'expo-release-signing',
                'Cannot automatically configure app build.gradle if it\'s not groovy',
            )
        }
        return config
    })
}

const pak = require('expo-release-signing/package.json')
export default createRunOncePlugin(withReleaseSigning, pak.name, pak.version)
