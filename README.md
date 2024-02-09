# big-heart-bros

Big Heart Bros aim to streamline the volunteering process, by allowing volunteers to sign up for events and organisations to put up requests for volunteers to join. Big At Heart simply have to approve or reject the request from the organisations.

-   Target User: Volunteers
-   Medium: Web app
-   Issue: Tedious process to sign and liase with volunteeers, and meaningful data collection
  
-   Additional Features:
1. Recommender system to allow volunteers to have a more personalised experience
2. GenAI tools for testimonial for volunteers that will consolidate their volunteering experiences
3. Personalised statistics for volunteers
4. Sign-up and sign-in feature for volunteers (and data collection)

## User Flow
![User Flow Diagram](big-heart-bros/docs/images/user-flow.png)

## Landing Page
<div style="display: flex;">
  <img src="big-heart-bros/docs/images/home-page.png" alt="Home Page" width="100%"/>
</div>

## Sign In & Up Page
<div style="display: flex;">
  <img src="big-heart-bros/docs/images/sign-up.jpg" alt="Sign Up Page" width="40%"/>
</div>
Purpose: Users will be redirected to this page upon first sign in. Comprehensive user page for meaningful data collection.<br/>
Usage: Users can fill up the input fields and sign up as a user. Users are also authenticated against a database using NextAuth.js.

## Volunteering Page
<div style="display: flex;">
  <img src="big-heart-bros/docs/images/opportunities.png" alt="Volunteering Page" width="40%"/>
  <img src="big-heart-bros/docs/images/event-sign-up.png" alt="Volunteering Sign up" width="40%"/>
</div>
Purpose: Generates personalised events page, with a recommender system to match skills wanted by organisations with those users have.<br/>
Usage: Users can click on "View Event", which will lead to a pop-up event-sign page, where users can view more information
and join the event, viewing other info such as capacity, and registration deadline.

## User Dashboard
<div style="display: flex;">
  <img src="big-heart-bros/docs/images/user-dashboard.png" alt="User Dashboard" width="40%"/>
  <img src="big-heart-bros/docs/images/upcoming-events.jpg" alt="Upcoming Events" width="40%"/>
  <img src="big-heart-bros/docs/images/gen-test-1.jpg" alt="Generate Testimonial 1" width="40%"/>
  <img src="big-heart-bros/docs/images/gen-test-2.jpg" alt="Generate Testimonial 2" width="40%"/>
</div>
Purpose: Gamify volunteering and allowing users to get achievements and see their stats (from volunteering).<br/>
Usage: Under "Activity", users can view their hours clocked. Users can also view events they signed up for under "Upcoming Events" and those that are completed under "Historical Events". We have integrated our web application with the OpenAI API allow Users to receive a testimonial put together from the feedback they have received from various organisations they have volunteered with.

## Organisation Dashboard
<div style="display: flex;">
  <img src="big-heart-bros/docs/images/org-dashboard.png" alt="Organisation Dashboard" width="40%"/>
  <img src="big-heart-bros/docs/images/create-event.png" alt="Organisation Dashboard" width="40%"/>
</div>
Purpose: Allow beneficiaries to track their events and apply for new events to Big At Heart.<br/>
Usage: Beneficiaries can press "View Event" at the right of each event to view their event information. They can also create new events under the "Create Event" button.

## Admin Dashboard
<div style="display: flex;">
  <img src="big-heart-bros/docs/images/admin-dashboard-1.png" alt="Organisation Dashboard" width="40%"/>
  <img src="big-heart-bros/docs/images/admin-dashboard-2.png" alt="Organisation Dashboard" width="40%"/>
  <img src="big-heart-bros/docs/images/admin-dashboard-3.png" alt="Organisation Dashboard" width="40%"/>
  <img src="big-heart-bros/docs/images/approve-req.png" alt="Organisation Dashboard" width="40%"/>
</div>
Purpose: Allow Big At Heart to view all pending and approved events.<br/>
Usage: Admin can press "Pending" to view events awaiting approval and press the ":" button on the left to view/approve the events. After pressing "View", users will be brought to another page with event information and approval button below.


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
