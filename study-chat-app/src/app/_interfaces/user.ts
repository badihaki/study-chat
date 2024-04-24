export default interface User {
    _id: string,
    username: string,
    email: string,
    password: string,
    savedMessages: {
        content: string,
        keywords: [string],
    }[]
}
