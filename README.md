# @pyncz/template.ts-lib

A template for creating TypeScript NPM packages.

In order to set up production package:
- Set actual `name` and `repository` in the `package.json`
- If you need, you may update `description`, `keywords`, `exports` and other fields in the `package.json` as well
- Test the build running `pnpm run build` command
  > **Warning** You may need to add external libs you use in your sources in the `externals` section of the `build.config.ts`
- Specify `branches` in the `.github/workflows/release.yml` release workflow
- Push the code into the specified branch
  > **Note** You can run `npm publish --dry-run` to check the log and debug what files are going to be included in the published package

> **Note**
> Don't forget to use [*semantic commit messages*](https://github.com/semantic-release/semantic-release/blob/master/README.md#commit-message-format) since the release version (and the fact if the release itself is needed) is determined on base of the added commits' names.
