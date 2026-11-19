module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat', // A new feature
        'fix', // A bug fix
        'docs', // Documentation only changes
        'style', // Formatting and styling (no behaviour change)
        'refactor', // A code change that neither fixes a bug nor adds a feature
        'perf', // A change that improves performance or experience
        'test', // Adding missing tests
        'ci', // Continuous integration changes
        'chore', // Changes to the build process or auxiliary tools
        'revert', // Revert to a previous commit
        'workflow', // Workflow improvements
        'mod', // Changes that do not fit any other category
        'wip', // Work in progress
        'types', // Type definition changes
        'release' // Release
      ]
    ],
    'subject-full-stop': [0, 'never'],
    'subject-case': [0, 'never']
  }
}
