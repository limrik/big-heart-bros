# big-heart-bros

Big Heart Bros aim to streamline the volunteering process, by allowing volunteers to sign up for events and organisations to put up requests for volunteers to join. Big At Heart simply have to approve or reject the request from the organisations.

-   Target User: Volunteers
-   Medium: Web app
-   Issue: Tedious process to sign and liase with volunteeers, and meaningful data collection
  
-   Additional Features:
1.   Recommender system to allow volunteers to have a more personalised experience
2. AI-generated testimonial for volunteers that will consolidate their volunteering experiences
3. Personalised statistics for volunteers
4. Sign-up and sign-in feature for volunteers (and data collection)

## User Flow
![User Flow Diagram](big-heart-bros/docs/images/user-flow.png)

## Current Wireframe
<img src="big-heart-bros/docs/images/home-page.png" alt="Home Page" width="33%"/>
<img src="big-heart-bros/docs/images/org-dashboard.png" alt="Organisation Dashboard" width="33%"/>
<img src="big-heart-bros/docs/images/admin-dashboard.png" alt="Admin Dashboard" width="33%"/>


## Tech Stack and Configuration
This app uses:

-   Next.js
-   Nativewind CSS (Tailwind)
-   NextAuth.js
-   TypeScript
-   Prettier (Auto formatting)
-   Prisma
-   Supabase

<p align='center'>
<img src='https://img.shields.io/badge/-NextJS-white?logo=nextdotjs&logoColor=black'>
<img src='https://img.shields.io/badge/-TailwindCSS-06B6D4?logo=tailwindcss&logoColor=white''>
<img src='https://img.shields.io/badge/-TypeScript-3178C6?logo=typescript&logoColor=white''>
<img src='https://img.shields.io/badge/-Prisma-blue?logo=prisma&logoColor=darkblue'>
<img src='https://img.shields.io/badge/-Supabase-white?logo=supabase&logoColor=green'>
  
</p>

## Folder structure
```
├── src/  
│   ├── app  
│   ├── components  
│   ├── constants  
│   ├── lib  
│   └── pages/api  
└── prisma
└── docs
└── utils
    └── machineLearning
```

## Get Started
Ensure that you have the following installed:
- [**Node.js**](https://nodejs.dev/en/download/)
- [**Git**](https://git-scm.com/downloads)
- [**Npm**](https://www.npmjs.com/package/npm)

Now do the following:
1. First git clone the repository
2. Then `cd` into the repository (`cd big-heart-bros/big-heart-bros`) and install dependencies with `npm install`
3. Run `npm run dev` to run the application
4. Go to localhost:3000 on your own device
