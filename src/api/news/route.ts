
export async function fetchNews() {
    const response = await fetch('https://api.thenewsapi.com/v1/news/all?api_token=ob84IabAHk0oCIVGCYvJnhg9iPaRMLFHbA2nPk3h&language=en&search=crypto')

    if (!response.ok) {
        throw new Error('Network response was not ok')
    }
    const data = await response.json()
    return data
}