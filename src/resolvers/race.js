import { casual } from './utils';
import { MockList } from 'graphql-tools-bchen';
import { getEventId, getOutComeDateString } from './utils';
import competitorResolver from './competitor';
import moment from 'moment';


const raceResolver = raceNumber => {
    const raceIdentifier = casual.raceIdentifier;
    const country = casual.country;
    return {
        id: raceIdentifier.id,
        origId: raceIdentifier.origId,
        countryCode: country.code,
        countryName: country.name,
        meetingName: casual.word,
        name: casual.title,
        outcomeDateString: casual.outcomeDateString,
        type: 't',
        state: 'VIC',
        status: casual.eventStatus,
        distance: casual.integer(500, 2000) + 'm',
        result: casual.random_element(['closed', '5,2,8', '4,5,3']), // only used when event is closed
        number: raceNumber || casual.integer(1, 10),
        isFuture: casual.random_element(Array.from(Array(10), (x, index) => {
            // 1/10 of chance to be future events
            x = index % 20 === 1 ? true : false;
        })),
    }
};

export default raceResolver;