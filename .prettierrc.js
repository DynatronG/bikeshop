{
        ("prettier/prettier");
        [
                "error",
                {
                        // singleQuote: true,
                        parser: "babel",
                        // usePrettierrc: false,
                        //Добавленные параметры
                        semi: false,
                        endOfLine: "auto",
                        //       tabwidth: 4,
                },
        ];
        module.exports = {
                // trailingComma: "none",
                tabWidth: 8,
                usetabs: false,
                bracketSpacing: true,
                jsxSingleQuotes: true,
                arrowParents: "avoid",
                printWidth: 100,
                //     usePrettierrc: false,
                // singleQuote: true,
        };
}
