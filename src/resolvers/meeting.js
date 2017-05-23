import { casual } from './utils';
import { MockList } from 'graphql-tools-bchen';
import moment from 'moment';
import { meetingFormResolver } from './'


const meetingResolver = () => {
    const id = casual.word + '_au_t_' + moment().add(casual.integer(0, 100), 'hours').format('DD_MM_YYYY');
    return {
        countryCode: casual.country.code,
        id: 'meeting:' + id,
        name: casual.meetingName,
        origId: id,
        raceType: 't',
        races: () => new MockList([4, 8]),
        trackCondition: '',
        meetingForm: meetingFormResolver()
    }
};

export default meetingResolver;