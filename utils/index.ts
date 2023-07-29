import { CarProps, FilterProps } from "@/types";

const headers = {
    'X-RapidAPI-Key': process.env.RAPIDAPIKEY as string,
    'X-RapidAPI-Host': process.env.RAPIDAPIHOST as string
};


/**
 * The function fetchCars fetches car data from an API based on the provided filters.
 * @param {FilterProps} filters - The `filters` parameter is an object that contains the following
 * properties:
 * @returns the result of the API call, which is a Promise that resolves to the response data from the
 * API.
 */
export async function fetchCars(filters: FilterProps) {

    const { manufacturer, year, model, limit, fuel } = filters;
    const url = `https://cars-by-api-ninjas.p.rapidapi.com/v1/cars?model=corolla?make=${manufacturer}&year=${year}&model=${model}&limit=${limit}&fuel_type=${fuel}`;

    const response = await fetch(url, { headers });
    const result = await response.json();
    return result
}

/**
 * The function calculates the rental rate per day for a car based on its city MPG and year of
 * manufacture.
 * @param {number} city_mpg - The city_mpg parameter represents the fuel efficiency of the car in miles
 * per gallon (mpg) when driving in city conditions.
 * @param {number} year - The year parameter represents the year of the vehicle.
 * @returns the total rental rate per day as a string with no decimal places.
 */
export const calculateCarRent = (city_mpg: number, year: number) => {
    const basePricePerDay = 50; // Base rental price per day in dollars
    const mileageFactor = 0.1; // Additional rate per mile driven
    const ageFactor = 0.05; // Additional rate per year of vehicle age

    // Calculate additional rate based on mileage and age
    const mileageRate = city_mpg * mileageFactor;
    const ageRate = (new Date().getFullYear() - year) * ageFactor;

    // Calculate total rental rate per day
    const rentalRatePerDay = basePricePerDay + mileageRate + ageRate;

    return rentalRatePerDay.toFixed(0);
};

export const updateSearchParams = (type: string, value: string) => {
    // Get the current URL search params
    const searchParams = new URLSearchParams(window.location.search);

    // Set the specified search parameter to the given value
    searchParams.set(type, value);

    // Set the specified search parameter to the given value
    const newPathname = `${window.location.pathname}?${searchParams.toString()}`;

    return newPathname;
};

/**
 * The function `generateCarImageUrl` generates a URL for a car image based on the car's make, year,
 * model, and optional angle.
 * @param {CarProps} car - The `car` parameter is an object that represents the car. It has the
 * following properties:
 * @param {string} [angle] - The `angle` parameter is an optional parameter that specifies the angle at
 * which the car image should be generated. It is a string value that represents the angle in degrees.
 * @returns a string that represents the generated car image URL.
 */
export const generateCarImageUrl = (car: CarProps, angle?: string) => {
    const url = new URL('https://cdn.imagin.studio/car-image-api')

    const { make, year, model } = car

    url.searchParams.append('customer', 'hrjavascript-mastery')
    url.searchParams.append('make', make)
    url.searchParams.append('modelFamily', model.split(' ')[0])
    url.searchParams.append('zoomType', 'fullscreen')
    url.searchParams.append('modelYear', `${year}`)
    url.searchParams.append('angle', ` ${angle}`)

    return `${url}`
}