import { casual } from './utils';
import moment from 'moment';

const track_conditions = ["Good", "Good", "Good", "Good", "Good", "Good", "Heavy", "Slow", "Synthetic"];
const trackResolver = () => ({
    expectedCondition: casual.random_element(track_conditions),
    condition: casual.random_element(track_conditions),
    name: casual.word,
    track4CharAbbrev: casual.word
});

const formsResolver = () => ({
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
    place: casual.integer(1, 10).toString(),
    winningTime: casual.double(100, 200).toFixed(1).toString(),
    pir: Array.from(Array(6), e=>casual.integer(1,10)).join(','),
    split: ""
});
export default formsResolver;
