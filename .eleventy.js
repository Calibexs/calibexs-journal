module.exports = function(eleventyConfig) {
  eleventyConfig.addFilter("readableDate", function(date) {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: "UTC"
    });
  });

  eleventyConfig.addFilter("isoDate", function(date) {
    return new Date(date).toISOString();
  });

  eleventyConfig.addFilter("json", function(value) {
    return JSON.stringify(value);
  });

  return {
    dir: {
      input: "src",
      includes: "_includes",
      output: "/var/www/calibexs/journal"
    }
  };
};
