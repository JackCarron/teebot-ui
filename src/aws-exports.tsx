import { AmplifyConfig } from "@aws-amplify/core/lib-esm/types";
import { Auth } from "aws-amplify";
import { API_NAME, BASE_API_URL } from "./constants";

export const getAwsExports = (): AmplifyConfig => {
    return {
        Auth: {
            region: 'us-east-1',
            userPoolId: 'us-east-1_4RjjuDX7t',
            userPoolWebClientId: '4i30fmgmn1hojr2e5es7mo7i97',
            ttl: 9000,
            redirectSignIn: 'http://localhost:3000/',
            // oauth: {
            //     domain: 'teebot.auth.us-east-1.amazoncognito.com'        
            // }
        },
        API: {
            endpoints: [
                {
                    name: API_NAME,
                    endpoint: BASE_API_URL,
                    customHeader: async(): Promise<{ Authorization: string }> => {
                        return {
                            Authorization: `Bearer ${await (await Auth.currentSession()).getIdToken().getJwtToken()}`
                        }
                    }
                }
            ]
        }
    }
}