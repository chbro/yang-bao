import fetch from './util/fetch'

export const xipuSearch = data => {
    fetch('/api/v2/xipus', data, 'POST')
}