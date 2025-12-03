# Music Pyramid - Search, build, and save a personal list of music.

## About Music Pyramid
Music Pyramid was born out of a simple frustration shared by many music fans: finding new bands that truly resonate with the sound of the artist you already love. In a household full of music lovers, discovering similar music and keeping track of it in one easy place, proved to be more difficult than expected. After researching existing solutions, it became clear that while many applications allow you to search for and save music, few focus on helping listeners find and explore similar bands. This inspired the creation of Music Pyramid, an application dedicated to helping you, find, listen to, and log new music based on the bands you already enjoy.

## Application Features
* Home/Index page: The Home page includes navigation and login features. 
* About page: The About page explains the origination, purpose, and description of the website application.
* Similar Music Search page: The Similar Music page will provide a query search field to enter and search for bands.
* My Music page: This page houses the collection of bands saved.
 
Below is a preview of the home page.

![Alt text](homePage.png)
On the home page, once you create an account, you can select the "SEARCH BANDS" button and start finding your next favorite band! You will be directed to the Similar Bands page.  

Preview of the Similar Bands page.

![Alt text](similarBandsResults.png)
On the Similar Bands page, enter a favorite band or even a genre "rock bands" and a list of similar bands or music will appear.

For each band result, you have the option to explore the band. Wikipedia and YouTube links are provided to learn more about the band and preview songs. If you like the band and click the save button, a box will appear confirming you want to save.

![Alt text](saveBandNotification.png)

Preview of the My Bands page.

![Alt text](myBandsView.png)

## Every band you save is stored in your account so you can revisit them anytime on the My Bands page.

Once the band is saved to your "My Bands" page, the bands remain there, until YOU remove them. At any time, you can delete a band from the page.

![Alt text](deleteBandNotification.png)

## Technical Features

This application is a NextJS and React application. A GitHub repository was created with an MIT License. MongoDB Atlas is used as the database solution to save the chosen data.  Also, the application will be responsive on mobile, tablet, and desktop devices, and is deployed by Vercel.

## TasteDive API : This application incorporates a third-party API called TasteDive to provide the similar band searches.

For API information go to [TasteDive](https://tastedive.com/read/api)
* Basic Query API Endpoint: 
* https://tastedive.com/api/similar?q=red+hot+chili+peppers%2C+pulp+fiction&type=music
* Result / Output Results
{
      "name": "Twisted Sister",
    "wUrl": "http://en.wikipedia.org/wiki/Twisted_Sister",
    "yUrl": "https://www.youtube.com/watch?v=V9AbeALNVkk",
    "yID": "V9AbeALNVkk",
    "description": null
}


## About This Application

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server: If needed, first, run "npm i" and then run:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.jsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
