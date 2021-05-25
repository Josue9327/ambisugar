import forge from 'node-forge';
import fs from 'fs';
import signer from './signpdf';
import {extractSignature} from './helpers';
import SignPdfError from './SignPdfError';

describe('Test signing', () => {
    const resources = `${__dirname}/../../resources`;

    it('expects PDF to be Buffer', () => {
        try {
            signer.sign('non-buffer', Buffer.from(''));
            expect('here').not.toBe('here');
        } catch (e) {
            expect(e instanceof SignPdfError).toBe(true);
            expect(e.type).toBe(SignPdfError.TYPE_INPUT);
            expect(e.message).toMatchSnapshot();
        }
    });
    it('expects P12 certificate to be Buffer', () => {
        try {
            signer.sign(Buffer.from(''), 'non-buffer');
            expect('here').not.toBe('here');
        } catch (e) {
            expect(e instanceof SignPdfError).toBe(true);
            expect(e.type).toBe(SignPdfError.TYPE_INPUT);
            expect(e.message).toMatchSnapshot();
        }
    });
    it('expects PDF to contain a ByteRange placeholder', () => {
        try {
            signer.sign(Buffer.from('No BR placeholder\n%%EOF'), Buffer.from(''));
            expect('here').not.toBe('here');
        } catch (e) {
            expect(e instanceof SignPdfError).toBe(true);
            expect(e.type).toBe(SignPdfError.TYPE_PARSE);
            expect(e.message).toMatchSnapshot();
        }
    });
    it('expects a reasonably sized placeholder', async () => {
        try {
            const pdfBuffer = fs.readFileSync(`${resources}/generated/too-small-placeholder.pdf`);
            const p12Buffer = fs.readFileSync(`${resources}/certificate.p12`);

            signer.sign(pdfBuffer, p12Buffer);
            expect('here').not.toBe('here');
        } catch (e) {
            expect(e instanceof SignPdfError).toBe(true);
            expect(e.type).toBe(SignPdfError.TYPE_INPUT);
            expect(e.message).toMatchSnapshot();
        }
    });
    it('signs input PDF', async () => {
        let pdfBuffer = fs.readFileSync(`${resources}/generated/with-defaults.pdf`);
        const p12Buffer = fs.readFileSync(`${resources}/certificate.p12`);

        pdfBuffer = signer.sign(pdfBuffer, p12Buffer);
        expect(pdfBuffer instanceof Buffer).toBe(true);

        const {signature, signedData} = extractSignature(pdfBuffer);
        expect(typeof signature === 'string').toBe(true);
        expect(signedData instanceof Buffer).toBe(true);
    });
    it('signs detached', async () => {
        const p12Buffer = fs.readFileSync(`${resources}/certificate.p12`);

        let pdfBuffer = fs.readFileSync(`${resources}/generated/with-defaults.pdf`);
        signer.sign(pdfBuffer, p12Buffer);
        const signature1 = signer.lastSignature;

        pdfBuffer = fs.readFileSync(`${resources}/generated/with-changed-text.pdf`);
        signer.sign(pdfBuffer, p12Buffer);
        const signature2 = signer.lastSignature;

        expect(signature1).not.toBe(signature2);
        expect(signature1).toHaveLength(signature2.length);
    });
    it('signs with ca, intermediate and multiple certificates bundle', async () => {
        let pdfBuffer = fs.readFileSync(`${resources}/generated/with-defaults.pdf`);
        const p12Buffer = fs.readFileSync(`${resources}/bundle.p12`);

        pdfBuffer = signer.sign(pdfBuffer, p12Buffer);
        expect(pdfBuffer instanceof Buffer).toBe(true);

        const {signature, signedData} = extractSignature(pdfBuffer);
        expect(typeof signature === 'string').toBe(true);
        expect(signedData instanceof Buffer).toBe(true);
    });
    it('signs with passphrased certificate', async () => {
        let pdfBuffer = fs.readFileSync(`${resources}/generated/with-defaults.pdf`);
        const p12Buffer = fs.readFileSync(`${resources}/withpass.p12`);

        pdfBuffer = signer.sign(
            pdfBuffer,
            p12Buffer,
            {passphrase: 'node-signpdf'},
        );
        expect(pdfBuffer instanceof Buffer).toBe(true);

        const {signature, signedData} = extractSignature(pdfBuffer);
        expect(typeof signature === 'string').toBe(true);
        expect(signedData instanceof Buffer).toBe(true);
    });
    it('errors on wrong certificate passphrase', async () => {
        const pdfBuffer = fs.readFileSync(`${resources}/generated/with-defaults.pdf`);
        const p12Buffer = fs.readFileSync(`${resources}/withpass.p12`);

        try {
            signer.sign(
                pdfBuffer,
                p12Buffer,
                {passphrase: 'Wrong passphrase'},
            );
            expect('here').not.toBe('here');
        } catch (e) {
            expect(e instanceof Error).toBe(true);
            expect(e.message).toMatchSnapshot();
        }
    });
    it('errors when no matching certificate is found in bags', async () => {
        const pdfBuffer = fs.readFileSync(`${resources}/generated/with-defaults.pdf`);
        const p12Buffer = fs.readFileSync(`${resources}/bundle.p12`);

        // Monkey-patch pkcs12 to return no matching certificates although bundle.p12 is correct.
        const originalPkcs12FromAsn1 = forge.pkcs12.pkcs12FromAsn1;
        let p12Instance;
        forge.pkcs12.pkcs12FromAsn1 = (...params) => {
            // This instance will be used for all non-mocked code.
            p12Instance = originalPkcs12FromAsn1(...params);

            return {
                ...p12Instance,
                getBags: ({bagType}) => {
                    if (bagType === forge.pki.oids.certBag) {
                        // Only mock this case.
                        // Make sure there will be no matching certificate.
                        return {
                            [forge.pki.oids.certBag]: [],
                        };
                    }
                    return p12Instance.getBags({bagType});
                },
            };
        };

        try {
            signer.sign(
                pdfBuffer,
                p12Buffer,
            );
            expect('here').not.toBe('here');
        } catch (e) {
            expect(e instanceof SignPdfError).toBe(true);
            expect(e.type).toBe(SignPdfError.TYPE_INPUT);
            expect(e.message).toMatchSnapshot();
        } finally {
            forge.pkcs12.pkcs12FromAsn1 = originalPkcs12FromAsn1;
        }
    });
});
