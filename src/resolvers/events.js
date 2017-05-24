import { casual } from './utils';
import { MockList } from 'graphql-tools-bchen';
import { getEventId, getOutComeDateString } from './utils';
import { marketsResolver, competitorResolver, eventFormResolver } from './index';
import moment from 'moment';

const eventsResolver = (parent, args, context) => {
    const { filterBy } = args;
    if (filterBy === 'quadrella') {
        // this is a defect in frankel-au; if you returns something for quadrella, frankel-au breaks
        return null;
    }
    let { id, ids } = args
    if (id) {
        ids = [id];
    }
    if (ids) {
        return ids.map(id => eventResolver(id));
    }
    return new MockList([4, 6]); //next to go; carousel..etc

}
const eventResolver = eventId => {
    const eventIdentifier = casual.eventIdentifier(eventId);
    return {
        id: eventIdentifier.id,
        origId: eventIdentifier.origId,
        type: 't',
        silkUrl: 'https://dqp0psmzdy9om.cloudfront.net/77783_8_SPRITE_32x32.png',
        state: 'VIC',
        name: casual.title,
        status: casual.eventStatus,
        noOfPlacings: casual.integer(1, 3),
        competitors: () => new MockList([5, 10], (parent, args, context) => {
            const { origId } = parent;
            // we have to generate a consitent serials of saddle number in case user select on into betslip
            if (parent.currentCompetitorIndex) {
                parent.currentCompetitorIndex++;
            } else {
                parent.currentCompetitorIndex = 1;
            }
            return competitorResolver(parseInt(origId), parent.currentCompetitorIndex);
        }),
        distance: casual.integer(500, 2000) + 'm',
        outcomeDateString: casual.outcomeDateString,
        result: casual.random_element(['closed', '5,2,8', '4,5,3']), // only used when event is closed
        markets: marketsResolver(),
        childMarkets: null,
        eventForm: eventFormResolver(eventIdentifier.origId),
        isFuture: casual.random_element(Array.from(Array(10), (x, index) => {
            // 1/10 of chance to be future events
            x = index % 20 === 1 ? true : false;
        })),
    }
};

export {
    eventsResolver,
    eventResolver
}