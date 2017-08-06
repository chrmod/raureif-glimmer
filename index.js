const MergeTrees = require('broccoli-merge-trees');
const Funnel = require('broccoli-funnel');
const writeFile = require('broccoli-file-creator');
const utils = require('ember-build-utilities');
const ResolutionMapBuilder = require('@glimmer/resolution-map-builder');
const defaultResolverConfig = require('@glimmer/application-pipeline/dist/lib/broccoli/default-module-configuration');

const GlimmerTemplatePrecompiler = utils.GlimmerTemplatePrecompiler;

module.exports = {

  build: function (inputTree, project) {
    const name = project.name;
    const resolverConfiguration = Object.assign({}, defaultResolverConfig.default, {
      app: {
        name: name,
        rootName: name,
      },
    });

    const templatesTree = new GlimmerTemplatePrecompiler(inputTree, {
      rootName: name,
    });
    const moduleMapContent = ResolutionMapBuilder.buildResolutionMapSource({
      projectDir: inputTree._directoryPath,
      srcDir: 'glimmer',
      modulePrefix: name,
      moduleConfig: resolverConfiguration,
    });

    const output = new MergeTrees([
      inputTree,
      templatesTree,
      writeFile('glimmer-config/resolver-configuration.ts',
        'export default ' + JSON.stringify(resolverConfiguration)
      ),
      writeFile('glimmer-config/module-map.ts', moduleMapContent),
    ], { overwrite: true });

    return new Funnel(output, {
      exclude: ['**/*.hbs'],
    });
  }
}
