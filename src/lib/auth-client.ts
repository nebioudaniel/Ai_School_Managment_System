import { createAuthClient } from "better-auth/client";
import { emailOtpPlugin } from "./plugins/emailOtpPlugin";

export const authClient = createAuthClient({
  plugins: [emailOtpPlugin()],

});
const signIn = async () => {
  const data = await authClient.signIn.social({
    provider: "google",
  });
};
const data = await authClient.signIn.social({
    provider: "google",
    idToken: {
        token: // Google ID Token,
        accessToken: // Google Access Token
    }
})
