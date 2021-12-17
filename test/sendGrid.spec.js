import Email from '../src/Email'
import { expect } from 'chai'

describe('SendGrid tests', function () {
    it('should pass correct args to send grid', function () {
        const email = new Email({})
        expect(email.send).to.exist
    });

    it('should throw error if client is not passed to constructor', function () {
        let error

        try {
            new Email()
        } catch (ex) {
            error = ex
        } finally {
            expect(error).to.exist
            expect(error.message).to.equal("'Email Client' is required")
        }
    });
});