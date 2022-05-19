const port = 2368;
const baseUrl = `http://localhost:${port}`;

const adminUrl = `${baseUrl}/ghost/#`;
const adminUrls = {
    loginUrl: `${adminUrl}/signin`,
    dasboardUrl: `${adminUrl}/dashboard`,
    editorUrl: `${adminUrl}/editor`,
    postUrls: {
        listUrl: `${adminUrl}/posts`,
    },
    pageUrls: {
        listUrl: `${adminUrl}/pages`
    },
    tagUrls: {
        listUrl: `${adminUrl}/tags`
    },
    settingsUrls: {
        labs: `${adminUrl}/settings/labs`
    }
};
const userUrls = {
    homeUrl: baseUrl
};

export {adminUrls, userUrls}