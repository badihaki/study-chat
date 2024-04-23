export default interface User {
    username: String,
    email: String,
    password: String,
    savedMessages: {
        content: String,
        keywords: [String],
    }[]
}
