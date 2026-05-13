module.exports = function(eleventyConfig) {
  eleventyConfig.addFilter("readableDate", function(date) {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  });

  return {
    dir: {
      input: "src",
      includes: "_includes",
      output: "/var/www/calibexs/journal"
    }
  };
};
