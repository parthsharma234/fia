export interface PopularStock {
  symbol: string;
  name: string;
  kidFriendlyName: string;
  sector: string;
  category: string;
  description: string;
  funFact: string;
  whyKidsKnow: string;
}

export const popularStocks: PopularStock[] = [
  // Technology Giants
  {
    symbol: 'AAPL',
    name: 'Apple Inc.',
    kidFriendlyName: 'iPhone & iPad Maker',
    sector: 'Technology',
    category: 'Technology',
    description: 'Makes iPhones, iPads, Mac computers, and the App Store where you download games and apps.',
    funFact: 'Apple was started in a garage by Steve Jobs and Steve Wozniak in 1976!',
    whyKidsKnow: 'Most kids have used an iPhone, iPad, or Mac computer at some point.'
  },
  {
    symbol: 'GOOGL',
    name: 'Alphabet Inc.',
    kidFriendlyName: 'Google & YouTube',
    sector: 'Technology',
    category: 'Technology',
    description: 'Owns Google search, YouTube, Gmail, Google Maps, and Android phones.',
    funFact: 'Google processes over 8.5 billion searches every single day!',
    whyKidsKnow: 'Kids use Google to search for homework help and watch YouTube videos daily.'
  },
  {
    symbol: 'MSFT',
    name: 'Microsoft Corporation',
    kidFriendlyName: 'Xbox & Windows',
    sector: 'Technology',
    category: 'Gaming',
    description: 'Makes Xbox gaming consoles, Windows computers, and Office software like Word and PowerPoint.',
    funFact: 'Xbox Live has over 100 million active users worldwide!',
    whyKidsKnow: 'Many kids play Xbox games and use Windows computers at school.'
  },
  {
    symbol: 'AMZN',
    name: 'Amazon.com Inc.',
    kidFriendlyName: 'Online Shopping Giant',
    sector: 'Consumer Discretionary',
    category: 'E-commerce',
    description: 'The biggest online store where you can buy almost anything and get it delivered to your door.',
    funFact: 'Amazon delivers over 1.6 million packages every single day!',
    whyKidsKnow: 'Families order everything from toys to groceries on Amazon.'
  },
  {
    symbol: 'TSLA',
    name: 'Tesla Inc.',
    kidFriendlyName: 'Electric Cars',
    sector: 'Consumer Discretionary',
    category: 'Automotive',
    description: 'Makes electric cars that don\'t need gas and can drive themselves using computers.',
    funFact: 'Tesla cars can receive software updates over the internet, just like your phone!',
    whyKidsKnow: 'Tesla cars are super cool and futuristic - some can even drive themselves!'
  },
  {
    symbol: 'META',
    name: 'Meta Platforms Inc.',
    kidFriendlyName: 'Facebook & Instagram',
    sector: 'Technology',
    category: 'Social Media',
    description: 'Owns Facebook, Instagram, WhatsApp, and is building the metaverse with VR headsets.',
    funFact: 'Over 3 billion people use Facebook or Instagram every month!',
    whyKidsKnow: 'Older siblings and parents use Instagram and Facebook to share photos.'
  },
  {
    symbol: 'NVDA',
    name: 'NVIDIA Corporation',
    kidFriendlyName: 'Gaming Graphics Cards',
    sector: 'Technology',
    category: 'Gaming',
    description: 'Makes the powerful computer chips that make video games look amazing and run AI.',
    funFact: 'NVIDIA chips power most of the AI chatbots and image generators you see online!',
    whyKidsKnow: 'Serious gamers know NVIDIA makes the best graphics cards for gaming PCs.'
  },

  // Entertainment & Media
  {
    symbol: 'NFLX',
    name: 'Netflix Inc.',
    kidFriendlyName: 'Movie & TV Streaming',
    sector: 'Entertainment',
    category: 'Streaming',
    description: 'Streams movies and TV shows that you can watch anytime on any device.',
    funFact: 'Netflix has over 230 million subscribers worldwide!',
    whyKidsKnow: 'Most families have Netflix to watch movies and shows.'
  },
  {
    symbol: 'DIS',
    name: 'The Walt Disney Company',
    kidFriendlyName: 'Disney Movies & Parks',
    sector: 'Entertainment',
    category: 'Entertainment',
    description: 'Makes Disney movies, runs Disney World and Disneyland, and owns Marvel and Star Wars.',
    funFact: 'Disney has created over 700 animated movies and shows!',
    whyKidsKnow: 'Everyone knows Disney movies, characters, and theme parks.'
  },
  {
    symbol: 'RBLX',
    name: 'Roblox Corporation',
    kidFriendlyName: 'Online Gaming Platform',
    sector: 'Entertainment',
    category: 'Gaming',
    description: 'A platform where kids can play millions of games created by other users and even make their own.',
    funFact: 'Over 50 million people play Roblox every single day!',
    whyKidsKnow: 'Roblox is one of the most popular gaming platforms for kids and teens.'
  },
  {
    symbol: 'EA',
    name: 'Electronic Arts Inc.',
    kidFriendlyName: 'Video Game Maker',
    sector: 'Entertainment',
    category: 'Gaming',
    description: 'Makes popular video games like FIFA, Madden NFL, The Sims, and Apex Legends.',
    funFact: 'EA\'s FIFA game series has sold over 325 million copies worldwide!',
    whyKidsKnow: 'Many kids play EA Sports games like FIFA and Madden with friends.'
  },

  // Food & Beverage
  {
    symbol: 'MCD',
    name: 'McDonald\'s Corporation',
    kidFriendlyName: 'Fast Food Restaurant',
    sector: 'Consumer Discretionary',
    category: 'Food & Beverage',
    description: 'The world\'s largest fast-food restaurant chain serving burgers, fries, and Happy Meals.',
    funFact: 'McDonald\'s serves 69 million customers every single day!',
    whyKidsKnow: 'Almost every kid has eaten at McDonald\'s or seen the golden arches.'
  },
  {
    symbol: 'SBUX',
    name: 'Starbucks Corporation',
    kidFriendlyName: 'Coffee Shop',
    sector: 'Consumer Discretionary',
    category: 'Food & Beverage',
    description: 'The world\'s largest coffee shop chain, also selling snacks, sandwiches, and cold drinks.',
    funFact: 'Starbucks opens about 3 new stores every single day somewhere in the world!',
    whyKidsKnow: 'Parents often stop at Starbucks, and kids love their hot chocolate and cake pops.'
  },
  {
    symbol: 'KO',
    name: 'The Coca-Cola Company',
    kidFriendlyName: 'Coca-Cola Drinks',
    sector: 'Consumer Staples',
    category: 'Food & Beverage',
    description: 'Makes Coca-Cola, Sprite, Fanta, and hundreds of other drinks sold worldwide.',
    funFact: 'Coca-Cola is sold in every country in the world except North Korea and Cuba!',
    whyKidsKnow: 'Coke is one of the most recognizable brands in the world.'
  },
  {
    symbol: 'PEP',
    name: 'PepsiCo Inc.',
    kidFriendlyName: 'Pepsi & Snacks',
    sector: 'Consumer Staples',
    category: 'Food & Beverage',
    description: 'Makes Pepsi, Mountain Dew, Doritos, Cheetos, and Lay\'s potato chips.',
    funFact: 'PepsiCo owns 23 brands that each make over $1 billion in sales per year!',
    whyKidsKnow: 'Kids love Pepsi drinks and snacks like Doritos and Cheetos.'
  },

  // Retail & Consumer
  {
    symbol: 'NKE',
    name: 'Nike Inc.',
    kidFriendlyName: 'Sports Shoes & Clothes',
    sector: 'Consumer Discretionary',
    category: 'Retail',
    description: 'Makes athletic shoes, clothing, and equipment. Known for the "Just Do It" slogan.',
    funFact: 'Nike\'s swoosh logo was designed by a college student for just $35!',
    whyKidsKnow: 'Nike makes popular sneakers and sponsors famous athletes kids admire.'
  },
  {
    symbol: 'WMT',
    name: 'Walmart Inc.',
    kidFriendlyName: 'Big Store Chain',
    sector: 'Consumer Staples',
    category: 'Retail',
    description: 'The world\'s largest retailer with stores that sell groceries, clothes, electronics, and toys.',
    funFact: 'Walmart is so big that if it were a country, it would be the 25th largest economy in the world!',
    whyKidsKnow: 'Many families shop at Walmart for groceries and everyday items.'
  },
  {
    symbol: 'TGT',
    name: 'Target Corporation',
    kidFriendlyName: 'Target Stores',
    sector: 'Consumer Discretionary',
    category: 'Retail',
    description: 'Popular retail stores known for trendy clothes, home goods, and a fun shopping experience.',
    funFact: 'Target\'s bullseye logo is one of the most recognized symbols in America!',
    whyKidsKnow: 'Target is known for having cool stuff and a fun shopping experience.'
  },

  // Social Media & Apps
  {
    symbol: 'SNAP',
    name: 'Snap Inc.',
    kidFriendlyName: 'Snapchat App',
    sector: 'Technology',
    category: 'Social Media',
    description: 'Makes the Snapchat app where people send disappearing photos and videos to friends.',
    funFact: 'Over 750 million photos and videos are shared on Snapchat every single day!',
    whyKidsKnow: 'Snapchat is super popular with teens for sharing moments with friends.'
  },
  {
    symbol: 'UBER',
    name: 'Uber Technologies Inc.',
    kidFriendlyName: 'Ride Sharing App',
    sector: 'Technology',
    category: 'Transportation',
    description: 'An app that lets you request a ride from drivers in your area, like a taxi but easier.',
    funFact: 'Uber operates in over 10,000 cities across 70+ countries!',
    whyKidsKnow: 'Families use Uber when they need a ride and don\'t want to drive.'
  },

  // Streaming & Entertainment
  {
    symbol: 'SPOT',
    name: 'Spotify Technology S.A.',
    kidFriendlyName: 'Music Streaming',
    sector: 'Entertainment',
    category: 'Streaming',
    description: 'A music streaming service where you can listen to millions of songs and podcasts.',
    funFact: 'Spotify has over 500 million users and 100 million songs!',
    whyKidsKnow: 'Many kids and teens use Spotify to listen to their favorite music.'
  },
  {
    symbol: 'ROKU',
    name: 'Roku Inc.',
    kidFriendlyName: 'TV Streaming Device',
    sector: 'Technology',
    category: 'Streaming',
    description: 'Makes devices that turn any TV into a smart TV for watching Netflix, YouTube, and other apps.',
    funFact: 'Roku devices are used in 1 out of every 3 smart TVs sold in America!',
    whyKidsKnow: 'Many families use Roku to watch streaming services on their TV.'
  },

  // Gaming Companies
  {
    symbol: 'ATVI',
    name: 'Activision Blizzard Inc.',
    kidFriendlyName: 'Call of Duty Games',
    sector: 'Entertainment',
    category: 'Gaming',
    description: 'Makes popular video games like Call of Duty, World of Warcraft, and Candy Crush.',
    funFact: 'Call of Duty has made over $30 billion in total sales!',
    whyKidsKnow: 'Call of Duty is one of the most popular video game series ever.'
  },
  {
    symbol: 'TTWO',
    name: 'Take-Two Interactive Software Inc.',
    kidFriendlyName: 'Grand Theft Auto Games',
    sector: 'Entertainment',
    category: 'Gaming',
    description: 'Makes Grand Theft Auto, NBA 2K, and Red Dead Redemption video games.',
    funFact: 'Grand Theft Auto V has sold over 190 million copies worldwide!',
    whyKidsKnow: 'GTA and NBA 2K are extremely popular games among teens.'
  },

  // Financial Services
  {
    symbol: 'V',
    name: 'Visa Inc.',
    kidFriendlyName: 'Credit Card Payments',
    sector: 'Financial Services',
    category: 'Financial',
    description: 'Processes payments when people use Visa credit and debit cards to buy things.',
    funFact: 'Visa processes over 150 million transactions every single day!',
    whyKidsKnow: 'Most families have Visa cards and kids see the Visa logo everywhere.'
  },
  {
    symbol: 'PYPL',
    name: 'PayPal Holdings Inc.',
    kidFriendlyName: 'Online Payments',
    sector: 'Financial Services',
    category: 'Financial',
    description: 'Lets people send money online safely and pay for things without sharing credit card numbers.',
    funFact: 'PayPal processes over $1 trillion in payments every year!',
    whyKidsKnow: 'Many online stores use PayPal, and some kids get allowance through PayPal.'
  },

  // Automotive
  {
    symbol: 'F',
    name: 'Ford Motor Company',
    kidFriendlyName: 'Ford Cars & Trucks',
    sector: 'Consumer Discretionary',
    category: 'Automotive',
    description: 'Makes Ford cars, trucks, and SUVs including the popular F-150 pickup truck.',
    funFact: 'Ford\'s F-150 has been America\'s best-selling truck for over 45 years!',
    whyKidsKnow: 'Ford trucks are everywhere, and many families drive Ford vehicles.'
  },
  {
    symbol: 'GM',
    name: 'General Motors Company',
    kidFriendlyName: 'Chevy & Cadillac Cars',
    sector: 'Consumer Discretionary',
    category: 'Automotive',
    description: 'Makes Chevrolet, Cadillac, GMC, and Buick cars and trucks.',
    funFact: 'GM was the world\'s largest automaker for 77 years straight!',
    whyKidsKnow: 'Chevy is a popular American car brand that many families drive.'
  },

  // Airlines & Travel
  {
    symbol: 'AAL',
    name: 'American Airlines Group Inc.',
    kidFriendlyName: 'Airline Company',
    sector: 'Transportation',
    category: 'Transportation',
    description: 'One of the largest airlines in the world, flying people to destinations everywhere.',
    funFact: 'American Airlines flies to over 350 destinations in 50+ countries!',
    whyKidsKnow: 'Many families have flown on American Airlines for vacations.'
  },
  {
    symbol: 'DAL',
    name: 'Delta Air Lines Inc.',
    kidFriendlyName: 'Delta Airlines',
    sector: 'Transportation',
    category: 'Transportation',
    description: 'A major airline known for good customer service and flying to destinations worldwide.',
    funFact: 'Delta serves over 200 million passengers every year!',
    whyKidsKnow: 'Delta is one of the most popular airlines for family trips.'
  },

  // More Technology
  {
    symbol: 'AMD',
    name: 'Advanced Micro Devices Inc.',
    kidFriendlyName: 'Computer Chips',
    sector: 'Technology',
    category: 'Technology',
    description: 'Makes computer processors and graphics cards that power gaming PCs and laptops.',
    funFact: 'AMD chips power both PlayStation 5 and Xbox Series X gaming consoles!',
    whyKidsKnow: 'Gamers know AMD makes powerful chips for gaming computers.'
  },
  {
    symbol: 'INTC',
    name: 'Intel Corporation',
    kidFriendlyName: 'Computer Processors',
    sector: 'Technology',
    category: 'Technology',
    description: 'Makes the "brains" (processors) that power most computers and laptops.',
    funFact: 'Intel invented the first microprocessor in 1971!',
    whyKidsKnow: 'Most computers have "Intel Inside" stickers on them.'
  },

  // More Entertainment
  {
    symbol: 'WBD',
    name: 'Warner Bros. Discovery Inc.',
    kidFriendlyName: 'Movies & TV Shows',
    sector: 'Entertainment',
    category: 'Entertainment',
    description: 'Makes movies and TV shows including Harry Potter, DC superheroes, and Discovery Channel.',
    funFact: 'Warner Bros. has made over 6,000 movies since 1918!',
    whyKidsKnow: 'Kids love Warner Bros movies like Harry Potter and DC superhero films.'
  },

  // More Food & Beverage
  {
    symbol: 'CMG',
    name: 'Chipotle Mexican Grill Inc.',
    kidFriendlyName: 'Burrito Restaurant',
    sector: 'Consumer Discretionary',
    category: 'Food & Beverage',
    description: 'Fast-casual restaurant chain known for customizable burritos, bowls, and fresh ingredients.',
    funFact: 'Chipotle serves over 3 million customers every single day!',
    whyKidsKnow: 'Chipotle is a popular place for families to get quick, fresh Mexican food.'
  },
  {
    symbol: 'YUM',
    name: 'Yum! Brands Inc.',
    kidFriendlyName: 'KFC, Taco Bell & Pizza Hut',
    sector: 'Consumer Discretionary',
    category: 'Food & Beverage',
    description: 'Owns KFC (fried chicken), Taco Bell (Mexican food), and Pizza Hut (pizza) restaurants.',
    funFact: 'Yum! Brands has over 55,000 restaurants in 155 countries!',
    whyKidsKnow: 'Most kids have eaten at KFC, Taco Bell, or Pizza Hut.'
  },

  // More Retail
  {
    symbol: 'COST',
    name: 'Costco Wholesale Corporation',
    kidFriendlyName: 'Bulk Shopping Store',
    sector: 'Consumer Staples',
    category: 'Retail',
    description: 'A membership store where families buy large quantities of food and household items to save money.',
    funFact: 'Costco\'s food court sells over 100 million hot dogs every year!',
    whyKidsKnow: 'Families shop at Costco for bulk groceries and kids love the food court.'
  },
  {
    symbol: 'HD',
    name: 'The Home Depot Inc.',
    kidFriendlyName: 'Home Improvement Store',
    sector: 'Consumer Discretionary',
    category: 'Retail',
    description: 'Sells tools, lumber, paint, and everything needed to build or fix homes.',
    funFact: 'Home Depot is the largest home improvement retailer in the world!',
    whyKidsKnow: 'Parents shop at Home Depot for house projects and repairs.'
  },

  // More Technology/Social
  {
    symbol: 'ZM',
    name: 'Zoom Video Communications Inc.',
    kidFriendlyName: 'Video Calling App',
    sector: 'Technology',
    category: 'Technology',
    description: 'Makes video calling software that people use for online meetings and virtual school.',
    funFact: 'During COVID-19, Zoom went from 10 million to 300 million daily users!',
    whyKidsKnow: 'Many kids used Zoom for online school during the pandemic.'
  },
  {
    symbol: 'PINS',
    name: 'Pinterest Inc.',
    kidFriendlyName: 'Photo Sharing App',
    sector: 'Technology',
    category: 'Social Media',
    description: 'A visual discovery platform where people find ideas for recipes, home decor, fashion, and more.',
    funFact: 'Pinterest has over 450 million monthly active users worldwide!',
    whyKidsKnow: 'Many people use Pinterest to find craft ideas, recipes, and inspiration.'
  },

  // More Financial
  {
    symbol: 'MA',
    name: 'Mastercard Incorporated',
    kidFriendlyName: 'Credit Card Company',
    sector: 'Financial Services',
    category: 'Financial',
    description: 'Processes payments when people use Mastercard credit and debit cards.',
    funFact: 'Mastercard processes over 74 billion transactions per year!',
    whyKidsKnow: 'Mastercard is one of the most common credit card brands families use.'
  },

  // Healthcare
  {
    symbol: 'JNJ',
    name: 'Johnson & Johnson',
    kidFriendlyName: 'Band-Aids & Medicine',
    sector: 'Healthcare',
    category: 'Healthcare',
    description: 'Makes Band-Aids, baby shampoo, Tylenol, and many medicines and medical devices.',
    funFact: 'Johnson & Johnson invented Band-Aids in 1920!',
    whyKidsKnow: 'Almost every kid has used Johnson & Johnson Band-Aids or baby products.'
  },

  // More Streaming/Entertainment
  {
    symbol: 'PARA',
    name: 'Paramount Global',
    kidFriendlyName: 'Movies & TV Network',
    sector: 'Entertainment',
    category: 'Entertainment',
    description: 'Makes movies and TV shows, owns Paramount Pictures, CBS, and Nickelodeon.',
    funFact: 'Paramount owns Nickelodeon, which created SpongeBob SquarePants!',
    whyKidsKnow: 'Kids watch Nickelodeon shows and Paramount movies.'
  },

  // More Food
  {
    symbol: 'DNKN',
    name: 'Dunkin\' Brands Group Inc.',
    kidFriendlyName: 'Donut & Coffee Shop',
    sector: 'Consumer Discretionary',
    category: 'Food & Beverage',
    description: 'Famous for donuts, coffee, and the slogan "America Runs on Dunkin\'".',
    funFact: 'Dunkin\' sells over 3 billion donuts and muffins worldwide each year!',
    whyKidsKnow: 'Dunkin\' Donuts is a popular place for breakfast treats and coffee.'
  },

  // More Technology
  {
    symbol: 'ADBE',
    name: 'Adobe Inc.',
    kidFriendlyName: 'Photoshop & Creative Software',
    sector: 'Technology',
    category: 'Technology',
    description: 'Makes Photoshop, Illustrator, and other software that artists and designers use to create.',
    funFact: 'The term "photoshopped" comes from Adobe\'s Photoshop software!',
    whyKidsKnow: 'Many kids use Adobe software in art class or see "photoshopped" images online.'
  },

  // More Gaming/Entertainment
  {
    symbol: 'U',
    name: 'Unity Software Inc.',
    kidFriendlyName: 'Game Development Software',
    sector: 'Technology',
    category: 'Gaming',
    description: 'Makes software that helps people create video games and 3D experiences.',
    funFact: 'Over 50% of all mobile games are made using Unity software!',
    whyKidsKnow: 'Many popular mobile games kids play were created using Unity.'
  },

  // More Retail/E-commerce
  {
    symbol: 'ETSY',
    name: 'Etsy Inc.',
    kidFriendlyName: 'Handmade Crafts Store',
    sector: 'Consumer Discretionary',
    category: 'E-commerce',
    description: 'An online marketplace where people sell handmade, vintage, and unique items.',
    funFact: 'Etsy has over 90 million active buyers looking for unique items!',
    whyKidsKnow: 'Many kids and families buy custom or handmade items on Etsy.'
  },

  // More Transportation
  {
    symbol: 'LYFT',
    name: 'Lyft Inc.',
    kidFriendlyName: 'Ride Sharing Service',
    sector: 'Technology',
    category: 'Transportation',
    description: 'A ride-sharing app similar to Uber, known for its pink mustache logo and friendly drivers.',
    funFact: 'Lyft has given over 1 billion rides since it started!',
    whyKidsKnow: 'Lyft is another popular way families get rides when they need transportation.'
  },

  // More Food & Beverage
  {
    symbol: 'MNST',
    name: 'Monster Beverage Corporation',
    kidFriendlyName: 'Energy Drinks',
    sector: 'Consumer Staples',
    category: 'Food & Beverage',
    description: 'Makes Monster Energy drinks and other energy beverages popular with teens and young adults.',
    funFact: 'Monster Energy sponsors extreme sports athletes and events worldwide!',
    whyKidsKnow: 'Monster Energy drinks are popular with older teens and young adults.'
  },

  // More Healthcare
  {
    symbol: 'PFE',
    name: 'Pfizer Inc.',
    kidFriendlyName: 'Medicine & Vaccines',
    sector: 'Healthcare',
    category: 'Healthcare',
    description: 'Makes medicines and vaccines, including the COVID-19 vaccine many people received.',
    funFact: 'Pfizer has been making medicines for over 170 years!',
    whyKidsKnow: 'Many kids received Pfizer\'s COVID-19 vaccine.'
  },

  // More Technology/Cloud
  {
    symbol: 'CRM',
    name: 'Salesforce Inc.',
    kidFriendlyName: 'Business Software',
    sector: 'Technology',
    category: 'Technology',
    description: 'Makes software that helps businesses keep track of their customers and sales.',
    funFact: 'Salesforce invented the idea of using software through the internet (cloud computing)!',
    whyKidsKnow: 'Many parents\' workplaces use Salesforce to manage their business.'
  },

  // More Entertainment/Fitness
  {
    symbol: 'PTON',
    name: 'Peloton Interactive Inc.',
    kidFriendlyName: 'Exercise Bikes',
    sector: 'Consumer Discretionary',
    category: 'Fitness',
    description: 'Makes high-tech exercise bikes and treadmills with live workout classes you can take at home.',
    funFact: 'Peloton has over 6 million members taking virtual fitness classes!',
    whyKidsKnow: 'Many families got Peloton bikes during COVID-19 to exercise at home.'
  },

  // More Food
  {
    symbol: 'HSY',
    name: 'The Hershey Company',
    kidFriendlyName: 'Chocolate & Candy',
    sector: 'Consumer Staples',
    category: 'Food & Beverage',
    description: 'Makes Hershey\'s chocolate, Reese\'s peanut butter cups, Kit Kat, and other popular candies.',
    funFact: 'Hershey\'s Kisses were first made in 1907 and billions are made every year!',
    whyKidsKnow: 'Hershey\'s chocolate and Reese\'s are favorite candies for most kids.'
  },

  // More Technology/E-commerce
  {
    symbol: 'SHOP',
    name: 'Shopify Inc.',
    kidFriendlyName: 'Online Store Builder',
    sector: 'Technology',
    category: 'E-commerce',
    description: 'Helps people create their own online stores to sell products on the internet.',
    funFact: 'Over 1.7 million businesses use Shopify to sell their products online!',
    whyKidsKnow: 'Many small businesses kids\' families shop from use Shopify for their websites.'
  },

  // More Retail
  {
    symbol: 'BBY',
    name: 'Best Buy Co. Inc.',
    kidFriendlyName: 'Electronics Store',
    sector: 'Consumer Discretionary',
    category: 'Retail',
    description: 'Sells computers, phones, TVs, video games, and all kinds of electronic devices.',
    funFact: 'Best Buy is the largest electronics retailer in the United States!',
    whyKidsKnow: 'Families shop at Best Buy for phones, computers, and video games.'
  },

  // More Financial/Crypto
  {
    symbol: 'COIN',
    name: 'Coinbase Global Inc.',
    kidFriendlyName: 'Cryptocurrency Exchange',
    sector: 'Financial Services',
    category: 'Financial',
    description: 'A platform where people can buy, sell, and store cryptocurrencies like Bitcoin.',
    funFact: 'Coinbase has over 100 million verified users worldwide!',
    whyKidsKnow: 'Some older teens and adults use Coinbase to buy Bitcoin and other cryptocurrencies.'
  },

  // More Streaming
  {
    symbol: 'FUBO',
    name: 'fuboTV Inc.',
    kidFriendlyName: 'Sports Streaming',
    sector: 'Entertainment',
    category: 'Streaming',
    description: 'A streaming service focused on live sports and TV channels.',
    funFact: 'fuboTV streams over 100 live TV channels including sports!',
    whyKidsKnow: 'Sports fans use fuboTV to watch games without cable TV.'
  },

  // More Technology/Communication
  {
    symbol: 'VZ',
    name: 'Verizon Communications Inc.',
    kidFriendlyName: 'Cell Phone Service',
    sector: 'Technology',
    category: 'Technology',
    description: 'Provides cell phone service, internet, and TV services to millions of customers.',
    funFact: 'Verizon has the largest 4G LTE network in the United States!',
    whyKidsKnow: 'Many families use Verizon for their cell phone service.'
  },

  // More Food
  {
    symbol: 'GIS',
    name: 'General Mills Inc.',
    kidFriendlyName: 'Cereal & Food',
    sector: 'Consumer Staples',
    category: 'Food & Beverage',
    description: 'Makes popular cereals like Cheerios, Lucky Charms, and Cinnamon Toast Crunch.',
    funFact: 'General Mills makes over 100 different cereal varieties!',
    whyKidsKnow: 'Most kids have eaten General Mills cereals like Cheerios or Lucky Charms.'
  },

  // More Technology/Cloud
  {
    symbol: 'SNOW',
    name: 'Snowflake Inc.',
    kidFriendlyName: 'Cloud Computing',
    sector: 'Technology',
    category: 'Technology',
    description: 'Helps companies store and analyze huge amounts of data in the cloud.',
    funFact: 'Snowflake can process data from millions of sources at the same time!',
    whyKidsKnow: 'Many apps and websites kids use rely on cloud computing companies like Snowflake.'
  },

  // More Entertainment/Fitness
  {
    symbol: 'LULU',
    name: 'Lululemon Athletica Inc.',
    kidFriendlyName: 'Yoga & Sports Clothes',
    sector: 'Consumer Discretionary',
    category: 'Retail',
    description: 'Makes high-quality athletic wear, especially yoga pants and workout clothes.',
    funFact: 'Lululemon started as a small yoga studio in Vancouver, Canada!',
    whyKidsKnow: 'Many teens and adults wear Lululemon for sports and casual wear.'
  },

  // More Technology/Real Estate
  {
    symbol: 'ZG',
    name: 'Zillow Group Inc.',
    kidFriendlyName: 'Home Search Website',
    sector: 'Technology',
    category: 'Technology',
    description: 'A website and app where people search for homes to buy or rent.',
    funFact: 'Zillow has information on over 110 million homes in the United States!',
    whyKidsKnow: 'Families use Zillow when looking for a new house to buy or rent.'
  },

  // More Financial/Trading
  {
    symbol: 'HOOD',
    name: 'Robinhood Markets Inc.',
    kidFriendlyName: 'Stock Trading App',
    sector: 'Financial Services',
    category: 'Financial',
    description: 'A mobile app that lets people buy and sell stocks without paying fees.',
    funFact: 'Robinhood made stock trading free for everyone, changing the entire industry!',
    whyKidsKnow: 'Some older teens and young adults use Robinhood to start investing.'
  },

  // More Food & Beverage
  {
    symbol: 'K',
    name: 'Kellogg Company',
    kidFriendlyName: 'Cereal & Snacks',
    sector: 'Consumer Staples',
    category: 'Food & Beverage',
    description: 'Makes Frosted Flakes, Pop-Tarts, Pringles, and other breakfast cereals and snacks.',
    funFact: 'Kellogg\'s Corn Flakes were invented by accident in 1894!',
    whyKidsKnow: 'Most kids have eaten Kellogg\'s cereals like Frosted Flakes or Pop-Tarts.'
  },

  // More Technology/Semiconductors
  {
    symbol: 'TSM',
    name: 'Taiwan Semiconductor Manufacturing Company',
    kidFriendlyName: 'Chip Maker',
    sector: 'Technology',
    category: 'Technology',
    description: 'Makes the tiny computer chips that power iPhones, gaming consoles, and cars.',
    funFact: 'TSM makes chips for Apple, NVIDIA, and most major tech companies!',
    whyKidsKnow: 'The chips in kids\' phones, gaming consoles, and computers are often made by TSM.'
  },

  // More Entertainment/Sports
  {
    symbol: 'DKNG',
    name: 'DraftKings Inc.',
    kidFriendlyName: 'Sports Betting App',
    sector: 'Entertainment',
    category: 'Entertainment',
    description: 'A platform for fantasy sports and sports betting (for adults only).',
    funFact: 'DraftKings has over 3 million customers who play fantasy sports!',
    whyKidsKnow: 'Some adults use DraftKings for fantasy football and sports games.'
  },

  // More Technology/Communication
  {
    symbol: 'T',
    name: 'AT&T Inc.',
    kidFriendlyName: 'Phone & Internet',
    sector: 'Technology',
    category: 'Technology',
    description: 'Provides cell phone service, internet, and TV services across America.',
    funFact: 'AT&T has been around for over 140 years, starting with telephone service!',
    whyKidsKnow: 'Many families use AT&T for their cell phone and internet service.'
  },

  // More Retail/Luxury
  {
    symbol: 'LVMUY',
    name: 'LVMH Moët Hennessy Louis Vuitton',
    kidFriendlyName: 'Luxury Brands',
    sector: 'Consumer Discretionary',
    category: 'Retail',
    description: 'Owns luxury brands like Louis Vuitton bags, Tiffany jewelry, and Sephora makeup stores.',
    funFact: 'LVMH owns over 75 luxury brands including Louis Vuitton and Tiffany & Co!',
    whyKidsKnow: 'Kids see these luxury brands in movies, social media, and high-end stores.'
  },

  // More Technology/Cybersecurity
  {
    symbol: 'CRWD',
    name: 'CrowdStrike Holdings Inc.',
    kidFriendlyName: 'Computer Security',
    sector: 'Technology',
    category: 'Technology',
    description: 'Protects computers and networks from hackers and cyber attacks.',
    funFact: 'CrowdStrike protects over 24,000 companies from cyber threats!',
    whyKidsKnow: 'Companies use CrowdStrike to keep kids\' personal information safe online.'
  },

  // More Entertainment/Music
  {
    symbol: 'WMG',
    name: 'Warner Music Group Corp.',
    kidFriendlyName: 'Music Company',
    sector: 'Entertainment',
    category: 'Entertainment',
    description: 'A major music company that represents popular artists and produces music.',
    funFact: 'Warner Music Group represents artists like Ed Sheeran, Cardi B, and Bruno Mars!',
    whyKidsKnow: 'Many of kids\' favorite songs are produced by Warner Music Group artists.'
  },

  // More Technology/Software
  {
    symbol: 'ORCL',
    name: 'Oracle Corporation',
    kidFriendlyName: 'Database Software',
    sector: 'Technology',
    category: 'Technology',
    description: 'Makes database software that helps companies store and organize their information.',
    funFact: 'Oracle\'s databases power many of the apps and websites kids use every day!',
    whyKidsKnow: 'Oracle software runs behind the scenes of many apps and websites kids use.'
  },

  // More Automotive/Electric
  {
    symbol: 'RIVN',
    name: 'Rivian Automotive Inc.',
    kidFriendlyName: 'Electric Trucks',
    sector: 'Consumer Discretionary',
    category: 'Automotive',
    description: 'Makes electric pickup trucks and delivery vans, including vehicles for Amazon.',
    funFact: 'Amazon ordered 100,000 electric delivery vans from Rivian!',
    whyKidsKnow: 'Rivian makes cool electric trucks that look like something from the future.'
  },

  // More Technology/Payments
  {
    symbol: 'SQ',
    name: 'Block Inc.',
    kidFriendlyName: 'Square Payment Systems',
    sector: 'Financial Services',
    category: 'Financial',
    description: 'Makes Square payment systems for small businesses and the Cash App for sending money.',
    funFact: 'Square was started by the same person who co-founded Twitter!',
    whyKidsKnow: 'Many small businesses use Square tablets to accept credit card payments.'
  },

  // More Food & Beverage/Coffee
  {
    symbol: 'KDP',
    name: 'Keurig Dr Pepper Inc.',
    kidFriendlyName: 'Coffee & Soft Drinks',
    sector: 'Consumer Staples',
    category: 'Food & Beverage',
    description: 'Makes Keurig coffee machines, Dr Pepper, 7UP, and other popular drinks.',
    funFact: 'Dr Pepper was invented in 1885, making it older than Coca-Cola!',
    whyKidsKnow: 'Many families have Keurig coffee makers and kids drink Dr Pepper and 7UP.'
  },

  // More Technology/Semiconductors
  {
    symbol: 'AVGO',
    name: 'Broadcom Inc.',
    kidFriendlyName: 'Computer Chips',
    sector: 'Technology',
    category: 'Technology',
    description: 'Makes computer chips that help devices connect to WiFi and communicate wirelessly.',
    funFact: 'Broadcom chips are in most smartphones, helping them connect to WiFi!',
    whyKidsKnow: 'Broadcom chips are inside most phones and devices kids use for internet.'
  },

  // More Retail/Pharmacy
  {
    symbol: 'CVS',
    name: 'CVS Health Corporation',
    kidFriendlyName: 'Pharmacy & Health',
    sector: 'Healthcare',
    category: 'Healthcare',
    description: 'Pharmacy stores where people get prescription medicines and health products.',
    funFact: 'CVS has over 9,900 retail locations across the United States!',
    whyKidsKnow: 'Families visit CVS to pick up medicines and health products.'
  },

  // More Technology/E-commerce
  {
    symbol: 'ABNB',
    name: 'Airbnb Inc.',
    kidFriendlyName: 'Home Rental App',
    sector: 'Consumer Discretionary',
    category: 'Travel',
    description: 'An app where people can rent out their homes or rooms to travelers instead of hotels.',
    funFact: 'Airbnb has over 4 million hosts offering places to stay worldwide!',
    whyKidsKnow: 'Many families use Airbnb instead of hotels when traveling for unique places to stay.'
  },

  // More Food Delivery
  {
    symbol: 'DASH',
    name: 'DoorDash Inc.',
    kidFriendlyName: 'Food Delivery App',
    sector: 'Consumer Discretionary',
    category: 'Food & Beverage',
    description: 'An app that delivers food from restaurants directly to your home.',
    funFact: 'DoorDash delivers from over 450,000 restaurants across the US!',
    whyKidsKnow: 'Many families use DoorDash to get restaurant food delivered to their house.'
  },

  // More Technology/Cloud
  {
    symbol: 'PLTR',
    name: 'Palantir Technologies Inc.',
    kidFriendlyName: 'Data Analysis Software',
    sector: 'Technology',
    category: 'Technology',
    description: 'Makes software that helps governments and companies analyze large amounts of data.',
    funFact: 'Palantir\'s name comes from the seeing stones in Lord of the Rings!',
    whyKidsKnow: 'Palantir helps keep people safe by analyzing data for security purposes.'
  },

  // More Entertainment/Social
  {
    symbol: 'BMBL',
    name: 'Bumble Inc.',
    kidFriendlyName: 'Dating App',
    sector: 'Technology',
    category: 'Social Media',
    description: 'A dating app where people can meet new friends and potential romantic partners.',
    funFact: 'Bumble was founded by a woman and requires women to make the first move!',
    whyKidsKnow: 'Older teens and young adults use Bumble to meet new people.'
  },

  // More Technology/Electric Vehicles
  {
    symbol: 'LCID',
    name: 'Lucid Group Inc.',
    kidFriendlyName: 'Luxury Electric Cars',
    sector: 'Consumer Discretionary',
    category: 'Automotive',
    description: 'Makes high-end electric cars that compete with Tesla for luxury buyers.',
    funFact: 'Lucid\'s Air Dream car can drive over 500 miles on a single charge!',
    whyKidsKnow: 'Lucid makes some of the most advanced electric cars in the world.'
  },

  // More Technology/Processors
  {
    symbol: 'QCOM',
    name: 'QUALCOMM Incorporated',
    kidFriendlyName: 'Phone Chips',
    sector: 'Technology',
    category: 'Technology',
    description: 'Makes the processors and chips that power most Android smartphones.',
    funFact: 'QUALCOMM invented many of the technologies that make modern smartphones possible!',
    whyKidsKnow: 'Most Android phones use QUALCOMM chips to run apps and connect to the internet.'
  },

  // More Retail/Warehouse
  {
    symbol: 'LOW',
    name: 'Lowe\'s Companies Inc.',
    kidFriendlyName: 'Home & Garden Store',
    sector: 'Consumer Discretionary',
    category: 'Retail',
    description: 'Sells tools, lumber, appliances, and supplies for home improvement projects.',
    funFact: 'Lowe\'s is the second-largest home improvement retailer in the world!',
    whyKidsKnow: 'Parents shop at Lowe\'s for house projects and yard work supplies.'
  },

  // More Technology/Business Software
  {
    symbol: 'NOW',
    name: 'ServiceNow Inc.',
    kidFriendlyName: 'Business Software',
    sector: 'Technology',
    category: 'Technology',
    description: 'Makes software that helps companies manage their IT services and business processes.',
    funFact: 'ServiceNow helps over 7,700 companies worldwide run their businesses better!',
    whyKidsKnow: 'Many companies parents work for use ServiceNow to manage their computer systems.'
  },

  // More Entertainment/Cruise
  {
    symbol: 'CCL',
    name: 'Carnival Corporation',
    kidFriendlyName: 'Cruise Ships',
    sector: 'Consumer Discretionary',
    category: 'Travel',
    description: 'Operates cruise ships that take families on vacation to different countries.',
    funFact: 'Carnival operates over 100 cruise ships that can carry 300,000 passengers at once!',
    whyKidsKnow: 'Many families go on Carnival cruises for vacations to tropical places.'
  },

  // More Technology/Cybersecurity
  {
    symbol: 'PANW',
    name: 'Palo Alto Networks Inc.',
    kidFriendlyName: 'Internet Security',
    sector: 'Technology',
    category: 'Technology',
    description: 'Makes security software that protects companies from hackers and cyber attacks.',
    funFact: 'Palo Alto Networks protects over 85,000 organizations worldwide!',
    whyKidsKnow: 'This company helps keep kids\' personal information safe when using the internet.'
  },

  // More Technology/Design
  {
    symbol: 'FVRR',
    name: 'Fiverr International Ltd.',
    kidFriendlyName: 'Freelance Services',
    sector: 'Technology',
    category: 'Technology',
    description: 'A website where people can hire freelancers to do creative work like design, writing, and programming.',
    funFact: 'Over 4 million people use Fiverr to offer their services to businesses!',
    whyKidsKnow: 'Some teens use Fiverr to make money doing creative work online.'
  },

  // More Technology/Communication
  {
    symbol: 'CMCSA',
    name: 'Comcast Corporation',
    kidFriendlyName: 'Cable TV & Internet',
    sector: 'Technology',
    category: 'Technology',
    description: 'Provides cable TV, internet service, and owns NBCUniversal entertainment company.',
    funFact: 'Comcast provides internet service to over 32 million customers!',
    whyKidsKnow: 'Many families get their internet and TV service from Comcast.'
  },

  // More Technology/Processors
  {
    symbol: 'TXN',
    name: 'Texas Instruments Incorporated',
    kidFriendlyName: 'Calculator Company',
    sector: 'Technology',
    category: 'Technology',
    description: 'Makes calculators for schools and computer chips for cars, phones, and other devices.',
    funFact: 'Texas Instruments invented the handheld calculator in 1967!',
    whyKidsKnow: 'Most kids use TI calculators in math class, especially for advanced courses.'
  },

  // More Automotive/Traditional
  {
    symbol: 'TM',
    name: 'Toyota Motor Corporation',
    kidFriendlyName: 'Toyota Cars',
    sector: 'Consumer Discretionary',
    category: 'Automotive',
    description: 'Makes reliable cars, trucks, and SUVs including the popular Prius hybrid car.',
    funFact: 'Toyota is the largest automaker in the world by number of vehicles sold!',
    whyKidsKnow: 'Toyota makes some of the most reliable cars that many families drive.'
  },

  // More Technology/Cloud Storage
  {
    symbol: 'BOX',
    name: 'Box Inc.',
    kidFriendlyName: 'Cloud Storage',
    sector: 'Technology',
    category: 'Technology',
    description: 'Provides cloud storage and file sharing services for businesses and schools.',
    funFact: 'Box stores over 10 billion files for companies and schools worldwide!',
    whyKidsKnow: 'Some schools use Box for students to store and share their schoolwork online.'
  }
];

export const getStocksByCategory = (category: string): PopularStock[] => {
  if (category === 'All') return popularStocks;
  return popularStocks.filter(stock => stock.category === category);
};

export const searchStocks = (query: string): PopularStock[] => {
  const searchTerm = query.toLowerCase();
  return popularStocks.filter(stock =>
    stock.name.toLowerCase().includes(searchTerm) ||
    stock.symbol.toLowerCase().includes(searchTerm) ||
    stock.kidFriendlyName.toLowerCase().includes(searchTerm) ||
    stock.sector.toLowerCase().includes(searchTerm) ||
    stock.category.toLowerCase().includes(searchTerm) ||
    stock.description.toLowerCase().includes(searchTerm)
  );
};

export const getUniqueCategories = (): string[] => {
  const categories = [...new Set(popularStocks.map(stock => stock.category))];
  return ['All', ...categories.sort()];
};