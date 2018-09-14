
function getFilmTags(arrs) {
  console.log(arrs)
  let tags = ''
  if (arrs.length > 0) {
    for (var i of arrs) {
      tags = tags + arrs[i]
      if (i != arrs.length - 1) {
        tags = tags + "/"
      }
    }
  }
  return tags
}

module.exports = { getFilmTags }