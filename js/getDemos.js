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
                else if (item.isFile() && item.name.match(/project.xml/i))
                    projectPaths.push(dir);
            
            }
        }

        const rootDir = "./demos/";

        findProjectXmlFiles(rootDir);

        projectPaths = projectPaths.map((dir) => {return dir.replace("demos/", "");});
        console.log(projectPaths);
        
        return projectPaths;
      } catch (error) {
        core.setFailed(error.message);
      }
}
