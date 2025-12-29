import { NextResponse } from 'next/server';
import { PDFDocument } from 'pdf-lib';
import axios from 'axios';

export async function POST(request: Request) {
    try {
        const { images } = await request.json();

        if (!images || !Array.isArray(images)) {
            return NextResponse.json({ error: 'Invalid images' }, { status: 400 });
        }

        const pdfDoc = await PDFDocument.create();

        for (const imgUrl of images) {
            const imgBytes = await axios.get(imgUrl, { responseType: 'arraybuffer' }).then(res => res.data);
            let image;
            if (imgUrl.endsWith('.png')) {
                image = await pdfDoc.embedPng(imgBytes);
            } else {
                image = await pdfDoc.embedJpg(imgBytes);
            }

            const page = pdfDoc.addPage([image.width, image.height]);
            page.drawImage(image, {
                x: 0,
                y: 0,
                width: image.width,
                height: image.height,
            });
        }

        const pdfBytes = await pdfDoc.save();

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return new NextResponse(new Blob([pdfBytes as any]), {
            headers: {
                'Content-Type': 'application/pdf',
                'Content-Disposition': 'attachment; filename="carousel.pdf"',
            },
        });

    } catch (error: unknown) {
        console.error('PDF Generation Error:', error);
        return NextResponse.json({ error: 'Failed to generate PDF' }, { status: 500 });
    }
}
