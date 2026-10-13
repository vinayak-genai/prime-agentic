module.exports = {
  ci: {
    collect: {
      numberOfRuns: 3,
      url: [
        'http://127.0.0.1:3000/',
        'http://127.0.0.1:3000/platforms/financial-planner',
      ],
      settings: { preset: 'desktop' },
    },
    assert: {
      assertions: {
        'cumulative-layout-shift': ['error', { maxNumericValue: 0.1 }],
        'total-blocking-time': ['error', { maxNumericValue: 200 }],
        'largest-contentful-paint': ['warn', { maxNumericValue: 2700 }],
        'categories:accessibility': ['error', { minScore: 0.95 }],
      },
    },
    upload: {
      target: 'filesystem',
      outputDir: './.lighthouseci/desktop',
    },
  },
};
