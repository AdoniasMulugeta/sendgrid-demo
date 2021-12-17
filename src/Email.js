import isEmail from 'isemail'

/**
 * This will be an interface for different email clients
 * The constructor will take an email client object that has the actual logic
 */
class Email {
    constructor(emailClient) {
        if (!emailClient) throw new Error("'Email Client' is required")
        this.client = emailClient
    }

    async send({ to, from, subject, text }) {
        if (!to) throw new Error("'to' is required")
        if (!isEmail.validate(to)) throw new Error("'to' must be a valid email")
        if (!from) throw new Error("'from' is required")
        if (!isEmail.validate(from)) throw new Error("'from' must be a valid email")
        if (!subject) throw new Error("'subject' is required")
        if (!text) throw new Error("'text' is required")

        try {
            return this.client.send({ to, from, subject, text })
        } catch (error) {
            // handle error here
            console.log(error)
        }
    }
}

export default Email