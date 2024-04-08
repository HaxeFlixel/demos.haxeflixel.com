const core = require('@actions/core');
const github = require('@actions/github');
const fs = require('fs');
const path = require('path');

module.exports = () => {
    try {
        const demos = fs.readdirSync('.').filter(file => fs.statSync(file).isDirectory());
        const projectPaths = demos.map(demo => path.join(demo, 'project.xml'));
        core.setOutput('project-paths', projectPaths.join('\n'));
      } catch (error) {
        core.setFailed(error.message);
      }
}
