var supported_platforms = ["darwin"];

module.exports = {
  main:"https://www.youtube.com/watch?v=4m1EFMoRFvY",
  profit:"https://www.youtube.com/watch?v=DLhIoSvqpYQ",
  "platform_supported": platform_supported(supported_platforms),
  "fudge_factor":4000
}

function platform_supported(platforms) {
  return platforms.indexOf(process.platform) > -1
}
