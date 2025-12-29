import { NextResponse } from 'next/server';
import JSZip from 'jszip';
import axios from 'axios';

export async function POST(request: Request) {
    try {
        const { images } = await request.json();

        if (!images || !Array.isArray(images)) {
            return NextResponse.json({ error: 'Invalid images' }, { status: 400 });
        }

        const zip = new JSZip();
        const folder = zip.folder("carousel-images");

        // Download each image and add to zip
        const promises = images.map(async (imgUrl, index) => {
            try {
                const response = await axios.get(imgUrl, { responseType: 'arraybuffer' });
                const extension = imgUrl.includes('.png') ? 'png' : 'jpg';
                const filename = `slide-${index + 1}.${extension}`;

                folder?.file(filename, response.data);
            } catch (err) {
                console.error(`Failed to download image ${imgUrl}`, err);
            }
        });

        await Promise.all(promises);

        const zipContent = await zip.generateAsync({ type: 'uint8array' });

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return new NextResponse(new Blob([zipContent as any]), {
            headers: {
                'Content-Type': 'application/zip',
                'Content-Disposition': 'attachment; filename="carousel_images.zip"',
            },
        });

    } catch (error: unknown) {
        console.error('PNG/ZIP Export Error:', error);
        return NextResponse.json({ error: 'Failed to generate ZIP' }, { status: 500 });
    }
}
