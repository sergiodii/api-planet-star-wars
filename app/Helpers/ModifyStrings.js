// TODO melhorar usando NDF
class ModifyStrings {
  static generateSlug (text) {
    text = text.toLowerCase()
    text = text.replace(new RegExp('[ÁÀÂÃ]', 'gi'), 'a')
    text = text.replace(new RegExp('[ÉÈÊ]', 'gi'), 'e')
    text = text.replace(new RegExp('[ÍÌÎ]', 'gi'), 'i')
    text = text.replace(new RegExp('[ÓÒÔÕ]', 'gi'), 'o')
    text = text.replace(new RegExp('[ÚÙÛ]', 'gi'), 'u')
    text = text.replace(new RegExp('[Ç]', 'gi'), 'c')
    text = text.replace(/\s/g, '_')
    text = text.replace(/[%]20/g, '_')
    text = text.replace(/[+]/g, '_')
    return text
  }
  static removeQueryString (text) {
    text = text.replace(/[%]20/g, ' ')
    text = text.replace(/[+]/g, ' ')
    return text
  }
}
module.exports = ModifyStrings
