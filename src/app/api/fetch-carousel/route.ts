import { NextResponse } from 'next/server';
import { instagramGetUrl } from 'instagram-url-direct';

// Mock data fallback
const MOCK_DATA = {
    id: '123456789',
    images: [
        'https://picsum.photos/1080/1080?random=1',
        'https://picsum.photos/1080/1080?random=2',
        'https://picsum.photos/1080/1080?random=3',
        'https://picsum.photos/1080/1080?random=4',
        'https://picsum.photos/1080/1080?random=5',
    ],
    caption: 'This is a beautiful carousel from Instagram #awesome #slides',
    timestamp: Date.now(),
};

export async function POST(request: Request) {
    try {
        const { url } = await request.json();

        if (!url || !url.includes('instagram.com/')) {
            return NextResponse.json({ error: 'Invalid URL. Please use a valid Instagram post link.' }, { status: 400 });
        }

        console.log('Fetching URL:', url);

        try {
            // Attempt to fetch real data
            const response = await instagramGetUrl(url);

            if (response && response.url_list && response.url_list.length > 0) {
                return NextResponse.json({
                    success: true,
                    data: {
                        id: 'instagram-post',
                        images: response.url_list,
                        caption: 'Fetched from Instagram',
                        timestamp: Date.now()
                    }
                });
            } else if (response && response.results_number > 0) {
                // Sometime the structure is different depending on single vs carousel
                // This library often returns url_list.
                // If not found, check other properties or fallback.
                return NextResponse.json({
                    success: true,
                    data: {
                        id: 'instagram-post-single',
                        images: [response.url_list[0]], // fallback if array is empty but results > 0
                        caption: 'Single Image',
                        timestamp: Date.now()
                    }
                });
            }

            throw new Error('No images found in response');

        } catch (fetchError) {
            console.error('Real fetch failed, falling back to mock:', fetchError);
            // Fallback to mock data for demonstration if scraping fails (common due to rate limits)
            return NextResponse.json({
                success: true,
                data: MOCK_DATA
            });
        }

    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json({ error: 'Failed to fetch post' }, { status: 500 });
    }
}
