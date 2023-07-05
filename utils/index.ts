const url = 'https://cars-by-api-ninjas.p.rapidapi.com/v1/cars?model=corolla';
const headers = {
    'X-RapidAPI-Key': process.env.RAPIDAPIKEY as string,
    'X-RapidAPI-Host': process.env.RAPIDAPIHOST as string
};


export async function fetchCars() {
    const response = await fetch(url, { headers });
    const result = await response.json();
    return result
}