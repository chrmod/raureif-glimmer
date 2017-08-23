import MergeTrees from 'broccoli-merge-trees';
import Funnel from 'broccoli-funnel';
import writeFile from 'broccoli-file-creator';
import utils from 'ember-build-utilities';
import ResolutionMapBuilder from '@glimmer/resolution-map-builder';
import defaultResolverConfig from '@glimmer/application-pipeline/dist/lib/broccoli/default-module-configuration';

const GlimmerTemplatePrecompiler = utils.GlimmerTemplatePrecompiler;

export default {

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
};
