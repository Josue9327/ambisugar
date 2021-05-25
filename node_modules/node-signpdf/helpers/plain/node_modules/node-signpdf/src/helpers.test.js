import fs from 'fs';
import signer from './signpdf';
import {extractSignature} from './helpers';
import SignPdfError from './SignPdfError';

describe('Helpers', () => {
    const resources = `${__dirname}/../../resources`;

    it('extract signature from signed pdf', async () => {
        const pdfBuffer = fs.readFileSync(`${resources}/generated/with-defaults.pdf`);
        const p12Buffer = fs.readFileSync(`${resources}/certificate.p12`);

        const signedPdfBuffer = signer.sign(pdfBuffer, p12Buffer);
        const originalSignature = signer.lastSignature;

        const {signature} = extractSignature(signedPdfBuffer);
        expect(Buffer.from(signature, 'binary').toString('hex')).toBe(originalSignature);
    });

    it('expects PDF to contain a ByteRange placeholder', () => {
        try {
            extractSignature(Buffer.from('No BR placeholder'));
            expect('here').not.toBe('here');
        } catch (e) {
            expect(e instanceof SignPdfError).toBe(true);
            expect(e.type).toBe(SignPdfError.TYPE_PARSE);
        }
    });

    it('expects PDF to contain a byteRangeEnd', () => {
        try {
            extractSignature(Buffer.from('/ByteRange [   No End'));
            expect('here').not.toBe('here');
        } catch (e) {
            expect(e instanceof SignPdfError).toBe(true);
            expect(e.type).toBe(SignPdfError.TYPE_PARSE);
        }
    });
});
