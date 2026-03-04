// Serverless function untuk mengambil jadwal sholat secara aman (Proxy)
exports.handler = async function(event, context) {
    // Mengambil parameter latitude dan longitude dari URL
    const { lat, lng } = event.queryStringParameters || {};

    if (!lat || !lng) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: "Latitude dan Longitude wajib disertakan!" })
        };
    }

    try {
        const timestamp = Math.floor(Date.now() / 1000);
        const apiUrl = `https://api.aladhan.com/v1/timings/${timestamp}?latitude=${lat}&longitude=${lng}&method=11`;
        
        // Memanggil API eksternal
        const response = await fetch(apiUrl);
        const data = await response.json();

        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*", // Mencegah error CORS
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Gagal mengambil data dari server API." })
        };
    }
};
