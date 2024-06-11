export const getDate = (n) => {
    if (n) {
        n = new Date(n)
    }
    else {
        n = new Date()
    }
    return n.toLocaleDateString().replace(/\//g, "-") + " " + n.toTimeString().substr(0, 8)
}
