const puppeteer = require('puppeteer');

const hotelWebScraper = async (
  hotelName,
  location,
  familyMode,
  adults,
  children,
  rooms,
  maxRooms,
  checkIn,
  isCalendarCallout,
  childAges,
  currency,
  numberOfGuest,
  missingChildAges,
  daysStaying
) => {
  // buildinam URL naudojant gautus kintamuosius
  const url = `https://www.agoda.com/lt-lt/${hotelName}/hotel/${location}.html?finalPriceView=2&isShowMobileAppPrice=false&cid=1905113&numberOfBedrooms=&familyMode=${familyMode}&adults=${adults}&children=${children}&rooms=${rooms}&maxRooms=${maxRooms}&isCalendarCallout=${isCalendarCallout}&childAges=${childAges}&numberOfGuest=${numberOfGuest}&missingChildAges=${missingChildAges}&travellerType=1&showReviewSubmissionEntry=false&currencyCode=${currency}&isFreeOccSearch=false&isCityHaveAsq=false&tspTypes=4&los=${daysStaying}&checkin=${checkIn}`;

  // Paleidžiam puppeteer naršyklę, atidarom naują lanką, bei naviguojam į mūsų subuildintą url
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);

  // Laukiam kol puslapis užsikraus, tada panaudojant querySelector paimam reikalingą <span> elementą, kuriame įrašyta mažiausia kaina.
  const price = await page.evaluate(() => {
    const priceField = document.querySelector(
      '#hotelNavBar > div > div > div > span > div > span:nth-child(3)'
    );
    return priceField && priceField.innerText;
  });

  if (!price) {
    // Jei reikiamo <span> elemento neradom, į konsolę parašom jog toks viešbutis nerastas
    console.log('Hotel not found');
    await browser.close();
  } else {
    // Jei reikalingas <span> elementas buvo rastas, į konsolę išvedam kainą
    console.log(price);
    await browser.close();
  }
};

//Apsirašom reikalingus kintamuosius
const familyMode = 'false';
const adults = 2;
const checkIn = '2022-10-15';
const daysStaying = 1;
const children = 0;
const currency = 'EUR';
const hotelName = 'hoposa-niu';
const location = 'majorca-es';
const rooms = 1;
const maxRooms = 0;
const isCalendarCallout = 'false';
const numberOfGuest = 0;
const childAges = '';
const missingChildAges = '';

// Kviečiam hotelWebScraper funkciją ir perduodam kintamuosius
hotelWebScraper(
  hotelName,
  location,
  familyMode,
  adults,
  children,
  rooms,
  maxRooms,
  checkIn,
  isCalendarCallout,
  childAges,
  currency,
  numberOfGuest,
  missingChildAges,
  daysStaying
);
