const srcContext = require.context('../src', true)
srcContext.keys().forEach(srcContext)

const context = require.context('./unit', true, /spec\.js$/);
context.keys().forEach(context);