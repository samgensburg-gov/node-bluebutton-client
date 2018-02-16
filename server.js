const express = require('express')
const app = express()

// Set the configuration settings


// Sandbox Credentials

const credentials = {
    client: {
        id: '3Jl5mXv028WtPZ5Jl3OewIRcbNQawFqkHNhwumbZ',
        secret: '******************'
    },
    auth: {
        tokenHost: 'https://sandbox.bluebutton.cms.gov',
        authorizePath: '/v1/o/authorize/',
        tokenPath: '/v1/o/token/'
    }
};

/*
// Dev Credentials
const credentials = {
    client: {
        id: 'gfLhooHhisd7prfWehl8sih22Q5XXWw6ByYIxfJ1',
        secret: '*******************'
    },
    auth: {
        tokenHost: 'https://dev.bluebutton.cms.gov',
        authorizePath: '/v1/o/authorize/',
        tokenPath: '/v1/o/token/'
    }
};



// Local Credentials

const credentials = {
    client: {
        id: 'K4mj8iTJuxBJbxXbYJGVXmsmbjzaN5VfiEbv3Xlq',
        secret: 'jw23oxr8m7pWNYz7eJXQ9iWZUEvSlzhaDLuLnf4tTn97XxVPFuT3iuzAsD994rsTYNpKxa2MzW8jMLxX8qJ14SzPrYLb6CwlX7VAIvqGIfCndOrfCBxqNxVTjlBaaPsK'
    },
    auth: {
        tokenHost: 'http://local:8000',
        authorizePath: '/v1/o/authorize/',
        tokenPath: '/v1/o/token/'
    }
};
*/

// Initialize the OAuth2 Library
const oauth2 = require('simple-oauth2').create(credentials);

// Authorization oauth2 URI
const authorizationUri = oauth2.authorizationCode.authorizeURL({
    redirect_uri: 'http://localhost:8001/redirect',
    state: 'alasdjgkljgklfasdf'
});

function handle_redirect(request, response) {
    const code = request.query.code;
    const tokenConfig = {
        code: code,
        redirect_uri: 'http://localhost:8001/redirect'
    };

    // Callbacks
    // Save the access token
    oauth2.authorizationCode.getToken(tokenConfig, (error, result) => {
        if (error) {
            return console.log('Access Token Error', error.message);
        }

        console.log(result);

        const accessToken = oauth2.accessToken.create(result);
        response.send('Operation complete!')
    });
}

app.get('/login', (req, res) => res.redirect(authorizationUri))
app.get('/redirect', handle_redirect)
app.get('/', (req, res) => res.send('Hello World!'))

app.listen(8001, () => console.log('Example app listening on port 8001!'))
