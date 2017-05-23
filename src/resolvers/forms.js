import { casual } from './utils';
import { MockList } from 'graphql-tools-bchen';
import moment from 'moment';

const meetingFormResolver = () => ({
    date: moment().subtract(casual.integer(10, 100), 'hours').format('DD/MM/YYYY'),
    railPosition: casual.title,
    tabIndicator: casual.letter,
    track: {
        name: casual.word,
        state: 'VIC'
    },
    races: [],
    stage: casual.letter,
    formOptions: []
});

const eventFormResolver = eventId => {
    const competitorCount = casual.integer(8, 10);
    return {
        eventId,
        startTime: moment().subtract(casual.integer(10, 100), 'hours').format("h:mm a"),
        distance: {
            metres: casual.integer(800, 1600)
        },
        restrictions: {
            jockey: casual.full_name
        },
        weightType: "Handicap",
        prizes: () => new MockList(competitorCount + 1, (parent, args) => {
            let index = parent.prizeIndex;
            index = index ? index + 1 : 1;
            parent.prizeIndex = index;
            return {
                type: index > competitorCount ? 'total' : index.toString(),
                value: casual.integer(1000, 10000).toString()
            }
        })
    }
};

const track_conditions = ["Good", "Good", "Good", "Good", "Good", "Good", "Heavy", "Slow", "Synthetic"];
const trackResolver = () => ({
    expectedCondition: casual.random_element(track_conditions),
    condition: casual.random_element(track_conditions),
    name: casual.word,
    track4CharAbbrev: casual.word
});

const competitorFormResolver = () => {
    const competitorCount = casual.integer(8, 10);
    return {
        meetingDate: moment().subtract(casual.integer(1, 100), 'hours').format("DD/MM/YYYY"),
        track: trackResolver(),
        eventDuration: casual.double(100, 200).toFixed(2).toString(),
        barrier: casual.integer(1, 10).toString(),
        prices: { starting: casual.double(5, 20).toFixed(1).toString() },
        decimalPrices: { starting: casual.double(5, 20).toFixed(1).toString() },
        margin: casual.double(5, 20).toFixed(1).toString(),
        otherRunners: [
            {
                "position": "1",
                "competitor": "All I Survey"
            },
            {
                "position": "2",
                "competitor": "Square Off"
            },
            {
                "position": "3",
                "competitor": "Chloe Anna"
            }
        ],
        winningTime: casual.double(100, 200).toFixed(1).toString(),
        pir: Array.from(Array(6), e => casual.integer(1, 10)).join(','),
        split: "",
        distance: {
            metres: casual.integer(800, 1600)
        },
        place: casual.integer(1, competitorCount).toString(),
        raceNumber: casual.integer(1, competitorCount).toString(),
        numberOfCompetitors: competitorCount
    }
};
export {
    meetingFormResolver,
    eventFormResolver,
    competitorFormResolver
};

