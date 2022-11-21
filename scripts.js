const shell = require('shelljs');

const googleApplicationCredentialsPath = shell.exec(`gcloud info "--format=value(config.paths.global_config_dir)"`, { silent: true }).stdout.trim() + '/legacy_credentials/empathicqubit@entan.gl/adc.json';
process.env.GOOGLE_APPLICATION_CREDENTIALS = process.env.GOOGLE_APPLICATION_CREDENTIALS ?? googleApplicationCredentialsPath;

getStaticBucketPath = () => {
    process.env.STATIC_BUCKET_PATH = shell.exec('npm-run-all --silent tf:static_bucket_path', { silent: true }).stdout.trim();
};

const scripts = {
    build: {
        frontend: () => {
            shell.config.fatal = true;
            shell.cd('app/hugo');
            shell.exec('pnpm install');
            shell.exec('npm-run-all build');
            shell.rm('-rf', '../../artifacts/hugo');
            shell.cp('-r', './public/', '../../artifacts/hugo/');
        },
    },
    hugo: {
        drafts: () => {
            shell.config.fatal = true;
            shell.exec('cd app/hugo && npm-run-all drafts');
        },
    },
    deploy: {
        index: () => {
            shell.config.fatal = true;
            shell.exec(`npm-run-all gitmodules tf build && npm-run-all --parallel deploy:*`);
        },
        static_bucket: () => {
            shell.mkdir('app/bucket-files');
            shell.config.fatal = true;
            const gs = shell.exec('npm-run-all --silent tf:static_bucket_gs').stdout.trim();
            shell.exec(`gsutil -m rsync -r app/bucket-files "${gs}"`);
            shell.exec(`gsutil -m rsync -r "${gs}" app/bucket-files`);
        },
        frontend: () => {
            shell.config.fatal = true;
            const project_id = shell.exec('npm-run-all --silent tf:project_id').stdout.trim();
            console.log(process.env.GOOGLE_APPLICATION_CREDENTIALS);
            shell.exec(`firebase deploy --account terraform@terraform-admin-239402.iam.gserviceaccount.com --non-interactive --only hosting --project ${project_id}`);
        },
    },
    tf: {
        project_id: () => {
            shell.config.fatal = true;
            shell.cd('infrastructure');
            shell.exec('terraform output -raw project_id');
        },
        static_bucket_path: () => {
            shell.config.fatal = true;
            shell.cd('infrastructure');
            shell.exec('terraform output -raw static_bucket_path');
        },
        static_bucket_gs: () => {
            shell.config.fatal = true;
            shell.cd('infrastructure');
            shell.exec('terraform output -raw static_bucket_gs');
        },
    },
};

const path = process.argv[2].split(/:/g);

let current = scripts;
path.forEach(p => {
    current = current[p];
});

if(!(path[0] == 'tf' && path[1] == 'static_bucket_path')) {
    getStaticBucketPath();
}

current();