{
  ("prettier/prettier");
  [
    "error",
    {
      singleQuote: true,
      parser: "flow",
      //usePrettierrc: false,
      //Добавленные параметры
      semi: true,
      printWidth: 80,
      endOfLine: "auto",
      tabwidth: 4,
    },
  ];
  module.exports = {
    //trailingComma: "all",
    bracketSpacing: true,
  };
}
