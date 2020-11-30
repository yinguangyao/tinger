module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat',
        'add',
        'mod',
        'del',
        'merge',
        'fix',
        'style',
        'test',
        'revert',
        'refactor',
        'docs',
        'chore',
        'perf',
        'ci',
        'deploy',
        'release',
      ],
    ],
  },
}
