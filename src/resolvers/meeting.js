import { casual } from './utils';
import { MockList } from 'graphql-tools-bchen';
import moment from 'moment';
import { meetingFormResolver, raceResolver } from './'


const meetingResolver = () => {
    const id = casual.word + '_au_t_' + moment().add(casual.integer(0, 100), 'hours').format('DD_MM_YYYY');
    return {
        countryCode: casual.country.code,
        id: 'meeting:' + id,
        name: casual.meetingName,
        origId: id,
        raceType: 't',
        races: () => new MockList([8,10], (parent, args) => {
            let index = parent.raceIndex;
            index = index ? index + 1 : 1;
            parent.raceIndex = index;
            return raceResolver(index);
        }),
        trackCondition: casual.random_element(['', '', '', 'Soft', 'Soft6', 'Good', 'Fast']),
        meetingForm: meetingFormResolver()
    }
};

export default meetingResolver;