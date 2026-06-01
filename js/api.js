function searchFoodsFromApi(query) {
    if (!query || query.length < 2) {
        window.currentApiResults = [];
        renderFoodGrid();
        return;
    }

    const cached = ApiCache.get(query);
    if (cached) {
        window.currentApiResults = cached;
        renderFoodGrid();
        return;
    }

    const url = `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${encodeURIComponent(query)}&json=true&page_size=12&fields=product_name,nutriments,serving_size,categories`;

    fetch(url)
        .then((r) => r.json())
        .then((data) => {
            const products = data.products || [];
            const mapped = products
                .filter((p) => p.product_name && p.nutriments && p.nutriments['energy-kcal_100g'])
                .map((p) => ({
                    name: p.product_name,
                    calories: Math.round(p.nutriments['energy-kcal_100g']),
                    protein: p.nutriments.proteins_100g || 0,
                    carbs: p.nutriments.carbohydrates_100g || 0,
                    fat: p.nutriments.fat_100g || 0,
                    serving: p.serving_size || '100g',
                    category: 'api',
                    source: 'api'
                }))
                .slice(0, 10);

            window.currentApiResults = mapped;
            ApiCache.set(query, mapped);
            renderFoodGrid();
        })
        .catch(() => {
            window.currentApiResults = [];
            renderFoodGrid();
        });
}

window.API = {
    searchFoodsFromApi
};
