# Authentication Gate

We use a commonly basic authentication flow which we like to call *Authencation Gate*.

The gate checks if the user is already authenticated and allows access to the app. If authentication is required, the gate redirects to a third party authentication provider (Auth0 in this case) and redirects back to the app when authentication succeeds.

The implementation for *Authentication Gate* can be found [here](https://github.com/codeuniversity/triangl-dashboard/blob/develop/src/controllers/AuthController.js).	


#### Visual Representation   



![Filter (1)](https://duaw26jehqd4r.cloudfront.net/items/3k1o0Z1r0i2k1R0i2z2q/Filter%20(1).jpg?v=35ab5392)

