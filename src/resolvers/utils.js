import casual from 'casual';
import moment from 'moment';

casual.define('priceCode', () => {
    return casual.random_element(['FXD', 'FXD', 'FXD', 'FXD', 'FXD',
        'BT3', 'BT2', 'BT2P']);
})

casual.define('eventIdentifier', eventId => {
    // event($id:11223344) or node(id:"event:11223344")
    let id = eventId || casual.integer(115300, 125399);
    if (typeof id === 'string' && id.lastIndexOf('event:') !== -1) {
        id = id.split('event:')[1]
    }
    return {
        id: 'event:' + id,
        origId: '' + id
    }
});
casual.define('raceIdentifier', () => {
    const id = casual.integer(115300, 125399);
    return {
        id: 'race:' + id,
        origId: '' + id
    }
});

casual.define('meetingName', () => casual.random_element(['Goulburn', 'Mildura', 'Gosford', 'Richmond', 'Kembla Granage', 'Muswellbrook',
    'Rockhampton', 'Seymour', 'Albion Park', 'Glocester Park', 'Menangle', 'Newcastle', 'Swan Hill', 'Devonport', 'Gawler', 'Geelong',
    'Ipswich', 'Townsville', 'Warragul', 'Redcliffe', 'terang'
]))

const countryList = Array.from(Array(10), (x, index) => {
    switch (index) {
        case 1:
            return { code: 'can', name: 'Canada' };
        case 2:
            return { code: 'fra', name: 'France' };
        case 3,4:
            return { code: 'saf', name: 'South Africa' };
        case 5, 6:
            return { code: 'eng-ire-sco-wal', name: 'UK & Ireland' };
        default:
            return { code: 'aus', name: 'Australia' };
    }
});

casual.define('country', () => casual.random_element(countryList));

casual.define('eventStatus', () => casual.random_element(Array.from(Array(20), (x, index) => {
    if (index % 20 === 1) {
        return 'closed'
    } else if (index % 20 === 2) {
        return 'finalized'
    }
    return 'open6'
})));

casual.define('outcomeDateString', () => moment().add(casual.integer(0, 60 * 24 * 2), 'minutes').utcOffset(0).format())
const isFutureArray = Array.from(Array(20), (x, index) => {
    // 1/10 of chance to be future events
    return index % 20 === 1 ? true : false;
})
casual.define('isFuture', () => casual.random_element(isFutureArray));



export { casual } 