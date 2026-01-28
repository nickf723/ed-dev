module.exports = function (plop) {
  // GENERATOR: DOMAIN (e.g., "Biology", "Finance")
  plop.setGenerator('domain', {
    description: 'Create a new Knowledge Domain with Page, Store, and API',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'What is the domain name? (e.g., biology)',
      },
    ],
    actions: [
      // 1. Create the Page
      {
        type: 'add',
        path: 'app/{{kebabCase name}}/page.tsx',
        templateFile: 'templates/page.hbs',
      },
      // 2. Create the API Hook
      {
        type: 'add',
        path: 'lib/api/{{kebabCase name}}.ts',
        templateFile: 'templates/api.hbs',
      },
      // 3. Create the Store Slice
      {
        type: 'add',
        path: 'lib/store/{{kebabCase name}}.ts',
        templateFile: 'templates/store.hbs',
      },
      // 4. Message to User
      {
        type: 'append',
        path: 'lib/navigation.ts',
        pattern: /items: \[/,
        template: '      { label: "{{titleCase name}}", href: "/{{kebabCase name}}", icon: Box, domain: "primary" },',
      }
    ],
  });
};