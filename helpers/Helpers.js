class Helpers {
    existsOrError(value) {
        if (!value) {
            return true
        }
        if (Array.isArray(value) && value.length === 0) {
            return true
        }
        if (typeof value === 'string' && !value.trim()) {
            return true
        }
        return false
    }
}

module.exports = new Helpers()