# pcf-react

A PowerApps Component Framework React starter kit

**PCF Installation**

[Get tooling for Power Apps component framework](https://docs.microsoft.com/en-us/powerapps/developer/component-framework/get-powerapps-cli)

**Project creation steps**

1. md ProjectName & cd ProjectName
2. pac pcf init --namespace <> --name <> --template <field or dataset>
3. npm i & npm run build
4. edit tsconfig.json
   - add **"noImplicitAny": false** to compilerOptions
5. install npms
   - npm i @types/node @types/jest @types/powerapps-component-framework @uifabric/icons @fluentui/react react react-dom
   - npm i -D @babel/core @babel/preset-env @babel/preset-react @storybook/addon-actions @storybook/addon-jest @storybook/addon-storyshots @storybook/react @typescript-eslint/eslint-plugin @typescript-eslint/parser babel-eslint babel-jest babel-loader babel-plugin-add-module-exports babel-plugin-require-context-hook eslint eslint-config-airbnb eslint-config-prettier eslint-plugin-import eslint-plugin-jsx-a11y eslint-plugin-prettier eslint-plugin-react eslint-plugin-react-hooks jest jsdoc prettier react-test-renderer
6. copy .eslintrc.json, .gitignore, .prettierrc.json, babel.config.js, jest.config.js and jsdoc.json
7. copy the .jest & .storybook configuration folders
8. copy test/storyShots.test.js to your test folder
9. copy stories/jest.stories.js to your stories folder
10. Copy the scripts section of package.json

**Project deploy file creation steps**

1. md deploy & cd deploy (in ProjectName folder)
2. pac solution init --publisher-name <> --publisher-prefix <>
3. pac solution add-reference --path ..\
4. edit deploy\Other\Solution.xml and replace "deploy"
   - UniqueName
   - LocalizedName description="" languagecode="1033"
5. msbuild /t:build /restore /p:configuration=Release

**Architectural notes**

This project views the index.ts as a "wrapper". It only hosts the actual SamplePCF and passes the parameters as props. For more complicated controls, I would recommend using the redux toolkit and expose the appropriate actions. If you are using actions then there is no need to do the ReactDOM.render in updateView. You may however need to consider when setDisabled or setVisible is called on the control. You can get these values from the context object.

- context.mode.isControlDisabled
- context.mode.isVisible

**Stores**

- [XState](https://xstate.js.org/docs/) - JavaScript and TypeScript finite state machines and statecharts for the modern web.
- [Redux Toolkit](https://redux-toolkit.js.org/) - The official, opinionated, batteries-included toolset for efficient Redux development
- [MobX](https://mobx.js.org/README.html) - Simple, scalable state management

**Web Workers**

It is actually very simple to add web workers into pcf. You can use the example in [Google Webworker Plugin](https://github.com/GoogleChromeLabs/worker-plugin) to test this feature.

1. npm i -D worker-plugin
2. edit webpackConfig.js in node_modules\pcf-scripts
   - add at line 2 **const WorkerPlugin = require('worker-plugin');**
   - add at line 76 **plugins: [new WorkerPlugin()]**

**Core Packages**

- [Fluent UI](https://github.com/microsoft/fluentui)
- [Fabric Icons](https://uifabricicons.azurewebsites.net/)

**Design, Documentation, Type Checking & Lint**

- [Storybook](https://storybook.js.org/)
  - [Learn Storybook](https://www.learnstorybook.com/)
  - [React & Storybook for a Component-Driven, Atomic Designed, 💯 Tested, Accessible Frontend](https://www.youtube.com/watch?v=vWYiyN9amsc)
- [JSDoc](https://jsdoc.app/)
- [ESLint](https://eslint.org)/[Prettier](https://prettier.io)
  - [Integrating with Linters](https://prettier.io/docs/en/integrating-with-linters.html)

**Testing**

- [Jest](https://jestjs.io)

**References**

- [Power Apps component framework API reference](https://docs.microsoft.com/en-us/powerapps/developer/component-framework/reference/)
- [Use of React and Office UI Fabric React in the PowerApps component framework is now available for public preview](https://powerapps.microsoft.com/en-us/blog/use-of-react-and-office-ui-fabric-react-in-the-powerapps-component-framework-is-now-available-for-public-preview)
- [Create and build a code component](https://docs.microsoft.com/en-us/powerapps/developer/component-framework/create-custom-controls-using-pcf)
- [Package a code component](https://docs.microsoft.com/en-us/powerapps/developer/component-framework/import-custom-controls)
- [Develop your custom controls using Power Apps Component framework and use it on your CRM interface.](https://debajmecrm.com/2019/04/26/in-depth-end-end-walkthrough-develop-your-custom-controls-using-power-apps-component-framework-and-use-it-on-your-crm-interface/)
- [Create Custom Controls using PowerApp Component Framework](https://powermaverick.dev/2019/05/18/create-custom-controls-using-powerapp-component-framework/)
- [Create a React component library with TypeScript and Storybook](https://levelup.gitconnected.com/create-a-react-component-library-with-typescript-and-storybook-ed28fc7511f2)
- [5 Ways to Document React Components in 2020](https://blog.bitsrc.io/5-ways-to-document-react-components-in-2020-ecf60f24dee8)
- [Comparing React testing libraries](https://blog.logrocket.com/comparing-react-testing-libraries)
- [Static vs Unit vs Integration vs E2E Testing for Frontend Apps](https://kentcdodds.com/blog/unit-vs-integration-vs-e2e-tests)
- [5 Tips to Improve the Performance of Your React Apps](https://alligator.io/react/keep-react-fast/)
