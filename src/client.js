const sanityClient = require('@sanity/client')
const client = sanityClient({
    projectId: 'wv9ijjbk',
    dataset: 'production',
    apiVersion: '2021-03-25',
    useCdn: true
})
export default client
