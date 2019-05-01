const shell = require('shelljs');

const scripts = {
    build: {
        frontend: () => {
            process.env.STATIC_BUCKET_PATH = shell.exec('npm-run-all --silent tf:static_bucket_path').stdout.trim();
            console.log("STATIC_BUCKET_PATH", process.env.STATIC_BUCKET_PATH);
            shell.config.fatal = true;
            shell.cd('app/hugo');
            shell.exec('yarn install && npm-run-all build');
            shell.rm('-rf', '../../artifacts/hugo');
            shell.cp('-r', './public/', '../../artifacts/hugo/');
        },
    },
    deploy: {
        static_bucket: () => {
            shell.mkdir('app/bucket-files');
            shell.config.fatal = true;
            const gs = shell.exec('npm-run-all --silent tf:static_bucket_gs').stdout;
            shell.exec(`gsutil -m rsync app/bucket-files "${gs}"`);
            shell.exec(`gsutil -m rsync "${gs}" app/bucket-files`);
        },
        frontend: () => {
            shell.config.fatal = true;
            const project_id = shell.exec('npm-run-all --silent tf:project_id').stdout;
            shell.exec(`firebase deploy --only hosting --project ${project_id}`);
        },
    },
};

const path = process.argv[2].split(/:/g);

let current = scripts;
path.forEach(p => {
    current = current[p];
});

current();
