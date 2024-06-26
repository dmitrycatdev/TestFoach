module.exports = {
    root:    true,
    parser:  "@typescript-eslint/parser",
    extends: [
        "prettier",
        "eslint-config-prettier",
        "eslint:recommended",
        "plugin:@typescript-eslint/eslint-recommended",
        "plugin:@typescript-eslint/recommended",
    ],
    rules: {
        "@typescript-eslint/ban-ts-comment":        "off",
        "@typescript-eslint/no-unused-expressions": "warn",
        "@typescript-eslint/no-unused-vars":        ["warn"],
        "no-undef":                                 "off",
        "no-self-compare":                          "error",
        "require-await":                            "warn",
        "no-fallthrough":                           "error",
        "no-nested-ternary":                        "warn",
        "prefer-regex-literals":                    "warn",
        "prefer-const":                             "warn",
        "object-curly-spacing":                     ["warn", "always"],
        "prefer-template":                          "warn",
        "template-curly-spacing":                   ["warn", "never"],
        "keyword-spacing":                          ["warn", { before: true, after: true }],
        "space-infix-ops":                          "warn",
        "space-before-blocks":                      "warn",
        "space-in-parens":                          "warn",
        "no-multi-spaces":                          ["warn", {
            exceptions: {
                TSTypeAnnotation: true,
                Property:         true,
                Program:          true,
            },
        }],
        "no-spaced-func":                   "warn",
        "quote-props":                      ["warn", "as-needed"],
        "brace-style":                      "warn",
        "prefer-arrow-callback":            "warn",
        "no-unneeded-ternary":              "warn",
        "nonblock-statement-body-position": ["warn", "beside", { overrides: { while: "below" } }],

        "no-var":                   "warn",
        "no-multiple-empty-lines":  ["warn", { max: 2 }],
        "key-spacing":              ["warn", { align: "value" }],
        indent:                     ["warn", 4, { ignoreComments: true }],
        "linebreak-style":          ["warn", "unix"],
        quotes:                     ["warn", "double", { avoidEscape: true }],
        semi:                       ["warn", "always"],
        "no-mixed-spaces-and-tabs": ["warn", "smart-tabs"],
        "comma-dangle":             ["warn", "always-multiline"],
    },
};
