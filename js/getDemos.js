const fs = require('fs');
const path = require('path');

module.exports = ({core}) => {
    try {
        let projectPaths = [];
        function findProjectXmlFiles(dir) {
            const filesAndDirs = fs.readdirSync(dir, {withFileTypes: true});

            for (const item of filesAndDirs) {
                const fullPath = path.join(dir, item.name);
                if (item.isDirectory())
                    findProjectXmlFiles(fullPath);
                else if (item.isFile() && item.name === 'project.xml')
                    projectPaths.push(fullPath);
            }
        }

        const rootDir = "./demos/";

        findProjectXmlFiles(rootDir);

        core.setOutput('project-paths', projectPaths);
        console.log('project-paths:', projectPaths);
      } catch (error) {
        core.setFailed(error.message);
      }
}
