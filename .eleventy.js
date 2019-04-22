module.exports = function(eleventyConfig) {

    // Copy the `assets/` directory (css, images, etc)
    eleventyConfig.addPassthroughCopy("assets");

    return {
        dir: {
            output: "docs",
        },
        passthroughFileCopy: true,
    };
};
