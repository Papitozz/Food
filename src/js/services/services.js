const post = async(url, data) => {
    const res = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: data
    })

    return await res.json()
}

const getCards = async () => {
    const url = '../db.json'
    const res = await fetch(url)
    if (!res.ok) {
        throw new Error(`could not fetch ${res}, status: ${res.status}`)
    }
    return await res.json()
}

export {post, getCards};