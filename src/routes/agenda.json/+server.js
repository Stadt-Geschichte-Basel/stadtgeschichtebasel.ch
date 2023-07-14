import * as config from '$lib/config';

import { json } from '@sveltejs/kit';
import { promises as fs } from 'fs';
import { tmpdir } from 'os';
import { join } from 'path';
import { parseStringPromise } from 'xml2js';

async function saveToFile(data, path) {
    await fs.writeFile(path, JSON.stringify(data));
    console.log(`Data saved to: ${path}`);
}

function getUniqueOwners(activities) {
    const allOwners = activities.map((item) => item.owner);
    const uniqueOwners = [...new Set(allOwners)];
    console.log(uniqueOwners);
    return uniqueOwners;
}


// This can be false if you're using a fallback (i.e. SPA mode)
export const prerender = true;

/** @type {import('./$types').RequestHandler} */
export async function GET() {
    const response = await fetch('https://www.kulturzueri.ch/xmlexport/kzexport-basel.xml');
    const xml = await response.text();
    const data = await parseStringPromise(xml);
    const activities = data['kdz:exportActivities']['Activities'][0]['Activity'];

    // await saveToFile(activities, join(tmpdir(), 'activities.json'));
    // getUniqueOwners(activities);

    const partners = config.partners;
    const filteredActivities = activities.filter((item) => {
        return partners.includes(item['$'].owner);
    });

    const parsedActivities = filteredActivities.map((activity) => {
        const dates =
            activity.ActivityDates?.[0]?.ActivityDate?.map((date) => ({
                startDate: date.$.startDate,
                endDate: date.$.endDate,
                startTime: date.$.startTime,
                endTime: date.$.endTime,
                TicketURL: date.TicketURL[0]
            })) ?? [];
        return {
            owner: activity['$'].owner,
            dauerausstellung: activity['$'].dauerausstellung,
            title: activity.Title[0],
            shortDescription: activity.ShortDescription[0],
            originUrl: activity.OriginURL[0],
            dates
        };
    });

    return json({ activities: parsedActivities });
}
