# entan.gl
This project is to deploy my personal website. It probably will be extremely painful for you to deploy yourself because of all the tweaks you'd need to make.

## Deployment steps
Any files you'd like to deploy to GCS should go into `/app/bucket-files`. This is primarily for large files that would be expensive to hold in Firebase. The files can then be referenced by importing `__GCS__/<file>` in the app.

Your billing account display name must match the DNS name, and you must create an organization for that domain as well. The deployment account should be able to view billing accounts, assign billing accounts, and set up projects in that organization.

There are a lot of manual DNS entries in the Terraform. I have not come up with a good solution to automate the retrieval of these values yet.

In the root folder:

```sh
yarn install
yarn deploy
```
