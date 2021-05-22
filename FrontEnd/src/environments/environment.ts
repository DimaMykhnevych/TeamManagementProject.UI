const API_BASE_URL = 'https://localhost:44372/v1';

export const environment = {
  production: false,
  apiRoutes: {
    identity: {
      login: `${API_BASE_URL}/identity/login`,
      register: `${API_BASE_URL}/identity/register`,
      getUser: `${API_BASE_URL}/identity/user`,
      getUsers: `${API_BASE_URL}/identity/users`,
      makeAdmin: `${API_BASE_URL}/identity/make-admin`,
      getTeam : `${API_BASE_URL}/identity/getTeam`
    },
    articles: {
      getById: `${API_BASE_URL}/articles`,
      groupedGet: `${API_BASE_URL}/articles?grouped=true`,
      getForCurrentUser: `${API_BASE_URL}/articles/for-user`,
      post: `${API_BASE_URL}/articles`,
      put: `${API_BASE_URL}/articles/`,
      delete: `${API_BASE_URL}/articles`,
    },
    howToArticles: {
      get: `${API_BASE_URL}/how-to-articles`,
      post: `${API_BASE_URL}/how-to-articles`,
      delete: `${API_BASE_URL}/how-to-articles`,
      edit: `${API_BASE_URL}/how-to-articles`,
    },
    tags: {
      get: `${API_BASE_URL}/tags`,
      post: `${API_BASE_URL}/tags`,
    },
    polls: {
      post: `${API_BASE_URL}/polls`,
      get: `${API_BASE_URL}/polls`,
      makeVote: `${API_BASE_URL}/polls/make-vote`,
    },
    companies: {
      post: `${API_BASE_URL}/companies`,
      get: `${API_BASE_URL}/companies`,
    },
    subscriptionPlans: {
      get: `${API_BASE_URL}/subscription-plans`,
    },
    subscription: {
      put: `${API_BASE_URL}/subscriptions`,
    },
    event : {
      post: `${API_BASE_URL}/events`,
      get: `${API_BASE_URL}/events`,
      changeAttending: `${API_BASE_URL}/events/changeAttending`
    },
    report : {
      post: `${API_BASE_URL}/reports`,
      get: `${API_BASE_URL}/reports`
    }
  },
  stripeKeys: {
    publishableKey:
      'pk_test_51Irp6yF27ICkRRw9XrC5XUCd43fCvV4YGyhyg1nEnYjY3dr8Iegpjo0o0dviTYptZ4Unoaaek4X3vCnNFTmtZtGa00GmwLCiKT',
    secretKey:
      'sk_test_51Irp6yF27ICkRRw9OmlU3TEgVWfSqzFTL9qBCK5nJQdrv3eqVOX7rXVbOWKhOhrt9M6Smn6pbr0Ti7tiZcsVjVCC000IqHEVOV',
  },
  ckeditorConfig: {
    toolbar: {
      items: [
        'Heading',
        '|',
        'Bold',
        'Italic',
        'Underline',
        'FontFamily',
        'FontSize',
        'FontColor',
        'FontBackgroundColor',
        'Link',
        'BulletedList',
        'NumberedList',
        'alignment',
        'BlockQuote',
        'InsertTable',
        'MediaEmbed',
        'Undo',
        'Redo',
      ],
    },
    table: {
      contentToolbar: [
        'tableColumn',
        'tableRow',
        'mergeTableCells',
        'tableProperties',
        'tableCellProperties',
      ],
    },
    removePlugins: ['Title'],
    mediaEmbed: {
      extraProviders: [
        {
          name: 'allow-all',
          url: '(https?://.*.(?:png|jpg|svg|jpeg))',
          html: (match) =>
            `<img style="margin:0 auto; max-width: 90%;" src=${match.input}>`,
        },
      ],
      previewsInData: true,
    },
  },
};
