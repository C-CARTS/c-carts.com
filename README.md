# Next.JS Typescript Template

Typescript template for a basic Next.JS project. This template is mostly unchanged from the project created with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app) with the following additions:

- Adds eslint config and plugins for airbnb.
- Adds husky pre-commit hook for linting.
- Adds Workbox configuration to generate a service worker.
- Adds recoil support.
- Adds and configures Google Analytics.
- Adds .editorconfig and .prettierrc configs
- Sets up VSCode to format on save and lint.
- Adds Dockerfile.

## NPM

This project uses a custom NPM repo with Azure Dev Ops. Follow these steps to authenticate:

If you don't already have it installed. Run the following to install the vsts npm auth tool:

```powershell
npm install -g vsts-npm-auth
```

```powershell
vsts-npm-auth -config .npmrc -force -E 525600
```

No force flag is used -force

```powershell
vsts-npm-auth -config .npmrc
```

To get a new token for a NPM_RC env variable (used for deployment pipelines) run:

```powershell
vsts-npm-auth -C .\.npmrc -T temp.npmrc -E 525600 -F
```
