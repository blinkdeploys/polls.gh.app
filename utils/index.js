export const checkImageURL = (url) => {
    if(!url) { return false }
    else {
        const pattern  = new RegExp('https?:\\/\\/.+\\.(png|jgp|jpeg|bmp|gif|webp)$', 'i')
        return pattern.test(url)
    }
}