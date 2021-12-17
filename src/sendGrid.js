import sendGridMail from '@sendgrid/mail'

function send(data) {
    sendGridMail.setApiKey(process.env.SEND_GRID_API)
    // client specific logic can be placed here
    const html = `<strong>${data.text}</strong>`
    try {
        return sendGridMail.send({ ...data, html })
    } catch (error) {
        // proper logging can be put here
        // converting error into standardized custom errors here
        console.log(error)
    }

}

export { send }