import { NextResponse } from 'next/server';
import { instagramGetUrl } from 'instagram-url-direct';

export async function POST(request: Request) {
    try {
        const { url } = await request.json();

        // Normalize URL: trim and lowercase for checking
        const normalizedInput = url ? url.trim() : '';
        const lowerUrl = normalizedInput.toLowerCase();

        // Check for instagram.com or instagr.am
        if (!lowerUrl.includes('instagram.com/') && !lowerUrl.includes('instagr.am/')) {
            return NextResponse.json({ error: 'Invalid URL. Please use a valid Instagram post link.' }, { status: 400 });
        }

        console.log('Fetching URL:', normalizedInput);

        // Replace instagr.am with instagram.com for the library if needed
        // Use regex for case-insensitive replacement of the domain
        let targetUrl = normalizedInput.replace(/instagr\.am/i, 'instagram.com');

        try {
            // Attempt to fetch real data with retry logic
            let response;
            let attempts = 0;
            const maxAttempts = 3;

            while (attempts < maxAttempts) {
                try {
                    response = await instagramGetUrl(targetUrl);
                    if (response && (response.url_list?.length > 0 || response.results_number > 0)) {
                        break; // Success
                    }
                } catch (e) {
                    console.warn(`Attempt ${attempts + 1} failed:`, e);
                }
                attempts++;
                if (attempts < maxAttempts) {
                    await new Promise(resolve => setTimeout(resolve, 1000)); // Wait 1s between retries
                }
            }

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
            console.error('Fetch failed:', fetchError);
            // Return actual error instead of mock data
            return NextResponse.json({
                error: 'Failed to fetch content from Instagram. The link might be private, invalid, or the service is temporarily unavailable.'
            }, { status: 400 });
        }

    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json({ error: 'Failed to fetch post' }, { status: 500 });
    }
}
