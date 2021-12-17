import Email from '../src/Email'
import { expect } from 'chai'
import sinon from 'sinon'

describe('Email tests', function () {
    it('should define expected methods', function () {
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

    it('should call emailClient', async function () {
        const sendStub = sinon.stub()
        const email = new Email({ send: sendStub })
        await email.send({ to: 'to@email.com', from: 'from@email.com', subject: 'test', text: 'Hi' })

        expect(sendStub.calledOnce).to.be.true
    });

    it('should validate input', async function () {
        let error
        const email = new Email({ send: sinon.stub() })
        try {
            await email.send({ to: '', from: 'from@email.com', subject: 'test', text: 'Hi' })
        } catch (ex) {
            error = ex
        } finally {
            expect(error).to.exist
            expect(error.message).to.equal("'to' is required")
        }
    });

    it('should validate email', async function () {
        let error
        const email = new Email({ send: sinon.stub() })
        try {
            await email.send({ to: 'to', from: 'from@email.com', subject: 'test', text: 'Hi' })
        } catch (ex) {
            error = ex
        } finally {
            expect(error).to.exist
            expect(error.message).to.equal("'to' must be a valid email")
        }
    });
});