import { AmplifyConfig } from "@aws-amplify/core/lib-esm/types";

export const getAwsExports = (): AmplifyConfig => {
    return {
        Auth: {
            region: 'us-east-1',
            userPoolId: 'us-east-1_4RjjuDX7t',
            userPoolWebClientId: '4i30fmgmn1hojr2e5es7mo7i97',
            ttl: 9000,
            oauth: {
                domain: 'teebot.auth.us-east-1.amazoncognito.com'        
            }
        }
    }
}